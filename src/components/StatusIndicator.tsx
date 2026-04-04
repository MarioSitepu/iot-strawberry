import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { SystemStatus } from "@/types";

interface StatusIndicatorProps {
  status: SystemStatus;
  message?: string;
}

export function StatusIndicator({ status, message }: StatusIndicatorProps) {
  const config = {
    Normal: {
      icon: CheckCircle2,
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
    },
    Warning: {
      icon: AlertCircle,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
    },
    Danger: {
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
    },
  };

  const { icon: Icon, color, bg, border } = config[status];

  return (
    <div className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${bg} ${border}`}>
      <Icon className={`h-5 w-5 ${color}`} />
      <div>
        <h4 className={`font-medium ${color}`}>System Status: {status}</h4>
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </div>
    </div>
  );
}
