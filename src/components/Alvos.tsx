import { MapPin, TrendingUp, CheckCircle, Clock, ExternalLink, Home, Building2, Hotel, Handshake, Star } from 'lucide-react'

const casasVeraneio = [
  { name: 'Casa Premium Riviera 1',   desc: 'Proprietário em SP — 4+ quartos — área verde ampla',     status: 'Prioridade' },
  { name: 'Casa Premium Riviera 2',   desc: 'Condomínio fechado — manutenção mensal — ticket alto',    status: 'Prioridade' },
  { name: 'Casa Riviera Piscina',     desc: 'Casa com piscina + jardim — gestora de imóveis parceira', status: 'Abordagem'  },
  { name: 'Casa Premium Bertioga 1',  desc: 'Bertioga centro — proprietário ausente — lote grande',    status: 'Abordagem'  },
  { name: 'Casa Temporada Bertioga',  desc: 'Aluguel por temporada — precisa de jardim constante',     status: 'Mapeado'    },
  { name: 'Casa Praia com Jardim',    desc: 'Proprietário via indicação — proposta enviada',            status: 'Mapeado'    },
]

const condominios = [
  { name: 'Condomínio Fechado Riviera 1', desc: 'Alto padrão — síndico aberto a contrato anual — área verde extensa' },
  { name: 'Condomínio Fechado Riviera 2', desc: 'Vizinho ao Villagio — prova social imediata na abordagem' },
  { name: 'Residencial Premium Bertioga', desc: 'Bertioga — gated community — manutenção mensal recorrente' },
  { name: 'Condomínio Praia Bertioga',    desc: 'Condomínio à beira-mar — alto padrão de apresentação exigido' },
  { name: 'Empreendimento em Lançamento', desc: 'Riviera — implantação completa de paisagismo — oportunidade de entrada' },
  { name: 'Condomínio Horizontal',        desc: 'Bertioga — foco em casas individuais + áreas comuns' },
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
          <p className="text-gray-500 mt-2">Riviera de São Lourenço e Bertioga — R$50k/mês ao alcance com as propriedades certas.</p>
        </div>

        {/* Villagio — cliente ativo âncora */}
        <div className="bg-forest-800 rounded-2xl overflow-hidden mb-6">
          <div className="p-6 text-white">
            <span className="inline-block bg-gold-500 text-forest-900 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              CLIENTE ATIVO — ÂNCORA DE CREDIBILIDADE
            </span>
            <h3 className="text-2xl font-bold mb-1">Villagio</h3>
            <div className="flex items-center gap-1.5 text-white/50 text-sm mb-5">
              <MapPin size={12} /> Riviera de São Lourenço — SP · Contrato de manutenção ativo
            </div>

            <div className="grid grid-cols-3 gap-3 text-center bg-forest-900/40 rounded-xl p-4 mb-5">
              {[
                { v: 'R$13k',   l: 'Lucro mensal comprovado' },
                { v: 'Ativo',   l: 'Contrato vigente'         },
                { v: 'Premium', l: 'Padrão Riviera'           },
              ].map(item => (
                <div key={item.l}>
                  <div className="text-gold-500 text-lg font-bold">{item.v}</div>
                  <div className="text-white/40 text-xs mt-0.5">{item.l}</div>
                </div>
              ))}
            </div>

            <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full mb-4">
              <TrendingUp size={10} /> USE EM TODA ABORDAGEM COMERCIAL
            </span>

            <ul className="flex flex-col gap-1.5 mb-5">
              {[
                { text: 'Contrato ativo — entrega mensal de manutenção comprovada', ok: true  },
                { text: 'R$13k de lucro/mês — case real, não estimativa', ok: true            },
                { text: 'Solicitar depoimento formal do proprietário do Villagio', gold: true  },
                { text: 'Documentar com fotos antes/depois de cada manutenção mensal', gold: true },
                { text: 'Gravar Roteiro 2 do Instagram na próxima visita', gold: true          },
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

        {/* Oportunidade Riviera */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 flex items-start gap-3">
          <Star size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-900 text-sm font-bold mb-0.5">Vantagem competitiva: zero concorrência digital em Bertioga e Riviera</p>
            <p className="text-amber-800 text-sm">
              Nenhuma empresa de jardinagem local domina a busca "jardinagem Bertioga" ou "manutenção jardim Riviera de São Lourenço". Com GMB otimizado + 11 fases implementadas, você ocupa a primeira posição antes que qualquer concorrente perceba — e isso vale dezenas de leads orgânicos por mês na alta temporada.
            </p>
          </div>
        </div>

        {/* Casas de Veraneio — PRIORIDADE MÁXIMA */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Home size={18} className="text-forest-700" />
            <p className="font-bold text-forest-900">Casas de Veraneio — Riviera e Bertioga</p>
            <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">PRIORIDADE MÁXIMA</span>
          </div>
          <p className="text-gray-500 text-sm mb-4 ml-7">
            Proprietários ausentes que vivem em SP e têm casa na Riviera. Ticket médio R$3–6k/mês. Contrato anual. Vendem <strong>tranquilidade</strong> — não jardinagem.
            Argumento central: <em>"Você vai chegar em dezembro e o jardim vai estar impecável."</em>
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {casasVeraneio.map((c, i) => (
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

        {/* Condomínios Fechados */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Building2 size={18} className="text-forest-700" />
            <p className="font-bold text-forest-900">Condomínios Fechados — Riviera e Bertioga</p>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">EXPANSÃO</span>
          </div>
          <p className="text-gray-500 text-sm mb-4 ml-7">
            Contratos anuais com síndicos e administradoras. Ticket R$5–15k/mês. Alta recorrência. Vizinhança ao Villagio é o argumento mais poderoso: <em>"Já atendemos o condomínio ao lado."</em>
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {condominios.map((e, i) => (
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

        {/* Pousadas e Resorts */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Hotel size={18} className="text-forest-700" />
            <p className="font-bold text-forest-900">Pousadas, Resorts e Equipamentos Turísticos</p>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">OPORTUNIDADE</span>
          </div>
          <p className="text-gray-500 text-sm mb-4 ml-7">
            Pousadas e resorts de Bertioga precisam de jardim impecável o ano todo — é parte do produto que vendem. Alta exigência = profissional especializado. Ticket R$3–8k/mês.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { name: 'Pousada Premium Bertioga',   desc: 'Bertioga — jardim como diferencial competitivo — open bar de serviços' },
              { name: 'Resort Riviera',             desc: 'Riviera — padrão de apresentação exigido — contrato anual' },
              { name: 'Hotel Boutique Litoral',     desc: 'Alto padrão — gerente decide rápido — ticket elevado garantido' },
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
            Imobiliárias que gerenciam casas de veraneio na Riviera são parceiras perfeitas: cada propriedade no portfólio delas é um lead qualificado para você. Uma parceira ativa pode trazer 5–10 contratos de uma vez.
          </p>
          <div className="bg-[#F4F6F0] rounded-2xl p-5">
            <p className="font-bold text-forest-900 mb-3 text-sm">Script de abordagem para imobiliárias:</p>
            <div className="bg-white rounded-xl p-4 border border-gray-100 text-sm text-gray-700 leading-relaxed">
              <p className="font-semibold text-forest-800 mb-2">"Olá, [Nome]. Sou o Aleandro, da Lobo Jardinagem."</p>
              <p className="mb-2">Vocês administram imóveis na Riviera de São Lourenço, certo? Muitos proprietários estão em SP e a propriedade fica sem cuidado o ano todo — jardim degradado, valor do imóvel cai, hóspede ou comprador vê e foge.</p>
              <p className="mb-2">A gente atende o Villagio e algumas casas na Riviera. Fazemos manutenção mensal com relatório fotográfico enviado para o proprietário — ele fica tranquilo mesmo estando em São Paulo.</p>
              <p className="font-semibold text-forest-800">Você toparia indicar para os proprietários que precisam? A gente paga comissão por contrato fechado.</p>
            </div>
            <div className="mt-4 grid sm:grid-cols-3 gap-3">
              {[
                { v: '1 parceira', l: '5–10 contratos diretos' },
                { v: 'Comissão', l: 'R$300–500 por contrato fechado' },
                { v: 'Villagio', l: 'Prova social para abrir a conversa' },
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
            <p className="font-bold text-lg">Carteira ideal para R$50k/mês</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {[
              { tipo: 'Casas veraneio Riviera', qtd: '8 casas', ticket: 'R$4k/mês', total: 'R$32k' },
              { tipo: 'Condomínios Riviera',    qtd: '2 condomínios', ticket: 'R$6k/mês', total: 'R$12k' },
              { tipo: 'Pousadas/resorts',       qtd: '1 resort', ticket: 'R$4k/mês', total: 'R$4k' },
              { tipo: 'Serviços pontuais',      qtd: 'Variável', ticket: 'R$2k+/mês', total: 'R$2k+' },
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
            <p className="text-white font-bold text-3xl">R$50.000/mês</p>
            <p className="text-white/50 text-xs mt-1">Com 11 contratos certos em Bertioga e Riviera</p>
          </div>
        </div>
      </div>
    </section>
  )
}
