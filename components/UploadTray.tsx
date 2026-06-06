"use client"
import { CheckCircle2, Loader2, XCircle, X, Upload } from "lucide-react"

export interface UploadItem {
  id: string
  name: string
  progress: number
  status: "uploading" | "done" | "error"
}

interface Props {
  items: UploadItem[]
  onDismiss: (id: string) => void
  onClose: () => void
}

export default function UploadTray({ items, onDismiss, onClose }: Props) {
  if (items.length === 0) return null

  const doneCount = items.filter((i) => i.status === "done").length

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Upload className="size-4 text-[#155dfc]" />
          <span className="text-sm font-semibold text-neutral-50">
            {doneCount === items.length
              ? `${doneCount} upload${doneCount !== 1 ? "s" : ""} complete`
              : `Uploading ${doneCount}/${items.length}…`}
          </span>
        </div>
        <button
          onClick={onClose}
          className="size-6 rounded-md flex items-center justify-center text-[#9f9fa9] hover:text-neutral-50 hover:bg-white/5 transition-colors"
        >
          <X className="size-3.5" />
        </button>
      </div>

      <ul className="max-h-64 overflow-y-auto divide-y divide-white/5">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3 px-4 py-3">
            <div className="shrink-0">
              {item.status === "uploading" && (
                <Loader2 className="size-4 text-[#155dfc] animate-spin" />
              )}
              {item.status === "done" && (
                <CheckCircle2 className="size-4 text-emerald-400" />
              )}
              {item.status === "error" && (
                <XCircle className="size-4 text-red-400" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-neutral-50 truncate">{item.name}</p>
              {item.status === "uploading" && (
                <div className="mt-1.5 h-1 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#155dfc] transition-all duration-200"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              )}
              {item.status === "error" && (
                <p className="text-[10px] text-red-400 mt-0.5">Upload failed</p>
              )}
              {item.status === "done" && (
                <p className="text-[10px] text-[#9f9fa9] mt-0.5">Complete</p>
              )}
            </div>

            {item.status !== "uploading" && (
              <button
                onClick={() => onDismiss(item.id)}
                className="shrink-0 size-5 flex items-center justify-center text-[#9f9fa9] hover:text-neutral-50 transition-colors"
              >
                <X className="size-3" />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
