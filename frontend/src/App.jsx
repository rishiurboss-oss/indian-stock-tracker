import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchStocks()
  }, [])

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
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-white">📈 Indian Stock Tracker</h1>
          <p className="text-gray-400 mt-2">Real-time market data at your fingertips</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search stocks by symbol or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Stocks Grid */}
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
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-400">
          <p>© 2024 Indian Stock Tracker. Real-time data for Indian markets.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
