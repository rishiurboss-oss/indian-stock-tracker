import React, { useState, useEffect } from 'react'

const ClockWidget = ({ timeZone, label, abbreviation }) => {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      
      // Get time in specific timezone
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      
      const dateFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      })

      setTime(formatter.format(now))
      setDate(dateFormatter.format(now))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [timeZone])

  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-4 shadow-lg border border-blue-600">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="text-sm font-semibold text-blue-100">{label}</h4>
          <p className="text-xs text-blue-300">{abbreviation}</p>
        </div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      </div>
      <div className="font-mono text-2xl font-bold text-white mb-2">{time || '--:--:--'}</div>
      <div className="text-xs text-blue-200">{date}</div>
    </div>
  )
}

export default ClockWidget
