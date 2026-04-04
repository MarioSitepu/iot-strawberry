import { LayoutDashboard, Activity, Settings, Leaf, Droplet, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-full w-64 flex-col border-r border-border/50 bg-background/80 backdrop-blur-xl", className)}>
      <div className="flex h-16 items-center gap-2 border-b border-border/50 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Leaf className="h-5 w-5" />
        </div>
        <span className="text-lg font-bold tracking-tight">AeroIoT</span>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        <a href="#" className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2.5 text-primary transition-all">
          <LayoutDashboard className="h-5 w-5" />
          <span className="font-medium">Dashboard</span>
        </a>
        <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-all">
          <Activity className="h-5 w-5" />
          <span className="font-medium">Analytics</span>
        </a>
        <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-all">
          <Droplet className="h-5 w-5" />
          <span className="font-medium">Nutrients</span>
        </a>
        <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-all">
          <Wind className="h-5 w-5" />
          <span className="font-medium">Environment</span>
        </a>
        <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-all">
          <Settings className="h-5 w-5" />
          <span className="font-medium">Settings</span>
        </a>
      </nav>
      
      <div className="p-4 border-t border-border/50">
        <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
          <p className="text-sm font-medium text-primary">System Online</p>
          <p className="text-xs text-muted-foreground mt-1">All sensors are connected and transmitting data.</p>
        </div>
      </div>
    </div>
  );
}
