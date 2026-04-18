import Image from 'next/image'
import type { FC } from 'react'
import SectionHeading from './SectionHeading'

interface Workshop {
  title: string
  organizer: string
  description: string
  link: string
  photo: string
}

interface Props {
  workshops: Workshop[]
}

const Workshops: FC<Props> = ({ workshops }) => {
  return (
    <section id="workshops" className="py-24 px-6 bg-gray-50 dark:bg-white/5">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Teaching"
          heading="Workshops"
          sub="Hands-on AI sessions across universities and organisations."
        />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-8">
          {workshops.map((w) => (
            <a
              key={w.title}
              href={w.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white dark:bg-white/5 rounded-2xl overflow-hidden border-2 border-transparent hover:border-brand-orange transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:hover:shadow-black/40"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={w.photo}
                  alt={w.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold text-brand-orange uppercase tracking-widest mb-1">
                  {w.organizer}
                </p>
                <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2">
                  {w.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-blue-100 leading-relaxed">
                  {w.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Workshops
