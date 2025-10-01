
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons/logo";
import { useToast } from "@/hooks/use-toast";

const SESSION_STORAGE_KEY = "autoLoginDismissed";

export default function AutoLoginDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const dismissed = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1500); // Delay before showing the dialog
      return () => clearTimeout(timer);
    }
  }, []);

  const handleLogin = (role: "doctor" | "patient") => {
    toast({
      title: "Login Successful",
      description: `Welcome! Redirecting to your dashboard...`,
    });
    router.push(`/dashboard?role=${role}`);
    setOpen(false);
  };

  const handleClose = () => {
    sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center items-center gap-3 mb-2">
            <Logo className="size-9 text-primary" />
            <DialogTitle className="text-3xl font-bold tracking-tight">
              Welcome to AyuLink
            </DialogTitle>
          </div>
          <DialogDescription className="text-center text-lg">
            Access your personalized dashboard in one click.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <Button
            onClick={() => handleLogin("doctor")}
            className="h-14 text-lg"
          >
            Login as Doctor
          </Button>
          <Button
            onClick={() => handleLogin("patient")}
            variant="secondary"
            className="h-14 text-lg"
          >
            Login as Patient
          </Button>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button type="button" variant="link" onClick={handleClose}>
            Login Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
