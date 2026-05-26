import { useState } from 'react'
import { Leaf, Wrench, MapPin, Camera, BookOpen, TrendingUp, CheckCircle, Circle, AlertCircle, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react'

const IG_IDEAS_KEY = 'guilherme_ig_ideas_v1'

// ─── Pilares ─────────────────────────────────────────────────────────────────

const pilares = [
  {
    id: 'autoridade',
    nome: 'Autoridade Gaspar',
    Icon: Leaf,
    bg: 'bg-forest-700',
    freq: '2x/semana',
    desc: 'Posicione a Real Jardinagem como a empresa de jardins profissional de Gaspar. Zero concorrência digital na cidade — quem declara o território primeiro, domina. Use seu melhor cliente como âncora de credibilidade.',
    gancho: '"A Real Jardinagem é a empresa de jardinagem profissional de Gaspar. Com contrato, proposta e nota fiscal."',
    formato: 'Reel ou Carrossel',
  },
  {
    id: 'tecnico',
    nome: 'Técnico',
    Icon: Wrench,
    bg: 'bg-teal-600',
    freq: '1x/semana',
    desc: 'Expertise que jardineiro avulso não tem: conhece o microclima do Vale Europeu, espécies que funcionam em SC, técnicas de poda e manutenção que preservam o jardim por mais tempo. Prova visual de competência.',
    gancho: '"Vale Europeu tem clima diferente. Solo, espécies e manutenção — tudo muda. A Real Jardinagem conhece cada detalhe."',
    formato: 'Reel (work in progress)',
  },
  {
    id: 'local',
    nome: 'Local — Gaspar/Blumenau',
    Icon: MapPin,
    bg: 'bg-gold-600',
    freq: '1x/semana',
    desc: 'Referência regional do Vale Europeu. Gaspar como base, Blumenau como expansão natural. Conhece as empresas, os condomínios, o que funciona nesta região. Posicionamento de quem pertence ao território.',
    gancho: '"Gaspar e Blumenau. Este é o território da Real Jardinagem. Aqui é onde crescemos."',
    formato: 'Reel ou Story',
  },
  {
    id: 'bastidores',
    nome: 'Bastidores / Fiorino',
    Icon: Camera,
    bg: 'bg-slate-600',
    freq: '2-3x/semana (Stories)',
    desc: 'A rotina de quem trabalha com seriedade: a Fiorino na rua cedo, equipamento organizado, equipe em ação, resultado entregue. Humaniza a Real Jardinagem sem tirar a autoridade profissional.',
    gancho: '"7h da manhã. A Fiorino na rua. Mais um dia de Real Jardinagem em Gaspar."',
    formato: 'Stories + Reels curtos',
  },
  {
    id: 'educativo',
    nome: 'Educativo',
    Icon: BookOpen,
    bg: 'bg-purple-700',
    freq: '1x/semana',
    desc: 'Conteúdo útil para donos de empresa, síndicos e proprietários: o que acontece com jardim sem manutenção regular, por que contrato vale mais que serviço avulso, como contratar jardinagem corretamente. Posiciona como especialista.',
    gancho: '"O que acontece com o jardim da sua empresa quando você não tem contrato de manutenção:"',
    formato: 'Carrossel ou Reel',
  },
]

// ─── Ideias ───────────────────────────────────────────────────────────────────

const ideias = [
  // Autoridade Gaspar
  { id: '01', pilar: 'autoridade', formato: 'Reel',      hook: 'Zero concorrência digital em Gaspar. A Real Jardinagem vai ser a primeira empresa de paisagismo a dominar o Google da cidade.', visual: 'Guilherme direto na câmera, no jardim do melhor cliente — fala sobre o que é cuidar de uma propriedade com profissionalismo no Vale Europeu' },
  { id: '02', pilar: 'autoridade', formato: 'Carrossel', hook: '9 dos 10 clientes que temos nunca reclamaram de preço. Isso significa uma coisa: estamos cobrando abaixo do que o mercado aceita.', visual: 'Slides: o que cliente sem reclamação de preço sinaliza, o que você poderia cobrar, como reajustar sem perder o cliente. Tom de crescimento consciente.' },
  { id: '03', pilar: 'autoridade', formato: 'Reel',      hook: 'A empresa de jardinagem de Gaspar que trabalha com contrato, proposta e nota fiscal. Veja por que isso muda tudo para o cliente:', visual: 'Guilherme explica o diferencial de ser empresa formal vs jardineiro avulso — segurança, garantia, recorrência, proposta por escrito' },
  { id: '04', pilar: 'autoridade', formato: 'Carrossel', hook: 'Por que donos de empresa e síndicos em Gaspar estão trocando o jardineiro avulso por contrato com empresa profissional:', visual: 'Slides: garantia de frequência, proposta documentada, NF para despesa, responsabilidade, sem "sumiço". Tom consultivo para quem decide.' },

  // Técnico
  { id: '05', pilar: 'tecnico',    formato: 'Reel',      hook: 'O Vale Europeu tem microclima único em SC. O que funciona em Florianópolis não funciona aqui. Veja como trabalhamos na região:', visual: 'Guilherme explica adaptações para o clima de Gaspar/Blumenau — espécies resistentes ao frio do outono, poda no timing certo, gramado em SC' },
  { id: '06', pilar: 'tecnico',    formato: 'Reel',      hook: 'Antes e depois em 24 horas. Área verde de empresa em Gaspar completamente transformada. Veja:', visual: 'Work in progress: chegada, equipamento, trabalho em ação, resultado final. Velocidade e qualidade visíveis no corte direto.' },
  { id: '07', pilar: 'tecnico',    formato: 'Carrossel', hook: '5 espécies que funcionam muito bem no clima do Vale Europeu — e como manter cada uma corretamente:', visual: 'Cada slide: uma espécie com cuidados específicos para SC. Tom de especialista que conhece a região.' },
  { id: '08', pilar: 'tecnico',    formato: 'Reel',      hook: 'Como a Real Jardinagem transforma área verde de empresa em vitrine de profissionalismo. Veja o processo completo:', visual: 'Processo de implantação ou manutenção completa em empresa — planejamento, execução, resultado. Cada etapa documentada.' },

  // Local
  { id: '09', pilar: 'local',      formato: 'Reel',      hook: 'Gaspar tem dezenas de empresas sem jardinagem profissional. A Real Jardinagem chegou para mudar esse cenário.', visual: 'Guilherme mostrando o território — cenas de Gaspar, exemplos de áreas verdes sem manutenção vs com manutenção, oportunidade clara' },
  { id: '10', pilar: 'local',      formato: 'Carrossel', hook: 'Por que empresas e condomínios de Blumenau e Gaspar deveriam ter contrato de jardinagem — e não serviço avulso:', visual: 'Especificidades do Vale Europeu: padrão das empresas têxteis, condomínios novos, exigência de apresentação. Tom de expertise regional.' },
  { id: '11', pilar: 'local',      formato: 'Reel',      hook: 'Esta é uma empresa que cuidamos em Gaspar. Jardim que antes era descuidado — agora é a vitrine da entrada.', visual: 'Área verde em empresa de Gaspar bem mantida — sem citar nome, mas o ambiente contextualiza o padrão do cliente' },
  { id: '12', pilar: 'local',      formato: 'Story',     hook: 'Mais um serviço concluído no Vale Europeu. A Real Jardinagem cuida desta região.', visual: 'Story simples: foto do resultado + localização Gaspar/SC + sticker @realjardinag' },

  // Bastidores / Fiorino
  { id: '13', pilar: 'bastidores', formato: 'Stories',   hook: '7h da manhã. A Fiorino na rua. Equipe a postos. Mais um dia de Real Jardinagem em Gaspar. POV:', visual: '5 slides: Fiorino saindo cedo, Guilherme preparando equipamento, trabalho em progresso, detalhe do resultado, encerramento — narrativa de profissionalismo real' },
  { id: '14', pilar: 'bastidores', formato: 'Reel',      hook: 'Como preparamos nossa proposta profissional para empresas e condomínios. Transparência é parte do serviço:', visual: 'Câmera mostra visita técnica, anotações, montagem da proposta, envio via WhatsApp. Profissionalismo visível desde o primeiro contato.' },
  { id: '15', pilar: 'bastidores', formato: 'Stories',   hook: 'Visita técnica em empresa de Blumenau. Como avaliamos antes de montar a proposta:', visual: '4 slides: chegada na empresa, avaliação da área, medições, conversa com responsável — processo que passa confiança' },
  { id: '16', pilar: 'bastidores', formato: 'Reel',      hook: 'A Fiorino que carrega o sonho da Real Jardinagem. De onde viemos para onde vamos em 2026:', visual: 'Guilherme fala sobre a trajetória — a Fiorino como símbolo da operação, crescimento, meta R$15k/mês, o que mudou com profissionalização' },

  // Educativo
  { id: '17', pilar: 'educativo',  formato: 'Carrossel', hook: '3 sinais de que o jardim da sua empresa está prejudicando sua imagem — e vai custar caro recuperar:', visual: 'Slide 1: grama alta na entrada; Slide 2: sem manutenção regular; Slide 3: custo de recuperação vs manutenção. Último: "Manutenção preventiva custa 5x menos que recuperação."' },
  { id: '18', pilar: 'educativo',  formato: 'Reel',      hook: 'Por que síndico de condomínio em Gaspar prefere empresa com contrato — e não jardineiro avulso.', visual: 'Guilherme explica: garantia de frequência, proposta documentada, responsabilidade, NF para condomínio, relatório de serviço. Tom consultivo.' },
  { id: '19', pilar: 'educativo',  formato: 'Carrossel', hook: 'O que perguntar antes de contratar empresa de jardinagem para sua empresa ou condomínio em Gaspar e Blumenau:', visual: 'Lista de perguntas: frequência, contrato escrito, CNPJ ativo, nota fiscal, equipe fixa. Posiciona Real Jardinagem como referência de resposta.' },
  { id: '20', pilar: 'educativo',  formato: 'Reel',      hook: 'Quanto custa não ter jardinagem profissional na entrada da sua empresa. A conta que poucos fazem:', visual: 'Guilherme explica custo de recuperação vs manutenção regular, impacto na imagem do negócio, custo por m² de recuperação total' },
]

// ─── Roteiros de Vídeo ────────────────────────────────────────────────────────

const roteiros = [
  {
    id: 'r1',
    titulo: 'Roteiro 1 — Apresentação Real Jardinagem (Reel 30s)',
    objetivo: 'Primeiro post do perfil — declaração de posicionamento profissional em Gaspar',
    duracao: '25–30 segundos',
    gancho: '"Somos a Real Jardinagem. Cuidamos de residências, empresas e condomínios em Gaspar e Blumenau — com contrato, proposta e nota fiscal."',
    roteiro: `[CENA 1 — 0s a 5s]
Câmera fixa em área verde bem cuidada — jardim de empresa ou residência em Gaspar.
Guilherme fala direto: "Somos a Real Jardinagem."

[CENA 2 — 5s a 12s]
Corte para equipe em ação, equipamento profissional, Fiorino ao fundo.
Voz over: "Gaspar é nossa base. Blumenau é nossa expansão. Vale Europeu é o nosso território."

[CENA 3 — 12s a 20s]
Cenas: jardim bem cuidado, antes/depois, proposta sendo enviada pelo celular.
Voz over: "Cuidamos do jardim da sua empresa ou residência com contrato, frequência garantida e proposta por escrito."

[CENA 4 — 20s a 28s]
Guilherme olha para câmera: "Dono de empresa ou síndico que quer profissionalismo no jardim — isso foi feito para você."

[LEGENDA]
🌿 Real Jardinagem
📍 Gaspar · Blumenau — SC
🏡 Residências · Condomínios · Empresas
📋 Proposta profissional com contrato
🔗 Link na bio

#realjardinagem #gaspar #blumenau #valeeuropeu #jardinagem #paisagismo #jardinagemdeem presas`,
  },
  {
    id: 'r2',
    titulo: 'Roteiro 2 — Melhor Cliente como Live Case (Reel 45s)',
    objetivo: 'Usar o melhor cliente como prova social premium sem expor dados sigilosos',
    duracao: '40–45 segundos',
    gancho: '"Empresa em Gaspar. Contrato ativo há meses. O jardim que todo visitante vê na entrada. Veja como mantemos:"',
    roteiro: `[CENA 1 — 0s a 5s]
Texto na tela: "Empresa em Gaspar. Contrato mensal ativo."
Música instrumental, clima profissional.

[CENA 2 — 5s a 15s]
Imagens do jardim da empresa — área externa, gramado, plantas, entrada organizada.
Voz over: "O responsável não tem tempo de se preocupar com o jardim. Esse é o nosso trabalho."

[CENA 3 — 15s a 30s]
Work in progress: equipe, equipamento, manutenção.
Voz over: "Manutenção mensal com contrato. Proposta documentada. Equipe fixa que conhece cada canto da área."

[CENA 4 — 30s a 40s]
DEPOIS: jardim impecável.
Texto: "Pronto para receber clientes. Todo mês."

[CENA 5 — 40s a 45s]
Guilherme: "Real Jardinagem. Gaspar e Blumenau — link na bio."

[LEGENDA]
Manutenção mensal concluída 🌿
A entrada está perfeita. O responsável não precisou se preocupar.

Real Jardinagem
📍 Gaspar · Blumenau — SC

#realjardinagem #gaspar #blumenau #valeeuropeu #jardinagem #empresas`,
  },
  {
    id: 'r3',
    titulo: 'Roteiro 3 — Autoridade Vale Europeu (Reel 20s)',
    objetivo: 'Posicionamento regional — Gaspar/Blumenau como território da Real Jardinagem',
    duracao: '18–22 segundos',
    gancho: '"Gaspar. Blumenau. Este é o nosso território."',
    roteiro: `[CENA 1 — 0s a 4s]
Imagem de Gaspar ou Blumenau — cenas da cidade, empresas, condomínios.
Texto animado: "Gaspar · Blumenau — Vale Europeu/SC"

[CENA 2 — 4s a 10s]
Guilherme: "Cuidamos de jardins neste Vale. Residências. Empresas. Condomínios."
Cenas de propriedades atendidas — sem revelar nomes.

[CENA 3 — 10s a 16s]
Voz over: "Clima diferente, exigência maior. Jardim de empresa no Vale Europeu exige quem conhece. A gente conhece."

[CENA 4 — 16s a 20s]
Guilherme: "Real Jardinagem. A empresa de Gaspar."

[LEGENDA]
O Vale Europeu tem empresa de jardinagem profissional 🌿
📍 Gaspar · Blumenau — SC

#realjardinagem #gaspar #blumenau #valeeuropeu #paisagismo`,
  },
  {
    id: 'r4',
    titulo: 'Roteiro 4 — Antes e Depois (Empresa/Residência) (Reel 30s)',
    objetivo: 'Transformação visual — impacto imediato do serviço profissional',
    duracao: '28–32 segundos',
    gancho: '"Área verde sem manutenção há meses. O que encontramos — e o que entregamos em 24h:"',
    roteiro: `[CENA 1 — 0s a 3s]
Texto: "Sem manutenção há meses 👇" — tela preta ou fade in.

[CENA 2 — 3s a 8s]
Área verde em estado descuidado: grama alta, ervas daninhas, bordas mal definidas.
Música começa. Tom de "chegamos para resolver."

[CENA 3 — 8s a 12s]
Work in progress: equipamento em ação, equipe, velocidade 2x.

[CENA 4 — 12s a 17s]
Texto: "24 horas depois 👇"

[CENA 5 — 17s a 25s]
Mesmos ângulos — jardim completamente recuperado, limpo, profissional.
Câmera lenta para valorizar o resultado.

[CENA 6 — 25s a 30s]
Guilherme: "Real Jardinagem. Gaspar e Blumenau. Orçamento no link da bio."

[LEGENDA]
Área verde transformada 🌿✅
Meses de abandono → jardim profissional em 24h.

📍 Gaspar — SC
📋 Contrato mensal: nunca mais passa por isso.

#antesedepois #realjardinagem #gaspar #blumenau #jardinagem #manutencaojardim`,
  },
]

// ─── Bio ──────────────────────────────────────────────────────────────────────

const novaBio = `🌿 Real Jardinagem
📍 Gaspar · Blumenau — SC
🏡 Residências · Condomínios · Empresas
📋 Proposta profissional com contrato
🔗 comercial271.github.io/comercial271-central-real-jardinagem`

// ─── Destaques ────────────────────────────────────────────────────────────────

const destaques = [
  { emoji: '🌿', nome: 'Quem Somos',  desc: 'Real Jardinagem, Gaspar/Blumenau. Equipe profissional, contrato, proposta documentada.' },
  { emoji: '🏡', nome: 'Cases',       desc: 'Residências, empresas e condomínios do Vale Europeu. Fotos antes/depois reais.' },
  { emoji: '🛠️', nome: 'Serviços',    desc: 'Manutenção recorrente, implantação, poda técnica, limpeza, empresas e condomínios.' },
  { emoji: '📍', nome: 'Gaspar/BNU',  desc: 'Propriedades atendidas em Gaspar e Blumenau. Presença local documentada.' },
  { emoji: '📋', nome: 'Orçamento',   desc: 'Como funciona: visita gratuita, proposta em 24h, contrato mensal.' },
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
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Presença digital profissional</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Instagram @realjardinag</h2>
          <p className="text-gray-500 mt-2">Bio, destaques, estratégia de conteúdo e roteiros prontos para gravar.</p>
        </div>

        {/* Urgência */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 flex gap-3 items-start">
          <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-900">@realjardinag precisa de presença agora</p>
            <p className="text-amber-800 text-sm mt-1">
              Não existe nenhuma empresa de jardinagem com presença digital em Gaspar. Donos de empresa e síndicos pesquisam no Instagram antes de contratar. Um perfil sem posts passa insegurança — o oposto do que você vende. Use seu melhor cliente como âncora: <strong>o primeiro Reel já posiciona a Real Jardinagem como a empresa profissional da região.</strong>
            </p>
          </div>
        </div>

        {/* ── Nova Bio ── */}
        <div className="bg-forest-800 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-1">Nova Bio @realjardinag</p>
              <p className="text-white/70 text-sm">Copie e cole no Instagram → Editar Perfil → Biografia</p>
            </div>
            <CopyButton text={novaBio} />
          </div>
          <pre className="bg-forest-900/50 rounded-xl p-4 text-white text-sm whitespace-pre-wrap font-sans leading-relaxed border border-forest-700">{novaBio}</pre>
          <div className="mt-4 grid sm:grid-cols-3 gap-3 text-xs">
            {[
              { label: 'Gaspar · Blumenau — SC', desc: 'Território declarado — nenhum concorrente local posiciona as duas cidades explicitamente' },
              { label: 'Residências · Condomínios · Empresas', desc: 'Declara os 3 ICP — qualquer responsável vai se identificar imediatamente' },
              { label: 'Proposta profissional com contrato', desc: 'Diferencial visível na bio — transmite confiança antes mesmo do primeiro contato' },
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
            <Leaf size={18} className="text-gold-500" />
            <p className="font-bold text-lg">A narrativa que diferencia @realjardinag de todos</p>
          </div>
          <p className="text-white/70 text-sm mb-6 max-w-2xl leading-relaxed">
            Nenhuma empresa de jardinagem em Gaspar tem presença digital. Você não é "mais um jardineiro" — você é a <strong className="text-white">empresa profissional do Vale Europeu: com contrato, proposta, CNPJ e equipe. Quem declara o território primeiro, domina.</strong>
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { n: '01', titulo: 'Declare o território', desc: 'Todo post deve fazer o dono de empresa ou síndico de Gaspar pensar "é exatamente o que eu preciso." Gaspar + Blumenau = território declarado — nenhum concorrente faz isso.' },
              { n: '02', titulo: 'Use seus clientes atuais', desc: '9/10 clientes nunca reclamaram de preço. Isso é prova social. Mostre o trabalho com esses clientes e cobre mais nos próximos contratos.' },
              { n: '03', titulo: 'Profissionalismo como diferencial', desc: 'Contrato, proposta, NF, frequência garantida — isso é raro em Gaspar. Quem demonstra processo profissional fecha sem negociar preço.' },
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
        <p className="text-gray-500 text-sm mb-5">4 roteiros completos com gancho, cena a cena e legenda. Grave na próxima visita ao melhor cliente.</p>
        <div className="space-y-3 mb-10">
          {roteiros.map(r => {
            const isOpen = openRoteiro === r.id
            return (
              <div key={r.id} className={`bg-[#F4F6F0] rounded-2xl border-2 transition-all overflow-hidden ${isOpen ? 'border-forest-400' : 'border-transparent'}`}>
                <button onClick={() => setOpenRoteiro(isOpen ? null : r.id)}
                  className="w-full text-left px-5 py-4 flex items-center gap-4">
                  <div className="bg-forest-800 rounded-xl p-2.5 shrink-0">
                    <Leaf size={16} className="text-gold-500" />
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
          <p className="font-bold text-lg mb-2">Comece pelo Roteiro 1 — Apresentação Real Jardinagem</p>
          <p className="text-white/70 text-sm max-w-lg mx-auto">
            Na próxima visita ao melhor cliente, grave o Roteiro 2 (Live Case). Dois vídeos e @realjardinag já tem mais presença que 100% dos concorrentes de Gaspar.{' '}
            <span className="text-gold-500 font-semibold">Quem declara o território primeiro, domina primeiro.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
