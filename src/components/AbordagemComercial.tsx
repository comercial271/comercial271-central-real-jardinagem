import { useState } from 'react'
import { MessageSquare, Phone, Send, ChevronDown, ChevronUp, Smartphone, Shield, User, Building2, CheckCircle, AlertTriangle, Copy, Check, Home, MapPin } from 'lucide-react'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handle = () => {
    navigator.clipboard.writeText(text).catch(() => {
      const el = document.createElement('textarea'); el.value = text
      document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el)
    })
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={handle}
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${copied ? 'bg-green-500 text-white border-green-500' : 'border-forest-300 text-forest-600 hover:border-forest-600 hover:text-forest-900'}`}>
      {copied ? <><Check size={11} /> Copiado</> : <><Copy size={11} /> Copiar script</>}
    </button>
  )
}

function Script({ label, canal, texto }: { label: string; canal: string; texto: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50/80 transition-colors text-left">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wide text-forest-700 bg-forest-100 px-2 py-0.5 rounded-full">{canal}</span>
          <span className="text-sm font-semibold text-forest-900">{label}</span>
        </div>
        {open ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
      </button>
      {open && (
        <div className="px-4 pb-4 bg-gray-50/50 border-t border-gray-100">
          <pre className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-sans mt-3 mb-3">{texto}</pre>
          <CopyButton text={texto} />
        </div>
      )}
    </div>
  )
}

function EtapasList({ etapas }: { etapas: { titulo: string; prazo?: string; desc: string; detalhe?: string }[] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mb-6">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-semibold text-forest-700 hover:text-forest-900 transition-colors mb-3">
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {open ? 'Ocultar' : 'Ver'} {etapas.length} etapas da abordagem
      </button>
      {open && (
        <div className="flex flex-col gap-0">
          {etapas.map((e, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-forest-800 text-gold-500 font-bold text-xs flex items-center justify-center shrink-0">{i + 1}</div>
                {i < etapas.length - 1 && <div className="w-0.5 bg-gray-200 flex-1 mt-1.5" />}
              </div>
              <div className="pb-5 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <p className="font-bold text-forest-900 text-sm">{e.titulo}</p>
                  {e.prazo && <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full">{e.prazo}</span>}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{e.desc}</p>
                {e.detalhe && <p className="text-forest-700 text-xs font-medium mt-1.5 bg-forest-50 px-3 py-1.5 rounded-xl border-l-2 border-forest-400">{e.detalhe}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const etapasVeraneo = [
  { titulo: 'Pesquisa prévia', prazo: '15 min antes', desc: 'Google Maps, Airbnb/Booking da propriedade se houver. Identificar tipo de imóvel (casa de veraneio, pousada, condomínio). Estimar presença do proprietário: imóveis de R$1M+ em Bertioga/Riviera tendem a ter donos que vivem em São Paulo.' },
  { titulo: 'Identificar o responsável', prazo: 'Primeiro contato', desc: 'Portaria, vizinho conhecido ou indicação de cliente atual. Pergunta: "Quem cuida do jardim desta propriedade quando o dono não está?" — abre a conversa sobre ausência.', detalhe: '"Bom dia! Sou o Aleandro, da Lobo Jardinagem de Bertioga. Estou visitando a região para oferecer manutenção de jardim para proprietários que não moram aqui. Você poderia me ajudar a falar com o responsável?"' },
  { titulo: 'WhatsApp direto ao proprietário', prazo: 'No mesmo dia', desc: 'Tom: você entende que ele não está aqui — e é exatamente por isso que você existe. Mencionar o Villagio como case âncora.' },
  { titulo: 'Proposta com relatório fotográfico', prazo: '24h após contato', desc: 'Diferencial principal: relatório mensal com fotos enviado por WhatsApp. Proprietário vê o jardim de onde estiver. Usar Gerador Selva.' },
  { titulo: 'Follow-up pós-proposta', prazo: '48–72h depois', desc: 'Máximo 2 follow-ups. Após isso, retomar em 30 dias ou na véspera do verão (outubro/novembro).' },
]

const etapasCondominio = [
  { titulo: 'Pesquisa prévia', prazo: '20 min antes', desc: 'Google Maps para ver áreas comuns. Identificar portaria, síndico ou administradora. Condomínios da Riviera costumam ter administradora terceirizada em SP.' },
  { titulo: 'Contato via portaria ou administradora', prazo: 'Primeiro contato', desc: 'Pedir contato do síndico ou responsável pela manutenção das áreas comuns.', detalhe: '"Bom dia! Aqui é a Lobo Jardinagem, empresa de jardinagem de Bertioga. Gostaria de falar com o síndico ou responsável pelas áreas verdes do condomínio."' },
  { titulo: 'WhatsApp ao síndico', prazo: 'No mesmo dia', desc: 'Tom: parceria de longo prazo para manter as áreas comuns impecáveis o ano todo. Mencionar Villagio como referência ativa.' },
  { titulo: 'Visita + proposta', prazo: 'Na semana', desc: 'Proposta com cronograma de manutenção e relatório fotográfico mensal. Usar Gerador Selva. Enfatizar presença local — você está em Bertioga, não precisa vir do exterior.' },
  { titulo: 'Follow-up', prazo: '48–72h depois', desc: 'Máximo 2 follow-ups. Retomar em 30 dias ou na virada para a temporada.' },
]

const scriptVeraneioPrimeiro = `Bom dia, [NOME]! Tudo bem?

Aqui é o Aleandro, da Lobo Jardinagem — empresa de manutenção de jardins de Bertioga/SP.

Cuido do jardim do Villagio Bertioga e de outras propriedades na região. Trabalho com proprietários que passam a maior parte do ano fora e precisam de alguém de confiança cuidando do jardim quando não estão.

Você recebe um relatório fotográfico mensal por aqui no WhatsApp — vê tudo sem precisar estar em Bertioga.

Posso enviar uma proposta personalizada para a sua propriedade?

Aleandro | Lobo Jardinagem
📍 Bertioga/SP
📱 [seu número]`

const scriptCondominioNovo = `Bom dia! Tudo bem?

Aqui é o Aleandro, da Lobo Jardinagem — empresa de jardinagem especializada em Bertioga e Riviera de São Lourenço.

Gostaria de apresentar nossa solução de manutenção para as áreas verdes do [NOME DO CONDOMÍNIO]. Trabalhamos com cronograma fixo e relatório fotográfico mensal — síndico e condôminos acompanham tudo de onde estiverem.

Referência ativa: Villagio Bertioga — jardim mantido por nós.

Posso agendar uma visita para apresentar o trabalho?

Aleandro | Lobo Jardinagem
📱 [seu número]`

const scriptImobiliaria = `Bom dia! Tudo bem?

Aqui é o Aleandro, da Lobo Jardinagem de Bertioga/SP.

Trabalho com proprietários de casas de veraneio e condomínios da Riviera de São Lourenço e gostaria de apresentar uma parceria para gestão de jardins das propriedades que vocês administram.

Proprietários que não residem em Bertioga precisam de manutenção contínua e relatório fotográfico — é exatamente o que entrego.

Posso enviar um portfólio?

Aleandro | Lobo Jardinagem
📱 [seu número]`

const scriptFollowUp = `Bom dia!

Passando para retomar o contato sobre a manutenção do jardim.

Tenho uma proposta com relatório fotográfico mensal — você acompanha o jardim de onde estiver, sem precisar vir a Bertioga.

Podemos marcar uma visita de 20 minutos sem compromisso?

Aleandro | Lobo Jardinagem`

const scriptTemporada = `Bom dia, [NOME]!

O verão está chegando e as casas de veraneio da Riviera estão reabrindo para a temporada.

Garanto que o jardim da sua propriedade em Bertioga vai estar impecável para a chegada. Manutenção pré-temporada + contrato de manutenção mensal.

Interesse em uma proposta?

Aleandro | Lobo Jardinagem
📱 [seu número]`

export default function AbordagemComercial() {
  return (
    <section id="abordagem" className="py-20 bg-[#F4F6F0]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Estratégia de mercado</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Abordagem Comercial</h2>
        </div>

        {/* Conceito central */}
        <div className="bg-forest-800 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-start gap-4">
            <Shield size={22} className="text-gold-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-lg mb-2">Você vende tranquilidade — não jardinagem</h3>
              <p className="text-white/70 text-sm mb-4">O proprietário de casa de veraneio na Riviera não quer saber de mato crescido quando chega no verão. Ele quer chegar e o jardim estar perfeito. Você vende isso — não roçada. Toda abordagem começa com a ausência dele.</p>
              <div className="grid md:grid-cols-2 gap-3 mt-3">
                <div className="bg-red-500/15 border border-red-400/30 rounded-xl p-3">
                  <p className="text-red-300 text-xs font-bold uppercase tracking-wide mb-1">Não fazer</p>
                  <p className="text-white/70 text-sm">"Oi, faço jardinagem em Bertioga, queria saber se precisa de serviço..."</p>
                </div>
                <div className="bg-green-500/15 border border-green-400/30 rounded-xl p-3">
                  <p className="text-green-300 text-xs font-bold uppercase tracking-wide mb-1">Fazer</p>
                  <p className="text-white/70 text-sm">"Bom dia. Cuido do jardim do Villagio Bertioga e de outras propriedades na Riviera para proprietários que não moram aqui. Você recebe foto mensal pelo WhatsApp."</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Setup WhatsApp */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-2 rounded-xl shrink-0">
              <Smartphone size={18} className="text-green-700" />
            </div>
            <div>
              <p className="font-bold text-forest-900">Setup do WhatsApp Comercial</p>
              <p className="text-gray-500 text-xs">Configure antes de qualquer contato — proprietário da Riviera pesquisa o número</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#F4F6F0] rounded-xl p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-forest-700 mb-2">Configuração do número</p>
              <ul className="flex flex-col gap-1.5">
                {[
                  { icon: Smartphone,    text: 'Chip separado ou segundo número de app' },
                  { icon: User,          text: 'Nome: "Aleandro | Lobo Jardinagem"' },
                  { icon: Building2,     text: 'Foto: logo da empresa ou foto no Villagio' },
                  { icon: MessageSquare, text: 'Conta: WhatsApp Business (gratuito)' },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <Icon size={13} className="text-forest-600 shrink-0 mt-0.5" /> {item.text}
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-2">
              <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-amber-800 text-sm">
                <strong>Por quê?</strong> Proprietário de imóvel de R$2M na Riviera que salva o contato precisa ver "Lobo Jardinagem" — não um número desconhecido. Reforça empresa, não autônomo.
              </p>
            </div>
          </div>
        </div>

        {/* Casas de Veraneio */}
        <div className="bg-white rounded-2xl border border-gray-100 mb-4 overflow-hidden">
          <div className="bg-forest-800 px-6 py-4 flex items-center gap-3">
            <div className="bg-gold-500/20 p-1.5 rounded-lg shrink-0">
              <Home size={16} className="text-gold-500" />
            </div>
            <div className="flex-1">
              <p className="text-gold-400 text-xs font-bold uppercase tracking-widest">Alvo 1 — Prioridade Máxima</p>
              <p className="text-white font-bold text-lg leading-tight">Casas de Veraneio — Riviera de São Lourenço</p>
            </div>
            <span className="bg-gold-500/20 text-gold-400 text-xs font-bold px-3 py-1 rounded-full border border-gold-500/30">VILLAGIO COMO ÂNCORA</span>
          </div>
          <div className="p-6">
            <p className="text-gray-600 text-sm mb-5 bg-blue-50 border-l-4 border-blue-400 px-4 py-3 rounded-r-xl">
              <strong className="text-blue-800">Contexto:</strong> A Riviera tem centenas de casas de R$1M–R$10M+ com proprietários que passam a maior parte do ano em São Paulo ou no exterior. Esses clientes precisam de alguém de confiança que cuide do jardim na ausência deles e envie prova visual mensal. O Villagio já é sua âncora — use em toda abordagem.
            </p>
            <EtapasList etapas={etapasVeraneo} />
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={14} className="text-forest-600" />
              <p className="font-bold text-forest-900 text-sm">Scripts Prontos</p>
            </div>
            <div className="flex flex-col gap-2">
              <Script label="Primeiro contato — proprietário ausente" canal="WhatsApp" texto={scriptVeraneioPrimeiro} />
              <Script label="Abordagem pré-temporada (outubro/novembro)" canal="WhatsApp" texto={scriptTemporada} />
              <Script label="Follow-up sem resposta (48h)" canal="WhatsApp" texto={scriptFollowUp} />
            </div>
          </div>
        </div>

        {/* Condomínios Riviera */}
        <div className="bg-white rounded-2xl border border-gray-100 mb-4 overflow-hidden">
          <div className="bg-forest-700 px-6 py-4 flex items-center gap-3">
            <div className="bg-gold-500/20 p-1.5 rounded-lg shrink-0">
              <Building2 size={16} className="text-gold-500" />
            </div>
            <div className="flex-1">
              <p className="text-gold-400 text-xs font-bold uppercase tracking-widest">Alvo 2 — Expansão</p>
              <p className="text-white font-bold text-lg leading-tight">Condomínios Fechados — Riviera de São Lourenço</p>
            </div>
            <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">ALTO TICKET</span>
          </div>
          <div className="p-6">
            <p className="text-gray-600 text-sm mb-5 bg-amber-50 border-l-4 border-amber-400 px-4 py-3 rounded-r-xl">
              <strong className="text-amber-800">Vantagem:</strong> Condomínios da Riviera têm administradoras que buscam fornecedores locais confiáveis. Nenhuma empresa de jardinagem domina digitalmente Bertioga. Quem aparecer primeiro no Google captura o mercado inteiro antes que qualquer concorrente perceba.
            </p>
            <EtapasList etapas={etapasCondominio} />
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={14} className="text-forest-600" />
              <p className="font-bold text-forest-900 text-sm">Scripts Prontos</p>
            </div>
            <div className="flex flex-col gap-2">
              <Script label="Primeiro contato — síndico" canal="WhatsApp" texto={scriptCondominioNovo} />
              <Script label="Follow-up sem resposta (48h)" canal="WhatsApp" texto={scriptFollowUp} />
            </div>
            <div className="mt-4 bg-forest-50 border border-forest-100 rounded-2xl p-4 flex items-start gap-2">
              <Phone size={14} className="text-forest-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-forest-900 font-semibold text-sm mb-1">Script na portaria</p>
                <p className="text-gray-600 text-sm italic">
                  "Bom dia! Aqui é o Aleandro, da Lobo Jardinagem de Bertioga. Gostaria de falar com o síndico ou responsável pelas áreas verdes do condomínio. Poderia me passar o contato?"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Imobiliárias */}
        <div className="bg-white rounded-2xl border border-gray-100 mb-6 overflow-hidden">
          <div className="bg-forest-600 px-6 py-4 flex items-center gap-3">
            <div className="bg-gold-500/20 p-1.5 rounded-lg shrink-0">
              <MapPin size={16} className="text-gold-500" />
            </div>
            <div className="flex-1">
              <p className="text-gold-400 text-xs font-bold uppercase tracking-widest">Alvo 3 — Canal de Indicação</p>
              <p className="text-white font-bold text-lg leading-tight">Imobiliárias e Gestores de Propriedades — Bertioga</p>
            </div>
            <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30">MÉDIO PRAZO</span>
          </div>
          <div className="p-6">
            <p className="text-gray-600 text-sm mb-5 bg-blue-50 border-l-4 border-blue-400 px-4 py-3 rounded-r-xl">
              <strong className="text-blue-800">Oportunidade:</strong> Imobiliárias que administram propriedades para locação precisam que o jardim esteja sempre apresentável para fotos e recebimento de hóspedes. Uma parceria com 3 imobiliárias pode trazer 15–20 propriedades novas sem prospecção direta.
            </p>
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={14} className="text-forest-600" />
              <p className="font-bold text-forest-900 text-sm">Script Pronto</p>
            </div>
            <div className="flex flex-col gap-2">
              <Script label="Primeiro contato — imobiliária / gestora" canal="WhatsApp" texto={scriptImobiliaria} />
            </div>
          </div>
        </div>

        {/* Princípios */}
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { icon: Shield,      title: 'A ausência é o argumento',  desc: '"Você não está em Bertioga — eu estou. E envio foto mensal para provar." Essa frase fecha mais contrato que qualquer desconto.' },
            { icon: Send,        title: 'Villagio em toda abertura', desc: 'É a âncora de credibilidade. Um cliente de alto padrão ativo elimina ceticismo antes que ele apareça.' },
            { icon: CheckCircle, title: 'Temporada como gatilho',    desc: 'Outubro e novembro são os meses de maior conversão — proprietários querendo a propriedade pronta para o verão.' },
          ].map((p, i) => {
            const Icon = p.icon
            return (
              <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 flex gap-3">
                <Icon size={16} className="text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-forest-900 text-sm mb-0.5">{p.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
