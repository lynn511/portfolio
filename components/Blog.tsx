import Image from 'next/image'
import type { FC } from 'react'
import SectionHeader from './SectionHeading'
import Reveal from './ScrollReveal'

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
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const Blog: FC<Props> = ({ posts }) => {
  return (
    <section id="blog" className="py-24 px-6 border-t border-hairline">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <SectionHeader
            eyebrow="Writing"
            heading="Blog"
            sub="Technical writing on AI, MLOps, and systems."
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.07}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col border-[1.5px] border-ink overflow-hidden bg-paper hover:border-green-deep motion-safe:hover:-translate-y-[5px] motion-safe:transition-all duration-300 ease-brand h-full focus-ring"
                style={i === 0 ? { borderLeftWidth: '4px', borderLeftColor: '#00C24A', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopRightRadius: '6px', borderBottomRightRadius: '6px' } : { borderRadius: '6px' }}
              >
                {/* Cover image */}
                <div className="relative aspect-video overflow-hidden shrink-0">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover motion-safe:group-hover:scale-[1.04] motion-safe:transition-transform duration-500 ease-brand"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-ink flex items-center justify-center">
                      <span className="text-paper/20 font-heading font-semibold text-6xl select-none">
                        {post.title[0]}
                      </span>
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5 gap-2">
                  <p className="text-[11px] font-heading text-muted tabular-nums">
                    {formatDate(post.date)}
                    {post.readingTime && (
                      <span className="ml-3">{post.readingTime} min read</span>
                    )}
                  </p>

                  <h3 className="font-heading font-semibold text-[15px] tracking-[-0.01em] leading-snug text-ink group-hover:text-green-deep transition-colors duration-200">
                    {post.title}
                  </h3>

                  {post.description && (
                    <p className="text-[13px] text-muted leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-[3px] border border-hairline font-heading font-semibold uppercase tracking-[0.1em] text-faint"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog
