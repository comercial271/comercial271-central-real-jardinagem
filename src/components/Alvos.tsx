import { MapPin, TrendingUp, CheckCircle, Clock, ExternalLink, Home, Building2, Handshake, Star, Briefcase } from 'lucide-react'

const residenciasPremium = [
  { name: 'Residência Premium Gaspar 1',   desc: 'Bairro nobre — proprietário valoriza qualidade — ticket alto sem negociar',  status: 'Prioridade' },
  { name: 'Residência Premium Gaspar 2',   desc: 'Casa com jardim grande — manutenção mensal — cliente de referência',         status: 'Prioridade' },
  { name: 'Residência com Área Verde',     desc: 'Área verde ampla — gestora de imóveis parceira — recorrência garantida',     status: 'Abordagem'  },
  { name: 'Condomínio Fechado Gaspar',     desc: 'Alto padrão — síndico aberto a contrato anual — área verde extensa',        status: 'Abordagem'  },
  { name: 'Empresa / Sede Gaspar 1',       desc: 'Sede empresarial — apresentação do jardim é imagem da empresa',              status: 'Mapeado'    },
  { name: 'Empresa / Sede Gaspar 2',       desc: 'Área verde corporativa — gestão de jardim recorrente — ticket médio',       status: 'Mapeado'    },
]

const expansaoBlumenau = [
  { name: 'Residência Premium Blumenau 1', desc: 'Blumenau — bairros nobres — ticket maior que Gaspar, sem concorrência digital' },
  { name: 'Empresa de Grande Porte Blumenau', desc: 'Sede corporativa — gestão de áreas verdes — contrato anual renovável' },
  { name: 'Condomínio Fechado Blumenau',   desc: 'Alto padrão — síndico decide pelo profissionalismo, não pelo menor preço' },
  { name: 'Imobiliária Gaspar/Blumenau',   desc: 'Canal de indicação — cada imóvel no portfólio = lead qualificado para você' },
  { name: 'Clínica / Consultório Gaspar',  desc: 'Fachada e área verde — imagem profissional — manutenção recorrente' },
  { name: 'Hotel ou Pousada Vale Europeu', desc: 'Jardim como diferencial — contrato anual — gestão exige profissional' },
]

const statusColor: Record<string, string> = {
  'Prioridade': 'bg-gold-100 text-gold-700',
  'Abordagem':  'bg-green-100 text-green-700',
  'Mapeado':    'bg-blue-100 text-blue-700',
}

export default function Alvos() {
  return (
    <section id="alvos" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <span className="text-forest-700 text-xs font-bold uppercase tracking-widest">Oportunidades abertas</span>
          <h2 className="text-3xl font-bold text-forest-900 mt-1">Alvos Estratégicos</h2>
          <p className="text-gray-500 mt-2">Gaspar e Blumenau — R$15k/mês ao alcance com os clientes certos e o preço justo.</p>
        </div>

        {/* Melhor cliente ativo — âncora */}
        <div className="bg-forest-800 rounded-2xl overflow-hidden mb-6">
          <div className="p-6 text-white">
            <span className="inline-block bg-gold-500 text-forest-900 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              CLIENTE ATIVO — ÂNCORA DE CREDIBILIDADE
            </span>
            <h3 className="text-2xl font-bold mb-1">Seu Melhor Cliente Atual</h3>
            <div className="flex items-center gap-1.5 text-white/50 text-sm mb-5">
              <MapPin size={12} /> Gaspar/SC · Contrato de manutenção ativo
            </div>

            <div className="grid grid-cols-3 gap-3 text-center bg-forest-900/40 rounded-xl p-4 mb-5">
              {[
                { v: 'Ativo',   l: 'Contrato vigente'            },
                { v: '9/10',    l: 'Clientes sem reclamação'      },
                { v: 'Abaixo',  l: 'Preço está abaixo do mercado' },
              ].map(item => (
                <div key={item.l}>
                  <div className="text-gold-500 text-lg font-bold">{item.v}</div>
                  <div className="text-white/40 text-xs mt-0.5">{item.l}</div>
                </div>
              ))}
            </div>

            <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full mb-4">
              <TrendingUp size={10} /> SINAL: 9/10 SEM RECLAMAR = COBRANDO BARATO
            </span>

            <ul className="flex flex-col gap-1.5 mb-5">
              {[
                { text: 'Carteira ativa — entrega mensal de manutenção comprovada',            ok: true  },
                { text: '9/10 clientes nunca questionam o preço — alta satisfação confirmada', ok: true  },
                { text: 'Reajustar preço para o valor justo de mercado imediatamente',         gold: true },
                { text: 'Solicitar depoimento formal do melhor cliente da carteira',           gold: true },
                { text: 'Documentar com fotos antes/depois de cada manutenção',               gold: true },
              ].map((s, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-white/80">
                  {s.gold
                    ? <Clock size={12} className="text-gold-400 shrink-0" />
                    : <CheckCircle size={12} className="text-green-400 shrink-0" />}
                  {s.text}
                </li>
              ))}
            </ul>

            <a href="https://geradordepropostaselva.lovable.app" target="_blank" rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-forest-900 font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
              Gerar Proposta para Novo Alvo <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Oportunidade Gaspar */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 flex items-start gap-3">
          <Star size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-900 text-sm font-bold mb-0.5">Vantagem competitiva: zero concorrência digital em Gaspar</p>
            <p className="text-amber-800 text-sm">
              Nenhuma empresa de jardinagem local domina a busca "jardinagem Gaspar" ou "manutenção jardim Blumenau". Com GMB otimizado e presença no Instagram, você ocupa a primeira posição antes que qualquer concorrente perceba — e isso vale dezenas de leads orgânicos por mês sem investimento em publicidade.
            </p>
          </div>
        </div>

        {/* Residências Premium */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Home size={18} className="text-forest-700" />
            <p className="font-bold text-forest-900">Residências Premium — Gaspar e Blumenau</p>
            <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">PRIORIDADE MÁXIMA</span>
          </div>
          <p className="text-gray-500 text-sm mb-4 ml-7">
            Proprietários de residências de alto padrão que valorizam qualidade e nunca pedem desconto. Ticket médio R$1.500–3.000/mês. Contrato anual. Vendem <strong>tranquilidade e resultado</strong> — não jardinagem.
            Argumento central: <em>"Você tem uma residência que precisa de quem cuide com profissionalismo — eu tenho proposta, contrato e relatório fotográfico."</em>
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {residenciasPremium.map((c, i) => (
              <div key={i} className="bg-[#F4F6F0] rounded-2xl p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-bold text-forest-900 text-sm">{c.name}</p>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${statusColor[c.status]}`}>{c.status}</span>
                </div>
                <p className="text-gray-500 text-xs">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Expansão Blumenau */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Building2 size={18} className="text-forest-700" />
            <p className="font-bold text-forest-900">Empresas, Condomínios e Expansão Blumenau</p>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">EXPANSÃO</span>
          </div>
          <p className="text-gray-500 text-sm mb-4 ml-7">
            Empresas e condomínios pagam bem e assinam contratos longos. Blumenau é o polo econômico do Vale Europeu — mais oportunidades, tickets maiores. Argumento: <em>"Jardim é a primeira impressão da empresa. Quem cuida direito não precisa de dois prestadores."</em>
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {expansaoBlumenau.map((e, i) => (
              <div key={i} className="bg-[#F4F6F0] rounded-2xl p-4 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-forest-700 flex items-center justify-center text-white font-bold text-xs shrink-0 mt-0.5">
                  {e.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-forest-900 text-sm">{e.name}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Serviços Pontuais */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase size={18} className="text-forest-700" />
            <p className="font-bold text-forest-900">Serviços Pontuais — Implantação e Limpeza</p>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">COMPLEMENTO</span>
          </div>
          <p className="text-gray-500 text-sm mb-4 ml-7">
            Serviços pontuais servem como porta de entrada para contratos recorrentes. Uma implantação bem feita converte o cliente para manutenção mensal. Ticket R$800–3.000/serviço.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { name: 'Implantação de Jardim',    desc: 'Projeto novo — trabalho pontual que vira contrato mensal de manutenção' },
              { name: 'Limpeza Pesada / Roçada',  desc: 'Entrada de relacionamento — cliente satisfeito assina recorrência' },
              { name: 'Reforma de Jardim',         desc: 'Jardim degradado — recuperação completa — oportunidade de fidelização' },
            ].map((e, i) => (
              <div key={i} className="bg-[#F4F6F0] rounded-2xl p-4 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-xs shrink-0 mt-0.5">
                  {e.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-forest-900 text-sm">{e.name}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Imobiliárias — Canal de Indicação */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Handshake size={18} className="text-forest-700" />
            <p className="font-bold text-forest-900">Imobiliárias e Gestores de Propriedades</p>
            <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full">CANAL DE INDICAÇÃO</span>
          </div>
          <p className="text-gray-500 text-sm mb-4 ml-7">
            Imobiliárias que administram imóveis em Gaspar e Blumenau são parceiras perfeitas: cada propriedade no portfólio delas é um lead qualificado para você. Uma parceira ativa pode trazer 5–10 contratos de uma vez.
          </p>
          <div className="bg-[#F4F6F0] rounded-2xl p-5">
            <p className="font-bold text-forest-900 mb-3 text-sm">Script de abordagem para imobiliárias:</p>
            <div className="bg-white rounded-xl p-4 border border-gray-100 text-sm text-gray-700 leading-relaxed">
              <p className="font-semibold text-forest-800 mb-2">"Olá, [Nome]. Sou o Guilherme, da Real Jardinagem."</p>
              <p className="mb-2">Vocês administram imóveis em Gaspar e Blumenau, certo? Muitos proprietários têm imóveis que precisam de jardim bem mantido para valorizar o imóvel e impressionar compradores ou locatários.</p>
              <p className="mb-2">A gente cuida do jardim com contrato mensal, proposta profissional e relatório fotográfico. Proprietários ficam tranquilos e o imóvel mantém o valor.</p>
              <p className="font-semibold text-forest-800">Você toparia indicar para os proprietários que precisam? A gente paga comissão por contrato fechado.</p>
            </div>
            <div className="mt-4 grid sm:grid-cols-3 gap-3">
              {[
                { v: '1 parceira', l: '5–10 contratos diretos' },
                { v: 'Comissão', l: 'R$200–400 por contrato fechado' },
                { v: 'Credibilidade', l: 'Imobiliária valida sua qualidade' },
              ].map(item => (
                <div key={item.l} className="bg-forest-50 rounded-xl p-3 text-center">
                  <p className="font-bold text-forest-800 text-sm">{item.v}</p>
                  <p className="text-forest-600 text-xs mt-0.5">{item.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projeção de carteira */}
        <div className="bg-forest-800 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={18} className="text-gold-500" />
            <p className="font-bold text-lg">Carteira ideal para R$15k/mês</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {[
              { tipo: 'Residências Gaspar/Blumenau', qtd: '4 casas', ticket: 'R$1.5k/mês', total: 'R$6k' },
              { tipo: 'Empresas / Sedes',            qtd: '2 empresas', ticket: 'R$2k/mês', total: 'R$4k' },
              { tipo: 'Condomínio Gaspar',            qtd: '1 condomínio', ticket: 'R$3k/mês', total: 'R$3k' },
              { tipo: 'Serviços pontuais',            qtd: 'Variável', ticket: 'R$2k+/mês', total: 'R$2k+' },
            ].map(item => (
              <div key={item.tipo} className="bg-forest-700/50 rounded-xl p-4 text-center">
                <p className="text-white/60 text-xs mb-2">{item.tipo}</p>
                <p className="text-gold-500 font-bold text-xl mb-1">{item.total}</p>
                <p className="text-white/40 text-xs">{item.qtd} · {item.ticket}</p>
              </div>
            ))}
          </div>
          <div className="bg-gold-500/20 border border-gold-500/30 rounded-xl p-4 text-center">
            <p className="text-gold-400 text-xs uppercase font-bold tracking-widest mb-1">Total projetado</p>
            <p className="text-white font-bold text-3xl">R$15.000/mês</p>
            <p className="text-white/50 text-xs mt-1">Com 7 contratos certos em Gaspar e Blumenau — mais que dobrando o faturamento atual</p>
          </div>
        </div>
      </div>
    </section>
  )
}
