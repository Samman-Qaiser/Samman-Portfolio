import { motion } from 'framer-motion';
import { SiNextdotjs, SiTailwindcss, SiFramer, SiTypescript } from 'react-icons/si';

const skills = [
  { name: 'Next.js', icon: <SiNextdotjs />, level: 'Expert', desc: 'Server-side Rendering & App Router' },
  { name: 'TypeScript', icon: <SiTypescript />, level: 'Advanced', desc: 'Type-safe scalable applications' },
  { name: 'Framer Motion', icon: <SiFramer />, level: 'Master', desc: 'High-end production animations' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 'Expert', desc: 'Modern utility-first styling' },
];

export default function PremiumSkills() {
  return (
    <section className="py-24 bg-[#050505] text-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header with Reveal Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 border-l-4 border-emerald-500 pl-6"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-4">
            Technical <span className="text-zinc-500 italic">Arsenal</span>
          </h2>
          <p className="max-w-xl text-zinc-400 text-lg">
            Crafting digital experiences using industry-leading technologies and award-winning practices.
          </p>
        </motion.div>

        {/* The Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 0.98, y: -5 }}
              className="relative group p-8 rounded-3xl bg-zinc-900/50 border border-white/10 backdrop-blur-xl overflow-hidden cursor-pointer"
            >
              {/* Background Glow Effect */}
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500" />
              
              <div className="text-4xl mb-6 text-emerald-500">{skill.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{skill.name}</h3>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-500/80 mb-4 block">
                {skill.level}
              </span>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {skill.desc}
              </p>

              {/* Reveal Link on Hover */}
              <motion.div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs underline underline-offset-4">VIEW PROJECTS</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}