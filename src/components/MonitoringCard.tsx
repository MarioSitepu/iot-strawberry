import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { SystemStatus } from "@/types";
import { motion } from "motion/react";

interface MonitoringCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  status: SystemStatus;
  trend?: number;
  delay?: number;
}

export function MonitoringCard({ title, value, unit, icon: Icon, status, trend = 0, delay = 0 }: MonitoringCardProps) {
  const statusColor = {
    Normal: "success",
    Peringatan: "warning",
    Bahaya: "destructive",
  } as const;

  const iconColor = {
    Normal: "text-emerald-500 bg-emerald-500/10",
    Peringatan: "text-amber-500 bg-amber-500/10",
    Bahaya: "text-rose-500 bg-rose-500/10",
  };

  const glowColor = {
    Normal: "bg-emerald-500/10",
    Peringatan: "bg-amber-500/10",
    Bahaya: "bg-rose-500/10",
  };

  const isPositiveTrend = trend > 0;
  const isNegativeTrend = trend < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
    >
      <Card className="relative overflow-hidden border-border/50 bg-background/60 backdrop-blur-xl transition-all hover:shadow-lg hover:shadow-primary/5">
        <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl transition-colors duration-500 ${glowColor[status]}`} />
        
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className={`rounded-xl p-2.5 transition-colors duration-500 ${iconColor[status]}`}>
            <Icon className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-bold tracking-tight">
                {value} <span className="text-sm font-medium text-muted-foreground">{unit}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1.5 text-xs font-medium">
                {isPositiveTrend ? (
                  <span className="flex items-center text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +{trend.toFixed(1)}
                  </span>
                ) : isNegativeTrend ? (
                  <span className="flex items-center text-rose-500 bg-rose-500/10 px-1.5 py-0.5 rounded-md">
                    <TrendingDown className="mr-1 h-3 w-3" />
                    {trend.toFixed(1)}
                  </span>
                ) : (
                  <span className="flex items-center text-muted-foreground bg-muted px-1.5 py-0.5 rounded-md">
                    <Minus className="mr-1 h-3 w-3" />
                    0.0
                  </span>
                )}
                <span className="text-muted-foreground">vs 1m terakhir</span>
              </div>
              <Badge variant={statusColor[status]} className="shadow-sm">{status}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
