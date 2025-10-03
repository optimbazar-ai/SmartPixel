import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import workflowImage from "@assets/generated_images/Automation_workflow_diagram_5356da55.png";

const steps = [
  {
    number: "01",
    title: "AI Kontent Yaratish",
    description: "Sun'iy intellekt sizning mavzuyingiz bo'yicha yuqori sifatli kontent yaratadi",
  },
  {
    number: "02",
    title: "Rejalashtirish",
    description: "Kontentni istalgan vaqtga rejalashtirib, avtomatik nashr qilish uchun sozlang",
  },
  {
    number: "03",
    title: "Ko'p Kanalli Tarqatish",
    description: "Bir vaqtning o'zida veb-sayt va Telegram kanaliga avtomatik joylashtiring",
  },
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="py-20 md:py-32 bg-card/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Qanday Ishlaydi?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Uchta oddiy bosqichda to'liq avtomatlashtirilgan kontent yaratish va tarqatish
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <Card key={index} className="p-6 hover-elevate active-elevate-2" data-testid={`card-step-${index}`}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">{step.number}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-muted-foreground hidden lg:block" />
                  )}
                </div>
              </Card>
            ))}
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
            <img 
              src={workflowImage} 
              alt="Automation workflow" 
              className="relative rounded-xl border border-border shadow-2xl"
              data-testid="img-workflow"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
