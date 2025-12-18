import React from 'react';
import { CreditCard, ShieldCheck, Heart, CheckCircle, BarChart3, Zap, Shield, Search, TrendingUp, Users } from 'lucide-react';

function ConciliacaoPage() {
    const purpleColor = '#8B5CF6';

    const conciliacaoFeatures = [
        {
            title: 'Automatização Total',
            description: 'Livre-se das planilhas manuais. Nosso sistema busca e concilia automaticamente todas as suas vendas de cartão.',
            icon: Zap
        },
        {
            title: 'Controle de Taxas',
            description: 'Verifique se as taxas cobradas pelas operadoras estão de acordo com o contrato.',
            icon: BarChart3
        },
        {
            title: 'Prevenção de Perdas',
            description: 'Identifique rapidamente vendas não pagas, cancelamentos indevidos e chargebacks.',
            icon: Shield
        },
        {
            title: 'Fluxo de Caixa Preciso',
            description: 'Saiba exatamente quando e quanto você vai receber de cada operadora.',
            icon: TrendingUp
        }
    ];

    const fullcheckFeatures = [
        {
            title: 'Auditoria Completa',
            description: 'Verificação profunda de cada transação, garantindo que nenhum centavo seja perdido no processo.',
            icon: Search
        },
        {
            title: 'Segurança de Dados',
            description: 'Proteção total das informações financeiras com padrões elevados de criptografia.',
            icon: ShieldCheck
        },
        {
            title: 'Relatórios Detalhados',
            description: 'Visão macro e micro de todas as operações de checkout e financeiras.',
            icon: BarChart3
        }
    ];

    const fidelidadeFeatures = [
        {
            title: 'Retenção de Clientes',
            description: 'Crie programas de pontos e recompensas que fazem seu cliente voltar sempre ao seu posto.',
            icon: Heart
        },
        {
            title: 'Base de Dados Qualificada',
            description: 'Conheça o perfil de consumo dos seus clientes e crie campanhas personalizadas.',
            icon: Users
        },
        {
            title: 'Integração com PDV',
            description: 'Acúmulo e resgate de pontos diretamente no momento da venda, sem complicações.',
            icon: CheckCircle
        }
    ];

    return (
        <div className="bg-[#0a0a0f] min-h-screen font-sans text-white">
            {/* Conciliação de Cartão */}
            <section className="py-32 bg-[#0a0a0f] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-purple-500/5 blur-[120px] rounded-full translate-x-1/2"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1 order-2 lg:order-1">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {conciliacaoFeatures.map((feature, index) => (
                                    <div key={index} className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/5 hover:border-[#8B5CF6]/30 hover:bg-white/[0.08] transition-all group">
                                        <div className="w-14 h-14 bg-[#8B5CF6]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#8B5CF6] group-hover:rotate-12 transition-all duration-500">
                                            <feature.icon className="w-7 h-7 text-[#8B5CF6] group-hover:text-white" />
                                        </div>
                                        <h3 className="text-white font-black text-xl mb-3 uppercase tracking-tight">{feature.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed font-light">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 order-1 lg:order-2">
                            <span className="text-[#8B5CF6] text-sm uppercase tracking-[0.2em] font-bold mb-4 block border-l-4 border-[#8B5CF6] pl-4">
                                Gestão Financeira
                            </span>
                            <h2 className="text-5xl md:text-7xl font-black text-white uppercase mb-8 leading-none tracking-tighter">
                                CONCILIAÇÃO <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-purple-400 text-[#8B5CF6]">DE CARTÃO</span>
                            </h2>
                            <div className="relative mb-10 rounded-[2.5rem] overflow-hidden group border border-white/5 shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=1000&auto=format&fit=crop"
                                    alt="Analytics Graph"
                                    className="w-full h-[400px] object-cover opacity-60 group-hover:scale-110 transition-transform duration-[2s]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent"></div>
                            </div>
                            <p className="text-gray-400 text-xl leading-relaxed mb-10 font-light border-l-2 border-[#8B5CF6]/30 pl-6">
                                Nossa solução integra-se perfeitamente ao seu ERP, permitindo que você acompanhe cada centavo das suas vendas em cartões de crédito, débito e benefícios com precisão cirúrgica.
                            </p>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4 text-gray-300 font-bold uppercase text-xs tracking-widest">
                                    <div className="w-8 h-[1px] bg-[#8B5CF6]"></div>
                                    <span>Interface 100% intuitiva</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-300 font-bold uppercase text-xs tracking-widest">
                                    <div className="w-8 h-[1px] bg-[#8B5CF6]"></div>
                                    <span>Mais de 50 operadoras</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Seção Fullcheck */}
            <section className="py-32 bg-[#0d0d14] relative overflow-hidden border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1">
                            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 group">
                                <img
                                    src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000&auto=format&fit=crop"
                                    alt="Audit and Verification"
                                    className="w-full h-[600px] object-cover opacity-50 group-hover:scale-105 transition-transform duration-[2s]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent"></div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="bg-white/[0.02] backdrop-blur-md p-10 md:p-16 rounded-[3rem] border border-white/5 shadow-2xl relative">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 blur-[60px] rounded-full"></div>
                                <div className="flex items-center gap-6 mb-12">
                                    <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                                        <ShieldCheck className="w-8 h-8 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter">FULLCHECK</h3>
                                        <p className="text-blue-400 font-bold text-xs tracking-[0.3em] uppercase">Auditoria de Transações</p>
                                    </div>
                                </div>
                                <div className="space-y-10">
                                    {fullcheckFeatures.map((feature, index) => (
                                        <div key={index} className="flex gap-6 group">
                                            <div className="mt-1">
                                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-blue-500/50 transition-colors">
                                                    <feature.icon className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-lg mb-2 uppercase tracking-tight">{feature.title}</h4>
                                                <p className="text-gray-400 text-sm font-light leading-relaxed">{feature.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Seção Fidelidade */}
            <section className="py-32 bg-[#0a0a0f] relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="flex-1 order-2 lg:order-1">
                            <div className="bg-white/[0.02] backdrop-blur-md p-10 md:p-16 rounded-[3rem] border border-white/5 shadow-2xl relative">
                                <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-500/10 blur-[60px] rounded-full"></div>
                                <div className="flex items-center gap-6 mb-12">
                                    <div className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center border border-pink-500/20">
                                        <Heart className="w-8 h-8 text-pink-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter">FIDELIDADE</h3>
                                        <p className="text-pink-400 font-bold text-xs tracking-[0.3em] uppercase">Programas de Recompensa</p>
                                    </div>
                                </div>
                                <div className="space-y-10">
                                    {fidelidadeFeatures.map((feature, index) => (
                                        <div key={index} className="flex gap-6 group">
                                            <div className="mt-1">
                                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-pink-500/50 transition-colors">
                                                    <feature.icon className="w-5 h-5 text-gray-500 group-hover:text-pink-400 transition-colors" />
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-lg mb-2 uppercase tracking-tight">{feature.title}</h4>
                                                <p className="text-gray-400 text-sm font-light leading-relaxed">{feature.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 order-1 lg:order-2">
                            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 group">
                                <img
                                    src="/customer_loyalty_app_1766005568202.png"
                                    alt="Customer Loyalty App"
                                    className="w-full h-[600px] object-cover opacity-80 group-hover:scale-105 transition-transform duration-[2s]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-bl from-pink-500/20 to-transparent"></div>

                                <div className="absolute bottom-10 left-10 bg-black/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 shadow-2xl transform hover:-translate-y-2 transition-transform duration-500">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-gradient-to-tr from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/20">
                                            <Heart className="w-7 h-7 text-white fill-white/20" />
                                        </div>
                                        <div>
                                            <div className="text-white font-black text-lg">+150 PONTOS</div>
                                            <div className="text-pink-400 text-[10px] font-bold uppercase tracking-widest">Cliente Fidelizado</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-40 relative overflow-hidden bg-black">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-5xl md:text-8xl font-black text-white uppercase mb-10 tracking-tighter leading-none">
                        PRONTO PARA <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-blue-400">IMPULSIONAR</span>
                    </h2>
                    <p className="text-gray-500 text-xl md:text-2xl max-w-3xl mx-auto mb-16 font-light leading-relaxed">
                        Junte-se a centenas de postos que já utilizam a tecnologia LUKOS para gerenciar cartões e fidelizar clientes com inteligência.
                    </p>
                    <button className="px-16 py-8 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#8B5CF6] hover:text-white transition-all transform hover:scale-110 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                        SOLICITAR ORÇAMENTO
                    </button>
                </div>
            </section>
        </div>
    );
}

export default ConciliacaoPage;
