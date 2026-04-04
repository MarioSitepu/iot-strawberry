"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { MonitoringCard } from "@/components/MonitoringCard";
import { ChartSection } from "@/components/ChartSection";
import { ControlPanel } from "@/components/ControlPanel";
import { StatusIndicator } from "@/components/StatusIndicator";
import { SensorData, SystemStatus } from "@/types";
import { Thermometer, ThermometerSun, Droplets, Wind, Beaker } from "lucide-react";
import { format } from "date-fns";
import { motion } from "motion/react";

const INITIAL_DATA: SensorData = {
  ppm: 850,
  temp_tong: 27,
  temp_nutrisi: 25,
  env_temp: 30,
  humidity: 70,
  volume: 60,
  pump_inside: true,
  pump_outside: false,
  cooling: true,
  timestamp: format(new Date(), "HH:mm:ss"),
};

export default function Home() {
  const [currentData, setCurrentData] = useState<SensorData>(INITIAL_DATA);
  const [historyData, setHistoryData] = useState<SensorData[]>([INITIAL_DATA]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentData((prev) => {
        const newData = {
          ...prev,
          ppm: prev.ppm + (Math.random() * 20 - 10),
          temp_tong: prev.temp_tong + (Math.random() * 1 - 0.5),
          temp_nutrisi: prev.temp_nutrisi + (Math.random() * 1 - 0.5),
          env_temp: prev.env_temp + (Math.random() * 1 - 0.5),
          humidity: Math.max(0, Math.min(100, prev.humidity + (Math.random() * 4 - 2))),
          volume: Math.max(0, Math.min(100, prev.volume + (Math.random() * 2 - 1))),
          timestamp: format(new Date(), "HH:mm:ss"),
        };

        setHistoryData((h) => {
          const newHistory = [...h, newData];
          if (newHistory.length > 20) newHistory.shift(); // keep last 20 points
          return newHistory;
        });

        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Logic for system status
  const getPpmStatus = (ppm: number): SystemStatus => {
    if (ppm < 700) return "Warning";
    if (ppm > 1200) return "Danger";
    return "Normal";
  };

  const getVolumeStatus = (vol: number): SystemStatus => {
    if (vol < 20) return "Warning";
    return "Normal";
  };

  const getTempStatus = (temp: number): SystemStatus => {
    if (temp > 30) return "Warning";
    return "Normal";
  };

  const getOverallStatus = (): { status: SystemStatus; message: string } => {
    const ppmStatus = getPpmStatus(currentData.ppm);
    const volStatus = getVolumeStatus(currentData.volume);
    const tempStatus = getTempStatus(currentData.temp_tong);

    if (ppmStatus === "Danger") return { status: "Danger", message: "PPM Nutrisi dalam level berbahaya (>1200)!" };
    if (ppmStatus === "Warning" || volStatus === "Warning" || tempStatus === "Warning") {
      return { status: "Warning", message: "Beberapa parameter memerlukan perhatian." };
    }
    return { status: "Normal", message: "Semua sistem berjalan dengan baik." };
  };

  const overall = getOverallStatus();
  
  // Calculate trends
  const firstData = historyData[0] || currentData;
  const getTrend = (key: keyof SensorData) => (currentData[key] as number) - (firstData[key] as number);

  return (
    <DashboardLayout>
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
          value={Math.round(currentData.volume)}
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
        onTogglePumpInside={(val) => setCurrentData((prev) => ({ ...prev, pump_inside: val }))}
        onTogglePumpOutside={(val) => setCurrentData((prev) => ({ ...prev, pump_outside: val }))}
        onToggleCooling={(val) => setCurrentData((prev) => ({ ...prev, cooling: val }))}
      />
    </DashboardLayout>
  );
}
