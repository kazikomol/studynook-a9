import { FaAward, FaPlay, FaUser } from "react-icons/fa";

const Details = () => {
    const featureItems = [
        {
            icon: <FaUser/>,
            title: 'User Freindly',
            desc: 'Everybody can smoothly book there own rooms',
        },
        {
            icon: <FaAward/>,
            title: 'Verified by officials',
            desc: 'Every rooms are monitored by offcials',
        },
        {
            icon: <FaPlay/>,
            title: 'ALL time access',
            desc: 'Student can access this website anytime.',
        },
    ]
    return (
        <section className="py-24 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="space-y-4 mb-16">
                    <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm">Our Benefits</h2>
                    <h3 className="text-4xl font-extrabold text-slate-900">Why Choose StudyNooks?</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {featureItems.map((f, i) => (
                        <div
                            key={i}
                            className="group p-8 bg-white border border-slate-200 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-center space-y-6"
                        >
                            <div className="mx-auto w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                                {f.icon}
                            </div>
                            <h4 className="text-xl font-bold">{f.title}</h4>
                            <p className="text-slate-500">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Details;