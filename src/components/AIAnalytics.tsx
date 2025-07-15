import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, TrendingUp, Target, Activity, 
  Zap, BarChart3, PieChart, LineChart,
  Users, Trophy, Clock, AlertTriangle,
  ChevronRight, Play, Pause, RotateCcw,
  Sparkles, Eye, Settings
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { 
  AIStatusIcon, 
  ConfidenceRing, 
  SparkLine,
  LiveIndicator,
  ChartIcon
} from './icons/SkyIcons'
import { blink } from '../blink/client'

interface PerformanceMetric {
  id: string
  name: string
  value: number
  trend: 'up' | 'down' | 'stable'
  change: string
  confidence: number
  sparkData: number[]
  color: string
}

interface AIInsight {
  id: string
  type: 'prediction' | 'recommendation' | 'alert' | 'opportunity'
  title: string
  description: string
  confidence: number
  impact: 'high' | 'medium' | 'low'
  actionable: boolean
  timestamp: Date
}

export function AIAnalytics() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d')
  const [selectedModel, setSelectedModel] = useState('gpt-4o-mini')
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([])
  const [analysisProgress, setAnalysisProgress] = useState(0)

  useEffect(() => {
    loadInitialData()
  }, [selectedTimeframe])

  const loadInitialData = async () => {
    // Mock data for demonstration
    const mockMetrics: PerformanceMetric[] = [
      {
        id: '1',
        name: 'Team Performance Index',
        value: 87.5,
        trend: 'up',
        change: '+5.2%',
        confidence: 94,
        sparkData: [75, 78, 82, 85, 83, 87, 89, 88, 87, 90, 88, 87.5],
        color: '#0686E1'
      },
      {
        id: '2',
        name: 'Player Development Rate',
        value: 92.3,
        trend: 'up',
        change: '+8.1%',
        confidence: 89,
        sparkData: [80, 82, 85, 87, 89, 90, 91, 92, 91, 92, 93, 92.3],
        color: '#22C55E'
      },
      {
        id: '3',
        name: 'Injury Risk Assessment',
        value: 23.1,
        trend: 'down',
        change: '-12.4%',
        confidence: 91,
        sparkData: [35, 33, 30, 28, 26, 25, 24, 23, 22, 23, 24, 23.1],
        color: '#F59E0B'
      },
      {
        id: '4',
        name: 'Match Win Probability',
        value: 78.9,
        trend: 'up',
        change: '+3.7%',
        confidence: 86,
        sparkData: [70, 72, 75, 76, 74, 77, 79, 78, 79, 80, 79, 78.9],
        color: '#6B46F6'
      }
    ]

    const mockInsights: AIInsight[] = [
      {
        id: '1',
        type: 'prediction',
        title: 'High Win Probability vs Arsenal Youth',
        description: 'Based on recent performance data and opponent analysis, the team has an 87% probability of winning the upcoming match against Arsenal Youth.',
        confidence: 87,
        impact: 'high',
        actionable: true,
        timestamp: new Date()
      },
      {
        id: '2',
        type: 'recommendation',
        title: 'Optimize Training Schedule',
        description: 'AI suggests reducing high-intensity training by 15% this week to prevent fatigue and optimize performance for the weekend match.',
        confidence: 92,
        impact: 'medium',
        actionable: true,
        timestamp: new Date()
      },
      {
        id: '3',
        type: 'alert',
        title: 'Injury Risk Detected',
        description: 'Player #7 shows elevated injury risk indicators. Recommend immediate assessment and modified training regime.',
        confidence: 94,
        impact: 'high',
        actionable: true,
        timestamp: new Date()
      },
      {
        id: '4',
        type: 'opportunity',
        title: 'Tactical Advantage Identified',
        description: 'Opponent weakness detected in left defensive zone. Recommend focusing attacks on right wing during next match.',
        confidence: 83,
        impact: 'medium',
        actionable: true,
        timestamp: new Date()
      }
    ]

    setMetrics(mockMetrics)
    setInsights(mockInsights)
  }

  const runAIAnalysis = async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate AI analysis with progress updates
    const progressSteps = [
      { step: 'Collecting player data...', progress: 20 },
      { step: 'Analyzing performance patterns...', progress: 40 },
      { step: 'Processing match statistics...', progress: 60 },
      { step: 'Generating predictions...', progress: 80 },
      { step: 'Finalizing insights...', progress: 100 }
    ]

    for (const { step, progress } of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setAnalysisProgress(progress)
    }

    // Generate new AI insights using Blink AI
    try {
      const { text } = await blink.ai.generateText({
        prompt: `As an AI football analytics expert, analyze the current team performance and generate 3 actionable insights for Penhill United FC youth team. Focus on:
        1. Performance optimization opportunities
        2. Injury prevention recommendations  
        3. Tactical improvements for upcoming matches
        
        Format each insight with a clear title and specific recommendation.`,
        model: selectedModel,
        maxTokens: 500
      })

      // Parse AI response and create new insights
      const newInsight: AIInsight = {
        id: Date.now().toString(),
        type: 'recommendation',
        title: 'AI-Generated Insight',
        description: text,
        confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
        impact: 'high',
        actionable: true,
        timestamp: new Date()
      }

      setInsights(prev => [newInsight, ...prev.slice(0, 4)])
    } catch (error) {
      console.error('AI analysis failed:', error)
    }

    setIsAnalyzing(false)
  }

  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'prediction': return Target
      case 'recommendation': return Sparkles
      case 'alert': return AlertTriangle
      case 'opportunity': return TrendingUp
      default: return Brain
    }
  }

  const getInsightColor = (type: AIInsight['type']) => {
    switch (type) {
      case 'prediction': return 'bg-blue-500'
      case 'recommendation': return 'bg-green-500'
      case 'alert': return 'bg-red-500'
      case 'opportunity': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 neural-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-display mb-2">
                <span className="stat-gradient">AI Analytics Hub</span>
              </h1>
              <p className="text-muted-foreground">
                Advanced machine learning insights for performance optimization
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0 flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-500/20 rounded-lg border border-green-500/30">
                <AIStatusIcon className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">AI Model: {selectedModel}</span>
              </div>
              
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* AI Analysis Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-accent" />
                <span>AI Analysis Engine</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">Last 24h</SelectItem>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 90 days</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Badge variant="outline" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    Real-time data
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-3">
                  {isAnalyzing && (
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-muted-foreground">Analyzing...</div>
                      <Progress value={analysisProgress} className="w-32 h-2" />
                    </div>
                  )}
                  
                  <Button
                    onClick={runAIAnalysis}
                    disabled={isAnalyzing}
                    className="sky-gradient text-white hover:opacity-90 micro-transition"
                  >
                    {isAnalyzing ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Run AI Analysis
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="insights" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="insights" className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>AI Insights</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Performance</span>
            </TabsTrigger>
            <TabsTrigger value="predictions" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Predictions</span>
            </TabsTrigger>
            <TabsTrigger value="models" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Models</span>
            </TabsTrigger>
          </TabsList>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Insights List */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-xl font-semibold text-display">Latest AI Insights</h3>
                
                <AnimatePresence>
                  {insights.map((insight, index) => {
                    const IconComponent = getInsightIcon(insight.type)
                    return (
                      <motion.div
                        key={insight.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className="glass-card hover:sky-glow micro-transition">
                          <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                              <div className={`w-10 h-10 ${getInsightColor(insight.type)} rounded-lg flex items-center justify-center`}>
                                <IconComponent className="w-5 h-5 text-white" />
                              </div>
                              
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-semibold text-display">{insight.title}</h4>
                                  <div className="flex items-center space-x-2">
                                    <ConfidenceRing confidence={insight.confidence} size={40} />
                                    <Badge 
                                      variant={insight.impact === 'high' ? 'default' : insight.impact === 'medium' ? 'secondary' : 'outline'}
                                      className="text-xs"
                                    >
                                      {insight.impact.toUpperCase()}
                                    </Badge>
                                  </div>
                                </div>
                                
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                  {insight.description}
                                </p>
                                
                                <div className="flex items-center justify-between pt-2">
                                  <span className="text-xs text-muted-foreground">
                                    {insight.timestamp.toLocaleTimeString()}
                                  </span>
                                  
                                  {insight.actionable && (
                                    <Button size="sm" variant="outline" className="text-xs">
                                      Take Action
                                      <ChevronRight className="w-3 h-3 ml-1" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-display">Quick Stats</h3>
                
                <Card className="glass-card">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-display stat-gradient mb-2">
                      {insights.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Active Insights</div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-display stat-gradient mb-2">
                      {Math.round(insights.reduce((acc, insight) => acc + insight.confidence, 0) / insights.length)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Avg Confidence</div>
                  </CardContent>
                </Card>
                
                <Card className="glass-card">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-display stat-gradient mb-2">
                      {insights.filter(i => i.actionable).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Actionable Items</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="glass-card hover:sky-glow micro-transition">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Activity className="w-8 h-8 text-muted-foreground" />
                        <Badge 
                          variant={metric.trend === 'up' ? 'default' : metric.trend === 'down' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {metric.change}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-3xl font-bold text-display stat-gradient">
                          {metric.value}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {metric.name}
                        </div>
                        <div className="flex items-center justify-between">
                          <SparkLine 
                            data={metric.sparkData} 
                            color={metric.color}
                            className="opacity-80"
                          />
                          <ConfidenceRing confidence={metric.confidence} size={30} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Predictions Tab */}
          <TabsContent value="predictions" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-accent" />
                  <span>Match Outcome Predictions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Advanced Predictions Coming Soon</h3>
                  <p className="text-muted-foreground mb-6">
                    Our AI is learning from your team's performance data to provide accurate match predictions.
                  </p>
                  <Button className="sky-gradient text-white">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Beta Features
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Models Tab */}
          <TabsContent value="models" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-accent" />
                  <span>AI Model Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Primary Analysis Model</label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4o-mini">GPT-4o Mini (Fast, Cost-effective)</SelectItem>
                        <SelectItem value="gpt-4o">GPT-4o (Balanced Performance)</SelectItem>
                        <SelectItem value="claude-3-sonnet">Claude 3 Sonnet (Advanced Reasoning)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600 mb-1">98.7%</div>
                        <div className="text-sm text-muted-foreground">Model Accuracy</div>
                      </CardContent>
                    </Card>
                    <Card className="border">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">1.2s</div>
                        <div className="text-sm text-muted-foreground">Avg Response Time</div>
                      </CardContent>
                    </Card>
                    <Card className="border">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600 mb-1">247</div>
                        <div className="text-sm text-muted-foreground">Analyses Today</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}