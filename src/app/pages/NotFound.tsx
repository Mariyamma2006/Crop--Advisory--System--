import { Link } from 'react-router';
import { Home, ArrowLeft, Sprout } from 'lucide-react';
import { motion } from 'motion/react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg"
      >
        {/* 404 Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="text-9xl font-bold bg-gradient-to-r from-[#1E7F5C] to-[#2BB673] bg-clip-text text-transparent">
              404
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <Sprout className="w-16 h-16 text-[#2BB673]/20" />
            </motion.div>
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl mb-4">Page Not Found</h1>
          <p className="text-lg text-muted-foreground mb-8 font-['Inter']">
            Oops! The page you're looking for seems to have wandered off into the fields.
            Don't worry, we'll help you get back on track.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="group px-6 py-3 bg-gradient-to-r from-[#1E7F5C] to-[#2BB673] text-white rounded-xl font-semibold hover:shadow-lg transition-smooth btn-ripple inline-flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-muted rounded-xl font-semibold hover:bg-muted/80 transition-smooth inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 rounded-2xl bg-card border border-border"
        >
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Link to="/app" className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-smooth">
              Dashboard
            </Link>
            <Link to="/app/crop-advisory" className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-smooth">
              Crop Advisory
            </Link>
            <Link to="/app/weather" className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-smooth">
              Weather
            </Link>
            <Link to="/app/market" className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-smooth">
              Market
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
