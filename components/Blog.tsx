import type { FC } from 'react'
import SectionHeading from './SectionHeading'

interface BlogPost {
  slug: string
  title: string
  date: string
  tags: string[]
  readingTime?: number
  url: string
}

interface Props {
  posts: BlogPost[]
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const Blog: FC<Props> = ({ posts }) => {
  return (
    <section id="blog" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Writing"
          heading="Blog"
          sub="Technical writing on AI, MLOps, and systems."
        />

        <div>
          {posts.map((post) => (
            <div
              key={post.slug}
              className="group relative border-b border-gray-100 dark:border-white/10 last:border-0"
            >
              {/* Sliding orange left bar — 3px wide, 60% tall, grows from top */}
              <div className="absolute left-0 top-[20%] w-[3px] h-[60%] bg-brand-orange rounded-full origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />

              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 py-5 pl-0 group-hover:pl-3 transition-all duration-300"
              >
                {/* Left: date + title */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 flex-1 min-w-0">
                  <span className="text-xs text-gray-400 dark:text-blue-300 tabular-nums whitespace-nowrap flex-shrink-0">
                    {formatDate(post.date)}
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-white group-hover:text-brand-orange transition-colors sm:truncate">
                    {post.title}
                  </span>
                </div>

                {/* Right: tags + reading time */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2 py-0.5 rounded-full border border-brand-orange text-brand-orange"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {post.readingTime && (
                    <span className="text-xs text-gray-400 dark:text-blue-300 whitespace-nowrap hidden sm:block">
                      {post.readingTime} min
                    </span>
                  )}
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog
