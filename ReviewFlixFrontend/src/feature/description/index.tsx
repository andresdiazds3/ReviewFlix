const Description = () => {
    const steps = [
        {
            title: 'Rate every movie clearly',
            text: 'Give films a score, leave a review, and keep your watch history organized in one place.',
        },
        {
            title: 'Discover what is worth watching',
            text: 'See what the community is recommending before you commit to the next movie night.',
        },
        {
            title: 'Build tiers and collections',
            text: 'Group favorites by genre, mood, or franchise so your opinions stay easy to browse and share.',
        },
    ];

    return (
        <section id="description" className="bg-zinc-950 py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                    <div className="max-w-xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-red-300">Why ReviewFlix exists</p>
                        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                            A review app made for people who actually watch movies.
                        </h2>
                        <p className="mt-5 text-base leading-8 text-zinc-300 sm:text-lg">
                            ReviewFlix focuses on the parts movie fans care about most: honest opinions, fast browsing, and a clean way to compare what people thought about each title.
                        </p>
                        <p className="mt-8 text-lg text-white">Built for movie nights, watchlists, and strong opinions.</p>
                    </div>

                    <div className="space-y-8">
                        {steps.map((step) => (
                            <div key={step.title}>
                                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-zinc-400">{step.text}</p>
                            </div>
                        ))}
                        <p className="max-w-2xl text-base leading-7 text-zinc-300">
                            Every review should make it easier for the next person to choose. That is the core idea behind ReviewFlix: useful movie opinions, not just star counts.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Description;
