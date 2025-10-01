
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons/logo";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import AutoLoginDialog from "@/components/auth/auto-login-dialog";
import { Suspense } from "react";
import { ArrowRight, Bot, CheckCircle, FileText } from "lucide-react";

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center p-6 text-center bg-card rounded-xl shadow-soft hover:shadow-medium transition-shadow duration-300">
      <div className="mb-4 text-primary bg-primary/10 p-3 rounded-full">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  )
}

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === "landing-hero");
  const feature1Image = PlaceHolderImages.find(p => p.id === "feature-1");
  const feature2Image = PlaceHolderImages.find(p => p.id === "feature-2");
  const feature3Image = PlaceHolderImages.find(p => p.id === "feature-3");

  return (
    <>
      <Suspense>
        <AutoLoginDialog />
      </Suspense>
      <div className="flex flex-col min-h-screen bg-background font-sans text-foreground">
        <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
          <Link href="#" className="flex items-center justify-center gap-2">
            <Logo className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold tracking-tight">AyuLink</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
             <Button asChild>
                <Link href="/login">Login / Sign Up</Link>
            </Button>
          </nav>
        </header>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-28 bg-gradient-subtle">
            <div className="container px-4 md:px-6 animate-fade-in">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-6">
                  <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Bridging Traditional Wisdom with Modern Medicine
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      AyuLink is an intelligent platform integrating NAMASTE and ICD-11 codes to streamline diagnosis and reporting for traditional Indian medicine.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button asChild size="lg">
                      <Link href="/login?role=doctor">
                        Get Started as a Doctor
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                     <Button asChild size="lg" variant="secondary">
                       <Link href="/login?role=patient">
                        Patient Portal
                      </Link>
                    </Button>
                  </div>
                </div>
                 {heroImage && (
                    <Image
                      src={heroImage.imageUrl}
                      alt={heroImage.description}
                      width={600}
                      height={600}
                      className="mx-auto aspect-square overflow-hidden rounded-xl object-contain sm:w-full lg:order-last"
                      data-ai-hint={heroImage.imageHint}
                    />
                )}
              </div>
            </div>
          </section>

          <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                   <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-semibold">Key Features</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose AyuLink?</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    AyuLink provides a comprehensive suite of tools designed to enhance diagnostic accuracy, ensure compliance, and improve patient care in traditional medicine.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
                <FeatureCard 
                    icon={<FileText className="w-8 h-8"/>}
                    title="Intelligent Diagnosis Search"
                    description="Get dual-code suggestions from NAMASTE and ICD-11 with our AI-powered search, filterable by Ayurveda, Siddha, or Unani systems."
                />
                <FeatureCard 
                    icon={<CheckCircle className="w-8 h-8"/>}
                    title="Real-time Code Validation"
                    description="Ensure compliance and accuracy with built-in validation against NAMASTE coding rules, reducing errors and saving time."
                />
                <FeatureCard 
                    icon={<Bot className="w-8 h-8"/>}
                    title="AI-Powered Reporting"
                    description="Automatically generate insightful reports formatted for the Ministry of Ayush, summarizing trends and system distribution."
                />
              </div>
            </div>
          </section>

          <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
            <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                 <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-semibold">Our Mission</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Empowering Traditional Medicine</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our mission is to provide healthcare professionals with the tools they need to seamlessly integrate traditional medical practices into the modern healthcare ecosystem. By supporting dual coding and FHIR R4 compliance, we facilitate interoperability and advance the global recognition of traditional medicine.
                </p>
              </div>
                {feature2Image && (
                    <Image
                    src={feature2Image.imageUrl}
                    alt={feature2Image.description}
                    width={550}
                    height={310}
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                    data-ai-hint={feature2Image.imageHint}
                    />
                )}
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-muted-foreground">&copy; 2024 AyuLink. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-xs hover:underline underline-offset-4">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4">
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
    </>
  );
}
