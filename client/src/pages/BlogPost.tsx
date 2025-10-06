import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Content } from "@shared/schema";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:id");
  const id = params?.id;

  const { data: post, isLoading } = useQuery<Content>({
    queryKey: ['/api/content', id],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center py-12">
              <div className="text-muted-foreground">Yuklanmoqda...</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold mb-4">Maqola topilmadi</h1>
              <Link href="/blog">
                <Button data-testid="button-back-to-blog">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Blogga qaytish
                </Button>
              </Link>
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
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/blog">
            <Button variant="ghost" className="mb-6 hover-elevate" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Blogga qaytish
            </Button>
          </Link>

          <article>
            <Card className="p-8 md:p-12">
              {post.category && (
                <Badge className="mb-4" data-testid="badge-category">
                  {post.category}
                </Badge>
              )}
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString('uz-UZ', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : new Date(post.createdAt).toLocaleDateString('uz-UZ', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                  </span>
                </div>
              </div>

              <div className="prose prose-lg max-w-none dark:prose-invert">
                {post.body.split('\n').map((paragraph, index) => {
                  if (!paragraph.trim()) return null;
                  
                  if (paragraph.startsWith('# ')) {
                    return (
                      <h1 key={index} className="text-3xl font-bold mt-8 mb-4">
                        {paragraph.substring(2)}
                      </h1>
                    );
                  }
                  
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-2xl font-bold mt-6 mb-3">
                        {paragraph.substring(3)}
                      </h2>
                    );
                  }
                  
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-xl font-bold mt-4 mb-2">
                        {paragraph.substring(4)}
                      </h3>
                    );
                  }
                  
                  if (paragraph.startsWith('- ')) {
                    return (
                      <li key={index} className="ml-4 mb-2">
                        {paragraph.substring(2)}
                      </li>
                    );
                  }
                  
                  return (
                    <p key={index} className="mb-4 text-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </Card>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
