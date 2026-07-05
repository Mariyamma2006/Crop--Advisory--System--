# 🔧 Troubleshooting & Usage Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   # or
   pnpm build
   ```

---

## 🎯 How to Use Each Feature

### **Landing Page (/**
- Browse features and statistics
- Read farmer testimonials
- Switch language (English/Tamil/Hindi)
- Toggle dark/light theme
- Click "Get Started" to access dashboard

### **Dashboard (/app)**
- View overview of weather, soil, market, and alerts
- Check temperature trends and crop yield charts
- Monitor soil nutrient status
- Quick action buttons for each feature

### **Crop Advisory (/app/crop-advisory)**
1. Enter your location
2. Select soil type (Alluvial, Black, Red, etc.)
3. Choose season (Kharif, Rabi, Zaid, Summer)
4. Input annual rainfall in mm
5. Optional: Select previous crop
6. Click "Analyze" for AI recommendations
7. Listen to voice advisory with speaker button

### **Soil Health (/app/soil-health)**
1. Adjust NPK sliders to your soil test values
2. Set pH level (4-9 range)
3. Set organic matter percentage
4. Click "Analyze" to get recommendations
5. View chemical and organic fertilizer suggestions
6. Check sustainability score

### **Weather Intelligence (/app/weather)**
1. Enter your location
2. Click "Update" to fetch weather data
3. View current weather conditions
4. Check 7-day forecast
5. Analyze 24-hour temperature and rain charts
6. Read farming advisories for irrigation, spraying, harvesting

### **Pest AI (/app/pest-ai)**
1. Drag & drop or click to upload plant image
2. Ensure image shows disease symptoms clearly
3. Click "Analyze Image"
4. View detected disease with confidence score
5. Read treatment recommendations (chemical & organic)
6. Check prevention tips

### **Market Analytics (/app/market)**
1. Select crop from dropdown
2. Select state/region
3. View current price and trend
4. Check demand vs supply chart
5. Analyze 12-month price history
6. Compare prices across different crops
7. Read market insights for best selling time

### **Settings (/app/settings)**
- Update profile information
- Change language preference
- Switch between light/dark theme
- Configure notifications (weather, market, pest alerts)
- Enable/disable voice advisory
- Manage advanced preferences

---

## 🌐 Multilingual Support

### Switching Languages
1. Click language dropdown in header
2. Select from English, தமிழ் (Tamil), or हिंदी (Hindi)
3. Entire UI updates instantly
4. Preference saved in browser

---

## 🎨 Theme Toggle

### Changing Theme
1. Click sun/moon icon in header
2. Switches between light and dark mode
3. Preference persists across sessions
4. Smooth transition animation

---

## 🔊 Voice Advisory

### Using Voice Features
- Automatically plays after crop analysis
- Click speaker icon to replay
- Speaks in English
- Disable in Settings if not needed

---

## 📱 PWA Installation

### Install as App
**On Mobile (Android/iOS):**
1. Open in Chrome/Safari
2. Tap browser menu (⋮ or Share icon)
3. Select "Add to Home Screen"
4. App icon appears on home screen

**On Desktop (Chrome):**
1. Look for install icon in address bar
2. Click "Install"
3. App opens in standalone window

---

## 🐛 Common Issues

### **Charts Not Displaying**
- Solution: Refresh page, Chart.js may need initialization

### **Voice Not Working**
- Solution: Check browser permissions for audio
- Enable voice in Settings
- Supported in Chrome, Safari, Edge

### **Images Not Uploading (Pest AI)**
- Solution: Ensure image is < 5MB
- Use JPG, PNG, or WebP format
- Check browser file upload permissions

### **Language Not Changing**
- Solution: Clear browser cache and reload
- Check localStorage is enabled

### **Theme Not Persisting**
- Solution: Enable cookies/localStorage in browser
- Check browser privacy settings

---

## 🎭 Demo Data

All data in the application is **simulated** for demonstration:
- Weather data is randomly generated
- Crop prices are realistic estimates
- Pest detection uses mock AI responses
- Market trends are illustrative

For production use, integrate with:
- OpenWeather API for weather
- Government agriculture APIs for prices
- Real ML models for pest detection

---

## 📊 Understanding the Charts

### **Dashboard Charts**
- **Temperature Trend**: Shows 7-day temperature forecast
- **Crop Yield**: Expected yield for major crops
- **Soil Health**: Nutrient distribution (N, P, K, Organic)

### **Crop Advisory Charts**
- **Suitability Comparison**: Shows scores for top 5 recommended crops
- Higher bars = Better suited for your conditions

### **Weather Charts**
- **24-Hour Forecast**: Temperature (left axis) and Rain probability (right axis)
- Dual-axis for easy comparison

### **Market Charts**
- **Price Trend**: 12-month historical price movement
- **Crop Comparison**: Price comparison across different crops
- **Demand-Supply**: Pie chart showing market balance

---

## 🎯 Best Practices

### For Farmers
1. **Crop Advisory**: Input accurate soil test data
2. **Soil Health**: Get soil tested at least twice a year
3. **Weather**: Check daily for irrigation planning
4. **Pest AI**: Take clear, well-lit photos of affected plants
5. **Market**: Track prices weekly for best selling time

### For Developers
1. Replace mock data with real APIs
2. Implement user authentication
3. Add database for saving user data
4. Integrate payment gateway for premium features
5. Add real-time notifications via WebSocket

---

## 🔐 Privacy Notes

- All data is stored locally in browser
- No data sent to external servers
- Clear browser data to reset app
- Safe to use for learning and testing

---

## 📞 Support

For issues or questions:
- Check this troubleshooting guide
- Review the main README.md
- Inspect browser console for errors
- Ensure all dependencies are installed

---

## 🌟 Tips & Tricks

1. **Keyboard Shortcuts**: Standard browser shortcuts work
2. **Mobile Gestures**: Swipe to navigate back
3. **Offline Use**: Install as PWA for offline access
4. **Data Export**: Use Settings → Export Data
5. **Voice Control**: Enable voice for hands-free operation

---

**Happy Farming! 🌾**
