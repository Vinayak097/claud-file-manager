"use client"
import {
  ChevronRight,
  Cloud,
  FileSpreadsheet,
  FileText,
  FileVideo,
  Folder,
  Image,
  LayoutGrid,
  List,
  MoreVertical,
  Music,
  Search,
  Share2,
  Trash2,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export default function page() {
  const [file,setFiles]=useState()
  const [folders,setFolders]=useState()
  return (
    <div>
      <div className="bg-zinc-950 text-neutral-50 w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <header className="border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-8 justify-between items-center w-full h-16">
          <nav className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Cloud className="size-6 text-[#155dfc]" />
              <span className="font-bold text-lg leading-7 tracking-tight">
                CloudVault
              </span>
            </div>
            <div className="flex items-center gap-6">
              <button className="font-semibold text-neutral-50 text-sm leading-5 border-[#155dfc] border-t-0 border-r-0 border-b-2 border-l-0 border-solid flex pb-1 items-center gap-2">
                <FileText className="size-4 text-[#155dfc]" />
                Files
              </button>
              <button className="border-transparent font-medium text-[#9f9fa9] text-sm leading-5 border-black/1 border-t-0 border-r-0 border-b-2 border-l-0 border-solid flex pb-1 items-center gap-2">
                <Share2 className="size-4" />
                Shared
              </button>
              <button className="border-transparent font-medium text-[#9f9fa9] text-sm leading-5 border-black/1 border-t-0 border-r-0 border-b-2 border-l-0 border-solid flex pb-1 items-center gap-2">
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
                className="rounded-lg bg-zinc-800 text-neutral-50 text-sm leading-5 border-white/10 border-1 border-solid pl-9 pr-3 w-full h-9"
              />
            </div>
            <div className="size-9 font-semibold rounded-full bg-[#155dfc]/20 text-[#155dfc] text-sm leading-5 border-[#155dfc]/40 border-1 border-solid flex justify-center items-center">
              AM
            </div>
          </div>
        </header>
        <main className="flex p-8 flex-col gap-6 w-full">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <h1 className="font-bold text-2xl leading-8 tracking-tight">
                My Files
              </h1>
              <div className="text-[#9f9fa9] text-sm leading-5 flex items-center gap-2">
                <span className="cursor-pointer">Home</span>
                <ChevronRight className="size-3.5" />
                <span className="text-neutral-50">All Files</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-zinc-800 border-white/10 border-1 border-solid flex p-1 items-center">
                <button className="size-7 rounded-sm bg-[#155dfc] text-[#1c398e] flex justify-center items-center">
                  <LayoutGrid className="size-4" />
                </button>
                <button className="size-7 rounded-sm text-[#9f9fa9] flex justify-center items-center">
                  <List className="size-4" />
                </button>
              </div>
              <Button className="bg-[#155dfc] text-[#1c398e] px-4 gap-2">
                <Upload className="size-4" />
                Upload  
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-[#9f9fa9] text-sm leading-5">
              Folders
            </h2>
            <div className="grid grid-cols-4 gap-4">
              <Card className="cursor-pointer transition-colors bg-zinc-900 border-white/10 border-0 border-solid p-4 gap-0">
                <CardContent className="flex p-0 items-center gap-3">
                  <div className="size-10 rounded-lg bg-[#155dfc]/15 flex justify-center items-center">
                    <Folder className="size-5 text-[#155dfc]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm leading-5">
                      Documents
                    </span>
                    <span className="text-[#9f9fa9] text-xs leading-4">
                      24 files
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card className="cursor-pointer transition-colors bg-zinc-900 border-white/10 border-0 border-solid p-4 gap-0">
                <CardContent className="flex p-0 items-center gap-3">
                  <div className="size-10 rounded-lg bg-[#155dfc]/15 flex justify-center items-center">
                    <Folder className="size-5 text-[#155dfc]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm leading-5">
                      Photos
                    </span>
                    <span className="text-[#9f9fa9] text-xs leading-4">
                      128 files
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card className="cursor-pointer transition-colors bg-zinc-900 border-white/10 border-0 border-solid p-4 gap-0">
                <CardContent className="flex p-0 items-center gap-3">
                  <div className="size-10 rounded-lg bg-[#155dfc]/15 flex justify-center items-center">
                    <Folder className="size-5 text-[#155dfc]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm leading-5">Music</span>
                    <span className="text-[#9f9fa9] text-xs leading-4">
                      56 files
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card className="cursor-pointer transition-colors bg-zinc-900 border-white/10 border-0 border-solid p-4 gap-0">
                <CardContent className="flex p-0 items-center gap-3">
                  <div className="size-10 rounded-lg bg-[#155dfc]/15 flex justify-center items-center">
                    <Folder className="size-5 text-[#155dfc]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm leading-5">
                      Projects
                    </span>
                    <span className="text-[#9f9fa9] text-xs leading-4">
                      12 files
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-[#9f9fa9] text-sm leading-5">
              Files
            </h2>
            <Card className="bg-zinc-900 border-white/10 border-0 border-solid p-0 gap-0 overflow-hidden">
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] font-semibold uppercase text-[#9f9fa9] text-xs leading-4 tracking-wide border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid px-6 py-3 items-center gap-4">
                <span>Name</span>
                <span>Size</span>
                <span>Type</span>
                <span>Modified</span>
                <span className="w-8" />
              </div>
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] transition-colors border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid px-6 py-4 items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-[#00bc7d]/15 flex justify-center items-center">
                    <FileText className="size-4 text-[#00bc7d]" />
                  </div>
                  <span className="font-medium text-sm leading-5">
                    Annual Report 2024.pdf
                  </span>
                </div>
                <span className="text-[#9f9fa9] text-sm leading-5">2.4 MB</span>
                <span className="text-[#9f9fa9] text-sm leading-5">PDF</span>
                <span className="text-[#9f9fa9] text-sm leading-5">
                  Jan 12, 2025
                </span>
                <button className="size-8 rounded-md text-[#9f9fa9] flex justify-center items-center">
                  <MoreVertical className="size-4" />
                </button>
              </div>
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] transition-colors border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid px-6 py-4 items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-[#ad46ff]/15 flex justify-center items-center">
                    <Image className="size-4 text-[#ad46ff]" />
                  </div>
                  <span className="font-medium text-sm leading-5">
                    Vacation Sunset.jpg
                  </span>
                </div>
                <span className="text-[#9f9fa9] text-sm leading-5">5.1 MB</span>
                <span className="text-[#9f9fa9] text-sm leading-5">Image</span>
                <span className="text-[#9f9fa9] text-sm leading-5">
                  Jan 10, 2025
                </span>
                <button className="size-8 rounded-md text-[#9f9fa9] flex justify-center items-center">
                  <MoreVertical className="size-4" />
                </button>
              </div>
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] transition-colors border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid px-6 py-4 items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-[#fe9a00]/15 flex justify-center items-center">
                    <Music className="size-4 text-[#fe9a00]" />
                  </div>
                  <span className="font-medium text-sm leading-5">
                    Podcast Episode 12.mp3
                  </span>
                </div>
                <span className="text-[#9f9fa9] text-sm leading-5">18 MB</span>
                <span className="text-[#9f9fa9] text-sm leading-5">Audio</span>
                <span className="text-[#9f9fa9] text-sm leading-5">
                  Jan 08, 2025
                </span>
                <button className="size-8 rounded-md text-[#9f9fa9] flex justify-center items-center">
                  <MoreVertical className="size-4" />
                </button>
              </div>
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] transition-colors border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid px-6 py-4 items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-[#ff2056]/15 flex justify-center items-center">
                    <FileSpreadsheet className="size-4 text-[#ff2056]" />
                  </div>
                  <span className="font-medium text-sm leading-5">
                    Budget Q1.xlsx
                  </span>
                </div>
                <span className="text-[#9f9fa9] text-sm leading-5">820 KB</span>
                <span className="text-[#9f9fa9] text-sm leading-5">Sheet</span>
                <span className="text-[#9f9fa9] text-sm leading-5">
                  Jan 05, 2025
                </span>
                <button className="size-8 rounded-md text-[#9f9fa9] flex justify-center items-center">
                  <MoreVertical className="size-4" />
                </button>
              </div>
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] transition-colors border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid px-6 py-4 items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-[#155dfc]/15 flex justify-center items-center">
                    <FileVideo className="size-4 text-[#155dfc]" />
                  </div>
                  <span className="font-medium text-sm leading-5">
                    Demo Recording.mp4
                  </span>
                </div>
                <span className="text-[#9f9fa9] text-sm leading-5">142 MB</span>
                <span className="text-[#9f9fa9] text-sm leading-5">Video</span>
                <span className="text-[#9f9fa9] text-sm leading-5">
                  Jan 03, 2025
                </span>
                <button className="size-8 rounded-md text-[#9f9fa9] flex justify-center items-center">
                  <MoreVertical className="size-4" />
                </button>
              </div>
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] transition-colors px-6 py-4 items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-[#00bc7d]/15 flex justify-center items-center">
                    <FileText className="size-4 text-[#00bc7d]" />
                  </div>
                  <span className="font-medium text-sm leading-5">
                    Meeting Notes.docx
                  </span>
                </div>
                <span className="text-[#9f9fa9] text-sm leading-5">340 KB</span>
                <span className="text-[#9f9fa9] text-sm leading-5">Doc</span>
                <span className="text-[#9f9fa9] text-sm leading-5">
                  Dec 28, 2024
                </span>
                <button className="size-8 rounded-md text-[#9f9fa9] flex justify-center items-center">
                  <MoreVertical className="size-4" />
                </button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
