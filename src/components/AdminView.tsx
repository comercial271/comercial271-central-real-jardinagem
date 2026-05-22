import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { Users, ChevronDown, ChevronUp, Leaf, LogOut, TrendingUp, Target, Check, FileText } from 'lucide-react'

interface MemberRow {
  id: string
  slug: string
  nome: string
  plano: string
  is_admin: boolean
  created_at: string
}

interface MemberDataRow {
  chave: string
  valor: unknown
  updated_at: string
}

export default function AdminView({ onBack }: { onBack: () => void }) {
  const { member: adminMember, signOut } = useAuth()
  const [members, setMembers] = useState<MemberRow[]>([])
  const [memberData, setMemberData] = useState<Record<string, MemberDataRow[]>>({})
  const [expanded, setExpanded] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('members')
      .select('*')
      .order('created_at')
      .then(({ data }) => {
        setMembers((data ?? []).filter(m => !m.is_admin))
        setLoading(false)
      })
  }, [])

  async function loadMemberData(memberId: string) {
    if (memberData[memberId]) return
    const { data } = await supabase
      .from('member_data')
      .select('chave, valor, updated_at')
      .eq('member_id', memberId)
    setMemberData(prev => ({ ...prev, [memberId]: data ?? [] }))
  }

  function toggle(id: string) {
    if (expanded === id) { setExpanded(null); return }
    loadMemberData(id)
    setExpanded(id)
  }

  function getVal<T>(memberId: string, key: string): T | undefined {
    return memberData[memberId]?.find(d => d.chave === key)?.valor as T | undefined
  }

  function icpProgress(memberId: string) {
    const r = getVal<Record<string, string>>(memberId, 'aleandro_icp_builder_v1')
    if (!r) return 0
    return Object.values(r).filter(v => v.trim().length > 20).length
  }

  function lastRevenue(memberId: string) {
    const entries = getVal<Array<{ mes: string; faturamento: number }>>(memberId, 'aleandro_jornada_revenue_v1')
    if (!entries || entries.length === 0) return null
    return entries[entries.length - 1]
  }

  function tarefasProgress(memberId: string) {
    const state = getVal<Record<string, { concluida: boolean }>>(memberId, 'aleandro_tarefas_v1')
    if (!state) return null
    const vals = Object.values(state)
    return { done: vals.filter(t => t.concluida).length, total: vals.length }
  }

  const ICP_KEY_LABELS: Record<string, string> = {
    melhores_clientes: 'Melhores clientes',
    segmento_ideal: 'Segmento ideal',
    dor_principal: 'Dor principal',
    diferencial: 'Diferencial',
    ticket_minimo: 'Ticket mínimo',
    localizacao: 'Localização',
    anti_icp: 'Anti-ICP',
    canal: 'Canal de aquisição',
  }

  return (
    <div className="min-h-screen bg-[#F4F6F0]">
      <div className="bg-forest-800 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-lg">
        <div className="flex items-center gap-3">
          <Leaf size={20} className="text-gold-500" />
          <div>
            <p className="text-white font-bold text-sm">Painel Admin — Selva Premium</p>
            <p className="text-white/50 text-xs">Olá, {adminMember?.nome ?? 'Admin'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-xs text-white/80 hover:text-white border border-white/20 hover:border-white/50 px-3 py-1.5 rounded-lg transition-colors"
          >
            Minha central
          </button>
          <button
            onClick={signOut}
            className="text-xs text-white/60 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <LogOut size={13} /> Sair
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Users size={20} className="text-forest-700" />
          <h1 className="text-xl font-bold text-forest-900">Membros Ativos</h1>
          {!loading && (
            <span className="text-xs bg-forest-100 text-forest-700 px-2 py-0.5 rounded-full font-bold">
              {members.length}
            </span>
          )}
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">
            <div className="w-6 h-6 border-2 border-forest-300 border-t-forest-700 rounded-full animate-spin mx-auto mb-3" />
            Carregando membros...
          </div>
        ) : members.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-dashed border-gray-200">
            <Users size={32} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Nenhum membro cadastrado ainda</p>
            <p className="text-gray-400 text-sm mt-1 max-w-sm mx-auto">
              Crie as contas no painel Supabase em Authentication → Users, depois insira o registro em members com o UUID gerado.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {members.map(m => {
              const isExp = expanded === m.id
              const loaded = !!memberData[m.id]
              const icp = loaded ? icpProgress(m.id) : null
              const rev = loaded ? lastRevenue(m.id) : null
              const cont = loaded ? (getVal<unknown[]>(m.id, 'aleandro_jornada_contratos_v1') ?? []).length : null
              const leads = loaded ? (getVal<unknown[]>(m.id, 'aleandro_icp_leads_v1') ?? []).length : null
              const tarefas = loaded ? tarefasProgress(m.id) : null

              return (
                <div key={m.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggle(m.id)}
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50/50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-forest-800 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-gold-500 font-bold text-sm">{m.nome.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="font-bold text-forest-900">{m.nome}</p>
                        <p className="text-xs text-gray-400">{m.plano} · @{m.slug}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      {loaded && (
                        <div className="hidden sm:flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1 font-medium">
                            <Target size={11} /> ICP {icp}/8
                          </span>
                          <span className="flex items-center gap-1 font-medium">
                            <TrendingUp size={11} />
                            {rev ? `R$${rev.faturamento.toLocaleString('pt-BR')}` : '—'}
                          </span>
                          <span className="flex items-center gap-1 font-medium">
                            <Check size={11} /> {cont} contrato{cont !== 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                      {isExp
                        ? <ChevronUp size={16} className="text-gray-400 shrink-0" />
                        : <ChevronDown size={16} className="text-gray-400 shrink-0" />
                      }
                    </div>
                  </button>

                  {isExp && (
                    <div className="border-t border-gray-100 px-5 py-5">
                      {!loaded ? (
                        <div className="text-center py-6 text-gray-400 text-sm">
                          <div className="w-5 h-5 border-2 border-forest-200 border-t-forest-600 rounded-full animate-spin mx-auto mb-2" />
                          Carregando dados...
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {/* Cards resumo */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                              { label: 'ICP Builder', value: `${icp}/8 perguntas`, Icon: Target },
                              { label: 'Faturamento atual', value: rev ? `R$${rev.faturamento.toLocaleString('pt-BR')}` : '—', Icon: TrendingUp },
                              { label: 'Contratos fechados', value: String(cont), Icon: Check },
                              { label: 'Prospects', value: String(leads), Icon: Users },
                            ].map(card => (
                              <div key={card.label} className="bg-[#F4F6F0] rounded-xl p-3">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <card.Icon size={12} className="text-forest-600" />
                                  <p className="text-xs text-gray-500">{card.label}</p>
                                </div>
                                <p className="font-bold text-forest-900">{card.value}</p>
                              </div>
                            ))}
                          </div>

                          {/* Tarefas */}
                          {tarefas && tarefas.total > 0 && (
                            <div>
                              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tarefas</p>
                              <div className="bg-[#F4F6F0] rounded-xl p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <p className="text-sm font-bold text-forest-900">{tarefas.done} de {tarefas.total} concluídas</p>
                                  <span className="text-xs text-gray-500">{Math.round((tarefas.done / tarefas.total) * 100)}%</span>
                                </div>
                                <div className="w-full bg-white rounded-full h-2">
                                  <div
                                    className="bg-forest-500 h-2 rounded-full transition-all"
                                    style={{ width: `${(tarefas.done / tarefas.total) * 100}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* ICP Builder */}
                          {(() => {
                            const r = getVal<Record<string, string>>(m.id, 'aleandro_icp_builder_v1')
                            const filled = r ? Object.entries(r).filter(([, v]) => v.trim().length > 0) : []
                            if (filled.length === 0) return null
                            return (
                              <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                  <FileText size={11} /> ICP Builder — respostas
                                </p>
                                <div className="space-y-2">
                                  {filled.map(([key, val]) => (
                                    <div key={key} className="bg-[#F4F6F0] rounded-xl p-3">
                                      <p className="text-xs font-bold text-forest-700 mb-1">{ICP_KEY_LABELS[key] ?? key}</p>
                                      <p className="text-sm text-gray-700 leading-relaxed">{val}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )
                          })()}

                          {/* Evolução de faturamento */}
                          {(() => {
                            const entries = getVal<Array<{ mes: string; faturamento: number; nota?: string }>>(m.id, 'aleandro_jornada_revenue_v1')
                            if (!entries || entries.length === 0) return null
                            return (
                              <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Evolução de faturamento</p>
                                <div className="space-y-1.5">
                                  {entries.map((e, i) => (
                                    <div key={i} className="flex items-center justify-between bg-[#F4F6F0] rounded-xl px-3 py-2 gap-3">
                                      <span className="text-xs text-gray-500 shrink-0">{e.mes}</span>
                                      <span className="font-bold text-forest-900 text-sm">R$ {e.faturamento.toLocaleString('pt-BR')}</span>
                                      {e.nota && <span className="text-xs text-gray-400 italic truncate">{e.nota}</span>}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )
                          })()}

                          {/* Contratos fechados */}
                          {(() => {
                            const contratos = getVal<Array<{ nome: string; valorMensal: number; data: string }>>(m.id, 'aleandro_jornada_contratos_v1')
                            if (!contratos || contratos.length === 0) return null
                            return (
                              <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Contratos fechados</p>
                                <div className="space-y-1.5">
                                  {contratos.map((c, i) => (
                                    <div key={i} className="flex items-center justify-between bg-green-50 border border-green-100 rounded-xl px-3 py-2.5">
                                      <div>
                                        <p className="font-semibold text-forest-900 text-sm">{c.nome}</p>
                                        <p className="text-xs text-gray-400">{c.data}</p>
                                      </div>
                                      <span className="text-green-700 font-bold text-sm shrink-0">
                                        R$ {c.valorMensal.toLocaleString('pt-BR')}/mês
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )
                          })()}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
