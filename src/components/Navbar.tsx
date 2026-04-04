import { Leaf, Bell, Settings, User } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/50 bg-background/80 backdrop-blur-xl px-6">
      <div className="flex items-center gap-2 font-semibold md:hidden">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Leaf className="h-5 w-5" />
        </div>
        <span>AeroIoT</span>
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-3">
        <button className="relative rounded-full p-2 hover:bg-muted/80 transition-colors">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 border-2 border-background"></span>
        </button>
        <button className="rounded-full p-2 hover:bg-muted/80 transition-colors">
          <Settings className="h-5 w-5 text-muted-foreground" />
        </button>
        <div className="h-8 w-px bg-border/50 mx-1"></div>
        <button className="flex items-center gap-2 rounded-full pl-2 pr-4 py-1.5 hover:bg-muted/80 transition-colors border border-transparent hover:border-border/50">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium">Admin</span>
        </button>
      </div>
    </header>
  );
}
