import { Github, Terminal } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-cyan-400 to-blue-600">
            <Terminal className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
          </span>
          <span className="font-mono text-sm font-semibold text-white">next-wiki</span>
          <span className="text-xs text-slate-500">· 个人的 AI 原生知识资产库</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-slate-500">
          <span>Apache-2.0 License</span>
          <a
            href="https://github.com/hugogu/next-wiki"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-cyan-300"
          >
            <Github className="h-3.5 w-3.5" />
            hugogu/next-wiki
          </a>
        </div>
      </div>
    </footer>
  )
}
