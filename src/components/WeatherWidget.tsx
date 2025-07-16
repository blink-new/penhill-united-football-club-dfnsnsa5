import { motion } from 'framer-motion'
import { Cloud, CloudRain, Sun, CloudSnow, Wind, Droplets, Thermometer } from 'lucide-react'
import useWeather from '../lib/useWeather'
import { Badge } from './ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return Sun
    case 'rain':
    case 'drizzle':
      return CloudRain
    case 'snow':
      return CloudSnow
    case 'clouds':
    default:
      return Cloud
  }
}

const getWeatherColor = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return 'text-yellow-400'
    case 'rain':
    case 'drizzle':
      return 'text-blue-400'
    case 'snow':
      return 'text-blue-200'
    case 'clouds':
    default:
      return 'text-gray-400'
  }
}

export function WeatherWidget() {
  const { temp, rain, condition, humidity, windSpeed } = useWeather()
  const WeatherIcon = getWeatherIcon(condition)
  const iconColor = getWeatherColor(condition)

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm"
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <WeatherIcon className={`w-4 h-4 ${iconColor}`} />
            <div className="flex items-center space-x-3 text-sm text-white/90">
              <div className="flex items-center space-x-1">
                <Thermometer className="w-3 h-3" />
                <span className="font-medium">{temp}°C</span>
              </div>
              <div className="flex items-center space-x-1">
                <Droplets className="w-3 h-3" />
                <span>{rain}</span>
              </div>
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className="stadium-arc">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <WeatherIcon className={`w-4 h-4 ${iconColor}`} />
              <span className="font-medium">{condition}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center space-x-1">
                <Thermometer className="w-3 h-3" />
                <span>{temp}°C</span>
              </div>
              <div className="flex items-center space-x-1">
                <Droplets className="w-3 h-3" />
                <span>{humidity}%</span>
              </div>
              <div className="flex items-center space-x-1">
                <CloudRain className="w-3 h-3" />
                <span>{rain}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Wind className="w-3 h-3" />
                <span>{windSpeed} km/h</span>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              North Wiltshire
            </Badge>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}