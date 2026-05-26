import { useState } from 'react'
import { Star, CheckCircle, XCircle, Zap, Camera, MessageSquare, ChevronDown, ChevronUp, Link2 } from 'lucide-react'

// ─── Storage ──────────────────────────────────────────────────────────────────

const CASES_KEY   = 'guilherme_cases_v1'
const REVIEWS_KEY = 'guilherme_reviews_meta_v1'

interface CaseExtra {
  depoimento: string
  autor: string
  linkAntes: string
  linkDepois: string
}

interface ReviewsMeta {
  current: number
  goal: number
}

function loadCases(): Record<number, CaseExtra> {
  try { return JSON.parse(localStorage.getItem(CASES_KEY) || '{}') } catch { return {} }
}
function saveCases(s: Record<number, CaseExtra>) {
  try { localStorage.setItem(CASES_KEY, JSON.stringify(s)) } catch {}
}
function loadReviewsMeta(): ReviewsMeta {
  try { return JSON.parse(localStorage.getItem(REVIEWS_KEY) || '{"current":0,"goal":30}') } catch { return { current: 0, goal: 30 } }
}
function saveReviewsMeta(m: ReviewsMeta) {
  try { localStorage.setItem(REVIEWS_KEY, JSON.stringify(m)) } catch {}
}

const defaultExtra: CaseExtra = { depoimento: '', autor: '', linkAntes: '', linkDepois: '' }

// ─── Data ─────────────────────────────────────────────────────────────────────

const cases = [
  { initials: 'C1', color: 'bg-gold-500',   name: 'Melhor Cliente da Carteira',        segment: 'Residencial premium — Gaspar/SC — contrato ativo',         note: 'Carteira âncora — nunca questiona preço — credencial local',  status: '✅ CLIENTE ATIVO',    statusColor: 'text-green-700'  },
  { initials: 'C2', color: 'bg-forest-700', name: 'Residência Premium Gaspar 1',        segment: 'Residencial alto padrão — Gaspar/SC',                     note: 'Documentar antes/depois e solicitar depoimento para portfólio', status: '📁 PORTFÓLIO',        statusColor: 'text-blue-700'   },
  { initials: 'C3', color: 'bg-blue-700',   name: 'Empresa ou Condomínio em Gaspar',    segment: 'Comercial/condomínio — Gaspar/SC — recorrente',           note: 'Contrato recorrente — usar modelo Selva',                     status: '🎯 ALVO PRIORIDADE',  statusColor: 'text-forest-700' },
  { initials: 'C4', color: 'bg-teal-600',   name: 'Residência Premium Blumenau 1',      segment: 'Residencial — Blumenau — Vale Europeu',                   note: 'Expansão para Blumenau — raio natural desde Gaspar',          status: '🎯 ALVO PRIORIDADE',  statusColor: 'text-forest-700' },
  { initials: 'C5', color: 'bg-forest-500', name: 'Condomínio Gaspar ou Blumenau',      segment: 'Condomínio — área verde extensa — recorrência anual',     note: 'Alto ticket — síndico ou administradora — proposta formal',   status: '🎯 ALVO PRIORIDADE',  statusColor: 'text-forest-700' },
  { initials: 'IM', color: 'bg-slate-600',  name: 'Imobiliária ou Parceiro de Indica.', segment: 'Canal de indicação — Gaspar/Blumenau',                    note: 'Parceria de indicação — gera leads sem prospecção direta',    status: '🤝 PARCERIA',         statusColor: 'text-purple-700' },
]

const reviews = [
  { name: 'Cliente — Residência, Gaspar/SC',    date: 'Contrato ativo', quote: 'O Guilherme é pontual, caprichoso e o jardim ficou melhor do que eu esperava. Nunca tive problema com ele — o serviço fala por si.', stars: 5 },
  { name: 'Cliente — Residência, Gaspar',       date: '2025–2026',      quote: 'Profissional de verdade. Preço justo, trabalho impecável. Já recomendei para três conhecidos.', stars: 5 },
  { name: 'Cliente — Residência, Blumenau',     date: '2026',           quote: 'Desde que o Guilherme começou a cuidar do jardim, eu não preciso mais me preocupar. Só recebo elogios dos vizinhos.', stars: 5 },
]

const jatem = [
  'Carteira com 9/10 clientes satisfeitos — nunca questionam o preço — maior prova do produto',
  'Fiorino própria — estrutura real de operação, não depende de transporte de terceiros',
  'Crescimento rápido em < 1 ano — aceleração natural e consistente desde o início',
  'Presença local em Gaspar — jardineiro que mora e trabalha aqui, não vem de fora',
  'Conhecimento do Vale Europeu — Gaspar e Blumenau como território natural de atuação',
  'Experiência prática comprovada — clientes que pagam sem reclamar de preço',
]

const fomentar = [
  'GMB Gaspar — criar e otimizar antes de qualquer concorrente (guia completo no Manuais)',
  'Instagram @realjardinag — bio, primeiro Reel de antes/depois e 4 posts/mês',
  'Planilha de Margem — custo real por hora/km para parar de cobrar no feeling',
  'Depoimento do melhor cliente — print WhatsApp, avaliação Google ou vídeo 30s',
  'Portfólio documentado: fotos antes/depois de 3+ residências e serviços reais',
  '30 avaliações Google — meta inicial — dominar Gaspar e Blumenau no Maps',
]

// ─── PhotoSlot ────────────────────────────────────────────────────────────────

function PhotoSlot({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [editMode, setEditMode] = useState(false)
  const [draft, setDraft] = useState(value)

  const commit = () => { onChange(draft.trim()); setEditMode(false) }
  const hasUrl = value.startsWith('http')

  if (hasUrl && !editMode) {
    return (
      <div className="flex-1">
        <p className="text-xs font-bold text-forest-700 mb-1.5 uppercase tracking-wide">{label}</p>
        <div className="relative group aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
          <img src={value} alt={label} className="w-full h-full object-cover" />
          <button
            onClick={() => { setDraft(value); setEditMode(true) }}
            className="absolute inset-0 bg-black/0 group-hover:bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
          >
            <span className="text-white text-xs bg-black/70 px-3 py-1.5 rounded-full font-semibold">Trocar link</span>
          </button>
        </div>
      </div>
    )
  }

  if (editMode) {
    return (
      <div className="flex-1">
        <p className="text-xs font-bold text-forest-700 mb-1.5 uppercase tracking-wide">{label}</p>
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 border border-forest-300 rounded-xl bg-white px-3">
            <Link2 size={12} className="text-forest-500 shrink-0" />
            <input
              type="url"
              autoFocus
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && commit()}
              placeholder="https://drive.google.com/..."
              className="flex-1 text-xs py-2.5 outline-none text-gray-700 placeholder:text-gray-400"
            />
          </div>
          <div className="flex gap-1.5">
            <button onClick={commit} className="text-xs bg-forest-700 hover:bg-forest-600 text-white px-3 py-1.5 rounded-lg font-semibold transition-colors">Salvar</button>
            <button onClick={() => { setDraft(value); setEditMode(false) }} className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1.5">Cancelar</button>
          </div>
          <p className="text-xs text-gray-400">Drive: Compartilhar → "Qualquer pessoa com o link" → Copiar link</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1">
      <p className="text-xs font-bold text-forest-700 mb-1.5 uppercase tracking-wide">{label}</p>
      <button
        onClick={() => { setDraft(''); setEditMode(true) }}
        className="w-full aspect-video border-2 border-dashed border-gray-200 hover:border-forest-400 rounded-xl flex flex-col items-center justify-center gap-2 transition-all group"
      >
        <Camera size={22} className="text-gray-300 group-hover:text-forest-500 group-hover:scale-110 transition-all" />
        <span className="text-xs font-medium text-gray-400 group-hover:text-forest-500">Colar link foto {label.toLowerCase()}</span>
      </button>
    </div>
  )
}

// ─── CaseCard ─────────────────────────────────────────────────────────────────

function CaseCard({ c, idx, extra, onUpdate }: {
  c: typeof cases[0]
  idx: number
  extra: CaseExtra
  onUpdate: (patch: Partial<CaseExtra>) => void
}) {
  const [open, setOpen] = useState(false)
  const documented = extra.linkAntes || extra.linkDepois || extra.depoimento

  return (
    <div className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${open ? 'border-forest-300 shadow-md' : 'border-gray-100'}`}>
      <div className="p-4 flex gap-3 items-start">
        <div className={`w-10 h-10 rounded-full ${c.color} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
          {c.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-forest-900 text-sm">{c.name}</p>
          <p className="text-gray-500 text-xs">{c.segment}</p>
          <p className="text-gray-400 text-xs mt-0.5">{c.note}</p>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className={`text-xs font-semibold ${c.statusColor}`}>{c.status}</span>
            {documented && (
              <span className="text-xs bg-forest-100 text-forest-700 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Camera size={9} /> documentado
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <button
          onClick={() => setOpen(v => !v)}
          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${open ? 'bg-forest-800 text-white border-forest-800' : 'text-forest-700 border-forest-300 hover:bg-forest-50'}`}
        >
          <Camera size={11} />
          Antes/Depois + Depoimento
          {open ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-100 bg-gray-50/60 px-4 py-4 space-y-4">
          <div>
            <p className="text-xs font-bold text-forest-800 uppercase tracking-wide mb-3">Fotos do Case</p>
            <div className="flex gap-3">
              <PhotoSlot label="ANTES" value={extra.linkAntes} onChange={v => onUpdate({ linkAntes: v })} />
              <PhotoSlot label="DEPOIS" value={extra.linkDepois} onChange={v => onUpdate({ linkDepois: v })} />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-forest-800 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <MessageSquare size={12} /> Depoimento do Cliente
            </p>
            <textarea
              value={extra.depoimento}
              onChange={e => onUpdate({ depoimento: e.target.value })}
              placeholder="Cole o depoimento real do cliente — print de WhatsApp, avaliação Google, mensagem de aprovação..."
              className="w-full text-sm text-gray-700 bg-white border border-gray-200 rounded-xl px-3 py-2 resize-none focus:outline-none focus:border-forest-400 transition-colors"
              rows={2}
            />
            <input
              type="text"
              value={extra.autor}
              onChange={e => onUpdate({ autor: e.target.value })}
              placeholder="Nome — Perfil (ex: João Silva — Proprietário, Gaspar/SC)"
              className="mt-1.5 w-full text-xs text-gray-600 bg-white border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-forest-400 transition-colors"
            />
            {extra.depoimento && <p className="text-xs text-gray-400 mt-0.5">Salvo automaticamente</p>}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── ReviewGoalTracker ────────────────────────────────────────────────────────

function ReviewGoalTracker() {
  const [meta, setMeta] = useState<ReviewsMeta>(loadReviewsMeta)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(String(meta.current))
  const pct = Math.min(100, Math.round((meta.current / meta.goal) * 100))

  const save = () => {
    const n = parseInt(draft)
    if (!isNaN(n) && n >= 0) {
      const next = { ...meta, current: n }
      setMeta(next)
      saveReviewsMeta(next)
    }
    setEditing(false)
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-10">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-bold text-forest-900 text-lg">Meta de Avaliações Google</p>
          <p className="text-gray-500 text-sm mt-0.5">30 avaliações = posição de destaque em "jardinagem Gaspar" e "jardineiro Blumenau" = leads orgânicos gratuitos</p>
        </div>
        <div className="text-right shrink-0 ml-4">
          {editing ? (
            <div className="flex items-center gap-1.5">
              <input
                autoFocus
                type="number"
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && save()}
                className="w-14 text-center text-sm border border-forest-300 rounded-xl py-1.5 focus:outline-none focus:border-forest-500"
                min="0"
              />
              <span className="text-gray-400 text-sm">/ {meta.goal}</span>
              <button onClick={save} className="text-xs bg-forest-700 hover:bg-forest-600 text-white px-2.5 py-1.5 rounded-lg font-semibold ml-1 transition-colors">OK</button>
            </div>
          ) : (
            <button onClick={() => { setDraft(String(meta.current)); setEditing(true) }} className="text-right group">
              <p className="text-3xl font-bold text-forest-900 group-hover:text-forest-600 transition-colors leading-none">
                {meta.current}
                <span className="text-lg text-gray-400 font-normal"> / {meta.goal}</span>
              </p>
              <p className="text-xs text-gray-400 group-hover:text-forest-500 mt-0.5">clique para atualizar</p>
            </button>
          )}
        </div>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-4 mb-2">
        <div
          className="bg-gradient-to-r from-forest-600 to-gold-500 h-4 rounded-full transition-all duration-700 flex items-center justify-end pr-2"
          style={{ width: `${Math.max(pct, 4)}%` }}
        >
          {pct >= 12 && <span className="text-white text-xs font-bold">{pct}%</span>}
        </div>
      </div>
      <p className="text-xs text-gray-400 mb-6">
        {meta.goal - meta.current > 0
          ? `Faltam ${meta.goal - meta.current} avaliações para dominar Gaspar e Blumenau no Google`
          : `Meta atingida! Continue pedindo — cada avaliação reforça a posição no Google Maps.`}
      </p>

      <div className="border-t border-gray-100 pt-5">
        <p className="text-xs font-bold text-forest-800 uppercase tracking-wide mb-3">Como pedir avaliações — rotina de 5 min</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            { n: 1, tip: 'Após cada visita: envie foto do resultado com a legenda "ficou ótimo!" e adicione: "Se quiser me ajudar, aqui o link da avaliação Google 🙏"' },
            { n: 2, tip: 'QR Code do GMB laminado: entregue junto com o relatório do serviço — cliente escaneia de qualquer lugar.' },
            { n: 3, tip: 'Meta: 5 avaliações novas por mês. Comece pelos clientes mais satisfeitos — os 9/10 que nunca reclamam de preço.' },
            { n: 4, tip: 'Scripts prontos estão na seção Links Rápidos — dois modelos (formal para empresas/síndicos e próximo para clientes residenciais).' },
          ].map(item => (
            <div key={item.n} className="flex items-start gap-2 bg-green-50 rounded-xl px-3 py-2.5 border border-green-100">
              <span className="text-green-700 font-bold text-xs shrink-0 bg-green-200 w-5 h-5 rounded-full flex items-center justify-center mt-0.5">{item.n}</span>
              <p className="text-xs text-green-800 leading-relaxed">{item.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ProvaFocal() {
  const [casesState, setCasesState] = useState<Record<number, CaseExtra>>(loadCases)

  const updateCase = (idx: number, patch: Partial<CaseExtra>) => {
    const next = { ...casesState, [idx]: { ...(casesState[idx] ?? defaultExtra), ...patch } }
    setCasesState(next)
    saveCases(next)
  }

  return (
    <section id="prova-social" className="py-20 bg-[#F4F6F0]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Credibilidade real</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Arsenal de Prova Social</h2>
          <p className="text-gray-500 mt-2">O que você já construiu — e que a maioria do mercado em Gaspar não tem</p>
        </div>

        <div className="bg-forest-800 rounded-2xl p-6 mb-10 text-white">
          <p className="text-white/80 text-sm leading-relaxed">
            Você tem algo que nenhum concorrente em Gaspar consegue copiar amanhã: uma carteira onde 9 de 10 clientes nunca questionam o preço — prova concreta de que o produto é bom — e uma Fiorino comprada com esforço próprio.{' '}
            <span className="text-gold-500 font-semibold">Cada case documentado, cada avaliação e cada depoimento multiplica o poder dessa carteira âncora. Documente tudo. Use em cada proposta.</span>
          </p>
        </div>

        {/* Cases */}
        <h3 className="font-bold text-forest-900 text-lg mb-2">Cases — Documente Cada Um</h3>
        <p className="text-gray-500 text-sm mb-5">
          Clique em cada card para adicionar fotos antes/depois e depoimento do cliente. Estes materiais são seu arsenal de vendas — use nas propostas e abordagens comerciais.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {cases.map((c, i) => (
            <CaseCard
              key={i}
              c={c}
              idx={i}
              extra={casesState[i] ?? defaultExtra}
              onUpdate={patch => updateCase(i, patch)}
            />
          ))}
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-12">
          <p className="text-sm text-amber-800 font-medium">Prioridade imediata: solicitar depoimento do melhor cliente da carteira — mensagem de WhatsApp, avaliação Google ou vídeo de 30 segundos. É a prova social mais poderosa que você tem para fechar novos contratos em Gaspar e Blumenau.</p>
        </div>

        {/* Avaliações Google */}
        <h3 className="font-bold text-forest-900 text-lg mb-2">Avaliações Reais de Clientes</h3>
        <p className="text-gray-500 text-sm mb-5">Meta: 30 avaliações — domine Gaspar e Blumenau no Google Maps antes que qualquer concorrente perceba.</p>
        <div className="grid md:grid-cols-3 gap-4 mb-5">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <Star key={j} size={14} className="fill-gold-500 text-gold-500" />
                ))}
              </div>
              <p className="text-gray-600 text-sm italic leading-relaxed mb-3">"{r.quote}"</p>
              <div>
                <p className="font-semibold text-forest-900 text-sm">{r.name}</p>
                <p className="text-gray-400 text-xs">{r.date}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-forest-800 rounded-xl p-4 mb-10">
          <p className="text-white text-sm font-medium">Salve prints dos elogios de WhatsApp dos seus clientes — quem paga sem reclamar costuma mandar mensagem de aprovação. São a prova social mais imediata enquanto o GMB acumula avaliações públicas.</p>
        </div>

        {/* Meta de Avaliações */}
        <ReviewGoalTracker />

        {/* Diferenciais — split */}
        <h3 className="font-bold text-forest-900 text-lg mb-5">O que te separa do mercado em Gaspar</h3>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-6 bg-green-500 rounded-full" />
            <p className="font-bold text-green-800 text-sm uppercase tracking-wide">Você já tem — use como argumento de venda</p>
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            {jatem.map((d, i) => (
              <div key={i} className="flex items-center gap-2.5 bg-white border border-green-100 rounded-xl px-4 py-3">
                <CheckCircle size={15} className="text-green-500 shrink-0" />
                <span className="text-sm text-forest-900 font-medium">{d}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-6 bg-gold-500 rounded-full" />
            <p className="font-bold text-amber-800 text-sm uppercase tracking-wide">Fomentar e construir — próximos 90 dias</p>
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            {fomentar.map((d, i) => (
              <div key={i} className="flex items-center gap-2.5 bg-white border border-amber-100 rounded-xl px-4 py-3">
                <Zap size={15} className="text-gold-500 shrink-0" />
                <span className="text-sm text-forest-900 font-medium">{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Anti-ICP lembrete */}
        <div className="mt-6 bg-red-50 border border-red-100 rounded-2xl p-5 flex gap-3 items-start">
          <XCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-red-800 text-sm">O que não é seu cliente ideal</p>
            <p className="text-red-700 text-sm mt-1">Clientes que pedem desconto antes de ver o trabalho, fora do raio Gaspar/Blumenau sem compensar no ticket, serviço pontual sem possibilidade de recorrência, ticket abaixo do custo calculado. Use o <a href="#icp" className="underline font-semibold hover:text-red-900">Qualificador de ICP</a> para nunca mais perder tempo com o prospect errado.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
