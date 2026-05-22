import { useState, useCallback } from 'react'
import { useMemberStorage } from '../hooks/useMemberStorage'
import { CheckCircle, XCircle, AlertCircle, Target, Trash2, Clock, ChevronDown, ChevronUp } from 'lucide-react'

const ICP_LEADS_KEY    = 'aleandro_icp_leads_v1'
const ICP_BUILDER_KEY  = 'aleandro_icp_builder_v1'

// ─── Types ────────────────────────────────────────────────────────────────────

interface BuilderRespostas { [id: string]: string }

interface Pergunta { id: string; texto: string; peso: number; dica: string }

interface Lead {
  id: string; nome: string; tipo: string; score: number; max: number
  respostas: Record<string, boolean>; notas: string; criadoEm: string
}

// ─── ICP Builder questions ────────────────────────────────────────────────────

interface BuilderQ {
  id: string
  num: number
  titulo: string
  pergunta: string
  dica: string
  placeholder: string
}

const builderQuestions: BuilderQ[] = [
  {
    id: 'melhores_clientes',
    num: 1,
    titulo: 'Seus melhores clientes hoje',
    pergunta: 'Pense nos 2 ou 3 clientes que você mais gosta de atender. O que eles têm em comum — tipo de propriedade, perfil do responsável, localização, frequência de pagamento?',
    dica: 'O Villagio é a âncora. O que esse tipo de cliente (alto padrão, proprietário ausente, paga sem negociar) tem que outros não têm?',
    placeholder: 'Ex: Proprietários de casas de veraneio na Riviera que moram em São Paulo. Pagam sem questionar porque entendem o valor de ter alguém de confiança cuidando do jardim na ausência deles...',
  },
  {
    id: 'segmento_ideal',
    num: 2,
    titulo: 'O segmento que faz mais sentido',
    pergunta: 'Qual tipo de cliente combina com o que você entrega de melhor: casas de veraneio, condomínios fechados, pousadas/resorts, gestores de propriedades, misto? Por que esse e não os outros?',
    dica: 'Considere sua experiência no Villagio, seu raio de deslocamento em Bertioga e onde você consegue cobrar R$3k–6k/mês sem negociação.',
    placeholder: 'Ex: Casas de veraneio premium da Riviera de São Lourenço. Proprietários ausentes não têm tempo de negociar — ou confiam em você ou não contratam. Esse perfil não pede desconto...',
  },
  {
    id: 'dor_principal',
    num: 3,
    titulo: 'A dor que você resolve',
    pergunta: 'O que o seu cliente ideal tinha de problema antes de te contratar? Que situação ele não suportava mais ou que risco ele queria eliminar?',
    dica: 'Vá além do "jardim feio". Pense em chegar na casa de veraneio no verão e encontrar mato, vizinho reclamando, imóvel desvalorizado, sem ter ninguém de confiança na cidade...',
    placeholder: 'Ex: Chegava no verão com o jardim abandonado. Não tinha ninguém de confiança em Bertioga. Já tentou com autônomos que desapareciam. Queria saber que estava sendo cuidado sem precisar ir ver...',
  },
  {
    id: 'diferencial',
    num: 4,
    titulo: 'Por que te escolhem',
    pergunta: 'Por que o cliente ideal escolhe a Lobo Jardinagem e não alguém mais barato? O que você entrega que é difícil de copiar?',
    dica: 'Relatório fotográfico mensal, presença local em Bertioga, Villagio como referência de alto padrão, responsabilidade e pontualidade. O que você ouviu de clientes satisfeitos?',
    placeholder: 'Ex: Sou de Bertioga. Estou aqui quando o proprietário não está. Mando foto mensal pelo WhatsApp. Tenho o Villagio na carteira — qualquer pessoa em Bertioga sabe o que é...',
  },
  {
    id: 'ticket_minimo',
    num: 5,
    titulo: 'Ticket e modelo de contrato',
    pergunta: 'Qual é o valor mensal mínimo que faz sentido para sua operação hoje, considerando mão de obra (Daniel), deslocamento, equipamentos e margem? E qual modelo você prefere — mensal recorrente ou por visita?',
    dica: 'Não coloque o que o mercado aceita. Coloque o que paga Daniel + amortiza seus equipamentos + cobre combustível + gera lucro real. Pense no Villagio como referência de ticket alto.',
    placeholder: 'Ex: Mínimo R$ 3.000/mês para contrato recorrente em Bertioga. Prefiro recorrente mensal — previsibilidade de caixa e planejamento de agenda da equipe...',
  },
  {
    id: 'localizacao',
    num: 6,
    titulo: 'Onde ele está',
    pergunta: 'Qual é o raio de deslocamento viável para a Lobo Jardinagem? Que áreas de Bertioga e entorno fazem parte da rota ideal da sua operação?',
    dica: 'Bertioga centro e Riviera de São Lourenço são o núcleo. Maresias? Boiçucanga? Acima de quanto quilômetros o contrato deixa de valer a pena?',
    placeholder: 'Ex: Bertioga e Riviera são o foco. Aceito São Sebastião para contratos acima de R$4.000. Fora do raio de 30km só com proposta especial...',
  },
  {
    id: 'anti_icp',
    num: 7,
    titulo: 'Quem você NÃO quer mais',
    pergunta: 'Descreva o perfil de cliente que te dá mais dor de cabeça, não valoriza o trabalho ou simplesmente não vale a energia. Quais características te fazem querer recusar?',
    dica: 'Seja honesto. Anti-ICP bem definido te protege de aceitar contratos ruins por medo de não ter demanda.',
    placeholder: 'Ex: Residencial pequeno sem recorrência. Cliente que negocia cada visita. Distância fora do raio de Bertioga sem rota. Quem só quer serviço pontual de roçada...',
  },
  {
    id: 'canal',
    num: 8,
    titulo: 'Como ele te encontra',
    pergunta: 'Como o seu cliente ideal chega até você hoje — indicação, Google, prospecção ativa? E onde você deveria estar mais presente para que ele te encontre?',
    dica: 'Com GMB zerado em Bertioga, o Google Maps tem potencial imediato enorme. Indicação de clientes da Riviera é o segundo canal mais valioso. Temporada de verão é o gatilho natural.',
    placeholder: 'Ex: Hoje vem por indicação. Com GMB otimizado, Google Maps vai ser o principal — ninguém domina "jardinagem Bertioga". Prospecção ativa em condomínios da Riviera é o próximo passo...',
  },
]

// ─── Qualifier questions ───────────────────────────────────────────────────────

const perguntas: Pergunta[] = [
  { id: 'tipo',        texto: 'É casa de veraneio, condomínio fechado, pousada ou resort?',          dica: 'Propriedade premium de alto padrão — não residencial pequeno', peso: 2 },
  { id: 'ausente',     texto: 'O proprietário/responsável está ausente a maior parte do ano?',       dica: 'Ausência é o gatilho — ele precisa de alguém de confiança local', peso: 2 },
  { id: 'localizacao', texto: 'Fica dentro do raio de atuação (Bertioga e Riviera)?',               dica: 'Deslocamento fora da rota corrói a margem rapidamente', peso: 2 },
  { id: 'ticket',      texto: 'Ticket estimado acima do mínimo de R$ 3.000/mês?',                   dica: 'Contrato abaixo do mínimo não cobre Daniel + combustível + margem', peso: 2 },
  { id: 'decisor',     texto: 'Você fala direto com quem aprova o contrato?',                       dica: 'Proprietário, síndico ou administradora — intermediário some com a proposta', peso: 1 },
  { id: 'historico',   texto: 'Eles já tiveram serviço de jardinagem antes?',                       dica: 'Já educados para pagar — negociação mais fácil', peso: 1 },
  { id: 'interesse',   texto: 'Demonstraram interesse real (não só curiosidade)?',                   dica: 'Pediu proposta, fez pergunta específica, comparou com outro serviço', peso: 1 },
  { id: 'recorrencia', texto: 'Precisam de manutenção recorrente, não serviço pontual?',            dica: 'Contrato mensal é o modelo ideal para estabilidade de caixa', peso: 1 },
]

const MAX_SCORE = perguntas.reduce((s, p) => s + p.peso, 0)

// ─── Helpers ─────────────────────────────────────────────────────────────────

function scoreInfo(score: number, max: number) {
  const pct = score / max
  if (pct >= 0.75) return { label: 'ICP Verde — Avance agora', color: 'text-green-700', bg: 'bg-green-50 border-green-200', Icon: CheckCircle }
  if (pct >= 0.50) return { label: 'ICP Amarelo — Avance com cautela', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', Icon: AlertCircle }
  return { label: 'ICP Vermelho — Não é o cliente certo', color: 'text-red-700', bg: 'bg-red-50 border-red-200', Icon: XCircle }
}

// ─── ICP Builder ─────────────────────────────────────────────────────────────

function IcpBuilder({ respostas, setRespostas }: {
  respostas: BuilderRespostas
  setRespostas: (v: BuilderRespostas | ((p: BuilderRespostas) => BuilderRespostas)) => void
}) {
  const [openCard, setOpenCard] = useState<string | null>(builderQuestions[0].id)

  const answeredCount = builderQuestions.filter(q => (respostas[q.id] || '').trim().length > 20).length
  const pct = Math.round((answeredCount / builderQuestions.length) * 100)

  const update = useCallback((id: string, val: string) => {
    setRespostas(prev => ({ ...prev, [id]: val }))
  }, [setRespostas])

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-bold text-forest-900">{answeredCount} de {builderQuestions.length} perguntas respondidas</p>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${pct === 100 ? 'bg-green-100 text-green-700' : pct >= 50 ? 'bg-gold-100 text-gold-700' : 'bg-gray-100 text-gray-500'}`}>
          {pct === 100 ? 'ICP construído ✓' : `${pct}% completo`}
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${pct === 100 ? 'bg-green-500' : 'bg-forest-500'}`}
          style={{ width: `${Math.max(pct, 2)}%` }}
        />
      </div>

      {/* Questions */}
      <div className="space-y-3">
        {builderQuestions.map(q => {
          const val = respostas[q.id] || ''
          const filled = val.trim().length > 20
          const isOpen = openCard === q.id

          return (
            <div key={q.id} className={`border rounded-2xl overflow-hidden transition-colors ${filled ? 'border-forest-200 bg-forest-50/30' : 'border-gray-200 bg-white'}`}>
              <button
                onClick={() => setOpenCard(prev => prev === q.id ? null : q.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50/50 transition-colors"
              >
                <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${filled ? 'bg-forest-700 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {filled ? '✓' : q.num}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-forest-900 truncate">{q.titulo}</p>
                  {!isOpen && val.trim() && (
                    <p className="text-xs text-gray-400 truncate mt-0.5 italic">"{val.trim().substring(0, 80)}{val.trim().length > 80 ? '...' : ''}"</p>
                  )}
                </div>
                {isOpen ? <ChevronUp size={14} className="text-gray-400 shrink-0" /> : <ChevronDown size={14} className="text-gray-400 shrink-0" />}
              </button>

              {isOpen && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <p className="text-sm font-semibold text-forest-900 mt-3 mb-1 leading-snug">{q.pergunta}</p>
                  <p className="text-xs text-gray-400 mb-3 leading-relaxed">{q.dica}</p>
                  <textarea
                    value={val}
                    onChange={e => update(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    rows={4}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:border-forest-400 transition-colors placeholder-gray-300 leading-relaxed"
                  />
                  {val.trim().length > 0 && val.trim().length <= 20 && (
                    <p className="text-xs text-amber-500 mt-1">Desenvolva um pouco mais para registrar esta resposta</p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {pct === 100 && (
        <div className="mt-6 bg-forest-800 text-white rounded-2xl p-5">
          <p className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-1">Seu ICP — construído por você</p>
          <p className="text-white/70 text-sm">Você respondeu as 8 perguntas. Use as suas respostas como filtro em toda prospecção: se o prospect não encaixar no que você descreveu, qualifique pelo score antes de avançar.</p>
          <p className="text-white/50 text-xs mt-3">Respostas salvas. No próximo check-in, traga este ICP revisado com os primeiros resultados da prospecção ativa na Riviera.</p>
        </div>
      )}
    </div>
  )
}

// ─── Qualifier ────────────────────────────────────────────────────────────────

function IcpQualifier({ onLeadSaved }: { onLeadSaved: (lead: Lead) => void }) {
  const [nome, setNome] = useState('')
  const [tipo, setTipo] = useState('')
  const [notas, setNotas] = useState('')
  const [respostas, setRespostas] = useState<Record<string, boolean | null>>(
    () => Object.fromEntries(perguntas.map(p => [p.id, null]))
  )
  const [done, setDone] = useState(false)

  const allAnswered = Object.values(respostas).every(v => v !== null)
  const score = perguntas.reduce((s, p) => s + (respostas[p.id] ? p.peso : 0), 0)
  const result = done ? scoreInfo(score, MAX_SCORE) : null

  const toggle = (id: string, val: boolean) => {
    setRespostas(prev => ({ ...prev, [id]: prev[id] === val ? null : val }))
    if (done) setDone(false)
  }

  const handleSave = () => {
    if (!nome.trim()) return
    const lead: Lead = {
      id: String(Date.now()), nome: nome.trim(), tipo: tipo.trim(),
      score, max: MAX_SCORE,
      respostas: respostas as Record<string, boolean>,
      notas: notas.trim(),
      criadoEm: new Date().toLocaleDateString('pt-BR'),
    }
    onLeadSaved(lead)
    setNome(''); setTipo(''); setNotas('')
    setRespostas(Object.fromEntries(perguntas.map(p => [p.id, null])))
    setDone(false)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <p className="font-bold text-forest-900 mb-1">Qualificador de Prospect</p>
      <p className="text-gray-500 text-sm mb-5">Avalie um prospect específico contra o seu ICP da Riviera.</p>

      <input type="text" value={nome} onChange={e => setNome(e.target.value)}
        placeholder="Nome do prospect / propriedade"
        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm mb-2 focus:outline-none focus:border-forest-400 transition-colors" />
      <input type="text" value={tipo} onChange={e => setTipo(e.target.value)}
        placeholder="Tipo (ex: Casa de veraneio, Condomínio Riviera, Pousada)"
        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm mb-5 focus:outline-none focus:border-forest-400 transition-colors" />

      <div className="space-y-2.5 mb-5">
        {perguntas.map(p => (
          <div key={p.id} className={`border rounded-xl p-3 transition-colors ${respostas[p.id] === true ? 'border-green-200 bg-green-50/50' : respostas[p.id] === false ? 'border-red-100 bg-red-50/30' : 'border-gray-100'}`}>
            <p className="text-sm font-semibold text-forest-900 mb-0.5">{p.texto}</p>
            <p className="text-xs text-gray-400 mb-2">{p.dica}</p>
            <div className="flex gap-2">
              <button onClick={() => toggle(p.id, true)}
                className={`flex-1 text-xs font-bold py-1.5 rounded-lg border transition-colors ${respostas[p.id] === true ? 'bg-green-500 text-white border-green-500' : 'border-gray-200 text-gray-500 hover:border-green-400 hover:text-green-600'}`}>
                Sim ✓
              </button>
              <button onClick={() => toggle(p.id, false)}
                className={`flex-1 text-xs font-bold py-1.5 rounded-lg border transition-colors ${respostas[p.id] === false ? 'bg-red-400 text-white border-red-400' : 'border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500'}`}>
                Não ✗
              </button>
            </div>
          </div>
        ))}
      </div>

      <textarea value={notas} onChange={e => setNotas(e.target.value)}
        placeholder="Observações (opcional)"
        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm mb-4 resize-none focus:outline-none focus:border-forest-400 transition-colors"
        rows={2} />

      {allAnswered && !done && (
        <button onClick={() => setDone(true)}
          className="w-full bg-forest-800 hover:bg-forest-700 text-white font-bold py-3 rounded-xl text-sm transition-colors">
          Ver resultado →
        </button>
      )}

      {done && result && (
        <div>
          <div className={`border rounded-xl p-4 mb-4 ${result.bg}`}>
            <div className="flex items-center gap-2 mb-1">
              <result.Icon size={18} className={result.color} />
              <p className={`font-bold text-sm ${result.color}`}>{result.label}</p>
            </div>
            <p className={`text-xs opacity-80 ${result.color}`}>Pontuação: {score} de {MAX_SCORE} pontos</p>
          </div>
          {nome.trim() && (
            <button onClick={handleSave}
              className="w-full bg-gold-500 hover:bg-gold-400 text-forest-900 font-bold py-3 rounded-xl text-sm transition-colors">
              Salvar na lista de prospects
            </button>
          )}
        </div>
      )}

      {!allAnswered && (
        <p className="text-xs text-gray-400 text-center">{Object.values(respostas).filter(v => v !== null).length} / {perguntas.length} perguntas respondidas</p>
      )}
    </div>
  )
}

// ─── Lead List ────────────────────────────────────────────────────────────────

function LeadList({ leads, onRemove }: { leads: Lead[]; onRemove: (id: string) => void }) {
  if (leads.length === 0) return (
    <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-10 text-center">
      <Target size={30} className="text-gray-200 mx-auto mb-3" />
      <p className="text-gray-400 text-sm font-medium">Nenhum prospect avaliado ainda</p>
      <p className="text-gray-400 text-xs mt-1">Use o qualificador ao lado para começar</p>
    </div>
  )

  return (
    <div className="space-y-3">
      {leads.map(lead => {
        const r = scoreInfo(lead.score, lead.max)
        return (
          <div key={lead.id} className={`border rounded-2xl p-4 ${r.bg}`}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2.5 min-w-0">
                <r.Icon size={17} className={`${r.color} shrink-0 mt-0.5`} />
                <div className="min-w-0">
                  <p className={`font-bold text-sm ${r.color} truncate`}>{lead.nome}</p>
                  {lead.tipo && <p className="text-xs text-gray-500 mt-0.5">{lead.tipo}</p>}
                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                    <Clock size={9} /> {lead.criadoEm} · Score: {lead.score}/{lead.max}
                  </p>
                  {lead.notas && <p className="text-xs text-gray-600 mt-1.5 italic bg-white/60 px-2 py-1 rounded-lg">"{lead.notas}"</p>}
                </div>
              </div>
              <button onClick={() => onRemove(lead.id)} className="text-gray-300 hover:text-red-400 transition-colors shrink-0 p-0.5">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function IcpBraun() {
  const [leads, setLeads] = useMemberStorage<Lead[]>(ICP_LEADS_KEY, [])
  const [builderRespostas, setBuilderRespostas] = useMemberStorage<BuilderRespostas>(ICP_BUILDER_KEY, {})

  return (
    <section id="icp" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Clareza de mercado</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">ICP — Perfil do Cliente Ideal</h2>
          <p className="text-gray-500 mt-2 max-w-2xl">
            Construa o seu ICP pelas suas próprias respostas — ninguém conhece melhor os proprietários da Riviera do que você.
            Depois use o qualificador para avaliar cada novo prospect antes de montar proposta.
          </p>
        </div>

        {/* ── Bloco 1: Construtor ── */}
        <div className="bg-[#F4F6F0] rounded-2xl p-6 mb-10">
          <div className="mb-6">
            <p className="font-bold text-forest-900 text-lg">Construtor de ICP</p>
            <p className="text-gray-500 text-sm mt-0.5">
              8 perguntas para você sair com clareza total sobre quem é o seu cliente ideal na Riviera.
              Reserve 15 minutos, responda com honestidade — o Villagio é o modelo, mas não o limite.
            </p>
          </div>
          <IcpBuilder respostas={builderRespostas} setRespostas={setBuilderRespostas} />
        </div>

        {/* ── Reativação alert ── */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 flex gap-3 items-start">
          <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-900 text-sm">Reativação de Leads — Oportunidade de custo zero</p>
            <p className="text-amber-700 text-sm mt-1">
              Liste todos os orçamentos enviados nos últimos 12 meses que não fecharam.{' '}
              <strong>Esses leads já demonstraram interesse</strong> — são os mais fáceis de converter.{' '}
              Script de reativação: <em>"Aleandro aqui, da Lobo Jardinagem. Ainda tenho aquela proposta disponível e a agenda aberta. Podemos retomar antes da temporada?" </em>— direto, sem pressão.
            </p>
          </div>
        </div>

        {/* ── Bloco 2: Qualificador + Lista ── */}
        <div className="mb-4">
          <p className="font-bold text-forest-900 text-lg">Qualificador de Prospect</p>
          <p className="text-gray-500 text-sm mt-0.5">Com o ICP definido acima, use este score para avaliar cada novo prospect da Riviera antes de montar a proposta.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <IcpQualifier onLeadSaved={(lead) => setLeads(prev => [lead, ...prev])} />
          <div>
            <p className="font-bold text-forest-900 mb-1">Prospects Avaliados</p>
            <p className="text-gray-500 text-sm mb-4">Histórico de qualificações — priorize o follow-up pelos verdes</p>
            <LeadList leads={leads} onRemove={(id) => setLeads(prev => prev.filter(l => l.id !== id))} />
          </div>
        </div>
      </div>
    </section>
  )
}
