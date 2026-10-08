# Atualização pronta · ROKUHARA KAGE CLAN

Esta entrega reúne os painéis pretos e laranja, os convites de cadastro IDRKC, o login com carteira e as correções de envio de arquivos ao bot.

- Corrigida a mensagem que recusava a carteira anexada corretamente em tickets e denúncias: anexos temporários do formulário agora são reconhecidos.
- **Verificar meu IDRKC** também exige anexar a carteira, conferir os dados e clicar em **Sou eu**.
- Em `/membros`, a aba **Com carteira** lê o código de barras e envia um código ao Discord do titular para abrir o painel. Contas existentes mantêm a senha; primeiro acesso sem conta pede a criação de senha.
- No teste com outra conta Discord, envie a carteira pertencente àquela conta.

## Conteúdo

- `projeto`: aplicação completa, bot, migrações SQL, fontes locais, arte, testes e documentação.
- `EXEMPLOS`: capturas dos novos painéis e carteiras com dados fictícios. Não são registros reais.

## Aplicar no serviço existente

Publique o conteúdo de `projeto` no repositório conectado ao Render. Use build `npm ci --omit=dev` e start `npm start`. Preserve o banco e as variáveis já configuradas. As tabelas de convites e acesso por carteira são criadas automaticamente; os registros anteriores são mantidos. Depois do deploy, use **Publicar / atualizar guia e botões** para atualizar as instruções dos embeds. Os botões de verificação existentes passam a abrir o formulário com arquivo quando o novo código estiver ativo.

Depois de entrar no painel administrativo, use **Novo IDRKC**. Escolha **Patente** e **Membro/Aliado**, gere o link e envie à pessoa. Ela precisa estar no servidor do distrito e conseguir receber o código privado do bot. O link vale por 48 horas e só pode ser utilizado uma vez.

Leia `projeto/README.md` para as instruções completas e `projeto/VALIDACAO.md` para o alcance dos testes. A arte e seu prompt estão documentados em `projeto/REBRANDING-KAGE.md`.

Este pacote foi validado localmente. Não foi publicado automaticamente no Render.
