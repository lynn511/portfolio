import Image from 'next/image'
import type { FC } from 'react'
import SectionHeading from './SectionHeading'

interface BlogPost {
  slug: string
  title: string
  date: string
  description?: string
  coverImage?: string
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

const GRADIENT_FALLBACKS = [
  'from-brand-blue/80 to-brand-blue',
  'from-brand-orange/70 to-brand-orange/90',
  'from-slate-700 to-slate-900',
  'from-indigo-700 to-brand-blue',
  'from-amber-700 to-brand-orange',
]

const Blog: FC<Props> = ({ posts }) => {
  return (
    <section id="blog" className="py-24 px-6 bg-gray-50 dark:bg-white/5">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Writing"
          heading="Blog"
          sub="Technical writing on AI, MLOps, and systems."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <a
              key={post.slug}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white dark:bg-white/5 rounded-2xl overflow-hidden border-2 border-transparent hover:border-brand-orange transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:hover:shadow-black/40"
            >
              {/* Cover image — 16:9 */}
              <div className="relative aspect-video overflow-hidden">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${GRADIENT_FALLBACKS[i % GRADIENT_FALLBACKS.length]} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}
                  >
                    <span className="text-white/30 font-heading font-black text-6xl select-none">
                      {post.title[0]}
                    </span>
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="p-5 flex flex-col gap-2">
                {/* Date + read time */}
                <p className="text-xs text-gray-400 dark:text-blue-300 tabular-nums">
                  {formatDate(post.date)}
                  {post.readingTime && (
                    <span className="ml-3">{post.readingTime} min read</span>
                  )}
                </p>

                {/* Title */}
                <h3 className="font-heading font-bold text-gray-900 dark:text-white leading-snug group-hover:text-brand-orange transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                {post.description && (
                  <p className="text-sm text-gray-500 dark:text-blue-100 leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-0.5 rounded-full border border-brand-orange text-brand-orange bg-brand-orange/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog
