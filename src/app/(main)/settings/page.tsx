
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email(),
  specialty: z.string().optional(),
});

const appearanceFormSchema = z.object({
  darkMode: z.boolean().default(false),
  language: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;


const DoctorSettings = () => {
    const { toast } = useToast();
    const profileForm = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
        name: "Dr. Anya Sharma",
        email: "doctor.anya@ayulink.com",
        specialty: "Ayurvedic Medicine",
        },
        mode: "onChange",
    });

     function onProfileSubmit(data: ProfileFormValues) {
        toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully updated.",
        });
    }

    return (
        <>
            <Card>
                <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                    This is how others will see you on the site.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <Form {...profileForm}>
                    <form
                    onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                    className="space-y-8"
                    >
                    <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                            <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                            <Input placeholder="Your email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={profileForm.control}
                        name="specialty"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Specialty</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., Cardiology" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit">Update profile</Button>
                    </form>
                </Form>
                </CardContent>
            </Card>
        </>
    )
}

const PatientSettings = () => {
    const { toast } = useToast();
    const profileForm = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
        name: "John Doe",
        email: "patient.john@ayulink.com",
        },
        mode: "onChange",
    });

     function onProfileSubmit(data: ProfileFormValues) {
        toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully updated.",
        });
    }

    return (
        <>
        <Card>
            <CardHeader>
            <CardTitle>My Profile</CardTitle>
            <CardDescription>
                Manage your personal information.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...profileForm}>
                <form
                onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                className="space-y-8"
                >
                <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                        <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input placeholder="Your email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit">Update profile</Button>
                </form>
            </Form>
            </CardContent>
        </Card>
        </>
    )
}


export default function SettingsPage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'doctor';

  const appearanceForm = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      darkMode: false,
      language: "en-us",
    },
  });

  useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark';
    appearanceForm.setValue('darkMode', isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [appearanceForm]);
  
  function onAppearanceSubmit(data: AppearanceFormValues) {
    if (data.darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    toast({
      title: "Appearance Settings Saved",
      description: "Your appearance preferences have been saved.",
    });
  }


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      
      {role === 'doctor' ? <DoctorSettings /> : <PatientSettings />}
      
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...appearanceForm}>
            <form
              onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)}
              className="space-y-8"
            >
              <FormField
                control={appearanceForm.control}
                name="darkMode"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Dark Mode
                      </FormLabel>
                      <FormDescription>
                       Enable dark mode for the application.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">Update appearance</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
          <CardDescription>
            Log out of your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Button variant="destructive" asChild>
              <Link href="/">
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Link>
            </Button>
        </CardContent>
      </Card>

    </div>
  );
}
