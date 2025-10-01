
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/icons/logo";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const initialRole = searchParams.get('role') === 'patient' ? 'patient' : 'doctor';
  
  const [email, setEmail] = useState(initialRole === 'doctor' ? "doctor.anya@ayulink.com" : "patient.john@ayulink.com");
  const [password, setPassword] = useState("password");
  const [role, setRole] = useState<"doctor" | "patient">(initialRole);
  const loginImage = PlaceHolderImages.find(p => p.id === "login-hero");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'doctor' && email === "doctor.anya@ayulink.com" && password === "password") {
       toast({
        title: "Login Successful",
        description: `Welcome back, Dr. Sharma!`,
      });
      router.push(`/dashboard?role=${role}`);
    } else if (role === 'patient' && email === "patient.john@ayulink.com" && password === "password") {
      toast({
        title: "Login Successful",
        description: `Welcome back, John!`,
      });
      router.push(`/dashboard?role=${role}`);
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid credentials for the selected role.",
      });
    }
  };

  const handleRoleChange = (value: string) => {
    const newRole = value as "doctor" | "patient";
    setRole(newRole);
    if (newRole === 'patient') {
      setEmail("patient.john@ayulink.com");
    } else {
      setEmail("doctor.anya@ayulink.com");
    }
    router.replace(`/login?role=${newRole}`, { scroll: false });
  }

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-[380px] gap-8">
          <div className="grid gap-4 text-center">
             <Link href="/" className="flex justify-center items-center gap-3 mb-2">
               <Logo className="size-9 text-primary" />
                <h1 className="text-4xl font-bold tracking-tight">AyuLink</h1>
            </Link>
            <p className="text-balance text-muted-foreground text-lg">
              Login to access your personalized dashboard.
            </p>
          </div>
          <form onSubmit={handleLogin} className="grid gap-6">
             <div className="grid gap-2">
                <Label htmlFor="role" className="text-base">Your Role</Label>
                 <Select value={role} onValueChange={handleRoleChange}>
                    <SelectTrigger className="text-base h-11">
                        <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="patient">Patient</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-base">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 text-base"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password"  className="text-base">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm text-primary hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                 className="h-11 text-base"
              />
            </div>
            <Button type="submit" className="w-full h-12 text-lg font-semibold">
              Login
            </Button>
          </form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        {loginImage && (
            <Image
            src={loginImage.imageUrl}
            alt={loginImage.description}
            fill
            className="object-cover"
            data-ai-hint={loginImage.imageHint}
            priority
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent"></div>
      </div>
    </div>
  );
}
