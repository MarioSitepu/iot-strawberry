"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useDashboard } from "@/context/DashboardContext";
import { motion } from "motion/react";
import { Settings, Shield, Bell, Cpu, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SettingsView() {
  const { currentData, togglePumpInside, togglePumpOutside, toggleCooling } = useDashboard();

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Pengaturan Sistem</h1>
        <p className="text-muted-foreground mt-1">Konfigurasi perangkat keras dan notifikasi.</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50 bg-background/60 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Cpu className="h-5 w-5 text-primary" />
              Kontrol Manual Otomatisasi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-2">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Pompa Dalam (Mist)</p>
                <p className="text-xs text-muted-foreground">Kontrol manual nozzle pengabutan.</p>
              </div>
              <Switch checked={currentData.pump_inside} onCheckedChange={togglePumpInside} />
            </div>
            <div className="flex items-center justify-between p-2 border-t border-border/50 pt-4">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Pompa Luar (Sirkulasi)</p>
                <p className="text-xs text-muted-foreground">Keluarkan nutrisi ke tandon utama.</p>
              </div>
              <Switch checked={currentData.pump_outside} onCheckedChange={togglePumpOutside} />
            </div>
            <div className="flex items-center justify-between p-2 border-t border-border/50 pt-4">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Sistem Pendingin</p>
                <p className="text-xs text-muted-foreground">Aktifkan chiller atau kipas pendingin.</p>
              </div>
              <Switch checked={currentData.cooling} onCheckedChange={toggleCooling} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/60 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Ambang Batas (Threshold)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
              <p className="text-sm font-medium text-destructive">Peringatan Bahaya PPM</p>
              <p className="text-2xl font-bold mt-1">1200 <span className="text-xs font-normal text-muted-foreground">ppm</span></p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
              <p className="text-sm font-medium text-warning">Peringatan Suhu Panas</p>
              <p className="text-2xl font-bold mt-1">30.0 <span className="text-xs font-normal text-muted-foreground">°C</span></p>
            </div>
            <Button className="w-full mt-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20" variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Simpan Konfigurasi
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/60 backdrop-blur-xl md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Informasi Perangkat IoT
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-xs text-muted-foreground">ID Perangkat</p>
              <p className="text-sm font-mono mt-0.5">STRAW-MENCIT-V1-001</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Versi Perangkat Keras</p>
              <p className="text-sm mt-0.5">ESP32-S3 custom</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Alamat IP</p>
              <p className="text-sm mt-0.5">192.168.1.104</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
