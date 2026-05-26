import { Zap, PlayCircle, List, Star, FileText, FolderOpen, ExternalLink } from 'lucide-react'

interface DocLink { label: string; href: string; internal?: boolean }

const docs: Array<{ icon: React.ElementType; title: string; desc: string; link: DocLink }> = [
  {
    icon: FileText,
    title: 'Diagnóstico 360° — Real Jardinagem',
    desc: 'Perfil completo da empresa, trava central (precificação por feeling), carteira âncora e plano de ataque ao mercado de Gaspar e Blumenau.',
    link: { label: 'Abrir', href: 'https://docs.google.com/document/d/1naIxd0sAyirHxCT36U7N26lqeheAFfUSfHSnXqjgYos/edit' },
  },
  {
    icon: PlayCircle,
    title: 'Planilha de Margem Operacional',
    desc: 'Calculadora de custo real por serviço: Fiorino, equipamentos amortizados, horas trabalhadas e margem mínima. Base para toda proposta.',
    link: { label: 'Abrir', href: 'https://docs.google.com/spreadsheets/d/1FUW7A1egXwdWi1HCKxV6Bzg14GASEJV__5eneMELrZw/edit' },
  },
  {
    icon: List,
    title: 'Contrato Recorrente (Manutenção Mensal)',
    desc: 'Modelo de contrato para clientes mensais — proteção jurídica e previsibilidade de receita.',
    link: { label: 'Abrir', href: 'https://docs.google.com/document/d/1ps4_GPgF9W3D92YsMiLpT2y_lG3MaqfnxsAmy_t3b8g/edit' },
  },
  {
    icon: List,
    title: 'Contrato Empreitada (Serviço Pontual)',
    desc: 'Modelo para limpezas, implantações e serviços únicos. Essencial para não trabalhar sem contrato.',
    link: { label: 'Abrir', href: 'https://docs.google.com/document/d/1C3Vq6dNxUKzsjwh8J3-z2shj4K9vEh9bNAVelhTDz-k/edit' },
  },
  {
    icon: FileText,
    title: 'Roteiro de Formação de Preço',
    desc: 'Passo a passo para calcular o preço justo de cada tipo de serviço sem perder margem.',
    link: { label: 'Abrir', href: 'https://docs.google.com/document/d/1eAhnIhGQZeIzl87JEVFjoZEsEEdCBCjU7M1o9N-VXic/edit' },
  },
  {
    icon: Star,
    title: 'Script de Prospecção para Empresas',
    desc: 'Abordagem consultiva para fechar contratos com empresas, condomínios e residências de alto padrão em Gaspar e Blumenau.',
    link: { label: 'Abrir', href: 'https://docs.google.com/document/d/1a73V7ekpVz3bN5jy8hAqOLn30sNT81Tzbb9wLqJta58/edit' },
  },
]

export default function Arsenal() {
  return (
    <section id="arsenal" className="py-20 bg-[#F4F6F0]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Ferramentas e documentos</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Seu Arsenal</h2>
        </div>

        <div className="bg-forest-800 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="bg-gold-500/20 p-3 rounded-xl shrink-0">
            <Zap size={24} className="text-gold-500" />
          </div>
          <div className="flex-1">
            <span className="inline-block bg-gold-500 text-forest-900 text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-1.5">
              EXCLUSIVO SELVA PREMIUM
            </span>
            <h3 className="text-white font-bold text-lg">Gerador de Propostas Selva</h3>
            <p className="text-white/60 text-sm mt-0.5">Propostas profissionais em minutos — para residências e empresas em Gaspar e Blumenau</p>
          </div>
          <a href="https://geradordepropostaselva.lovable.app" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-forest-900 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shrink-0">
            Abrir Gerador <ExternalLink size={13} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          {docs.map((d, i) => {
            const Icon = d.icon
            return (
              <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 flex items-start gap-3">
                <div className="bg-forest-100 p-2 rounded-xl shrink-0 mt-0.5">
                  <Icon size={15} className="text-forest-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-forest-900 text-sm leading-snug mb-0.5">{d.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed mb-2">{d.desc}</p>
                  {d.link.internal ? (
                    <a href={d.link.href}
                      className="inline-flex items-center gap-1 text-forest-700 hover:text-forest-900 text-xs font-semibold transition-colors">
                      {d.link.label}
                    </a>
                  ) : (
                    <a href={d.link.href} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-forest-700 hover:text-forest-900 text-xs font-semibold transition-colors">
                      {d.link.label} <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-3">
          <FolderOpen size={18} className="text-forest-600 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-forest-900 text-sm">Pasta Principal — Real Jardinagem no Drive</p>
            <p className="text-gray-400 text-xs">Todos os materiais da mentoria organizados por categoria</p>
          </div>
          <a href="https://drive.google.com/drive/folders/1V1B9aWuZkuRV8EoGT1rfYmcornS4fDew" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-forest-800 hover:bg-forest-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shrink-0">
            Abrir <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </section>
  )
}
