import { Smartphone, Target, DollarSign, ExternalLink, ArrowRight } from 'lucide-react'

const movimentos = [
  {
    icon: Smartphone,
    badge: 'URGENTE — SEM. 1',
    badgeColor: 'bg-red-100 text-red-700',
    title: 'GMB Dominando Bertioga',
    impact: 'Primeira posição em "jardinagem Bertioga"',
    desc: 'Você já tem o perfil no Google Maps — mas está incompleto. Sem descrição com palavras-chave, sem fotos do Villagio e sem posts semanais, você não aparece quando proprietários da Riviera buscam "jardinagem Bertioga".',
    steps: [
      'Otimizar GMB: descrição com "jardinagem Bertioga", "Riviera de São Lourenço", "casa de veraneio" e "litoral SP"',
      'Subir 10 fotos reais — Villagio como case âncora, antes/depois, equipe em serviço',
      'Primeiro Google Post: "Manutenção de jardim — Bertioga/SP. Verão chegando — vagas disponíveis."',
    ],
  },
  {
    icon: DollarSign,
    badge: 'PRIORIDADE — SEM. 2-3',
    badgeColor: 'bg-orange-100 text-orange-700',
    title: 'Precificação Técnica',
    impact: 'Parar de cobrar por feeling',
    desc: 'A trava central é preço por intuição: cobro o que acho que o cliente vai aceitar. Isso faz aceitar contratos que não pagam a operação. Com o Villagio como referência, você já sabe que R$13k de lucro é possível — agora é sistematizar.',
    steps: [
      'Calcular custo real por visita: Daniel (diária), combustível, equipamento amortizado, tempo',
      'Definir ticket mínimo por tamanho de jardim: pequeno (até 200m²), médio (200-600m²), grande (600m²+)',
      'Usar Gerador de Propostas Selva para toda proposta nova — nunca mais "quanto você quer pagar?"',
    ],
  },
  {
    icon: Target,
    badge: 'PARALELO — ATÉ 12/06',
    badgeColor: 'bg-yellow-100 text-yellow-700',
    title: 'Riviera de São Lourenço como Território',
    impact: 'Alto ticket — proprietários ausentes',
    desc: 'A Riviera tem centenas de casas de veraneio com proprietários que passam a maior parte do ano fora. Esses clientes querem um serviço confiável, com relatório fotográfico, que funcione sem presença deles. Exatamente o que você entrega.',
    steps: [
      'Listar 20 casas de veraneio da Riviera: Google Maps + indicação dos clientes atuais',
      'Script de abordagem: "O jardim da sua casa em Bertioga precisa de alguém de confiança quando você não está" — ênfase na ausência',
      'Proposta com relatório fotográfico mensal: diferencial que justifica R$3-6k/mês por propriedade',
    ],
  },
]

const projecoes = [
  { situacao: 'Hoje (mai/2026)',                    receita: 'R$ 7.000–15.000',  variacao: '—',      highlight: false },
  { situacao: 'Após GMB otimizado (leads orgânicos)', receita: 'R$ 15.000–20.000', variacao: '+100%',  highlight: false },
  { situacao: '+ 2 contratos Riviera (R$4k/casa)',   receita: 'R$ 23.000–28.000', variacao: '+150%',  highlight: false },
  { situacao: '+ Precificação técnica sistemática',  receita: 'R$ 32.000–38.000', variacao: '+220%',  highlight: false },
  { situacao: 'Meta 12 meses — Selva Premium',       receita: 'R$ 50.000',        variacao: '+400%',  highlight: true  },
  { situacao: 'Empresa estruturada (escala)',        receita: 'R$ 50.000+',       variacao: '+400%+', highlight: false },
]

export default function PlanoAcao() {
  return (
    <section id="plano" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Roteiro 30–90 dias</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Plano de Ação</h2>
        </div>

        <div className="bg-forest-800 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-1">Sessão Coletiva — 14/05/2026</p>
            <h3 className="text-white font-bold text-xl">Três movimentos para R$ 50.000/mês — GMB, precificação e Riviera</h3>
          </div>
          <a href="https://drive.google.com/drive/folders/1gQIrHV7QTdkOdgllt9EIucidBwnGGjba"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-gold-500 hover:bg-gold-400 text-forest-900 font-bold px-4 py-2 rounded-xl text-sm transition-colors shrink-0">
            Drive Lobo Jardinagem <ExternalLink size={12} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {movimentos.map((m, i) => {
            const Icon = m.icon
            return (
              <div key={i} className="bg-[#F4F6F0] rounded-2xl p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="bg-forest-800 p-2 rounded-xl">
                    <Icon size={16} className="text-gold-500" />
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${m.badgeColor}`}>{m.badge}</span>
                </div>
                <div>
                  <h3 className="font-bold text-forest-900">{m.title}</h3>
                  <p className="text-gold-600 font-bold text-lg mt-0.5">{m.impact}</p>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                <ul className="flex flex-col gap-1.5">
                  {m.steps.map((s, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <ArrowRight size={13} className="text-forest-500 shrink-0 mt-0.5" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-forest-800 text-white">
                <th className="text-left px-5 py-3 font-semibold rounded-tl-2xl">Situação</th>
                <th className="text-right px-5 py-3 font-semibold">Receita Mensal</th>
                <th className="text-right px-5 py-3 font-semibold rounded-tr-2xl">Variação</th>
              </tr>
            </thead>
            <tbody>
              {projecoes.map((p, i) => (
                <tr key={i} className={`border-t border-gray-100 ${p.highlight ? 'bg-gold-100' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className={`px-5 py-3 ${p.highlight ? 'font-bold text-forest-900' : 'text-gray-600'}`}>{p.situacao}</td>
                  <td className={`px-5 py-3 text-right font-bold ${p.highlight ? 'text-forest-800 text-base' : 'text-gray-800'}`}>{p.receita}</td>
                  <td className={`px-5 py-3 text-right font-semibold ${p.highlight ? 'text-forest-700' : 'text-gray-400'}`}>{p.variacao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
