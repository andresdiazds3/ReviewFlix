const Footer = () => {
    return (
        <footer id="footer" className="border-t border-red-200 bg-white py-14 text-zinc-950 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-red-600">ReviewFlix</p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">Movies reviewed by people who care.</h2>
                    <p className="mt-4 text-base leading-8 text-zinc-600">
                        Find what to watch next, share your opinion, and keep the movie conversation going.
                    </p>
                </div>

                <div className="mt-10 max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">Stay connected</p>
                    <div className="mt-5 space-y-2 text-sm text-zinc-700">
                        <p>Instagram: dz_asap && jd_agudelo</p>
                        <p>Email: cesar_and.diaz@uao.edu.co && juan_dav.agudelo@uao.edu.co</p>
                        <p>Top categories: action, drama, horror, sci-fi</p>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-red-100 px-4 pt-6 text-sm text-zinc-500 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
                <p>© 2026 ReviewFlix. All rights reserved.</p>
                <p>Built as final project of Data Structures and Algorithms 2</p>
            </div>
        </footer>
    );
};

export default Footer;