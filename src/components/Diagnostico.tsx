import { ClipboardList, BarChart2, Video, ExternalLink, Brain, MapPin } from 'lucide-react'

const cards = [
  {
    icon: ClipboardList,
    badge: 'FORMULÁRIO ✅',
    badgeColor: 'bg-green-100 text-green-700',
    title: 'Diagnóstico 360° — Lobo Jardinagem',
    desc: 'Bertioga/SP, 1-3 anos no ramo, faturamento R$7-15k/mês. Case âncora: Villagio (lucro R$13k). Carteira 8/10 — já cortou clientes problemáticos. Presença digital incipiente (Google Maps + site), mas Instagram sem posts.',
    link: { label: 'Abrir no Drive', href: 'https://drive.google.com/drive/folders/1gQIrHV7QTdkOdgllt9EIucidBwnGGjba' },
  },
  {
    icon: Video,
    badge: 'SESSÃO 1 — 14/05 (COLETIVA)',
    badgeColor: 'bg-gold-100 text-yellow-700',
    title: 'Sessão Coletiva — Mentalidade Estratégica',
    desc: 'Modelo mental de empresa, precificação com margem real, gerador de propostas com IA, posicionamento B2B. Participação com André Krieger e outros membros da turma Selva Premium.',
    link: { label: 'Ver no Drive', href: 'https://drive.google.com/drive/folders/1gQIrHV7QTdkOdgllt9EIucidBwnGGjba' },
  },
  {
    icon: MapPin,
    badge: 'MERCADO ✅',
    badgeColor: 'bg-blue-100 text-blue-700',
    title: 'Riviera de São Lourenço — Janela Aberta',
    desc: 'A Riviera tem imóveis de R$1M–R$10M+ com proprietários ausentes na maior parte do ano. Nenhum concorrente domina o digital em Bertioga. Quem aparecer primeiro no Google captura o mercado inteiro.',
    link: { label: 'Ver estratégia', href: '#plano' },
  },
  {
    icon: BarChart2,
    badge: 'SITE ATIVO ✅',
    badgeColor: 'bg-purple-100 text-purple-700',
    title: 'Presença Digital Existente',
    desc: 'Google Maps ativo, site publicado, veículo com logo — base melhor que a maioria dos membros Selva na entrada. Próximo passo: otimizar GMB para aparecer em "jardinagem Bertioga" e "paisagismo Riviera".',
    link: { label: 'Abrir GMB', href: 'https://business.google.com' },
  },
]

export default function Diagnostico() {
  return (
    <section id="diagnostico" className="py-20 bg-[#F4F6F0]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Radiografia do negócio</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Meu Diagnóstico</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {cards.map((c, i) => {
            const Icon = c.icon
            const isInternal = c.link.href.startsWith('#')
            return (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="bg-forest-100 p-2 rounded-xl shrink-0">
                    <Icon size={18} className="text-forest-700" />
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${c.badgeColor}`}>{c.badge}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-forest-900 text-sm mb-1">{c.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
                </div>
                {isInternal ? (
                  <a href={c.link.href}
                    className="inline-flex items-center gap-1.5 text-forest-700 hover:text-forest-900 text-sm font-semibold transition-colors w-fit">
                    {c.link.label}
                  </a>
                ) : (
                  <a href={c.link.href} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-forest-700 hover:text-forest-900 text-sm font-semibold transition-colors w-fit">
                    {c.link.label} <ExternalLink size={12} />
                  </a>
                )}
              </div>
            )
          })}
        </div>

        <div className="bg-forest-800 rounded-2xl p-6 border-l-4 border-gold-500">
          <div className="flex items-start gap-3">
            <Brain size={20} className="text-gold-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-bold mb-1">Trava Central Identificada</p>
              <p className="text-white/80 text-sm leading-relaxed">
                <span className="text-gold-500 font-semibold">Tem o case (Villagio, R$13k), tem o mercado (Riviera de São Lourenço) e tem a estrutura inicial — mas cobra por feeling e não sabe quanto lucra por cliente.</span> Sem controle financeiro, aceitar o contrato errado é mais perigoso que não aceitar nenhum. O próximo passo não é prospectar mais — é saber o preço certo para cada jardim.
              </p>
              <p className="text-gold-400 text-sm italic mt-3">
                Bertioga não tem nenhuma empresa de jardinagem dominando o digital. Você tem Google Maps — mas o perfil não aparece em "jardinagem Bertioga" ainda. Três ajustes no GMB e você está na primeira posição antes que qualquer concorrente perceba.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
