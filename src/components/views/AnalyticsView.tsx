"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartSection } from "@/components/ChartSection";
import { useDashboard } from "@/context/DashboardContext";
import { motion } from "motion/react";
import { Activity, BarChart3, LineChart } from "lucide-react";

export function AnalyticsView() {
  const { historyData } = useDashboard();

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Analitik Sistem</h1>
        <p className="text-muted-foreground mt-1">Analisis mendalam data sensor historis.</p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 bg-background/60 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Titik Data</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{historyData.length}</div>
            <p className="text-xs text-muted-foreground">+5 titik data/menit</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-background/60 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waktu Aktif</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">Koneksi stabil</p>
          </CardContent>
        </Card>
      </div>

      <ChartSection data={historyData} />
      
      <Card className="border-border/50 bg-background/60 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Ringkasan Kinerja</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Sistem aeroponik berjalan stabil. PPM rata-rata berada dalam rentang optimal 800-900.
            Suhu nutrisi tetap terjaga di bawah 26°C berkat sistem pendingin otomatis.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
