import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";

export default function ContentManagement() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<any>(null);
  const { toast } = useToast();

  const { data: content, isLoading } = useQuery({
    queryKey: ['/api/content'],
  });

  const contentData = content as any;

  const createMutation = useMutation({
    mutationFn: async (data: any) => apiRequest('/api/content', 'POST', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      setIsCreateOpen(false);
      toast({
        title: "Muvaffaqiyat",
        description: "Kontent yaratildi",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) =>
      apiRequest(`/api/content/${id}`, 'PATCH', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      setEditingContent(null);
      toast({
        title: "Muvaffaqiyat",
        description: "Kontent yangilandi",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => apiRequest(`/api/content/${id}`, 'DELETE'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      toast({
        title: "Muvaffaqiyat",
        description: "Kontent o'chirildi",
      });
    },
  });

  const publishMutation = useMutation({
    mutationFn: async (id: string) => apiRequest(`/api/content/${id}/publish`, 'POST'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/content'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      toast({
        title: "Muvaffaqiyat",
        description: "Kontent nashr etildi",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, isEdit = false) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      body: formData.get('body') as string,
      category: formData.get('category') as string,
      status: formData.get('status') as string,
      publishToWebsite: formData.get('publishToWebsite') === 'on',
      publishToTelegram: formData.get('publishToTelegram') === 'on',
    };

    if (isEdit && editingContent) {
      updateMutation.mutate({ id: editingContent.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  if (isLoading) {
    return <div className="text-muted-foreground">Yuklanmoqda...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Kontent Boshqaruvi</h1>
          <p className="text-muted-foreground">
            Kontentlarni yaratish, tahrirlash va boshqarish
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" data-testid="button-create-content">
              <Plus className="w-4 h-4" />
              Yangi Kontent
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Yangi Kontent Yaratish</DialogTitle>
            </DialogHeader>
            <ContentForm onSubmit={(e) => handleSubmit(e, false)} isPending={createMutation.isPending} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {contentData?.map((item: any) => (
          <Card key={item.id} className="p-6" data-testid={`card-content-${item.id}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{item.body}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{new Date(item.createdAt).toLocaleDateString('uz-UZ')}</span>
                  {item.category && <span className="px-2 py-1 rounded-md bg-muted">{item.category}</span>}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === 'published'
                        ? 'bg-chart-3/10 text-chart-3'
                        : item.status === 'scheduled'
                        ? 'bg-chart-2/10 text-chart-2'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {item.status === 'published'
                      ? 'Nashr etilgan'
                      : item.status === 'scheduled'
                      ? 'Rejalashtirilgan'
                      : 'Qoralama'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {item.status !== 'published' && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => publishMutation.mutate(item.id)}
                    disabled={publishMutation.isPending}
                    data-testid={`button-publish-${item.id}`}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setEditingContent(item)}
                  data-testid={`button-edit-${item.id}`}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => deleteMutation.mutate(item.id)}
                  disabled={deleteMutation.isPending}
                  data-testid={`button-delete-${item.id}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {(!contentData || contentData.length === 0) && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">Hali kontent yo'q. Birinchi kontentingizni yarating!</p>
          </Card>
        )}
      </div>

      <Dialog open={!!editingContent} onOpenChange={() => setEditingContent(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Kontentni Tahrirlash</DialogTitle>
          </DialogHeader>
          <ContentForm
            onSubmit={(e) => handleSubmit(e, true)}
            isPending={updateMutation.isPending}
            defaultValues={editingContent}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ContentForm({
  onSubmit,
  isPending,
  defaultValues,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
  defaultValues?: any;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Sarlavha</Label>
        <Input
          id="title"
          name="title"
          defaultValue={defaultValues?.title}
          required
          data-testid="input-title"
        />
      </div>
      <div>
        <Label htmlFor="body">Matn</Label>
        <Textarea
          id="body"
          name="body"
          rows={10}
          defaultValue={defaultValues?.body}
          required
          data-testid="input-body"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Kategoriya</Label>
          <Input id="category" name="category" defaultValue={defaultValues?.category} data-testid="input-category" />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={defaultValues?.status || 'draft'}>
            <SelectTrigger data-testid="select-status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Qoralama</SelectItem>
              <SelectItem value="scheduled">Rejalashtirilgan</SelectItem>
              <SelectItem value="published">Nashr etilgan</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Switch
            id="publishToWebsite"
            name="publishToWebsite"
            defaultChecked={defaultValues?.publishToWebsite ?? true}
            data-testid="switch-website"
          />
          <Label htmlFor="publishToWebsite">Veb-saytga joylashtirish</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="publishToTelegram"
            name="publishToTelegram"
            defaultChecked={defaultValues?.publishToTelegram ?? false}
            data-testid="switch-telegram"
          />
          <Label htmlFor="publishToTelegram">Telegramga joylashtirish</Label>
        </div>
      </div>
      <Button type="submit" disabled={isPending} className="w-full" data-testid="button-submit">
        {isPending ? 'Saqlanmoqda...' : 'Saqlash'}
      </Button>
    </form>
  );
}
