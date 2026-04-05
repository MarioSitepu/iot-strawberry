"use client";

import { MonitoringCard } from "@/components/MonitoringCard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboard } from "@/context/DashboardContext";
import { motion } from "motion/react";
import { Beaker, Thermometer, Droplets, FlaskConical } from "lucide-react";
import { useState, useEffect } from "react";

export function NutrientsView() {
  const { currentData, historyData, getTrend, getPpmStatus, getTempStatus } = useDashboard();
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
        <h1 className="text-3xl font-bold tracking-tight">Manajemen Nutrisi</h1>
        <p className="text-muted-foreground mt-1">Status nutrisi dan sistem pengairan.</p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MonitoringCard
          title="PPM Nutrisi"
          value={Math.round(currentData.ppm)}
          unit="ppm"
          icon={Beaker}
          status={getPpmStatus(currentData.ppm)}
          trend={getTrend('ppm')}
        />
        <MonitoringCard
          title="Suhu Nutrisi"
          value={currentData.temp_nutrisi.toFixed(1)}
          unit="°C"
          icon={Thermometer}
          status={getTempStatus(currentData.temp_nutrisi)}
          trend={getTrend('temp_nutrisi')}
        />
        <MonitoringCard
          title="Volume Tandon"
          value={currentData.volume.toFixed(1)}
          unit="%"
          icon={Droplets}
          status="Normal"
          trend={getTrend('volume')}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/50 bg-background/60 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-primary" />
              Detail Grafik PPM
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historyData}>
                  <defs>
                    <linearGradient id="colorPpmDetailed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                  <XAxis dataKey="timestamp" hide />
                  <YAxis domain={['auto', 'auto']} tickFormatter={(v) => v.toFixed(0)} />
                  <Tooltip formatter={(v: any) => [Number(v).toFixed(1), "PPM"]} />
                  <Area type="monotone" dataKey="ppm" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorPpmDetailed)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/60 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Tindakan Cepat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm font-medium">Tambah Larutan A&B</p>
              <p className="text-xs text-muted-foreground mt-1">Naikkan konsentrasi ke 1000 PPM jika tanaman mulai berbunga.</p>
            </div>
            <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/20">
              <p className="text-sm font-medium text-orange-600">Peringatan Suhu</p>
              <p className="text-xs text-muted-foreground mt-1">Suhu nutrisi tinggi dapat mengurangi kadar oksigen terlarut.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
