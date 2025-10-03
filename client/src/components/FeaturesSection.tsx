import { Card } from "@/components/ui/card";
import { Bot, Calendar, BarChart3, Zap, Globe2, Shield } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Kontent Generatori",
    description: "Sun'iy intellekt yordamida yuqori sifatli kontent yarating. GPT texnologiyasi yordamida maqolalar, postlar va boshqalar.",
  },
  {
    icon: Calendar,
    title: "Avtomatik Rejalashtirish",
    description: "Kontentingizni oldindan rejalashtiring va avtomatik ravishda kerakli vaqtda nashr qiling.",
  },
  {
    icon: Globe2,
    title: "Ko'p Kanal Tarqatish",
    description: "Bir vaqtning o'zida veb-saytingizga va Telegram kanalingizga kontent joylang.",
  },
  {
    icon: BarChart3,
    title: "Tahlil va Hisobotlar",
    description: "Kontentingiz samaradorligini kuzating va ma'lumotlarga asoslangan qarorlar qabul qiling.",
  },
  {
    icon: Zap,
    title: "Tez Integratsiya",
    description: "Bir necha daqiqada o'rnatib oling va ishlatishni boshlang. Texnik bilim talab qilinmaydi.",
  },
  {
    icon: Shield,
    title: "Xavfsiz va Ishonchli",
    description: "Ma'lumotlaringiz xavfsizligi va platformaning uzluksiz ishlashi kafolatlangan.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Kuchli Xususiyatlar
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Kontent ishlab chiqarish va tarqatish jarayonini to'liq avtomatlashtiradigan innovatsion vositalar
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 hover-elevate active-elevate-2 transition-all cursor-pointer"
              data-testid={`card-feature-${index}`}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
