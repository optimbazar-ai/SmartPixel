import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { Lock, User, Zap } from "lucide-react";

export default function Login() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [, setLocation] = useLocation();

  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setLocation("/admin");
    }
  }, [user, setLocation]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(loginData);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      return;
    }
    registerMutation.mutate({
      username: registerData.username,
      password: registerData.password,
    });
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

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Kirish</TabsTrigger>
              <TabsTrigger value="register">Ro'yxatdan o'tish</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
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
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-username">Foydalanuvchi nomi</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-username"
                      type="text"
                      placeholder="username"
                      value={registerData.username}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          username: e.target.value,
                        })
                      }
                      className="pl-10"
                      required
                      data-testid="input-register-username"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Parol</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                      className="pl-10"
                      required
                      data-testid="input-register-password"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password">
                    Parolni tasdiqlash
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerData.confirmPassword}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="pl-10"
                      required
                      data-testid="input-register-confirm-password"
                    />
                  </div>
                </div>
                {registerData.password &&
                  registerData.confirmPassword &&
                  registerData.password !== registerData.confirmPassword && (
                    <p className="text-sm text-destructive">
                      Parollar mos kelmayapti
                    </p>
                  )}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    registerMutation.isPending ||
                    registerData.password !== registerData.confirmPassword
                  }
                  data-testid="button-register-submit"
                >
                  {registerMutation.isPending
                    ? "Yuklanmoqda..."
                    : "Ro'yxatdan o'tish"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
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
