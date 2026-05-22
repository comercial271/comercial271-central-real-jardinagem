import { TrendingUp, Target, DollarSign, Clock, Award, MapPin } from 'lucide-react'

const metrics = [
  { value: 'Villagio',     label: 'Case âncora',       sub: 'Paisagismo — lucro R$13k realizado',           icon: Award },
  { value: 'R$ 50.000',   label: 'Meta 12 meses',     sub: 'Crescimento: +400% no faturamento',            icon: TrendingUp },
  { value: 'R$ 7–15k',    label: 'Faturamento atual', sub: 'Base sólida com clientes recorrentes',         icon: DollarSign },
  { value: '1 Sessão',    label: 'Concluída',         sub: 'Coletiva 14/05/2026 — Selva Premium',          icon: Clock },
  { value: '1–3 anos',    label: 'No mercado',        sub: 'Crescimento acelerado desde o início',         icon: Clock },
  { value: 'Bertioga/SP', label: 'Posicionamento',    sub: 'Riviera de São Lourenço — alto padrão',        icon: MapPin },
]

export default function Hero() {
  return (
    <section id="inicio" className="pt-16 bg-gradient-to-br from-forest-800 to-forest-900 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block bg-gold-500 text-forest-900 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
            SELVA PREMIUM — MEMBRO ATIVO
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
            Central Lobo Jardinagem
          </h1>
          <p className="text-white/70 text-lg mb-2">Aleandro Lobo — Bertioga / SP</p>
          <p className="text-gold-500 text-xl italic font-medium mb-6">
            "Villagio fechado, lucro de R$13k.<br />Agora é GMB, precificação técnica e Riviera como território."
          </p>
          <p className="text-white/60 text-sm leading-relaxed max-w-lg">
            Aqui está tudo que foi construído na sua mentoria — diagnóstico, plano de ação,
            documentos, estratégias e o arsenal para você dominar o mercado premium de Bertioga. Use como referência diária.
          </p>
          <div className="mt-8 flex items-center gap-2">
            <Award size={16} className="text-gold-500" />
            <span className="text-white/50 text-xs">Mentoria: Jean Francis | Sessão Coletiva: 14/05/2026 | Check-in: 12/06/2026</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {metrics.map((m, i) => (
            <div key={i} className="bg-forest-700/50 border border-forest-600/40 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-gold-500 text-2xl font-bold mb-1">{m.value}</div>
              <div className="text-white text-sm font-semibold mb-1">{m.label}</div>
              <div className="text-white/50 text-xs">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
