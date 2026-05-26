import { Leaf } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Leaf size={18} className="text-gold-500" />
            <span className="font-bold text-lg">Real Jardinagem</span>
          </div>
          <p className="text-gold-500 text-sm italic">Paisagismo e Manutenção de Jardins</p>
          <p className="text-white/50 text-xs mt-1">Gaspar · Blumenau — SC</p>
        </div>
        <div className="text-center">
          <p className="text-white/60 text-sm">Central construída na Mentoria Selva Premium</p>
          <p className="text-white/40 text-xs mt-1">Sessão 1: 27/05/2026 | Check-in: 17/06/2026</p>
        </div>
        <div className="md:text-right">
          <p className="text-white/80 text-sm font-semibold">Mentoria: Jean Francis</p>
          <p className="text-white/60 text-sm">Acompanhamento: Juliana Anhaia</p>
          <p className="text-white/40 text-xs mt-1">comercial@focoserv.com.br</p>
          <p className="text-white/40 text-xs">@jeanfrancisoficial | @julianaanhaia</p>
        </div>
      </div>
      <div className="border-t border-forest-700 pt-6 text-center">
        <p className="text-white/30 text-xs">© 2026 Real Jardinagem | Selva Premium. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
