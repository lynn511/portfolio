import content from '@/content/content.json'
import About from '@/components/About'
import Blog from '@/components/Blog'
import Contributions from '@/components/Contributions'
import Education from '@/components/Education'
import Experience from '@/components/Experience'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Nav from '@/components/Nav'
import Reveal from '@/components/ScrollReveal'
import Skills from '@/components/Skills'
import Work from '@/components/Work'
import Workshops from '@/components/Workshops'

export default function Home() {
  const { personal, socials, projects, blogs, workshops, contributions, skills, experience, education } =
    content

  return (
    <>
      <Nav />

      <main>
        <Hero name={personal.displayName} role={personal.role} />

        <Marquee />

        <Reveal className="bg-ink">
          <About
            bio={personal.bio}
            role={personal.role}
            displayName={personal.displayName}
            profileImage={personal.profileImage}
            skills={skills}
            socials={socials}
          />
        </Reveal>

        <Skills skills={skills} />

        <Reveal delay={0.1}>
          <Experience experience={experience} />
        </Reveal>

        <Reveal delay={0.1} className="bg-ink">
          <Education education={education} />
        </Reveal>

        <Reveal delay={0.1}>
          <Work projects={projects} />
        </Reveal>

        <Reveal delay={0.1} className="bg-ink">
          <Workshops workshops={workshops} />
        </Reveal>

        <Reveal delay={0.1}>
          <Blog posts={blogs} />
        </Reveal>

        <Reveal delay={0.1} className="bg-ink">
          <Contributions contributions={contributions} />
        </Reveal>
      </main>

      <Footer displayName={personal.displayName} socials={socials} />
    </>
  )
}
