import React from 'react'
// Caminho de importação CORRETO, conforme sua estrutura de pastas
import InteractiveLesson from '../../../components/content/InteractiveLesson/InteractiveLesson.jsx' 

// ====================================================================
// DADOS ESPECÍFICOS PARA O TUTORIAL DE GERAÇÃO DE SENHA
// ====================================================================
const tutorialGeradorSenha = {
    title: 'Tutorial: Como Usar o Gerador de Senhas Seguras',
    category: 'Segurança',
    difficulty: 'Iniciante',
    duration: '05:00',
    instructor: 'Especialista em Segurança',
    description: 'Aprenda a criar senhas fortes e únicas para todas as suas contas usando nossa ferramenta de geração de senhas.',
}

const stepsGeradorSenha = [
    {
        id: 0,
        title: 'Definir Parâmetros de Segurança',
        duration: '1:30',
        videoUrl: 'https://www.youtube.com/embed/EXEMPLO_VIDEO_SENHA_1',
        image: 'https://lh3.googleusercontent.com/sitesv/AICyYdZNzfMczFwv36RJFiqk1dfnv2VY9cBXZqm4mjIoda1Mhyf74EFiKPdLaFIc4Te2Jx464yjkZZftrO9r8j7Y9m-2C-rYENBCc0BxgzPSTJyFva61JFO77rRYIMBj_PM7_1KYVlAm-w06r-dl69NhHEDVWHnuF-xuwRMO2sRI-Zgkq2nfoho3e8qGLGo=w1280',
        instructions: [
            '1. Na página inicial do dashboard descer até o final da página e clicar no botão "Copiar senha temporária"',
            '2. Esta senha expira quando os minutos atingem a casa da dezena, por exemplo:',
            '3. Se foi gerado as 12:00, vai ser possível utilizar até as 12:10.',
            '4. Se foi gerado as 12:09, vai ser possível utilizar até as 12:10 também.'
        ],
        tips: ['Senhas longas (mais de 15 caracteres) são mais seguras que senhas complexas.'],
        commonMistakes: ['Usar datas de nascimento ou nomes próprios na senha.'],
    },
    {
        id: 1,
        title: 'A senha pode ser enviada diretamente colando no chat do WhatsApp.',
        duration: '2:00',
        videoUrl: 'https://www.youtube.com/embed/EXEMPLO_VIDEO_SENHA_2',
        image: 'https://lh3.googleusercontent.com/sitesv/AICyYdaoIPfT4rqk22dszGeMIvtJ4NwNxfDMAJprHpGPEbbZ4RIVRdDqCPJOnH6N9z_t4C2IwFFolFhuqq6myQWQOu4ha6PZmtgIDMUPphhGlZyEGixhRw3aLva9Fgb0K5Sm3bbs5nY3YLa-Nvkz5-MQz0jfKSdE20USnFujiRb6kIN85C2oSwPZ-IBSwoXukNnUgwsBvXqU4jRH1KvesWi6URUnZzAg9tveYKRbYUs=w1280',
        instructions: [
            
        ],
        tips: ['Sempre use a função de cópia para evitar erros de digitação.'],
        commonMistakes: ['Tentar memorizar e digitar a senha manualmente.'],
    },
    {
        id: 2,
        title: 'Salvar e Usar a Nova Senha',
        duration: '1:30',
        videoUrl: 'https://www.youtube.com/embed/EXEMPLO_VIDEO_SENHA_3',
        image: 'http://googleusercontent.com/profile/picture/8',
        instructions: [
            '1. Cole a senha no campo de cadastro ou alteração de senha do seu aplicativo/site.',
            '2. Salve a senha em um gerenciador de senhas seguro (ex: LastPass, 1Password).',
            '3. Exclua a senha da área de transferência após o uso.'
        ],
        tips: ['Nunca salve senhas em arquivos de texto ou planilhas desprotegidas.'],
        commonMistakes: ['Reutilizar a senha gerada em múltiplos sistemas.'],
    },
]


const GeradorSenha = () => {
    return (
        <div className="p-8 bg-gray-50">
            {/*
                Passando os dados personalizados como PROPS.
                O InteractiveLesson irá carregar o Tutorial de Geração de Senha.
            */}
            <InteractiveLesson 
                tutorial={tutorialGeradorSenha}
                steps={stepsGeradorSenha}
                backLink="/seguranca/ferramentas" // Define um link de volta específico para segurança
            />
        </div>
    )
}

export default GeradorSenha