import React from 'react'

interface IconProps {
  className?: string
  size?: number
}

// ⚽ Football icon (Team Hub)
export const FootballIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"/>
    <path d="m7.5 9 2.143 1.607L11.786 9l2.143 1.607L16.5 9"/>
    <path d="M12 12.75a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"/>
  </svg>
)

// 📊 Chart icon (Analytics)
export const ChartIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 3v18h18"/>
    <path d="m19 9-6 6-4-4-3 3"/>
  </svg>
)

// 🗓 Calendar icon (Schedule)
export const CalendarIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
)

// 🔔 Bell (Notifications)
export const BellIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
)

// 🧑‍💻 AI Status (animated)
export const AIStatusIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
  >
    <circle cx="8" cy="12" r="1.5" className="ai-dot" fill="currentColor"/>
    <circle cx="12" cy="12" r="1.5" className="ai-dot" fill="currentColor" style={{ animationDelay: '0.2s' }}/>
    <circle cx="16" cy="12" r="1.5" className="ai-dot" fill="currentColor" style={{ animationDelay: '0.4s' }}/>
  </svg>
)

// Shield with gradient (Logo)
export const ShieldGradientIcon: React.FC<IconProps & { id?: string }> = ({ className = "", size = 48, id = "shield-gradient" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 48 48" 
    fill="none"
    className={className}
  >
    <defs>
      <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6B46F6"/>
        <stop offset="100%" stopColor="#EF4444"/>
      </linearGradient>
    </defs>
    <path 
      d="M24 4L36 8v12c0 11.05-7.2 20.79-18 24-10.8-3.21-18-12.95-18-24V8l12-4z" 
      fill={`url(#${id})`}
      stroke="none"
    />
    <path 
      d="M24 12L30 16v8c0 5.52-3.6 10.4-9 12-5.4-1.6-9-6.48-9-12v-8l6-4z" 
      fill="rgba(255,255,255,0.2)"
    />
  </svg>
)

// Spark Line for Stats
export const SparkLine: React.FC<{ data: number[], className?: string, color?: string }> = ({ 
  data, 
  className = "", 
  color = "#6B46F6" 
}) => {
  const width = 60
  const height = 20
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - ((value - min) / range) * height
    return `${x},${y}`
  }).join(' ')

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox={`0 0 ${width} ${height}`}
      className={className}
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Confidence Ring for AI Predictions
export const ConfidenceRing: React.FC<{ 
  confidence: number, 
  size?: number, 
  className?: string 
}> = ({ confidence, size = 80, className = "" }) => {
  const radius = 35
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (confidence / 100) * circumference

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 80 80"
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="rgba(107, 114, 128, 0.2)"
          strokeWidth="6"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="url(#confidence-gradient)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="confidence-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0686E1"/>
            <stop offset="100%" stopColor="#6B46F6"/>
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-display">{confidence}%</span>
      </div>
    </div>
  )
}

// Live Status Indicator
export const LiveIndicator: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`flex items-center space-x-2 ${className}`}>
    <div className="w-2 h-2 bg-red-500 rounded-full live-glow"></div>
    <span className="text-sm font-medium text-red-500 uppercase tracking-wide">LIVE</span>
  </div>
)

// Match Status Chip
export const MatchStatusChip: React.FC<{ 
  status: 'live' | 'upcoming' | 'finished' | 'cancelled',
  className?: string 
}> = ({ status, className = "" }) => {
  const statusConfig = {
    live: { color: 'bg-red-500 text-white', label: 'LIVE', glow: 'live-glow' },
    upcoming: { color: 'bg-blue-500 text-white', label: 'UPCOMING', glow: '' },
    finished: { color: 'bg-gray-500 text-white', label: 'FINISHED', glow: '' },
    cancelled: { color: 'bg-red-600 text-white', label: 'CANCELLED', glow: '' }
  }

  const config = statusConfig[status]

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${config.color} ${config.glow} ${className}`}>
      {status === 'live' && <div className="w-1.5 h-1.5 bg-white rounded-full mr-2 animate-pulse"></div>}
      {config.label}
    </div>
  )
}

// Tactical Formation Dot
export const FormationDot: React.FC<{ 
  position: { x: number, y: number },
  playerNumber: number,
  isSelected?: boolean,
  className?: string 
}> = ({ position, playerNumber, isSelected = false, className = "" }) => (
  <div 
    className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
      isSelected 
        ? 'bg-yellow-400 text-black scale-110 shadow-lg' 
        : 'bg-blue-600 text-white hover:scale-105'
    } ${className}`}
    style={{ 
      left: `${position.x}%`, 
      top: `${position.y}%`,
      transform: 'translate(-50%, -50%)'
    }}
  >
    {playerNumber}
  </div>
)

export default {
  FootballIcon,
  ChartIcon,
  CalendarIcon,
  BellIcon,
  AIStatusIcon,
  ShieldGradientIcon,
  SparkLine,
  ConfidenceRing,
  LiveIndicator,
  MatchStatusChip,
  FormationDot
}