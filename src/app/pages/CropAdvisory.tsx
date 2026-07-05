import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';
import { Sprout, MapPin, Calendar, Layers, TrendingUp, AlertCircle, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { Bar } from 'react-chartjs-2';

export default function CropAdvisory() {
  const { language } = useApp();
  const t = translations[language];
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const [formData, setFormData] = useState({
    location: '',
    soilType: '',
    rainfall: '',
    season: '',
    previousCrop: '',
  });

  const soilTypes = ['Alluvial', 'Black', 'Red', 'Laterite', 'Sandy', 'Clay'];
  const seasons = ['Kharif', 'Rabi', 'Zaid', 'Summer'];
  const crops = ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Pulses', 'Maize', 'Potato', 'Tomato'];

  // AI Crop Recommendation Algorithm
  const calculateCropSuitability = () => {
    setLoading(true);
    
    setTimeout(() => {
      // Simulated AI scoring based on inputs
      const scores = crops.map(crop => {
        let score = Math.random() * 30 + 50; // Base score 50-80
        
        // Soil type bonuses
        if (formData.soilType === 'Alluvial' && ['Rice', 'Wheat', 'Sugarcane'].includes(crop)) {
          score += 15;
        }
        if (formData.soilType === 'Black' && ['Cotton', 'Sugarcane'].includes(crop)) {
          score += 15;
        }
        if (formData.soilType === 'Red' && ['Pulses', 'Maize'].includes(crop)) {
          score += 12;
        }

        // Season bonuses
        if (formData.season === 'Kharif' && ['Rice', 'Cotton', 'Maize'].includes(crop)) {
          score += 10;
        }
        if (formData.season === 'Rabi' && ['Wheat', 'Pulses'].includes(crop)) {
          score += 10;
        }

        // Rainfall bonuses
        const rainfall = parseInt(formData.rainfall);
        if (rainfall > 1000 && ['Rice', 'Sugarcane'].includes(crop)) {
          score += 8;
        }
        if (rainfall < 700 && ['Pulses', 'Maize'].includes(crop)) {
          score += 8;
        }

        // Normalize to 0-100
        score = Math.min(95, Math.max(45, score));

        return {
          crop,
          suitability: Math.round(score),
          expectedYield: Math.round(score * 0.6) + 20,
          risk: score > 80 ? 'Low' : score > 65 ? 'Medium' : 'High',
          riskColor: score > 80 ? 'text-green-500' : score > 65 ? 'text-yellow-500' : 'text-red-500',
          waterRequirement: ['Rice', 'Sugarcane'].includes(crop) ? 'High' : ['Wheat', 'Cotton'].includes(crop) ? 'Medium' : 'Low',
          marketDemand: Math.round(Math.random() * 20) + 70,
        };
      });

      // Sort by suitability
      scores.sort((a, b) => b.suitability - a.suitability);

      setResult({
        recommendations: scores.slice(0, 5),
        topCrop: scores[0],
        analysis: {
          soilMatch: formData.soilType,
          seasonalFit: formData.season,
          rainfallAdequacy: parseInt(formData.rainfall) > 800 ? 'Adequate' : 'Moderate',
        }
      });

      setLoading(false);
      toast.success('AI Analysis Complete!');

      // Voice advisory
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(
          `Based on your inputs, ${scores[0].crop} is the best crop for your farm with ${scores[0].suitability}% suitability. Expected yield is ${scores[0].expectedYield} quintals per hectare.`
        );
        window.speechSynthesis.speak(utterance);
      }
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.location || !formData.soilType || !formData.rainfall || !formData.season) {
      toast.error('Please fill all required fields');
      return;
    }
    calculateCropSuitability();
  };

  const speakResult = () => {
    if (result && 'speechSynthesis' in window) {
      const text = `The top 3 recommended crops are: ${result.recommendations.slice(0, 3).map((r: any) => r.crop).join(', ')}`;
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl">{t.cropAdvisory}</h1>
        </div>
        <p className="text-muted-foreground font-['Inter']">
          Get AI-powered crop recommendations based on your farm conditions
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <h3 className="text-xl mb-6">Farm Details</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="flex items-center gap-2 mb-2 text-sm">
                <MapPin className="w-4 h-4" />
                {t.location}
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter your location"
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-smooth"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2 text-sm">
                <Layers className="w-4 h-4" />
                {t.soilType}
              </label>
              <select
                value={formData.soilType}
                onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-smooth cursor-pointer"
              >
                <option value="">Select Soil Type</option>
                {soilTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2 text-sm">
                <Calendar className="w-4 h-4" />
                {t.season}
              </label>
              <select
                value={formData.season}
                onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-smooth cursor-pointer"
              >
                <option value="">Select Season</option>
                {seasons.map(season => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2 text-sm">
                <TrendingUp className="w-4 h-4" />
                Annual Rainfall (mm)
              </label>
              <input
                type="number"
                value={formData.rainfall}
                onChange={(e) => setFormData({ ...formData, rainfall: e.target.value })}
                placeholder="e.g., 1200"
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-smooth"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2 text-sm">
                <Sprout className="w-4 h-4" />
                Previous Crop (Optional)
              </label>
              <select
                value={formData.previousCrop}
                onChange={(e) => setFormData({ ...formData, previousCrop: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-smooth cursor-pointer"
              >
                <option value="">Select Previous Crop</option>
                {crops.map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-gradient-to-r from-[#1E7F5C] to-[#2BB673] text-white rounded-xl font-semibold hover:shadow-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed btn-ripple"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </span>
              ) : (
                t.analyze
              )}
            </button>
          </form>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl">AI Recommendations</h3>
            {result && (
              <button
                onClick={speakResult}
                className="p-2 rounded-lg hover:bg-muted transition-smooth"
                title="Listen to recommendations"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            )}
          </div>

          {loading && (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-24 rounded-xl skeleton" />
              ))}
            </div>
          )}

          {!loading && !result && (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <AlertCircle className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground">
                Fill in your farm details to get AI-powered crop recommendations
              </p>
            </div>
          )}

          {!loading && result && (
            <div className="space-y-4">
              {/* Top Recommendation */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-[#1E7F5C] to-[#2BB673] text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Sprout className="w-5 h-5" />
                  <span className="text-sm font-semibold">TOP RECOMMENDATION</span>
                </div>
                <h4 className="text-2xl font-bold mb-2">{result.topCrop.crop}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="opacity-80">Suitability</p>
                    <p className="text-xl font-bold">{result.topCrop.suitability}%</p>
                  </div>
                  <div>
                    <p className="opacity-80">Expected Yield</p>
                    <p className="text-xl font-bold">{result.topCrop.expectedYield} q/ha</p>
                  </div>
                  <div>
                    <p className="opacity-80">Risk Level</p>
                    <p className="font-semibold">{result.topCrop.risk}</p>
                  </div>
                  <div>
                    <p className="opacity-80">Market Demand</p>
                    <p className="font-semibold">{result.topCrop.marketDemand}%</p>
                  </div>
                </div>
              </div>

              {/* Other Recommendations */}
              <div className="space-y-3">
                {result.recommendations.slice(1).map((rec: any, index: number) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-muted hover:bg-muted/80 transition-smooth"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{rec.crop}</h4>
                      <span className={`text-sm font-semibold ${rec.riskColor}`}>
                        {rec.risk} Risk
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Suitability: </span>
                        <span className="font-semibold">{rec.suitability}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Yield: </span>
                        <span className="font-semibold">{rec.expectedYield} q/ha</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#1E7F5C] to-[#2BB673] transition-all duration-1000"
                          style={{ width: `${rec.suitability}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Comparison Chart */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <h3 className="text-xl mb-6">Crop Suitability Comparison</h3>
          <div className="h-80">
            <Bar
              data={{
                labels: result.recommendations.map((r: any) => r.crop),
                datasets: [
                  {
                    label: 'Suitability Score',
                    data: result.recommendations.map((r: any) => r.suitability),
                    backgroundColor: '#2BB673',
                  },
                  {
                    label: 'Expected Yield (q/ha)',
                    data: result.recommendations.map((r: any) => r.expectedYield),
                    backgroundColor: '#FFD166',
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                  },
                },
              }}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
