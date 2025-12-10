// #region agent log
fetch('http://127.0.0.1:7243/ingest/46d63257-3d3d-4b19-b340-327acd66351f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'trainingsData.js:1',message:'Module loading - post-fix',data:{availableExports:['trainings','getAllTrainings','getTrainingCategories','getTrainingLevels','getTrainingFormats','getTrainingModalities','getTrainingStats']},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
// #endregion

export const trainings = [
    {
        id: 1,
        title: "Treinamento Básico - Sistema Lukos PDV",
        description: "Aprenda os fundamentos do sistema de PDV, incluindo configuração inicial, vendas básicas e gestão de produtos. Ideal para iniciantes que estão começando a usar o sistema.",
        category: "PDV",
        level: "Iniciante",
        format: "Online",
        modality: "Ao Vivo",
        duration: "4h",
        modules: 5,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=150&fit=crop",
        rating: 4.9,
        reviews: 156,
        enrolled: 45,
        maxStudents: 50,
        availableDates: ["2025-01-15", "2025-01-22", "2025-02-01"],
        benefits: ["Certificado de conclusão", "Material de apoio", "Suporte durante o curso"],
        icon: "ShoppingCart"
    },
    {
        id: 2,
        title: "Treinamento Avançado - Retaguarda e Estoque",
        description: "Domine todas as funcionalidades avançadas da retaguarda, gestão de estoque, relatórios financeiros e integrações. Para usuários experientes que desejam maximizar o uso do sistema.",
        category: "Retaguarda",
        level: "Avançado",
        format: "Híbrido",
        modality: "Gravado + Ao Vivo",
        duration: "8h",
        modules: 12,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&h=150&fit=crop",
        rating: 4.8,
        reviews: 89,
        enrolled: 32,
        maxStudents: 40,
        availableDates: ["2025-01-20", "2025-02-05"],
        benefits: ["Certificado avançado", "Consultoria pós-curso", "Acesso vitalício"],
        icon: "Package"
    },
    {
        id: 3,
        title: "Treinamento Intermediário - Faturamento e NF-e",
        description: "Aprenda a emitir notas fiscais, gerenciar faturas, entender impostos e integrar com sistemas fiscais. Perfeito para quem já conhece o básico e quer expandir conhecimentos.",
        category: "Faturamento",
        level: "Intermediário",
        format: "Presencial",
        modality: "Ao Vivo",
        duration: "6h",
        modules: 8,
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=150&h=150&fit=crop",
        rating: 4.7,
        reviews: 134,
        enrolled: 28,
        maxStudents: 30,
        availableDates: ["2025-01-25", "2025-02-10"],
        benefits: ["Certificado fiscal", "Simulador prático", "Grupo exclusivo"],
        icon: "FileText"
    },
    {
        id: 4,
        title: "Treinamento Básico - Relatórios e Dashboard",
        description: "Descubra como gerar e interpretar os principais relatórios do sistema, criar dashboards personalizados e tomar decisões baseadas em dados.",
        category: "Relatórios",
        level: "Iniciante",
        format: "Online",
        modality: "Gravado",
        duration: "3h",
        modules: 6,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=150&fit=crop",
        rating: 4.6,
        reviews: 98,
        enrolled: 67,
        maxStudents: 100,
        availableDates: ["2025-01-18", "2025-01-28", "2025-02-08", "2025-02-18"],
        benefits: ["Acesso ilimitado", "Templates prontos", "Atualizações gratuitas"],
        icon: "BarChart"
    },
    {
        id: 5,
        title: "Treinamento Avançado - Integrações e APIs",
        description: "Aprenda a integrar o sistema Lukos com outras plataformas, trabalhar com APIs, webhooks e automações avançadas para otimizar processos.",
        category: "Integrações",
        level: "Avançado",
        format: "Híbrido",
        modality: "Ao Vivo",
        duration: "10h",
        modules: 15,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&h=150&fit=crop",
        rating: 4.9,
        reviews: 45,
        enrolled: 18,
        maxStudents: 25,
        availableDates: ["2025-02-01"],
        benefits: ["Certificado técnico", "Sandbox de teste", "Suporte especializado"],
        icon: "Code"
    },
    {
        id: 6,
        title: "Treinamento Intermediário - Gestão de Clientes",
        description: "Maximize o relacionamento com clientes usando as ferramentas de CRM integradas, histórico de compras, programas de fidelidade e marketing.",
        category: "CRM",
        level: "Intermediário",
        format: "Online",
        modality: "Ao Vivo",
        duration: "5h",
        modules: 7,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=150&fit=crop",
        rating: 4.8,
        reviews: 112,
        enrolled: 52,
        maxStudents: 60,
        availableDates: ["2025-01-22", "2025-02-05", "2025-02-15"],
        benefits: ["Certificado CRM", "Templates de campanhas", "Biblioteca de recursos"],
        icon: "Users"
    },
    {
        id: 7,
        title: "Treinamento Básico - Configuração Inicial",
        description: "Guia completo para configurar seu sistema pela primeira vez: cadastros básicos, parametrizações essenciais e primeiros passos.",
        category: "Configuração",
        level: "Iniciante",
        format: "Presencial",
        modality: "Ao Vivo",
        duration: "3h",
        modules: 4,
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=150&h=150&fit=crop",
        rating: 4.7,
        reviews: 203,
        enrolled: 75,
        maxStudents: 80,
        availableDates: ["2025-01-12", "2025-01-19", "2025-01-26", "2025-02-02"],
        benefits: ["Guia passo a passo", "Checklist de setup", "Suporte inicial"],
        icon: "Settings"
    },
    {
        id: 8,
        title: "Treinamento Avançado - Segurança e Backup",
        description: "Aprenda boas práticas de segurança, configurar backups automáticos, políticas de acesso e proteger seus dados empresariais.",
        category: "Segurança",
        level: "Avançado",
        format: "Online",
        modality: "Gravado + Ao Vivo",
        duration: "4h",
        modules: 6,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&h=150&fit=crop",
        rating: 4.9,
        reviews: 67,
        enrolled: 22,
        maxStudents: 30,
        availableDates: ["2025-02-08"],
        benefits: ["Certificado de segurança", "Plano de contingência", "Auditoria incluída"],
        icon: "Shield"
    }
];

/**
 * Retorna todos os treinamentos disponíveis
 */
export const getAllTrainings = () => {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/46d63257-3d3d-4b19-b340-327acd66351f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'trainingsData.js:getAllTrainings',message:'getAllTrainings called',data:{trainingsCount:trainings.length},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    return trainings;
};

/**
 * Retorna todas as categorias únicas dos treinamentos
 */
export const getTrainingCategories = () => {
    const categories = [...new Set(trainings.map(t => t.category))];
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/46d63257-3d3d-4b19-b340-327acd66351f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'trainingsData.js:getTrainingCategories',message:'getTrainingCategories called',data:{categoriesCount:categories.length,categories},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    return categories;
};

/**
 * Retorna todos os níveis únicos dos treinamentos
 */
export const getTrainingLevels = () => {
    const levels = [...new Set(trainings.map(t => t.level))];
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/46d63257-3d3d-4b19-b340-327acd66351f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'trainingsData.js:getTrainingLevels',message:'getTrainingLevels called',data:{levelsCount:levels.length,levels},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    return levels;
};

/**
 * Retorna todos os formatos únicos dos treinamentos
 */
export const getTrainingFormats = () => {
    const formats = [...new Set(trainings.map(t => t.format))];
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/46d63257-3d3d-4b19-b340-327acd66351f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'trainingsData.js:getTrainingFormats',message:'getTrainingFormats called',data:{formatsCount:formats.length,formats},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    return formats;
};

/**
 * Retorna todas as modalidades únicas dos treinamentos
 */
export const getTrainingModalities = () => {
    const modalities = [...new Set(trainings.map(t => t.modality))];
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/46d63257-3d3d-4b19-b340-327acd66351f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'trainingsData.js:getTrainingModalities',message:'getTrainingModalities called',data:{modalitiesCount:modalities.length,modalities},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    return modalities;
};

/**
 * Retorna estatísticas agregadas dos treinamentos
 */
export const getTrainingStats = () => {
    const totalTrainings = trainings.length;
    const totalEnrolled = trainings.reduce((sum, t) => sum + t.enrolled, 0);
    const totalReviews = trainings.reduce((sum, t) => sum + t.reviews, 0);
    const averageRating = totalReviews > 0 
        ? (trainings.reduce((sum, t) => sum + (t.rating * t.reviews), 0) / totalReviews).toFixed(1)
        : '4.8';
    
    const stats = {
        totalTrainings,
        totalEnrolled,
        totalReviews,
        averageRating: parseFloat(averageRating)
    };
    
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/46d63257-3d3d-4b19-b340-327acd66351f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'trainingsData.js:getTrainingStats',message:'getTrainingStats called',data:stats,timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    
    return stats;
};
