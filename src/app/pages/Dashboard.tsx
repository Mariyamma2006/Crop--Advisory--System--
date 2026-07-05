import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';
import { 
  Cloud, 
  Droplets, 
  TrendingUp, 
  AlertTriangle,
  ThermometerSun,
  Wind,
  Sprout,
  Activity
} from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { motion } from 'motion/react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard() {
  const { language } = useApp();
  const t = translations[language];

  const statsCards = [
    {
      title: t.weatherSummary,
      value: '28°C',
      subtitle: 'Partly Cloudy',
      icon: Cloud,
      color: 'from-blue-500 to-cyan-500',
      change: '+2°C',
    },
    {
      title: t.soilStatus,
      value: 'Good',
      subtitle: 'Moisture: 65%',
      icon: Droplets,
      color: 'from-green-500 to-emerald-500',
      change: '+5%',
    },
    {
      title: t.marketTrend,
      value: '₹2,450',
      subtitle: 'Rice per quintal',
      icon: TrendingUp,
      color: 'from-yellow-500 to-orange-500',
      change: '+8%',
    },
    {
      title: t.alerts,
      value: '3',
      subtitle: 'Active Alerts',
      icon: AlertTriangle,
      color: 'from-red-500 to-pink-500',
      change: 'New',
    },
  ];

  const temperatureData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [26, 28, 27, 29, 28, 30, 28],
        borderColor: '#2BB673',
        backgroundColor: 'rgba(43, 182, 115, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const cropYieldData = {
    labels: ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Pulses'],
    datasets: [
      {
        label: 'Expected Yield (Tons)',
        data: [45, 38, 28, 52, 22],
        backgroundColor: [
          '#1E7F5C',
          '#2BB673',
          '#FFD166',
          '#EF476F',
          '#6366f1',
        ],
      },
    ],
  };

  const soilHealthData = {
    labels: ['Nitrogen', 'Phosphorus', 'Potassium', 'Organic Matter'],
    datasets: [
      {
        data: [65, 45, 55, 70],
        backgroundColor: [
          '#1E7F5C',
          '#2BB673',
          '#FFD166',
          '#EF476F',
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const alerts = [
    {
      type: 'warning',
      icon: Cloud,
      title: 'Heavy Rainfall Expected',
      description: 'Rainfall predicted in next 48 hours. Prepare drainage.',
      time: '2 hours ago',
    },
    {
      type: 'info',
      icon: Sprout,
      title: 'Optimal Sowing Time',
      description: 'Weather conditions are perfect for sowing wheat.',
      time: '5 hours ago',
    },
    {
      type: 'success',
      icon: TrendingUp,
      title: 'Market Price Increase',
      description: 'Rice prices up by 8% in local market.',
      time: '1 day ago',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl mb-2">{t.welcomeBack}, Farmer!</h1>
        <p className="text-muted-foreground font-['Inter']">
          Here's what's happening with your farm today
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border hover-glow transition-smooth"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-[#2BB673]">{card.change}</span>
              </div>
              <h3 className="text-sm text-muted-foreground mb-2">{card.title}</h3>
              <p className="text-2xl font-bold mb-1">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.subtitle}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Temperature Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg">Weekly Temperature Trend</h3>
            <ThermometerSun className="w-5 h-5 text-[#EF476F]" />
          </div>
          <div className="h-64">
            <Line data={temperatureData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Crop Yield */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg">Expected Crop Yield</h3>
            <Activity className="w-5 h-5 text-[#2BB673]" />
          </div>
          <div className="h-64">
            <Bar data={cropYieldData} options={chartOptions} />
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Soil Health Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg">Soil Nutrient Status</h3>
            <Droplets className="w-5 h-5 text-[#1E7F5C]" />
          </div>
          <div className="h-48 flex items-center justify-center">
            <div className="w-48 h-48">
              <Doughnut 
                data={soilHealthData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        boxWidth: 12,
                        padding: 10,
                        font: {
                          size: 11,
                        },
                      },
                    },
                  },
                }} 
              />
            </div>
          </div>
        </motion.div>

        {/* Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg">Recent Alerts & Updates</h3>
            <AlertTriangle className="w-5 h-5 text-[#FFD166]" />
          </div>
          <div className="space-y-4">
            {alerts.map((alert, index) => {
              const Icon = alert.icon;
              const bgColor = 
                alert.type === 'warning' ? 'bg-[#EF476F]/10 border-[#EF476F]/20' :
                alert.type === 'info' ? 'bg-[#FFD166]/10 border-[#FFD166]/20' :
                'bg-[#2BB673]/10 border-[#2BB673]/20';
              
              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl border ${bgColor} transition-smooth hover:scale-[1.02]`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${
                      alert.type === 'warning' ? 'bg-[#EF476F]/20' :
                      alert.type === 'info' ? 'bg-[#FFD166]/20' :
                      'bg-[#2BB673]/20'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        alert.type === 'warning' ? 'text-[#EF476F]' :
                        alert.type === 'info' ? 'text-[#FFD166]' :
                        'text-[#2BB673]'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-[#1E7F5C] to-[#2BB673] text-white"
      >
        <h3 className="text-xl mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 rounded-xl bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-smooth">
            <Sprout className="w-6 h-6 mb-2 mx-auto" />
            <p className="text-sm">Get Crop Advice</p>
          </button>
          <button className="p-4 rounded-xl bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-smooth">
            <Cloud className="w-6 h-6 mb-2 mx-auto" />
            <p className="text-sm">Check Weather</p>
          </button>
          <button className="p-4 rounded-xl bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-smooth">
            <TrendingUp className="w-6 h-6 mb-2 mx-auto" />
            <p className="text-sm">Market Prices</p>
          </button>
          <button className="p-4 rounded-xl bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-smooth">
            <Droplets className="w-6 h-6 mb-2 mx-auto" />
            <p className="text-sm">Soil Analysis</p>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
