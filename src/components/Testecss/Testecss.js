export default function Example() {
  return (
    <section className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-500),transparent)] opacity-10" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gray-900 shadow-xl ring-1 shadow-indigo-500/5 ring-white/5 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <img
          alt=""
          className="mx-auto h-12"
        />
        <figure className="mt-10">
          <blockquote className="text-center text-xl/8 font-semibold text-white sm:text-2xl/9">
            <p>
            Lukos Tutoriais é uma plataforma dedicada a fornecer tutoriais detalhados e acessíveis para ajudar os usuários a aproveitar ao máximo o sistema Lukos. Nossa missão é simplificar o aprendizado e capacitar os usuários com conhecimento prático.
            </p>
          </blockquote>
          <figcaption className="mt-10">
            <img
              alt=""
              src="logo.png"
              className="mx-auto h-12"
            />
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div className="font-semibold text-white">Lukos</div>
              <svg width={3} height={3} viewBox="0 0 2 2" aria-hidden="true" className="fill-white">
                <circle r={1} cx={1} cy={1} />
              </svg>
              <div className="text-gray-400 w-24">Tecnologia</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
