import React, { useState, useEffect } from "react";
import { Activity, Cpu, Droplets, Server, TrendingUp, Zap } from "lucide-react";

export default function IoTDashboard() {
  const [sensorData, setSensorData] = useState({ temperature: 0, humidity: 0 });
  const [pods, setPods] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [cpuLoad, setCpuLoad] = useState(20);

  // Simulate fetching sensor data
  useEffect(() => {
    const fetchData = () => {
      const temp = 20 + Math.random() * 20;
      const hum = 30 + Math.random() * 50;
      setSensorData({ temperature: temp, humidity: hum });

      setHistory((prev) => {
        const newHistory = [...prev, { temp, hum, time: Date.now() }];
        return newHistory.slice(-20);
      });
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  // Simulate pod scaling based on CPU load
  useEffect(() => {
    if (cpuLoad > 50 && pods < 5) {
      setTimeout(() => setPods((p) => Math.min(5, p + 1)), 1000);
    } else if (cpuLoad < 30 && pods > 1) {
      setTimeout(() => setPods((p) => Math.max(1, p - 1)), 2000);
    }
  }, [cpuLoad, pods]);

  const startLoadTest = () => {
    setIsLoading(true);
    setCpuLoad(85);
    setTimeout(() => {
      setIsLoading(false);
      setCpuLoad(20);
    }, 15000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            IoT Sensor Monitoring
          </h1>
          <p className="text-gray-400">Kubernetes Auto-Scaling Demo</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Temperature Card */}
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-lg rounded-2xl p-6 border border-orange-500/30 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-orange-400" />
              <span className="text-sm text-gray-300">Real-time</span>
            </div>
            <div className="text-4xl font-bold mb-1">
              {sensorData.temperature.toFixed(1)}°C
            </div>
            <div className="text-gray-400 text-sm">Temperature</div>
          </div>

          {/* Humidity Card */}
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Droplets className="w-8 h-8 text-blue-400" />
              <span className="text-sm text-gray-300">Real-time</span>
            </div>
            <div className="text-4xl font-bold mb-1">
              {sensorData.humidity.toFixed(1)}%
            </div>
            <div className="text-gray-400 text-sm">Humidity</div>
          </div>

          {/* Active Pods */}
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Server className="w-8 h-8 text-green-400" />
              <span className="text-sm text-gray-300">Auto-scale</span>
            </div>
            <div className="text-4xl font-bold mb-1">{pods}</div>
            <div className="text-gray-400 text-sm">Active Pods</div>
          </div>

          {/* CPU Load */}
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Cpu className="w-8 h-8 text-purple-400" />
              <span className="text-sm text-gray-300">Average</span>
            </div>
            <div className="text-4xl font-bold mb-1">{cpuLoad}%</div>
            <div className="text-gray-400 text-sm">CPU Usage</div>
          </div>
        </div>

        {/* Load Testing Section */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-xl mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-400" />
                Load Testing
              </h2>
              <p className="text-gray-400">
                Trigger high CPU load to observe HPA auto-scaling behavior
              </p>
            </div>
            <button
              onClick={startLoadTest}
              disabled={isLoading}
              className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 ${
                isLoading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 shadow-lg"
              }`}
            >
              {isLoading ? "Load Testing..." : "Start Load Test"}
            </button>
          </div>

          {isLoading && (
            <div className="mt-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-cyan-400"></div>
                <span className="text-cyan-400 font-semibold">
                  Generating high CPU load... Pods scaling up!
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(pods / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Pod Visualization */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-xl mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            Pod Scaling Visualization
          </h2>
          <div className="flex flex-wrap gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-24 h-24 rounded-xl flex items-center justify-center transition-all duration-500 transform ${
                  i < pods
                    ? "bg-gradient-to-br from-green-500 to-emerald-500 scale-100 opacity-100 shadow-lg shadow-green-500/50"
                    : "bg-gray-700/30 scale-90 opacity-40"
                }`}
              >
                <Server
                  className={`w-10 h-10 ${
                    i < pods ? "text-white" : "text-gray-600"
                  }`}
                />
              </div>
            ))}
          </div>
          <div className="mt-6 text-sm text-gray-400">
            <span className="font-semibold text-white">HPA Configuration:</span>{" "}
            Min: 1 replica | Max: 5 replicas | Target CPU: 50%
          </div>
        </div>

        {/* Mini Chart */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-xl">
          <h2 className="text-2xl font-bold mb-6">Sensor Data Trend</h2>
          <div className="flex items-end justify-between h-32 gap-1">
            {history.map((point, i) => (
              <div key={i} className="flex-1 flex flex-col gap-1">
                <div
                  className="bg-gradient-to-t from-orange-500 to-red-500 rounded-t transition-all duration-300"
                  style={{ height: `${(point.temp / 40) * 100}%` }}
                  title={`Temp: ${point.temp.toFixed(1)}°C`}
                ></div>
                <div
                  className="bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t transition-all duration-300"
                  style={{ height: `${(point.hum / 80) * 100}%` }}
                  title={`Humidity: ${point.hum.toFixed(1)}%`}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded"></div>
              <span>Temperature</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
              <span>Humidity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
