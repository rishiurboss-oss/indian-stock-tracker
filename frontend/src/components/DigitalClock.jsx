import React, { useState, useEffect } from 'react'

const DigitalClock = () => {
  const [times, setTimes] = useState({})

  const timeZones = [
    { name: 'IST', zone: 'Asia/Kolkata', label: 'India (IST)' },
    { name: 'UTC', zone: 'UTC', label: 'UTC' },
    { name: 'EST', zone: 'America/New_York', label: 'US Eastern (EST)' },
    { name: 'CST', zone: 'America/Chicago', label: 'US Central (CST)' },
    { name: 'PST', zone: 'America/Los_Angeles', label: 'US Pacific (PST)' },
    { name: 'GMT', zone: 'Europe/London', label: 'London (GMT)' },
    { name: 'CET', zone: 'Europe/Paris', label: 'Europe (CET)' },
    { name: 'JST', zone: 'Asia/Tokyo', label: 'Japan (JST)' },
    { name: 'SGT', zone: 'Asia/Singapore', label: 'Singapore (SGT)' },
    { name: 'HKT', zone: 'Asia/Hong_Kong', label: 'Hong Kong (HKT)' },
    { name: 'AEST', zone: 'Australia/Sydney', label: 'Australia (AEST)' },
    { name: 'NZT', zone: 'Pacific/Auckland', label: 'New Zealand (NZT)' },
  ]

  useEffect(() => {
    const updateTimes = () => {
      const newTimes = {}
      timeZones.forEach(tz => {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: tz.zone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
        newTimes[tz.name] = formatter.format(new Date())
      })
      setTimes(newTimes)
    }

    updateTimes()
    const interval = setInterval(updateTimes, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">⏰ Multi-Timezone Clock</h2>
        <p className="text-gray-400">Track market hours across global time zones</p>
      </div>

      {/* Clock Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {timeZones.map((tz) => (
          <div
            key={tz.name}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition shadow-lg"
          >
            {/* Timezone Name */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-blue-400">{tz.name}</h3>
              <p className="text-sm text-gray-500">{tz.label}</p>
            </div>

            {/* Digital Time Display */}
            <div className="bg-black rounded-lg p-6 mb-4 border-2 border-green-500 font-mono">
              <div className="text-4xl font-bold text-green-400 text-center tracking-wider">
                {times[tz.name] || '--:--:--'}
              </div>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Live</span>
              <span className={`w-2 h-2 rounded-full ${tz.name === 'IST' ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`}></span>
            </div>
          </div>
        ))}
      </div>

      {/* Market Hours Guide */}
      <div className="mt-12 bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">📊 Market Hours Reference</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold text-blue-400">NSE India</p>
            <p className="text-gray-400">09:15 - 15:30 IST</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <p className="font-semibold text-green-400">NYSE</p>
            <p className="text-gray-400">09:30 - 16:00 EST</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <p className="font-semibold text-purple-400">LSE</p>
            <p className="text-gray-400">08:00 - 16:30 GMT</p>
          </div>
          <div className="border-l-4 border-yellow-500 pl-4">
            <p className="font-semibold text-yellow-400">Tokyo Exchange</p>
            <p className="text-gray-400">09:00 - 15:00 JST</p>
          </div>
          <div className="border-l-4 border-red-500 pl-4">
            <p className="font-semibold text-red-400">Hong Kong</p>
            <p className="text-gray-400">09:30 - 16:00 HKT</p>
          </div>
          <div className="border-l-4 border-cyan-500 pl-4">
            <p className="font-semibold text-cyan-400">Sydney Exchange</p>
            <p className="text-gray-400">10:00 - 16:00 AEST</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DigitalClock
