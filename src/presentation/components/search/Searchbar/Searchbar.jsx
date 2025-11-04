export default function Searchbar() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            <h1 className="text-3xl font-semibold text-center mx-auto">Categorias</h1>
            <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">
                Tutoriais
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-8 pt-12">
                <div className="max-w-150 w-full hover:-translate-y-0.5 transition duration-300">
                    <img className="rounded-xl" src="retaguarda.png" alt="" />
                    <h3 className="text-base text-slate-900 font-medium mt-3">Retaguarda </h3>
                    <p className="text-6x1 text-indigo-600 font-medium mt-1">UI/UX design</p>
                </div>
                <div className="max-w-150 w-full hover:-translate-y-0.5 transition duration-300">
                    <img className="rounded-xl" src="CaixaPDV.png" alt="" />
                    <h3 className="text-base text-slate-100 font-medium mt-3">PDV</h3>
                    <p className="text-xs text-indigo-600 font-medium mt-1">UI/UX design</p>
                </div>
                <div className="max-w-150 w-full hover:-translate-y-0.5 transition duration-300">
                    <img className="rounded-xl" src="Dashboard.png" alt="" />
                    <h3 className="text-base text-slate-100 font-medium mt-3">Dashboard</h3>
                    <p className="text-xs text-indigo-600 font-medium mt-1">UI/UX design</p>
                </div>
            </div>
        </>
    );
};