import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';
import { Droplets, Leaf, FlaskConical, TrendingUp, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export default function SoilHealth() {
  const { language } = useApp();
  const t = translations[language];
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const [nutrients, setNutrients] = useState({
    nitrogen: 50,
    phosphorus: 50,
    potassium: 50,
    ph: 7,
    organic: 50,
  });

  const analyzeSOIL = () => {
    setAnalyzing(true);

    setTimeout(() => {
      const { nitrogen, phosphorus, potassium, ph, organic } = nutrients;

      // Calculate overall health score
      const nScore = nitrogen;
      const pScore = phosphorus;
      const kScore = potassium;
      const phScore = Math.max(0, 100 - Math.abs((ph - 6.5) * 15));
      const organicScore = organic;

      const overallScore = (nScore + pScore + kScore + phScore + organicScore) / 5;

      // Determine status
      const getNutrientStatus = (value: number) => {
        if (value >= 70) return { status: 'Optimal', color: 'text-green-500', bg: 'bg-green-500' };
        if (value >= 50) return { status: 'Good', color: 'text-yellow-500', bg: 'bg-yellow-500' };
        if (value >= 30) return { status: 'Low', color: 'text-orange-500', bg: 'bg-orange-500' };
        return { status: 'Critical', color: 'text-red-500', bg: 'bg-red-500' };
      };

      setResult({
        overallScore: Math.round(overallScore),
        overallStatus: overallScore >= 70 ? 'Excellent' : overallScore >= 50 ? 'Good' : overallScore >= 30 ? 'Fair' : 'Poor',
        nutrients: {
          nitrogen: { value: nitrogen, ...getNutrientStatus(nitrogen) },
          phosphorus: { value: phosphorus, ...getNutrientStatus(phosphorus) },
          potassium: { value: potassium, ...getNutrientStatus(potassium) },
          ph: { value: ph, ...getNutrientStatus(phScore) },
          organic: { value: organic, ...getNutrientStatus(organic) },
        },
        recommendations: generateRecommendations(nitrogen, phosphorus, potassium, ph, organic),
        sustainabilityScore: Math.round((organic + phScore) / 2),
      });

      setAnalyzing(false);
      toast.success('Soil Analysis Complete!');
    }, 1500);
  };

  const generateRecommendations = (n: number, p: number, k: number, ph: number, org: number) => {
    const recs = [];

    if (n < 50) {
      recs.push({
        title: 'Nitrogen Deficiency',
        description: 'Apply urea (46-0-0) at 50 kg/acre or use organic alternatives like vermicompost',
        organic: 'Green manure crops like Dhaincha or Sesbania',
        priority: 'high',
      });
    }

    if (p < 50) {
      recs.push({
        title: 'Phosphorus Deficiency',
        description: 'Apply DAP (18-46-0) at 40 kg/acre or Single Super Phosphate',
        organic: 'Bone meal or rock phosphate',
        priority: 'high',
      });
    }

    if (k < 50) {
      recs.push({
        title: 'Potassium Deficiency',
        description: 'Apply Muriate of Potash (MOP) at 30 kg/acre',
        organic: 'Wood ash or compost',
        priority: 'medium',
      });
    }

    if (ph < 6 || ph > 7.5) {
      recs.push({
        title: ph < 6 ? 'Acidic Soil' : 'Alkaline Soil',
        description: ph < 6 ? 'Apply lime at 200-300 kg/acre' : 'Apply gypsum at 250-350 kg/acre',
        organic: ph < 6 ? 'Wood ash or dolomite lime' : 'Sulfur or organic compost',
        priority: 'medium',
      });
    }

    if (org < 50) {
      recs.push({
        title: 'Low Organic Matter',
        description: 'Increase organic content for better soil structure',
        organic: 'Apply 5-10 tons of FYM or compost per acre',
        priority: 'medium',
      });
    }

    if (recs.length === 0) {
      recs.push({
        title: 'Excellent Soil Health',
        description: 'Your soil is in optimal condition. Maintain current practices.',
        organic: 'Continue balanced fertilization and crop rotation',
        priority: 'low',
      });
    }

    return recs;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl">{t.soilHealth}</h1>
        </div>
        <p className="text-muted-foreground font-['Inter']">
          Analyze your soil nutrients and get personalized fertilizer recommendations
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h3 className="text-xl mb-6">Soil Nutrient Levels</h3>
            
            <div className="space-y-6">
              {/* Nitrogen */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold">Nitrogen (N)</label>
                  <span className="text-sm font-bold text-[#2BB673]">{nutrients.nitrogen}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={nutrients.nitrogen}
                  onChange={(e) => setNutrients({ ...nutrients, nitrogen: parseInt(e.target.value) })}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #2BB673 0%, #2BB673 ${nutrients.nitrogen}%, rgba(0,0,0,0.1) ${nutrients.nitrogen}%, rgba(0,0,0,0.1) 100%)`
                  }}
                />
              </div>

              {/* Phosphorus */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold">Phosphorus (P)</label>
                  <span className="text-sm font-bold text-[#FFD166]">{nutrients.phosphorus}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={nutrients.phosphorus}
                  onChange={(e) => setNutrients({ ...nutrients, phosphorus: parseInt(e.target.value) })}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #FFD166 0%, #FFD166 ${nutrients.phosphorus}%, rgba(0,0,0,0.1) ${nutrients.phosphorus}%, rgba(0,0,0,0.1) 100%)`
                  }}
                />
              </div>

              {/* Potassium */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold">Potassium (K)</label>
                  <span className="text-sm font-bold text-[#EF476F]">{nutrients.potassium}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={nutrients.potassium}
                  onChange={(e) => setNutrients({ ...nutrients, potassium: parseInt(e.target.value) })}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #EF476F 0%, #EF476F ${nutrients.potassium}%, rgba(0,0,0,0.1) ${nutrients.potassium}%, rgba(0,0,0,0.1) 100%)`
                  }}
                />
              </div>

              {/* pH */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold">pH Level</label>
                  <span className="text-sm font-bold text-[#1E7F5C]">{nutrients.ph.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="9"
                  step="0.1"
                  value={nutrients.ph}
                  onChange={(e) => setNutrients({ ...nutrients, ph: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #1E7F5C 0%, #1E7F5C ${((nutrients.ph - 4) / 5) * 100}%, rgba(0,0,0,0.1) ${((nutrients.ph - 4) / 5) * 100}%, rgba(0,0,0,0.1) 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Acidic</span>
                  <span>Neutral</span>
                  <span>Alkaline</span>
                </div>
              </div>

              {/* Organic Matter */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold">Organic Matter</label>
                  <span className="text-sm font-bold text-[#8B5CF6]">{nutrients.organic}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={nutrients.organic}
                  onChange={(e) => setNutrients({ ...nutrients, organic: parseInt(e.target.value) })}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${nutrients.organic}%, rgba(0,0,0,0.1) ${nutrients.organic}%, rgba(0,0,0,0.1) 100%)`
                  }}
                />
              </div>
            </div>

            <button
              onClick={analyzeSOIL}
              disabled={analyzing}
              className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-[#1E7F5C] to-[#2BB673] text-white rounded-xl font-semibold hover:shadow-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed btn-ripple"
            >
              {analyzing ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FlaskConical className="w-5 h-5" />
                  {t.analyze}
                </span>
              )}
            </button>
          </div>
        </motion.div>

        {/* Results Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {!result && (
            <div className="p-6 rounded-2xl bg-card border border-border h-full flex items-center justify-center">
              <div className="text-center">
                <FlaskConical className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">
                  Adjust the nutrient sliders and click Analyze to see results
                </p>
              </div>
            </div>
          )}

          {result && (
            <>
              {/* Overall Score */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1E7F5C] to-[#2BB673] text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl">Overall Soil Health</h3>
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="flex items-end gap-4">
                  <div className="text-6xl font-bold">{result.overallScore}</div>
                  <div className="pb-2">
                    <div className="text-2xl font-semibold">{result.overallStatus}</div>
                    <div className="text-sm opacity-80">Health Score</div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                  <div>
                    <p className="text-sm opacity-80">Sustainability</p>
                    <p className="text-xl font-bold">{result.sustainabilityScore}%</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Action Required</p>
                    <p className="text-xl font-bold">{result.recommendations.length}</p>
                  </div>
                </div>
              </div>

              {/* Nutrient Status */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="text-xl mb-4">Nutrient Status</h3>
                <div className="space-y-4">
                  {Object.entries(result.nutrients).map(([key, data]: [string, any]) => (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="capitalize font-semibold">{key}</span>
                        <span className={`text-sm font-semibold ${data.color}`}>
                          {data.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${data.bg} transition-all duration-1000`}
                            style={{ width: `${data.value}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold min-w-[3rem] text-right">
                          {typeof data.value === 'number' && data.value % 1 !== 0 
                            ? data.value.toFixed(1) 
                            : data.value}
                          {key === 'ph' ? '' : '%'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Recommendations */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <Leaf className="w-6 h-6 text-[#2BB673]" />
            <h3 className="text-xl">Fertilizer Recommendations</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.recommendations.map((rec: any, index: number) => (
              <div
                key={index}
                className={`p-5 rounded-xl border-2 transition-smooth hover:scale-[1.02] ${
                  rec.priority === 'high' 
                    ? 'border-[#EF476F] bg-[#EF476F]/5' 
                    : rec.priority === 'medium'
                    ? 'border-[#FFD166] bg-[#FFD166]/5'
                    : 'border-[#2BB673] bg-[#2BB673]/5'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold">{rec.title}</h4>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    rec.priority === 'high' 
                      ? 'bg-[#EF476F] text-white' 
                      : rec.priority === 'medium'
                      ? 'bg-[#FFD166] text-black'
                      : 'bg-[#2BB673] text-white'
                  }`}>
                    {rec.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                <div className="pt-3 border-t border-border">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#2BB673] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-[#2BB673] mb-1">Organic Alternative:</p>
                      <p className="text-sm">{rec.organic}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
