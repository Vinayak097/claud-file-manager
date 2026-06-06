"use client"
import {
  ChevronRight,
  Cloud,
  FileText,
  FolderPlus,
  LayoutGrid,
  List,
  LogOut,
  Search,
  Share2,
  Trash2,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import File from "@/components/File";
import type { TypeFile, TypeFolder, ResponseType } from "@/lib/types/file";
import Folders from "@/components/Folder";
import FolderSkeleton from "@/components/FolderSkeleton";
import FileSkeleton from "@/components/FileSkeleton";
import NewFolderModal from "@/components/NewFolderModal";
import UploadTray, { type UploadItem } from "@/components/UploadTray";

type PathCrumb = { id: string; label: string }

export default function page() {
  const [files, setFiles] = useState<TypeFile[]>([])
  const [folders, setFolders] = useState<TypeFolder[]>([])
  const [loading, setLoading] = useState(true)
  const [profileOpen, setProfileOpen] = useState(false)
  const [showNewFolder, setShowNewFolder] = useState(false)
  const [uploadItems, setUploadItems] = useState<UploadItem[]>([])
  const [pathStack, setPathStack] = useState<PathCrumb[]>([{ id: "", label: "All Files" }])

  const currentFolder = pathStack[pathStack.length - 1]
  const fileInputRef = useRef<HTMLInputElement>(null)
  const session = useSession()

  useEffect(() => {
    setLoading(true)
    fetchObjects(currentFolder.id)
  }, [currentFolder.id])

  async function fetchObjects(prefix: string) {
    try {
      const res = await fetch(`/api/object?prefix=${prefix}`)
      if (!res.ok) throw new Error()
      const data: ResponseType = await res.json()
      setFiles(data.files)
      setFolders(data.folders)
    } catch {
      // silent — could add toast here
    } finally {
      setLoading(false)
    }
  }

  function handleFolderClick(folder: TypeFolder) {
    setPathStack((prev) => [
      ...prev,
      { id: currentFolder.id + folder.name, label: folder.name.replace(/\/$/, "") },
    ])
  }

  function handleBreadcrumbClick(index: number) {
    setPathStack((prev) => prev.slice(0, index + 1))
  }

  function handleFolderCreated(name: string) {
    // optimistic: add folder immediately, S3 will confirm on next fetch
    setFolders((prev) => [...prev, { name: currentFolder.id + name + "/" }])
  }

  function handleUploadClick() {
    fileInputRef.current?.click()
  }

  async function handleFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? [])
    if (selected.length === 0) return

    // reset input so same file can be re-selected
    e.target.value = ""

    const newItems: UploadItem[] = selected.map((f) => ({
      id: crypto.randomUUID(),
      name: f.name,
      progress: 0,
      status: "uploading",
    }))
    setUploadItems((prev) => [...prev, ...newItems])

    await Promise.all(
      selected.map((file, i) => uploadFile(file, newItems[i].id))
    )

    // refresh list after all uploads settle
    fetchObjects(currentFolder.id)
  }

  async function uploadFile(file: File, itemId: string) {
    const key = currentFolder.id + file.name
    const formData = new FormData()
    formData.append("file", file)
    formData.append("key", key)

    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const pct = Math.round((e.loaded / e.total) * 100)
          setUploadItems((prev) =>
            prev.map((it) => (it.id === itemId ? { ...it, progress: pct } : it))
          )
        }
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadItems((prev) =>
            prev.map((it) => (it.id === itemId ? { ...it, status: "done", progress: 100 } : it))
          )
          resolve()
        } else {
          reject(new Error(`Upload failed: ${xhr.status}`))
        }
      }
      xhr.onerror = () => reject(new Error("Network error"))
      xhr.open("POST", "/api/object/upload")
      xhr.send(formData)
    }).catch(() => {
      setUploadItems((prev) =>
        prev.map((it) => (it.id === itemId ? { ...it, status: "error" } : it))
      )
    })
  }

  function dismissUpload(id: string) {
    setUploadItems((prev) => prev.filter((it) => it.id !== id))
  }

  return (
    <div className="bg-zinc-950 text-neutral-50 min-h-screen w-screen">
      {/* Header */}
      <header className="border-b border-white/10 flex px-8 justify-between items-center w-full h-16">
        <nav className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Cloud className="size-6 text-[#155dfc]" />
            <span className="font-bold text-lg tracking-tight">CloudVault</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="font-semibold text-neutral-50 text-sm border-b-2 border-[#155dfc] flex pb-1 items-center gap-2">
              <FileText className="size-4 text-[#155dfc]" />
              Files
            </button>
            <button className="font-medium text-[#9f9fa9] text-sm border-b-2 border-transparent flex pb-1 items-center gap-2 hover:text-neutral-50 transition-colors">
              <Share2 className="size-4" />
              Shared
            </button>
            <button className="font-medium text-[#9f9fa9] text-sm border-b-2 border-transparent flex pb-1 items-center gap-2 hover:text-neutral-50 transition-colors">
              <Trash2 className="size-4" />
              Trash
            </button>
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="top-1/2 -translate-y-1/2 size-4 text-[#9f9fa9] absolute left-3" />
            <input
              placeholder="Search files..."
              className="rounded-lg bg-zinc-800 text-neutral-50 text-sm border border-white/10 pl-9 pr-3 w-full h-9 outline-none focus:border-[#155dfc] transition-colors"
            />
          </div>
          <div className="relative">
            <Button
              onClick={() => setProfileOpen((o) => !o)}
              className="size-9 cursor-pointer font-semibold rounded-full bg-[#155dfc]/20 text-[#155dfc] text-sm border border-[#155dfc]/40 flex justify-center items-center"
            >
              {session.data?.user?.name?.[0]?.toUpperCase() ?? "U"}
            </Button>
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 top-11 z-50 bg-zinc-900 border border-white/10 rounded-xl p-1 shadow-xl min-w-36">
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#9f9fa9] hover:text-neutral-50 hover:bg-white/5 transition-colors"
                  >
                    <LogOut className="size-4" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex p-8 flex-col gap-6 w-full">
        {/* Page title + toolbar */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1.5">
            <h1 className="font-bold text-2xl tracking-tight text-neutral-50">My Files</h1>
            <nav className="flex items-center gap-1.5 text-sm">
              {pathStack.map((crumb, i) => {
                const isLast = i === pathStack.length - 1
                return (
                  <div key={i} className="flex items-center gap-1.5">
                    {isLast ? (
                      <span className="text-neutral-50 font-medium">{crumb.label}</span>
                    ) : (
                      <button
                        onClick={() => handleBreadcrumbClick(i)}
                        className="text-[#9f9fa9] hover:text-neutral-50 transition-colors"
                      >
                        {crumb.label}
                      </button>
                    )}
                    {!isLast && <ChevronRight className="size-3 text-[#9f9fa9]/50 shrink-0" />}
                  </div>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-zinc-800 border border-white/10 flex p-1 items-center">
              <button className="size-7 rounded-sm bg-[#155dfc]/20 text-[#155dfc] flex justify-center items-center">
                <LayoutGrid className="size-4" />
              </button>
              <button className="size-7 rounded-sm text-[#9f9fa9] flex justify-center items-center hover:text-neutral-50 transition-colors">
                <List className="size-4" />
              </button>
            </div>
            <button
              onClick={() => setShowNewFolder(true)}
              className="flex items-center gap-2 px-4 h-9 rounded-lg border border-white/10 bg-zinc-800 hover:bg-zinc-700 text-neutral-50 text-sm font-medium transition-colors"
            >
              <FolderPlus className="size-4" />
              New folder
            </button>
            <Button
              onClick={handleUploadClick}
              className="bg-[#155dfc] hover:bg-[#155dfc]/90 text-white px-4 h-9 gap-2 font-medium"
            >
              <Upload className="size-4" />
              Upload
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFilesSelected}
            />
          </div>
        </div>

        {/* Folders */}
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-[#9f9fa9] text-sm">Folders</h2>
          <div className="grid grid-cols-4 gap-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => <FolderSkeleton key={i} />)
            ) : folders.length === 0 ? (
              <p className="text-[#9f9fa9] text-sm">No folders yet</p>
            ) : (
              folders.map((folder, i) => (
                <div key={folder.name ?? i} onClick={() => handleFolderClick(folder)} className="cursor-pointer">
                  <Folders name={folder.name.replace(/\/$/, "").split("/").pop() ?? folder.name} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Files */}
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-[#9f9fa9] text-sm">Files</h2>
          <Card className="bg-zinc-900 border-white/10 border-0 p-0 gap-0 overflow-hidden">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] font-semibold uppercase text-[#9f9fa9] text-xs tracking-wide border-b border-white/10 px-6 py-3 items-center gap-4">
              <span>Name</span>
              <span>Size</span>
              <span>Type</span>
              <span>Modified</span>
              <span className="w-8" />
            </div>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => <FileSkeleton key={i} />)
            ) : files.length === 0 ? (
              <p className="text-[#9f9fa9] text-sm px-6 py-4">No files yet</p>
            ) : (
              files.map((file, i) => (
                <File key={file.name ?? i} lastModified={file.LastModified} name={file.name} size={file.size} />
              ))
            )}
          </Card>
        </div>
      </main>

      {/* Modals / trays */}
      {showNewFolder && (
        <NewFolderModal
          prefix={currentFolder.id}
          onClose={() => setShowNewFolder(false)}
          onCreated={handleFolderCreated}
        />
      )}

      {uploadItems.length > 0 && (
        <UploadTray
          items={uploadItems}
          onDismiss={dismissUpload}
          onClose={() => setUploadItems([])}
        />
      )}
    </div>
  )
}
