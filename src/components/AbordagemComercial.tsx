import { useState } from 'react'
import { MessageSquare, Phone, Send, ChevronDown, ChevronUp, Smartphone, Shield, User, Building2, CheckCircle, AlertTriangle, Copy, Check, Home, MapPin, RefreshCw } from 'lucide-react'

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

const etapasResidencia = [
  { titulo: 'Pesquisa prévia', prazo: '10 min antes', desc: 'Google Maps para ver o bairro, tipo de imóvel, tamanho estimado do jardim. Imóveis de alto padrão em Gaspar e Blumenau tendem a ter proprietários que valorizam qualidade.' },
  { titulo: 'Identificar o decisor', prazo: 'Primeiro contato', desc: 'Proprietário, cônjuge ou gestor do imóvel. Pergunta: "Vocês já têm alguém cuidando do jardim?" — abre a conversa sobre a solução atual e o que está faltando.', detalhe: '"Bom dia! Sou o Guilherme, da Real Jardinagem de Gaspar. Estou visitando a região para oferecer manutenção de jardim com proposta profissional e contrato. Você seria o responsável pelo imóvel?"' },
  { titulo: 'WhatsApp com proposta profissional', prazo: 'No mesmo dia', desc: 'Tom: você entrega qualidade com profissionalismo — contrato, proposta formal, relatório fotográfico. Usar Gerador Selva para a proposta.' },
  { titulo: 'Proposta com diferencial', prazo: '24h após contato', desc: 'Diferencial: proposta profissional com contrato e relatório fotográfico. Proprietário vê que você é empresa — não autônomo avulso. Usar Gerador Selva.' },
  { titulo: 'Follow-up pós-proposta', prazo: '48–72h depois', desc: 'Máximo 2 follow-ups. Após isso, retomar em 30 dias com nova abordagem.' },
]

const etapasEmpresa = [
  { titulo: 'Pesquisa prévia', prazo: '15 min antes', desc: 'Google Maps para ver as áreas verdes da empresa. LinkedIn ou site para identificar o responsável por facilities, compras ou operações.' },
  { titulo: 'Contato com o responsável', prazo: 'Primeiro contato', desc: 'Recepção, e-mail corporativo ou LinkedIn. Pedir o contato de quem cuida de facilities ou manutenção predial.', detalhe: '"Bom dia! Aqui é a Real Jardinagem de Gaspar. Gostaria de falar com o responsável pela manutenção das áreas externas da empresa. Como posso ser direcionado?"' },
  { titulo: 'WhatsApp ou e-mail consultivo', prazo: 'No mesmo dia', desc: 'Tom: empresa que cuida do jardim da empresa. Jardim bem cuidado é imagem corporativa. Relatório fotográfico mensal como diferencial.' },
  { titulo: 'Visita + proposta', prazo: 'Na semana', desc: 'Visita técnica gratuita + proposta com cronograma de manutenção. Usar Gerador Selva. Enfatizar que você tem contrato, CNPJ, nota fiscal — requisito para empresa contratar serviço.' },
  { titulo: 'Follow-up', prazo: '48–72h depois', desc: 'Máximo 2 follow-ups. Retomar em 30 dias.' },
]

const etapasReajuste = [
  { titulo: 'Escolher o cliente certo para começar', prazo: 'Agora', desc: 'Comece pelo cliente que mais demonstra satisfação — o que elogia o trabalho, indica para amigos, nunca reclama. Esse é o mais fácil de aceitar reajuste.' },
  { titulo: 'Preparar a justificativa', prazo: 'Antes do contato', desc: 'Não peça desculpa pelo reajuste. Apresente como atualização de mercado: custos de combustível, equipamentos, mão de obra. Você continua entregando a mesma qualidade.' },
  { titulo: 'Conversa por WhatsApp ou pessoalmente', prazo: 'Com 30 dias de antecedência', desc: 'Tom firme e respeitoso. Não negocie antes de receber resposta. Espere a reação.', detalhe: 'Use o script de reajuste abaixo. Nunca ofereça desconto antes de o cliente pedir.' },
  { titulo: 'Aguardar resposta', prazo: '3-5 dias', desc: 'Se aceitar: confirme a nova data de vigência. Se pedir desconto: avalie se vale manter — cliente que aceita reajuste sem questionamento é seu ICP. Se perder o cliente: era um cliente abaixo do seu preço de mercado.' },
]

const scriptResidenciaPrimeiro = `Bom dia, [NOME]! Tudo bem?

Aqui é o Guilherme, da Real Jardinagem — empresa de manutenção e paisagismo de Gaspar/SC.

Cuido de jardins em Gaspar e Blumenau com contrato mensal, proposta profissional e relatório fotográfico. O proprietário acompanha o trabalho sem precisar estar no imóvel.

Posso enviar uma proposta personalizada para o seu jardim?

Guilherme | Real Jardinagem
📍 Gaspar/SC
📱 [seu número]`

const scriptEmpresaNovo = `Bom dia! Tudo bem?

Aqui é o Guilherme, da Real Jardinagem — empresa de jardinagem e paisagismo especializada em Gaspar e Blumenau.

Gostaria de apresentar nossa solução de manutenção para as áreas verdes da [NOME DA EMPRESA]. Trabalhamos com cronograma fixo, proposta formal, contrato e relatório fotográfico mensal — equipe e gestão ficam informados sem precisar acompanhar.

Posso agendar uma visita técnica gratuita para apresentar o trabalho?

Guilherme | Real Jardinagem
📱 [seu número]`

const scriptReajuste = `Bom dia, [NOME]! Tudo bem?

Quero falar com você sobre uma atualização no valor do serviço.

Trabalhamos juntos há [X meses/anos] e, como você sabe, entrego qualidade e consistência. Por conta do aumento nos custos de operação (combustível, equipamentos, mão de obra), preciso ajustar o valor do serviço para R$ [NOVO VALOR] a partir de [DATA].

O serviço continua exatamente o mesmo — manutenção mensal com a mesma equipe e o mesmo padrão.

Qualquer dúvida estou à disposição.

Guilherme | Real Jardinagem`

const scriptImobiliaria = `Bom dia! Tudo bem?

Aqui é o Guilherme, da Real Jardinagem de Gaspar/SC.

Trabalho com proprietários de residências e imóveis em Gaspar e Blumenau e gostaria de apresentar uma parceria para gestão de jardins das propriedades que vocês administram.

Proprietários que precisam de manutenção constante e relatório fotográfico — é exatamente o que entrego. Proposta profissional, contrato e nota fiscal.

Posso enviar um portfólio?

Guilherme | Real Jardinagem
📱 [seu número]`

const scriptFollowUp = `Bom dia!

Passando para retomar o contato sobre a manutenção do jardim.

Tenho uma proposta com contrato mensal e relatório fotográfico — profissionalismo que faz diferença na hora de contratar.

Podemos marcar uma visita de 20 minutos sem compromisso?

Guilherme | Real Jardinagem`

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
              <h3 className="font-bold text-lg mb-2">Você vende profissionalismo — não jardinagem</h3>
              <p className="text-white/70 text-sm mb-4">9/10 dos seus clientes nunca questionam o preço. Isso não é sorte — é porque você entrega resultado. O problema é que você cobra menos do que vale. Toda abordagem comercial nova deve começar com proposta profissional, contrato e relatório fotográfico — diferencial que autônomos não têm.</p>
              <div className="grid md:grid-cols-2 gap-3 mt-3">
                <div className="bg-red-500/15 border border-red-400/30 rounded-xl p-3">
                  <p className="text-red-300 text-xs font-bold uppercase tracking-wide mb-1">Não fazer</p>
                  <p className="text-white/70 text-sm">"Oi, faço jardinagem em Gaspar, queria saber se precisa de serviço..."</p>
                </div>
                <div className="bg-green-500/15 border border-green-400/30 rounded-xl p-3">
                  <p className="text-green-300 text-xs font-bold uppercase tracking-wide mb-1">Fazer</p>
                  <p className="text-white/70 text-sm">"Bom dia. Sou da Real Jardinagem de Gaspar. Trabalhamos com contrato mensal, proposta formal e relatório fotográfico. Posso enviar uma proposta para o seu jardim?"</p>
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
              <p className="text-gray-500 text-xs">Configure antes de qualquer contato — empresa e proprietário pesquisam o número antes de responder</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#F4F6F0] rounded-xl p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-forest-700 mb-2">Configuração do número</p>
              <ul className="flex flex-col gap-1.5">
                {[
                  { icon: Smartphone,    text: 'Chip separado ou segundo número de app' },
                  { icon: User,          text: 'Nome: "Guilherme | Real Jardinagem"' },
                  { icon: Building2,     text: 'Foto: logo da empresa ou foto em serviço' },
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
                <strong>Por quê?</strong> Empresa ou proprietário que salva o contato precisa ver "Real Jardinagem" — não um número desconhecido. Reforça empresa, não autônomo. Gaspar e Blumenau são mercados onde a referência e a imagem profissional fecham contratos.
              </p>
            </div>
          </div>
        </div>

        {/* Reajuste — URGENTE */}
        <div className="bg-white rounded-2xl border border-gray-100 mb-4 overflow-hidden">
          <div className="bg-amber-600 px-6 py-4 flex items-center gap-3">
            <div className="bg-white/20 p-1.5 rounded-lg shrink-0">
              <RefreshCw size={16} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white/80 text-xs font-bold uppercase tracking-widest">Ação Imediata — Mais Impacto</p>
              <p className="text-white font-bold text-lg leading-tight">Script de Reajuste — Carteira Atual</p>
            </div>
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">9/10 SEM RECLAMAR = COBRAR BARATO</span>
          </div>
          <div className="p-6">
            <p className="text-gray-600 text-sm mb-5 bg-amber-50 border-l-4 border-amber-400 px-4 py-3 rounded-r-xl">
              <strong className="text-amber-800">Urgência:</strong> 9 em 10 clientes nunca questionam o preço. Isso significa que você pode reajustar agora sem perder quase ninguém. Cada mês sem reajuste é dinheiro deixado na mesa. Comece pelo cliente mais satisfeito — o que mais recomenda você.
            </p>
            <EtapasList etapas={etapasReajuste} />
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={14} className="text-forest-600" />
              <p className="font-bold text-forest-900 text-sm">Script Pronto</p>
            </div>
            <div className="flex flex-col gap-2">
              <Script label="Reajuste de preço — cliente atual satisfeito" canal="WhatsApp" texto={scriptReajuste} />
            </div>
          </div>
        </div>

        {/* Residências */}
        <div className="bg-white rounded-2xl border border-gray-100 mb-4 overflow-hidden">
          <div className="bg-forest-800 px-6 py-4 flex items-center gap-3">
            <div className="bg-gold-500/20 p-1.5 rounded-lg shrink-0">
              <Home size={16} className="text-gold-500" />
            </div>
            <div className="flex-1">
              <p className="text-gold-400 text-xs font-bold uppercase tracking-widest">Alvo 1 — Expansão Imediata</p>
              <p className="text-white font-bold text-lg leading-tight">Residências Premium — Gaspar e Blumenau</p>
            </div>
            <span className="bg-gold-500/20 text-gold-400 text-xs font-bold px-3 py-1 rounded-full border border-gold-500/30">PROPOSTA + CONTRATO</span>
          </div>
          <div className="p-6">
            <p className="text-gray-600 text-sm mb-5 bg-blue-50 border-l-4 border-blue-400 px-4 py-3 rounded-r-xl">
              <strong className="text-blue-800">Contexto:</strong> Gaspar e Blumenau têm bairros de alto padrão com proprietários que valorizam profissionalismo acima do preço. Nenhum concorrente digital domina "jardinagem Gaspar". Quem aparecer primeiro no Google e chegar com proposta profissional captura esses clientes.
            </p>
            <EtapasList etapas={etapasResidencia} />
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={14} className="text-forest-600" />
              <p className="font-bold text-forest-900 text-sm">Scripts Prontos</p>
            </div>
            <div className="flex flex-col gap-2">
              <Script label="Primeiro contato — proprietário residencial" canal="WhatsApp" texto={scriptResidenciaPrimeiro} />
              <Script label="Follow-up sem resposta (48h)" canal="WhatsApp" texto={scriptFollowUp} />
            </div>
          </div>
        </div>

        {/* Empresas */}
        <div className="bg-white rounded-2xl border border-gray-100 mb-4 overflow-hidden">
          <div className="bg-forest-700 px-6 py-4 flex items-center gap-3">
            <div className="bg-gold-500/20 p-1.5 rounded-lg shrink-0">
              <Building2 size={16} className="text-gold-500" />
            </div>
            <div className="flex-1">
              <p className="text-gold-400 text-xs font-bold uppercase tracking-widest">Alvo 2 — Ticket Alto</p>
              <p className="text-white font-bold text-lg leading-tight">Empresas, Condomínios e Sedes — Gaspar e Blumenau</p>
            </div>
            <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">CONTRATO B2B</span>
          </div>
          <div className="p-6">
            <p className="text-gray-600 text-sm mb-5 bg-amber-50 border-l-4 border-amber-400 px-4 py-3 rounded-r-xl">
              <strong className="text-amber-800">Vantagem:</strong> Empresas em Gaspar e Blumenau precisam de jardinagem com nota fiscal e contrato — requisito para PJ contratar serviço. Você tendo CNPJ e proposta profissional já elimina 80% da concorrência de autônomos.
            </p>
            <EtapasList etapas={etapasEmpresa} />
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={14} className="text-forest-600" />
              <p className="font-bold text-forest-900 text-sm">Scripts Prontos</p>
            </div>
            <div className="flex flex-col gap-2">
              <Script label="Primeiro contato — empresa / condomínio" canal="WhatsApp" texto={scriptEmpresaNovo} />
              <Script label="Follow-up sem resposta (48h)" canal="WhatsApp" texto={scriptFollowUp} />
            </div>
            <div className="mt-4 bg-forest-50 border border-forest-100 rounded-2xl p-4 flex items-start gap-2">
              <Phone size={14} className="text-forest-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-forest-900 font-semibold text-sm mb-1">Script na recepção</p>
                <p className="text-gray-600 text-sm italic">
                  "Bom dia! Aqui é o Guilherme, da Real Jardinagem de Gaspar. Gostaria de falar com o responsável pela manutenção das áreas externas da empresa. Poderia me passar o contato?"
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
              <p className="text-white font-bold text-lg leading-tight">Imobiliárias e Gestores de Propriedades — Gaspar e Blumenau</p>
            </div>
            <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30">MÉDIO PRAZO</span>
          </div>
          <div className="p-6">
            <p className="text-gray-600 text-sm mb-5 bg-blue-50 border-l-4 border-blue-400 px-4 py-3 rounded-r-xl">
              <strong className="text-blue-800">Oportunidade:</strong> Imobiliárias que administram propriedades em Gaspar e Blumenau precisam que o jardim esteja sempre apresentável para fotos e recebimento de clientes. Uma parceria com 2–3 imobiliárias pode trazer 10–15 contratos novos sem prospecção direta.
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
            { icon: Shield,      title: 'Proposta profissional fecha',   desc: '"Tenho contrato, proposta e relatório fotográfico" elimina 80% dos concorrentes autônomos antes de qualquer negociação de preço.' },
            { icon: Send,        title: 'Reajuste primeiro, depois expande', desc: 'A carteira atual já paga mais — só precisa cobrar o preço certo. Reajuste agora, depois busca clientes novos no mesmo padrão.' },
            { icon: CheckCircle, title: 'GMB é o vendedor que nunca dorme', desc: 'Com zero concorrência digital em Gaspar, um perfil GMB otimizado traz leads sem prospecção ativa — e filtra quem busca qualidade, não preço.' },
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
