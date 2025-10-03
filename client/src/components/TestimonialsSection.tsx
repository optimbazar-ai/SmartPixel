import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import testimonial1 from "@assets/generated_images/Testimonial_profile_photo_1_7d9031a1.png";
import testimonial2 from "@assets/generated_images/Testimonial_profile_photo_2_2b4bacbc.png";

const testimonials = [
  {
    name: "Malika Rahimova",
    role: "Marketing Direktori, TechStart",
    image: testimonial1,
    content: "SmartPixel.uz platformasi bizning kontent yaratish jarayonimizni butunlay o'zgartirdi. Endi vaqtimizni strategiyaga sarflash mumkin.",
    rating: 5,
  },
  {
    name: "Jasur Karimov",
    role: "SMM Menejer, Digital Agency",
    image: testimonial2,
    content: "Avtomatik kontent yaratish va bir vaqtning o'zida bir nechta kanalga joylashtirish - bu haqiqatan ham ajoyib! Vaqt va resurslarni ancha tejadik.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Mijozlar Fikri
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Minglab biznes SmartPixel.uz platformasiga ishonadi
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 hover-elevate active-elevate-2" data-testid={`card-testimonial-${index}`}>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-6 text-lg leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 flex justify-center gap-8 flex-wrap">
          {['TechCorp', 'StartHub', 'MediaNet', 'DigiFlow'].map((company, index) => (
            <div 
              key={index} 
              className="text-2xl font-bold text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors"
              data-testid={`text-company-${index}`}
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
