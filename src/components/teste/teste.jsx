import React from "react";

const Teste = () => {
    return (
    
<div>
    <img src="https://i.pinimg.com/1200x/46/82/f7/4682f7c6fd4179d7376592ce652fc6c9.jpg" alt="Placeholder" className="w-10  object-cover rounded-lg" />
    <div className="w-full h-">
        <h2 className="text-2xl font-bold">Title</h2>
        <p className="text-gray-600">Description</p>
    </div>

    <div className="w-[100vw] h-[50vh] mb-40 bg-white rounded-lg shadow-md">
        <div className="w-10 h-10 bg-red-500 rounded-lg">
        <img src="https://i.pinimg.com/1200x/46/82/f7/4682f7c6fd4179d7376592ce652fc6c9.jpg" alt="Placeholder" className=" w-[50v]  h-[100%	] object-cover rounded-lg" />


        </div>
    </div>
</div>
        );
    };

    export default Teste;