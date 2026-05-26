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
    title: 'GMB: Dominar "jardinagem Gaspar" e "paisagismo Blumenau"',
    subtitle: 'Gaspar ainda não tem empresa de jardinagem com presença digital real no Google Maps. Clientes de Gaspar e Blumenau pesquisam no celular antes de contratar. Este guia, do zero ou do incompleto, coloca a Real Jardinagem na primeira posição para "jardinagem Gaspar" antes que qualquer concorrente perceba.',
    tempo: '~90 minutos (dividir em 3 dias)',
    cta: { label: 'Abrir Google Meu Negócio', href: 'https://business.google.com' },
    steps: [
      { n: 0, text: '', fase: 'FASE 1 — VERIFICAR SITUAÇÃO ATUAL (antes de qualquer edição)' },
      { n: 1, text: 'Acesse', bold: 'business.google.com', tip: 'Faça login com a conta Google que você usou para criar o perfil. Se não lembrar qual conta, abra o Google Maps e pesquise "Real Jardinagem Gaspar" — clique no perfil e toque "Sou o proprietário?" para identificar a conta vinculada.' },
      { n: 2, text: 'Na tela principal, confirme que o perfil', bold: '"Real Jardinagem"', tip: 'Se aparecer mais de um perfil cadastrado, selecione o mais recente ou o que tem mais avaliações.' },
      { n: 3, text: 'Verifique se o perfil está VERIFICADO — deve aparecer um', bold: 'check marcado ao lado do nome.', warn: 'Se o perfil NÃO estiver verificado, você precisa concluir a verificação antes de qualquer outra etapa. No painel do GMB, clique em "Verificar agora" e siga as instruções (geralmente recebe um código por e-mail ou SMS).' },
      { n: 4, text: 'Anote o que está preenchido e o que está vazio. Abra o bloco de notas do celular e escreva o que falta. Não edite ainda — leia o guia inteiro primeiro para ter uma visão do todo.' },

      { n: 0, text: '', fase: 'FASE 2 — NOME E CATEGORIAS (fundação da busca)' },
      { n: 5, text: 'Em "Editar perfil" → Informações → Nome do negócio: confirme que está exatamente como', bold: '"Real Jardinagem"', tip: 'Não adicione palavras-chave no nome (ex: "Real Jardinagem Gaspar") — o Google pode reprovar e o perfil fica suspenso. O nome tem que ser o nome real da empresa.' },
      { n: 6, text: 'Categoria principal: deve estar como "Paisagista" ou "Empresa de jardinagem". Se estiver diferente, toque e pesquise', bold: '"Paisagista"', tip: 'A categoria principal é o fator mais importante para aparecer nas buscas. "Paisagista" engloba jardinagem, manutenção e paisagismo — mais abrangente.' },
      { n: 7, text: 'Toque em "Adicionar categoria" para adicionar categorias secundárias. Adicione:', bold: '"Serviço de paisagismo" e "Serviço de manutenção de jardins"', tip: 'Categorias secundárias aumentam o alcance de buscas relacionadas. Limite a 3 categorias no total — mais que isso pode diluir a relevância.' },
      { n: 8, text: 'Salve as categorias. Aguarde 24-48h para as mudanças aparecerem no Google.' },

      { n: 0, text: '', fase: 'FASE 3 — DESCRIÇÃO ESTRATÉGICA (as palavras que seus clientes digitam)' },
      { n: 9, text: 'Em "Editar perfil" → Informações → Descrição: apague o texto atual (se houver). A descrição precisa conter as palavras exatas que clientes de Gaspar e Blumenau digitam no Google.' },
      { n: 10, text: 'Copie e cole exatamente a seguinte descrição:', bold: '"Real Jardinagem — paisagismo e manutenção de jardins em Gaspar e Blumenau. Especialistas em residências de alto padrão, condomínios e empresas no Vale Europeu catarinense. Projetos e manutenção recorrente com contrato mensal. Equipe profissional, equipamento próprio. Atendemos Gaspar, Blumenau, Brusque e Indaial."', tip: 'Esta descrição contém as palavras-chave mais buscadas para o seu mercado: "Gaspar", "Blumenau", "Vale Europeu", "residências", "condomínios", "empresas". O Google usa a descrição para decidir em quais buscas mostrar seu perfil.' },
      { n: 11, text: 'Não ultrapasse 750 caracteres na descrição — o Google corta o restante. A descrição acima tem ~440 caracteres, seguro.' },
      { n: 12, text: 'Salve a descrição. É a ação de maior impacto deste guia — após 48-72h, pesquise "jardinagem Gaspar" no Google Maps e veja se o perfil aparece.' },

      { n: 0, text: '', fase: 'FASE 4 — ÁREA DE ATENDIMENTO (onde você aparece nas buscas)' },
      { n: 13, text: 'Em "Editar perfil" → Informações → Localização → "Área de atendimento": toque para editar.' },
      { n: 14, text: 'Adicione as seguintes áreas:', bold: 'Gaspar, Blumenau, Brusque, Indaial', tip: 'Essas 4 cidades cobrem o Vale Europeu catarinense. Gaspar é a base, Blumenau é o maior mercado da região — aparecer lá vale muito.' },
      { n: 15, text: 'Importante:', bold: 'não adicione áreas fora do seu raio real de operação.', warn: 'Perfis com área de atendimento exagerada perdem ranking. O Google detecta quando você lista cidades onde nunca gera avaliações — o algoritmo interpreta como spam e penaliza a visibilidade.' },

      { n: 0, text: '', fase: 'FASE 5 — SITE, TELEFONE E HORÁRIO (completude do perfil)' },
      { n: 16, text: 'Em Informações → Site: confirme se o link do seu site está preenchido. Se não tiver site ativo, use o link do seu Instagram (@realjardinag) temporariamente.' },
      { n: 17, text: 'Em Informações → Telefone: confirme o número com WhatsApp está cadastrado. Use o número que você atende os clientes — deve ser o mesmo que está na proposta.' },
      { n: 18, text: 'Em Informações → Horário: preencha o horário real de atendimento.', bold: 'Sugestão: Seg-Sex 7h-17h, Sáb 7h-12h.', tip: 'Donos de empresa e síndicos frequentemente entram em contato no fim de semana ou fora do horário. Se você atende sábado, marque como horário comercial — o cliente vê que está disponível.' },
      { n: 19, text: 'Se você atende em períodos especiais, ative "Horários especiais" no GMB para esses períodos.', tip: 'Fim de ano e início de ano são momentos de maior demanda para empresas que querem jardins organizados. Perfil ativo neste período captura uma demanda concentrada.' },

      { n: 0, text: '', fase: 'FASE 6 — FOTOS ESTRATÉGICAS (o fator de conversão mais alto)' },
      { n: 20, text: 'Perfil sem foto aparece no final dos resultados. Meta mínima:', bold: '10 fotos reais nas primeiras 2 semanas.' },
      { n: 21, text: 'Foto de capa (imagem principal do perfil): use a melhor foto de resultado que você tem — o jardim do melhor cliente depois do serviço.', bold: 'Horizontal, bem iluminada, sem texto sobreposto.', tip: 'Esta é a primeira imagem que o cliente vê na busca. A foto precisa provocar a reação "quero isso para o meu jardim ou minha empresa". Resultado final, verde, organizado.' },
      { n: 22, text: 'Foto de perfil (logo/avatar): use o logo da Real Jardinagem, ou uma foto do Guilherme em serviço, de uniforme. Esta aparece ao lado do nome nos resultados de busca.' },
      { n: 23, text: 'Categoria "Do trabalho": fotos de jardins em serviço, antes/depois, equipamento em uso.', bold: 'Mínimo 5 fotos nesta categoria.', tip: 'Antes e depois lado a lado é o conteúdo que mais converte — qualquer pessoa consegue entender instantaneamente o valor do trabalho.' },
      { n: 24, text: 'Categoria "Equipe": foto de você em serviço. Humaniza o negócio — dono de empresa ou síndico quer saber quem vai cuidar do jardim.' },
      { n: 25, text: 'Antes de enviar cada foto, renomeie o arquivo com palavras-chave:', bold: 'ex: "jardinagem-gaspar-realjardinagem.jpg", "paisagismo-blumenau-resultado.jpg"', tip: 'O Google lê o nome do arquivo e usa para indexar a foto. Arquivo chamado "IMG_20260514_123.jpg" não ajuda em nada. Arquivo chamado "jardim-empresa-gaspar.jpg" sinaliza relevância.' },
      { n: 26, text: 'Seu melhor cliente é o principal case. Se tiver fotos do jardim:', bold: 'adicione com a legenda "Paisagismo residencial — Gaspar/SC. Projeto e manutenção mensal."', tip: 'Mesmo sem identificar o nome do cliente, a localização "Gaspar/SC" na legenda reforça a relevância local.' },

      { n: 0, text: '', fase: 'FASE 7 — PRIMEIRAS AVALIAÇÕES (velocidade importa mais que quantidade)' },
      { n: 27, text: 'O Google prioriza perfis com avaliações RECENTES. Três avaliações novas valem mais que 20 antigas paradas.' },
      { n: 28, text: 'Para obter o link de avaliação: no business.google.com, clique em', bold: '"Receber mais avaliações"', tip: 'Será gerado um link curto no formato g.page/r/... Salve este link no campo "Link de Avaliação" na seção Links Rápidos desta central.' },
      { n: 29, text: 'Meta semana 1:', bold: 'pedir avaliação para os 5 clientes mais satisfeitos da carteira atual.', tip: 'Script WhatsApp: "Oi [NOME]! Tudo bem? Estou organizando minha presença no Google e a sua avaliação me ajudaria muito. É rápido: [LINK]. Qualquer nota e comentário que quiser escrever — agradeço de coração!" — Nunca use "5 estrelas" ou "avaliação positiva" para não parecer coerção.' },
      { n: 30, text: 'Crie um QR Code gratuito (qr-code-generator.com) apontando para o link de avaliação. Imprima e cole na capa da sua proposta comercial — o cliente escaneia na hora, direto do celular.', tip: 'Clientes que assinam contrato estão satisfeitos com o processo — esse é o momento ideal para pedir avaliação. QR Code na proposta captura essa oportunidade.' },
      { n: 31, text: 'Nunca compre avaliações falsas.', warn: 'O Google detecta padrões anormais (muitas avaliações em pouco tempo, mesmo IP) e pode remover o perfil por completo. Avaliações reais de clientes reais é a única estratégia segura e duradoura.' },

      { n: 0, text: '', fase: 'FASE 8 — POSTS E ATUALIZAÇÕES (sinalizar atividade para o Google)' },
      { n: 32, text: 'Google Posts são atualizações publicadas no perfil — aparecem nos resultados de busca. Perfis que postam semanalmente têm melhor posição no ranking.' },
      { n: 33, text: 'Para criar um post: business.google.com →', bold: '"Adicionar atualização" → "Publicar um post"', tip: 'Escolha "Atualização" para posts simples ou "Oferta" para promoções. Posts de oferta têm destaque visual no resultado de busca.' },
      { n: 34, text: 'Primeiro post (copie e adapte):', bold: '"Manutenção de jardim concluída em Gaspar. Área transformada com qualidade profissional. Contrato mensal disponível — vagas limitadas. Fale pelo WhatsApp."', tip: 'Adicione uma foto do resultado. Post com foto tem 3x mais cliques que post sem foto.' },
      { n: 35, text: 'Post para início de ano / novo trimestre:', bold: '"Sua empresa em Gaspar ou Blumenau precisa de jardinagem profissional? A Real Jardinagem tem agenda disponível. Orçamento sem compromisso."', tip: 'Inicio de trimestre é momento em que empresas renovam contratos e planejam manutenção. Intensifique posts em março e setembro.' },
      { n: 36, text: 'Frequência mínima:', bold: '1 post por semana.', tip: 'Configure um alarme semanal (segunda-feira, 8h) para sempre ter um post novo. Posts padrão expiram em 7 dias — perfil sem post recente é interpretado como inativo.' },

      { n: 0, text: '', fase: 'FASE 9 — PERGUNTAS & RESPOSTAS (apareça nas dúvidas dos clientes)' },
      { n: 37, text: 'O GMB tem seção de "Perguntas e respostas" — qualquer pessoa pode perguntar e você responde. Você também pode adicionar suas próprias perguntas.' },
      { n: 38, text: 'Adicione agora estas perguntas (você mesmo) com as respostas correspondentes:', bold: '"Vocês atendem em Blumenau?"', tip: 'Resposta sugerida: "Sim, Blumenau é uma das nossas principais áreas de atendimento. Temos clientes em Blumenau com contrato ativo." — Usar o nome "Blumenau" na resposta reforça a relevância para essa busca.' },
      { n: 39, text: 'Segunda pergunta para adicionar:', bold: '"Fazem contrato de manutenção mensal para empresas?"', tip: 'Resposta sugerida: "Sim, é o nosso principal serviço para empresas e condomínios em Gaspar e Blumenau. O contrato garante frequência regular, proposta por escrito e equipe fixa. Entre em contato para receber um orçamento." — Palavras como "empresas", "condomínios" e "contrato" são exatamente o que esse cliente busca.' },
      { n: 40, text: 'Terceira pergunta:', bold: '"Qual é a área de atendimento de vocês?"', tip: 'Resposta sugerida: "Atendemos Gaspar, Blumenau, Brusque e Indaial. Para regiões fora deste raio, consulte disponibilidade."' },

      { n: 0, text: '', fase: 'FASE 10 — MONITORAMENTO SEMANAL (o que medir)' },
      { n: 41, text: 'Acesse business.google.com →', bold: '"Ver insights" (ou "Desempenho")', tip: 'Você vê: quantas vezes o perfil apareceu nos resultados, quantas pessoas clicaram, quantas ligaram ou pediram rotas. Esses são os números que importam.' },
      { n: 42, text: 'A métrica mais importante:', bold: '"Pesquisas de descoberta"', tip: 'São pessoas que não buscaram "Real Jardinagem" — buscaram "jardinagem Gaspar" ou "paisagismo Blumenau" e acharam você. Isso significa que o SEO local está funcionando. Se esse número estiver crescendo, continue o que está fazendo.' },
      { n: 43, text: 'Se as pessoas clicam no perfil mas não entram em contato:', bold: 'melhore a foto de capa e adicione mais avaliações.', tip: 'Clique no perfil sem entrar em contato = perfil convenceu pela busca, mas não pela primeira impressão visual. Fotos melhores e avaliações recentes resolvem isso.' },
      { n: 44, text: 'Se as pesquisas de descoberta estiverem baixas:', bold: 'revise a descrição adicionando mais variações de palavras-chave.', tip: 'Variações úteis para adicionar: "jardim empresa SC", "paisagismo Gaspar", "manutenção jardim Blumenau", "jardinagem condomínio Vale Europeu".' },

      { n: 0, text: '', fase: 'FASE 11 — POSICIONAMENTO BLUMENAU (estratégia high-ticket)' },
      { n: 45, text: 'Blumenau é o mercado de maior valor próximo a Gaspar: empresas têxteis, industriais e tecnológicas que precisam de apresentação visual profissional — e pagam por isso sem negociar.', tip: 'Esse cliente não decide pelo preço — decide pela confiança e pelo profissionalismo. Quem aparece primeiro no Google, tem avaliações reais e proposta com contrato ganha o contrato.' },
      { n: 46, text: 'Para capturar esse mercado via GMB:', bold: '1) use "Blumenau" e "Vale Europeu" na descrição, 2) tire fotos de jardins com geolocalização ativa no celular, 3) responda avaliações mencionando "Blumenau" quando aplicável.', tip: 'Quando você tira uma foto com GPS ativo e a sobe no GMB, o Google registra a localização da foto. Isso reforça que você realmente atende naquela área — sinal de autoridade local.' },
      { n: 47, text: 'Responsáveis de empresas em Blumenau pesquisam no celular durante o intervalo do trabalho. Certifique-se de que:', bold: 'o número de WhatsApp no GMB está atualizado e com mensagem automática configurada.', tip: 'Guia de WA Business disponível nesta mesma seção — configure a mensagem de ausência para capturar os contatos fora do horário.' },
      { n: 48, text: 'Dois momentos de maior demanda por jardinagem profissional em Gaspar/Blumenau:', bold: 'março/abril (início do outono: empresas organizam jardins após o verão) e outubro/novembro (primavera: flores, replantio, início do período mais quente).', tip: 'Em março: posts com "jardim organizado para o trimestre". Em outubro: posts com flores e resultados de primavera. Nos outros meses: foco em manutenção recorrente como base estável de caixa.' },
    ],
    dica_final: 'Nenhuma empresa de jardinagem domina o Google de Gaspar hoje. Com o perfil completo, 10 fotos reais, 5 avaliações e posts semanais, você está na primeira posição para "jardinagem Gaspar" e "paisagismo Blumenau" antes que qualquer concorrente perceba — e o próximo contrato de R$2.000/mês chega sem prospecção ativa.',
  },
  {
    id: 'wa',
    icon: MessageCircle,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-700',
    badge: 'Urgente — essa semana',
    badgeBg: 'bg-amber-100 text-amber-700',
    title: 'Configurar Mensagem Automática WA Business',
    subtitle: 'Responsáveis de empresas e síndicos em Gaspar e Blumenau mandam mensagem fora do horário comercial — à noite, fim de semana. Sem mensagem automática, você some. Com a mensagem certa, você já captura o lead enquanto dorme.',
    tempo: '~10 minutos',
    steps: [
      { n: 1, text: 'Abra o', bold: 'WhatsApp Business', tip: 'É o app com ícone verde e o "B" no centro — diferente do WhatsApp comum. Se não tiver instalado, baixe na Play Store ou App Store buscando "WhatsApp Business".' },
      { n: 2, text: 'Na tela principal (lista de conversas), toque nos', bold: '3 pontos (⋮) no canto superior direito.' },
      { n: 3, text: 'No menu que abrir, toque em', bold: '"Configurações".' },
      { n: 4, text: 'Na tela de Configurações, toque em', bold: '"Ferramentas comerciais".' },
      { n: 5, text: 'Na lista de ferramentas, toque em', bold: '"Mensagem de ausência".', tip: 'Fica na seção de Mensagens, junto com Mensagem de saudação e Respostas rápidas.' },
      { n: 6, text: 'Ative o botão verde no topo:', bold: '"Enviar mensagem de ausência"', tip: 'Se já estiver verde (ativo), não precisa mexer — só edite o texto a seguir.' },
      { n: 7, text: 'Toque em', bold: '"Mensagem"', tip: 'É o campo com o texto atual. Pode estar com algo genérico.' },
      { n: 8, text: 'Apague todo o texto existente e digite:', bold: '"Obrigado pelo contato com a Real Jardinagem — Gaspar/SC! Estou em campo agora. Retorno em breve. Para orçamentos: envie o endereço e o tipo de área que atendo você com rapidez."', tip: 'Pedir essas informações já na mensagem automática economiza tempo: quando você responder, o cliente já terá enviado o que você precisa para dar o orçamento.' },
      { n: 9, text: 'Toque em', bold: '"OK"', tip: 'Se aparecer só um campo de texto sem botão "OK", toque fora do campo para confirmar.' },
      { n: 10, text: 'Agora toque em', bold: '"Programação"', tip: 'Fica logo abaixo do campo de mensagem.' },
      { n: 11, text: 'Selecione a opção:', bold: '"Fora do horário comercial"', warn: 'Para essa opção funcionar, você precisa ter configurado o horário de funcionamento da empresa no perfil. Se não configurou, selecione "Programação personalizada" e defina início às 18h00, fim às 08h00, e marque Sábado (tarde) e Domingo.' },
      { n: 12, text: 'Toque em', bold: '"Salvar"', tip: 'O botão pode estar no canto superior direito ou no rodapé da tela.' },
      { n: 13, text: 'Toque na seta (←) para voltar à tela de', bold: '"Ferramentas comerciais".' },
      { n: 14, text: 'Agora toque em', bold: '"Mensagem de saudação".', tip: 'É a mensagem enviada automaticamente para quem entra em contato pela primeira vez ou após 14 dias sem interação.' },
      { n: 15, text: 'Ative o botão', bold: '"Enviar mensagem de saudação"', tip: 'Se já estiver ativo, só edite o texto.' },
      { n: 16, text: 'Toque em', bold: '"Mensagem"', tip: 'Apague o texto padrão que aparecer.' },
      { n: 17, text: 'Digite a nova mensagem de boas-vindas:', bold: '"Olá! Aqui é a Real Jardinagem — Gaspar/SC. Fazemos paisagismo e manutenção de jardins em Gaspar, Blumenau e região do Vale Europeu. Como posso te ajudar?"', tip: 'Mencionar "Vale Europeu" já na saudação posiciona a Real Jardinagem como empresa regional — diferencial imediato para quem busca alguém da área.' },
      { n: 18, text: 'Toque em', bold: '"OK"', tip: 'Depois toque em "Salvar".' },
      { n: 19, text: 'Teste agora:', bold: 'peça para alguém mandar mensagem para o seu número fora do horário comercial.', tip: 'Se a mensagem automática chegar, está funcionando. Se não chegar, verifique se o botão "Enviar mensagem de ausência" está verde e se a programação está correta.' },
    ],
    dica_final: 'Responsável de empresa em Gaspar manda mensagem no fim do dia ou no fim de semana. Se você tiver uma resposta automática clara e profissional, a chance de ele contratar você é muito maior do que se não receber nenhuma resposta. Configure hoje.',
  },
  {
    id: 'reel',
    icon: Clapperboard,
    iconBg: 'bg-forest-100',
    iconColor: 'text-forest-700',
    badge: 'Fazer na próxima visita',
    badgeBg: 'bg-forest-100 text-forest-700',
    title: 'Primeiro Reel — Melhor Cliente como Live Case',
    subtitle: 'Na próxima manutenção no seu melhor cliente, você tem a oportunidade perfeita: filmar antes, trabalhar, filmar depois. O conteúdo que mais converte no Instagram de jardinagem.',
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
      { n: 7, text: 'Na legenda, use:', bold: '"Mais uma manutenção concluída em Gaspar. Jardim transformado com profissionalismo. Real Jardinagem — Gaspar / Blumenau. Orçamento pelo link na bio."', tip: 'Mencionar "Gaspar" e "Blumenau" na legenda é SEO para o Instagram — quando alguém pesquisar por essas palavras, seu post pode aparecer.' },
      { n: 8, text: 'Hashtags:', bold: '#jardinagem #paisagismo #gaspar #blumenau #valeeuropeu #manutencaojardim #realjardinagem' },
      { n: 9, text: 'Poste no horário de pico:', bold: 'terça ou quarta entre 18h e 20h.', tip: 'Donos de empresa e síndicos estão scrollando depois do trabalho. Evite segunda de manhã e domingo.' },
    ],
    dica_final: 'Um Reel de antes/depois de um jardim em Gaspar ou Blumenau pode atingir donos de empresa e síndicos que ainda não sabem que você existe. O custo é zero. O alcance pode trazer contratos de R$2-4k/mês.',
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
          <p className="text-gray-500 mt-2">Três ações que podem transformar a Real Jardinagem esta semana — passo a passo.</p>
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
