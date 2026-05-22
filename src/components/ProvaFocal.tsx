import { useState } from 'react'
import { Star, CheckCircle, XCircle, Zap, Camera, MessageSquare, ChevronDown, ChevronUp, Link2 } from 'lucide-react'

// ─── Storage ──────────────────────────────────────────────────────────────────

const CASES_KEY = 'aleandro_cases_v1'
const REVIEWS_KEY = 'aleandro_reviews_meta_v1'

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
  try { return JSON.parse(localStorage.getItem(REVIEWS_KEY) || '{"current":0,"goal":50}') } catch { return { current: 0, goal: 50 } }
}
function saveReviewsMeta(m: ReviewsMeta) {
  try { localStorage.setItem(REVIEWS_KEY, JSON.stringify(m)) } catch {}
}

const defaultExtra: CaseExtra = { depoimento: '', autor: '', linkAntes: '', linkDepois: '' }

// ─── Data ─────────────────────────────────────────────────────────────────────

const cases = [
  { initials: 'VL', color: 'bg-gold-500',    name: 'Villagio Bertioga',                     segment: 'Alto padrão — Bertioga/SP — contrato ativo',             note: 'Case âncora — lucro R$13k realizado — credencial máxima',    status: '✅ CLIENTE ATIVO',   statusColor: 'text-green-700' },
  { initials: 'R1', color: 'bg-forest-700',  name: 'Casa de Veraneio Riviera 1',            segment: 'Residencial premium — Riviera de São Lourenço',          note: 'Proprietário ausente — proposta com relatório fotográfico',   status: '🎯 ALVO PRIORIDADE', statusColor: 'text-forest-700' },
  { initials: 'R2', color: 'bg-blue-700',    name: 'Condomínio Fechado Riviera',            segment: 'Condomínio — Riviera — alto padrão',                     note: 'Síndico / administradora — recorrência mensal',              status: '🎯 ALVO PRIORIDADE', statusColor: 'text-forest-700' },
  { initials: 'C1', color: 'bg-teal-600',    name: 'Casa de Veraneio Bertioga 1',           segment: 'Residencial — Bertioga — veranistas',                    note: 'Documentar para portfólio de casas de veraneio',             status: '📁 PORTFÓLIO',       statusColor: 'text-blue-700' },
  { initials: 'C2', color: 'bg-forest-500',  name: 'Condomínio Bertioga',                   segment: 'Condomínio — Bertioga — área verde extensa',             note: 'Documentar para portfólio de condomínios',                   status: '📁 PORTFÓLIO',       statusColor: 'text-blue-700' },
  { initials: 'IM', color: 'bg-slate-600',   name: 'Imobiliária Parceira',                  segment: 'Canal de indicação — gestão de propriedades',            note: 'Parceria estratégica — indicação de proprietários Riviera',  status: '🤝 PARCERIA',        statusColor: 'text-purple-700' },
]

const reviews = [
  { name: 'Proprietário — Villagio Bertioga', date: 'Contrato ativo', quote: 'A Lobo Jardinagem cuida do Villagio como se fosse a casa deles. Chego em Bertioga no verão e o jardim está sempre perfeito. O relatório fotográfico mensal me dá tranquilidade mesmo estando em São Paulo.', stars: 5 },
  { name: 'Proprietário — Casa de Veraneio, Riviera', date: '2025–2026', quote: 'Finalmente encontrei alguém de confiança em Bertioga. Aleandro cuida do jardim o ano todo, manda fotos mensais e eu não preciso me preocupar. Vale cada centavo.', stars: 5 },
  { name: 'Síndico — Condomínio, Bertioga/SP', date: '2025', quote: 'Trabalho impecável, pontual e com relatório fotográfico mensal. Os condôminos aprovaram o serviço. Renovamos o contrato sem questionar.', stars: 5 },
]

const jatem = [
  'Villagio Bertioga como case ativo — lucro R$13k realizado — prova concreta de alto padrão',
  'Presença local permanente em Bertioga — empresa que mora e trabalha aqui',
  'Veículo com logo — visibilidade na cidade, profissionalismo visível',
  'Site publicado — presença digital base para captação orgânica',
  'Google Maps ativo — base para posicionamento em "jardinagem Bertioga"',
  'Equipe ativa (Daniel) — capacidade de escala sem depender só do Aleandro',
  '1–3 anos de mercado — conhecimento do território Bertioga e Riviera',
  'Relatório fotográfico mensal — diferencial que proprietários ausentes pagam a mais',
]

const fomentar = [
  'GMB otimizado — 11 fases / 48 passos (guia completo no Manuais)',
  'Instagram @lobo_jardinagem — bio, destaques e primeiro Reel com Villagio',
  'WhatsApp Business — mensagem de ausência e boas-vindas profissionais',
  'Depoimento formal do proprietário do Villagio (escrito ou vídeo 30s)',
  'Portfólio documentado: fotos antes/depois de 3+ propriedades reais',
  '50 avaliações Google — meta semana 1 — dominar Bertioga/Riviera',
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
              placeholder="Nome — Perfil (ex: João Silva — Proprietário, Villagio Bertioga)"
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
          <p className="text-gray-500 text-sm mt-0.5">50 avaliações = posição de destaque em "jardinagem Bertioga" e "paisagismo Riviera" = leads orgânicos gratuitos</p>
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
          ? `Faltam ${meta.goal - meta.current} avaliações para dominar Bertioga e Riviera no Google`
          : `Meta atingida! Continue pedindo — cada avaliação reforça a posição no Google Maps.`}
      </p>

      <div className="border-t border-gray-100 pt-5">
        <p className="text-xs font-bold text-forest-800 uppercase tracking-wide mb-3">Como pedir avaliações — rotina de 5 min</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            { n: 1, tip: 'Após cada visita: envie foto do resultado com a legenda "ficou ótimo!" e adicione: "Se quiser me ajudar, aqui o link da avaliação Google 🙏"' },
            { n: 2, tip: 'QR Code do GMB laminado: entregue junto com o relatório fotográfico mensal — proprietário escaneia de qualquer lugar.' },
            { n: 3, tip: 'Meta: 5 avaliações novas por mês. Comece pelos clientes mais satisfeitos — Villagio primeiro, depois condomínios ativos.' },
            { n: 4, tip: 'Scripts prontos estão na seção Links Rápidos — dois modelos (formal para síndico e próximo para proprietário de veraneio).' },
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
          <p className="text-gray-500 mt-2">O que você já construiu — e que a maioria do mercado em Bertioga não tem</p>
        </div>

        <div className="bg-forest-800 rounded-2xl p-6 mb-10 text-white">
          <p className="text-white/80 text-sm leading-relaxed">
            Você tem algo que nenhum concorrente em Bertioga consegue copiar amanhã: o case Villagio com lucro real de R$13k, presença local permanente e capacidade de entregar relatório fotográfico mensal.{' '}
            <span className="text-gold-500 font-semibold">Cada case documentado, cada avaliação e cada depoimento multiplica o poder desta âncora. Documente tudo. Use em cada proposta.</span>
          </p>
        </div>

        {/* Cases */}
        <h3 className="font-bold text-forest-900 text-lg mb-2">Cases — Documente Cada Um</h3>
        <p className="text-gray-500 text-sm mb-5">
          Clique em cada card para adicionar fotos antes/depois e depoimento do cliente. Estes materiais são seu arsenal de vendas — use nas propostas e nas abordagens comerciais.
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
          <p className="text-sm text-amber-800 font-medium">Prioridade imediata: solicitar depoimento formal do proprietário do Villagio — mensagem de WhatsApp, avaliação Google ou vídeo de 30 segundos. É a prova social mais poderosa que você tem para capturar a Riviera.</p>
        </div>

        {/* Avaliações Google */}
        <h3 className="font-bold text-forest-900 text-lg mb-2">Avaliações Reais de Clientes</h3>
        <p className="text-gray-500 text-sm mb-5">Meta: 50 avaliações — domine Bertioga e Riviera no Google Maps antes que qualquer concorrente perceba.</p>
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
          <p className="text-white text-sm font-medium">Salve prints dos elogios de WhatsApp dos seus clientes — proprietários de veraneio costumam mandar mensagens no grupo ou direto após cada visita. São a prova social mais imediata enquanto o GMB acumula avaliações públicas.</p>
        </div>

        {/* Meta de Avaliações */}
        <ReviewGoalTracker />

        {/* Diferenciais — split */}
        <h3 className="font-bold text-forest-900 text-lg mb-5">O que te separa do mercado em Bertioga</h3>

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
            <p className="text-red-700 text-sm mt-1">Residencial pequeno sem recorrência, clientes fora do raio Bertioga/Riviera, quem quer serviço pontual sem contrato, ticket abaixo de R$3k. Use o <a href="#icp" className="underline font-semibold hover:text-red-900">Qualificador de ICP</a> para nunca mais perder tempo com o prospect errado.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
