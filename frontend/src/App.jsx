import React, { useState } from 'react'
import DigitalClock from './components/DigitalClock'
import ClockWidget from './components/ClockWidget'
import AnalogClock from './components/AnalogClock'
import WeatherDashboard from './components/WeatherDashboard'
import axios from 'axios'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('stocks')
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  React.useEffect(() => {
    if (activeTab === 'stocks') {
      fetchStocks()
    }
  }, [activeTab])

  const fetchStocks = async () => {
    setLoading(true)
    try {
      const response = await axios.get('/api/stocks')
      setStocks(response.data)
    } catch (error) {
      console.error('Error fetching stocks:', error)
    }
    setLoading(false)
  }

  const filteredStocks = stocks.filter(stock =>
    stock.symbol.includes(searchQuery.toUpperCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-white">📈 Indian Stock Tracker</h1>
          <p className="text-gray-400 mt-2">Real-time market data at your fingertips</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-gray-800 border-b border-gray-700 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-4 whitespace-nowrap">
            <button
              onClick={() => setActiveTab('stocks')}
              className={`px-6 py-3 font-semibold transition ${
                activeTab === 'stocks'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              📊 Stocks
            </button>
            <button
              onClick={() => setActiveTab('digital-clock')}
              className={`px-6 py-3 font-semibold transition ${
                activeTab === 'digital-clock'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🕐 Digital Clock
            </button>
            <button
              onClick={() => setActiveTab('analog-clock')}
              className={`px-6 py-3 font-semibold transition ${
                activeTab === 'analog-clock'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              ⏰ Analog Clock
            </button>
            <button
              onClick={() => setActiveTab('widget')}
              className={`px-6 py-3 font-semibold transition ${
                activeTab === 'widget'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🎯 Quick View
            </button>
            <button
              onClick={() => setActiveTab('weather')}
              className={`px-6 py-3 font-semibold transition ${
                activeTab === 'weather'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🌤️ Weather
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stocks Tab */}
        {activeTab === 'stocks' && (
          <>
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search stocks by symbol or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full text-center text-gray-400 py-8">
                  Loading stocks...
                </div>
              ) : filteredStocks.length > 0 ? (
                filteredStocks.map((stock) => (
                  <div key={stock._id} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition">
                    <h3 className="text-xl font-bold text-white mb-2">{stock.symbol}</h3>
                    <p className="text-gray-400 mb-4">{stock.name}</p>
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-400">Current Price:</span>
                      <span className="text-2xl font-bold text-green-400">₹{stock.currentPrice?.toFixed(2) || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Exchange: {stock.exchange}</span>
                      <span className="text-gray-400">Vol: {stock.volume || 'N/A'}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-400 py-8">
                  No stocks found
                </div>
              )}
            </div>
          </>
        )}

        {/* Digital Clock Tab */}
        {activeTab === 'digital-clock' && <DigitalClock />}

        {/* Analog Clock Tab */}
        {activeTab === 'analog-clock' && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">⏰ Analog Clocks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnalogClock timeZone="Asia/Kolkata" label="India (IST)" />
              <AnalogClock timeZone="UTC" label="UTC" />
              <AnalogClock timeZone="America/New_York" label="US Eastern (EST)" />
              <AnalogClock timeZone="America/Los_Angeles" label="US Pacific (PST)" />
              <AnalogClock timeZone="Europe/London" label="London (GMT)" />
              <AnalogClock timeZone="Asia/Tokyo" label="Japan (JST)" />
            </div>
          </div>
        )}

        {/* Widget Quick View Tab */}
        {activeTab === 'widget' && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">🎯 Quick View - Major Time Zones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ClockWidget timeZone="Asia/Kolkata" label="India (IST)" abbreviation="IST" />
              <ClockWidget timeZone="UTC" label="Coordinated Universal" abbreviation="UTC" />
              <ClockWidget timeZone="America/New_York" label="US Eastern" abbreviation="EST" />
              <ClockWidget timeZone="America/Chicago" label="US Central" abbreviation="CST" />
              <ClockWidget timeZone="America/Los_Angeles" label="US Pacific" abbreviation="PST" />
              <ClockWidget timeZone="Europe/London" label="London" abbreviation="GMT" />
              <ClockWidget timeZone="Europe/Paris" label="Europe" abbreviation="CET" />
              <ClockWidget timeZone="Asia/Tokyo" label="Japan" abbreviation="JST" />
              <ClockWidget timeZone="Asia/Hong_Kong" label="Hong Kong" abbreviation="HKT" />
              <ClockWidget timeZone="Australia/Sydney" label="Sydney" abbreviation="AEST" />
              <ClockWidget timeZone="Pacific/Auckland" label="New Zealand" abbreviation="NZT" />
              <ClockWidget timeZone="Asia/Singapore" label="Singapore" abbreviation="SGT" />
            </div>
          </div>
        )}

        {/* Weather Dashboard Tab */}
        {activeTab === 'weather' && <WeatherDashboard />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-400">
          <p>© 2024 Indian Stock Tracker. Real-time data for Indian markets and weather.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
