import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { FileText, CheckCircle, Clock, FileEdit } from "lucide-react";

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['/api/stats'],
  });

  const { data: recentContent } = useQuery({
    queryKey: ['/api/content'],
  });

  const statsData = stats as any;
  const contentData = recentContent as any;

  const statCards = [
    {
      title: "Jami Kontent",
      value: statsData?.totalContent || 0,
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Nashr Etilgan",
      value: statsData?.publishedContent || 0,
      icon: CheckCircle,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      title: "Rejalashtirilgan",
      value: statsData?.scheduledContent || 0,
      icon: Clock,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      title: "Qoralama",
      value: statsData?.draftContent || 0,
      icon: FileEdit,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Yuklanmoqda...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Kontent boshqaruv tizimingizga xush kelibsiz
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="p-6" data-testid={`card-stat-${index}`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.title}</div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">So'nggi Kontent</h2>
        <div className="space-y-3">
          {contentData?.slice(0, 5).map((content: any) => (
            <div
              key={content.id}
              className="flex items-center justify-between p-3 rounded-lg hover-elevate active-elevate-2 border border-border"
              data-testid={`content-item-${content.id}`}
            >
              <div className="flex-1">
                <h3 className="font-medium">{content.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(content.createdAt).toLocaleDateString('uz-UZ')}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    content.status === 'published'
                      ? 'bg-chart-3/10 text-chart-3'
                      : content.status === 'scheduled'
                      ? 'bg-chart-2/10 text-chart-2'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {content.status === 'published'
                    ? 'Nashr etilgan'
                    : content.status === 'scheduled'
                    ? 'Rejalashtirilgan'
                    : 'Qoralama'}
                </span>
              </div>
            </div>
          ))}
          {(!contentData || contentData.length === 0) && (
            <div className="text-center py-8 text-muted-foreground">
              Hali kontent yo'q. Birinchi kontentingizni yarating!
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
