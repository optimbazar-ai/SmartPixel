import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "199,000",
    period: "/oyiga",
    description: "Kichik biznes va startaplar uchun",
    features: [
      "100 ta kontent/oyiga",
      "Veb-sayt va Telegram integratsiya",
      "Asosiy AI templates",
      "Email qo'llab-quvvatlash",
    ],
  },
  {
    name: "Professional",
    price: "499,000",
    period: "/oyiga",
    description: "O'sib borayotgan bizneslar uchun",
    features: [
      "500 ta kontent/oyiga",
      "Veb-sayt va Telegram integratsiya",
      "Barcha AI templates",
      "Prioritet qo'llab-quvvatlash",
      "Tahlil va hisobotlar",
      "Ko'p foydalanuvchi",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Shartnoma",
    period: "bo'yicha",
    description: "Yirik kompaniyalar uchun",
    features: [
      "Cheksiz kontent",
      "Barcha integratsiyalar",
      "Maxsus AI model o'rgatish",
      "24/7 qo'llab-quvvatlash",
      "Maxsus funksiyalar",
      "API kirish",
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-card/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            O'zingizga Mos Rejani Tanlang
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Biznesingiz ehtiyojiga mos keladigan tarif rejasini tanlang
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`p-8 hover-elevate active-elevate-2 transition-all ${
                plan.popular ? 'border-primary shadow-lg shadow-primary/20' : ''
              }`}
              data-testid={`card-plan-${index}`}
            >
              {plan.popular && (
                <div className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium mb-4">
                  Mashhur
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-2">{plan.period}</span>
              </div>
              <Button 
                className="w-full mb-8" 
                variant={plan.popular ? "default" : "outline"}
                data-testid={`button-select-plan-${index}`}
              >
                {plan.price === "Shartnoma" ? "Aloqaga chiqish" : "Boshlash"}
              </Button>
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
