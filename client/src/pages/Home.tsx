import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import WorkflowSection from "@/components/WorkflowSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, ExternalLink, Github } from "lucide-react";
import type { Portfolio, Content } from "@shared/schema";

export default function Home() {
  const { data: portfolios } = useQuery<Portfolio[]>({
    queryKey: ['/api/portfolio/published'],
  });

  const { data: allContent } = useQuery<Content[]>({
    queryKey: ['/api/content'],
  });

  const publishedPosts = allContent?.filter(
    (item) => item.status === 'published' && item.publishToWebsite
  ).slice(0, 3) || [];

  const featuredPortfolios = portfolios?.filter(p => p.featured).slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <HeroSection />

        {featuredPortfolios.length > 0 && (
          <section className="py-20 bg-muted/30">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Tanlangan Loyihalar
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Eng yaxshi va muvaffaqiyatli loyihalarimiz
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPortfolios.map((project) => (
                  <Card key={project.id} className="overflow-hidden hover-elevate active-elevate-2 transition-all" data-testid={`card-portfolio-${project.id}`}>
                    {project.imageUrl && (
                      <div className="aspect-video bg-muted overflow-hidden">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6 space-y-3">
                      {project.category && (
                        <Badge>{project.category}</Badge>
                      )}
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {project.description}
                      </p>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech, i) => (
                            <span key={i} className="text-xs px-2 py-1 rounded-md bg-muted">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-3 pt-2">
                        {project.projectUrl && (
                          <a 
                            href={project.projectUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-primary hover:underline"
                            data-testid={`link-project-${project.id}`}
                          >
                            <ExternalLink className="w-4 h-4" />
                            Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-primary hover:underline"
                            data-testid={`link-github-${project.id}`}
                          >
                            <Github className="w-4 h-4" />
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {publishedPosts.length > 0 && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    So'nggi Maqolalar
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Yangiliklar va qiziqarli ma'lumotlar
                  </p>
                </div>
                <Link href="/blog">
                  <Button variant="outline" className="gap-2" data-testid="button-view-all-blog">
                    Barchasini ko'rish
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {publishedPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover-elevate active-elevate-2 transition-all cursor-pointer" data-testid={`card-blog-${post.id}`}>
                    <Link href={`/blog/${post.id}`}>
                      <div className="p-6 space-y-3">
                        {post.category && (
                          <Badge className="mb-2">{post.category}</Badge>
                        )}
                        <h3 className="text-xl font-bold line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {post.body.substring(0, 120)}...
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
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
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        <FeaturesSection />
        <WorkflowSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
