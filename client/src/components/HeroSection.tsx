import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/AI_automation_dashboard_hero_09d92999.png";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        <img 
          src={heroImage} 
          alt="AI-powered automation dashboard" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            AI-Powered Content Automation
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent leading-tight">
          Kontent yaratish va tarqatishni avtomatlashtiramiz
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 px-2">
          Sun'iy intellekt yordamida avtomatik kontent yarating, rejalang va veb-saytingizga hamda Telegram kanalingizga bir vaqtning o'zida joylashtiring
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/contact">
            <Button size="lg" className="gap-2" data-testid="button-hero-get-started">
              Bepul boshlash
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/portfolio">
            <Button size="lg" variant="outline" className="gap-2 backdrop-blur-sm bg-background/50" data-testid="button-hero-demo">
              Demo ko'rish
            </Button>
          </Link>
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto px-2">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2" data-testid="text-stat-content">10,000+</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Yaratilgan kontent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2" data-testid="text-stat-users">500+</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Faol foydalanuvchilar</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2" data-testid="text-stat-saved">95%</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Vaqt tejash</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2" data-testid="text-stat-channels">2</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Kanal integratsiyasi</div>
          </div>
        </div>
      </div>
    </section>
  );
}
