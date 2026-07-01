import React, { useState, useEffect } from 'react'

const AnalogClock = ({ timeZone, label }) => {
  const [rotation, setRotation] = useState({ hour: 0, minute: 0, second: 0 })

  useEffect(() => {
    const updateClock = () => {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })

      const parts = formatter.formatToParts(new Date())
      const timeObj = {}
      parts.forEach(({ type, value }) => {
        timeObj[type] = value
      })

      const hour = parseInt(timeObj.hour) % 12
      const minute = parseInt(timeObj.minute)
      const second = parseInt(timeObj.second)

      setRotation({
        hour: (hour * 30) + (minute * 0.5),
        minute: (minute * 6) + (second * 0.1),
        second: second * 6,
      })
    }

    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [timeZone])

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-bold text-white mb-4 text-center">{label}</h3>
      
      <div className="relative w-48 h-48 mx-auto bg-gray-900 rounded-full border-4 border-gray-700 shadow-lg">
        {/* Clock center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full z-10"></div>

        {/* Hour marks */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) * Math.PI / 180
          const x = 80 + 70 * Math.cos(angle - Math.PI / 2)
          const y = 80 + 70 * Math.sin(angle - Math.PI / 2)
          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gray-400 rounded-full"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)',
              }}
            ></div>
          )
        })}

        {/* Hour hand */}
        <div
          className="absolute left-1/2 bottom-1/2 w-1 h-12 bg-white rounded-full origin-bottom"
          style={{
            transform: `translateX(-50%) rotate(${rotation.hour}deg)`,
          }}
        ></div>

        {/* Minute hand */}
        <div
          className="absolute left-1/2 bottom-1/2 w-1 h-16 bg-gray-300 rounded-full origin-bottom"
          style={{
            transform: `translateX(-50%) rotate(${rotation.minute}deg)`,
          }}
        ></div>

        {/* Second hand */}
        <div
          className="absolute left-1/2 bottom-1/2 w-0.5 h-20 bg-red-500 origin-bottom"
          style={{
            transform: `translateX(-50%) rotate(${rotation.second}deg)`,
          }}
        ></div>
      </div>
    </div>
  )
}

export default AnalogClock
