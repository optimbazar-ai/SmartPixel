import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, ExternalLink, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Portfolio } from "@shared/schema";

export default function PortfolioManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Portfolio | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    projectUrl: "",
    githubUrl: "",
    technologies: "",
    category: "",
    status: "draft",
    featured: false,
    order: 0,
  });
  const { toast } = useToast();

  const { data: portfolioItems, isLoading } = useQuery<Portfolio[]>({
    queryKey: ['/api/portfolio'],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const portfolioData = {
        ...data,
        technologies: data.technologies ? data.technologies.split(',').map((t: string) => t.trim()) : [],
        order: parseInt(data.order) || 0,
      };
      return apiRequest('/api/portfolio', 'POST', portfolioData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio'] });
      setIsDialogOpen(false);
      resetForm();
      toast({ title: "Muvaffaqiyat", description: "Portfolio qo'shildi" });
    },
    onError: () => {
      toast({ title: "Xato", description: "Portfolio qo'shishda xatolik", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const portfolioData = {
        ...data,
        technologies: data.technologies ? data.technologies.split(',').map((t: string) => t.trim()) : [],
        order: parseInt(data.order) || 0,
      };
      return apiRequest(`/api/portfolio/${id}`, 'PATCH', portfolioData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio'] });
      setIsDialogOpen(false);
      setEditingItem(null);
      resetForm();
      toast({ title: "Muvaffaqiyat", description: "Portfolio yangilandi" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => apiRequest(`/api/portfolio/${id}`, 'DELETE'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio'] });
      toast({ title: "Muvaffaqiyat", description: "Portfolio o'chirildi" });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      projectUrl: "",
      githubUrl: "",
      technologies: "",
      category: "",
      status: "draft",
      featured: false,
      order: 0,
    });
    setEditingItem(null);
  };

  const handleEdit = (item: Portfolio) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl || "",
      projectUrl: item.projectUrl || "",
      githubUrl: item.githubUrl || "",
      technologies: item.technologies?.join(', ') || "",
      category: item.category || "",
      status: item.status,
      featured: item.featured,
      order: item.order,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Yuklanmoqda...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Portfolio Boshqaruvi</h1>
          <p className="text-muted-foreground">
            Loyihalaringizni boshqaring va namoyish qiling
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2" data-testid="button-add-portfolio">
              <Plus className="w-4 h-4" />
              Yangi Portfolio
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Portfolio Tahrirlash" : "Yangi Portfolio"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Nomi *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  data-testid="input-portfolio-title"
                />
              </div>
              <div>
                <Label htmlFor="description">Tavsif *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                  data-testid="textarea-description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="imageUrl">Rasm URL</Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://..."
                    data-testid="input-image-url"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Kategoriya</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Web, Mobile, etc."
                    data-testid="input-category"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="projectUrl">Loyiha havolasi</Label>
                  <Input
                    id="projectUrl"
                    value={formData.projectUrl}
                    onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                    placeholder="https://..."
                    data-testid="input-project-url"
                  />
                </div>
                <div>
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    data-testid="input-github-url"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="technologies">Texnologiyalar (vergul bilan)</Label>
                <Input
                  id="technologies"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, TypeScript, Node.js"
                  data-testid="input-technologies"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger data-testid="select-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Qoralama</SelectItem>
                      <SelectItem value="published">Nashr etilgan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="order">Tartib</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    data-testid="input-order"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4"
                      data-testid="checkbox-featured"
                    />
                    <span className="text-sm">Featured</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-submit-portfolio">
                  {editingItem ? "Yangilash" : "Qo'shish"}
                </Button>
                <Button type="button" variant="outline" onClick={() => {
                  setIsDialogOpen(false);
                  resetForm();
                }} data-testid="button-cancel">
                  Bekor qilish
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioItems?.map((item) => (
          <Card key={item.id} className="overflow-hidden" data-testid={`card-portfolio-${item.id}`}>
            {item.imageUrl && (
              <div className="aspect-video bg-muted overflow-hidden">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-6 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
                {item.featured && (
                  <Badge variant="secondary" className="shrink-0">Featured</Badge>
                )}
              </div>
              {item.category && (
                <Badge>{item.category}</Badge>
              )}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>
              {item.technologies && item.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {item.technologies.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-md bg-muted">
                      {tech}
                    </span>
                  ))}
                  {item.technologies.length > 3 && (
                    <span className="text-xs px-2 py-1 rounded-md bg-muted">
                      +{item.technologies.length - 3}
                    </span>
                  )}
                </div>
              )}
              <div className="flex items-center gap-2 pt-2">
                {item.projectUrl && (
                  <a href={item.projectUrl} target="_blank" rel="noopener noreferrer" className="text-xs flex items-center gap-1 text-primary hover:underline">
                    <ExternalLink className="w-3 h-3" />
                    Demo
                  </a>
                )}
                {item.githubUrl && (
                  <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs flex items-center gap-1 text-primary hover:underline">
                    <Github className="w-3 h-3" />
                    Code
                  </a>
                )}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <Badge variant={item.status === 'published' ? 'default' : 'outline'}>
                  {item.status === 'published' ? 'Nashr etilgan' : 'Qoralama'}
                </Badge>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(item)} data-testid={`button-edit-${item.id}`}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(item.id)} data-testid={`button-delete-${item.id}`}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {(!portfolioItems || portfolioItems.length === 0) && (
        <Card className="p-12">
          <div className="text-center text-muted-foreground">
            <p className="text-lg mb-2">Hali portfolio yo'q</p>
            <p className="text-sm">Birinchi portfoliongizni qo'shing</p>
          </div>
        </Card>
      )}
    </div>
  );
}
