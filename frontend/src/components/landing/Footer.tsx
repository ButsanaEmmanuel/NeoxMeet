const columns = [
  { title: 'Product', links: ['Overview', 'Live translation', 'Recap AI', 'Integrations'] },
  { title: 'Security', links: ['Security overview', 'Compliance', 'Status', 'Privacy'] },
  { title: 'Resources', links: ['Docs', 'API reference', 'Guides', 'Blog'] },
  { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
  { title: 'Legal', links: ['Terms', 'Privacy', 'Sub-processors', 'Accessibility'] },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 text-slate-600 lg:flex-row lg:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-sky-500 text-lg font-black text-white">
              N
            </div>
            <span className="text-lg font-semibold">NeoxMeet</span>
          </div>
          <p className="max-w-sm text-sm text-slate-600">AI-powered meetings with instant translation, transcription, and enterprise readiness.</p>
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} NeoxMeet. All rights reserved.</p>
        </div>
        <div className="grid flex-1 gap-6 text-sm sm:grid-cols-2 lg:grid-cols-5">
          {columns.map((column) => (
            <div key={column.title} className="space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{column.title}</p>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <a className="text-slate-600 transition hover:text-slate-900" href="#">
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
