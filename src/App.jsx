import { useEffect, useState } from 'react'
import { profile, projects, skills, certifications, education } from './data'

const btn = 'inline-block border border-accent px-4 py-2 text-strong hover:bg-accent hover:text-[#16181d]'
const ghost = 'inline-block border border-line px-4 py-2 text-strong hover:border-accent'
const btnSm = 'px-3 py-1 text-[15px]'

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
      <Heading id={`${id}-title`}>{title}</Heading>
      {children}
    </section>
  )
}

function Header() {
  const toggle = useThemeToggle()
  const links = ['projects', 'skills', 'certifications', 'about', 'contact']
  return (
    <header className="sticky top-0 z-10 bg-page">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-[18px]">
        <a href="#home" className="font-semibold text-strong before:mr-2 before:inline-block before:h-3 before:w-3 before:bg-accent before:content-['']">
          {profile.short}
        </a>
        <nav aria-label="Main" className="flex flex-wrap gap-5">
          {links.map((l) => (
            <a key={l} href={`#${l}`} className="before:text-accent before:content-['#'] hover:text-strong">
              {l === 'about' ? 'about-me' : l}
            </a>
          ))}
        </nav>
        <button type="button" onClick={toggle} aria-label="Switch between light and dark theme" className="border border-line px-2.5 py-0.5 text-[13px] hover:border-accent">
          theme
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="grid items-center gap-10 pb-14 pt-[72px] md:grid-cols-[1.4fr_1fr] max-md:pt-10">
      <div>
        <h1 id="hero-title" className="text-[32px] font-medium leading-tight text-strong max-md:text-[26px]">
          {profile.short} is a <em className="not-italic text-accent">{profile.field}</em> student looking for an internship
        </h1>
        <p className="my-5 max-w-[48ch]">{profile.intro}</p>
        <div className="flex flex-wrap gap-2">
          <a className={btn} href="#contact">Contact me</a>
          <a className={ghost} href="#projects">See my projects</a>
          {profile.cvUrl && <a className={ghost} href={profile.cvUrl} target="_blank" rel="noopener noreferrer">Download CV</a>}
        </div>
      </div>
      <div className="max-w-[260px]">
        <img src="/images/gabriel.png" alt={`Portrait of ${profile.name}`} width="150" height="150" className="block h-[150px] w-[150px] border border-line bg-card object-cover" />
        <div className="-mt-px border border-line bg-card px-3 py-2 text-sm before:mr-2.5 before:inline-block before:h-3 before:w-3 before:bg-accent before:align-[-1px] before:content-['']">
          Seeking <b className="font-medium text-strong">{profile.status}</b> {profile.statusRest}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ p }) {
  return (
    <article className="self-start border border-line bg-card">
      <img src={p.image} alt={p.alt} className="block h-auto w-full border-b border-line" loading="lazy" />
      <div className="border-b border-line px-3 py-1 text-sm">{p.stack}</div>
      <div className="px-3 pb-3.5 pt-4">
        <h3 className="text-2xl font-medium text-strong">{p.title}</h3>
        <p className="my-2 mb-3.5 text-[15px]">{p.summary}</p>
        <ul className="mb-4 list-disc pl-[18px] text-sm">
          {p.bullets.map((b) => <li key={b} className="mb-1.5">{b}</li>)}
        </ul>
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

function Box({ title, children, small }) {
  return (
    <div className="border border-line bg-card">
      <h3 className="border-b border-line px-3 py-1.5 text-base font-semibold text-strong">{title}</h3>
      <p className="px-3 py-2 text-[15px]">{children}</p>
      {small && <small className="block px-3 pb-2.5 text-[13px]">{small}</small>}
    </div>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main id="home" className="mx-auto max-w-5xl px-6">
        <Hero />

        <Section id="projects" title="projects">
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((p) => <ProjectCard key={p.title} p={p} />)}
          </div>
        </Section>

        <Section id="skills" title="skills">
          <BoxGrid>{skills.map((s) => <Box key={s.title} title={s.title}>{s.items}</Box>)}</BoxGrid>
        </Section>

        <Section id="certifications" title="certifications">
          <BoxGrid>
            {certifications.map((c) => <Box key={c.title} title={c.title} small={c.date}>{c.issuer}</Box>)}
          </BoxGrid>
        </Section>

        <Section id="about" title="about-me">
          <div className="grid items-start gap-10 md:grid-cols-[1.3fr_1fr]">
            <div className="max-w-[60ch] space-y-4">
              {profile.about.map((t) => <p key={t}>{t}</p>)}
            </div>
            <aside className="border border-line bg-card p-4">
              <h3 className="mb-2 text-base font-semibold text-strong">Education</h3>
              {education.map((e) => (
                <p key={e.title} className="mb-2.5 text-[15px]">{e.title}<br />{e.note}</p>
              ))}
            </aside>
          </div>
        </Section>

        <Section id="contact" title="contact">
          <div className="grid items-start gap-10 md:grid-cols-[1.3fr_1fr]">
            <p>{profile.contactText}</p>
            <div className="border border-line bg-card p-4 text-[15px]">
              <h3 className="mb-2.5 text-base font-semibold text-strong">Message me here</h3>
              <p className="my-1"><a href={`mailto:${profile.email}`} className="hover:text-strong">{profile.email}</a></p>
              <p className="my-1"><a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-strong">{profile.github.replace('https://', '')}</a></p>
              <p className="my-1">{profile.location}</p>
            </div>
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
