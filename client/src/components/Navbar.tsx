import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<'uz' | 'en'>('uz');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'uz' ? 'en' : 'uz');
  };

  const navItems = [
    { label: language === 'uz' ? 'Bosh sahifa' : 'Home', href: '/', isRoute: true },
    { label: language === 'uz' ? 'Portfolio' : 'Portfolio', href: '/portfolio', isRoute: true },
    { label: language === 'uz' ? 'Blog' : 'Blog', href: '/blog', isRoute: true },
    { label: language === 'uz' ? 'Xususiyatlar' : 'Features', href: '#features', isRoute: false },
    { label: language === 'uz' ? 'Qanday ishlaydi' : 'How it works', href: '#workflow', isRoute: false },
    { label: language === 'uz' ? 'Narxlar' : 'Pricing', href: '#pricing', isRoute: false },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-2 py-1 -ml-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-br from-primary to-accent">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              SmartPixel.uz
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  data-testid={`link-${item.href.replace(/\//g, '') || 'home'}`}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  data-testid={`link-${item.href.slice(1)}`}
                >
                  {item.label}
                </a>
              )
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              data-testid="button-language-toggle"
              className="hover-elevate active-elevate-2"
            >
              <Globe className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="sm" data-testid="button-login">
              {language === 'uz' ? 'Kirish' : 'Login'}
            </Button>
            <Button size="sm" data-testid="button-get-started">
              {language === 'uz' ? 'Boshlash' : 'Get Started'}
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover-elevate active-elevate-2"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-menu-toggle"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                item.isRoute ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                    data-testid={`mobile-link-${item.href.replace(/\//g, '') || 'home'}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                    data-testid={`mobile-link-${item.href.slice(1)}`}
                  >
                    {item.label}
                  </a>
                )
              ))}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" data-testid="mobile-button-login">
                  {language === 'uz' ? 'Kirish' : 'Login'}
                </Button>
                <Button size="sm" className="flex-1" data-testid="mobile-button-get-started">
                  {language === 'uz' ? 'Boshlash' : 'Get Started'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
