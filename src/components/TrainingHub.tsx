import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Dumbbell, Brain, Target, Clock, Users, Play, 
  Pause, RotateCcw, CheckCircle, AlertCircle,
  TrendingUp, Zap, Calendar, MapPin, Thermometer,
  Heart, Activity, Timer, Award, Star, Plus,
  ChevronRight, BarChart3, Eye, Share2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { 
  ConfidenceRing, 
  SparkLine,
  AIStatusIcon
} from './icons/SkyIcons'

interface TrainingDrill {
  id: string
  name: string
  category: 'technical' | 'tactical' | 'physical' | 'psychological'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: number
  participants: number
  equipment: string[]
  description: string
  objectives: string[]
  aiRecommendation: number
  videoUrl?: string
  completionRate: number
}

interface TrainingSession {
  id: string
  date: string
  time: string
  duration: number
  type: 'team' | 'individual' | 'position'
  focus: string[]
  drills: TrainingDrill[]
  attendance: number
  weather: string
  intensity: number
  aiOptimized: boolean
}

interface PlayerProgress {
  playerId: string
  playerName: string
  avatar?: string
  improvements: {
    technical: number
    tactical: number
    physical: number
    psychological: number
  }
  weeklyGoals: string[]
  completedGoals: string[]
  nextMilestone: string
}

export function TrainingHub() {
  const [selectedSession, setSelectedSession] = useState<TrainingSession | null>(null)
  const [activeTimer, setActiveTimer] = useState<number>(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [selectedDrill, setSelectedDrill] = useState<TrainingDrill | null>(null)

  // Mock training data
  const upcomingSessions: TrainingSession[] = [
    {
      id: '1',
      date: '2025-07-21',
      time: '16:00',
      duration: 90,
      type: 'team',
      focus: ['Passing', 'Movement', 'Finishing'],
      drills: [],
      attendance: 18,
      weather: 'Sunny, 22°C',
      intensity: 85,
      aiOptimized: true
    },
    {
      id: '2',
      date: '2025-07-23',
      time: '18:30',
      duration: 60,
      type: 'position',
      focus: ['Defensive Shape', 'Set Pieces'],
      drills: [],
      attendance: 8,
      weather: 'Cloudy, 19°C',
      intensity: 70,
      aiOptimized: true
    }
  ]

  const aiRecommendedDrills: TrainingDrill[] = [
    {
      id: '1',
      name: 'Neural Passing Patterns',
      category: 'technical',
      difficulty: 'intermediate',
      duration: 20,
      participants: 12,
      equipment: ['Cones', 'Balls', 'Bibs'],
      description: 'AI-optimized passing drill that adapts to player skill levels and improves decision-making under pressure.',
      objectives: ['Improve passing accuracy', 'Enhance spatial awareness', 'Develop quick decision making'],
      aiRecommendation: 94,
      completionRate: 87,
      videoUrl: 'https://example.com/drill1'
    },
    {
      id: '2',
      name: 'Tactical Positioning Matrix',
      category: 'tactical',
      difficulty: 'advanced',
      duration: 25,
      participants: 11,
      equipment: ['Cones', 'Bibs', 'Goals'],
      description: 'Dynamic positioning drill using AI analysis to optimize player movement and team shape.',
      objectives: ['Master positional play', 'Improve team coordination', 'Enhance tactical understanding'],
      aiRecommendation: 91,
      completionRate: 78,
      videoUrl: 'https://example.com/drill2'
    },
    {
      id: '3',
      name: 'Explosive Sprint Intervals',
      category: 'physical',
      difficulty: 'intermediate',
      duration: 15,
      participants: 20,
      equipment: ['Cones', 'Stopwatch', 'Heart Rate Monitors'],
      description: 'High-intensity interval training designed to improve acceleration and top speed.',
      objectives: ['Increase sprint speed', 'Improve acceleration', 'Build anaerobic capacity'],
      aiRecommendation: 88,
      completionRate: 92,
      videoUrl: 'https://example.com/drill3'
    },
    {
      id: '4',
      name: 'Mindfulness & Focus Training',
      category: 'psychological',
      difficulty: 'beginner',
      duration: 10,
      participants: 22,
      equipment: ['Mats', 'Audio System'],
      description: 'Mental preparation techniques to improve concentration and reduce performance anxiety.',
      objectives: ['Enhance focus', 'Reduce anxiety', 'Improve mental resilience'],
      aiRecommendation: 85,
      completionRate: 95,
      videoUrl: 'https://example.com/drill4'
    }
  ]

  const playerProgress: PlayerProgress[] = [
    {
      playerId: '1',
      playerName: 'Jamie Smith',
      improvements: { technical: 12, tactical: 8, physical: 15, psychological: 10 },
      weeklyGoals: ['Improve weak foot passing', 'Master corner kick delivery', 'Increase sprint speed'],
      completedGoals: ['Improve weak foot passing'],
      nextMilestone: 'Captain leadership assessment'
    },
    {
      playerId: '2',
      playerName: 'Alex Johnson',
      improvements: { technical: 18, tactical: 5, physical: 22, psychological: 7 },
      weeklyGoals: ['Return to full fitness', 'Tactical awareness drills', 'Team communication'],
      completedGoals: [],
      nextMilestone: 'Medical clearance for full training'
    },
    {
      playerId: '3',
      playerName: 'Emma Wilson',
      improvements: { technical: 9, tactical: 20, physical: 11, psychological: 14 },
      weeklyGoals: ['Long ball accuracy', 'Leadership in defense', 'Set piece coordination'],
      completedGoals: ['Leadership in defense', 'Set piece coordination'],
      nextMilestone: 'Vice-captain trial period'
    }
  ]

  const trainingStats = {
    weeklyHours: 8.5,
    completionRate: 89,
    averageIntensity: 82,
    aiOptimization: 94,
    playerSatisfaction: 91
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning) {
      interval = setInterval(() => {
        setActiveTimer(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getCategoryColor = (category: TrainingDrill['category']) => {
    switch (category) {
      case 'technical': return 'bg-blue-500'
      case 'tactical': return 'bg-green-500'
      case 'physical': return 'bg-red-500'
      case 'psychological': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  const getDifficultyColor = (difficulty: TrainingDrill['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
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
                <span className="stat-gradient">AI Training Hub</span>
              </h1>
              <p className="text-muted-foreground">
                Intelligent training programs powered by machine learning
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-500/20 rounded-lg border border-green-500/30">
                <AIStatusIcon className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">AI Optimized</span>
              </div>
              <Badge variant="outline" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {formatTime(activeTimer)}
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Training Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(trainingStats).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card text-center">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold stat-gradient">
                      {typeof value === 'number' ? (key === 'weeklyHours' ? `${value}h` : `${value}%`) : value}
                    </div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Sessions & Drills */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Upcoming Sessions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-accent" />
                    <span>Upcoming Sessions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingSessions.map((session, index) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 micro-transition cursor-pointer"
                      onClick={() => setSelectedSession(session)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={getDifficultyColor('intermediate')}>
                            {session.type.toUpperCase()}
                          </Badge>
                          {session.aiOptimized && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              <Brain className="w-3 h-3 mr-1" />
                              AI Optimized
                            </Badge>
                          )}
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="flex items-center space-x-1 mb-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(session.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{session.time} ({session.duration}min)</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center space-x-1 mb-1">
                            <Users className="w-3 h-3" />
                            <span>{session.attendance} players</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Thermometer className="w-3 h-3" />
                            <span>{session.weather}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Focus Areas</span>
                          <span className="text-xs font-medium">Intensity: {session.intensity}%</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {session.focus.map((focus, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {focus}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Recommended Drills */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-accent" />
                    <span>AI Recommended Drills</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {aiRecommendedDrills.map((drill, index) => (
                      <motion.div
                        key={drill.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-lg border hover:shadow-md micro-transition cursor-pointer"
                        onClick={() => setSelectedDrill(drill)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className={`w-10 h-10 ${getCategoryColor(drill.category)} rounded-lg flex items-center justify-center`}>
                            {drill.category === 'technical' && <Target className="w-5 h-5 text-white" />}
                            {drill.category === 'tactical' && <Brain className="w-5 h-5 text-white" />}
                            {drill.category === 'physical' && <Dumbbell className="w-5 h-5 text-white" />}
                            {drill.category === 'psychological' && <Heart className="w-5 h-5 text-white" />}
                          </div>
                          <div className="text-right">
                            <ConfidenceRing confidence={drill.aiRecommendation} size={40} />
                          </div>
                        </div>
                        
                        <h4 className="font-semibold mb-2">{drill.name}</h4>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {drill.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-2">
                            <Badge className={getDifficultyColor(drill.difficulty)}>
                              {drill.difficulty}
                            </Badge>
                            <span className="text-muted-foreground">{drill.duration}min</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{drill.participants}</span>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">Completion Rate</span>
                            <span className="text-xs font-medium">{drill.completionRate}%</span>
                          </div>
                          <Progress value={drill.completionRate} className="h-1" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Timer & Progress */}
          <div className="space-y-6">
            
            {/* Training Timer */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Timer className="w-5 h-5 text-accent" />
                    <span>Session Timer</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold stat-gradient mb-4">
                    {formatTime(activeTimer)}
                  </div>
                  <div className="flex justify-center space-x-2 mb-4">
                    <Button
                      size="sm"
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className={isTimerRunning ? 'bg-red-500 hover:bg-red-600' : 'sky-gradient'}
                    >
                      {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setActiveTimer(0)
                        setIsTimerRunning(false)
                      }}
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Track drill duration and intensity
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Player Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    <span>Player Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {playerProgress.slice(0, 3).map((player, index) => (
                    <motion.div
                      key={player.playerId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 rounded-lg bg-muted/30"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={player.avatar} />
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {player.playerName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{player.playerName}</h4>
                          <p className="text-xs text-muted-foreground">{player.nextMilestone}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {Object.entries(player.improvements).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <span className="capitalize">{key}</span>
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="w-3 h-3 text-green-500" />
                              <span className="font-medium">+{value}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Weekly Goals</span>
                          <span className="text-xs">{player.completedGoals.length}/{player.weeklyGoals.length}</span>
                        </div>
                        <Progress 
                          value={(player.completedGoals.length / player.weeklyGoals.length) * 100} 
                          className="h-1" 
                        />
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
                    <Plus className="w-4 h-4 mr-2" />
                    Create Custom Drill
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Session Replay
                  </Button>
                  <Button className="w-full justify-start sky-gradient text-white">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Progress
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Drill Detail Modal */}
        <Dialog open={!!selectedDrill} onOpenChange={() => setSelectedDrill(null)}>
          <DialogContent className="max-w-2xl">
            {selectedDrill && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${getCategoryColor(selectedDrill.category)} rounded-lg flex items-center justify-center`}>
                      {selectedDrill.category === 'technical' && <Target className="w-6 h-6 text-white" />}
                      {selectedDrill.category === 'tactical' && <Brain className="w-6 h-6 text-white" />}
                      {selectedDrill.category === 'physical' && <Dumbbell className="w-6 h-6 text-white" />}
                      {selectedDrill.category === 'psychological' && <Heart className="w-6 h-6 text-white" />}
                    </div>
                    <div>
                      <h3 className="text-xl">{selectedDrill.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getDifficultyColor(selectedDrill.difficulty)}>
                          {selectedDrill.difficulty}
                        </Badge>
                        <Badge variant="secondary">
                          {selectedDrill.category}
                        </Badge>
                      </div>
                    </div>
                  </DialogTitle>
                  <DialogDescription>
                    {selectedDrill.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">{selectedDrill.duration}</div>
                      <div className="text-sm text-muted-foreground">Minutes</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{selectedDrill.participants}</div>
                      <div className="text-sm text-muted-foreground">Players</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{selectedDrill.aiRecommendation}%</div>
                      <div className="text-sm text-muted-foreground">AI Score</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Objectives</h4>
                    <ul className="space-y-1">
                      {selectedDrill.objectives.map((objective, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Equipment Needed</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDrill.equipment.map((item, index) => (
                        <Badge key={index} variant="outline">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1 sky-gradient text-white">
                      <Play className="w-4 h-4 mr-2" />
                      Start Drill
                    </Button>
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Watch Video
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}