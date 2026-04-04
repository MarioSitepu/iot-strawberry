import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Power, Droplets, Fan } from "lucide-react";
import { motion } from "motion/react";

interface ControlPanelProps {
  pumpInside: boolean;
  pumpOutside: boolean;
  cooling: boolean;
  onTogglePumpInside: (val: boolean) => void;
  onTogglePumpOutside: (val: boolean) => void;
  onToggleCooling: (val: boolean) => void;
}

export function ControlPanel({
  pumpInside,
  pumpOutside,
  cooling,
  onTogglePumpInside,
  onTogglePumpOutside,
  onToggleCooling,
}: ControlPanelProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
      <Card className="border-border/50 bg-background/60 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Control Panel</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-3">
          <div className={`relative overflow-hidden flex items-center justify-between rounded-xl border p-5 transition-all duration-300 ${pumpInside ? 'border-primary/50 bg-primary/5 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'hover:bg-muted/50'}`}>
            <div className="flex items-center gap-4 relative z-10">
              <div className={`rounded-xl p-3 transition-colors duration-300 ${pumpInside ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                <Power className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Pompa Dalam</p>
                <p className="text-xs text-muted-foreground mt-0.5">{pumpInside ? "Active & Running" : "Standby"}</p>
              </div>
            </div>
            <Switch checked={pumpInside} onCheckedChange={onTogglePumpInside} className="relative z-10" />
          </div>

          <div className={`relative overflow-hidden flex items-center justify-between rounded-xl border p-5 transition-all duration-300 ${pumpOutside ? 'border-primary/50 bg-primary/5 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'hover:bg-muted/50'}`}>
            <div className="flex items-center gap-4 relative z-10">
              <div className={`rounded-xl p-3 transition-colors duration-300 ${pumpOutside ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                <Droplets className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Pompa Luar</p>
                <p className="text-xs text-muted-foreground mt-0.5">{pumpOutside ? "Active & Running" : "Standby"}</p>
              </div>
            </div>
            <Switch checked={pumpOutside} onCheckedChange={onTogglePumpOutside} className="relative z-10" />
          </div>

          <div className={`relative overflow-hidden flex items-center justify-between rounded-xl border p-5 transition-all duration-300 ${cooling ? 'border-cyan-500/50 bg-cyan-500/5 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'hover:bg-muted/50'}`}>
            <div className="flex items-center gap-4 relative z-10">
              <div className={`rounded-xl p-3 transition-colors duration-300 ${cooling ? 'bg-cyan-500/20 text-cyan-500' : 'bg-muted text-muted-foreground'}`}>
                <Fan className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Pendingin</p>
                <p className="text-xs text-muted-foreground mt-0.5">{cooling ? "Active & Running" : "Standby"}</p>
              </div>
            </div>
            <Switch checked={cooling} onCheckedChange={onToggleCooling} className="relative z-10" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
