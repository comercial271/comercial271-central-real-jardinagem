import { useRef, useState } from 'react'
import { useMemberStorage } from '../hooks/useMemberStorage'
import { Circle, CheckCircle2, AlertTriangle, ExternalLink, Calendar, ChevronDown, ChevronUp, Paperclip, StickyNote, Trash2, FileText, Image, X } from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface Anexo {
  id: string
  nome: string
  tipo: string
  tamanho: number
  dataUrl: string | null
  addedAt: string
}

interface TarefaState {
  concluida: boolean
  nota: string
  anexos: Anexo[]
}

// ─── Storage helpers ──────────────────────────────────────────────────────────

const STORAGE_KEY = 'guilherme_tarefas_v1'

type AllState = Record<string, TarefaState>
type SetAllState = (v: AllState | ((p: AllState) => AllState)) => void

// ─── Tarefa data ──────────────────────────────────────────────────────────────

const tarefas = [
  {
    id: 'planilha-custos',
    prazo: '01/06 — URGENTE',
    urgencia: 'red',
    titulo: 'Montar planilha de custos operacionais',
    descricao: 'Mapear todos os custos fixos e variáveis da operação: Fiorino (combustível, IPVA, manutenção, depreciação), equipamentos amortizados, horas trabalhadas por tipo de serviço. Usar a Planilha de Margem disponível no Arsenal.',
    nota: 'Sem esse número na mão, cada proposta é um chute. Com o custo/hora calculado, você sabe qual é o valor mínimo que não pode baixar — e cobra com segurança sem medo.',
    link: { label: 'Abrir Planilha de Margem', href: 'https://docs.google.com/spreadsheets/d/1FUW7A1egXwdWi1HCKxV6Bzg14GASEJV__5eneMELrZw/edit' },
  },
  {
    id: 'gerador-propostas',
    prazo: '01/06 — URGENTE',
    urgencia: 'red',
    titulo: 'Testar Gerador de Propostas Selva + definir preço mínimo',
    descricao: 'Acessar o Gerador de Propostas Selva e gerar uma proposta teste para cada tipo de serviço: manutenção mensal (recorrente), limpeza pontual, implantação. Usar os custos calculados na tarefa anterior para definir o preço mínimo de cada tipo.',
    nota: 'A partir daqui, toda proposta nova sai do Gerador — nunca mais de cabeça. Padronizar o preço mínimo elimina o "cobrar no feeling" que é a trava central do negócio.',
    link: { label: 'Abrir Gerador de Propostas', href: 'https://geradordepropostaselva.lovable.app' },
  },
  {
    id: 'gmb-gaspar',
    prazo: '03/06 — PRIORIDADE',
    urgencia: 'orange',
    titulo: 'Criar Google Meu Negócio em Gaspar',
    descricao: 'Criar e verificar o perfil GMB: nome "Real Jardinagem", categoria "Jardineiro", endereço Gaspar/SC, telefone, horário, descrição com "jardinagem Gaspar", "manutenção de jardim Blumenau", "jardineiro Vale Europeu". Subir as 5 primeiras fotos de serviços reais.',
    nota: 'Zero concorrentes com GMB ativo em Gaspar. Criar agora é cravar uma bandeira antes que qualquer outro jardineiro perceba. Quem aparece primeiro no Google captura o mercado inteiro.',
    link: { label: 'Abrir guia GMB', href: '#manuais' },
  },
  {
    id: 'instagram-reel1',
    prazo: '06/06 — PRIORIDADE',
    urgencia: 'orange',
    titulo: 'Reativar @realjardinag com primeiro Reel de antes/depois',
    descricao: 'Gravar e publicar o primeiro Reel do @realjardinag usando um serviço recente. Legenda: "Jardineiro profissional em Gaspar/SC. Comecei com uma Fiorino e muito trabalho. Se você quer um jardim que valorize seu espaço, me chama." Atualizar bio com Gaspar/SC e link do WhatsApp.',
    nota: 'O @realjardinag parado é oportunidade perdida toda semana. Um Reel de antes/depois já posiciona acima de 100% dos concorrentes da região. Grave — não perfeccionize.',
    link: { label: 'Ver guia Instagram', href: '#instagram' },
  },
  {
    id: 'contrato-proximo-cliente',
    prazo: '10/06 — MÉDIO PRAZO',
    urgencia: 'yellow',
    titulo: 'Assinar contrato com próximo cliente novo — modelo Selva',
    descricao: 'Usar o Contrato Recorrente (manutenção mensal) ou o Contrato Empreitada (serviço pontual) disponíveis no Arsenal para formalizar o próximo cliente novo. Não aceitar novo cliente sem contrato assinado a partir de agora.',
    nota: 'Trabalhar sem contrato é um dos maiores riscos jurídicos de uma operação que cresce. O modelo já está pronto no Arsenal — é só personalizar e enviar para assinar. Clientes que nunca reclamam de preço assinam contrato sem problema.',
    link: { label: 'Abrir Contrato Recorrente', href: 'https://docs.google.com/document/d/1ps4_GPgF9W3D92YsMiLpT2y_lG3MaqfnxsAmy_t3b8g/edit' },
  },
]

const urgenciaConfig: Record<string, { bg: string; text: string }> = {
  red:    { bg: 'bg-red-100',    text: 'text-red-700'    },
  orange: { bg: 'bg-orange-100', text: 'text-orange-700' },
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function AnexoChip({ anexo, onRemove }: { anexo: Anexo; onRemove: () => void }) {
  const isImage = anexo.tipo.startsWith('image/')
  const kb = (anexo.tamanho / 1024).toFixed(0)

  const handleOpen = () => {
    if (anexo.dataUrl) {
      const win = window.open()
      if (win) {
        if (isImage) {
          win.document.write(`<img src="${anexo.dataUrl}" style="max-width:100%" />`)
        } else {
          const link = win.document.createElement('a')
          link.href = anexo.dataUrl
          link.download = anexo.nome
          link.click()
          win.close()
        }
      }
    }
  }

  return (
    <div className="flex items-center gap-2 bg-forest-50 border border-forest-200 rounded-lg px-3 py-1.5 text-xs">
      {isImage ? <Image size={12} className="text-forest-600 shrink-0" /> : <FileText size={12} className="text-forest-600 shrink-0" />}
      <button onClick={handleOpen} className="text-forest-800 font-medium hover:underline truncate max-w-[140px]">
        {anexo.nome}
      </button>
      <span className="text-gray-400">{kb}KB</span>
      <button onClick={onRemove} className="text-gray-400 hover:text-red-500 ml-1">
        <X size={11} />
      </button>
    </div>
  )
}

function TarefaPanel({ tarefaId, allState, setAllState }: {
  tarefaId: string
  allState: AllState
  setAllState: SetAllState
}) {
  const state: TarefaState = allState[tarefaId] ?? { concluida: false, nota: '', anexos: [] }
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadError, setUploadError] = useState('')

  const update = (patch: Partial<TarefaState>) => {
    setAllState({ ...allState, [tarefaId]: { ...state, ...patch } })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadError('')
    files.forEach(file => {
      const MAX = 3 * 1024 * 1024
      if (file.size > MAX) {
        setUploadError(`"${file.name}" é maior que 3MB. Suba no Google Drive e cole o link nas anotações.`)
        return
      }
      const reader = new FileReader()
      reader.onload = (ev) => {
        const newAnexo: Anexo = {
          id: `${Date.now()}-${Math.random()}`,
          nome: file.name,
          tipo: file.type,
          tamanho: file.size,
          dataUrl: ev.target?.result as string,
          addedAt: new Date().toLocaleString('pt-BR'),
        }
        setAllState(prev => ({
          ...prev,
          [tarefaId]: { ...state, anexos: [...state.anexos, newAnexo] }
        }))
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }

  const removeAnexo = (id: string) => {
    update({ anexos: state.anexos.filter(a => a.id !== id) })
  }

  return (
    <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-3">
      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-forest-700 mb-1.5">
          <StickyNote size={12} /> Anotações
        </label>
        <textarea
          value={state.nota}
          onChange={e => update({ nota: e.target.value })}
          placeholder="Escreva aqui o andamento, resultados, obstáculos ou qualquer observação..."
          className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:border-forest-400 focus:bg-white transition-colors"
          rows={3}
        />
        {state.nota && (
          <p className="text-xs text-gray-400 mt-0.5">Salvo automaticamente</p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-forest-700 mb-1.5">
          <Paperclip size={12} /> Anexos
        </label>
        {state.anexos.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {state.anexos.map(a => (
              <AnexoChip key={a.id} anexo={a} onRemove={() => removeAnexo(a.id)} />
            ))}
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx,.xlsx,.xls"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-700 border border-dashed border-forest-300 hover:border-forest-500 hover:bg-forest-50 px-3 py-1.5 rounded-lg transition-colors"
        >
          <Paperclip size={12} /> Anexar arquivo (fotos, PDF, planilha)
        </button>
        {uploadError && (
          <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 mt-2 flex items-start gap-1.5">
            <AlertTriangle size={11} className="shrink-0 mt-0.5" /> {uploadError}
          </p>
        )}
        <p className="text-xs text-gray-400 mt-1">Máx. 3MB por arquivo. Arquivos maiores: cole o link do Drive nas anotações.</p>
      </div>
    </div>
  )
}

// ─── Main card ────────────────────────────────────────────────────────────────

function TarefaCard({ t, allState, setAllState }: {
  t: typeof tarefas[0]
  allState: AllState
  setAllState: SetAllState
}) {
  const [open, setOpen] = useState(false)
  const state: TarefaState = allState[t.id] ?? { concluida: false, nota: '', anexos: [] }
  const u = urgenciaConfig[t.urgencia]

  const toggleConcluida = () => {
    setAllState({ ...allState, [t.id]: { ...state, concluida: !state.concluida } })
  }

  const hasActivity = state.nota.length > 0 || state.anexos.length > 0

  return (
    <div className={`bg-white border rounded-xl p-5 shadow-sm transition-all ${state.concluida ? 'border-green-200 opacity-75' : 'border-gray-200'}`}>
      <div className="flex gap-4">
        <button onClick={toggleConcluida} className="shrink-0 mt-0.5">
          {state.concluida
            ? <CheckCircle2 size={28} className="text-green-500" />
            : <Circle size={28} className="text-gray-300 hover:text-forest-400 transition-colors" />
          }
        </button>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${u.bg} ${u.text}`}>
              {t.prazo}
            </span>
            {hasActivity && (
              <span className="text-xs bg-forest-100 text-forest-700 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                <StickyNote size={10} />
                {state.anexos.length > 0 ? `${state.anexos.length} anexo${state.anexos.length > 1 ? 's' : ''}` : 'com anotação'}
              </span>
            )}
          </div>
          <h3 className={`font-bold text-base mb-1 ${state.concluida ? 'line-through text-gray-400' : 'text-forest-900'}`}>
            {t.titulo}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-3">{t.descricao}</p>
          <div className="border-l-4 border-gold-500 bg-gold-100 pl-3 py-1.5 rounded-r-lg mb-3">
            <p className="text-xs text-forest-800 font-medium">{t.nota}</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {t.link && (
              <a
                href={t.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-forest-700 font-semibold hover:text-forest-900 underline underline-offset-2"
              >
                {t.link.label} <ExternalLink size={13} />
              </a>
            )}
            <button
              onClick={() => setOpen(!open)}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                open
                  ? 'bg-forest-800 text-white border-forest-800'
                  : 'text-forest-700 border-forest-300 hover:bg-forest-50'
              }`}
            >
              <StickyNote size={12} />
              {open ? 'Fechar' : 'Anotações e Anexos'}
              {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          </div>
          {open && <TarefaPanel tarefaId={t.id} allState={allState} setAllState={setAllState} />}
        </div>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Tarefas() {
  const [allState, setAllState] = useMemberStorage<AllState>(STORAGE_KEY, {})

  const concluidas = tarefas.filter(t => allState[t.id]?.concluida).length

  return (
    <section id="tarefas" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-10">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Compromissos</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Missão do Momento</h2>
          <p className="text-gray-500 mt-2">Seus compromissos até o check-in de 17/06/2026</p>
        </div>

        <div className="bg-forest-800 rounded-2xl p-6 mb-8 text-white flex items-start gap-4">
          <AlertTriangle className="text-gold-500 shrink-0 mt-0.5" size={22} />
          <div className="flex-1">
            <p className="font-bold text-lg">Seus 5 movimentos — maio a junho/2026</p>
            <p className="text-white/70 text-sm mt-1">Planilha de custos + Gerador de Propostas + GMB Gaspar + @realjardinag ativo + primeiro contrato assinado. Nessa ordem.</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1 bg-forest-700 rounded-full h-2">
                <div
                  className="bg-gold-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(concluidas / tarefas.length) * 100}%` }}
                />
              </div>
              <span className="text-gold-500 text-sm font-bold shrink-0">{concluidas} / {tarefas.length} concluídas</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {tarefas.map(t => <TarefaCard key={t.id} t={t} allState={allState} setAllState={setAllState} />)}
        </div>

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-3 items-start">
          <Calendar size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-900">Check-in com a Juliana: 17/06/2026</p>
            <p className="text-amber-700 text-sm mt-0.5">Chegue com custo/hora calculado, GMB criado, primeiro Reel publicado e pelo menos um contrato novo assinado com o modelo Selva. O próximo passo depende do que você fizer agora.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
