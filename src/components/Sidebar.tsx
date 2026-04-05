import { LayoutDashboard, Activity, Settings, Leaf, Droplet, Wind } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboard } from "@/context/DashboardContext";

export function Sidebar({ className }: { className?: string }) {
  const { activeTab, setActiveTab } = useDashboard();

  const menuItems = [
    { id: "Dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "Analitik", label: "Analitik", icon: Activity },
    { id: "Nutrisi", label: "Nutrisi", icon: Droplet },
    { id: "Lingkungan", label: "Lingkungan", icon: Wind },
    { id: "Pengaturan", label: "Pengaturan", icon: Settings },
  ];

  return (
    <div className={cn("flex h-full w-64 flex-col border-r border-border/50 bg-background/80 backdrop-blur-xl", className)}>
      <div className="flex h-16 items-center gap-2 border-b border-border/50 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Leaf className="h-5 w-5" />
        </div>
        <span className="text-lg font-bold tracking-tight">AeroIoT</span>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-all text-sm font-medium",
              activeTab === item.id 
                ? "bg-primary/10 text-primary shadow-sm" 
                : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-border/50">
        <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
          <p className="text-sm font-medium text-primary">Sistem Online</p>
          <p className="text-xs text-muted-foreground mt-1">Semua sensor terhubung dan mengirim data.</p>
        </div>
      </div>
    </div>
  );
}
