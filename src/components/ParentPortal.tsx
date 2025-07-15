import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, Calendar, MessageSquare, Camera, Download,
  Bell, Heart, TrendingUp, Clock, MapPin, Star,
  Phone, Mail, AlertTriangle, CheckCircle, Info,
  Eye, Share2, Filter, Search, Plus, MoreHorizontal,
  Award, Target, Activity, Zap, Users, Trophy
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { 
  ConfidenceRing, 
  SparkLine,
  LiveIndicator
} from './icons/SkyIcons'

interface PlayerChild {
  id: string
  name: string
  age: number
  position: string
  avatar?: string
  teamName: string
  jerseyNumber: number
  joinDate: string
  status: 'active' | 'injured' | 'suspended'
}

interface ProgressReport {
  id: string
  date: string
  period: string
  overallRating: number
  improvements: {
    technical: number
    tactical: number
    physical: number
    psychological: number
  }
  strengths: string[]
  areasForImprovement: string[]
  coachComments: string
  nextGoals: string[]
  attendanceRate: number
}

interface UpcomingEvent {
  id: string
  type: 'match' | 'training' | 'meeting' | 'tournament'
  title: string
  date: string
  time: string
  location: string
  description: string
  requiresResponse: boolean
  transportNeeded?: boolean
}

interface Communication {
  id: string
  from: string
  fromRole: 'coach' | 'manager' | 'parent' | 'admin'
  subject: string
  message: string
  date: string
  priority: 'low' | 'medium' | 'high'
  read: boolean
  attachments?: string[]
}

interface MediaItem {
  id: string
  type: 'photo' | 'video'
  title: string
  date: string
  event: string
  thumbnail: string
  url: string
  featured: boolean
}

export function ParentPortal() {
  const [selectedChild, setSelectedChild] = useState<PlayerChild | null>(null)
  const [selectedTab, setSelectedTab] = useState('overview')
  const [notifications, setNotifications] = useState(3)
  const [newMessage, setNewMessage] = useState('')

  // Mock data
  const children: PlayerChild[] = useMemo(() => [
    {
      id: '1',
      name: 'Jamie Smith',
      age: 16,
      position: 'Midfielder',
      teamName: 'U16 Elite',
      jerseyNumber: 10,
      joinDate: '2023-09-01',
      status: 'active'
    }
  ], [])

  const progressReport: ProgressReport = {
    id: '1',
    date: '2025-07-15',
    period: 'July 2025',
    overallRating: 87,
    improvements: {
      technical: 12,
      tactical: 8,
      physical: 15,
      psychological: 10
    },
    strengths: ['Leadership qualities', 'Passing accuracy', 'Set piece delivery', 'Team communication'],
    areasForImprovement: ['Defensive positioning', 'Physical strength', 'Weak foot development'],
    coachComments: 'Jamie has shown exceptional progress this month, particularly in leadership and technical skills. Their passing accuracy has improved significantly, and they\'re becoming a key player in our tactical setup. We\'re working on defensive positioning and physical development for next season.',
    nextGoals: ['Improve weak foot passing accuracy to 80%', 'Master advanced set piece techniques', 'Develop captain leadership skills'],
    attendanceRate: 95
  }

  const upcomingEvents: UpcomingEvent[] = [
    {
      id: '1',
      type: 'match',
      title: 'vs Arsenal FC Youth',
      date: '2025-07-20',
      time: '15:00',
      location: 'Penhill Stadium',
      description: 'Important league match - please arrive 45 minutes early',
      requiresResponse: true,
      transportNeeded: false
    },
    {
      id: '2',
      type: 'training',
      title: 'Technical Skills Session',
      date: '2025-07-22',
      time: '18:30',
      location: 'Training Ground A',
      description: 'Focus on passing and ball control',
      requiresResponse: false
    },
    {
      id: '3',
      type: 'meeting',
      title: 'Parent-Coach Meeting',
      date: '2025-07-25',
      time: '19:00',
      location: 'Club House',
      description: 'Monthly progress review and season planning',
      requiresResponse: true
    }
  ]

  const communications: Communication[] = [
    {
      id: '1',
      from: 'Coach Michael Johnson',
      fromRole: 'coach',
      subject: 'Excellent Performance vs Chelsea',
      message: 'Jamie played exceptionally well in yesterday\'s match. Their leadership on the field was outstanding, and the winning goal was a perfect example of their improved finishing. Keep up the great work!',
      date: '2025-07-16',
      priority: 'medium',
      read: false
    },
    {
      id: '2',
      from: 'Club Administrator',
      fromRole: 'admin',
      subject: 'Tournament Registration Open',
      message: 'Registration is now open for the Summer Championship. Please confirm Jamie\'s participation by July 25th. Tournament fee is £45.',
      date: '2025-07-15',
      priority: 'high',
      read: true
    },
    {
      id: '3',
      from: 'Team Manager Sarah Wilson',
      fromRole: 'manager',
      subject: 'Training Schedule Update',
      message: 'Due to pitch maintenance, Tuesday\'s training has been moved to the indoor facility. Same time, different location.',
      date: '2025-07-14',
      priority: 'medium',
      read: true
    }
  ]

  const mediaItems: MediaItem[] = [
    {
      id: '1',
      type: 'photo',
      title: 'Goal Celebration vs Chelsea',
      date: '2025-07-15',
      event: 'League Match',
      thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=200&fit=crop',
      url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop',
      featured: true
    },
    {
      id: '2',
      type: 'video',
      title: 'Training Highlights',
      date: '2025-07-12',
      event: 'Technical Training',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      featured: false
    },
    {
      id: '3',
      type: 'photo',
      title: 'Team Photo',
      date: '2025-07-10',
      event: 'Season Start',
      thumbnail: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop',
      url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
      featured: false
    }
  ]

  const quickStats = {
    matchesPlayed: 15,
    goals: 8,
    assists: 12,
    attendanceRate: 95,
    averageRating: 8.7
  }

  useEffect(() => {
    if (children.length > 0) {
      setSelectedChild(children[0])
    }
  }, [children])

  const getEventIcon = (type: UpcomingEvent['type']) => {
    switch (type) {
      case 'match': return Trophy
      case 'training': return Target
      case 'meeting': return Users
      case 'tournament': return Award
      default: return Calendar
    }
  }

  const getPriorityColor = (priority: Communication['priority']) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50'
      case 'medium': return 'border-yellow-500 bg-yellow-50'
      case 'low': return 'border-green-500 bg-green-50'
      default: return 'border-gray-500 bg-gray-50'
    }
  }

  const getStatusColor = (status: PlayerChild['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'injured': return 'bg-red-100 text-red-800'
      case 'suspended': return 'bg-yellow-100 text-yellow-800'
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
                <span className="stat-gradient">Parent Portal</span>
              </h1>
              <p className="text-muted-foreground">
                Stay connected with your child's football journey
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="w-4 h-4" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    {notifications}
                  </Badge>
                )}
              </Button>
              <Button className="sky-gradient text-white">
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact Coach
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Child Selector */}
        {children.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium">Select Child:</span>
                  <div className="flex space-x-2">
                    {children.map((child) => (
                      <Button
                        key={child.id}
                        variant={selectedChild?.id === child.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedChild(child)}
                      >
                        {child.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {selectedChild && (
          <>
            {/* Player Overview Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={selectedChild.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                        {selectedChild.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h2 className="text-2xl font-bold">{selectedChild.name}</h2>
                        <Badge className={getStatusColor(selectedChild.status)}>
                          {selectedChild.status.charAt(0).toUpperCase() + selectedChild.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Position:</span>
                          <div className="font-medium">{selectedChild.position}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Team:</span>
                          <div className="font-medium">{selectedChild.teamName}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Jersey:</span>
                          <div className="font-medium">#{selectedChild.jerseyNumber}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Age:</span>
                          <div className="font-medium">{selectedChild.age} years</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <ConfidenceRing confidence={progressReport.overallRating} size={80} />
                      <div className="mt-2 text-sm text-muted-foreground">Overall Rating</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(quickStats).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="glass-card text-center">
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold stat-gradient">
                          {typeof value === 'number' && key.includes('Rate') ? `${value}%` : value}
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

            {/* Main Content Tabs */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Upcoming Events */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-accent" />
                        <span>Upcoming Events</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {upcomingEvents.slice(0, 3).map((event, index) => {
                        const EventIcon = getEventIcon(event.type)
                        return (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30"
                          >
                            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                              <EventIcon className="w-5 h-5 text-accent" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{event.title}</h4>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span>{new Date(event.date).toLocaleDateString()}</span>
                                <span>{event.time}</span>
                                <span>{event.location}</span>
                              </div>
                            </div>
                            {event.requiresResponse && (
                              <Badge variant="outline" className="text-xs">
                                Response Required
                              </Badge>
                            )}
                          </motion.div>
                        )
                      })}
                    </CardContent>
                  </Card>

                  {/* Recent Communications */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <MessageSquare className="w-5 h-5 text-accent" />
                        <span>Recent Messages</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {communications.slice(0, 3).map((comm, index) => (
                        <motion.div
                          key={comm.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-3 rounded-lg border-l-4 ${getPriorityColor(comm.priority)} ${!comm.read ? 'font-medium' : ''}`}
                        >
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="text-sm font-medium">{comm.subject}</h4>
                            {!comm.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            From: {comm.from} • {new Date(comm.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm line-clamp-2">{comm.message}</p>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="progress" className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-accent" />
                      <span>Monthly Progress Report - {progressReport.period}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    
                    {/* Four Corners Progress */}
                    <div>
                      <h4 className="font-semibold mb-4">Development Areas</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(progressReport.improvements).map(([key, value]) => (
                          <div key={key} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="capitalize text-sm font-medium">{key}</span>
                              <span className="text-sm text-green-600 font-medium">+{value}%</span>
                            </div>
                            <Progress value={70 + value} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Strengths & Areas for Improvement */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          Strengths
                        </h4>
                        <div className="space-y-2">
                          {progressReport.strengths.map((strength, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm">{strength}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Target className="w-5 h-5 text-orange-500 mr-2" />
                          Areas for Improvement
                        </h4>
                        <div className="space-y-2">
                          {progressReport.areasForImprovement.map((area, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <TrendingUp className="w-4 h-4 text-orange-500" />
                              <span className="text-sm">{area}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Coach Comments */}
                    <div>
                      <h4 className="font-semibold mb-3">Coach Comments</h4>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm leading-relaxed">{progressReport.coachComments}</p>
                      </div>
                    </div>

                    {/* Next Goals */}
                    <div>
                      <h4 className="font-semibold mb-3">Next Month's Goals</h4>
                      <div className="space-y-2">
                        {progressReport.nextGoals.map((goal, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-accent rounded-full" />
                            <span className="text-sm">{goal}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-accent" />
                      <span>Upcoming Schedule</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingEvents.map((event, index) => {
                      const EventIcon = getEventIcon(event.type)
                      return (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-lg border hover:shadow-md micro-transition"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                              <EventIcon className="w-6 h-6 text-accent" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold">{event.title}</h4>
                                <Badge variant="outline" className="capitalize">
                                  {event.type}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>{new Date(event.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{event.time}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{event.location}</span>
                                </div>
                                {event.transportNeeded !== undefined && (
                                  <div className="flex items-center space-x-1">
                                    <Info className="w-3 h-3" />
                                    <span>{event.transportNeeded ? 'Transport needed' : 'Own transport'}</span>
                                  </div>
                                )}
                              </div>
                              <p className="text-sm">{event.description}</p>
                              {event.requiresResponse && (
                                <div className="mt-3 flex space-x-2">
                                  <Button size="sm" className="sky-gradient text-white">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Confirm Attendance
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    Can't Attend
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="messages" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Messages List */}
                  <div className="lg:col-span-2">
                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>Communications</span>
                          <Button size="sm" className="sky-gradient text-white">
                            <Plus className="w-4 h-4 mr-1" />
                            New Message
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {communications.map((comm, index) => (
                          <motion.div
                            key={comm.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-4 rounded-lg border-l-4 cursor-pointer hover:shadow-md micro-transition ${
                              getPriorityColor(comm.priority)
                            } ${!comm.read ? 'bg-blue-50/50' : ''}`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-medium">{comm.subject}</h4>
                                {!comm.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                )}
                              </div>
                              <Badge variant="outline" className="text-xs capitalize">
                                {comm.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              From: {comm.from} • {new Date(comm.date).toLocaleDateString()}
                            </p>
                            <p className="text-sm line-clamp-3">{comm.message}</p>
                            {comm.attachments && comm.attachments.length > 0 && (
                              <div className="mt-2 flex items-center space-x-1 text-xs text-muted-foreground">
                                <Download className="w-3 h-3" />
                                <span>{comm.attachments.length} attachment(s)</span>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Quick Contact */}
                  <div>
                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle>Quick Contact</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <Button className="w-full justify-start" variant="outline">
                            <Phone className="w-4 h-4 mr-2" />
                            Call Coach
                          </Button>
                          <Button className="w-full justify-start" variant="outline">
                            <Mail className="w-4 h-4 mr-2" />
                            Email Manager
                          </Button>
                          <Button className="w-full justify-start" variant="outline">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Team Chat
                          </Button>
                        </div>
                        
                        <div className="pt-4 border-t">
                          <h4 className="font-medium mb-3">Send Quick Message</h4>
                          <Textarea
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="mb-3"
                          />
                          <Button className="w-full sky-gradient text-white">
                            Send Message
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="media" className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Camera className="w-5 h-5 text-accent" />
                      <span>Photos & Videos</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {mediaItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative group cursor-pointer"
                        >
                          <div className="aspect-video rounded-lg overflow-hidden">
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {item.type === 'video' && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                                  <Play className="w-6 h-6 text-white ml-1" />
                                </div>
                              </div>
                            )}
                            {item.featured && (
                              <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
                                <Star className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                          <div className="mt-2">
                            <h4 className="font-medium text-sm">{item.title}</h4>
                            <p className="text-xs text-muted-foreground">
                              {item.event} • {new Date(item.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="secondary" className="w-8 h-8">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Full Size
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="w-4 h-4 mr-2" />
                                  Share
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  )
}