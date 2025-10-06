import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useState, useEffect } from "react";

export default function Settings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Record<string, string>>({});

  const { data: settingsData, isLoading } = useQuery({
    queryKey: ['/api/settings'],
  });

  useEffect(() => {
    if (settingsData) {
      const data = settingsData as any;
      const settingsMap: Record<string, string> = {};
      data.forEach((setting: any) => {
        settingsMap[setting.key] = setting.value;
      });
      setSettings(settingsMap);
    }
  }, [settingsData]);

  const updateMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) =>
      apiRequest(`/api/settings/${key}`, 'PUT', { value }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/settings'] });
      toast({
        title: "Muvaffaqiyat",
        description: "Sozlamalar saqlandi",
      });
    },
  });

  const handleSave = async () => {
    const promises = Object.entries(settings).map(([key, value]) =>
      updateMutation.mutateAsync({ key, value })
    );
    await Promise.all(promises);
  };

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return <div className="text-muted-foreground">Yuklanmoqda...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Sozlamalar</h1>
        <p className="text-muted-foreground">
          Tizim sozlamalarini boshqarish
        </p>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Telegram Integratsiya</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="telegram_bot_token">Bot Token</Label>
            <Input
              id="telegram_bot_token"
              type="password"
              value={settings.telegram_bot_token || ''}
              onChange={(e) => handleChange('telegram_bot_token', e.target.value)}
              placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
              data-testid="input-bot-token"
            />
            <p className="text-sm text-muted-foreground mt-1">
              @BotFather dan olingan token
            </p>
          </div>
          <div>
            <Label htmlFor="telegram_channel_id">Kanal ID</Label>
            <Input
              id="telegram_channel_id"
              value={settings.telegram_channel_id || ''}
              onChange={(e) => handleChange('telegram_channel_id', e.target.value)}
              placeholder="@kanalingiz yoki -1001234567890"
              data-testid="input-channel-id"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Kanalingiz username yoki ID raqami
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">AI Sozlamalari</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="openai_model">OpenAI Model</Label>
            <Input
              id="openai_model"
              value={settings.openai_model || ''}
              onChange={(e) => handleChange('openai_model', e.target.value)}
              placeholder="gpt-4o-mini"
              data-testid="input-model"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Foydalanilayotgan AI model nomi
            </p>
          </div>
          <div>
            <Label htmlFor="default_category">Standart Kategoriya</Label>
            <Input
              id="default_category"
              value={settings.default_category || ''}
              onChange={(e) => handleChange('default_category', e.target.value)}
              placeholder="Texnologiya"
              data-testid="input-default-category"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Yangi kontent uchun standart kategoriya
            </p>
          </div>
        </div>
      </Card>

      <Button
        onClick={handleSave}
        disabled={updateMutation.isPending}
        className="gap-2"
        data-testid="button-save-settings"
      >
        <Save className="w-4 h-4" />
        {updateMutation.isPending ? 'Saqlanmoqda...' : 'Sozlamalarni Saqlash'}
      </Button>
    </div>
  );
}
