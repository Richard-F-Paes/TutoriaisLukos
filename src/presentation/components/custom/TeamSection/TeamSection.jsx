import React from 'react';

export default function TeamSection() {
    const teamMembers = [
        {
            name: 'Eliezer',
            role: 'Especialistas em Treinamentos',
            image: 'https://images.pexels.com/photos/7681112/pexels-photo-7681112.jpeg'
        },
        {
            name: 'Ana ',
            role: 'Especialistas em Treinamentos',
            image: 'https://images.pexels.com/photos/7681561/pexels-photo-7681561.jpeg'
        },
        {
            name: 'Juliana Vieira',
            role: 'Especialistas em Treinamentos',
            image: 'https://images.pexels.com/photos/8191960/pexels-photo-8191960.jpeg'
        }
    ];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-medium text-slate-800 text-center">Nossa Equipe</h1>
                    <p className="text-slate-500 text-center mt-2">Equipe CS especialistas em treinamentos para os clientes</p>

                    <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="max-w-80 bg-black text-white rounded-2xl">
                                <div className="relative -mt-px overflow-hidden rounded-2xl">
                                    <img 
                                        src={member.image} 
                                        alt={member.name} 
                                        className="h-[300px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top" 
                                    />
                                    <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>
                                </div>
                                <div className="px-4 pb-6 text-center">
                                    <p className="mt-4 text-lg">{member.name}</p>
                                    <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#9938CA] to-[#E0724A] text-transparent bg-clip-text">
                                        {member.role}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

