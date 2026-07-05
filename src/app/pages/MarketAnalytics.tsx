import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import { Line, Bar, Pie } from 'react-chartjs-2';

export default function MarketAnalytics() {
  const { language } = useApp();
  const t = translations[language];
  const [selectedCrop, setSelectedCrop] = useState('Rice');
  const [selectedState, setSelectedState] = useState('All India');

  const crops = ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Pulses', 'Maize', 'Potato', 'Tomato'];
  const states = ['All India', 'Karnataka', 'Maharashtra', 'Punjab', 'Tamil Nadu', 'Uttar Pradesh'];

  const marketData = {
    Rice: { price: 2450, change: 8.2, trend: 'up', demand: 85, supply: 78 },
    Wheat: { price: 2180, change: -3.5, trend: 'down', demand: 72, supply: 80 },
    Cotton: { price: 6850, change: 12.5, trend: 'up', demand: 90, supply: 70 },
    Sugarcane: { price: 3200, change: 5.8, trend: 'up', demand: 68, supply: 75 },
    Pulses: { price: 5600, change: -1.2, trend: 'down', demand: 75, supply: 72 },
    Maize: { price: 1950, change: 4.3, trend: 'up', demand: 80, supply: 82 },
    Potato: { price: 1200, change: 15.7, trend: 'up', demand: 88, supply: 65 },
    Tomato: { price: 2800, change: -8.9, trend: 'down', demand: 92, supply: 95 },
  };

  const priceHistory = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: selectedCrop,
        data: Array.from({ length: 12 }, () => Math.round(marketData[selectedCrop as keyof typeof marketData].price + Math.random() * 400 - 200)),
        borderColor: '#2BB673',
        backgroundColor: 'rgba(43, 182, 115, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const cropComparison = {
    labels: crops.slice(0, 6),
    datasets: [
      {
        label: 'Current Price (₹/Quintal)',
        data: crops.slice(0, 6).map(crop => marketData[crop as keyof typeof marketData].price),
        backgroundColor: [
          '#1E7F5C',
          '#2BB673',
          '#FFD166',
          '#EF476F',
          '#6366f1',
          '#8B5CF6',
        ],
      },
    ],
  };

  const demandSupply = {
    labels: ['Demand', 'Supply'],
    datasets: [
      {
        data: [
          marketData[selectedCrop as keyof typeof marketData].demand,
          marketData[selectedCrop as keyof typeof marketData].supply,
        ],
        backgroundColor: ['#2BB673', '#EF476F'],
        borderWidth: 0,
      },
    ],
  };

  const currentData = marketData[selectedCrop as keyof typeof marketData];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl">{t.marketAnalytics}</h1>
        </div>
        <p className="text-muted-foreground font-['Inter']">
          Real-time market prices and demand trends to maximize your profits
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex-1">
          <label className="block text-sm mb-2 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Select Crop
          </label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-card border border-border cursor-pointer transition-smooth hover:border-primary"
          >
            {crops.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm mb-2 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Select State
          </label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-card border border-border cursor-pointer transition-smooth hover:border-primary"
          >
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Current Price Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-[#1E7F5C] to-[#2BB673] text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-10 h-10" />
            {currentData.trend === 'up' ? (
              <TrendingUp className="w-8 h-8" />
            ) : (
              <TrendingDown className="w-8 h-8" />
            )}
          </div>
          <h3 className="text-sm opacity-90 mb-2">Current Price</h3>
          <p className="text-4xl font-bold mb-2">₹{currentData.price}</p>
          <div className={`flex items-center gap-2 ${
            currentData.trend === 'up' ? 'text-[#FFD166]' : 'text-[#EF476F]'
          }`}>
            {currentData.trend === 'up' ? (
              <TrendingUp className="w-5 h-5" />
            ) : (
              <TrendingDown className="w-5 h-5" />
            )}
            <span className="font-bold">{Math.abs(currentData.change)}%</span>
            <span className="text-sm opacity-90">from last week</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Market Demand</h3>
            <span className="text-2xl font-bold text-[#2BB673]">{currentData.demand}%</span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${currentData.demand}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full bg-gradient-to-r from-[#1E7F5C] to-[#2BB673]"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {currentData.demand > 80 ? 'High demand - Great time to sell' : 'Moderate demand'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Market Supply</h3>
            <span className="text-2xl font-bold text-[#EF476F]">{currentData.supply}%</span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${currentData.supply}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full bg-gradient-to-r from-[#EF476F] to-[#FF6B9D]"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {currentData.supply < currentData.demand ? 'Supply less than demand' : 'Adequate supply'}
          </p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <h3 className="text-xl mb-6">12-Month Price Trend</h3>
          <div className="h-80">
            <Line
              data={priceHistory}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: false,
                    ticks: {
                      callback: (value) => `₹${value}`,
                    },
                  },
                },
              }}
            />
          </div>
        </motion.div>

        {/* Demand vs Supply */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <h3 className="text-xl mb-6">Demand vs Supply</h3>
          <div className="h-80 flex items-center justify-center">
            <div className="w-72 h-72">
              <Pie
                data={demandSupply}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Crop Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 rounded-2xl bg-card border border-border"
      >
        <h3 className="text-xl mb-6">Crop Price Comparison</h3>
        <div className="h-80">
          <Bar
            data={cropComparison}
            options={{
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
                  ticks: {
                    callback: (value) => `₹${value}`,
                  },
                },
              },
            }}
          />
        </div>
      </motion.div>

      {/* Market Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-[#FFD166] to-[#EF476F] text-white"
      >
        <h3 className="text-xl mb-4">Market Insights & Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-lg">
            <h4 className="font-semibold mb-2">Best Time to Sell</h4>
            <p className="text-sm opacity-90">
              {currentData.demand > currentData.supply 
                ? 'Now is a great time! High demand, low supply.' 
                : 'Wait for better prices. Market is saturated.'}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-lg">
            <h4 className="font-semibold mb-2">Price Forecast</h4>
            <p className="text-sm opacity-90">
              {currentData.trend === 'up' 
                ? 'Prices expected to rise in coming weeks.' 
                : 'Prices may stabilize or decrease soon.'}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-lg">
            <h4 className="font-semibold mb-2">Action</h4>
            <p className="text-sm opacity-90">
              {currentData.demand > 85 && currentData.trend === 'up'
                ? '🔥 Sell Now! Peak demand period.' 
                : '⏳ Hold or sell gradually over time.'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Top Performing Crops */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-6 rounded-2xl bg-card border border-border"
      >
        <h3 className="text-xl mb-6">Top Performing Crops This Week</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {crops
            .sort((a, b) => marketData[b as keyof typeof marketData].change - marketData[a as keyof typeof marketData].change)
            .slice(0, 4)
            .map((crop, index) => {
              const data = marketData[crop as keyof typeof marketData];
              return (
                <div
                  key={crop}
                  className="p-4 rounded-xl bg-muted hover:bg-muted/80 transition-smooth"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{crop}</h4>
                    <TrendingUp className="w-5 h-5 text-[#2BB673]" />
                  </div>
                  <p className="text-2xl font-bold mb-1">₹{data.price}</p>
                  <p className="text-sm text-[#2BB673] font-semibold">
                    +{data.change}% ↑
                  </p>
                </div>
              );
            })}
        </div>
      </motion.div>
    </div>
  );
}
