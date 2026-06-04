import { useEffect } from "react";
import {
  Cloud,
  FileText,
  Folder,
  FolderArchive,
  FolderHeart,
  FolderOpen,
  Image,
  Share2,
  ShieldCheck,
  Sparkles,
  Trash2,
  UploadCloud,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Navbar from "./Navbar";
import { useRouter } from "next/navigation";
export default function LandingPage() {
  const router=useRouter()
  return (
    <div>
      <div className="bg-[#0A1628] text-white w-full h-fit h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <header className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex px-12 py-6 justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="size-9 shadow-[0_0_20px_rgba(74,158,255,0.5)] rounded-lg bg-[#4A9EFF]/15 flex justify-center items-center">
                <Cloud className="size-5 text-[#4A9EFF]" />
              </div>
              <span className="font-bold text-white text-lg leading-7 tracking-tight">
                CloudVault
              </span>
            </div>
            <Navbar></Navbar>
          </div>
          <div className="flex items-center gap-4">
            <Button
            onClick={()=>{router.push("/auth/signin")}}
              variant="outline"
              className="bg-transparent rounded-lg text-white border-[#4A9EFF] border-0 border-solid px-5"
            >
              Sign In
            </Button>
            <Button
            onClick={()=>{router.push("/auth/signup")}} className="shadow-[0_0_20px_rgba(74,158,255,0.4)] rounded-lg bg-[#4A9EFF] text-white px-5">
              Get Started
            </Button>
          </div>
        </header>
        <main className="text-center flex px-12 pt-12 pb-8 flex-col items-center">
          <span className="inline-flex font-medium rounded-full bg-[#4A9EFF]/10 text-[#4A9EFF] text-xs leading-4 border-[#4A9EFF]/20 border-1 border-solid mb-6 px-4 py-1.5 items-center gap-2">
            <Sparkles className="size-3.5" />
            Cloud storage reimagined
          </span>
          <h1 className="leading-tight max-w-3xl font-bold text-5xl leading-12 tracking-tight">
            Your Files,
            <span className="bg-gradient-to-r from-[#4A9EFF] to-[#7BC0FF] bg-clip-text text-transparent">
              Everywhere
            </span>
            You Go
          </h1>
          <p className="max-w-xl text-gray-400 text-base leading-6 mt-4">
            Store, access, and share your files securely from any device —
            simple, fast, and reliable.
          </p>
          <Button onClick={()=>{router.push('/auth/signin')}} className="cursor-pointer shadow-[0_0_30px_rgba(74,158,255,0.55)] font-semibold rounded-xl bg-[#4A9EFF] text-white text-base leading-6 mt-8 px-8 py-6">
            <Zap className="size-5" />
            Start for Free
          </Button>
          <Card className="max-w-2xl shadow-[0_0_40px_rgba(74,158,255,0.25)] rounded-2xl bg-[#1A2A45] border-[#4A9EFF]/30 border-1 border-solid mt-10 p-6 gap-4 w-full">
            <CardHeader className="flex p-0 flex-row justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <FolderOpen className="size-5 text-[#4A9EFF]" />
                <span className="font-semibold text-white text-sm leading-5">
                  My Dashboard
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="size-2.5 rounded-full bg-[#4A9EFF]" />
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-3 p-0 gap-2">
              <div className="rounded-lg bg-white/5 flex p-3 flex-col items-start gap-2">
                <Folder className="size-6 text-[#4A9EFF]" />
                <span className="text-gray-300 text-xs leading-4">
                  Documents
                </span>
              </div>
              <div className="rounded-lg bg-white/5 flex p-3 flex-col items-start gap-2">
                <FolderHeart className="size-6 text-[#4A9EFF]" />
                <span className="text-gray-300 text-xs leading-4">Photos</span>
              </div>
              <div className="rounded-lg bg-white/5 flex p-3 flex-col items-start gap-2">
                <FolderArchive className="size-6 text-[#4A9EFF]" />
                <span className="text-gray-300 text-xs leading-4">
                  Projects
                </span>
              </div>
            </CardContent>
            <CardContent className="flex p-0 flex-col gap-2">
              <div className="rounded-lg bg-white/5 flex px-3 py-2 justify-between items-center">
                <div className="flex items-center gap-2">
                  <FileText className="size-4 text-gray-400" />
                  <span className="text-gray-300 text-xs leading-4">
                    Report_Q4.pdf
                  </span>
                </div>
                <span className="text-gray-500 text-xs leading-4">2.4 MB</span>
              </div>
              <div className="rounded-lg bg-white/5 flex px-3 py-2 justify-between items-center">
                <div className="flex items-center gap-2">
                  <Image className="size-4 text-gray-400" />
                  <span className="text-gray-300 text-xs leading-4">
                    vacation.jpg
                  </span>
                </div>
                <span className="text-gray-500 text-xs leading-4">8.1 MB</span>
              </div>
            </CardContent>
            <CardFooter className="flex p-0 flex-col items-start gap-2">
              <div className="flex justify-between items-center w-full">
                <span className="text-gray-400 text-xs leading-4">
                  Storage used
                </span>
                <span className="font-medium text-white text-xs leading-4">
                  64% of 100GB
                </span>
              </div>
              <div className="rounded-full bg-white/10 w-full h-2 overflow-hidden">
                <div className="w-[64%] bg-gradient-to-r from-[#4A9EFF] to-[#7BC0FF] rounded-full h-full" />
              </div>
            </CardFooter>
          </Card>
        </main>
        <section className="bg-[#0F1F38] px-12 pb-12">
          <div className="grid grid-cols-3 pt-8 gap-6">
            <Card className="border-t-[#4A9EFF] border-x rounded-xl bg-[#0A1628] border-white/5 border-t-2 border-r-0 border-b-1 border-l-0 border-solid p-6 gap-4">
              <CardHeader className="flex p-0 flex-row items-center gap-2">
                <div className="size-10 rounded-lg bg-[#4A9EFF]/15 flex justify-center items-center">
                  <UploadCloud className="size-5 text-[#4A9EFF]" />
                </div>
                <span className="font-semibold text-white text-base leading-6">
                  Instant Upload
                </span>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-gray-400 text-sm leading-5">
                  Drag, drop, and sync your files in seconds with lightning-fast
                  upload speeds.
                </p>
              </CardContent>
            </Card>
            <Card className="border-t-[#4A9EFF] border-x rounded-xl bg-[#0A1628] border-white/5 border-t-2 border-r-0 border-b-1 border-l-0 border-solid p-6 gap-4">
              <CardHeader className="flex p-0 flex-row items-center gap-2">
                <div className="size-10 rounded-lg bg-[#4A9EFF]/15 flex justify-center items-center">
                  <ShieldCheck className="size-5 text-[#4A9EFF]" />
                </div>
                <span className="font-semibold text-white text-base leading-6">
                  Secure Storage
                </span>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-gray-400 text-sm leading-5">
                  End-to-end encryption keeps your data safe and private across
                  every device.
                </p>
              </CardContent>
            </Card>
            <Card className="border-t-[#4A9EFF] border-x rounded-xl bg-[#0A1628] border-white/5 border-t-2 border-r-0 border-b-1 border-l-0 border-solid p-6 gap-4">
              <CardHeader className="flex p-0 flex-row items-center gap-2">
                <div className="size-10 rounded-lg bg-[#4A9EFF]/15 flex justify-center items-center">
                  <Share2 className="size-5 text-[#4A9EFF]" />
                </div>
                <span className="font-semibold text-white text-base leading-6">
                  Easy Sharing
                </span>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-gray-400 text-sm leading-5">
                  Share files and folders with a single link and control access
                  effortlessly.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}

