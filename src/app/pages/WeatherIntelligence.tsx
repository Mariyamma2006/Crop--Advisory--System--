import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';
import { 
  Cloud, 
  CloudRain, 
  Sun, 
  Wind, 
  Droplets, 
  ThermometerSun,
  AlertTriangle,
  CloudSnow,
  CloudFog
} from 'lucide-react';
import { motion } from 'motion/react';
import { Line } from 'react-chartjs-2';

export default function WeatherIntelligence() {
  const { language } = useApp();
  const t = translations[language];
  const [location, setLocation] = useState('Karnataka, India');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Simulate weather data fetch
  const fetchWeather = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = {
        current: {
          temp: Math.round(Math.random() * 10 + 25),
          feels_like: Math.round(Math.random() * 10 + 26),
          humidity: Math.round(Math.random() * 30 + 50),
          wind_speed: Math.round(Math.random() * 10 + 5),
          description: ['Clear Sky', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
          icon: '01d',
          rain_probability: Math.round(Math.random() * 60 + 20),
        },
        forecast: Array.from({ length: 7 }, (_, i) => ({
          day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
          temp_max: Math.round(Math.random() * 5 + 30),
          temp_min: Math.round(Math.random() * 5 + 20),
          rain: Math.round(Math.random() * 40),
          icon: ['01d', '02d', '03d', '10d'][Math.floor(Math.random() * 4)],
        })),
        hourly: Array.from({ length: 24 }, (_, i) => ({
          hour: i,
          temp: Math.round(Math.random() * 8 + 22),
          rain: Math.round(Math.random() * 80),
        })),
        alerts: [
          {
            type: 'warning',
            title: 'Heavy Rainfall Alert',
            description: 'Heavy rainfall expected in the next 48 hours. Ensure proper drainage.',
            severity: 'high',
          },
          {
            type: 'advisory',
            title: 'Optimal Irrigation Time',
            description: 'Low evaporation rates. Good time for irrigation.',
            severity: 'low',
          },
        ],
      };
      setWeatherData(mockData);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes('clear')) return <Sun className="w-12 h-12 text-yellow-500" />;
    if (desc.includes('rain')) return <CloudRain className="w-12 h-12 text-blue-500" />;
    if (desc.includes('cloud')) return <Cloud className="w-12 h-12 text-gray-500" />;
    if (desc.includes('snow')) return <CloudSnow className="w-12 h-12 text-blue-300" />;
    if (desc.includes('fog')) return <CloudFog className="w-12 h-12 text-gray-400" />;
    return <Sun className="w-12 h-12 text-yellow-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
            <Cloud className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl">{t.weatherIntelligence}</h1>
        </div>
        <p className="text-muted-foreground font-['Inter']">
          Real-time weather updates and smart farming advisories
        </p>
      </motion.div>

      {/* Location Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-3"
      >
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter your location"
          className="flex-1 px-4 py-3 rounded-xl bg-card border border-border focus:border-primary outline-none transition-smooth"
        />
        <button
          onClick={fetchWeather}
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-[#1E7F5C] to-[#2BB673] text-white rounded-xl font-semibold hover:shadow-lg transition-smooth disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </motion.div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 rounded-2xl skeleton" />
          ))}
        </div>
      )}

      {!loading && weatherData && (
        <>
          {/* Current Weather */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-[#1E7F5C] to-[#2BB673] text-white"
            >
              <div className="flex items-center justify-between mb-4">
                {getWeatherIcon(weatherData.current.description)}
                <ThermometerSun className="w-8 h-8 opacity-50" />
              </div>
              <div className="text-4xl font-bold mb-2">{weatherData.current.temp}°C</div>
              <p className="text-sm opacity-90">{weatherData.current.description}</p>
              <p className="text-xs opacity-75 mt-1">Feels like {weatherData.current.feels_like}°C</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <Droplets className="w-10 h-10 text-blue-500" />
                <span className="text-2xl font-bold">{weatherData.current.humidity}%</span>
              </div>
              <h3 className="font-semibold mb-1">Humidity</h3>
              <p className="text-sm text-muted-foreground">Current moisture level</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <Wind className="w-10 h-10 text-cyan-500" />
                <span className="text-2xl font-bold">{weatherData.current.wind_speed} km/h</span>
              </div>
              <h3 className="font-semibold mb-1">Wind Speed</h3>
              <p className="text-sm text-muted-foreground">Current wind velocity</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <CloudRain className="w-10 h-10 text-blue-600" />
                <span className="text-2xl font-bold">{weatherData.current.rain_probability}%</span>
              </div>
              <h3 className="font-semibold mb-1">Rain Probability</h3>
              <p className="text-sm text-muted-foreground">Next 24 hours</p>
            </motion.div>
          </div>

          {/* Alerts */}
          {weatherData.alerts && weatherData.alerts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-2xl bg-[#EF476F]/10 border-2 border-[#EF476F]"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-[#EF476F]" />
                <h3 className="text-lg font-semibold">Weather Alerts</h3>
              </div>
              <div className="space-y-3">
                {weatherData.alerts.map((alert: any, index: number) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-background border border-border"
                  >
                    <h4 className="font-semibold mb-2 text-[#EF476F]">{alert.title}</h4>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* 7-Day Forecast */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-6 rounded-2xl bg-card border border-border"
          >
            <h3 className="text-xl mb-6">7-Day Forecast</h3>
            <div className="grid grid-cols-7 gap-3">
              {weatherData.forecast.map((day: any, index: number) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-muted text-center hover:bg-muted/80 transition-smooth"
                >
                  <p className="font-semibold mb-3">{day.day}</p>
                  <div className="w-8 h-8 mx-auto mb-3">
                    {day.icon === '01d' && <Sun className="w-full h-full text-yellow-500" />}
                    {day.icon === '02d' && <Cloud className="w-full h-full text-gray-500" />}
                    {day.icon === '03d' && <Cloud className="w-full h-full text-gray-600" />}
                    {day.icon === '10d' && <CloudRain className="w-full h-full text-blue-500" />}
                  </div>
                  <p className="text-sm font-bold mb-1">{day.temp_max}°</p>
                  <p className="text-xs text-muted-foreground">{day.temp_min}°</p>
                  <p className="text-xs text-blue-500 mt-2">{day.rain}%</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Temperature & Rainfall Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="p-6 rounded-2xl bg-card border border-border"
          >
            <h3 className="text-xl mb-6">24-Hour Temperature & Rain Probability</h3>
            <div className="h-80">
              <Line
                data={{
                  labels: weatherData.hourly.map((h: any) => `${h.hour}:00`),
                  datasets: [
                    {
                      label: 'Temperature (°C)',
                      data: weatherData.hourly.map((h: any) => h.temp),
                      borderColor: '#EF476F',
                      backgroundColor: 'rgba(239, 71, 111, 0.1)',
                      yAxisID: 'y',
                      tension: 0.4,
                    },
                    {
                      label: 'Rain Probability (%)',
                      data: weatherData.hourly.map((h: any) => h.rain),
                      borderColor: '#2BB673',
                      backgroundColor: 'rgba(43, 182, 115, 0.1)',
                      yAxisID: 'y1',
                      tension: 0.4,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  interaction: {
                    mode: 'index',
                    intersect: false,
                  },
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                  scales: {
                    y: {
                      type: 'linear',
                      display: true,
                      position: 'left',
                      title: {
                        display: true,
                        text: 'Temperature (°C)',
                      },
                    },
                    y1: {
                      type: 'linear',
                      display: true,
                      position: 'right',
                      title: {
                        display: true,
                        text: 'Rain (%)',
                      },
                      grid: {
                        drawOnChartArea: false,
                      },
                    },
                  },
                }}
              />
            </div>
          </motion.div>

          {/* Farming Advisory */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-[#FFD166] to-[#EF476F] text-white"
          >
            <h3 className="text-xl mb-4">Smart Farming Advisory</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-lg">
                <h4 className="font-semibold mb-2">Irrigation</h4>
                <p className="text-sm opacity-90">
                  {weatherData.current.rain_probability > 60 
                    ? 'Delay irrigation. Rain expected soon.' 
                    : 'Good time for irrigation. Low rain probability.'}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-lg">
                <h4 className="font-semibold mb-2">Spraying</h4>
                <p className="text-sm opacity-90">
                  {weatherData.current.wind_speed > 10 
                    ? 'Avoid spraying. High wind speed.' 
                    : 'Suitable for pesticide/fertilizer spraying.'}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-lg">
                <h4 className="font-semibold mb-2">Harvesting</h4>
                <p className="text-sm opacity-90">
                  {weatherData.current.humidity > 70 
                    ? 'Wait for lower humidity before harvesting.' 
                    : 'Good conditions for harvesting.'}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
