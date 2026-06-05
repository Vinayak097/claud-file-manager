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
  LogOut,
  MoreVertical,
  Music,
  Search,
  Share2,
  Trash2,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import File from "@/components/File";
import type { TypeFile } from "@/lib/types/file";
import type { TypeFolder } from "@/lib/types/file";
import type { ResponseType } from "@/lib/types/file";
import Folders from "@/components/Folder";
import FolderSkeleton from "@/components/FolderSkeleton";
import FileSkeleton from "@/components/FileSkeleton";

export default function page() {
  const [files,setFiles]=useState<TypeFile[]|[]>([])
  const [folders,setFolders]=useState<TypeFolder[]|[]>([])
  const [profileOpen, setProfileOpen]=useState(false)
 const [user,setUser]=useState<any>()
 const [loading,setLoading]=useState(true)
 const [folderLoading , setFolderLoading]=useState(false)
 const [Error , setError]=useState<String| null>(null)
 const session = useSession()

 console.log("user " , user)



  useEffect(()=>{
     if(session.data){
      setUser(session.data.user)
     }
  },[])
  useEffect(()=>{
    async function main(){
      console.log("calling the fetchojbectes")
      await FetchOjbects("")

    }
    main()
    
  },[])

  async function  FetchOjbects(prefix:string) {
   
    try{
       const response=await fetch(`/api/object?prefix=${prefix}`)

       
    
    if(!response.ok){
      setError("Failed to fetch Files")
    }    
    const data:ResponseType= await response.json()
    console.log(data , 'data this is ')
    setFiles(data.files)
    setFolders(data.folders)
    }catch(e){
      setError("Failed to fetch files check ur network")
    }
    finally{
      setLoading(false)
      setTimeout(() => {
        setError(null)
      }, 5000);

    }
   
  }
  function handleLogout(){
    signOut({
      callbackUrl:'/'
    })
  }
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
            <Button onClick={()=>{setProfileOpen(true)}} className="size-9 cursor-pointer font-semibold rounded-full bg-[#155dfc]/20 text-[#155dfc] text-sm leading-5 border-[#155dfc]/40 border-1 border-solid flex justify-center items-center">
              AM
            </Button>
            {profileOpen==true && (
              <div className=" absolute right-10 top-8 p-2">
                <button onClick={async ()=>await handleLogout()} className="group px-2 py-1  flex items-center gap-2 rounded-lg border text-sm leading-5 font-medium border-[#155dfc]">
                      <span>Logout</span>
                      <LogOut className="group-hover:text-[#155dfc] transition-colors size-4 "></LogOut>

                </button>
              </div>
            )}
            
          </div>
        </header>
        <main className="flex p-8 flex-col gap-6 w-full">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              
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
              {loading ? (
                Array.from({length: 4}).map((_, i) => <FolderSkeleton key={i} />)
              ) : folders.length === 0 ? (
                <div className="w-md p-2">
                  <p>you dont have any Folders</p>
                </div>
              ) : (
                folders.map((folder: TypeFolder, i) => (
                  <Folders key={i} name={folder.name} />
                ))
              )}
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
              
              {loading ? (
                Array.from({length: 4}).map((_, i) => <FileSkeleton key={i} />)
              ) : (
                files.map((file: any, i) => (
                  <File key={i} lastModified={file.lastModified} name={file.name} size={file.size} />
                ))
              )}
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
