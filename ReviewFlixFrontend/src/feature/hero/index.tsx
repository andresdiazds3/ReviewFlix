import { useState } from 'react';
import heroBackdrop from './173fc2171fa9f9017432e7a7abdcfab3.jpg';

const Hero = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <section className="overflow-hidden bg-black">
            <header className="relative border-b border-white/10 bg-black/88 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <a href="#" title="ReviewFlix home" className="flex items-center gap-3">
                        <span className="text-lg font-semibold tracking-wide text-white sm:text-xl">
                            Review<span className="text-red-400">Flix</span>
                        </span>
                    </a>

                    <div className="flex md:hidden">
                        <button
                            type="button"
                            className="text-white transition hover:text-red-300"
                            onClick={() => setExpanded((current) => !current)}
                            aria-expanded={expanded}
                            aria-label="Toggle navigation"
                        >
                            {!expanded ? (
                                <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <nav className="hidden items-center gap-10 md:flex">
                        <a href="#description" className="text-sm font-medium text-zinc-300 transition hover:text-red-300">
                            Description
                        </a>
                        <a href="#team" className="text-sm font-medium text-zinc-300 transition hover:text-red-300">
                            Team
                        </a>
                        <a href="#footer" className="text-sm font-medium text-zinc-300 transition hover:text-red-300">
                            Contact
                        </a>
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-full border border-red-900/70 px-5 py-2 text-sm font-semibold text-red-200 transition hover:border-red-400 hover:text-white"
                        >
                            Log in
                        </button>
                    </nav>
                </div>

                {expanded && (
                    <nav className="border-t border-white/10 bg-black/80 md:hidden">
                        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6">
                            <a href="#description" className="text-sm font-medium text-zinc-300 transition hover:text-red-300">
                                How it works
                            </a>
                            <a href="#team" className="text-sm font-medium text-zinc-300 transition hover:text-red-300">
                                Team
                            </a>
                            <a href="#footer" className="text-sm font-medium text-zinc-300 transition hover:text-red-300">
                                Contact
                            </a>
                            <button
                                type="button"
                                className="mt-1 inline-flex w-fit items-center justify-center rounded-full border border-red-900/70 px-5 py-2 text-sm font-semibold text-red-200 transition hover:border-red-400 hover:text-white"
                            >
                                Log in
                            </button>
                        </div>
                    </nav>
                )}
            </header>

            <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
                <div className="relative z-10 max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-red-300">A home for movie reviews</p>
                    <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
                        Your next favorite movie starts with a
                        <span className="block bg-gradient-to-r from-red-500 via-rose-400 to-orange-300 bg-clip-text text-transparent">smarter review.</span>
                    </h1>
                    <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300 sm:text-xl">
                        ReviewFlix helps people rate movies, share honest opinions, build tier lists, and discover what is worth watching tonight.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <a
                            href="#description"
                            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-rose-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-red-950/30 transition hover:scale-[1.02] hover:from-red-400 hover:to-rose-400"
                        >
                            Explore the app
                        </a>
                        <a
                            href="#team"
                            className="inline-flex items-center justify-center rounded-full border border-red-900/70 px-7 py-3 text-sm font-semibold text-red-200 transition hover:border-red-400 hover:text-white"
                        >
                            Meet the team
                        </a>
                    </div>

                </div>

                <div className="relative -mr-4 flex items-stretch justify-center sm:-mr-6 lg:-mr-[12vw] lg:-mt-24 lg:justify-end">
                    <div className="absolute inset-6 rounded-[2rem] bg-gradient-to-br from-red-950/40 via-transparent to-orange-950/20 blur-3xl" />
                    <div className="relative h-[24rem] w-full overflow-hidden sm:h-[28rem] lg:h-[calc(100%+12rem)]">
                        <img
                            src={heroBackdrop}
                            alt="Movie scene"
                            className="absolute -top-8 -right-10 h-[122%] w-[124%] max-w-none object-cover object-right lg:-top-32 lg:-right-24 lg:h-[140%] lg:w-[132%]"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent" />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/90 to-transparent" />
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-black/70 blur-2xl" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/60 to-transparent" />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
