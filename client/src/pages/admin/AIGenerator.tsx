import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";

export default function AIGenerator() {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("uz");
  const [template, setTemplate] = useState("blog");
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const { toast } = useToast();

  const generateMutation = useMutation({
    mutationFn: async (data: any) => apiRequest('/api/ai/generate', 'POST', data),
    onSuccess: (data) => {
      setGeneratedContent(data);
      toast({
        title: "Muvaffaqiyat",
        description: "Kontent AI tomonidan yaratildi",
      });
    },
    onError: () => {
      toast({
        title: "Xato",
        description: "Kontent yaratishda xatolik yuz berdi",
        variant: "destructive",
      });
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => apiRequest('/api/content', 'POST', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      setGeneratedContent(null);
      setTopic("");
      setCategory("");
      toast({
        title: "Muvaffaqiyat",
        description: "Kontent saqlandi",
      });
    },
  });

  const handleGenerate = () => {
    if (!topic.trim()) {
      toast({
        title: "Xato",
        description: "Mavzuni kiriting",
        variant: "destructive",
      });
      return;
    }

    generateMutation.mutate({
      topic,
      category,
      language,
      template,
    });
  };

  const handleSave = () => {
    if (!generatedContent) return;

    saveMutation.mutate({
      title: generatedContent.title,
      body: generatedContent.body,
      category: generatedContent.category || category,
      status: 'draft',
      publishToWebsite: true,
      publishToTelegram: false,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">AI Kontent Generator</h1>
        <p className="text-muted-foreground">
          Sun'iy intellekt yordamida yuqori sifatli kontent yarating
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Kontent sozlamalari
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="topic">Mavzu</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Masalan: Sun'iy intellekt haqida"
                data-testid="input-topic"
              />
            </div>
            <div>
              <Label htmlFor="category">Kategoriya</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Masalan: Texnologiya"
                data-testid="input-category"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="language">Til</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger data-testid="select-language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uz">O'zbek</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="template">Shablon</Label>
                <Select value={template} onValueChange={setTemplate}>
                  <SelectTrigger data-testid="select-template">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog">Blog Maqolasi</SelectItem>
                    <SelectItem value="social">Ijtimoiy Tarmoq</SelectItem>
                    <SelectItem value="news">Yangilik</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              onClick={handleGenerate}
              disabled={generateMutation.isPending}
              className="w-full gap-2"
              data-testid="button-generate"
            >
              <Sparkles className="w-4 h-4" />
              {generateMutation.isPending ? 'Yaratilmoqda...' : 'Kontent Yaratish'}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Yaratilgan Kontent</h2>
            {generatedContent && (
              <Button
                onClick={handleSave}
                disabled={saveMutation.isPending}
                size="sm"
                className="gap-2"
                data-testid="button-save"
              >
                <Save className="w-4 h-4" />
                Saqlash
              </Button>
            )}
          </div>
          {generatedContent ? (
            <div className="space-y-4">
              <div>
                <Label>Sarlavha</Label>
                <div className="p-3 rounded-md bg-muted mt-1">
                  <p className="font-medium">{generatedContent.title}</p>
                </div>
              </div>
              <div>
                <Label>Matn</Label>
                <Textarea
                  value={generatedContent.body}
                  readOnly
                  rows={15}
                  className="mt-1"
                  data-testid="textarea-generated"
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[400px] border-2 border-dashed border-border rounded-lg">
              <div className="text-center text-muted-foreground">
                <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>AI yaratgan kontent bu yerda ko'rinadi</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
