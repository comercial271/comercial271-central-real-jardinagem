import { Smartphone, Target, DollarSign, ExternalLink, ArrowRight } from 'lucide-react'

const movimentos = [
  {
    icon: Target,
    badge: 'URGENTE — SEM. 1',
    badgeColor: 'bg-red-100 text-red-700',
    title: 'Planilha de Custos Operacionais',
    impact: 'Parar de cobrar por feeling',
    desc: 'Você tem clientes que nunca questionam o preço — isso é um sinal de que está cobrando abaixo do que o mercado aceita. A Fiorino tem custo real de depreciação, combustível e manutenção que precisa entrar no preço. Sem isso, trabalho vira prejuízo disfarçado de lucro.',
    steps: [
      'Calcular custo real por dia: Fiorino (combustível + depreciação), equipamentos amortizados, horas trabalhadas',
      'Definir ticket mínimo por tipo: manutenção mensal (recorrente), limpeza pontual, implantação',
      'Usar Gerador de Propostas Selva para toda proposta nova — nunca mais "cobrar no feeling"',
    ],
  },
  {
    icon: Smartphone,
    badge: 'PRIORIDADE — SEM. 2-3',
    badgeColor: 'bg-orange-100 text-orange-700',
    title: 'Ativação Digital — GMB + @realjardinag',
    impact: 'Zero concorrência digital em Gaspar',
    desc: 'O Vale Europeu tem alta renda e nenhum jardineiro com presença digital forte. Criar o Google Meu Negócio agora é cravar uma bandeira antes de qualquer concorrente. O @realjardinag parado é oportunidade perdida toda semana.',
    steps: [
      'Criar GMB em Gaspar: "jardinagem Gaspar", "jardineiro Blumenau", "manutenção de jardim Vale Europeu"',
      'Reativar @realjardinag com Reel de antes/depois — Marco Zero: "Comecei com uma Fiorino e muito trabalho"',
      'Meta: 5 avaliações GMB no primeiro mês + 4 posts/mês no Instagram',
    ],
  },
  {
    icon: DollarSign,
    badge: 'PARALELO — ATÉ 17/06',
    badgeColor: 'bg-yellow-100 text-yellow-700',
    title: 'Contratos + MEI → ME',
    impact: 'Profissionalizar a operação',
    desc: 'Receber no PIX pessoal e trabalhar sem contrato são os dois maiores riscos de uma operação que está crescendo. Com o faturamento chegando em R$15k/mês, o MEI deixa de ser suficiente — e o contrato é o que protege você quando um cliente tenta não pagar.',
    steps: [
      'Assinar modelo de contrato Selva com os próximos 2 clientes novos',
      'Abrir conta PJ separada para receber pagamentos de clientes',
      'Simular tributação MEI vs Simples Nacional com Planilha Margem quando atingir R$15k/mês',
    ],
  },
]

const projecoes = [
  { situacao: 'Hoje (mai/2026)',                            receita: 'R$ 3.000–7.000',   variacao: '—',      highlight: false },
  { situacao: 'Após precificação técnica (sem. 1-2)',       receita: 'R$ 7.000–10.000',  variacao: '+70%',   highlight: false },
  { situacao: '+ GMB Gaspar ativo (leads orgânicos)',       receita: 'R$ 10.000–13.000', variacao: '+130%',  highlight: false },
  { situacao: '+ 3 contratos fechados — prospecção ativa',  receita: 'R$ 13.000–16.000', variacao: '+180%',  highlight: false },
  { situacao: 'Meta 6 meses — Selva Premium',               receita: 'R$ 15.000',        variacao: '+200%',  highlight: true  },
  { situacao: 'Empresa estruturada (MEI → ME)',             receita: 'R$ 15.000+',       variacao: '+200%+', highlight: false },
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
            <p className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-1">Sessão Individual — 27/05/2026</p>
            <h3 className="text-white font-bold text-xl">Quatro módulos para R$ 15.000/mês — precificação, contratos, digital e MEI→ME</h3>
          </div>
          <a href="https://drive.google.com/drive/folders/1V1B9aWuZkuRV8EoGT1rfYmcornS4fDew"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-gold-500 hover:bg-gold-400 text-forest-900 font-bold px-4 py-2 rounded-xl text-sm transition-colors shrink-0">
            Drive Real Jardinagem <ExternalLink size={12} />
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
