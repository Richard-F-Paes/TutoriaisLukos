import React, { useState } from 'react';

const Accordion = ({ children }) => {
  return <div className="w-full">{children}</div>;
};

const AccordionItem = ({ value, openItem, setOpenItem, children, className = '' }) => {
  return (
    <div className={className} data-value={value}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        if (child.type.displayName === 'AccordionTrigger') {
          return React.cloneElement(child, {
            open: openItem === value,
            onClick: () => setOpenItem(openItem === value ? null : value),
          });
        }
        if (child.type.displayName === 'AccordionContent') {
          return React.cloneElement(child, { open: openItem === value });
        }
        return child;
      })}
    </div>
  );
};

const AccordionTrigger = ({ children, onClick, open, className = '' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full py-4 text-left font-medium flex items-center justify-between text-slate-900 ${className}`}
    >
      <span>{children}</span>
      <span className={`transition-transform ${open ? 'rotate-180' : ''} text-slate-500`}>▼</span>
    </button>
  );
};
AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = ({ children, open, className = '' }) => {
  return (
    <div className={`overflow-hidden transition-[max-height,opacity] duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} ${className}`}>
      <div className="pb-4">{children}</div>
    </div>
  );
};
AccordionContent.displayName = 'AccordionContent';

const FAQSection = () => {
  const [openItem, setOpenItem] = useState(null);

  return (
    <section className="py-20 bg-white" id="contato">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-purple-700 mb-3">Perguntas Frequentes</div>
          <h2 className="mb-4">Dúvidas Comuns Sobre o Sistema</h2>
          <p className="text-slate-600">Encontre respostas rápidas para as principais questões</p>
        </div>

        <Accordion>
          <AccordionItem value="item-1" openItem={openItem} setOpenItem={setOpenItem} className="border border-purple-200 rounded-lg mb-4 px-6">
            <AccordionTrigger className="hover:no-underline">Como faço o primeiro login no sistema?</AccordionTrigger>
            <AccordionContent className="text-slate-600">
              Acesse o endereço fornecido pela LUKOS (ex: seuposto.lukos.com.br) e utilize o usuário e senha padrão fornecidos no email de boas-vindas. Recomendamos alterar a senha no primeiro acesso.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" openItem={openItem} setOpenItem={setOpenItem} className="border border-purple-200 rounded-lg mb-4 px-6">
            <AccordionTrigger className="hover:no-underline">O sistema funciona offline?</AccordionTrigger>
            <AccordionContent className="text-slate-600">
              Sim! O PDV possui modo offline que permite continuar vendendo mesmo sem internet. Quando a conexão retornar, os dados serão sincronizados automaticamente.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" openItem={openItem} setOpenItem={setOpenItem} className="border border-purple-200 rounded-lg mb-4 px-6">
            <AccordionTrigger className="hover:no-underline">Como cadastro novos produtos?</AccordionTrigger>
            <AccordionContent className="text-slate-600">
              Acesse Menu &gt; Cadastros &gt; Produtos. Preencha os campos obrigatórios (código, descrição, preço) e salve. Você pode importar produtos via planilha Excel para cadastro em lote.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" openItem={openItem} setOpenItem={setOpenItem} className="border border-purple-200 rounded-lg mb-4 px-6">
            <AccordionTrigger className="hover:no-underline">Como emito nota fiscal eletrônica?</AccordionTrigger>
            <AccordionContent className="text-slate-600">
              O sistema possui integração completa com NF-e, NFC-e e SAT. A emissão é automática após a venda. Para NF-e com dados do cliente, solicite CPF/CNPJ antes de finalizar.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" openItem={openItem} setOpenItem={setOpenItem} className="border border-purple-200 rounded-lg mb-4 px-6">
            <AccordionTrigger className="hover:no-underline">Como controlo o estoque de combustível?</AccordionTrigger>
            <AccordionContent className="text-slate-600">
              O sistema atualiza automaticamente o estoque a cada venda. Para recebimentos, registre a nota fiscal do fornecedor. Faça aferições periódicas para conferir diferenças.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" openItem={openItem} setOpenItem={setOpenItem} className="border border-purple-200 rounded-lg mb-4 px-6">
            <AccordionTrigger className="hover:no-underline">Tem suporte técnico disponível?</AccordionTrigger>
            <AccordionContent className="text-slate-600">
              Sim! Oferecemos suporte 24/7 via chat, WhatsApp e telefone. Também temos uma base de conhecimento completa com artigos e vídeos tutoriais.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;


