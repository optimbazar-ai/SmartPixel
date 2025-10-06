import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Lock, User, Zap } from "lucide-react";

export default function Login() {
  const { user, loginMutation } = useAuth();
  const [, setLocation] = useLocation();

  const [loginData, setLoginData] = useState({ username: "", password: "" });

  useEffect(() => {
    if (user) {
      setLocation("/admin");
    }
  }, [user, setLocation]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-md p-8">
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gradient-to-br from-primary to-accent">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              SmartPixel.uz
            </span>
          </div>

          <div className="w-full">
            <h2 className="text-2xl font-bold mb-6">Admin Panelga Kirish</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-username">Foydalanuvchi nomi</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-username"
                      type="text"
                      placeholder="username"
                      value={loginData.username}
                      onChange={(e) =>
                        setLoginData({ ...loginData, username: e.target.value })
                      }
                      className="pl-10"
                      required
                      data-testid="input-login-username"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Parol</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      className="pl-10"
                      required
                      data-testid="input-login-password"
                    />
                  </div>
                </div>
              <Button
                type="submit"
                className="w-full"
                disabled={loginMutation.isPending}
                data-testid="button-login-submit"
              >
                {loginMutation.isPending ? "Yuklanmoqda..." : "Kirish"}
              </Button>
            </form>
            
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Default login:</strong><br />
                Username: admin<br />
                Password: admin123<br />
                <span className="text-xs text-destructive">Iltimos, parolni tezda o'zgartiring!</span>
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-accent/20 p-8">
        <div className="max-w-md">
          <h2 className="text-4xl font-bold mb-4">
            AI-powered kontent avtomatlashtiruvi
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Sun'iy intellekt yordamida kontent yarating, rejalang va bir nechta
            kanallarga avtomatik joylashtiring.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-primary-foreground">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">AI Kontent Generatori</h3>
                <p className="text-sm text-muted-foreground">
                  Blog, ijtimoiy tarmoq va yangiliklar uchun avtomatik kontent
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-primary-foreground">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Ko'p Kanal Tarqatish</h3>
                <p className="text-sm text-muted-foreground">
                  Veb-sayt va Telegram kanaliga bir vaqtda joylashtiring
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-primary-foreground">✓</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Avtomatik Rejalashtirish</h3>
                <p className="text-sm text-muted-foreground">
                  Kontentni ma'lum vaqtda avtomatik chop qilish
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
