import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Content } from "@shared/schema";

export default function Blog() {
  const { data: allContent, isLoading } = useQuery<Content[]>({
    queryKey: ['/api/content'],
  });

  const publishedContent = allContent?.filter(
    (item) => item.status === 'published' && item.publishToWebsite
  ) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center py-12">
              <div className="text-muted-foreground">Yuklanmoqda...</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Blog Maqolalar
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              So'nggi yangiliklar, maslahatlar va qiziqarli maqolalar
            </p>
          </div>

          {publishedContent.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Hozircha maqolalar yo'q. Tez orada yangi maqolalar qo'shiladi!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedContent.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover-elevate active-elevate-2 transition-all cursor-pointer"
                  data-testid={`card-blog-${post.id}`}
                >
                  <Link href={`/blog/${post.id}`}>
                    <div className="p-6">
                      {post.category && (
                        <Badge className="mb-3" data-testid={`badge-category-${post.id}`}>
                          {post.category}
                        </Badge>
                      )}
                      <h2 className="text-xl font-bold mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.body.substring(0, 150)}...
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString('uz-UZ', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })
                              : new Date(post.createdAt).toLocaleDateString('uz-UZ', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>5 daqiqa</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
