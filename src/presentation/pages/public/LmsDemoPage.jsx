import React from 'react';
import LmsPlayer from '../../components/LmsPlayer/LmsPlayer';

const LmsDemoPage = () => {
    // Mock data for the Lukos tutorials
    const courseSections = [
        {
            id: 1,
            title: "Módulo 1: Sistema PDV (Frente de Caixa)",
            lessons: [
                { id: 101, title: "101. Abertura e Fechamento de Caixa", duration: "5m", type: "video" },
                { id: 102, title: "102. Realizando Vendas e Sangrias", duration: "8m", type: "video" },
                { id: 103, title: "103. Cancelamento de Cupom Fiscal", duration: "4m", type: "video" },
            ]
        },
        {
            id: 2,
            title: "Módulo 2: Retaguarda (ERP)",
            lessons: [
                { id: 201, title: "201. Cadastro de Produtos e Estoque", duration: "12m", type: "video" },
                { id: 202, title: "202. Entrada de Notas Fiscais (XML)", duration: "15m", type: "video" },
                { id: 203, title: "203. Configuração de Promoções", duration: "6m", type: "video" },
            ]
        },
        {
            id: 3,
            title: "Módulo 3: Gestão Financeira",
            lessons: [
                { id: 301, title: "301. Fluxo de Caixa e DRE", duration: "10m", type: "video" },
                { id: 302, title: "302. Conciliação Bancária Automática", duration: "7m", type: "video" },
                { id: 303, title: "303. Relatórios de Performance", duration: "1m", type: "text" },
            ]
        }
    ];

    return (
        <div className="lms-demo-wrapper">
            <LmsPlayer
                courseTitle="Central de Tutoriais Lukos - Domine seus Sistemas"
                sections={courseSections}
            />
        </div>
    );
};

export default LmsDemoPage;
