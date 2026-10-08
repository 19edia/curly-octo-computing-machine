import {parentPort,workerData} from 'node:worker_threads';
import {readFile} from 'node:fs/promises';
import {createCanvas,loadImage} from '@napi-rs/canvas';
import {prepareZXingModule,readBarcodes} from 'zxing-wasm/reader';
import {inspectCardImage,MAX_CARD_IMAGE_DIMENSION,MAX_CARD_IMAGE_PIXELS} from './barcode-image.js';

try{
 const buffer=Buffer.from(workerData);inspectCardImage(buffer);
 const img=await loadImage(buffer);
 if(!img.width||!img.height||img.width>MAX_CARD_IMAGE_DIMENSION||img.height>MAX_CARD_IMAGE_DIMENSION||img.width*img.height>MAX_CARD_IMAGE_PIXELS)throw Object.assign(new Error('Dimensões da carteira fora do limite.'),{code:'CARD_IMAGE_DIMENSIONS'});
 const canvas=createCanvas(img.width,img.height),ctx=canvas.getContext('2d');
 ctx.fillStyle='#fff';ctx.fillRect(0,0,img.width,img.height);ctx.drawImage(img,0,0);
 // The exact matching wasm lives in the installed package. This never reaches a CDN.
 const wasm=await readFile(new URL('../node_modules/zxing-wasm/dist/reader/zxing_reader.wasm',import.meta.url));
 prepareZXingModule({overrides:{wasmBinary:wasm.buffer.slice(wasm.byteOffset,wasm.byteOffset+wasm.byteLength)}});
 const options={formats:['Code128'],tryHarder:true,tryRotate:true,tryInvert:true,tryDownscale:true,maxNumberOfSymbols:3};
 let results=await readBarcodes(ctx.getImageData(0,0,img.width,img.height),options);
 // Discord/mobile previews can shrink bars below two pixels. One bounded, smooth
 // enlargement recovers the edges while the original is still preferred.
 if(!results.some(result=>result.isValid)&&img.width*img.height<=2_500_000&&img.width<=3000&&img.height<=3000){
  const enlarged=createCanvas(img.width*2,img.height*2),e=enlarged.getContext('2d');
  e.imageSmoothingEnabled=true;e.imageSmoothingQuality='high';e.drawImage(canvas,0,0,enlarged.width,enlarged.height);
  results=await readBarcodes(e.getImageData(0,0,enlarged.width,enlarged.height),{...options,tryDownscale:false});
 }
 const valid=results.filter(result=>result.isValid&&result.format==='Code128');
 if(valid.length!==1)throw Object.assign(new Error(valid.length>1?'Envie somente uma carteira por imagem.':'Não consegui ler o código de barras. Envie a nova carteira completa, de preferência o PNG original.'),{code:valid.length>1?'CARD_MULTIPLE_BARCODES':'CARD_BARCODE_UNREADABLE'});
 if(!/^7201\d{56}$/.test(valid[0].text))throw Object.assign(new Error('O código de barras não pertence a uma carteira IDRKC.'),{code:'CARD_BARCODE_INVALID'});
 parentPort.postMessage({ok:true,payload:valid[0].text});
}catch(err){const known=typeof err.code==='string'&&err.code.startsWith('CARD_');parentPort.postMessage({ok:false,code:known?err.code:'CARD_IMAGE_INVALID',message:known?err.message:'A imagem não pôde ser aberta. Envie a carteira como PNG, JPEG ou WebP.'});}
