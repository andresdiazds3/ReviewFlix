const Team = () => {
    const members = [
        {
            name: 'Cesar Andres Diaz Jimenez',
            role: 'FullStack Developer',
            description: 'Designs and connects frontend and backend features to deliver a smooth end-to-end experience.',
        },
        {
            name: 'Juan David Agudelo Diago ',
            role: 'FrontEnd Developer',
            description: 'Builds the visual language and makes the interface feel polished on every screen.',
        },
        {
            name: 'Bryan Stiven Gomez Taborda',
            role: 'Python Developer',
            description: 'Builds intelligent data workflows and recommendation logic to personalize movie discovery.'
        }
    ];

    return (
        <section id="team" className="bg-black py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-red-300">Team</p>
                    <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">The people shaping ReviewFlix.</h2>
                    <p className="mt-5 text-base leading-8 text-zinc-300 sm:text-lg">
                        A small crew focused on making movie reviews feel social, fast, and easy to trust.
                    </p>
                </div>

                <div className="mt-12 space-y-8 md:grid md:grid-cols-3 md:gap-8 md:space-y-0">
                    {members.map((member) => (
                        <div key={member.name}>
                            <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                            <p className="mt-1 text-sm font-medium text-red-300">{member.role}</p>
                            <p className="mt-3 text-sm leading-7 text-zinc-400">{member.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;