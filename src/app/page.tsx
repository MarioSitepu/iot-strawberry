"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { useDashboard } from "@/context/DashboardContext";
import { DashboardHome } from "@/components/views/DashboardHome";
import { AnalyticsView } from "@/components/views/AnalyticsView";
import { NutrientsView } from "@/components/views/NutrientsView";
import { EnvironmentView } from "@/components/views/EnvironmentView";
import { SettingsView } from "@/components/views/SettingsView";
import { AnimatePresence, motion } from "motion/react";

export default function Home() {
  const { activeTab } = useDashboard();

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <DashboardHome />;
      case "Analitik":
        return <AnalyticsView />;
      case "Nutrisi":
        return <NutrientsView />;
      case "Lingkungan":
        return <EnvironmentView />;
      case "Pengaturan":
        return <SettingsView />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <DashboardLayout>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  );
}
