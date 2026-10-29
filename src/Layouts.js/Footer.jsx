const LogoIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <path d="M14 14h3v3m4 0v4h-4m-3-1v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M12 .5a11.5 11.5 0 00-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 015.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0012 .5z" />
  </svg>
)

const columns = [
  {
    title: 'Create',
    links: [
      { label: 'Website URL', href: '#generator' },
      { label: 'Wi-Fi network', href: '#generator' },
      { label: 'vCard contact', href: '#generator' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Privacy', href: '#privacy' },
      { label: 'Scanning tips', href: '#tips' },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'Source code', href: 'https://github.com/your-username/qrforge' },
      { label: 'Report an issue', href: 'https://github.com/your-username/qrforge/issues' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200 bg-gray-900">
      {/* soft glow line that echoes the hero */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          {/* brand */}
          <div className="max-w-xs">
            <a href="#top" className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white shadow-[0_6px_16px_-6px_rgba(79,70,229,0.7)]">
                <LogoIcon />
              </span>
              <span className="font-display text-xl font-bold text-white">QRForge</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              A free QR code generator that runs entirely in your browser. No accounts, no servers, no tracking.
            </p>
          </div>

          {/* link columns */}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-display text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-ink-muted transition hover:text-accent focus:outline-none focus-visible:text-accent focus-visible:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-ink-muted">
            &copy; {new Date().getFullYear()} QRForge. Free to use, free to share.
          </p>

          <div className="flex items-center gap-5">
            <p className="text-sm text-ink-muted">Built with React and Tailwind CSS</p>
            <a
              href="https://github.com/your-username/qrforge"
              target="_blank"
              rel="noreferrer"
              aria-label="QRForge on GitHub"
              className="text-ink-muted transition hover:text-accent focus:outline-none focus-visible:text-accent"
            >
              <GithubIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
