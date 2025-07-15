import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, Pause, RotateCcw, Clock, MapPin, Users, 
  Target, Activity, Zap, TrendingUp, AlertTriangle,
  Thermometer, Wind, Eye, Camera, Mic, Share2,
  ChevronLeft, ChevronRight, MoreHorizontal
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { 
  ConfidenceRing, 
  LiveIndicator, 
  MatchStatusChip,
  FootballIcon,
  SparkLine
} from './icons/SkyIcons'

interface MatchEvent {
  id: string
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'corner' | 'free_kick'
  minute: number
  player: string
  description: string
  team: 'home' | 'away'
}

interface WeatherData {
  temperature: number
  humidity: number
  windSpeed: number
  condition: string
  icon: string
}

interface LiveStats {
  possession: { home: number; away: number }
  shots: { home: number; away: number }
  shotsOnTarget: { home: number; away: number }
  corners: { home: number; away: number }
  fouls: { home: number; away: number }
  passAccuracy: { home: number; away: number }
}

export function MatchCenter() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [matchTime, setMatchTime] = useState(0)
  const [isLive, setIsLive] = useState(true)
  const [selectedView, setSelectedView] = useState<'overview' | 'tactics' | 'analytics'>('overview')

  // Mock match data
  const match = {
    homeTeam: 'Penhill United',
    awayTeam: 'Arsenal FC Youth',
    homeScore: 2,
    awayScore: 1,
    status: 'live' as const,
    venue: 'Penhill Stadium',
    kickoffTime: '15:00',
    date: '2025-07-20',
    referee: 'Michael Johnson',
    attendance: 1247
  }

  const weather: WeatherData = {
    temperature: 18,
    humidity: 65,
    windSpeed: 12,
    condition: 'Partly Cloudy',
    icon: '⛅'
  }

  const liveStats: LiveStats = {
    possession: { home: 58, away: 42 },
    shots: { home: 12, away: 8 },
    shotsOnTarget: { home: 6, away: 4 },
    corners: { home: 7, away: 3 },
    fouls: { home: 9, away: 11 },
    passAccuracy: { home: 87, away: 82 }
  }

  const events: MatchEvent[] = [
    {
      id: '1',
      type: 'goal',
      minute: 23,
      player: 'Jamie Smith',
      description: 'Beautiful curling shot from outside the box',
      team: 'home'
    },
    {
      id: '2',
      type: 'yellow_card',
      minute: 31,
      player: 'Alex Johnson',
      description: 'Tactical foul to stop counter-attack',
      team: 'away'
    },
    {
      id: '3',
      type: 'goal',
      minute: 45,
      player: 'Marcus Wilson',
      description: 'Header from corner kick',
      team: 'away'
    },
    {
      id: '4',
      type: 'goal',
      minute: 67,
      player: 'Emma Wilson',
      description: 'Penalty conversion after handball',
      team: 'home'
    }
  ]

  const aiInsights = [
    {
      title: 'Tactical Advantage Detected',
      description: 'Left wing attacks showing 73% success rate - exploit this weakness',
      confidence: 91,
      priority: 'high'
    },
    {
      title: 'Player Fatigue Alert',
      description: 'Jamie Smith showing signs of fatigue - consider substitution',
      confidence: 87,
      priority: 'medium'
    },
    {
      title: 'Formation Recommendation',
      description: 'Switch to 4-2-3-1 to counter opponent\'s midfield pressure',
      confidence: 84,
      priority: 'high'
    }
  ]

  const heatmapData = [
    { zone: 'Left Wing', intensity: 73, color: 'bg-red-500' },
    { zone: 'Center', intensity: 45, color: 'bg-yellow-500' },
    { zone: 'Right Wing', intensity: 62, color: 'bg-orange-500' },
    { zone: 'Defense', intensity: 38, color: 'bg-green-500' }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      if (isLive) {
        setMatchTime(prev => prev + 1)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [isLive])

  const getEventIcon = (type: MatchEvent['type']) => {
    switch (type) {
      case 'goal': return '⚽'
      case 'yellow_card': return '🟨'
      case 'red_card': return '🟥'
      case 'substitution': return '🔄'
      case 'corner': return '📐'
      case 'free_kick': return '🦶'
      default: return '⚽'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50'
      case 'medium': return 'border-yellow-500 bg-yellow-50'
      case 'low': return 'border-green-500 bg-green-50'
      default: return 'border-gray-500 bg-gray-50'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 neural-pattern pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-display">
                <span className="stat-gradient">Live Match Center</span>
              </h1>
              <p className="text-muted-foreground">
                Real-time AI-powered match analysis and insights
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <LiveIndicator />
              <Badge variant="outline" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {Math.floor(matchTime / 60)}'
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Match Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Score Display */}
                <div className="lg:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center flex-1">
                      <h2 className="text-xl font-bold">{match.homeTeam}</h2>
                      <div className="text-4xl font-bold stat-gradient mt-2">{match.homeScore}</div>
                    </div>
                    
                    <div className="text-center px-8">
                      <MatchStatusChip status={match.status} />
                      <div className="text-2xl font-bold mt-2">{Math.floor(matchTime / 60)}'</div>
                      <div className="text-sm text-muted-foreground">
                        {match.date} • {match.kickoffTime}
                      </div>
                    </div>
                    
                    <div className="text-center flex-1">
                      <h2 className="text-xl font-bold">{match.awayTeam}</h2>
                      <div className="text-4xl font-bold stat-gradient mt-2">{match.awayScore}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {match.venue}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {match.attendance.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {match.referee}
                    </div>
                  </div>
                </div>

                {/* Weather & Controls */}
                <div className="space-y-4">
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Weather</span>
                        <span className="text-2xl">{weather.icon}</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Temperature</span>
                          <span>{weather.temperature}°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Wind</span>
                          <span>{weather.windSpeed} km/h</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Humidity</span>
                          <span>{weather.humidity}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Camera className="w-4 h-4 mr-1" />
                      Record
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Live Stats & Events */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Live Statistics */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-accent" />
                    <span>Live Statistics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(liveStats).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <div className="flex space-x-4">
                          <span className="font-medium">{value.home}</span>
                          <span className="font-medium">{value.away}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="flex-1">
                          <Progress 
                            value={key === 'possession' || key === 'passAccuracy' ? value.home : (value.home / (value.home + value.away)) * 100} 
                            className="h-2" 
                          />
                        </div>
                        <div className="flex-1">
                          <Progress 
                            value={key === 'possession' || key === 'passAccuracy' ? value.away : (value.away / (value.home + value.away)) * 100} 
                            className="h-2 rotate-180" 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Match Events Timeline */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-accent" />
                    <span>Match Events</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {events.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center space-x-4 p-3 rounded-lg ${
                          event.team === 'home' ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-red-50 border-l-4 border-red-500'
                        }`}
                      >
                        <div className="text-2xl">{getEventIcon(event.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{event.minute}'</span>
                            <span className="font-semibold">{event.player}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Heat Map */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-accent" />
                    <span>Attack Heat Map</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {heatmapData.map((zone, index) => (
                      <div key={zone.zone} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{zone.zone}</span>
                          <span className="text-sm">{zone.intensity}%</span>
                        </div>
                        <div className="relative h-8 bg-muted rounded-lg overflow-hidden">
                          <motion.div
                            className={`h-full ${zone.color} opacity-70`}
                            initial={{ width: 0 }}
                            animate={{ width: `${zone.intensity}%` }}
                            transition={{ delay: index * 0.2, duration: 1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - AI Insights */}
          <div className="space-y-6">
            
            {/* AI Prediction */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-accent" />
                    <span>AI Match Prediction</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <ConfidenceRing confidence={78} size={120} />
                  <div className="mt-4">
                    <p className="text-sm font-medium">Win Probability</p>
                    <p className="text-xs text-muted-foreground">
                      Based on current performance metrics and historical data
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Insights */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    <span>AI Tactical Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border-l-4 ${getPriorityColor(insight.priority)}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm">{insight.title}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {insight.confidence}%
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{insight.description}</p>
                      <div className="mt-2">
                        <Progress value={insight.confidence} className="h-1" />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-accent" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Mic className="w-4 h-4 mr-2" />
                    Voice Note
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Camera className="w-4 h-4 mr-2" />
                    Capture Moment
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Report Incident
                  </Button>
                  <Button className="w-full justify-start sky-gradient text-white">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Highlights
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}