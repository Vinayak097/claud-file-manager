import { Cloud, FileText, Share2, Trash2 } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="relative z-10 w-full h-18.25 flex items-center justify-between px-12 border-b border-white/10">
      <div className="flex items-center gap-2">
        <Cloud className="size-5 text-[#4A9EFF]" />
        <span className="font-bold text-white text-lg tracking-tight">CloudVault</span>
      </div>
      <nav className="flex items-center gap-1 text-sm">
        <a className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-white font-medium border-b-2 border-[#4A9EFF] pb-1 cursor-pointer">
          <Cloud className="size-4 text-[#4A9EFF]" />
          CloudVault
        </a>
        <a className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-white/60 hover:text-white/90 transition-colors border-b-2 border-transparent cursor-pointer">
          <FileText className="size-4" />
          Files
        </a>
        <a className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-white/60 hover:text-white/90 transition-colors border-b-2 border-transparent cursor-pointer">
          <Share2 className="size-4" />
          Shared
        </a>
        <a className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-white/60 hover:text-white/90 transition-colors border-b-2 border-transparent cursor-pointer">
          <Trash2 className="size-4" />
          Trash
        </a>
      </nav>
    </header>
  )
}

export default Navbar
