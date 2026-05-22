import { useState } from 'react'
import { Waves, Wrench, MapPin, Camera, BookOpen, TrendingUp, CheckCircle, Circle, AlertCircle, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react'

const IG_IDEAS_KEY = 'aleandro_ig_ideas_v1'

// ─── Pilares ─────────────────────────────────────────────────────────────────

const pilares = [
  {
    id: 'autoridade',
    nome: 'Autoridade Litoral',
    Icon: Waves,
    bg: 'bg-forest-700',
    freq: '2x/semana',
    desc: 'Posicione a Lobo Jardinagem como a empresa de jardins premium da Riviera. Villagio como âncora em todo post de credibilidade. Proprietário ausente como público-alvo declarado.',
    gancho: '"Cuidamos do Villagio enquanto o proprietário está em São Paulo. Esse é o nosso cliente."',
    formato: 'Reel ou Carrossel',
  },
  {
    id: 'tecnico',
    nome: 'Técnico',
    Icon: Wrench,
    bg: 'bg-teal-600',
    freq: '1x/semana',
    desc: 'Expertise que "jardineiro de praia" não tem: sabe lidar com solo arenoso, salinidade marinha, espécies tropicais, microclima litorâneo. Prova visual de competência profissional.',
    gancho: '"Solo arenoso + brisa marinha + temporada de alta. Manter jardim na Riviera exige técnica — não improviso."',
    formato: 'Reel (work in progress)',
  },
  {
    id: 'local',
    nome: 'Local — Bertioga/Riviera',
    Icon: MapPin,
    bg: 'bg-gold-600',
    freq: '1x/semana',
    desc: 'Referência regional litorânea. Bertioga como base, Riviera de São Lourenço como território premium. Conhece o microclima, a temporada, o que funciona no litoral paulista.',
    gancho: '"Bertioga tem 30.000 habitantes o ano todo e 300.000 na temporada. Esse é o mercado que a Lobo Jardinagem atende."',
    formato: 'Reel ou Story',
  },
  {
    id: 'bastidores',
    nome: 'Bastidores',
    Icon: Camera,
    bg: 'bg-slate-600',
    freq: '2-3x/semana (Stories)',
    desc: 'A rotina profissional que o proprietário ausente nunca vê: chegada, equipe, cuidado, resultado. Humaniza a Lobo Jardinagem sem tirar a autoridade premium.',
    gancho: '"7h da manhã na Riviera. Equipe a postos. O proprietário está em São Paulo — e pode ficar tranquilo."',
    formato: 'Stories + Reels curtos',
  },
  {
    id: 'educativo',
    nome: 'Educativo',
    Icon: BookOpen,
    bg: 'bg-purple-700',
    freq: '1x/semana',
    desc: 'Conteúdo útil para proprietários de casa de veraneio e síndicos: quando cuidar antes da temporada, o que acontece quando abandona o jardim, como contratar correto. Posiciona como especialista.',
    gancho: '"O que acontece com o jardim da sua casa de veraneio nos 8 meses que você não está aqui:"',
    formato: 'Carrossel ou Reel',
  },
]

// ─── Ideias ───────────────────────────────────────────────────────────────────

const ideias = [
  // Autoridade Litoral
  { id: '01', pilar: 'autoridade', formato: 'Reel',      hook: 'Cuidamos do Villagio enquanto o proprietário está em São Paulo. Esse é o tipo de cliente que a Lobo Jardinagem atende.', visual: 'Aleandro direto na câmera, no jardim do Villagio — fala sobre o que é cuidar de uma propriedade premium de alto padrão na Riviera' },
  { id: '02', pilar: 'autoridade', formato: 'Carrossel', hook: 'Casa de veraneio na Riviera: o que acontece com o jardim nos 8 meses que você não visita?', visual: 'Slides mostrando antes (abandono gradual) e depois (recuperação com manutenção regular). Último slide: "Lobo Jardinagem cuida enquanto você não está."' },
  { id: '03', pilar: 'autoridade', formato: 'Reel',      hook: 'O jardim que recebe o proprietário na temporada começa a ser cuidado em julho. Não em dezembro.', visual: 'Aleandro no jardim Villagio — fala sobre o ciclo de manutenção anual para receber alto padrão no verão' },
  { id: '04', pilar: 'autoridade', formato: 'Carrossel', hook: 'Por que proprietários de Riviera que moram em São Paulo nos contratam para cuidar do jardim o ano todo:', visual: 'Slides: sem surpresa na chegada, grama nova em dezembro, relatório fotográfico mensal, sem custo de recuperação. Tom de tranquilidade — "você chega e está pronto."' },

  // Técnico
  { id: '05', pilar: 'tecnico',    formato: 'Reel',      hook: 'Jardim de litoral não é igual a jardim de cidade. Solo arenoso, brisa marinha e umidade mudam tudo. Veja como trabalhamos:', visual: 'Aleandro explica adaptações técnicas para jardim litorâneo — espécies resistentes ao sal, drenagem em solo arenoso, proteção na pré-temporada' },
  { id: '06', pilar: 'tecnico',    formato: 'Reel',      hook: 'Pré-temporada Riviera: o que preparamos para que o jardim esteja perfeito quando você chegar em dezembro.', visual: 'Work in progress: podas, adubação, implantação de novas plantas, grama nova — preparação completa antes da alta temporada' },
  { id: '07', pilar: 'tecnico',    formato: 'Carrossel', hook: 'Estas 5 espécies resistem ao litoral paulista — e a maioria dos jardineiros não sabe plantar elas corretamente:', visual: 'Cada slide: uma espécie (ex: bougainvillea, ixora, helicônia, frangipani, bambu) com cuidados específicos para o litoral. Tom especialista' },
  { id: '08', pilar: 'tecnico',    formato: 'Reel',      hook: 'Antes e depois em 48 horas. Jardim abandonado na Riviera virou espaço de recepção premium. Veja:', visual: 'Transformação antes/depois em propriedade de veraneio — time-lapse ou corte direto. Foco no contraste e na qualidade do resultado final' },

  // Local
  { id: '09', pilar: 'local',      formato: 'Reel',      hook: 'Bertioga tem 30.000 moradores fixos e 300.000 na temporada. A Lobo Jardinagem cuida deste litoral o ano todo.', visual: 'Aleandro em paisagem de Bertioga — cenas do litoral, da cidade, da Riviera — fala sobre o território e a escala do mercado' },
  { id: '10', pilar: 'local',      formato: 'Carrossel', hook: 'Riviera de São Lourenço: por que o padrão de jardim aqui precisa ser diferente de qualquer outro lugar no litoral paulista:', visual: 'Especificidades da Riviera: público premium, condomínios fechados exigentes, alto padrão de vizinhança, temporada como vitrine. Tom de expertise regional' },
  { id: '11', pilar: 'local',      formato: 'Reel',      hook: 'Esta é uma das propriedades que cuidamos na Riviera. O proprietário vive em SP e chega em dezembro sabendo que está tudo certo.', visual: 'Área verde em propriedade da Riviera bem mantida — sem citar nome, mas o ambiente já contextualiza o padrão do cliente' },
  { id: '12', pilar: 'local',      formato: 'Story',     hook: 'Bertioga hoje: mais uma manutenção concluída na Riviera. O litoral está bem cuidado.', visual: 'Story simples: foto do resultado + localização Riviera de São Lourenço/SP + sticker @lobo_jardinagem' },

  // Bastidores
  { id: '13', pilar: 'bastidores', formato: 'Stories',   hook: '7h da manhã na Riviera. Equipe a postos. O dono está em São Paulo e pode ficar tranquilo. POV:', visual: '5 slides: van chegando na Riviera, equipe se preparando, equipamento sendo organizado, trabalho em progresso, resultado — narrativa de "profissionalismo invisível"' },
  { id: '14', pilar: 'bastidores', formato: 'Reel',      hook: 'Como preparamos o relatório fotográfico que enviamos ao proprietário todo mês. Transparência é o nosso produto:', visual: 'Câmera mostra processo de fotos dos ângulos padrão — mesmos pontos do mês anterior para comparar — envio via WhatsApp. Profissionalismo visível' },
  { id: '15', pilar: 'bastidores', formato: 'Stories',   hook: 'Visita técnica antes de fechar proposta para casa de veraneio na Riviera. Veja como funciona nosso processo:', visual: '4 slides: chegada na propriedade, análise da área, medições, conversa com gestora/imobiliária — processo que passa confiança ao proprietário remoto' },
  { id: '16', pilar: 'bastidores', formato: 'Reel',      hook: 'Manutenção mensal no Villagio. A rotina de cuidado que garante que a propriedade está sempre pronta para a temporada:', visual: 'Work in progress no Villagio — equipe em ação, equipamento profissional, resultado da manutenção mensal' },

  // Educativo
  { id: '17', pilar: 'educativo',  formato: 'Carrossel', hook: '3 sinais de que o jardim da sua casa de veraneio está sendo negligenciado — e vai custar caro em dezembro:', visual: 'Slide 1: grama amarelando; Slide 2: pragas instaladas; Slide 3: custo de recuperação vs manutenção regular. Último: "Manutenção preventiva é 5x mais barata que recuperação."' },
  { id: '18', pilar: 'educativo',  formato: 'Reel',      hook: 'Por que síndico de condomínio fechado na Riviera prefere empresa com contrato — não jardineiro avulso.', visual: 'Aleandro explica: garantia de serviço, frequência regular, responsabilidade, relatório, NF. Tom consultivo para síndico/administradora' },
  { id: '19', pilar: 'educativo',  formato: 'Carrossel', hook: 'Guia: o que perguntar antes de contratar empresa de jardinagem para sua casa na Riviera ou condomínio em Bertioga:', visual: 'Lista de perguntas: frequência, relatório fotográfico, equipe fixa, responsabilidade, CNPJ, contrato. Posiciona Lobo Jardinagem como referência de resposta' },
  { id: '20', pilar: 'educativo',  formato: 'Reel',      hook: 'Alta temporada chegando: o checklist de jardim que todo proprietário de veraneio deveria ter. Salva esse post:', visual: 'Aleandro explica o checklist de pré-temporada: poda, adubação, grama, flores sazonais, limpeza de drenos, manutenção de irrigação' },
]

// ─── Roteiros de Vídeo ────────────────────────────────────────────────────────

const roteiros = [
  {
    id: 'r1',
    titulo: 'Roteiro 1 — Apresentação Lobo Jardinagem (Reel 30s)',
    objetivo: 'Primeiro post do perfil — declaração de posicionamento premium para veraneio',
    duracao: '25–30 segundos',
    gancho: '"Somos a Lobo Jardinagem. Cuidamos de casas de veraneio e condomínios premium da Riviera de São Lourenço — enquanto o proprietário está em São Paulo."',
    roteiro: `[CENA 1 — 0s a 5s]
Câmera fixa em área verde bem cuidada do Villagio ou jardim similar na Riviera.
Aleandro fala direto: "Somos a Lobo Jardinagem."

[CENA 2 — 5s a 12s]
Corte para equipe em ação, equipamento profissional.
Voz over: "Bertioga é nossa base. A Riviera de São Lourenço é nosso território premium."

[CENA 3 — 12s a 20s]
Cenas: jardim bem cuidado, antes/depois, relatório fotográfico no celular.
Voz over: "Cuidamos da sua propriedade o ano todo — com contrato, relatório mensal e equipe fixa. Para que na temporada, você só chegue."

[CENA 4 — 20s a 28s]
Aleandro olha para câmera: "Proprietário que vive em SP e tem casa na Riviera — isso foi feito para você."

[LEGENDA]
🌿 Lobo Jardinagem
📍 Bertioga · Riviera de São Lourenço — SP
🏡 Casas de veraneio · Condomínios premium
📸 Relatório fotográfico mensal incluído
🔗 Link na bio

#lobojardinagem #bertioga #rivieradesaolourenco #jardinagem #casadeveraneio #jardinagemsp`,
  },
  {
    id: 'r2',
    titulo: 'Roteiro 2 — Villagio: Live Case (Reel 45s)',
    objetivo: 'Usar Villagio como prova social premium sem expor dados sigilosos',
    duracao: '40–45 segundos',
    gancho: '"Condomínio premium na Riviera. Contrato ativo. O proprietário está em São Paulo — e chega em dezembro com jardim impecável. Veja como:"',
    roteiro: `[CENA 1 — 0s a 5s]
Texto na tela: "Condomínio Premium. Riviera de São Lourenço."
Música suave, clima de litoral de alto padrão.

[CENA 2 — 5s a 15s]
Imagens do jardim do Villagio — área externa, gramado, plantas tropicais.
Voz over: "O proprietário mora em São Paulo. A propriedade fica aqui. O jardim não pode parar."

[CENA 3 — 15s a 30s]
Work in progress: equipe, equipamento, processo de manutenção.
Voz over: "Manutenção mensal. Relatório fotográfico enviado direto para o WhatsApp. Equipe fixa que conhece cada canto da propriedade."

[CENA 4 — 30s a 40s]
DEPOIS: jardim impecável.
Texto: "Pronto para a temporada. Todo mês."

[CENA 5 — 40s a 45s]
Aleandro: "Lobo Jardinagem. Se você tem casa na Riviera — link na bio."

[LEGENDA]
Manutenção mensal concluída 🌿
O dono está em SP. O jardim está perfeito.

Lobo Jardinagem
📍 Bertioga · Riviera de São Lourenço

#lobojardinagem #villagio #rivieradesaolourenco #casadeveraneio #jardinagempremium #bertioga`,
  },
  {
    id: 'r3',
    titulo: 'Roteiro 3 — Autoridade Bertioga (Reel 20s)',
    objetivo: 'Posicionamento regional — Bertioga/Riviera como território da Lobo Jardinagem',
    duracao: '18–22 segundos',
    gancho: '"Bertioga. Riviera. Este litoral é nosso território."',
    roteiro: `[CENA 1 — 0s a 4s]
Imagem de drone ou panorâmica da Riviera de São Lourenço / praia de Bertioga.
Texto animado: "Bertioga · Riviera de São Lourenço"

[CENA 2 — 4s a 10s]
Aleandro: "Cuidamos de jardins neste litoral. Casas de veraneio. Condomínios. Propriedades premium."
Cenas de propriedades atendidas — sem revelar nomes.

[CENA 3 — 10s a 16s]
Voz over: "Solo arenoso, brisa marinha, temporada de verão. Jardim de litoral exige quem conhece. A gente conhece."

[CENA 4 — 16s a 20s]
Aleandro: "Lobo Jardinagem. A empresa de Bertioga."

[LEGENDA]
O litoral tem empresa de jardinagem profissional 🌿
📍 Bertioga · Riviera de São Lourenço — SP

#lobojardinagem #bertioga #rivieradesaolourenco #paisagismolitoral`,
  },
  {
    id: 'r4',
    titulo: 'Roteiro 4 — Antes e Depois (Casa de Veraneio) (Reel 30s)',
    objetivo: 'Transformação visual — proprietário que não visitava há 6 meses',
    duracao: '28–32 segundos',
    gancho: '"Casa de veraneio. 6 meses sem visita. O que encontramos — e o que entregamos:"',
    roteiro: `[CENA 1 — 0s a 3s]
Texto: "6 meses sem manutenção 👇" — tela preta ou fade in.

[CENA 2 — 3s a 8s]
Área verde em estado de abandono: grama alta, plantas mortas, entulho litorâneo.
Música começa. Tom de "chegamos para resolver."

[CENA 3 — 8s a 12s]
Work in progress: equipamento em ação, equipe, velocidade 2x.

[CENA 4 — 12s a 17s]
Texto: "48 horas depois 👇"

[CENA 5 — 17s a 25s]
Mesmos ângulos — jardim completamente recuperado, limpo, pronto para receber.
Câmera lenta para valorizar o resultado.

[CENA 6 — 25s a 30s]
Aleandro: "Lobo Jardinagem. Bertioga e Riviera. Orçamento no link da bio."

[LEGENDA]
Casa de veraneio recuperada 🌿✅
6 meses de abandono → jardim premium em 48h.

📍 Riviera de São Lourenço — SP
📋 Contrato mensal: nunca mais passa por isso.

#antesedepois #lobojardinagem #rivieradesaolourenco #casadeveraneio #bertioga #jardinagem`,
  },
]

// ─── Bio ──────────────────────────────────────────────────────────────────────

const novaBio = `🌿 Lobo Jardinagem
📍 Bertioga · Riviera de São Lourenço — SP
🏡 Casas de veraneio · Condomínios premium
📸 Relatório fotográfico mensal incluído
🔗 comercial271.github.io/comercial271-central-lobo-jardinagem`

// ─── Destaques ────────────────────────────────────────────────────────────────

const destaques = [
  { emoji: '🌿', nome: 'Quem Somos',  desc: 'Lobo Jardinagem, Bertioga/Riviera. Equipe profissional, contrato, relatório fotográfico.' },
  { emoji: '🏡', nome: 'Cases',       desc: 'Villagio e outras propriedades premium documentadas. Fotos antes/depois reais.' },
  { emoji: '🛠️', nome: 'Serviços',    desc: 'Manutenção mensal, pré-temporada, implantação, poda técnica, condomínios.' },
  { emoji: '📍', nome: 'Riviera',     desc: 'Propriedades atendidas na Riviera de São Lourenço. Presença local documentada.' },
  { emoji: '📋', nome: 'Orçamento',  desc: 'Como funciona: visita gratuita, proposta em 24h, contrato mensal.' },
]

// ─── Badge colors ─────────────────────────────────────────────────────────────

const pilarBadge: Record<string, string> = {
  autoridade:  'bg-forest-100 text-forest-800 border-forest-200',
  tecnico:     'bg-teal-100 text-teal-800 border-teal-200',
  local:       'bg-yellow-100 text-yellow-800 border-yellow-200',
  bastidores:  'bg-slate-100 text-slate-800 border-slate-200',
  educativo:   'bg-purple-100 text-purple-800 border-purple-200',
}
const pilarLabel: Record<string, string> = {
  autoridade:  'Autoridade',
  tecnico:     'Técnico',
  local:       'Local',
  bastidores:  'Bastidores',
  educativo:   'Educativo',
}

function loadUsed(): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(IG_IDEAS_KEY) || '[]')) } catch { return new Set() }
}
function saveUsed(s: Set<string>) {
  try { localStorage.setItem(IG_IDEAS_KEY, JSON.stringify([...s])) } catch {}
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text).catch(() => {
      const el = document.createElement('textarea'); el.value = text
      document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el)
    })
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-forest-800 hover:bg-forest-700 text-white'}`}>
      {copied ? <><Check size={12} /> Copiado!</> : <><Copy size={12} /> Copiar</>}
    </button>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function InstagramBraun() {
  const [used, setUsed]               = useState<Set<string>>(loadUsed)
  const [activePilar, setActivePilar] = useState<string | null>(null)
  const [openPilar, setOpenPilar]     = useState<string | null>(null)
  const [openRoteiro, setOpenRoteiro] = useState<string | null>(null)

  const toggleUsed = (id: string) => {
    const next = new Set(used)
    if (next.has(id)) next.delete(id); else next.add(id)
    setUsed(next); saveUsed(next)
  }

  const filtered = activePilar ? ideias.filter(i => i.pilar === activePilar) : ideias
  const usedCount = used.size

  return (
    <section id="instagram" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Presença digital premium</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Instagram @lobo_jardinagem</h2>
          <p className="text-gray-500 mt-2">Bio, destaques, estratégia de conteúdo e roteiros prontos para gravar.</p>
        </div>

        {/* Urgência */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 flex gap-3 items-start">
          <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-900">@lobo_jardinagem precisa de presença agora</p>
            <p className="text-amber-800 text-sm mt-1">
              Proprietários de casas de veraneio pesquisam no Instagram antes de contratar quem vai cuidar da propriedade na ausência deles. Um perfil sem posts passa insegurança — o oposto do que você vende. Use o Villagio como âncora: <strong>o primeiro Reel já posiciona você como a empresa premium da Riviera.</strong>
            </p>
          </div>
        </div>

        {/* ── Nova Bio ── */}
        <div className="bg-forest-800 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-1">Nova Bio @lobo_jardinagem</p>
              <p className="text-white/70 text-sm">Copie e cole no Instagram → Editar Perfil → Biografia</p>
            </div>
            <CopyButton text={novaBio} />
          </div>
          <pre className="bg-forest-900/50 rounded-xl p-4 text-white text-sm whitespace-pre-wrap font-sans leading-relaxed border border-forest-700">{novaBio}</pre>
          <div className="mt-4 grid sm:grid-cols-3 gap-3 text-xs">
            {[
              { label: 'Riviera de São Lourenço', desc: 'Território premium que nenhum concorrente local posiciona explicitamente' },
              { label: 'Casas de veraneio',        desc: 'Declara o público-alvo — proprietário ausente vai se identificar imediatamente' },
              { label: 'Relatório fotográfico',    desc: 'Diferencial visível na bio — transmite confiança para quem está longe' },
            ].map((item, i) => (
              <div key={i} className="bg-forest-700/50 rounded-xl p-3">
                <p className="text-gold-400 font-bold">{item.label}</p>
                <p className="text-white/60 mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Destaques ── */}
        <div className="mb-10">
          <h3 className="font-bold text-forest-900 text-lg mb-1">Destaques (Highlights) — Estrutura</h3>
          <p className="text-gray-500 text-sm mb-5">Crie estes 5 destaques no perfil. Cada um é uma "vitrine" para um tipo de cliente diferente.</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {destaques.map((d, i) => (
              <div key={i} className="bg-[#F4F6F0] rounded-2xl p-4 text-center">
                <div className="text-3xl mb-2">{d.emoji}</div>
                <p className="font-bold text-forest-900 text-sm mb-1">{d.nome}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-800">
            Como criar: Instagram → perfil → toque no "+" abaixo da bio → "Destaques" → selecione Stories relevantes → nomeie com os títulos acima.
          </div>
        </div>

        {/* ── Narrativa Central ── */}
        <div className="bg-forest-800 rounded-2xl p-6 mb-10 text-white">
          <div className="flex items-center gap-2 mb-5">
            <Waves size={18} className="text-gold-500" />
            <p className="font-bold text-lg">A narrativa que diferencia @lobo_jardinagem de todos</p>
          </div>
          <p className="text-white/70 text-sm mb-6 max-w-2xl leading-relaxed">
            Nenhuma empresa de jardinagem em Bertioga ou na Riviera conta uma história pensada para proprietários ausentes no Instagram. Você não é "mais um jardineiro de praia" — você é a <strong className="text-white">empresa que cuida do patrimônio premium enquanto o dono não está, com prova de que está sendo feito.</strong>
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { n: '01', titulo: 'Fale com o ausente', desc: 'Todo post deve fazer o proprietário que está em SP pensar "é exatamente o que eu preciso." Ele está sempre presente no copy.' },
              { n: '02', titulo: 'Use o Villagio', desc: 'Primeiro case em todo post de credibilidade. "Cuidamos do Villagio" vale mais que mil seguidores. Mencione sem pedir permissão — você está lá.' },
              { n: '03', titulo: 'Domine o litoral', desc: 'Bertioga + Riviera = território declarado. Nenhum concorrente faz isso. Quem crava o território primeiro, domina as buscas e a memória do cliente.' },
            ].map(r => (
              <div key={r.n} className="bg-forest-700/50 rounded-xl p-4">
                <p className="text-gold-500 font-bold text-2xl mb-1 leading-none">{r.n}</p>
                <p className="text-white font-bold text-sm mb-1.5">{r.titulo}</p>
                <p className="text-white/60 text-xs leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Roteiros ── */}
        <h3 className="font-bold text-forest-900 text-lg mb-2">Roteiros de Vídeo — Prontos para Gravar</h3>
        <p className="text-gray-500 text-sm mb-5">4 roteiros completos com gancho, cena a cena e legenda. Grave na próxima visita ao Villagio.</p>
        <div className="space-y-3 mb-10">
          {roteiros.map(r => {
            const isOpen = openRoteiro === r.id
            return (
              <div key={r.id} className={`bg-[#F4F6F0] rounded-2xl border-2 transition-all overflow-hidden ${isOpen ? 'border-forest-400' : 'border-transparent'}`}>
                <button onClick={() => setOpenRoteiro(isOpen ? null : r.id)}
                  className="w-full text-left px-5 py-4 flex items-center gap-4">
                  <div className="bg-forest-800 rounded-xl p-2.5 shrink-0">
                    <Waves size={16} className="text-gold-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-forest-900 text-sm">{r.titulo}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="text-xs bg-forest-100 text-forest-700 px-2 py-0.5 rounded-full font-medium">{r.duracao}</span>
                      <span className="text-xs text-gray-500 truncate">{r.objetivo}</span>
                    </div>
                  </div>
                  {isOpen ? <ChevronUp size={16} className="text-forest-600 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 border-t border-gray-200">
                    <div className="mt-4 mb-3 bg-forest-800 rounded-xl px-4 py-3">
                      <p className="text-gold-400 text-xs font-bold uppercase tracking-wide mb-1">Gancho</p>
                      <p className="text-white text-sm font-semibold italic">"{r.gancho}"</p>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-forest-800 uppercase tracking-wide">Roteiro completo</p>
                      <CopyButton text={r.roteiro} />
                    </div>
                    <pre className="text-xs text-gray-700 whitespace-pre-wrap font-sans bg-white border border-gray-100 rounded-xl p-4 leading-relaxed max-h-80 overflow-y-auto">{r.roteiro}</pre>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* ── Pilares ── */}
        <h3 className="font-bold text-forest-900 text-lg mb-2">Os 5 Pilares de Conteúdo</h3>
        <p className="text-gray-500 text-sm mb-5">Clique para filtrar as ideias abaixo. Alterne entre todos para manter o perfil equilibrado.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-10">
          {pilares.map(p => {
            const isActive = activePilar === p.id
            const isOpen   = openPilar === p.id
            return (
              <div key={p.id} className={`rounded-2xl border-2 bg-white transition-all overflow-hidden ${isActive ? 'border-forest-500 shadow-md' : 'border-transparent hover:border-forest-100'}`}>
                <button onClick={() => setActivePilar(prev => prev === p.id ? null : p.id)} className="w-full text-left p-4">
                  <div className={`w-9 h-9 rounded-xl ${p.bg} flex items-center justify-center mb-3`}>
                    <p.Icon size={16} className="text-white" />
                  </div>
                  <p className="font-bold text-forest-900 text-sm mb-0.5">{p.nome}</p>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{p.freq}</span>
                </button>
                <button onClick={() => setOpenPilar(prev => prev === p.id ? null : p.id)} className="w-full text-left px-4 pb-3">
                  <p className={`text-xs text-forest-600 font-semibold hover:text-forest-800 transition-colors ${isOpen ? 'text-forest-800' : ''}`}>
                    {isOpen ? '▲ ver menos' : '▼ ver detalhes'}
                  </p>
                  {isOpen && (
                    <div className="mt-2 space-y-1.5">
                      <p className="text-xs text-gray-600 leading-relaxed">{p.desc}</p>
                      <p className="text-xs text-forest-700 italic">Gancho: {p.gancho}</p>
                      <span className="text-xs bg-forest-50 text-forest-700 px-2 py-0.5 rounded-full font-medium">{p.formato}</span>
                    </div>
                  )}
                </button>
              </div>
            )
          })}
        </div>

        {/* Calendário semanal */}
        <div className="bg-[#F4F6F0] rounded-2xl p-6 mb-10">
          <h3 className="font-bold text-forest-900 mb-1">Calendário Semanal Padrão</h3>
          <p className="text-gray-500 text-sm mb-5">Mínimo realista: 4 posts + Stories diários</p>
          <div className="grid grid-cols-7 gap-1.5">
            {[
              { dia: 'SEG', acao: 'Autoridade',    formato: 'Reel',      bg: 'bg-forest-100 text-forest-800' },
              { dia: 'TER', acao: 'Bastidores',    formato: 'Stories',   bg: 'bg-slate-100 text-slate-800' },
              { dia: 'QUA', acao: 'Técnico',       formato: 'Reel',      bg: 'bg-teal-100 text-teal-800' },
              { dia: 'QUI', acao: 'Bastidores',    formato: 'Stories',   bg: 'bg-slate-100 text-slate-800' },
              { dia: 'SEX', acao: 'Educativo/Local', formato: 'Carrossel', bg: 'bg-purple-100 text-purple-800' },
              { dia: 'SAB', acao: 'Bastidores obra', formato: 'Stories', bg: 'bg-gray-100 text-gray-600' },
              { dia: 'DOM', acao: 'Off ou Repost', formato: '—',         bg: 'bg-gray-50 text-gray-400' },
            ].map(item => (
              <div key={item.dia} className={`rounded-xl p-2.5 ${item.bg}`}>
                <p className="font-bold text-xs uppercase tracking-wider mb-2">{item.dia}</p>
                <p className="text-xs font-semibold leading-snug mb-1.5">{item.acao}</p>
                <span className="text-xs opacity-60 bg-black/10 px-1.5 py-0.5 rounded-full block w-fit">{item.formato}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Banco de Ideias */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="font-bold text-forest-900 text-lg">Banco de Conteúdo — 20 Ideias Prontas</h3>
            <p className="text-gray-500 text-sm mt-0.5">Marque como "publicado" quando executar. {usedCount} / 20 publicados.</p>
          </div>
          {activePilar && (
            <button onClick={() => setActivePilar(null)}
              className="text-xs text-forest-700 border border-forest-300 px-3 py-1.5 rounded-lg hover:bg-forest-50 transition-colors">
              Mostrar todos ✕
            </button>
          )}
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
          <div
            className="bg-gradient-to-r from-forest-600 to-gold-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(usedCount / 20) * 100}%` }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-3 mb-10">
          {filtered.map(ideia => {
            const isUsed = used.has(ideia.id)
            return (
              <div key={ideia.id}
                className={`bg-white rounded-2xl border p-4 shadow-sm transition-all ${isUsed ? 'opacity-50 border-gray-100' : 'border-gray-100 hover:border-forest-200 hover:shadow'}`}>
                <div className="flex items-start gap-3">
                  <button onClick={() => toggleUsed(ideia.id)} className="shrink-0 mt-0.5">
                    {isUsed
                      ? <CheckCircle size={22} className="text-green-500" />
                      : <Circle size={22} className="text-gray-200 hover:text-forest-400 transition-colors" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${pilarBadge[ideia.pilar]}`}>{pilarLabel[ideia.pilar]}</span>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">{ideia.formato}</span>
                    </div>
                    <p className={`text-sm font-semibold leading-snug mb-2 ${isUsed ? 'line-through text-gray-400' : 'text-forest-900'}`}>
                      {ideia.hook}
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed">{ideia.visual}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA final */}
        <div className="bg-forest-800 rounded-2xl p-6 text-white text-center">
          <TrendingUp size={28} className="text-gold-500 mx-auto mb-3" />
          <p className="font-bold text-lg mb-2">Comece pelo Roteiro 1 — Apresentação Lobo Jardinagem</p>
          <p className="text-white/70 text-sm max-w-lg mx-auto">
            Na próxima visita ao Villagio, grave o Roteiro 2 (Live Case). Dois vídeos e @lobo_jardinagem já tem mais presença que 100% dos concorrentes de Bertioga.{' '}
            <span className="text-gold-500 font-semibold">Quem declara o território primeiro, domina primeiro.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
