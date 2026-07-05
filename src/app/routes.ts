import { createBrowserRouter } from 'react-router';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import CropAdvisory from './pages/CropAdvisory';
import SoilHealth from './pages/SoilHealth';
import WeatherIntelligence from './pages/WeatherIntelligence';
import PestAI from './pages/PestAI';
import MarketAnalytics from './pages/MarketAnalytics';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LandingPage,
  },
  {
    path: '/app',
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'crop-advisory', Component: CropAdvisory },
      { path: 'soil-health', Component: SoilHealth },
      { path: 'weather', Component: WeatherIntelligence },
      { path: 'pest-ai', Component: PestAI },
      { path: 'market', Component: MarketAnalytics },
      { path: 'settings', Component: Settings },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]);