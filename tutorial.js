/**
 * TUTORIAL.JS - FUNCIONALIDADES ESPECÍFICAS DE TUTORIAL
 * Gerencia navegação entre passos, progresso e interatividade
 */

// ========================================
// INICIALIZAÇÃO DO TUTORIAL
// ========================================

/**
 * Inicializa todas as funcionalidades do tutorial
 * Configura navegação, progresso e controles
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tutorial System - Carregado com sucesso!');
    
    // Inicializa funcionalidades
    initializeTutorialNavigation();
    initializeProgressTracking();
    initializeStepControls();
    initializeVideoPlaceholders();
});

// ========================================
// NAVEGAÇÃO ENTRE PASSOS
// ========================================

let currentStep = 1;
const totalSteps = 6;

/**
 * Inicializa sistema de navegação entre passos
 * Configura cliques nos botões e sidebar
 */
function initializeTutorialNavigation() {
    // Navegação pelos botões
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextStep = parseInt(this.getAttribute('data-next'));
            goToStep(nextStep);
        });
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevStep = parseInt(this.getAttribute('data-prev'));
            goToStep(prevStep);
        });
    });
    
    // Navegação pela sidebar
    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach(item => {
        item.addEventListener('click', function() {
            const stepNumber = parseInt(this.getAttribute('data-step'));
            goToStep(stepNumber);
        });
    });
}

/**
 * Navega para um passo específico
 * @param {number} stepNumber - Número do passo (1-6)
 */
function goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > totalSteps) return;
    
    // Esconde passo atual
    const currentStepElement = document.querySelector('.tutorial-step.active');
    if (currentStepElement) {
        currentStepElement.classList.remove('active');
        currentStepElement.style.opacity = '0';
        currentStepElement.style.transform = 'translateX(-20px)';
    }
    
    // Remove active da sidebar
    const currentSidebarItem = document.querySelector('.step-item.active');
    if (currentSidebarItem) {
        currentSidebarItem.classList.remove('active');
    }
    
    // Aguarda animação e mostra novo passo
    setTimeout(() => {
        // Mostra novo passo
        const newStepElement = document.getElementById(`step-${stepNumber}`);
        if (newStepElement) {
            newStepElement.classList.add('active');
            newStepElement.style.opacity = '1';
            newStepElement.style.transform = 'translateX(0)';
        }
        
        // Atualiza sidebar
        const newSidebarItem = document.querySelector(`.step-item[data-step="${stepNumber}"]`);
        if (newSidebarItem) {
            newSidebarItem.classList.add('active');
        }
        
        // Atualiza variável global
        currentStep = stepNumber;
        
        // Atualiza progresso
        updateProgress();
        
        // Scroll para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        console.log(`Navegou para o passo ${stepNumber}`);
        
    }, 300);
}

// ========================================
// CONTROLE DE PROGRESSO
// ========================================

/**
 * Inicializa sistema de acompanhamento de progresso
 * Configura barra de progresso e estatísticas
 */
function initializeProgressTracking() {
    updateProgress();
}

/**
 * Atualiza a barra de progresso baseada no passo atual
 * Calcula porcentagem e atualiza elementos visuais
 */
function updateProgress() {
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    
    // Atualiza barra de progresso
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = `${progressPercentage}%`;
    }
    
    // Atualiza texto de progresso
    const progressText = document.querySelector('.progress-text');
    if (progressText) {
        progressText.textContent = `${Math.round(progressPercentage)}% concluído`;
    }
    
    // Marca passos como concluídos
    markStepsAsCompleted();
}

/**
 * Marca passos anteriores como concluídos
 * Adiciona classes visuais para indicar progresso
 */
function markStepsAsCompleted() {
    const stepItems = document.querySelectorAll('.step-item');
    
    stepItems.forEach((item, index) => {
        const stepNumber = index + 1;
        
        if (stepNumber < currentStep) {
            item.classList.add('completed');
        } else if (stepNumber === currentStep) {
            item.classList.remove('completed');
            item.classList.add('active');
        } else {
            item.classList.remove('completed', 'active');
        }
    });
}

// ========================================
// CONTROLES DE PASSO
// ========================================

/**
 * Inicializa controles específicos de cada passo
 * Configura interações e validações
 */
function initializeStepControls() {
    // Atalhos de teclado
    document.addEventListener('keydown', function(e) {
        // Seta direita ou espaço = próximo passo
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            if (currentStep < totalSteps) {
                goToStep(currentStep + 1);
            }
        }
        
        // Seta esquerda = passo anterior
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if (currentStep > 1) {
                goToStep(currentStep - 1);
            }
        }
        
        // Teclas numéricas = passo direto
        if (e.key >= '1' && e.key <= '6') {
            e.preventDefault();
            const stepNumber = parseInt(e.key);
            goToStep(stepNumber);
        }
    });
    
    // Controles de conclusão de passo
    initializeStepCompletion();
}

/**
 * Inicializa sistema de conclusão de passos
 * Marca passos como concluídos quando necessário
 */
function initializeStepCompletion() {
    // Simula conclusão automática após tempo no passo
    let stepTimer;
    
    function startStepTimer() {
        clearTimeout(stepTimer);
        stepTimer = setTimeout(() => {
            markCurrentStepAsViewed();
        }, 10000); // 10 segundos
    }
    
    function markCurrentStepAsViewed() {
        const currentStepItem = document.querySelector(`.step-item[data-step="${currentStep}"]`);
        if (currentStepItem) {
            currentStepItem.classList.add('viewed');
        }
        
        showNotification('Passo visualizado! Continue para o próximo.');
    }
    
    // Inicia timer quando muda de passo
    startStepTimer();
}

// ========================================
// PLACEHOLDERS DE VÍDEO
// ========================================

/**
 * Inicializa placeholders de vídeo interativos
 * Simula reprodução de vídeos educativos
 */
function initializeVideoPlaceholders() {
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            playVideoPlaceholder(this);
        });
    });
}

/**
 * Simula reprodução de vídeo
 * @param {HTMLElement} placeholder - Elemento do placeholder
 */
function playVideoPlaceholder(placeholder) {
    // Adiciona classe de reprodução
    placeholder.classList.add('playing');
    
    // Muda ícone para pause
    const icon = placeholder.querySelector('i');
    if (icon) {
        icon.className = 'fas fa-pause-circle';
    }
    
    // Muda texto
    const text = placeholder.querySelector('p');
    if (text) {
        text.textContent = 'Reproduzindo vídeo...';
    }
    
    // Simula duração do vídeo
    setTimeout(() => {
        stopVideoPlaceholder(placeholder);
    }, 5000);
    
    showNotification('Reproduzindo vídeo educativo...');
}

/**
 * Para reprodução do vídeo placeholder
 * @param {HTMLElement} placeholder - Elemento do placeholder
 */
function stopVideoPlaceholder(placeholder) {
    placeholder.classList.remove('playing');
    
    // Volta ícone para play
    const icon = placeholder.querySelector('i');
    if (icon) {
        icon.className = 'fas fa-play-circle';
    }
    
    // Volta texto original
    const text = placeholder.querySelector('p');
    if (text) {
        text.textContent = text.getAttribute('data-original') || 'Vídeo Tutorial';
    }
    
    showNotification('Vídeo concluído!');
}

// ========================================
// UTILIDADES DO TUTORIAL
// ========================================

/**
 * Salva progresso do tutorial no localStorage
 * Permite continuar de onde parou
 */
function saveProgress() {
    const progressData = {
        currentStep: currentStep,
        completedSteps: getCompletedSteps(),
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('tutorialProgress', JSON.stringify(progressData));
    console.log('Progresso salvo:', progressData);
}

/**
 * Carrega progresso salvo do tutorial
 * Restaura estado anterior se existir
 */
function loadProgress() {
    const savedProgress = localStorage.getItem('tutorialProgress');
    
    if (savedProgress) {
        try {
            const progressData = JSON.parse(savedProgress);
            
            // Restaura passo atual
            if (progressData.currentStep) {
                goToStep(progressData.currentStep);
            }
            
            // Marca passos como concluídos
            if (progressData.completedSteps) {
                progressData.completedSteps.forEach(stepNumber => {
                    const stepItem = document.querySelector(`.step-item[data-step="${stepNumber}"]`);
                    if (stepItem) {
                        stepItem.classList.add('completed');
                    }
                });
            }
            
            showNotification('Progresso restaurado! Continue de onde parou.');
            console.log('Progresso carregado:', progressData);
            
        } catch (error) {
            console.error('Erro ao carregar progresso:', error);
        }
    }
}

/**
 * Obtém lista de passos concluídos
 * @returns {Array} Array com números dos passos concluídos
 */
function getCompletedSteps() {
    const completedItems = document.querySelectorAll('.step-item.completed');
    return Array.from(completedItems).map(item => 
        parseInt(item.getAttribute('data-step'))
    );
}

/**
 * Reseta progresso do tutorial
 * Volta ao início e limpa dados salvos
 */
function resetProgress() {
    // Limpa localStorage
    localStorage.removeItem('tutorialProgress');
    
    // Volta ao primeiro passo
    goToStep(1);
    
    // Remove classes de conclusão
    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach(item => {
        item.classList.remove('completed', 'viewed');
    });
    
    showNotification('Progresso resetado! Começando do início.');
    console.log('Progresso do tutorial resetado');
}

// ========================================
// EVENTOS GLOBAIS DO TUTORIAL
// ========================================

/**
 * Salva progresso automaticamente ao mudar de passo
 */
document.addEventListener('stepChanged', function() {
    saveProgress();
});

/**
 * Carrega progresso ao inicializar
 */
window.addEventListener('load', function() {
    setTimeout(() => {
        loadProgress();
    }, 1000);
});

/**
 * Salva progresso antes de sair da página
 */
window.addEventListener('beforeunload', function() {
    saveProgress();
});

// ========================================
// CONSOLE DE DEBUG
// ========================================

/**
 * Funções de debug disponíveis no console
 */
window.tutorialDebug = {
    goToStep: goToStep,
    resetProgress: resetProgress,
    saveProgress: saveProgress,
    loadProgress: loadProgress,
    getCurrentStep: () => currentStep,
    getCompletedSteps: getCompletedSteps
};

console.log(`
🎓 Tutorial System - Funcionalidades Ativas:
📝 Navegação: Setas, cliques, teclas numéricas
💾 Progresso: Auto-save e restore
🎬 Vídeos: Placeholders interativos
⌨️ Atalhos: ←/→ (navegar), 1-6 (passo direto), Espaço (próximo)

Debug: Use tutorialDebug no console para controles avançados
`);
