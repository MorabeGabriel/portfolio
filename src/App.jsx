import { useEffect, useRef, useState } from 'react'
import { profile, projects, skills, certifications, education } from './data'
import Background from './Background.jsx'
import Reveal from './Reveal.jsx'

const lift = 'transition duration-200 hover:-translate-y-0.5'
const btn = `${lift} inline-block border border-accent px-4 py-2 text-strong hover:bg-accent hover:text-[#16181d]`
const ghost = `${lift} inline-block border border-line px-4 py-2 text-strong hover:border-accent`
const btnSm = 'px-3 py-1 text-[15px]'
const glow = 'hover:[box-shadow:0_14px_34px_-14px_color-mix(in_srgb,var(--accent)_65%,transparent)]'

function useThemeToggle() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') } catch { return null }
  })
  useEffect(() => {
    const root = document.documentElement
    if (theme) root.setAttribute('data-theme', theme)
    try { if (theme) localStorage.setItem('theme', theme) } catch { /* storage unavailable */ }
  }, [theme])
  return () => {
    const dark = theme ? theme === 'dark' : !window.matchMedia('(prefers-color-scheme: light)').matches
    setTheme(dark ? 'light' : 'dark')
  }
}

function ScrollProgress() {
  const bar = useRef(null)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  }, [])
  return <div ref={bar} aria-hidden="true" className="fixed inset-x-0 top-0 z-20 h-0.5 origin-left scale-x-0 bg-accent" />
}

function Heading({ id, children }) {
  return (
    <h2
      id={id}
      className="mb-8 flex items-center gap-4 text-[32px] font-medium text-strong before:text-accent before:content-['#'] after:max-w-[220px] after:flex-1 after:border-t after:border-accent after:content-[''] max-md:text-[26px]"
    >
      {children}
    </h2>
  )
}

function Section({ id, title, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-14 max-md:py-10">
      <Reveal><Heading id={`${id}-title`}>{title}</Heading></Reveal>
      {children}
    </section>
  )
}

function Header() {
  const toggle = useThemeToggle()
  const links = ['projects', 'skills', 'certifications', 'about', 'contact']
  return (
    <header className="z-10 md:sticky md:top-0 border-b border-transparent backdrop-blur-md [background:color-mix(in_srgb,var(--bg)_78%,transparent)]">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-[18px]">
        <a href="#home" className="font-semibold text-strong before:mr-2 before:inline-block before:h-3 before:w-3 before:bg-accent before:transition-transform before:duration-300 before:content-[''] hover:before:rotate-90">
          {profile.short}
        </a>
        <nav aria-label="Main" className="flex flex-wrap gap-5">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l}`}
              className="relative transition-colors before:text-accent before:content-['#'] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:text-strong hover:after:w-full"
            >
              {l === 'about' ? 'about-me' : l}
            </a>
          ))}
        </nav>
        <button type="button" onClick={toggle} aria-label="Switch between light and dark theme" className="border border-line px-2.5 py-0.5 text-[13px] transition-colors hover:border-accent hover:text-strong">
          theme
        </button>
      </div>
    </header>
  )
}

function Hero() {
  const d = (ms) => ({ animationDelay: `${ms}ms` })
  return (
    <section aria-labelledby="hero-title" className="grid items-center gap-12 pb-14 pt-[72px] md:grid-cols-[1.4fr_1fr] max-md:pt-10">
      <div>
        <p className="mb-4 animate-fade-up text-sm text-accent" style={d(0)}>
          &gt; hello, world<span aria-hidden="true" className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-accent" />
        </p>
        <h1 id="hero-title" className="animate-fade-up text-[34px] font-medium leading-tight text-strong max-md:text-[26px]" style={d(120)}>
          {profile.short} is a <em className="not-italic text-accent">{profile.field}</em> student looking for an internship
        </h1>
        <p className="my-5 max-w-[48ch] animate-fade-up" style={d(240)}>{profile.intro}</p>
        <div className="flex animate-fade-up flex-wrap gap-2" style={d(360)}>
          <a className={btn} href="#contact">Contact me</a>
          <a className={ghost} href="#projects">See my projects</a>
          {profile.cvUrl && <a className={ghost} href={profile.cvUrl} target="_blank" rel="noopener noreferrer">Download CV</a>}
        </div>
      </div>

      <div className="relative max-w-[260px] animate-fade-up" style={d(300)}>
        <span aria-hidden="true" className="pointer-events-none absolute -left-9 -top-9 h-16 w-16 animate-drift border border-accent opacity-60" />
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-6 left-24 h-9 w-9 animate-drift border border-line opacity-70 [animation-delay:-4s]" />
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-9 -right-8 h-24 w-24 opacity-60 [background-image:radial-gradient(var(--line)_1.5px,transparent_1.5px)] [background-size:14px_14px]" />
        <div className="relative animate-float">
          <img
            src="/images/gabriel.png"
            alt={`Portrait of ${profile.name}`}
            width="150"
            height="150"
            className="relative block h-[150px] w-[150px] border border-line bg-card object-cover transition duration-300 hover:border-accent hover:[box-shadow:0_0_26px_color-mix(in_srgb,var(--accent)_45%,transparent)]"
          />
          <div className="relative -mt-px border border-line bg-card px-3 py-2 text-sm before:mr-2.5 before:inline-block before:h-3 before:w-3 before:animate-pulse before:bg-accent before:align-[-1px] before:content-['']">
            Seeking <b className="font-medium text-strong">{profile.status}</b> {profile.statusRest}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ p }) {
  return (
    <article className={`group border border-line bg-card transition duration-300 hover:-translate-y-1 hover:border-accent ${glow}`}>
      {p.image && (
        <div className="overflow-hidden border-b border-line">
          <img src={p.image} alt={p.alt} className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.04]" loading="lazy" />
        </div>
      )}
      <div className="border-b border-line px-3 py-1 text-sm">{p.stack}</div>
      <div className="px-3 pb-3.5 pt-4">
        <h3 className="text-2xl font-medium text-strong">{p.title}</h3>
        <p className="my-2 mb-3.5 text-[15px]">{p.summary}</p>
        {p.bullets?.length > 0 && (
          <ul className="mb-4 list-disc pl-[18px] text-sm">
            {p.bullets.map((b) => <li key={b} className="mb-1.5">{b}</li>)}
          </ul>
        )}
        <div className="flex flex-wrap gap-2.5">
          {p.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={`${l.primary ? btn : ghost} ${btnSm}`}>{l.label}</a>
          ))}
        </div>
      </div>
    </article>
  )
}

function BoxGrid({ children }) {
  return <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] items-start gap-6">{children}</div>
}

function Box({ title, children, small, index = 0 }) {
  return (
    <Reveal delay={index * 90}>
      <div className={`border border-line bg-card transition duration-300 hover:-translate-y-1 hover:border-accent ${glow}`}>
        <h3 className="border-b border-line px-3 py-1.5 text-base font-semibold text-strong">{title}</h3>
        <p className="px-3 py-2 text-[15px]">{children}</p>
        {small && <small className="block px-3 pb-2.5 text-[13px]">{small}</small>}
      </div>
    </Reveal>
  )
}

export default function App() {
  return (
    <>
      <Background />
      <ScrollProgress />
      <Header />
      <main id="home" className="mx-auto max-w-5xl px-6">
        <Hero />

        <Section id="projects" title="projects">
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 120} className="self-start">
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="skills" title="skills">
          <BoxGrid>{skills.map((s, i) => <Box key={s.title} index={i} title={s.title}>{s.items}</Box>)}</BoxGrid>
        </Section>

        <Section id="certifications" title="certifications">
          <BoxGrid>
            {certifications.map((c, i) => <Box key={c.title} index={i} title={c.title} small={c.date}>{c.issuer}</Box>)}
          </BoxGrid>
        </Section>

        <Section id="about" title="about-me">
          <div className="grid items-start gap-10 md:grid-cols-[1.3fr_1fr]">
            <Reveal className="max-w-[60ch] space-y-4">
              {profile.about.map((t) => <p key={t}>{t}</p>)}
            </Reveal>
            <Reveal delay={140}>
              <aside className="border border-line bg-card p-4">
                <h3 className="mb-2 text-base font-semibold text-strong">Education</h3>
                {education.map((e) => (
                  <p key={e.title} className="mb-2.5 text-[15px]">{e.title}<br />{e.note}</p>
                ))}
              </aside>
            </Reveal>
          </div>
        </Section>

        <Section id="contact" title="contact">
          <div className="grid items-start gap-10 md:grid-cols-[1.3fr_1fr]">
            <Reveal><p>{profile.contactText}</p></Reveal>
            <Reveal delay={140}>
              <div className="border border-line bg-card p-4 text-[15px]">
                <h3 className="mb-2.5 text-base font-semibold text-strong">Message me here</h3>
                <p className="my-1"><a href={`mailto:${profile.email}`} className="transition-colors hover:text-strong">{profile.email}</a></p>
                <p className="my-1"><a href={profile.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-strong">{profile.github.replace('https://', '')}</a></p>
                <p className="my-1">{profile.location}</p>
              </div>
            </Reveal>
          </div>
        </Section>
      </main>

      <footer className="border-t border-line pb-9 pt-7 text-[15px]">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-4 px-6">
          <div><span className="font-semibold text-strong">{profile.name}</span><br />BS Computer Science student, Holy Angel University</div>
          <div>© 2026 {profile.name}</div>
        </div>
      </footer>
    </>
  )
}
