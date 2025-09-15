// UserProfile.js
import React from 'react'; // Importa a biblioteca React

// Define um componente de função chamado UserProfile
function UserProfile(props) {
  // Dentro do return, você escreve o JSX
  // JSX é uma extensão de sintaxe para JavaScript que se parece com HTML
  return (
    <div className="user-profile"> {/* Note o uso de className em vez de class */}
      <h2>{props.name}</h2> {/* Acessa as props passadas para o componente */}
      <p>Email: {props.email}</p>
    </div>
  );
}

export default UserProfile; // Exporta o componente para ser usado em outros lugares