import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Portfolio } from "@shared/schema";

export default function Portfolio() {
  const { data: portfolios, isLoading } = useQuery<Portfolio[]>({
    queryKey: ['/api/portfolio/published'],
  });

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
              Portfolio
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mening loyihalarim va ishlarim
            </p>
          </div>

          {(!portfolios || portfolios.length === 0) ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Hozircha loyihalar yo'q. Tez orada yangi loyihalar qo'shiladi!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolios.map((project) => (
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
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-2 flex-1">
                        {project.category && (
                          <Badge>{project.category}</Badge>
                        )}
                        <h3 className="text-xl font-bold">{project.title}</h3>
                      </div>
                      {project.featured && (
                        <Badge variant="secondary" className="shrink-0">Featured</Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {project.description}
                    </p>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded-md bg-muted">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-3 pt-2 border-t border-border">
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
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
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
