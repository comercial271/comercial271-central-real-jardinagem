import { useState } from 'react'
import { useMemberStorage } from '../hooks/useMemberStorage'
import { TrendingUp, Award, Plus, Trash2, Check, X, ChevronRight, Zap, Star } from 'lucide-react'

// ─── Storage ──────────────────────────────────────────────────────────────────

const REVENUE_KEY  = 'aleandro_jornada_revenue_v1'
const CONTRACT_KEY = 'aleandro_jornada_contratos_v1'

const INVESTIMENTO = 997
const META = 50000

interface RevenueEntry {
  id: string
  mes: string
  faturamento: number
  nota: string
  locked?: boolean
}

interface Contrato {
  id: string
  nome: string
  valorMensal: number
  data: string
}

const DEFAULT_REVENUE: RevenueEntry[] = [
  { id: 'base', mes: 'mai/2026', faturamento: 10000, nota: 'Faturamento na entrada da Selva Premium', locked: true }
]

// ─── Deliverables ─────────────────────────────────────────────────────────────

const entregas = [
  { item: 'Sessão coletiva de Diagnóstico e Estratégia (14/05/2026)',                        valor: 600  },
  { item: 'Guia GMB Ultra-Detalhado — 11 fases, 48 passos para dominar Bertioga/Riviera',   valor: 1400 },
  { item: 'Plano de Ação 90 dias — GMB, precificação técnica e Riviera como território',    valor: 1200 },
  { item: 'Mapa de alvos — casas de veraneio + condomínios Riviera + imobiliárias',         valor: 400  },
  { item: 'Scripts de abordagem comercial — proprietário ausente, síndico e imobiliária',   valor: 400  },
  { item: 'Central Lobo Jardinagem — plataforma digital exclusiva',                         valor: 4500 },
  { item: 'Estratégia Instagram @lobo_jardinagem — bio, destaques e 4 roteiros de vídeo',  valor: 800  },
  { item: 'Qualificador de ICP personalizado para mercado premium de Bertioga/Riviera',     valor: 300  },
  { item: 'Acesso ao Gerador de Propostas Selva Premium',                                   valor: 1200 },
  { item: 'Modelos de contrato B2B (casas de veraneio, condomínios, recorrência)',          valor: 300  },
  { item: 'Acesso ao grupo Selva Premium Fundadores (por mês)',                             valor: 300  },
]
const TOTAL_ENTREGAS = entregas.reduce((s, e) => s + e.valor, 0)

// ─── Sub-components ───────────────────────────────────────────────────────────

function RevenueChart({ entries }: { entries: RevenueEntry[] }) {
  if (entries.length === 0) return null
  const maxVal = Math.max(META, ...entries.map(e => e.faturamento))
  const metaH = (META / maxVal) * 100

  return (
    <div className="relative">
      {/* Meta line */}
      <div className="absolute left-0 right-0 border-t-2 border-dashed border-gold-400 pointer-events-none" style={{ bottom: `${metaH}%`, top: 'auto' }}>
        <span className="absolute right-0 -top-5 text-xs text-gold-600 font-bold bg-gold-100 px-1.5 py-0.5 rounded">Meta R$50k</span>
      </div>
      <div className="flex items-end gap-2" style={{ height: '120px' }}>
        {entries.map(e => {
          const h = Math.max(4, (e.faturamento / maxVal) * 100)
          const pct = (e.faturamento / META) * 100
          const barColor = pct >= 100 ? 'bg-green-500' : pct >= 80 ? 'bg-gold-500' : pct >= 50 ? 'bg-forest-500' : 'bg-forest-400'
          return (
            <div key={e.id} className="flex flex-col items-center gap-1 flex-1 min-w-0">
              <div className="w-full flex items-end" style={{ height: '96px' }}>
                <div
                  className={`w-full rounded-t-lg transition-all duration-700 ${barColor} relative group`}
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-forest-900 text-white text-xs px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    R${e.faturamento.toLocaleString('pt-BR')}
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500 truncate w-full text-center">{e.mes}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function MinhaJornada() {
  const [entries, setEntries]     = useMemberStorage<RevenueEntry[]>(REVENUE_KEY, DEFAULT_REVENUE)
  const [contratos, setContratos] = useMemberStorage<Contrato[]>(CONTRACT_KEY, [])

  // new revenue form
  const [addingRev, setAddingRev]   = useState(false)
  const [revMes, setRevMes]         = useState('')
  const [revFat, setRevFat]         = useState('')
  const [revNota, setRevNota]       = useState('')

  // new contract form
  const [addingCont, setAddingCont] = useState(false)
  const [cNome, setCNome]           = useState('')
  const [cValor, setCValor]         = useState('')
  const [cData, setCData]           = useState('')

  const lastFaturamento = entries.length > 0 ? entries[entries.length - 1].faturamento : 10000
  const progPct = Math.min(100, Math.round((lastFaturamento / META) * 100))

  const totalContratosMonth = contratos.reduce((s, c) => s + c.valorMensal, 0)
  const totalContratosYear  = totalContratosMonth * 12
  const roi = totalContratosYear > 0 ? Math.round(((totalContratosYear - INVESTIMENTO) / INVESTIMENTO) * 100) : 0

  const addRevenue = () => {
    if (!revMes.trim() || !revFat.trim()) return
    const n: RevenueEntry = { id: String(Date.now()), mes: revMes.trim(), faturamento: parseFloat(revFat.replace(',', '.')), nota: revNota.trim() }
    const next = [...entries, n]
    setEntries(next)
    setRevMes(''); setRevFat(''); setRevNota(''); setAddingRev(false)
  }

  const removeRevenue = (id: string) => {
    const next = entries.filter(e => e.id !== id)
    setEntries(next)
  }

  const addContrato = () => {
    if (!cNome.trim() || !cValor.trim()) return
    const n: Contrato = { id: String(Date.now()), nome: cNome.trim(), valorMensal: parseFloat(cValor.replace(',', '.')), data: cData.trim() || new Date().toLocaleDateString('pt-BR') }
    const next = [n, ...contratos]
    setContratos(next)
    setCNome(''); setCValor(''); setCData(''); setAddingCont(false)
  }

  const removeContrato = (id: string) => {
    const next = contratos.filter(c => c.id !== id)
    setContratos(next)
  }

  return (
    <section id="jornada" className="py-20 bg-[#F4F6F0]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Crescimento real</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Minha Jornada</h2>
          <p className="text-gray-500 mt-2">De R$10.000 para R$50.000/mês — registre cada passo desta trajetória</p>
        </div>

        {/* ── Progresso para meta ── */}
        <div className="bg-forest-800 text-white rounded-2xl p-6 mb-8">
          <div className="flex items-start justify-between mb-4 gap-4">
            <div>
              <p className="text-white/60 text-sm">Faturamento atual</p>
              <p className="text-4xl font-bold text-white mt-0.5">R$ {lastFaturamento.toLocaleString('pt-BR')}<span className="text-white/40 text-lg font-normal">/mês</span></p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-white/60 text-sm">Meta 12 meses</p>
              <p className="text-2xl font-bold text-gold-500">R$ 50.000</p>
            </div>
          </div>
          <div className="w-full bg-forest-700 rounded-full h-5 mb-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-forest-400 to-gold-500 h-5 rounded-full transition-all duration-700 flex items-center justify-end pr-3"
              style={{ width: `${Math.max(progPct, 6)}%` }}
            >
              {progPct >= 12 && <span className="text-forest-900 text-xs font-bold">{progPct}%</span>}
            </div>
          </div>
          <p className="text-white/50 text-xs">
            Faltam R$ {Math.max(0, META - lastFaturamento).toLocaleString('pt-BR')}/mês para atingir a meta —
            {' '}{progPct < 100 ? `você está ${progPct}% do caminho` : 'meta atingida! 🎯'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* ── Gráfico de Evolução ── */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="font-bold text-forest-900">Evolução do Faturamento</p>
                <p className="text-gray-500 text-xs mt-0.5">Atualize mês a mês para ver sua trajetória</p>
              </div>
              <button
                onClick={() => setAddingRev(v => !v)}
                className="inline-flex items-center gap-1 text-xs font-bold text-forest-700 border border-forest-300 hover:bg-forest-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Plus size={12} /> Novo mês
              </button>
            </div>

            {addingRev && (
              <div className="mb-4 p-3 bg-forest-50 border border-forest-200 rounded-xl space-y-2">
                <div className="flex gap-2">
                  <input type="text" value={revMes} onChange={e => setRevMes(e.target.value)} placeholder="ex: jun/2026" className="flex-1 text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-forest-400" />
                  <input type="text" value={revFat} onChange={e => setRevFat(e.target.value)} placeholder="Faturamento (R$)" className="flex-1 text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-forest-400" />
                </div>
                <input type="text" value={revNota} onChange={e => setRevNota(e.target.value)} placeholder="Nota (opcional) — ex: fechou 2 casas Riviera" className="w-full text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-forest-400" />
                <div className="flex gap-2">
                  <button onClick={addRevenue} className="text-xs bg-forest-700 hover:bg-forest-600 text-white px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1"><Check size={11} /> Salvar</button>
                  <button onClick={() => setAddingRev(false)} className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1.5 flex items-center gap-1"><X size={11} /> Cancelar</button>
                </div>
              </div>
            )}

            <RevenueChart entries={entries} />

            {/* Entries list */}
            <div className="mt-4 space-y-1.5">
              {entries.map(e => (
                <div key={e.id} className="flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-gray-500 shrink-0 w-16">{e.mes}</span>
                    <span className="font-bold text-forest-900">R$ {e.faturamento.toLocaleString('pt-BR')}</span>
                    {e.nota && <span className="text-gray-400 truncate italic">— {e.nota}</span>}
                    {e.locked && <span className="text-xs bg-forest-100 text-forest-600 px-1.5 py-0.5 rounded-full shrink-0">entrada</span>}
                  </div>
                  {!e.locked && (
                    <button onClick={() => removeRevenue(e.id)} className="text-gray-300 hover:text-red-400 transition-colors shrink-0">
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Contratos Fechados ── */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="font-bold text-forest-900">Contratos Fechados pelo Programa</p>
                <p className="text-gray-500 text-xs mt-0.5">Registre cada novo contrato gerado pela mentoria</p>
              </div>
              <button
                onClick={() => setAddingCont(v => !v)}
                className="inline-flex items-center gap-1 text-xs font-bold text-forest-700 border border-forest-300 hover:bg-forest-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Plus size={12} /> Registrar
              </button>
            </div>

            {addingCont && (
              <div className="mb-4 p-3 bg-forest-50 border border-forest-200 rounded-xl space-y-2">
                <input type="text" value={cNome} onChange={e => setCNome(e.target.value)} placeholder="Nome do cliente / propriedade" className="w-full text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-forest-400" />
                <div className="flex gap-2">
                  <input type="text" value={cValor} onChange={e => setCValor(e.target.value)} placeholder="Valor mensal (R$)" className="flex-1 text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-forest-400" />
                  <input type="text" value={cData} onChange={e => setCData(e.target.value)} placeholder="Data (ex: 10/06/2026)" className="flex-1 text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-forest-400" />
                </div>
                <div className="flex gap-2">
                  <button onClick={addContrato} className="text-xs bg-forest-700 hover:bg-forest-600 text-white px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1"><Check size={11} /> Salvar</button>
                  <button onClick={() => setAddingCont(false)} className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1.5 flex items-center gap-1"><X size={11} /> Cancelar</button>
                </div>
              </div>
            )}

            {contratos.length === 0 ? (
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                <TrendingUp size={24} className="text-gray-200 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Nenhum contrato registrado ainda</p>
                <p className="text-gray-400 text-xs mt-0.5">Casas de veraneio e condomínios da Riviera estão a caminho →</p>
              </div>
            ) : (
              <div className="space-y-2.5 mb-4">
                {contratos.map(c => (
                  <div key={c.id} className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl px-3 py-2.5">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                      <Check size={14} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-forest-900 text-sm truncate">{c.nome}</p>
                      <p className="text-xs text-gray-500">{c.data} · <span className="font-semibold text-green-700">R$ {c.valorMensal.toLocaleString('pt-BR')}/mês</span></p>
                    </div>
                    <button onClick={() => removeContrato(c.id)} className="text-gray-300 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                  </div>
                ))}
              </div>
            )}

            {contratos.length > 0 && (
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total mensal</span>
                  <span className="font-bold text-forest-900">R$ {totalContratosMonth.toLocaleString('pt-BR')}/mês</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Projeção anual</span>
                  <span className="font-bold text-green-700">R$ {totalContratosYear.toLocaleString('pt-BR')}/ano</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── ROI do Programa ── */}
        {contratos.length > 0 ? (
          <div className="bg-forest-800 text-white rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-5">
              <Zap size={18} className="text-gold-500" />
              <p className="font-bold text-lg">ROI do Programa Selva Premium</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: 'Investimento no programa', value: `R$ ${INVESTIMENTO.toLocaleString('pt-BR')}`, sub: 'Selva Premium — pagamento único', color: 'text-white' },
                { label: 'Valor gerado (anual)', value: `R$ ${totalContratosYear.toLocaleString('pt-BR')}`, sub: 'Contratos fechados × 12 meses', color: 'text-green-400' },
                { label: 'ROI do programa', value: `${roi.toLocaleString('pt-BR')}%`, sub: 'Retorno sobre o investimento', color: 'text-gold-400' },
              ].map(item => (
                <div key={item.label} className="bg-forest-700/50 rounded-xl p-4">
                  <p className="text-white/60 text-xs mb-1">{item.label}</p>
                  <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                  <p className="text-white/40 text-xs mt-0.5">{item.sub}</p>
                </div>
              ))}
            </div>
            <p className="text-white/50 text-xs mt-4">
              Para cada R$1 investido no programa, você gerou R${Math.round(totalContratosYear / INVESTIMENTO).toLocaleString('pt-BR')} em valor anual de contrato.
            </p>
          </div>
        ) : (
          <div className="bg-forest-800 text-white rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={18} className="text-gold-500" />
              <p className="font-bold">ROI Potencial — Antes de Fechar os Alvos</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: 'Investimento no programa', value: 'R$ 997', color: 'text-white' },
                { label: 'Se fechar 8 casas Riviera (R$4k/cada)', value: 'R$ 384.000/ano', color: 'text-gold-400' },
                { label: 'ROI potencial', value: '~38.500%', color: 'text-green-400' },
              ].map(item => (
                <div key={item.label} className="bg-forest-700/50 rounded-xl p-4">
                  <p className="text-white/60 text-xs mb-1">{item.label}</p>
                  <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                </div>
              ))}
            </div>
            <p className="text-white/40 text-xs mt-3">Registre os contratos fechados acima para calcular o ROI real.</p>
          </div>
        )}

        {/* ── Valuation de Entregas ── */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Award size={18} className="text-gold-500" />
            <p className="font-bold text-forest-900 text-lg">O que você já recebeu</p>
          </div>
          <p className="text-gray-500 text-sm mb-5">Valuation de mercado de cada entrega — o que custaria contratar cada item separadamente</p>

          <div className="space-y-2 mb-5">
            {entregas.map((e, i) => (
              <div key={i} className="flex items-center justify-between gap-4 py-2.5 border-b border-gray-50 last:border-0">
                <div className="flex items-start gap-2.5 min-w-0">
                  <ChevronRight size={14} className="text-forest-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{e.item}</span>
                </div>
                <span className="text-sm font-bold text-forest-900 shrink-0">R$ {e.valor.toLocaleString('pt-BR')}</span>
              </div>
            ))}
          </div>

          <div className="bg-forest-800 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-white/70 text-sm">Valor total de mercado das entregas</p>
              <p className="text-3xl font-bold text-white mt-0.5">R$ {TOTAL_ENTREGAS.toLocaleString('pt-BR')}</p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-sm">Você investiu</p>
              <p className="text-3xl font-bold text-gold-500">R$ 997</p>
            </div>
            <div className="w-full border-t border-forest-700 pt-4 flex items-center justify-between">
              <p className="text-white/60 text-sm">Economia de</p>
              <div className="flex items-center gap-2">
                <Star size={16} className="text-gold-500" />
                <p className="text-xl font-bold text-green-400">R$ {(TOTAL_ENTREGAS - INVESTIMENTO).toLocaleString('pt-BR')} em valor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
