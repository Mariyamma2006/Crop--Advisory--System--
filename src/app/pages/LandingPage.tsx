import { Link } from 'react-router';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';
import { 
  Sprout, 
  Cloud, 
  TrendingUp, 
  Bug, 
  Droplets, 
  Languages, 
  ArrowRight,
  CheckCircle,
  Users,
  BarChart3,
  Leaf,
  Moon,
  Sun
} from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const { language, setLanguage, theme, toggleTheme } = useApp();
  const t = translations[language];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { value: '86%', label: t.smallFarmers, icon: Users },
    { value: '20-30%', label: t.yieldIncrease, icon: TrendingUp },
    { value: '50K+', label: t.activeUsers, icon: BarChart3 },
    { value: '100+', label: t.cropsMonitored, icon: Leaf },
  ];

  const features = [
    {
      icon: Sprout,
      title: t.aiCropAdvisory,
      description: t.aiCropAdvisoryDesc,
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Droplets,
      title: t.soilAnalysis,
      description: t.soilAnalysisDesc,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Cloud,
      title: t.weatherForecast,
      description: t.weatherForecastDesc,
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Bug,
      title: t.pestDetection,
      description: t.pestDetectionDesc,
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: TrendingUp,
      title: t.marketInsights,
      description: t.marketInsightsDesc,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Languages,
      title: t.multilingualSupport,
      description: t.multilingualSupportDesc,
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  const testimonials = [
    {
      name: 'Ramesh Kumar',
      location: 'Karnataka',
      text: 'This platform increased my crop yield by 25%. The AI recommendations are incredibly accurate!',
      image: 'https://images.unsplash.com/photo-1629288465751-07e42186084f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXIlMjB3b3JraW5nJTIwZmllbGR8ZW58MXx8fHwxNzcxODUwNjk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Lakshmi Devi',
      location: 'Tamil Nadu',
      text: 'The weather predictions helped me save my entire harvest. Thank you for this amazing tool!',
      image: 'https://images.unsplash.com/photo-1592515163942-8e70c7cc1c61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMGNyb3AlMjBmaWVsZCUyMGluZGlhfGVufDF8fHx8MTc3MTkxNTk5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Suresh Patil',
      location: 'Maharashtra',
      text: 'Market analytics feature helped me get the best price for my produce. Highly recommended!',
      image: 'https://images.unsplash.com/photo-1669454570665-cdaccf275fd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwcGFkZHklMjBmaWVsZCUyMGFlcmlhbHxlbnwxfHx8fDE3NzE5MTU5OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E7F5C] to-[#2BB673] flex items-center justify-center">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#1E7F5C] to-[#2BB673] bg-clip-text text-transparent">
                SmartCrop
              </span>
            </motion.div>

            <div className="flex items-center gap-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="px-4 py-2 rounded-lg bg-card border border-border cursor-pointer transition-smooth hover:border-primary"
              >
                <option value="en">English</option>
                <option value="ta">தமிழ்</option>
                <option value="hi">हिंदी</option>
              </select>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-card border border-border hover:border-primary transition-smooth"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E7F5C] via-[#2BB673] to-[#1E7F5C] animate-gradient" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 font-['Montserrat']">
                {t.heroTitle}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto opacity-90 font-['Inter']">
                {t.heroSubtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/app"
                className="group px-8 py-4 bg-white text-[#1E7F5C] rounded-xl font-semibold hover:bg-opacity-90 transition-smooth hover-glow flex items-center justify-center gap-2 btn-ripple"
              >
                {t.getStarted}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/app"
                className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-xl font-semibold hover:bg-white/20 transition-smooth border border-white/30 flex items-center justify-center gap-2"
              >
                {t.exploreDashboard}
              </Link>
            </motion.div>

            {/* Floating Icons */}
            <div className="absolute top-20 left-10 animate-float">
              <Sprout className="w-16 h-16 text-white/20" />
            </div>
            <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '1s' }}>
              <Cloud className="w-20 h-20 text-white/20" />
            </div>
            <div className="absolute top-1/2 left-20 animate-float" style={{ animationDelay: '2s' }}>
              <Leaf className="w-12 h-12 text-white/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-8 rounded-2xl bg-card border border-border hover-glow transition-smooth"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#1E7F5C] to-[#2BB673] flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#1E7F5C] to-[#2BB673] bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground font-['Inter']">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl mb-4">{t.features}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-['Inter']">
              Comprehensive tools designed specifically for Indian farmers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group p-8 rounded-2xl bg-card border border-border hover:border-primary hover-glow transition-smooth"
                >
                  <div className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground font-['Inter']">{feature.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl mb-4">Farmer Success Stories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-['Inter']">
              Hear from farmers who transformed their farming practices
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-card border border-border hover-glow transition-smooth"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic font-['Inter']">"{testimonial.text}"</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <CheckCircle key={i} className="w-5 h-5 text-[#FFD166]" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#1E7F5C] to-[#2BB673] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl mb-6 font-['Montserrat']">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90 font-['Inter']">
              Join thousands of farmers already using SmartCrop to increase yields and profits
            </p>
            <Link
              to="/app"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1E7F5C] rounded-xl font-semibold hover:bg-opacity-90 transition-smooth hover-glow btn-ripple"
            >
              {t.getStarted}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E7F5C] to-[#2BB673] flex items-center justify-center">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#1E7F5C] to-[#2BB673] bg-clip-text text-transparent">
                  SmartCrop
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-['Inter']">
                Empowering farmers with AI-powered agriculture solutions
              </p>
            </div>

            <div>
              <h4 className="mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground font-['Inter']">
                <li><Link to="/app" className="hover:text-primary transition-colors">Dashboard</Link></li>
                <li><Link to="/app/crop-advisory" className="hover:text-primary transition-colors">Crop Advisory</Link></li>
                <li><Link to="/app/weather" className="hover:text-primary transition-colors">Weather</Link></li>
                <li><Link to="/app/market" className="hover:text-primary transition-colors">Market</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground font-['Inter']">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4">References</h4>
              <ul className="space-y-2 text-sm text-muted-foreground font-['Inter']">
                <li><a href="https://www.nabard.org" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">NABARD</a></li>
                <li><a href="https://icar.org.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">ICAR</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground font-['Inter']">
            <p>© 2026 SmartCrop Advisory System. Built for Indian Farmers with ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
