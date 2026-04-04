export interface SensorData {
  ppm: number;
  temp_tong: number;
  temp_nutrisi: number;
  env_temp: number;
  humidity: number;
  volume: number;
  pump_inside: boolean;
  pump_outside: boolean;
  cooling: boolean;
  timestamp: string;
}

export type SystemStatus = "Normal" | "Warning" | "Danger";
