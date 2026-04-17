import type { FC } from 'react'
import SectionHeading from './SectionHeading'

interface Project {
  id: string
  title: string
  shortDescription: string
  categories: string[]
  techStack: string[]
  links: {
    liveDemo?: string
    article?: string
    github?: string
  }
}

interface Props {
  projects: Project[]
}

const Work: FC<Props> = ({ projects }) => {
  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Projects"
          heading="Selected Work"
          sub="Things I've built and shipped."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => {
            const isOrange = i % 2 === 0
            const accentText = isOrange ? 'text-brand-orange' : 'text-brand-blue dark:text-blue-300'
            const accentBg = isOrange ? 'bg-brand-orange' : 'bg-brand-blue'
            const tags = [...project.categories, ...project.techStack].slice(0, 5)
            const num = String(i + 1).padStart(2, '0')

            return (
              <article
                key={project.id}
                className="group relative p-8 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl hover:border-transparent transition-all duration-300 hover:shadow-xl dark:hover:shadow-black/40"
              >
                <span className={`font-heading text-5xl font-black leading-none mb-4 block ${accentText}`}>
                  {num}
                </span>

                <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-3 orange-sweep">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-blue-100 text-sm leading-relaxed mb-5">
                  {project.shortDescription}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-blue-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 text-sm">
                  {project.links.liveDemo && (
                    <a
                      href={project.links.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-medium hover:opacity-75 transition-opacity ${accentText}`}
                    >
                      Live demo ↗
                    </a>
                  )}
                  {project.links.article && (
                    <a
                      href={project.links.article}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium transition-colors hover:text-brand-orange text-gray-500 dark:text-blue-200"
                    >
                      Article ↗
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium transition-colors hover:text-brand-orange text-gray-500 dark:text-blue-200"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>

                <div
                  className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl ${accentBg}`}
                />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Work
