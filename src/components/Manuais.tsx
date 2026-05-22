import { useState } from 'react'
import { MapPin, MessageCircle, Clapperboard, ChevronDown, ChevronUp, CheckCircle2, AlertTriangle, Lightbulb, ExternalLink } from 'lucide-react'

interface Step {
  n: number
  text: string
  tip?: string
  warn?: string
  bold?: string
  fase?: string
}

interface Guide {
  id: string
  icon: React.ElementType
  iconBg: string
  iconColor: string
  badge: string
  badgeBg: string
  title: string
  subtitle: string
  tempo: string
  cta?: { label: string; href: string }
  steps: Step[]
  dica_final?: string
}

const guides: Guide[] = [
  {
    id: 'gmb',
    icon: MapPin,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
    badge: 'Urgente — essa semana',
    badgeBg: 'bg-red-100 text-red-700',
    title: 'GMB: Dominar "jardinagem Bertioga" e "paisagismo Riviera"',
    subtitle: 'Você já tem o perfil no Google Maps — mas está incompleto. Proprietários da Riviera pesquisam no celular. Sem descrição certa, sem fotos e sem posts, você não aparece. Este guia leva o perfil da invisibilidade à primeira posição.',
    tempo: '~90 minutos (dividir em 3 dias)',
    cta: { label: 'Abrir Google Meu Negócio', href: 'https://business.google.com' },
    steps: [
      { n: 0, text: '', fase: 'FASE 1 — VERIFICAR SITUAÇÃO ATUAL (antes de qualquer edição)' },
      { n: 1, text: 'Acesse', bold: 'business.google.com', tip: 'Faça login com a conta Google que você usou para criar o perfil. Se não lembrar qual conta, abra o Google Maps e pesquise "Lobo Jardinagem Bertioga" — clique no perfil e toque "Sou o proprietário?" para identificar a conta vinculada.' },
      { n: 2, text: 'Na tela principal, confirme que o perfil', bold: '"Lobo Jardinagem"', tip: 'Se aparecer mais de um perfil cadastrado, selecione o mais recente ou o que tem mais avaliações.' },
      { n: 3, text: 'Verifique se o perfil está VERIFICADO — deve aparecer um', bold: 'check marcado ao lado do nome.', warn: 'Se o perfil NÃO estiver verificado, você precisa concluir a verificação antes de qualquer outra etapa. No painel do GMB, clique em "Verificar agora" e siga as instruções (geralmente recebe um código por e-mail ou SMS).' },
      { n: 4, text: 'Anote o que está preenchido e o que está vazio. Abra o bloco de notas do celular e escreva o que falta. Não edite ainda — leia o guia inteiro primeiro para ter uma visão do todo.' },

      { n: 0, text: '', fase: 'FASE 2 — NOME E CATEGORIAS (fundação da busca)' },
      { n: 5, text: 'Em "Editar perfil" → Informações → Nome do negócio: confirme que está exatamente como', bold: '"Lobo Jardinagem"', tip: 'Não adicione palavras-chave no nome (ex: "Lobo Jardinagem Bertioga") — o Google pode reprovar e o perfil fica suspenso. O nome tem que ser o nome real da empresa.' },
      { n: 6, text: 'Categoria principal: deve estar como "Paisagista" ou "Empresa de jardinagem". Se estiver diferente, toque e pesquise', bold: '"Paisagista"', tip: 'A categoria principal é o fator mais importante para aparecer nas buscas. "Paisagista" engloba jardinagem, manutenção e paisagismo — mais abrangente.' },
      { n: 7, text: 'Toque em "Adicionar categoria" para adicionar categorias secundárias. Adicione:', bold: '"Serviço de paisagismo" e "Serviço de manutenção de jardins"', tip: 'Categorias secundárias aumentam o alcance de buscas relacionadas. Limite a 3 categorias no total — mais que isso pode diluir a relevância.' },
      { n: 8, text: 'Salve as categorias. Aguarde 24-48h para as mudanças aparecerem no Google.' },

      { n: 0, text: '', fase: 'FASE 3 — DESCRIÇÃO ESTRATÉGICA (as palavras que seus clientes digitam)' },
      { n: 9, text: 'Em "Editar perfil" → Informações → Descrição: apague o texto atual (se houver). A descrição precisa conter as palavras exatas que proprietários de Bertioga e Riviera digitam no Google.' },
      { n: 10, text: 'Copie e cole exatamente a seguinte descrição:', bold: '"Lobo Jardinagem — paisagismo e manutenção de jardins em Bertioga e Riviera de São Lourenço. Especialistas em jardins de casas de veraneio, condomínios fechados e residências de alto padrão no litoral de São Paulo. Projetos e manutenção recorrente com contrato mensal. Equipe profissional, equipamento próprio. Atendemos Bertioga, Riviera, Boracéia e região."', tip: 'Esta descrição contém as 6 palavras-chave mais buscadas para o seu mercado: "Bertioga", "Riviera de São Lourenço", "jardins", "veraneio", "condomínios", "litoral". O Google usa a descrição para decidir em quais buscas mostrar seu perfil.' },
      { n: 11, text: 'Não ultrapasse 750 caracteres na descrição — o Google corta o restante. A descrição acima tem ~480 caracteres, seguro.' },
      { n: 12, text: 'Salve a descrição. É a ação de maior impacto deste guia — após 48-72h, pesquise "jardinagem Bertioga" no Google Maps e veja se o perfil aparece.' },

      { n: 0, text: '', fase: 'FASE 4 — ÁREA DE ATENDIMENTO (onde você aparece nas buscas)' },
      { n: 13, text: 'Em "Editar perfil" → Informações → Localização → "Área de atendimento": toque para editar.' },
      { n: 14, text: 'Adicione as seguintes áreas:', bold: 'Bertioga, Riviera de São Lourenço, Boracéia, São Sebastião', tip: 'A Riviera de São Lourenço é um bairro/condomínio dentro de Bertioga — adicione como área específica. É onde estão os clientes de maior ticket.' },
      { n: 15, text: 'Importante:', bold: 'não adicione áreas fora do seu raio real de operação.', warn: 'Perfis com área de atendimento exagerada perdem ranking. O Google detecta quando você lista cidades onde nunca gera avaliações — o algoritmo interpreta como spam e penaliza a visibilidade.' },

      { n: 0, text: '', fase: 'FASE 5 — SITE, TELEFONE E HORÁRIO (completude do perfil)' },
      { n: 16, text: 'Em Informações → Site: confirme se o link do seu site está preenchido. Se não tiver site ativo, use o link do seu Instagram (@lobo_jardinagem) temporariamente.' },
      { n: 17, text: 'Em Informações → Telefone: confirme o número com WhatsApp está cadastrado. Use o número que você atende os clientes — deve ser o mesmo que está na proposta.' },
      { n: 18, text: 'Em Informações → Horário: preencha o horário real de atendimento.', bold: 'Sugestão: Seg-Sex 7h-17h, Sáb 7h-12h.', tip: 'Proprietários de casa de veraneio frequentemente entram em contato no fim de semana (quando estão na praia). Se você atende sábado, marque como horário comercial — o cliente vê que está disponível.' },
      { n: 19, text: 'Se você atende em feriados ou datas especiais (verão, Réveillon), ative "Horários especiais" no GMB para esses períodos.', tip: 'Bertioga tem alta sazonalidade. Na temporada (dezembro a fevereiro), clientes buscam muito mais jardinagem. Perfil ativo neste período captura uma demanda alta.' },

      { n: 0, text: '', fase: 'FASE 6 — FOTOS ESTRATÉGICAS (o fator de conversão mais alto)' },
      { n: 20, text: 'Perfil sem foto aparece no final dos resultados. Meta mínima:', bold: '10 fotos reais nas primeiras 2 semanas.' },
      { n: 21, text: 'Foto de capa (imagem principal do perfil): use a melhor foto de resultado que você tem — o jardim do Villagio depois do paisagismo.', bold: 'Horizontal, bem iluminada, sem texto sobreposto.', tip: 'Esta é a primeira imagem que o cliente vê na busca. A foto precisa provocar a reação "quero isso para o meu jardim". Resultado final, verde, organizado.' },
      { n: 22, text: 'Foto de perfil (logo/avatar): use o logo da Lobo Jardinagem, ou uma foto do Aleandro em serviço, de uniforme. Esta aparece ao lado do nome nos resultados de busca.' },
      { n: 23, text: 'Categoria "Do trabalho": fotos de jardins em serviço, antes/depois, equipamento em uso.', bold: 'Mínimo 5 fotos nesta categoria.', tip: 'Antes e depois lado a lado é o conteúdo que mais converte — qualquer pessoa consegue entender instantaneamente o valor do trabalho.' },
      { n: 24, text: 'Categoria "Equipe": foto de você (e do Daniel, se quiser) em serviço. Humaniza o negócio — proprietário de veraneio quer saber quem vai entrar na propriedade.' },
      { n: 25, text: 'Antes de enviar cada foto, renomeie o arquivo com palavras-chave:', bold: 'ex: "jardinagem-bertioga-lobo.jpg", "paisagismo-riviera-resultado.jpg"', tip: 'O Google lê o nome do arquivo e usa para indexar a foto. Arquivo chamado "IMG_20260514_123.jpg" não ajuda em nada. Arquivo chamado "jardim-casa-veraneio-bertioga.jpg" sinaliza relevância.' },
      { n: 26, text: 'O Villagio é o seu maior case. Se tiver fotos do projeto:', bold: 'adicione com a legenda "Paisagismo residencial — Bertioga/SP. Projeto e manutenção mensal."', tip: 'Mesmo que não identifique o nome do cliente, a localização "Bertioga/SP" na legenda reforça a relevância local.' },

      { n: 0, text: '', fase: 'FASE 7 — PRIMEIRAS AVALIAÇÕES (velocidade importa mais que quantidade)' },
      { n: 27, text: 'O Google prioriza perfis com avaliações RECENTES. Três avaliações novas valem mais que 20 antigas paradas.' },
      { n: 28, text: 'Para obter o link de avaliação: no business.google.com, clique em', bold: '"Receber mais avaliações"', tip: 'Será gerado um link curto no formato g.page/r/... Salve este link no campo "Link de Avaliação" na seção Links Rápidos desta central.' },
      { n: 29, text: 'Meta semana 1:', bold: 'pedir avaliação para os 5 clientes mais satisfeitos da carteira atual.', tip: 'Script WhatsApp: "Oi [NOME]! Tudo bem? Estou organizando minha presença no Google e a sua avaliação me ajudaria muito. É rápido: [LINK]. Qualquer nota e comentário que quiser escrever — agradeço de coração!" — Nunca use "5 estrelas" ou "avaliação positiva" para não parecer coerção.' },
      { n: 30, text: 'Crie um QR Code gratuito (qr-code-generator.com) apontando para o link de avaliação. Imprima e cole na capa da sua proposta comercial — o cliente escaneia na hora, direto do celular.', tip: 'Clientes de veraneio geralmente não voltam ao mesmo local, mas podem avaliar remotamente. QR Code na proposta captura essa oportunidade no momento certo.' },
      { n: 31, text: 'Nunca compre avaliações falsas.', warn: 'O Google detecta padrões anormais (muitas avaliações em pouco tempo, mesmo IP) e pode remover o perfil por completo. Avaliações reais de clientes reais é a única estratégia segura e duradoura.' },

      { n: 0, text: '', fase: 'FASE 8 — POSTS E ATUALIZAÇÕES (sinalizar atividade para o Google)' },
      { n: 32, text: 'Google Posts são atualizações publicadas no perfil — aparecem nos resultados de busca. Perfis que postam semanalmente têm melhor posição no ranking.' },
      { n: 33, text: 'Para criar um post: business.google.com →', bold: '"Adicionar atualização" → "Publicar um post"', tip: 'Escolha "Atualização" para posts simples ou "Oferta" para promoções sazonais. Posts de oferta têm destaque visual no resultado de busca.' },
      { n: 34, text: 'Primeiro post (copie e adapte):', bold: '"Manutenção de jardim concluída em Bertioga. Área externa transformada antes do verão. Contrato mensal disponível — vagas limitadas. Fale pelo WhatsApp."', tip: 'Adicione uma foto do resultado. Post com foto tem 3x mais cliques que post sem foto.' },
      { n: 35, text: 'Post para alta temporada (outubro/novembro):', bold: '"Seu jardim em Bertioga está pronto para o verão? A Riviera de São Lourenço tem agenda quase cheia. Entre em contato agora para garantir sua vaga."', tip: 'Este é o momento de maior busca do ano para Bertioga. Intensifique posts e fotos em outubro e novembro.' },
      { n: 36, text: 'Frequência mínima:', bold: '1 post por semana.', tip: 'Configure um alarme semanal (segunda-feira, 8h) para sempre ter um post novo. Posts padrão expiram em 7 dias — perfil sem post recente é interpretado como inativo.' },

      { n: 0, text: '', fase: 'FASE 9 — PERGUNTAS & RESPOSTAS (apareça nas dúvidas dos clientes)' },
      { n: 37, text: 'O GMB tem seção de "Perguntas e respostas" — qualquer pessoa pode perguntar e você responde. Você também pode adicionar suas próprias perguntas.' },
      { n: 38, text: 'Adicione agora estas perguntas (você mesmo) com as respostas correspondentes:', bold: '"Vocês atendem em Riviera de São Lourenço?"', tip: 'Resposta sugerida: "Sim, a Riviera de São Lourenço é uma das nossas principais áreas de atendimento em Bertioga. Temos vários clientes na região." — Usar o nome "Riviera de São Lourenço" na resposta reforça a relevância para essa busca.' },
      { n: 39, text: 'Segunda pergunta para adicionar:', bold: '"Fazem contrato de manutenção mensal para casas de veraneio?"', tip: 'Resposta sugerida: "Sim, é o nosso serviço principal para proprietários de casas em Bertioga que passam a maior parte do ano fora. O contrato inclui visitas regulares, manutenção preventiva e relatório fotográfico mensal. Entre em contato para receber uma proposta." — Palavras como "proprietários", "casas de veraneio", "fora" e "relatório fotográfico" são exatamente o que esse cliente busca.' },
      { n: 40, text: 'Terceira pergunta:', bold: '"Qual é a área de atendimento de vocês?"', tip: 'Resposta sugerida: "Atendemos Bertioga, Riviera de São Lourenço, Boracéia e São Sebastião. Para regiões fora deste raio, consulte disponibilidade."' },

      { n: 0, text: '', fase: 'FASE 10 — MONITORAMENTO SEMANAL (o que medir)' },
      { n: 41, text: 'Acesse business.google.com →', bold: '"Ver insights" (ou "Desempenho")', tip: 'Você vê: quantas vezes o perfil apareceu nos resultados, quantas pessoas clicaram, quantas ligaram ou pediram rotas. Esses são os números que importam.' },
      { n: 42, text: 'A métrica mais importante:', bold: '"Pesquisas de descoberta"', tip: 'São pessoas que não buscaram "Lobo Jardinagem" — buscaram "jardinagem Bertioga" ou "paisagismo Riviera" e acharam você. Isso significa que o SEO local está funcionando. Se esse número estiver crescendo, continue o que está fazendo.' },
      { n: 43, text: 'Se as pessoas clicam no perfil mas não entram em contato:', bold: 'melhore a foto de capa e adicione mais avaliações.', tip: 'Clique no perfil sem entrar em contato = perfil convenceu pela busca, mas não pela primeira impressão visual. Fotos melhores e avaliações recentes resolvem isso.' },
      { n: 44, text: 'Se as pesquisas de descoberta estiverem baixas:', bold: 'revise a descrição adicionando mais variações de palavras-chave.', tip: 'Variações úteis para adicionar: "jardim casa de praia", "manutenção jardim litoral SP", "jardinagem São Paulo litoral", "paisagismo condomínio Bertioga".' },

      { n: 0, text: '', fase: 'FASE 11 — POSICIONAMENTO RIVIERA (estratégia high-ticket)' },
      { n: 45, text: 'A Riviera de São Lourenço é o mercado mais valioso de Bertioga: imóveis de R$1M a R$10M+, proprietários de alto poder aquisitivo, a maioria ausente durante a semana.', tip: 'Esse cliente não decide pelo preço — decide pela confiança. Quem aparece primeiro no Google, tem avaliações reais e entrega relatório fotográfico ganha o contrato.' },
      { n: 46, text: 'Para capturar esse mercado via GMB:', bold: '1) use "Riviera de São Lourenço" na descrição, 2) tire fotos de jardins com geolocalização ativa no celular, 3) responda avaliações mencionando "Riviera" quando aplicável.', tip: 'Quando você tira uma foto com GPS ativo e a sobe no GMB, o Google registra a localização da foto. Isso reforça que você realmente atende naquela área — sinal de autoridade local.' },
      { n: 47, text: 'Proprietários da Riviera frequentemente pesquisam no celular durante a estada no imóvel. Certifique-se de que:', bold: 'o número de WhatsApp no GMB está atualizado e com mensagem automática configurada.', tip: 'Guia de WA Business disponível nesta mesma seção — configure a mensagem de ausência para capturar os contatos fora do horário.' },
      { n: 48, text: 'Estratégia de sazonalidade — dois picos de busca em Bertioga:', bold: 'outubro/novembro (preparação para o verão) e janeiro (temporada ativa).', tip: 'Em outubro: intensifique posts com tema "seu jardim pronto para o verão". Em janeiro: posts com resultado de jardins bonitos = prova social em tempo real. Fora da temporada: posts sobre manutenção preventiva para proprietários que querem o jardim conservado o ano todo.' },
    ],
    dica_final: 'Nenhuma empresa de jardinagem domina o Google de Bertioga hoje. Com o perfil completo, 10 fotos reais, 5 avaliações e posts semanais, você está na primeira posição para "jardinagem Bertioga" e "paisagismo Riviera de São Lourenço" antes que qualquer concorrente perceba — e o próximo contrato de R$4.000/mês chega sem prospecção ativa.',
  },
  {
    id: 'wa',
    icon: MessageCircle,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-700',
    badge: 'Urgente — essa semana',
    badgeBg: 'bg-amber-100 text-amber-700',
    title: 'Configurar Mensagem Automática WA Business',
    subtitle: 'Proprietários de veraneio mandam mensagem fora do horário comercial — à noite, fim de semana, feriado. Sem mensagem automática, você some. Com a mensagem certa, você já captura o lead enquanto dorme.',
    tempo: '~10 minutos',
    steps: [
      { n: 1, text: 'Abra o', bold: 'WhatsApp Business', tip: 'É o app com ícone verde e o "B" no centro — diferente do WhatsApp comum. Se não tiver instalado, baixe na Play Store ou App Store buscando "WhatsApp Business".' },
      { n: 2, text: 'Na tela principal (lista de conversas), toque nos', bold: '3 pontos (⋮) no canto superior direito.' },
      { n: 3, text: 'No menu que abrir, toque em', bold: '"Configurações".' },
      { n: 4, text: 'Na tela de Configurações, toque em', bold: '"Ferramentas comerciais".' },
      { n: 5, text: 'Na lista de ferramentas, toque em', bold: '"Mensagem de ausência".', tip: 'Fica na seção de Mensagens, junto com Mensagem de saudação e Respostas rápidas.' },
      { n: 6, text: 'Ative o botão verde no topo:', bold: '"Enviar mensagem de ausência"', tip: 'Se já estiver verde (ativo), não precisa mexer — só edite o texto a seguir.' },
      { n: 7, text: 'Toque em', bold: '"Mensagem"', tip: 'É o campo com o texto atual. Pode estar com algo genérico.' },
      { n: 8, text: 'Apague todo o texto existente e digite:', bold: '"Obrigado pelo contato com a Lobo Jardinagem — Bertioga/SP! Estou em campo agora. Retorno em breve. Para orçamentos: envie o endereço e o tipo de jardim que atendo você com rapidez."', tip: 'Pedir essas informações já na mensagem automática economiza tempo: quando você responder, o cliente já terá enviado o que você precisa para dar o orçamento.' },
      { n: 9, text: 'Toque em', bold: '"OK"', tip: 'Se aparecer só um campo de texto sem botão "OK", toque fora do campo para confirmar.' },
      { n: 10, text: 'Agora toque em', bold: '"Programação"', tip: 'Fica logo abaixo do campo de mensagem.' },
      { n: 11, text: 'Selecione a opção:', bold: '"Fora do horário comercial"', warn: 'Para essa opção funcionar, você precisa ter configurado o horário de funcionamento da empresa no perfil. Se não configurou, selecione "Programação personalizada" e defina início às 18h00, fim às 08h00, e marque Sábado (tarde) e Domingo.' },
      { n: 12, text: 'Toque em', bold: '"Salvar"', tip: 'O botão pode estar no canto superior direito ou no rodapé da tela.' },
      { n: 13, text: 'Toque na seta (←) para voltar à tela de', bold: '"Ferramentas comerciais".' },
      { n: 14, text: 'Agora toque em', bold: '"Mensagem de saudação".', tip: 'É a mensagem enviada automaticamente para quem entra em contato pela primeira vez ou após 14 dias sem interação.' },
      { n: 15, text: 'Ative o botão', bold: '"Enviar mensagem de saudação"', tip: 'Se já estiver ativo, só edite o texto.' },
      { n: 16, text: 'Toque em', bold: '"Mensagem"', tip: 'Apague o texto padrão que aparecer.' },
      { n: 17, text: 'Digite a nova mensagem de boas-vindas:', bold: '"Olá! Aqui é a Lobo Jardinagem — Bertioga/SP. Fazemos paisagismo e manutenção de jardins em Bertioga, Riviera de São Lourenço e região. Como posso te ajudar?"', tip: 'Mencionar "Riviera de São Lourenço" já na saudação faz o proprietário da Riviera sentir que você conhece o território dele — diferencial imediato.' },
      { n: 18, text: 'Toque em', bold: '"OK"', tip: 'Depois toque em "Salvar".' },
      { n: 19, text: 'Teste agora:', bold: 'peça para alguém mandar mensagem para o seu número fora do horário comercial.', tip: 'Se a mensagem automática chegar, está funcionando. Se não chegar, verifique se o botão "Enviar mensagem de ausência" está verde e se a programação está correta.' },
    ],
    dica_final: 'Proprietário de veraneio em Bertioga manda mensagem na sexta-feira à noite enquanto está chegando na praia. Se você tiver uma resposta automática clara e profissional, a chance de ele contratar você é muito maior do que se não receber nenhuma resposta. Configure hoje.',
  },
  {
    id: 'reel',
    icon: Clapperboard,
    iconBg: 'bg-forest-100',
    iconColor: 'text-forest-700',
    badge: 'Fazer na próxima visita',
    badgeBg: 'bg-forest-100 text-forest-700',
    title: 'Primeiro Reel — Villagio como Live Case',
    subtitle: 'Na próxima manutenção em um cliente de alto padrão (Villagio ou outro), você tem a oportunidade perfeita: filmar antes, trabalhar, filmar depois. O conteúdo que mais converte no Instagram de jardinagem.',
    tempo: '~20 minutos de filmagem',
    steps: [
      { n: 1, text: 'Antes de começar a manutenção:', bold: 'filme 3 a 5 cenas do jardim no estado atual.', tip: 'Câmera estável. Horizontal. Devagar. Mostra: canteiros, grama, bordas, detalhes que vão mudar.' },
      { n: 2, text: 'Durante o serviço:', bold: 'grave 2 ou 3 trechos de 15 segundos trabalhando.', tip: 'Equipamento em uso, mãos na ferramenta. Bastidores reais criam credibilidade.' },
      {
        n: 3,
        text: 'Depois do serviço:',
        bold: 'filme os mesmos ângulos do antes — exatamente a mesma posição.',
        warn: 'Esse é o passo mais importante. A transformação visual é o que para o scroll no Instagram.',
      },
      { n: 4, text: 'No celular, abra o Instagram → Reels → clique no "+" para criar. Selecione os vídeos antes e depois.' },
      { n: 5, text: 'Monte no formato:', bold: 'ANTES (5s) → TRABALHO (10s) → DEPOIS (10s).', tip: 'Total de 25-30 segundos. Curto converte mais que longo.' },
      { n: 6, text: 'Adicione música (instrumental ou trending do Instagram — evite letra para não competir com a legenda).' },
      { n: 7, text: 'Na legenda, use:', bold: '"Mais uma manutenção concluída em Bertioga. Jardim transformado antes da temporada. Lobo Jardinagem — Bertioga / Riviera de São Lourenço. Orçamento pelo link na bio."', tip: 'Mencionar "Bertioga" e "Riviera de São Lourenço" na legenda é SEO para o Instagram — quando alguém pesquisar por essas palavras, seu post pode aparecer.' },
      { n: 8, text: 'Hashtags:', bold: '#jardinagem #paisagismo #bertioga #rivieradesblourenco #jardinagemlitoral #manutencaojardim #lobojardinagem' },
      { n: 9, text: 'Poste no horário de pico:', bold: 'terça ou quarta entre 18h e 20h.', tip: 'Proprietários de veraneio estão scrollando depois do trabalho. Evite segunda de manhã e domingo.' },
    ],
    dica_final: 'Um Reel de antes/depois de um jardim em Bertioga ou Riviera de São Lourenço pode atingir proprietários que seguem hashtags locais e ainda não sabem que você existe. O custo é zero. O alcance pode trazer contratos de R$4-6k/mês.',
  },
]

function StepItem({ step }: { step: Step }) {
  if (step.fase) {
    return (
      <div className="pt-5 pb-1 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-100" />
        <span className="text-xs font-bold text-forest-700 uppercase tracking-widest whitespace-nowrap">{step.fase}</span>
        <div className="h-px flex-1 bg-gray-100" />
      </div>
    )
  }

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center shrink-0">
        <div className="w-7 h-7 rounded-full bg-forest-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
          {step.n}
        </div>
        <div className="w-px flex-1 bg-gray-200 mt-1" />
      </div>
      <div className="pb-4 min-w-0 flex-1">
        <p className="text-sm text-gray-700 leading-relaxed">
          {step.text}{' '}
          {step.bold && <strong className="text-forest-900">{step.bold}</strong>}
        </p>
        {step.tip && (
          <div className="mt-2 flex gap-2 bg-blue-50 border border-blue-100 rounded-xl p-3">
            <Lightbulb size={13} className="text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 leading-relaxed whitespace-pre-line">{step.tip}</p>
          </div>
        )}
        {step.warn && (
          <div className="mt-2 flex gap-2 bg-amber-50 border border-amber-100 rounded-xl p-3">
            <AlertTriangle size={13} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">{step.warn}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Manuais() {
  const [open, setOpen] = useState<string | null>('gmb')

  return (
    <section id="manuais" className="py-20 bg-[#F4F6F0]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Ações prioritárias</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Guias Práticos</h2>
          <p className="text-gray-500 mt-2">Três ações que podem transformar a Lobo Jardinagem esta semana — passo a passo.</p>
        </div>

        <div className="space-y-3">
          {guides.map(guide => {
            const Icon = guide.icon
            const isOpen = open === guide.id
            return (
              <div key={guide.id}
                className={`bg-white rounded-2xl border transition-all overflow-hidden ${isOpen ? 'border-forest-300 shadow-md' : 'border-gray-100 hover:border-forest-200'}`}>
                <button onClick={() => setOpen(isOpen ? null : guide.id)}
                  className="w-full text-left px-6 py-5 flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl ${guide.iconBg} flex items-center justify-center shrink-0`}>
                    <Icon size={20} className={guide.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <p className="font-bold text-forest-900">{guide.title}</p>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${guide.badgeBg}`}>{guide.badge}</span>
                    </div>
                    <p className="text-gray-500 text-sm leading-snug pr-4">{guide.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:block text-xs text-gray-400 font-medium">{guide.tempo}</span>
                    {isOpen ? <ChevronUp size={18} className="text-forest-600" /> : <ChevronDown size={18} className="text-gray-400" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-100 pt-6">
                      <div className="flex items-center gap-2 mb-5">
                        <CheckCircle2 size={15} className="text-forest-600" />
                        <p className="text-xs font-bold text-forest-700 uppercase tracking-wider">Passo a passo — {guide.tempo}</p>
                      </div>
                      <div>
                        {guide.steps.map((step, idx) => <StepItem key={step.fase ? `fase-${idx}` : step.n} step={step} />)}
                      </div>
                      {guide.dica_final && (
                        <div className="mt-2 bg-forest-800 rounded-2xl p-4 flex gap-3">
                          <Lightbulb size={16} className="text-gold-500 shrink-0 mt-0.5" />
                          <p className="text-white/80 text-sm leading-relaxed">{guide.dica_final}</p>
                        </div>
                      )}
                      {guide.cta && (
                        <a href={guide.cta.href} target="_blank" rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-2 bg-forest-700 hover:bg-forest-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors">
                          {guide.cta.label} <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
