# ROKUHARA KAGE CLAN

Central IDRKC, portal dos membros e bot Discord para o **DISTRITO ROKUHARA KAGE CLAN**, com identidade laranja. O distrito usa o servidor que antes era a primeira divisão.

## Cadastro por convite

Na **Visão do distrito → Novo IDRKC**, a equipe escolhe somente a **patente** e o **tipo: Membro ou Aliado**. O painel gera um link privado, válido por 48 horas e utilizável uma vez.

A pessoa abre o link, informa nome e dados do jogo, procura seu nome no Discord e confere o perfil encontrado no servidor do distrito. Depois confirma o código enviado pelo bot no privado e escolhe uma senha de pelo menos 12 caracteres. O site mostra boas-vindas, IDRKC e download da carteira, e abre automaticamente o painel de membros após 15 segundos. É possível pausar essa contagem.

- O bot precisa estar conectado, o distrito configurado no SBI e a pessoa presente no servidor. DMs devem estar liberadas para receber o código.
- Patente e tipo ficam definidos no convite; quem recebe o link não pode alterá-los. Recrutadores geram a patente inicial Membro/Aliado e continuam vendo somente seus próprios cadastros.
- O código vale por 10 minutos, com até cinco tentativas e intervalo de um minuto entre envios. A confirmação cria identidade verificada, conta e sessão juntas; cargos e carteira por DM entram na fila do bot.
- Um Discord ou Roblox já cadastrado não é sobrescrito. Pessoas que já têm IDRKC continuam usando o acesso de membros existente.
- A atualização cria as tabelas de convites automaticamente no mesmo banco. Não precisa adicionar variáveis de ambiente. O endereço público dos links usa o APP_ORIGIN existente.

## Atualizar no Render

1. Publique o conteúdo desta pasta `projeto` no repositório do serviço existente. Build: `npm ci --omit=dev`. Start: `npm start`. Node 22.12 ou superior. Health check: `/health`. Execute uma instância do bot.
2. Mantenha `DATABASE_URL`, `DISCORD_TOKEN`, `SESSION_SECRET` e `APP_ORIGIN` existentes. As contas, senhas e os históricos continuam no mesmo banco. A migração cria o IDRKC e a chave privada de cada carteira automaticamente.
3. Mantenha os antigos `DIV_1_*` até concluir a configuração inicial do SBI: eles ajudam a reconhecer os cargos e canais atuais. Instalações novas dispensam esses IDs.
4. Ative **Server Members Intent** no Developer Portal. Instale o bot com os escopos `bot` e `applications.commands`. Deixe **Interactions Endpoint URL** vazio: o projeto recebe interações pelo Gateway.
5. No servidor atual da primeira divisão, um dono/administrador Discord executa **`/criar`**. O bot reaproveita a estrutura identificada, atualiza cargos/canais, renomeia o servidor e salva os IDs no banco.
6. Confira o inventário privado retornado pelo comando e **Bot e histórico** no painel. O aviso de imigração é publicado automaticamente. Repetir `/criar` retoma uma configuração incompleta ou atualiza a existente.

O bot precisa de Gerenciar servidor para renomear, Gerenciar cargos/canais, Ver canais, Enviar mensagens, Incorporar links, Anexar arquivos, Ler histórico, Conectar e Falar. Criar convite permite salvar um convite no SBI. Coloque o cargo do bot acima dos cargos que ele gerencia. Os cargos automáticos, inclusive Equipe, devem permanecer sem Administrator ou permissões globais de gestão.

O SBI armazena servidor, cargos, canais, categorias, convite e progresso em `sbi_district`. Após a configuração, reinícios recuperam esse estado sem copiar IDs para variáveis. A segunda divisão deixa de ser um destino ativo e seus cadastros passam ao distrito único. Recursos antigos não são apagados pela migração.

## Imigração

- O embed **IMIGRAÇÃO ROKUHARA PRA DISTRITO ROKUHARA KAGE CLAN** pede o IDRKC (também reconhece o código anterior) e o nome no Shigaku. O Discord do solicitante precisa ser o titular daquela identidade.
- Em **Imigração**, administradores e sub líderes aprovam ou recusam com motivo. Aprovar preserva o cadastro e o IDRKC, atualiza o nome e o nome no Shigaku, confirma o cadastro e coloca os cargos e a carteira PNG na fila.
- A carteira é enviada somente ao privado do titular. DMs bloqueadas aparecem em **Bot e histórico**, com opção de tentar novamente após liberar mensagens.
- **Parar imigrações** bloqueia novos pedidos imediatamente e coloca a remoção dos embeds na fila. Pedidos recebidos continuam disponíveis para análise. Reiniciar ou repetir `/criar` não reabre a campanha.
- Um pedido pendente não pode ser duplicado. Se os dados da identidade mudarem durante a análise, a aprovação exige um novo pedido.

A atualização do banco preserva IFJs, nomes, contas e senhas. Os cadastros anteriores são marcados para imigração uma única vez; a execução seguinte não desfaz aprovações. A verificação anterior continua válida enquanto os dados não forem alterados.

## Carteiras e portal

As carteiras têm brasões próprios: máscara Kage para membros; coroa com escudo RK e louros para Líder; estrela e duas divisas para Sub líder; diamante facetado para High member; elos entrelaçados para aliados. As patentes usam correspondência exata, aceitando variações de acento, maiúsculas e espaços. Cadastros do tipo aliado sempre usam o selo de aliança.

**`/ver-sua-carteira`** pode ser usado no distrito por qualquer pessoa cujo Discord tenha cadastro verificado. O comando não recebe alvo: envia somente a carteira do próprio usuário por DM. Se o privado estiver fechado, explica como liberar.

O portal fica em **`/membros`**. Novos membros recebem o convite da equipe. Quem já possui uma identidade verificada pode criar sua conta com IDRKC e senha e confirmar o código enviado ao Discord vinculado. Contas anteriores mantêm a senha, usando agora o IDRKC como login (o código antigo continua aceito pela API para compatibilidade). O portal oferece mural oficial, busca, ficha do membro, download da própria carteira verificada e acompanhamento da imigração. A sessão do membro é independente da equipe.

Na aba **Com carteira**, envie o PNG, JPEG ou WebP original, com até 8 MB. O site lê o código de barras e confere a assinatura, a versão atual, a verificação e a presença no servidor. Depois envia um código ao Discord do titular; confirmar esse código abre o painel. A imagem sozinha não libera os atendimentos privados de alguém, pois a carteira também é compartilhada em tickets e denúncias. Quem já tem conta mantém sua senha; quem ainda não tem escolhe uma de pelo menos 12 caracteres. O código vale por dez minutos e bloqueia após cinco tentativas incorretas. Não é preciso adicionar variáveis no Render: as tabelas do acesso por carteira são criadas automaticamente.

Na administração, **Avisos oficiais** permite criar, editar, fixar, publicar ou salvar rascunhos. Somente os publicados aparecem para membros. Esses comunicados são do mural; o aviso de imigração do Discord é gerenciado separadamente.

## IDRKC, denúncias e atendimento

O registro público passa a ter **16 números**, com zeros iniciais preservados, e **código de barras Code 128**. A carteira continua usando o brasão da patente. A assinatura autentica o IDRKC, a versão da carteira e o Discord titular. Alterar os dados invalida as versões anteriores; cadastros removidos ou revogados não passam na conferência. Tickets, denúncias e acesso por carteira exigem cadastro verificado; a primeira verificação aceita a carteira emitida ainda não verificada. O bot consulta os dados atuais do banco, sem confiar em texto editado na imagem.

Após a ativação do distrito, membros já verificados entram automaticamente na fila de entrega da nova carteira. O bot confirma a presença no servidor antes de enviar, registra a entrega e não a repete em cada reinício. Novas revisões também são entregues. Quem estava ausente pode receber ao entrar. Privados bloqueados ficam com falha em **Bot e histórico**, permitindo reenvio após liberar DMs. O comando **/ver-sua-carteira** continua disponível para pedir a versão atual.

- **Verificação:** **Verificar meu IDRKC** abre um formulário para anexar a própria carteira. O bot lê o código de barras e confere se pertence ao Discord que enviou o arquivo. Apresenta os dados para confirmar em **Sou eu**, válido por cinco minutos; após a confirmação, coloca a liberação dos cargos na fila. Digitar apenas o número no formulário antigo não libera acesso. Se houver imigração pendente, conclua a imigração primeiro.
- **Denúncia:** o formulário pede somente **a carteira do próprio denunciante** e **o nick da pessoa denunciada**. O alvo não precisa ter cadastro e sua carteira não é solicitada. Depois de autenticar o código e o titular, o caso aparece no painel e o bot envia o contato do denunciante ao dono do servidor e aos administradores/sub líderes com Discord confirmado. O relato detalhado pode ser apurado nesse contato.
- **Ticket:** o formulário pede a própria carteira. Após a conferência, uma tarefa abre o canal privado para o membro, o bot e a administração. O cargo Equipe, isoladamente, não recebe acesso a esses canais. Administradores nativos do Discord mantêm o acesso inerente à permissão Administrator.
- **Meus atendimentos:** a nova central no painel do membro mostra apenas as denúncias que ele enviou e os tickets que abriu, com situação, conclusão e link do canal quando disponível.

Anexe PNG, JPEG ou WebP de até 8 MB. A leitura ocorre em um worker com limites de memória, dimensões e tempo; não requer Message Content Intent. Envie o PNG original recebido pelo bot para melhor leitura. O IFJ permanece apenas como referência interna de compatibilidade, sem apagar contas ou relações do banco.

Corrigida a recusa indevida **“O arquivo precisa ser anexado diretamente no formulário do Discord”**: o leitor reconhece também anexos temporários de formulário (`ephemeral-attachments`) nos domínios oficiais do Discord e preserva a assinatura do endereço. Arquivos de outro titular, versões antigas e links externos continuam bloqueados. Para testar em outra conta, use a carteira vinculada ao Discord dessa conta.

## Estúdio de embeds

Administradores e sub líderes podem abrir **Estúdio de embeds**, colar JSON, conferir a prévia e publicar. Aceita um objeto de embed ou um envelope com `content` e `embeds`, incluindo autor, título, descrição, cor, campos, miniatura, imagem, rodapé e data. Há um modelo pronto no editor. URLs precisam usar HTTPS público; anexos e componentes arbitrários não são aceitos.

O backend valida os limites do Discord e desativa notificações por menção. O payload normalizado é salvo e enviado ao canal de avisos registrado no SBI. Só depois da confirmação do envio o mesmo payload aparece no mural dos membros. Ambos os painéis usam o mesmo renderizador seguro, com formatação de texto, campos, cores e imagens. Falhas de entrega aparecem no histórico com opção de reenviar; repetir uma solicitação não cria duas publicações.

Exemplo:

```json
{"embeds":[{"title":"Novidades do distrito","description":"**Sua nova identidade chegou.** Use /ver-sua-carteira.","color":16748877,"fields":[{"name":"Denúncias","value":"Envie sua própria carteira e o nick da pessoa.","inline":true}],"footer":{"text":"ROKUHARA KAGE CLAN"}}]}
```

## Permissões e bot

- Administrador e Sub líder têm todas as opções administrativas. Moderadores e recrutadores veem, editam e excluem seus próprios cadastros.
- `/warn`: moderadores e administradores/sub líderes ativos com Discord confirmado, além do dono/Administrator do servidor. Recrutadores não recebem essa permissão pelo vínculo.
- High member também recebe **Equipe** na sincronização. Equipe sozinho não autoriza `/warn`.
- Botões com ação do bot têm intervalo de **3 segundos por usuário**. O primeiro clique é imediato; enviar um formulário já aberto continua permitido.
- **Publicar / atualizar guia e botões** salva uma tarefa na fila e retorna ao painel. Embeds reconhecidos são editados.
- Aliança: **RYUKETSU**, convite `https://discord.gg/2xQgZQ3ZMV`. O convite antigo da HYDRA é substituído automaticamente. `RYUKETSU_INVITE_URL` é opcional para mudanças futuras.

## Inicialização

Variáveis de acesso: `NODE_ENV`, `APP_ORIGIN`, `DATABASE_URL`, `SESSION_SECRET` e, com o bot ativado, `DISCORD_TOKEN`. `INITIAL_ADMIN_USERNAME`/`INITIAL_ADMIN_PASSWORD` são necessárias apenas em um banco sem equipe. A URL PostgreSQL em produção usa `sslmode=verify-full`. O Render fornece `PORT`.

A porta HTTP abre em `0.0.0.0` durante a inicialização. As rotas do painel só são liberadas após as verificações do banco e Discord. Um HTTP 429 inicial respeita o prazo recebido e tenta novamente com um cliente novo. Durante essa espera, `/health` verifica o banco e informa `ready:false`. `/ready` só fica disponível após liberar a aplicação. Repetir deploys não encurta o prazo do Discord.

Referências: [porta do Render](https://render.com/docs/web-services#port-binding) e [interações do Discord](https://docs.discord.com/developers/interactions/receiving-and-responding).

## Verificação local

```sh
npm ci
npm test -- --test-concurrency=2
npm run check
```

Os testes usam PostgreSQL em memória (PGlite) e Discord simulado. Cobrem autorização, titularidade, privacidade, aprovação, encerramento, SBI, atualização incremental e inicialização. Não publicam em servidores reais. Consulte `VALIDACAO.md` e `../EXEMPLOS`.
