import { useState } from 'react'
import { useMemberStorage } from '../hooks/useMemberStorage'
import { ExternalLink, FolderOpen, Star, Zap, Edit3, Check, Building2, Briefcase, X, Copy, CheckCheck, MessageSquare, Link } from 'lucide-react'

const MIDIAKIT_KEY    = 'aleandro_midiakit_links_v1'
const REVIEW_LINK_KEY = 'aleandro_review_link_v1'

interface MidiaKitLinks {
  veraneo: string
  condominios: string
  manutencao: string
}

const DEFAULT_MIDIAKIT: MidiaKitLinks = { veraneo: '', condominios: '', manutencao: '' }

function EditableLink({ label, icon: Icon, value, onChange }: { label: string; icon: React.ElementType; value: string; onChange: (v: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const hasLink = value.startsWith('http')

  const commit = () => { onChange(draft.trim()); setEditing(false) }

  return (
    <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-3 py-3">
      <div className="bg-forest-100 p-2 rounded-lg shrink-0">
        <Icon size={14} className="text-forest-700" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-forest-900">{label}</p>
        {editing ? (
          <div className="flex gap-1.5 items-center mt-1">
            <input
              autoFocus
              type="url"
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') { setDraft(value); setEditing(false) } }}
              placeholder="https://drive.google.com/..."
              className="flex-1 text-xs bg-gray-50 border border-forest-300 rounded-lg px-2 py-1.5 outline-none focus:border-forest-500 min-w-0"
            />
            <button onClick={commit} className="text-green-600 hover:text-green-700 p-1"><Check size={13} /></button>
            <button onClick={() => { setDraft(value); setEditing(false) }} className="text-gray-400 hover:text-gray-600 p-1"><X size={11} /></button>
          </div>
        ) : (
          <p className="text-xs text-gray-400 truncate mt-0.5">{hasLink ? 'Link salvo ✓' : 'Gere no Selva Propostas → salve no Drive → cole aqui'}</p>
        )}
      </div>
      {!editing && (
        <div className="flex gap-1.5 shrink-0">
          {hasLink && (
            <a href={value} target="_blank" rel="noopener noreferrer"
              className="text-xs bg-forest-700 hover:bg-forest-600 text-white px-2.5 py-1.5 rounded-lg font-semibold inline-flex items-center gap-1 transition-colors">
              Abrir <ExternalLink size={10} />
            </a>
          )}
          <button onClick={() => { setDraft(value); setEditing(true) }}
            className="text-xs border border-gray-200 text-gray-400 hover:border-forest-300 hover:text-forest-600 p-1.5 rounded-lg transition-colors">
            <Edit3 size={11} />
          </button>
        </div>
      )}
    </div>
  )
}

const REVIEW_MSGS = [
  {
    id: 'formal',
    label: 'Para gestores e síndicos (condomínios, imobiliárias)',
    tag: 'Formal',
    tagColor: 'bg-forest-700 text-white',
    text: `Bom dia, [NOME]! Tudo bem por aí?

Passando para agradecer a confiança no trabalho da Lobo Jardinagem e perguntar se ficou satisfeito com o serviço.

Se quiser nos ajudar a crescer, uma avaliação no Google faz toda a diferença para que mais proprietários e gestores de Bertioga nos encontrem:

👉 [LINK DO GOOGLE MEU NEGÓCIO]

É rápido — menos de 2 minutos. Qualquer feedback é muito bem-vindo.

Att, Aleandro | Lobo Jardinagem
📱 [seu número]`,
  },
  {
    id: 'informal',
    label: 'Para proprietários de casa de veraneio (contatos próximos)',
    tag: 'Próximo',
    tagColor: 'bg-gold-500 text-forest-900',
    text: `Oi [NOME]! Tudo bem?

Espero que o jardim da sua casa em Bertioga esteja impecável!

Te peço um favor rápido: se ficou satisfeito com o trabalho da Lobo Jardinagem, me ajuda com uma avaliação no Google? Leva 1 minutinho e faz uma diferença enorme pra gente aparecer quando proprietários da Riviera buscam jardinagem:

⭐ [LINK DO GOOGLE MEU NEGÓCIO]

Qualquer feedback também serve — fico grato!

Abs, Aleandro | Lobo Jardinagem`,
  },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => {
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button
      onClick={copy}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
        copied ? 'bg-green-500 text-white' : 'bg-forest-800 hover:bg-forest-700 text-white'
      }`}
    >
      {copied ? <><CheckCheck size={12} /> Copiado!</> : <><Copy size={12} /> Copiar</>}
    </button>
  )
}

export default function LinksRapidos() {
  const [midiaKit, setMidiaKit] = useMemberStorage<MidiaKitLinks>(MIDIAKIT_KEY, DEFAULT_MIDIAKIT)
  const [reviewLink, setReviewLink] = useMemberStorage<string>(REVIEW_LINK_KEY, '')
  const [editingReviewLink, setEditingReviewLink] = useState(false)
  const [reviewLinkDraft, setReviewLinkDraft] = useState('')

  const commitReviewLink = () => {
    const v = reviewLinkDraft.trim()
    setReviewLink(v)
    setEditingReviewLink(false)
  }

  const resolvedMsgs = REVIEW_MSGS.map(msg => ({
    ...msg,
    text: reviewLink
      ? msg.text.replace(/\[LINK DO GOOGLE MEU NEGÓCIO\]/g, reviewLink)
      : msg.text,
  }))

  const updateMidiaKit = (key: keyof MidiaKitLinks, value: string) => {
    setMidiaKit({ ...midiaKit, [key]: value })
  }

  return (
    <section id="links" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Acesso direto</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Links Rápidos</h2>
          <p className="text-gray-500 mt-2">Tudo que você acessa com frequência — em um lugar só</p>
        </div>

        {/* Recursos Selva Premium */}
        <div className="bg-forest-800 rounded-2xl p-5 mb-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="bg-gold-500/20 p-2.5 rounded-xl shrink-0">
              <Zap size={18} className="text-gold-500" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Recursos Selva Premium</p>
              <p className="text-white/50 text-xs">Cronograma de aulas e área de membros</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="https://www.notion.so/COMUNIDADE-SELVA-Premium-35693140ded28010970af4105ed41660"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors">
              Cronograma de Aulas (Notion) <ExternalLink size={11} />
            </a>
            <a href="https://app.greenn.club/home"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-gold-500 hover:bg-gold-400 text-forest-900 text-xs font-bold px-4 py-2 rounded-xl transition-colors">
              Área de Membros <ExternalLink size={11} />
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Drive */}
          <div className="bg-[#F4F6F0] rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-forest-800 p-2.5 rounded-xl shrink-0">
                <FolderOpen size={18} className="text-gold-500" />
              </div>
              <div>
                <p className="font-bold text-forest-900 text-sm">Drive Lobo Jardinagem</p>
                <p className="text-gray-500 text-xs">Pastas principais da mentoria</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Pasta Principal — Lobo Jardinagem', href: 'https://drive.google.com/drive/folders/1gQIrHV7QTdkOdgllt9EIucidBwnGGjba' },
                { label: 'Entregáveis da Selva (modelos e ferramentas)', href: 'https://drive.google.com/drive/folders/1HtakX6CiU9ItFDsUfLj8BpDqefMCuS0V' },
                { label: 'Google Meu Negócio (otimizar)', href: 'https://business.google.com' },
                { label: 'Gerador de Propostas Selva', href: 'https://geradordepropostaselva.lovable.app' },
              ].map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between bg-white border border-gray-100 hover:border-forest-300 rounded-xl px-3 py-2.5 group transition-colors">
                  <span className="text-sm text-forest-800 font-medium group-hover:text-forest-600 truncate pr-2 transition-colors">{link.label}</span>
                  <ExternalLink size={12} className="text-gray-300 group-hover:text-forest-500 shrink-0 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Gerador + Mídia Kit */}
          <div className="bg-[#F4F6F0] rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-forest-800 p-2.5 rounded-xl shrink-0">
                <Zap size={18} className="text-gold-500" />
              </div>
              <div>
                <p className="font-bold text-forest-900 text-sm">Gerador Selva</p>
                <p className="text-gray-500 text-xs">Propostas e Mídia Kits por nicho</p>
              </div>
            </div>
            <a href="https://geradordepropostaselva.lovable.app" target="_blank" rel="noopener noreferrer"
              className="w-full bg-forest-800 hover:bg-forest-700 text-white text-sm font-bold px-4 py-3 rounded-xl flex items-center justify-center gap-2 mb-5 transition-colors">
              Abrir Gerador de Propostas <ExternalLink size={13} />
            </a>
            <p className="text-xs font-bold text-forest-800 uppercase tracking-wide mb-1">Mídia Kit por Segmento</p>
            <p className="text-xs text-gray-500 mb-3">Gere → salve PDF no Drive → cole o link aqui para acesso rápido</p>
            <div className="flex flex-col gap-2">
              <EditableLink label="Mídia Kit Casas de Veraneio" icon={Building2} value={midiaKit.veraneo} onChange={v => updateMidiaKit('veraneo', v)} />
              <EditableLink label="Mídia Kit Condomínios Riviera" icon={Building2} value={midiaKit.condominios} onChange={v => updateMidiaKit('condominios', v)} />
              <EditableLink label="Mídia Kit Manutenção Recorrente" icon={Briefcase} value={midiaKit.manutencao} onChange={v => updateMidiaKit('manutencao', v)} />
            </div>
          </div>

          {/* Presença Digital */}
          <div className="bg-[#F4F6F0] rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-forest-800 p-2.5 rounded-xl shrink-0">
                <Star size={18} className="text-gold-500" />
              </div>
              <div>
                <p className="font-bold text-forest-900 text-sm">Presença Digital</p>
                <p className="text-gray-500 text-xs">Canais ativos da Lobo Jardinagem</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Instagram @lobo_jardinagem', href: 'https://www.instagram.com/lobo_jardinagem' },
                { label: 'Google Meu Negócio (otimizar)', href: 'https://business.google.com' },
                { label: 'Gerador de Propostas Selva', href: 'https://geradordepropostaselva.lovable.app' },
                { label: 'Área de Membros Selva', href: 'https://app.greenn.club/home' },
                { label: 'Drive — Pasta Lobo Jardinagem', href: 'https://drive.google.com/drive/folders/1gQIrHV7QTdkOdgllt9EIucidBwnGGjba' },
                { label: 'Entregáveis da Selva', href: 'https://drive.google.com/drive/folders/1HtakX6CiU9ItFDsUfLj8BpDqefMCuS0V' },
              ].map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between bg-white border border-gray-100 hover:border-forest-300 rounded-xl px-3 py-2.5 group transition-colors">
                  <span className="text-sm text-forest-800 font-medium group-hover:text-forest-600 truncate pr-2 transition-colors">{link.label}</span>
                  <ExternalLink size={12} className="text-gray-300 group-hover:text-forest-500 shrink-0 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Solicitar Avaliação no Google */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-gold-100 p-2.5 rounded-xl shrink-0">
              <MessageSquare size={18} className="text-gold-600" />
            </div>
            <div>
              <p className="font-bold text-forest-900">Solicitar Avaliação no Google</p>
              <p className="text-gray-500 text-sm">Cole o link abaixo e ele entra automaticamente nas mensagens. Substitua só <span className="font-semibold text-forest-700">[NOME]</span> antes de enviar.</p>
            </div>
          </div>

          <div className="bg-[#F4F6F0] rounded-2xl p-4 mb-5 flex items-center gap-3">
            <div className="bg-forest-800 p-2 rounded-xl shrink-0">
              <Link size={14} className="text-gold-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-forest-900 mb-0.5">Link de Avaliação Google</p>
              {editingReviewLink ? (
                <div className="flex gap-1.5 items-center mt-1">
                  <input autoFocus type="url" value={reviewLinkDraft}
                    onChange={e => setReviewLinkDraft(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') commitReviewLink(); if (e.key === 'Escape') setEditingReviewLink(false) }}
                    placeholder="https://g.page/r/..."
                    className="flex-1 text-xs bg-white border border-forest-300 rounded-lg px-2 py-1.5 outline-none focus:border-forest-500 min-w-0"
                  />
                  <button onClick={commitReviewLink} className="text-green-600 hover:text-green-700 p-1"><Check size={13} /></button>
                  <button onClick={() => setEditingReviewLink(false)} className="text-gray-400 hover:text-gray-600 p-1"><X size={11} /></button>
                </div>
              ) : (
                <p className="text-xs text-gray-400 truncate">{reviewLink || 'Nenhum link salvo — clique em Editar para colar o seu'}</p>
              )}
            </div>
            {!editingReviewLink && (
              <button onClick={() => { setReviewLinkDraft(reviewLink); setEditingReviewLink(true) }}
                className="text-xs border border-gray-200 text-gray-400 hover:border-forest-300 hover:text-forest-600 px-3 py-1.5 rounded-lg transition-colors font-semibold shrink-0">
                {reviewLink ? 'Editar' : '+ Colar link'}
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {resolvedMsgs.map(msg => (
              <div key={msg.id} className="bg-[#F4F6F0] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3 gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${msg.tagColor}`}>{msg.tag}</span>
                    <p className="text-xs text-gray-500 truncate">{msg.label}</p>
                  </div>
                  <CopyButton text={msg.text} />
                </div>
                <pre className="text-xs text-gray-700 whitespace-pre-wrap font-sans bg-white border border-gray-100 rounded-xl p-4 leading-relaxed max-h-64 overflow-y-auto">{msg.text}</pre>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-start gap-2 text-xs text-gray-400">
            <Star size={11} className="text-gold-500 shrink-0 mt-0.5" />
            <p>Para obter o link: acesse <span className="font-semibold">business.google.com</span> → selecione o perfil Lobo Jardinagem → clique em "Receber mais avaliações" → copie o link e cole no campo acima.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
