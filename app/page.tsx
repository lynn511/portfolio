import content from '@/content/content.json'
import About from '@/components/About'
import Blog from '@/components/Blog'
import Contributions from '@/components/Contributions'
import Education from '@/components/Education'
import Experience from '@/components/Experience'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Nav from '@/components/Nav'
import ScrollReveal from '@/components/ScrollReveal'
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

        <ScrollReveal>
          <About
            bio={personal.bio}
            role={personal.role}
            displayName={personal.displayName}
            profileImage={personal.profileImage}
            skills={skills}
            socials={socials}
          />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <Experience experience={experience} />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <Education education={education} />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <Work projects={projects} />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <Workshops workshops={workshops} />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <Blog posts={blogs} />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <Contributions contributions={contributions} />
        </ScrollReveal>
      </main>

      <Footer displayName={personal.displayName} socials={socials} />
    </>
  )
}
