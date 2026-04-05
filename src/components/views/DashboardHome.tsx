"use client";

import { MonitoringCard } from "@/components/MonitoringCard";
import { ChartSection } from "@/components/ChartSection";
import { ControlPanel } from "@/components/ControlPanel";
import { StatusIndicator } from "@/components/StatusIndicator";
import { useDashboard } from "@/context/DashboardContext";
import { Thermometer, ThermometerSun, Droplets, Wind, Beaker } from "lucide-react";
import { motion } from "motion/react";

export function DashboardHome() {
  const { 
    currentData, 
    historyData, 
    getOverallStatus, 
    getTrend, 
    getPpmStatus, 
    getVolumeStatus, 
    getTempStatus,
    togglePumpInside,
    togglePumpOutside,
    toggleCooling
  } = useDashboard();

  const overall = getOverallStatus();

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-2"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Aeroponik</h1>
          <p className="text-muted-foreground mt-1">Monitoring dan kontrol sistem IoT secara real-time.</p>
        </div>
        <StatusIndicator status={overall.status} message={overall.message} />
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MonitoringCard
          title="PPM Nutrisi"
          value={Math.round(currentData.ppm)}
          unit="ppm"
          icon={Beaker}
          status={getPpmStatus(currentData.ppm)}
          trend={getTrend('ppm')}
          delay={0.1}
        />
        <MonitoringCard
          title="Suhu Dalam Tong"
          value={currentData.temp_tong.toFixed(1)}
          unit="°C"
          icon={Thermometer}
          status={getTempStatus(currentData.temp_tong)}
          trend={getTrend('temp_tong')}
          delay={0.15}
        />
        <MonitoringCard
          title="Suhu Nutrisi Box"
          value={currentData.temp_nutrisi.toFixed(1)}
          unit="°C"
          icon={ThermometerSun}
          status={getTempStatus(currentData.temp_nutrisi)}
          trend={getTrend('temp_nutrisi')}
          delay={0.2}
        />
        <MonitoringCard
          title="Suhu Lingkungan"
          value={currentData.env_temp.toFixed(1)}
          unit="°C"
          icon={ThermometerSun}
          status={getTempStatus(currentData.env_temp)}
          trend={getTrend('env_temp')}
          delay={0.25}
        />
        <MonitoringCard
          title="Kelembapan"
          value={Math.round(currentData.humidity)}
          unit="%"
          icon={Wind}
          status="Normal"
          trend={getTrend('humidity')}
          delay={0.3}
        />
        <MonitoringCard
          title="Volume Nutrisi"
          value={currentData.volume.toFixed(1)}
          unit="%"
          icon={Droplets}
          status={getVolumeStatus(currentData.volume)}
          trend={getTrend('volume')}
          delay={0.35}
        />
      </div>

      <ChartSection data={historyData} />

      <ControlPanel
        pumpInside={currentData.pump_inside}
        pumpOutside={currentData.pump_outside}
        cooling={currentData.cooling}
        onTogglePumpInside={togglePumpInside}
        onTogglePumpOutside={togglePumpOutside}
        onToggleCooling={toggleCooling}
      />
    </div>
  );
}
