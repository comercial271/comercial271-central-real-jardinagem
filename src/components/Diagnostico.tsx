import { ClipboardList, BarChart2, Video, ExternalLink, Brain, MapPin } from 'lucide-react'

const cards = [
  {
    icon: ClipboardList,
    badge: 'FORMULÁRIO ✅',
    badgeColor: 'bg-green-100 text-green-700',
    title: 'Diagnóstico 360° — Real Jardinagem',
    desc: 'Gaspar/SC, < 1 ano no ramo, faturamento R$3-7k/mês. Fiorino comprada com esforço próprio. Carteira 9/10 — clientes nunca questionam o preço. Presença digital parada (@realjardinag inativo).',
    link: { label: 'Abrir no Drive', href: 'https://docs.google.com/document/d/1naIxd0sAyirHxCT36U7N26lqeheAFfUSfHSnXqjgYos/edit' },
  },
  {
    icon: Video,
    badge: 'SESSÃO 1 — 27/05 (INDIVIDUAL)',
    badgeColor: 'bg-gold-100 text-yellow-700',
    title: 'Sessão Individual — Precificação, contratos e digital',
    desc: 'Planilha de custos operacionais, preço mínimo por tipo de serviço, GMB Gaspar, reativação @realjardinag, clareza sobre transição MEI→ME.',
    link: { label: 'Ver no Drive', href: 'https://drive.google.com/drive/folders/1V1B9aWuZkuRV8EoGT1rfYmcornS4fDew' },
  },
  {
    icon: MapPin,
    badge: 'MERCADO ✅',
    badgeColor: 'bg-blue-100 text-blue-700',
    title: 'Gaspar e Blumenau — Janela Aberta',
    desc: 'O Vale Europeu concentra alta renda, área verde e uma classe média-alta sem jardineiro profissional dominante. Nenhum concorrente tem presença digital forte em Gaspar. Quem aparecer primeiro no Google captura o mercado.',
    link: { label: 'Ver estratégia', href: '#plano' },
  },
  {
    icon: BarChart2,
    badge: 'CARTEIRA ÂNCORA ✅',
    badgeColor: 'bg-purple-100 text-purple-700',
    title: 'Clientes que Nunca Reclamam de Preço',
    desc: '9 de 10 clientes pagam sem questionar — sinal claro de que está cobrando abaixo do que o mercado aceita. Essa carteira é a maior prova de que o produto é bom. Falta só o preço certo.',
    link: { label: 'Ver plano', href: '#plano' },
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
                <span className="text-gold-500 font-semibold">Tem clientes que nunca reclamam de preço e uma Fiorino comprada com esforço próprio — mas ainda cobra por intuição.</span> Isso significa que trabalha mais do que deveria para ganhar menos do que pode. A conquista maior não é encontrar mais clientes — é cobrar o que eles já aceitariam pagar.
              </p>
              <p className="text-gold-400 text-sm italic mt-3">
                Gaspar não tem nenhum jardineiro com presença digital forte. O @realjardinag parado é oportunidade perdida toda semana. Criar o GMB agora é cravar uma bandeira antes de qualquer concorrente perceber.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
