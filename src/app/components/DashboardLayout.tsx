import { Outlet, Link, useLocation } from 'react-router';
import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';
import { 
  LayoutDashboard,
  Sprout,
  Droplets,
  Cloud,
  Bug,
  TrendingUp,
  Settings as SettingsIcon,
  Menu,
  X,
  Bell,
  User,
  Moon,
  Sun,
  Languages
} from 'lucide-react';
import { useState } from 'react';

export default function DashboardLayout() {
  const { language, setLanguage, theme, toggleTheme } = useApp();
  const t = translations[language];
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { path: '/app', icon: LayoutDashboard, label: t.dashboard, exact: true },
    { path: '/app/crop-advisory', icon: Sprout, label: t.cropAdvisory },
    { path: '/app/soil-health', icon: Droplets, label: t.soilHealth },
    { path: '/app/weather', icon: Cloud, label: t.weatherIntelligence },
    { path: '/app/pest-ai', icon: Bug, label: t.pestAI },
    { path: '/app/market', icon: TrendingUp, label: t.marketAnalytics },
    { path: '/app/settings', icon: SettingsIcon, label: t.settings },
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-full w-64 bg-card border-r border-border transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E7F5C] to-[#2BB673] flex items-center justify-center">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#1E7F5C] to-[#2BB673] bg-clip-text text-transparent">
                SmartCrop
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path, item.exact);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth
                    ${active 
                      ? 'bg-gradient-to-r from-[#1E7F5C] to-[#2BB673] text-white shadow-lg' 
                      : 'hover:bg-muted text-foreground'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E7F5C] to-[#2BB673] flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Farmer</p>
                <p className="text-xs text-muted-foreground">farmer@smartcrop.in</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-smooth"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="flex-1 lg:flex-none" />

            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="px-3 py-2 rounded-lg bg-background border border-border cursor-pointer transition-smooth hover:border-primary text-sm"
              >
                <option value="en">English</option>
                <option value="ta">தமிழ்</option>
                <option value="hi">हिंदी</option>
              </select>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-muted transition-smooth"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-muted transition-smooth">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF476F] rounded-full" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
