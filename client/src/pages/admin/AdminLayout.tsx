import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/AppSidebar";
import { Route, Switch } from "wouter";
import Dashboard from "./Dashboard";
import ContentManagement from "./ContentManagement";
import AIGenerator from "./AIGenerator";
import Settings from "./Settings";

export default function AdminLayout() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b border-border">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('uz-UZ', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            <Switch>
              <Route path="/admin" component={Dashboard} />
              <Route path="/admin/content" component={ContentManagement} />
              <Route path="/admin/generator" component={AIGenerator} />
              <Route path="/admin/settings" component={Settings} />
              <Route path="/admin/schedule" component={Dashboard} />
              <Route path="/admin/stats" component={Dashboard} />
            </Switch>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
