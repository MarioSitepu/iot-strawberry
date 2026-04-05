"use client";

import { MonitoringCard } from "@/components/MonitoringCard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboard } from "@/context/DashboardContext";
import { motion } from "motion/react";
import { ThermometerSun, Wind, CloudRain, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export function EnvironmentView() {
  const { currentData, historyData, getTrend, getTempStatus } = useDashboard();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Kondisi Lingkungan</h1>
        <p className="text-muted-foreground mt-1">Status udara dan kelembapan di sekitar tanaman.</p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MonitoringCard
          title="Suhu Lingkungan"
          value={currentData.env_temp.toFixed(1)}
          unit="°C"
          icon={ThermometerSun}
          status={getTempStatus(currentData.env_temp)}
          trend={getTrend('env_temp')}
        />
        <MonitoringCard
          title="Kelembapan"
          value={Math.round(currentData.humidity)}
          unit="%"
          icon={Wind}
          status="Normal"
          trend={getTrend('humidity')}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border/50 bg-background/60 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <CloudRain className="h-5 w-5 text-cyan-500" />
              Historis Lingkungan (24 Jam)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historyData}>
                  <defs>
                    <linearGradient id="colorEnvTempDetailed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorHumidityDetailed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                  <XAxis dataKey="timestamp" hide />
                  <YAxis yAxisId="left" orientation="left" domain={[20, 40]} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                  <Tooltip formatter={(v: any) => [Number(v).toFixed(1), ""]} />
                  <Legend verticalAlign="top" height={36}/>
                  <Area yAxisId="left" type="monotone" dataKey="env_temp" name="Suhu Udara (°C)" stroke="#10b981" fillOpacity={1} fill="url(#colorEnvTempDetailed)" />
                  <Area yAxisId="right" type="monotone" dataKey="humidity" name="Kelembapan (%)" stroke="#06b6d4" fillOpacity={1} fill="url(#colorHumidityDetailed)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/60 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Sun className="h-5 w-5 text-amber-500" />
              Saran Lingkungan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-sm font-medium">Fotosintesis Optimal</p>
              <p className="text-xs text-muted-foreground mt-1">Kelembapan udara saat ini ideal untuk penyerapan CO2 oleh tanaman.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
