import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, Search, Filter, Plus, MoreHorizontal, 
  User, Calendar, Trophy, Target, Brain, Gauge, 
  Heart, TrendingUp, AlertTriangle, CheckCircle,
  Edit, Trash2, Eye, Star, Award, Activity
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

interface Player {
  id: string
  name: string
  age: number
  position: string
  avatar?: string
  status: 'active' | 'injured' | 'suspended'
  fourCorners: {
    technical: number
    tactical: number
    physical: number
    psychological: number
  }
  stats: {
    appearances: number
    goals: number
    assists: number
    yellowCards: number
    redCards: number
  }
  development: {
    strengths: string[]
    areasForImprovement: string[]
    nextMilestone: string
  }
  attendance: number
  parentContact: string
  medicalNotes?: string
  joinDate: string
}

export function TeamManagement() {
  const [players, setPlayers] = useState<Player[]>([
    {
      id: '1',
      name: 'Jamie Smith',
      age: 16,
      position: 'Midfielder',
      status: 'active',
      fourCorners: { technical: 85, tactical: 78, physical: 82, psychological: 90 },
      stats: { appearances: 15, goals: 8, assists: 12, yellowCards: 2, redCards: 0 },
      development: {
        strengths: ['Passing accuracy', 'Leadership', 'Set pieces'],
        areasForImprovement: ['Defensive positioning', 'Physical strength'],
        nextMilestone: 'Captain material - leadership development'
      },
      attendance: 95,
      parentContact: 'sarah.smith@email.com',
      joinDate: '2023-09-01'
    },
    {
      id: '2',
      name: 'Alex Johnson',
      age: 15,
      position: 'Forward',
      status: 'injured',
      fourCorners: { technical: 88, tactical: 72, physical: 85, psychological: 75 },
      stats: { appearances: 12, goals: 15, assists: 6, yellowCards: 1, redCards: 0 },
      development: {
        strengths: ['Finishing', 'Pace', 'Movement in box'],
        areasForImprovement: ['Tactical awareness', 'Team play'],
        nextMilestone: 'Return from injury - fitness assessment'
      },
      attendance: 88,
      parentContact: 'mike.johnson@email.com',
      medicalNotes: 'Ankle sprain - expected return 2 weeks',
      joinDate: '2023-08-15'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      age: 16,
      position: 'Defender',
      status: 'active',
      fourCorners: { technical: 75, tactical: 92, physical: 88, psychological: 85 },
      stats: { appearances: 16, goals: 2, assists: 4, yellowCards: 3, redCards: 0 },
      development: {
        strengths: ['Defensive positioning', 'Aerial ability', 'Communication'],
        areasForImprovement: ['Ball distribution', 'Pace'],
        nextMilestone: 'Vice-captain consideration'
      },
      attendance: 98,
      parentContact: 'lisa.wilson@email.com',
      joinDate: '2023-07-20'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPosition, setSelectedPosition] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false)

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPosition = selectedPosition === 'all' || player.position === selectedPosition
    const matchesStatus = selectedStatus === 'all' || player.status === selectedStatus
    return matchesSearch && matchesPosition && matchesStatus
  })

  const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward']
  const statuses = ['active', 'injured', 'suspended']

  const fourCornersConfig = [
    { key: 'technical', label: 'Technical', icon: Target, color: 'bg-blue-500' },
    { key: 'tactical', label: 'Tactical', icon: Brain, color: 'bg-green-500' },
    { key: 'physical', label: 'Physical', icon: Gauge, color: 'bg-red-500' },
    { key: 'psychological', label: 'Psychological', icon: Heart, color: 'bg-purple-500' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'injured': return 'bg-red-100 text-red-800 border-red-200'
      case 'suspended': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getOverallRating = (fourCorners: Player['fourCorners']) => {
    return Math.round((fourCorners.technical + fourCorners.tactical + fourCorners.physical + fourCorners.psychological) / 4)
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Team Management</h1>
              <p className="text-muted-foreground mt-1">
                Manage players, track development, and monitor performance
              </p>
            </div>
            <Dialog open={isAddPlayerOpen} onOpenChange={setIsAddPlayerOpen}>
              <DialogTrigger asChild>
                <Button style={{ backgroundColor: 'hsl(var(--primary))' }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Player
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Player</DialogTitle>
                  <DialogDescription>
                    Enter player details and initial assessment
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter player name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" placeholder="16" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map(pos => (
                          <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parent">Parent Contact</Label>
                    <Input id="parent" placeholder="parent@email.com" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="notes">Initial Notes</Label>
                    <Textarea id="notes" placeholder="Initial assessment and notes..." />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddPlayerOpen(false)}>
                    Cancel
                  </Button>
                  <Button style={{ backgroundColor: 'hsl(var(--primary))' }}>
                    Add Player
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search players..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Positions</SelectItem>
                    {positions.map(pos => (
                      <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={player.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {player.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{player.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {player.position} • Age {player.age}
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedPlayer(player)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Player
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove Player
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <Badge className={getStatusColor(player.status)}>
                      {player.status.charAt(0).toUpperCase() + player.status.slice(1)}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{getOverallRating(player.fourCorners)}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Four Corners Mini Display */}
                  <div className="grid grid-cols-2 gap-2">
                    {fourCornersConfig.map(corner => (
                      <div key={corner.key} className="flex items-center space-x-2">
                        <div className={`w-6 h-6 ${corner.color} rounded flex items-center justify-center`}>
                          <corner.icon className="w-3 h-3 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{corner.label}</span>
                            <span className="text-xs font-medium">
                              {player.fourCorners[corner.key as keyof Player['fourCorners']]}%
                            </span>
                          </div>
                          <Progress 
                            value={player.fourCorners[corner.key as keyof Player['fourCorners']]} 
                            className="h-1 mt-1" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-lg font-bold">{player.stats.goals}</p>
                      <p className="text-xs text-muted-foreground">Goals</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{player.stats.assists}</p>
                      <p className="text-xs text-muted-foreground">Assists</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{player.attendance}%</p>
                      <p className="text-xs text-muted-foreground">Attendance</p>
                    </div>
                  </div>

                  {/* Medical Alert */}
                  {player.medicalNotes && (
                    <div className="flex items-center space-x-2 p-2 bg-red-50 border border-red-200 rounded">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <p className="text-xs text-red-700">{player.medicalNotes}</p>
                    </div>
                  )}

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setSelectedPlayer(player)}
                  >
                    View Full Profile
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Player Detail Modal */}
        <Dialog open={!!selectedPlayer} onOpenChange={() => setSelectedPlayer(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedPlayer && (
              <>
                <DialogHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={selectedPlayer.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                        {selectedPlayer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <DialogTitle className="text-2xl">{selectedPlayer.name}</DialogTitle>
                      <DialogDescription>
                        {selectedPlayer.position} • Age {selectedPlayer.age} • Joined {new Date(selectedPlayer.joinDate).toLocaleDateString()}
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>

                <Tabs defaultValue="overview" className="mt-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="development">Development</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="medical">Medical</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    {/* Four Corners Detailed */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Four Corners Assessment</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-6">
                          {fourCornersConfig.map(corner => (
                            <div key={corner.key} className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 ${corner.color} rounded-lg flex items-center justify-center`}>
                                  <corner.icon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <h4 className="font-semibold">{corner.label}</h4>
                                  <p className="text-2xl font-bold">
                                    {selectedPlayer.fourCorners[corner.key as keyof Player['fourCorners']]}%
                                  </p>
                                </div>
                              </div>
                              <Progress 
                                value={selectedPlayer.fourCorners[corner.key as keyof Player['fourCorners']]} 
                                className="h-3" 
                              />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Season Statistics */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Season Statistics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold">{selectedPlayer.stats.appearances}</p>
                            <p className="text-sm text-muted-foreground">Appearances</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold">{selectedPlayer.stats.goals}</p>
                            <p className="text-sm text-muted-foreground">Goals</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold">{selectedPlayer.stats.assists}</p>
                            <p className="text-sm text-muted-foreground">Assists</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold">{selectedPlayer.stats.yellowCards}</p>
                            <p className="text-sm text-muted-foreground">Yellow Cards</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold">{selectedPlayer.attendance}%</p>
                            <p className="text-sm text-muted-foreground">Attendance</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="development" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Development Plan</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            Strengths
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedPlayer.development.strengths.map((strength, index) => (
                              <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                                {strength}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center">
                            <Target className="w-5 h-5 text-orange-500 mr-2" />
                            Areas for Improvement
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedPlayer.development.areasForImprovement.map((area, index) => (
                              <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 flex items-center">
                            <Trophy className="w-5 h-5 text-blue-500 mr-2" />
                            Next Milestone
                          </h4>
                          <p className="text-muted-foreground">{selectedPlayer.development.nextMilestone}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="performance">
                    <Card>
                      <CardHeader>
                        <CardTitle>Performance Tracking</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">Performance charts and detailed analytics would be displayed here.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="medical">
                    <Card>
                      <CardHeader>
                        <CardTitle>Medical Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <Label>Current Status</Label>
                            <Badge className={getStatusColor(selectedPlayer.status)}>
                              {selectedPlayer.status.charAt(0).toUpperCase() + selectedPlayer.status.slice(1)}
                            </Badge>
                          </div>
                          {selectedPlayer.medicalNotes && (
                            <div>
                              <Label>Medical Notes</Label>
                              <p className="text-sm text-muted-foreground mt-1">{selectedPlayer.medicalNotes}</p>
                            </div>
                          )}
                          <div>
                            <Label>Parent/Guardian Contact</Label>
                            <p className="text-sm text-muted-foreground mt-1">{selectedPlayer.parentContact}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}