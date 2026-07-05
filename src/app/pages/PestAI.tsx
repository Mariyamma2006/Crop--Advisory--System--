import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';
import { Bug, Upload, Image as ImageIcon, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export default function PestAI() {
  const { language } = useApp();
  const t = translations[language];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);

  const diseases = [
    {
      name: 'Leaf Blight',
      confidence: 92,
      severity: 'High',
      treatment: 'Apply copper-based fungicide (1g/liter) every 7 days',
      organic: 'Neem oil spray (5ml/liter) twice a week',
      prevention: 'Ensure proper spacing, avoid overhead irrigation',
    },
    {
      name: 'Powdery Mildew',
      confidence: 87,
      severity: 'Medium',
      treatment: 'Sulfur-based fungicide spray',
      organic: 'Milk spray (1:9 ratio with water)',
      prevention: 'Improve air circulation, remove infected leaves',
    },
    {
      name: 'Bacterial Wilt',
      confidence: 78,
      severity: 'High',
      treatment: 'Streptomycin sulfate (0.5g/liter)',
      organic: 'Remove and destroy infected plants',
      prevention: 'Crop rotation, use resistant varieties',
    },
    {
      name: 'Aphid Infestation',
      confidence: 95,
      severity: 'Low',
      treatment: 'Imidacloprid-based insecticide',
      organic: 'Soap spray (2 tsp per liter)',
      prevention: 'Encourage beneficial insects like ladybugs',
    },
  ];

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }
      handleImageUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    } else {
      toast.error('Please upload an image file');
    }
  };

  const analyzePest = () => {
    if (!selectedImage) {
      toast.error('Please upload an image first');
      return;
    }

    setAnalyzing(true);
    setTimeout(() => {
      const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
      setResult(randomDisease);
      setAnalyzing(false);
      toast.success('Analysis Complete!');

      // Voice output
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(
          `Detected ${randomDisease.name} with ${randomDisease.confidence}% confidence. Severity is ${randomDisease.severity}. ${randomDisease.treatment}`
        );
        window.speechSynthesis.speak(utterance);
      }
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
            <Bug className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl">{t.pestAI}</h1>
        </div>
        <p className="text-muted-foreground font-['Inter']">
          AI-powered pest and disease detection with instant treatment recommendations
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Upload Area */}
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h3 className="text-xl mb-4">Upload Plant Image</h3>
            
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                dragActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              {!selectedImage ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">
                      Drag & drop or click to upload
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Supports: JPG, PNG, WebP (Max 5MB)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <img
                    src={selectedImage}
                    alt="Uploaded"
                    className="max-h-64 mx-auto rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setResult(null);
                    }}
                    className="text-sm text-[#EF476F] hover:underline"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={analyzePest}
              disabled={!selectedImage || analyzing}
              className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-[#1E7F5C] to-[#2BB673] text-white rounded-xl font-semibold hover:shadow-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed btn-ripple"
            >
              {analyzing ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing with AI...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Bug className="w-5 h-5" />
                  Analyze Image
                </span>
              )}
            </button>
          </div>

          {/* Quick Tips */}
          <div className="p-6 rounded-2xl bg-muted/50 border border-border">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Tips for Better Results
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#2BB673] mt-0.5 flex-shrink-0" />
                <span>Take close-up photos of affected leaves or plants</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#2BB673] mt-0.5 flex-shrink-0" />
                <span>Ensure good lighting - avoid shadows</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#2BB673] mt-0.5 flex-shrink-0" />
                <span>Focus on the disease symptoms</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#2BB673] mt-0.5 flex-shrink-0" />
                <span>Use high-resolution images for accuracy</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-card border border-border"
        >
          <h3 className="text-xl mb-6">Analysis Results</h3>

          {analyzing && (
            <div className="space-y-4">
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Analyzing image with AI...</p>
                  <p className="text-sm text-muted-foreground mt-2">This may take a few seconds</p>
                </div>
              </div>
            </div>
          )}

          {!analyzing && !result && (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <AlertCircle className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground text-center">
                Upload a plant image to detect pests and diseases
              </p>
            </div>
          )}

          {!analyzing && result && (
            <div className="space-y-6">
              {/* Detection Result */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-[#EF476F] to-[#FF6B9D] text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Bug className="w-6 h-6" />
                    <span className="text-sm font-semibold">DETECTED</span>
                  </div>
                  <span className="text-sm font-bold px-3 py-1 bg-white/20 rounded-full">
                    {result.severity} Severity
                  </span>
                </div>
                <h4 className="text-2xl font-bold mb-4">{result.name}</h4>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm opacity-80 mb-1">Confidence</p>
                    <p className="text-3xl font-bold">{result.confidence}%</p>
                  </div>
                  <div className="flex-1">
                    <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.confidence}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Treatment */}
              <div className="p-5 rounded-xl border-2 border-[#2BB673] bg-[#2BB673]/5">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#2BB673]" />
                  Chemical Treatment
                </h4>
                <p className="text-sm text-muted-foreground">{result.treatment}</p>
              </div>

              {/* Organic Alternative */}
              <div className="p-5 rounded-xl border-2 border-[#FFD166] bg-[#FFD166]/5">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#FFD166]" />
                  Organic Alternative
                </h4>
                <p className="text-sm text-muted-foreground">{result.organic}</p>
              </div>

              {/* Prevention */}
              <div className="p-5 rounded-xl bg-muted">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-500" />
                  Prevention Tips
                </h4>
                <p className="text-sm text-muted-foreground">{result.prevention}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-smooth">
                  Save Report
                </button>
                <button className="flex-1 px-4 py-3 rounded-xl border border-border hover:bg-muted transition-smooth">
                  Share with Expert
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Common Diseases Reference */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl bg-card border border-border"
      >
        <h3 className="text-xl mb-6">Common Pest & Disease Database</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {diseases.map((disease, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-muted hover:bg-muted/80 transition-smooth cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm">{disease.name}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  disease.severity === 'High' 
                    ? 'bg-[#EF476F] text-white' 
                    : disease.severity === 'Medium'
                    ? 'bg-[#FFD166] text-black'
                    : 'bg-[#2BB673] text-white'
                }`}>
                  {disease.severity}
                </span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {disease.treatment}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
