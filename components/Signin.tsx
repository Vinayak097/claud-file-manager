"use client"
import { useState } from "react";
import {
  Cloud,
  Eye,
  EyeOff,
  FileText,
  Folder,
  ImageIcon,
  Lock,
  LogIn,
  Mail,
  Music,
} from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Navbar from "./Navbar";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCredentialsSignIn() {
    setError("");
    setLoading(true);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(" result for signin  "   , result ) 
    setLoading(false);
    if (result?.error) {
      if (typeof result.error === "string" && result.error.includes("AccountNotFound")) {
        setError("Account not found. Please create an account.");
      } else {
        setError("Invalid email or password.");
      }
    } else {
      window.location.href = "/files";
    }
  }

  return (
    <div className="bg-white text-zinc-950 w-screen min-h-screen overflow-visible">
      <div className="relative bg-[#0A1628] text-white w-full min-h-screen overflow-hidden">
        <div className="bg-[#4a9eff]/18 absolute inset-0" />
        <div className="bg-[#4a9eff]/4 absolute inset-0" />
        <Navbar />
        <div className="grid grid-cols-2 absolute inset-x-0 top-18.25 bottom-0">
          <div className="relative bg-[#0F1F38] flex px-12 flex-col justify-center items-center overflow-hidden">
            <div className="bg-[#4a9eff]/16 absolute inset-0" />
            <div className="relative flex flex-col items-center">
              <div className="relative size-72 flex justify-center items-center">
                <div className="size-72 blur-2xl rounded-full bg-[#4a9eff]/30 absolute" />
                <div className="size-56 rounded-full border-[#4A9EFF]/20 border absolute" />
                <div className="size-72 rounded-full border-[#4A9EFF]/10 border absolute" />
                <div className="size-12 shadow-[0_0_20px_rgba(74,158,255,0.25)] rounded-2xl bg-[#1A2A45] border-[#4A9EFF]/30 border flex absolute left-10 -top-2 justify-center items-center">
                  <FileText className="size-5 text-[#4A9EFF]" />
                </div>
                <div className="size-12 shadow-[0_0_20px_rgba(74,158,255,0.25)] rounded-2xl bg-[#1A2A45] border-[#4A9EFF]/30 border flex absolute -right-2 top-12 justify-center items-center">
                  <Folder className="size-5 text-[#4A9EFF]" />
                </div>
                <div className="size-12 shadow-[0_0_20px_rgba(74,158,255,0.25)] rounded-2xl bg-[#1A2A45] border-[#4A9EFF]/30 border flex absolute right-8 bottom-2 justify-center items-center">
                  <ImageIcon className="size-5 text-[#4A9EFF]" />
                </div>
                <div className="size-12 shadow-[0_0_20px_rgba(74,158,255,0.25)] rounded-2xl bg-[#1A2A45] border-[#4A9EFF]/30 border flex absolute -left-2 bottom-6 justify-center items-center">
                  <Music className="size-5 text-[#4A9EFF]" />
                </div>
                <div className="relative size-36 bg-[linear-gradient(145deg,#4A9EFF,#1d6fd6)] shadow-[0_0_60px_rgba(74,158,255,0.55)] rounded-4xl flex justify-center items-center">
                  <Cloud className="size-20 text-white" strokeWidth={1.5} />
                </div>
              </div>
              <h2 className="font-bold text-white text-3xl leading-9 mt-12">
                Everything in one place.
              </h2>
              <p className="text-white/45 text-base leading-6 mt-2">
                Access your files anytime, anywhere.
              </p>
            </div>
          </div>
          <div className="relative flex px-12 justify-center items-center">
            <Card className="shadow-[0_0_50px_rgba(74,158,255,0.18)] rounded-3xl bg-[#1A2A45] text-white border-[#4A9EFF]/30 border p-8 gap-6 w-105">
              <CardHeader className="p-0 gap-2">
                <div className="flex mb-2 items-center gap-2">
                  <Cloud className="size-7 text-[#4A9EFF]" />
                  <span className="font-bold text-white text-xl leading-7 tracking-tight">
                    CloudVault
                  </span>
                </div>
                <h1 className="font-bold text-white text-2xl leading-8">
                  Welcome Back
                </h1>
                <p className="text-white/45 text-sm leading-5">
                  Sign in to your account to continue
                </p>
              </CardHeader>
              <CardContent className="flex p-0 flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-white/70 text-sm leading-5">
                    Email Address
                  </label>
                  <div className="rounded-xl bg-[#0A1628] border-white/10 border flex px-4 py-2.5 items-center gap-2">
                    <Mail className="size-4 text-white/40" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent outline-none text-white text-sm leading-5 w-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-white/70 text-sm leading-5">
                    Password
                  </label>
                  <div className="rounded-xl bg-[#0A1628] border-white/10 border flex px-4 py-2.5 items-center gap-2">
                    <Lock className="size-4 text-white/40" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-transparent outline-none text-white text-sm leading-5 w-full"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="text-white/40 hover:text-white/70 transition-colors"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>
                {error && (
                  <p className="text-red-400 text-sm leading-5">{error}</p>
                )}
                <div className="flex justify-end">
                  <a className="font-medium text-[#4A9EFF] text-sm leading-5 cursor-pointer">
                    Forgot Password?
                  </a>
                </div>
                <Button
                  onClick={handleCredentialsSignIn}
                  disabled={loading}
                  className="shadow-[0_0_25px_rgba(74,158,255,0.45)] font-bold rounded-xl bg-[#4A9EFF] text-white w-full h-11 disabled:opacity-60"
                >
                  <LogIn className="size-4" />
                  {loading ? "Signing in…" : "Sign In"}
                </Button>
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 flex-1 h-px" />
                  <span className="text-white/40 text-xs leading-4">or</span>
                  <div className="bg-white/10 flex-1 h-px" />
                </div>
                <Button
                  variant="outline"
                  onClick={() => signIn("google", { callbackUrl: "/files" })}
                  className="bg-transparent rounded-xl text-white border border-white/15 w-full h-11"
                >
                  <svg className="size-4" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.9 3.3 14.7 2.3 12 2.3 6.9 2.3 2.8 6.4 2.8 11.5S6.9 20.7 12 20.7c5.3 0 8.8-3.7 8.8-9 0-.6-.1-1.1-.2-1.5H12z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </CardContent>
              <CardFooter className="p-0 justify-center gap-1">
                <span className="text-white/45 text-sm leading-5">
                  Don't have an account?
                </span>
                <a href="/auth/signup" className="font-medium text-[#4A9EFF] text-sm leading-5 cursor-pointer">
                  Create one for free
                </a>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
