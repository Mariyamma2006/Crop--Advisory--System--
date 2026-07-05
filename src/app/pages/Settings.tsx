import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Moon,
  Sun,
  Save,
  Volume2,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export default function Settings() {
  const { language, setLanguage, theme, toggleTheme } = useApp();
  const t = translations[language];

  const [profile, setProfile] = useState({
    name: 'Farmer',
    email: 'farmer@smartcrop.in',
    phone: '+91 9876543210',
    location: 'Karnataka, India',
    farmSize: '5',
  });

  const [notifications, setNotifications] = useState({
    weather: true,
    market: true,
    pest: false,
    email: true,
    sms: false,
  });

  const [preferences, setPreferences] = useState({
    voice: true,
    autoAnalysis: false,
    dataSharing: false,
  });

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
  };

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved!');
  };

  const handleSavePreferences = () => {
    toast.success('Preferences saved!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500">
            <SettingsIcon className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl">{t.settings}</h1>
        </div>
        <p className="text-muted-foreground font-['Inter']">
          Manage your account, preferences, and notifications
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-primary" />
            <h3 className="text-xl">Profile Information</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-smooth"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-smooth"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-smooth"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-smooth"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Farm Size (Acres)</label>
              <input
                type="number"
                value={profile.farmSize}
                onChange={(e) => setProfile({ ...profile, farmSize: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary outline-none transition-smooth"
              />
            </div>

            <button
              onClick={handleSaveProfile}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#1E7F5C] to-[#2BB673] text-white rounded-xl font-semibold hover:shadow-lg transition-smooth btn-ripple flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Profile
            </button>
          </div>
        </motion.div>

        {/* Quick Settings */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Theme */}
          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-4">
              {theme === 'light' ? (
                <Sun className="w-6 h-6 text-yellow-500" />
              ) : (
                <Moon className="w-6 h-6 text-purple-500" />
              )}
              <h3 className="text-lg">Appearance</h3>
            </div>
            <button
              onClick={toggleTheme}
              className="w-full px-4 py-3 rounded-xl bg-muted hover:bg-muted/80 transition-smooth flex items-center justify-between"
            >
              <span>Theme</span>
              <span className="font-semibold">{theme === 'light' ? 'Light' : 'Dark'}</span>
            </button>
          </div>

          {/* Language */}
          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg">Language</h3>
            </div>
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value as any);
                toast.success('Language changed successfully!');
              }}
              className="w-full px-4 py-3 rounded-xl bg-muted cursor-pointer transition-smooth hover:bg-muted/80"
            >
              <option value="en">English</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="hi">हिंदी (Hindi)</option>
            </select>
          </div>

          {/* Profile Picture */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1E7F5C] to-[#2BB673] text-white">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center">
                <User className="w-12 h-12" />
              </div>
              <h3 className="font-semibold mb-2">{profile.name}</h3>
              <p className="text-sm opacity-90">{profile.email}</p>
              <button className="mt-4 px-4 py-2 bg-white/20 backdrop-blur-lg rounded-lg hover:bg-white/30 transition-smooth text-sm">
                Change Photo
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl bg-card border border-border"
      >
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-primary" />
          <h3 className="text-xl">Notification Preferences</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
            <div>
              <h4 className="font-semibold mb-1">Weather Alerts</h4>
              <p className="text-sm text-muted-foreground">Get notified about weather changes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.weather}
                onChange={(e) => setNotifications({ ...notifications, weather: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2BB673]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
            <div>
              <h4 className="font-semibold mb-1">Market Updates</h4>
              <p className="text-sm text-muted-foreground">Price changes and market trends</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.market}
                onChange={(e) => setNotifications({ ...notifications, market: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2BB673]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
            <div>
              <h4 className="font-semibold mb-1">Pest Warnings</h4>
              <p className="text-sm text-muted-foreground">Disease outbreak alerts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.pest}
                onChange={(e) => setNotifications({ ...notifications, pest: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2BB673]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
            <div>
              <h4 className="font-semibold mb-1">Email Notifications</h4>
              <p className="text-sm text-muted-foreground">Receive updates via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2BB673]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
            <div>
              <h4 className="font-semibold mb-1">SMS Alerts</h4>
              <p className="text-sm text-muted-foreground">Critical alerts via SMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2BB673]"></div>
            </label>
          </div>
        </div>

        <button
          onClick={handleSaveNotifications}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-[#1E7F5C] to-[#2BB673] text-white rounded-xl font-semibold hover:shadow-lg transition-smooth btn-ripple"
        >
          Save Notification Preferences
        </button>
      </motion.div>

      {/* Advanced Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl bg-card border border-border"
      >
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-primary" />
          <h3 className="text-xl">Advanced Preferences</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-blue-500" />
              <div>
                <h4 className="font-semibold mb-1">Voice Advisory</h4>
                <p className="text-sm text-muted-foreground">Enable text-to-speech for recommendations</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.voice}
                onChange={(e) => setPreferences({ ...preferences, voice: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2BB673]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
            <div className="flex items-center gap-3">
              <SettingsIcon className="w-5 h-5 text-purple-500" />
              <div>
                <h4 className="font-semibold mb-1">Auto Analysis</h4>
                <p className="text-sm text-muted-foreground">Automatically analyze uploaded images</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.autoAnalysis}
                onChange={(e) => setPreferences({ ...preferences, autoAnalysis: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2BB673]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-green-500" />
              <div>
                <h4 className="font-semibold mb-1">Data Sharing</h4>
                <p className="text-sm text-muted-foreground">Help improve our AI models</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.dataSharing}
                onChange={(e) => setPreferences({ ...preferences, dataSharing: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2BB673]"></div>
            </label>
          </div>
        </div>

        <button
          onClick={handleSavePreferences}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-[#1E7F5C] to-[#2BB673] text-white rounded-xl font-semibold hover:shadow-lg transition-smooth btn-ripple"
        >
          Save Preferences
        </button>
      </motion.div>

      {/* Account Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 rounded-2xl bg-card border border-border"
      >
        <h3 className="text-xl mb-4">Account Actions</h3>
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 bg-muted rounded-xl hover:bg-muted/80 transition-smooth">
            Export Data
          </button>
          <button className="px-6 py-3 bg-muted rounded-xl hover:bg-muted/80 transition-smooth">
            Download Reports
          </button>
          <button className="px-6 py-3 bg-muted rounded-xl hover:bg-muted/80 transition-smooth">
            Contact Support
          </button>
          <button className="px-6 py-3 bg-[#EF476F] text-white rounded-xl hover:bg-[#EF476F]/90 transition-smooth">
            Delete Account
          </button>
        </div>
      </motion.div>
    </div>
  );
}
