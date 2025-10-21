import React from 'react'
// Caminho de importação CORRETO, conforme sua estrutura de pastas
import InteractiveLesson from '../../components/InteractiveLesson/InteractiveLesson' 

// ====================================================================
// DADOS ESPECÍFICOS PARA O TUTORIAL DE PREÇO DE COMBUSTÍVEL
// ====================================================================
const tutorialCombustivel = {
    title: 'Tutorial: Lançamento e Atualização de Preços de Combustível',
    category: 'Operacional',
    difficulty: 'Intermediário',
    duration: '15:30',
    instructor: 'Gerente de Operações',
    description: 'Guia passo a passo para inserir e atualizar os preços dos combustíveis no sistema de retaguarda e frente de caixa.',
}

const stepsCombustivel = [
    {
        id: 0,
        title: 'No menu lateral navegar até Combustível > Preço Combustível',
        duration: '2:00',
      
        image: 'https://lh3.googleusercontent.com/sitesv/AICyYdYXoYsk_q64AwdSFf-xGREw0hRlxbolBcM72vnO_ooaaqw4UZM7s4cVC-vYh6sjEk4OH2dnQZmSNkMbY_hnXaCcx_wEE2bSpqVRD4b7ETMgqD3Ipnruah1_VGB43sJBxNgVLBP4-zc1thv7COP2qi6NXVQr_AqR0VkG0eovYj1C8c9NfPZqlhs5f4jRv8rDYGwQpYo0lUcgOaZPEBfA0bbkPb9kyrUGpQ=w1280',
        instructions: ['Pode tomar até cinco minutos para as bombas receberem a atualização de preço, é necessário que haja conexão de internet para a recepção dos novos valores".'],
        tips: ['É recomendável realizar essa operação fora dos horários de pico.'],
        commonMistakes: ['Tentar editar o preço de custo em vez do preço de venda.'],
    },
    
   
    // Adicione outros passos relevantes aqui (Ex: Diesel, Etanol)
]


const PrecoCombustivel = () => {
    return (
        <div className="p-8 bg-gray-50">
            {/* Passando os dados personalizados como PROPS. 
                Isso garante que o título, descrição e passos sejam 
                os definidos acima, e não os valores padrão.
            */}
            <InteractiveLesson 
                tutorial={tutorialCombustivel}
                steps={stepsCombustivel}
                backLink="/operacional/tutoriais"
            />
        </div>
    )
}

export default PrecoCombustivel