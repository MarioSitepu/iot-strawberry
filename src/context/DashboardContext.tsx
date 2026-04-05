"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SensorData, SystemStatus } from "@/types";
import { format } from "date-fns";

interface DashboardContextType {
  currentData: SensorData;
  historyData: SensorData[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  togglePumpInside: (val: boolean) => void;
  togglePumpOutside: (val: boolean) => void;
  toggleCooling: (val: boolean) => void;
  getOverallStatus: () => { status: SystemStatus; message: string };
  getTrend: (key: keyof SensorData) => number;
  getPpmStatus: (ppm: number) => SystemStatus;
  getVolumeStatus: (vol: number) => SystemStatus;
  getTempStatus: (temp: number) => SystemStatus;
}

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

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [currentData, setCurrentData] = useState<SensorData>(INITIAL_DATA);
  const [historyData, setHistoryData] = useState<SensorData[]>([INITIAL_DATA]);
  const [activeTab, setActiveTab] = useState("Dashboard");

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
          if (newHistory.length > 20) newHistory.shift();
          return newHistory;
        });

        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const togglePumpInside = (val: boolean) => setCurrentData(prev => ({ ...prev, pump_inside: val }));
  const togglePumpOutside = (val: boolean) => setCurrentData(prev => ({ ...prev, pump_outside: val }));
  const toggleCooling = (val: boolean) => setCurrentData(prev => ({ ...prev, cooling: val }));

  const getPpmStatus = (ppm: number): SystemStatus => {
    if (ppm < 700) return "Peringatan";
    if (ppm > 1200) return "Bahaya";
    return "Normal";
  };

  const getVolumeStatus = (vol: number): SystemStatus => {
    if (vol < 20) return "Peringatan";
    return "Normal";
  };

  const getTempStatus = (temp: number): SystemStatus => {
    if (temp > 30) return "Peringatan";
    return "Normal";
  };

  const getOverallStatus = () => {
    const ppmStatus = getPpmStatus(currentData.ppm);
    const volStatus = getVolumeStatus(currentData.volume);
    const tempStatus = getTempStatus(currentData.temp_tong);

    if (ppmStatus === "Bahaya") return { status: "Bahaya" as SystemStatus, message: "PPM Nutrisi dalam level berbahaya (>1200)!" };
    if (ppmStatus === "Peringatan" || volStatus === "Peringatan" || tempStatus === "Peringatan") {
      return { status: "Peringatan" as SystemStatus, message: "Beberapa parameter memerlukan perhatian." };
    }
    return { status: "Normal" as SystemStatus, message: "Semua sistem berjalan dengan baik." };
  };

  const getTrend = (key: keyof SensorData) => {
    const firstData = historyData[0] || currentData;
    return (currentData[key] as number) - (firstData[key] as number);
  };

  return (
    <DashboardContext.Provider 
      value={{ 
        currentData, 
        historyData, 
        activeTab, 
        setActiveTab, 
        togglePumpInside, 
        togglePumpOutside, 
        toggleCooling,
        getOverallStatus,
        getTrend,
        getPpmStatus,
        getVolumeStatus,
        getTempStatus
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
