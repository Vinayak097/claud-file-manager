"use client"
import { useEffect, useRef, useState } from "react"
import { FolderPlus, X } from "lucide-react"
import { Button } from "./ui/button"

interface Props {
  prefix: string
  onClose: () => void
  onCreated: (name: string) => void
}

export default function NewFolderModal({ prefix, onClose, onCreated }: Props) {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  async function handleCreate() {
    const trimmed = name.trim()
    if (!trimmed) return

    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/object/folder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prefix, name: trimmed }),
      })
      if (!res.ok) throw new Error("Failed to create folder")
      onCreated(trimmed)
      onClose()
    } catch {
      setError("Could not create folder. Try again.")
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleCreate()
    if (e.key === "Escape") onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-sm mx-4 shadow-2xl">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-[#155dfc]/15 flex items-center justify-center">
              <FolderPlus className="size-4 text-[#155dfc]" />
            </div>
            <span className="font-semibold text-neutral-50 text-sm">New folder</span>
          </div>
          <button
            onClick={onClose}
            className="size-7 rounded-md flex items-center justify-center text-[#9f9fa9] hover:text-neutral-50 hover:bg-white/5 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-4">
          <input
            ref={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Untitled folder"
            className="w-full rounded-lg bg-zinc-800 text-neutral-50 text-sm leading-5 border border-white/10 px-3 h-9 outline-none focus:border-[#155dfc] transition-colors placeholder:text-[#9f9fa9]"
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <div className="flex gap-2 justify-end">
            <button
              onClick={onClose}
              className="px-4 h-9 rounded-lg text-sm font-medium text-[#9f9fa9] hover:text-neutral-50 hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <Button
              onClick={handleCreate}
              disabled={loading || !name.trim()}
              className="bg-[#155dfc] hover:bg-[#155dfc]/90 text-white px-4 h-9 text-sm font-medium disabled:opacity-40"
            >
              {loading ? "Creating…" : "Create"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
