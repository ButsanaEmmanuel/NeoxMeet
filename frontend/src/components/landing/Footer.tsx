const columns = [
  { title: 'Product', links: ['Overview', 'Live translation', 'Recap AI', 'Integrations'] },
  { title: 'Security', links: ['Security overview', 'Compliance', 'Status', 'Privacy'] },
  { title: 'Resources', links: ['Docs', 'API reference', 'Guides', 'Blog'] },
  { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
  { title: 'Legal', links: ['Terms', 'Privacy', 'Sub-processors', 'Accessibility'] },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 text-white/70 lg:flex-row lg:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-lg font-black text-slate-950">
              N
            </div>
            <span className="text-lg font-semibold">NeoxMeet</span>
          </div>
          <p className="max-w-sm text-sm text-white/60">AI-powered meetings with instant translation, transcription, and enterprise readiness.</p>
          <p className="text-xs text-white/50">© {new Date().getFullYear()} NeoxMeet. All rights reserved.</p>
        </div>
        <div className="grid flex-1 gap-6 text-sm sm:grid-cols-2 lg:grid-cols-5">
          {columns.map((column) => (
            <div key={column.title} className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">{column.title}</p>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <a className="text-white/70 transition hover:text-white" href="#">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
