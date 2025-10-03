import { Link } from "wouter";
import { Zap, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Xususiyatlar", href: "#features" },
    { label: "Narxlar", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Yangiliklar", href: "#updates" },
  ],
  company: [
    { label: "Biz haqimizda", href: "#about" },
    { label: "Blog", href: "#blog" },
    { label: "Ish o'rinlari", href: "#careers" },
    { label: "Aloqa", href: "#contact" },
  ],
  resources: [
    { label: "Hujjatlar", href: "#docs" },
    { label: "Qo'llanma", href: "#guide" },
    { label: "API", href: "#api" },
    { label: "Qo'llab-quvvatlash", href: "#support" },
  ],
  legal: [
    { label: "Maxfiylik", href: "#privacy" },
    { label: "Shartlar", href: "#terms" },
    { label: "Cookie", href: "#cookies" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-br from-primary to-accent">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                SmartPixel.uz
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              AI yordamida kontent yaratish va tarqatishni avtomatlashtiramiz
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-md hover-elevate active-elevate-2" data-testid="link-facebook">
                <Facebook className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a href="#" className="p-2 rounded-md hover-elevate active-elevate-2" data-testid="link-twitter">
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a href="#" className="p-2 rounded-md hover-elevate active-elevate-2" data-testid="link-instagram">
                <Instagram className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
              <a href="#" className="p-2 rounded-md hover-elevate active-elevate-2" data-testid="link-linkedin">
                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Mahsulot</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Kompaniya</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resurslar</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Huquqiy</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © 2025 SmartPixel.uz. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
}
