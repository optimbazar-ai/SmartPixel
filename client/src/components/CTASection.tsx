import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    toast({
      title: "Muvaffaqiyatli!",
      description: "Tez orada siz bilan bog'lanamiz.",
    });
    setEmail("");
  };

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Bugun Boshlab Ko'ring
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          AI yordamida kontent yaratishni avtomatlashtirib, biznesingizni keyingi bosqichga olib chiqing
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
          <Input 
            type="email" 
            placeholder="Email manzilingiz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            data-testid="input-email"
            required
          />
          <Button type="submit" className="gap-2" data-testid="button-subscribe">
            Obuna bo'lish
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
        <Link href="/contact">
          <Button variant="outline" size="lg" className="gap-2" data-testid="button-full-contact">
            To'liq aloqa formasi
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <p className="text-sm text-muted-foreground mt-4">
          14 kunlik bepul sinov. Kredit karta talab qilinmaydi.
        </p>
      </div>
    </section>
  );
}
