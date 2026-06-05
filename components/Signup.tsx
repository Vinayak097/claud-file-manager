"use client"
import { useState } from "react";
import {
  Cloud,
  Eye,
  EyeOff,
  File,
  FileText,
  Folder,
  Lock,
  Mail,
  Share2,
  ShieldCheck,
  Sparkle,
  Sparkles,
  Trash2,
  User,
  UserPlus,
} from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreed) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.message ?? "Something went wrong.");
      return;
    }

    await signIn("credentials", { email, password, callbackUrl: "/" });
  }

  return (
    <div className="w-screen min-h-screen overflow-visible">
      <div className="relative bg-[#0A1628] flex flex-col w-full min-h-screen overflow-hidden">
        <div className="bg-[#4a9eff]/18 absolute inset-0" />
        <nav className="relative z-10 border-b border-white/10 flex px-12 py-4 justify-start items-center gap-8">
          <div className="font-bold text-white flex items-center gap-2">
            <Cloud className="size-5 text-[#4A9EFF]" />
            <span>CloudVault</span>
          </div>
          <div className="border-b-2 border-transparent font-medium text-white/70 text-sm leading-5 flex pb-1 items-center gap-2">
            <FileText className="size-4" />
            <span>Files</span>
          </div>
          <div className="border-b-2 border-[#4A9EFF] font-medium text-white text-sm leading-5 flex pb-1 items-center gap-2">
            <Share2 className="size-4 text-[#4A9EFF]" />
            <span>Shared</span>
          </div>
          <div className="border-b-2 border-transparent font-medium text-white/70 text-sm leading-5 flex pb-1 items-center gap-2">
            <Trash2 className="size-4" />
            <span>Trash</span>
          </div>
        </nav>
        <div className="relative z-10 grid grid-cols-2 flex-1">
          <div className="relative bg-[#0F1F38] flex px-12 flex-col justify-center overflow-hidden">
            <div className="text-[#4A9EFF]/40 absolute right-12 top-12">
              <Sparkles className="size-6" />
            </div>
            <div className="text-[#4A9EFF]/30 absolute left-20 bottom-20">
              <Sparkle className="size-4" />
            </div>
            <div className="flex flex-col items-center gap-8">
              <div className="relative flex justify-center items-center w-64 h-64">
                <div className="blur-2xl rounded-full bg-[#4a9eff]/35 absolute inset-0" />
                <div className="relative flex flex-col items-center">
                  <div className="animate-pulse text-[#4A9EFF] absolute left-2 -top-10">
                    <FileText className="size-6" />
                  </div>
                  <div className="animate-pulse text-[#4A9EFF]/70 absolute right-0 -top-6">
                    <File className="size-5" />
                  </div>
                  <div className="text-white/60 absolute right-10 -top-12">
                    <Sparkle className="size-4" />
                  </div>
                  <div className="relative">
                    <div className="blur-xl rounded-2xl bg-[#4A9EFF]/40 absolute inset-0" />
                    <Folder className="relative size-40 drop-shadow-[0_0_25px_rgba(74,158,255,0.6)] text-[#4A9EFF]" />
                  </div>
                </div>
              </div>
              <div className="max-w-sm text-center">
                <h2 className="font-bold text-white text-3xl leading-9">
                  Join thousands of users.
                </h2>
                <p className="text-[#8A9BB8] text-base leading-6 mt-2">
                  Secure, fast, and always available.
                </p>
              </div>
            </div>
          </div>
          <div className="flex px-12 justify-center items-center">
            <Card className="max-w-md shadow-[0_0_40px_rgba(74,158,255,0.15)] rounded-2xl bg-[#1A2A45] border border-[#4A9EFF]/40 p-8 gap-6 w-full">
              <CardHeader className="text-center p-0 items-center gap-2">
                <div className="flex items-center gap-2">
                  <Cloud className="size-7 text-[#4A9EFF]" />
                  <span className="font-bold text-white text-xl leading-7">
                    CloudVault
                  </span>
                </div>
                <h1 className="font-bold text-white text-2xl leading-8 mt-2">
                  Create Your Account
                </h1>
                <p className="text-[#8A9BB8] text-sm leading-5">
                  It's free — no credit card required
                </p>
              </CardHeader>
              <CardContent className="flex p-0 flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-[#8A9BB8] text-xs leading-4">
                    Full Name
                  </label>
                  <div className="rounded-lg bg-[#0A1628] border border-[#4A9EFF]/40 flex px-3 items-center gap-2">
                    <User className="size-4 text-[#4A9EFF]" />
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-transparent outline-none text-white text-sm leading-5 py-2 w-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-[#8A9BB8] text-xs leading-4">
                    Email Address
                  </label>
                  <div className="rounded-lg bg-[#0A1628] border border-[#4A9EFF]/40 flex px-3 items-center gap-2">
                    <Mail className="size-4 text-[#4A9EFF]" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent outline-none text-white text-sm leading-5 py-2 w-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-[#8A9BB8] text-xs leading-4">
                    Password
                  </label>
                  <div className="rounded-lg bg-[#0A1628] border border-[#4A9EFF]/40 flex px-3 items-center gap-2">
                    <Lock className="size-4 text-[#4A9EFF]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-transparent outline-none text-white text-sm leading-5 py-2 w-full"
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
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-[#8A9BB8] text-xs leading-4">
                    Confirm Password
                  </label>
                  <div className="rounded-lg bg-[#0A1628] border border-[#4A9EFF]/40 flex px-3 items-center gap-2">
                    <ShieldCheck className="size-4 text-[#4A9EFF]" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-transparent outline-none text-white text-sm leading-5 py-2 w-full"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      className="text-white/40 hover:text-white/70 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="size-4 accent-[#4A9EFF] rounded-sm mt-0.5"
                  />
                  <span className="text-[#8A9BB8] text-xs leading-4">
                    I agree to the{" "}
                    <span className="text-[#4A9EFF]">Terms of Service</span>
                    {" "}and{" "}
                    <span className="text-[#4A9EFF]">Privacy Policy</span>
                  </span>
                </div>
                {error && (
                  <p className="text-red-400 text-sm leading-5">{error}</p>
                )}
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="shadow-[0_0_20px_rgba(74,158,255,0.5)] font-bold rounded-lg bg-[#4A9EFF] text-white py-2 w-full disabled:opacity-60"
                >
                  <UserPlus className="size-4" />
                  {loading ? "Creating account…" : "Create Account"}
                </Button>
                <div className="flex items-center gap-4">
                  <div className="bg-white/15 flex-1 h-px" />
                  <span className="text-[#8A9BB8] text-xs leading-4">or</span>
                  <div className="bg-white/15 flex-1 h-px" />
                </div>
                <Button
                  variant="outline"
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  className="bg-transparent rounded-lg text-white border border-[#4A9EFF]/40 flex py-2 justify-center items-center gap-2 w-full"
                >
                  <svg className="size-4" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.9 3.3 14.7 2.3 12 2.3 6.9 2.3 2.8 6.4 2.8 11.5S6.9 20.7 12 20.7c5.3 0 8.8-3.7 8.8-9 0-.6-.1-1.1-.2-1.5H12z"
                    />
                  </svg>
                  <span>Sign up with Google</span>
                </Button>
              </CardContent>
              <CardFooter className="p-0 justify-center gap-1">
                <span className="text-[#8A9BB8] text-sm leading-5">
                  Already have an account?
                </span>
                <a
                  href="/auth/signin"
                  className="font-medium text-[#4A9EFF] text-sm leading-5 cursor-pointer"
                >
                  Sign In
                </a>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
