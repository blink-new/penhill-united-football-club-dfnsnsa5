import { motion } from 'framer-motion'
import { TrendingUp, Award, Target, Zap, Brain, Activity } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'

export function PerformanceSection() {
  const teamStats = [
    { name: 'Marcus Johnson', position: 'Forward', goals: 23, assists: 12, rating: 8.7, trend: '+0.3' },
    { name: 'Alex Rodriguez', position: 'Midfielder', goals: 8, assists: 19, rating: 8.4, trend: '+0.1' },
    { name: 'David Chen', position: 'Defender', goals: 3, assists: 7, rating: 8.2, trend: '+0.5' },
    { name: 'James Wilson', position: 'Goalkeeper', saves: 89, cleanSheets: 12, rating: 8.9, trend: '+0.2' }
  ]

  const standings = [
    { position: 1, team: 'Penhill United', played: 28, won: 22, drawn: 4, lost: 2, points: 70, form: ['W', 'W', 'W', 'D', 'W'] },
    { position: 2, team: 'Arsenal FC', played: 28, won: 20, drawn: 5, lost: 3, points: 65, form: ['W', 'L', 'W', 'W', 'D'] },
    { position: 3, team: 'Manchester City', played: 28, won: 19, drawn: 6, lost: 3, points: 63, form: ['D', 'W', 'W', 'L', 'W'] },
    { position: 4, team: 'Liverpool FC', played: 28, won: 18, drawn: 7, lost: 3, points: 61, form: ['W', 'W', 'D', 'W', 'W'] }
  ]

  const aiInsights = [
    {
      title: 'Optimal Formation Detected',
      description: 'AI recommends 4-3-3 formation for next match based on opponent analysis',
      confidence: 94,
      icon: Brain,
      color: 'text-blue-500'
    },
    {
      title: 'Player Fatigue Alert',
      description: 'Marcus Johnson showing signs of fatigue - recommend rotation',
      confidence: 87,
      icon: Activity,
      color: 'text-orange-500'
    },
    {
      title: 'Scoring Opportunity',
      description: 'Left wing attacks 40% more effective against upcoming opponent',
      confidence: 91,
      icon: Target,
      color: 'text-green-500'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
            <TrendingUp className="w-3 h-3 mr-1" />
            Performance Analytics
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Club <span className="text-accent">Intelligence</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Advanced AI analytics provide deep insights into team performance, 
            player statistics, and strategic opportunities.
          </p>
        </motion.div>

        {/* Performance Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="results" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted/50">
              <TabsTrigger value="results" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                Match Results
              </TabsTrigger>
              <TabsTrigger value="standings" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                League Table
              </TabsTrigger>
              <TabsTrigger value="insights" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                AI Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="results" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Top Performers */}
                <Card className="ai-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-accent" />
                      Top Performers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {teamStats.map((player, index) => (
                      <motion.div
                        key={player.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div>
                          <div className="font-medium">{player.name}</div>
                          <div className="text-sm text-muted-foreground">{player.position}</div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-accent">{player.rating}</span>
                            <Badge variant="secondary" className="text-xs">
                              {player.trend}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {player.goals !== undefined && `${player.goals}G`}
                            {player.assists !== undefined && ` ${player.assists}A`}
                            {player.saves !== undefined && `${player.saves} Saves`}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* Performance Metrics */}
                <Card className="ai-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-accent" />
                      Team Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Attack Efficiency</span>
                        <span className="text-sm text-accent">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Defense Stability</span>
                        <span className="text-sm text-accent">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Possession Control</span>
                        <span className="text-sm text-accent">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">AI Prediction Accuracy</span>
                        <span className="text-sm text-accent">94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="standings">
              <Card className="ai-border">
                <CardHeader>
                  <CardTitle>Premier League Table</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {standings.map((team, index) => (
                      <motion.div
                        key={team.team}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                          team.position === 1 
                            ? 'bg-accent/10 border border-accent/20' 
                            : 'bg-muted/30 hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            team.position === 1 ? 'bg-accent text-accent-foreground' : 'bg-muted'
                          }`}>
                            {team.position}
                          </div>
                          <div>
                            <div className="font-medium">{team.team}</div>
                            <div className="text-sm text-muted-foreground">
                              P{team.played} W{team.won} D{team.drawn} L{team.lost}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex gap-1">
                            {team.form.map((result, i) => (
                              <div
                                key={i}
                                className={`w-5 h-5 rounded-full text-xs flex items-center justify-center text-white ${
                                  result === 'W' ? 'bg-green-500' : 
                                  result === 'D' ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                              >
                                {result}
                              </div>
                            ))}
                          </div>
                          <div className="font-bold text-lg">{team.points}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights">
              <div className="grid gap-6">
                {aiInsights.map((insight, index) => (
                  <motion.div
                    key={insight.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="ai-border hover:ai-glow transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg bg-muted/50 ${insight.color}`}>
                            <insight.icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">{insight.title}</h3>
                            <p className="text-muted-foreground mb-3">{insight.description}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">Confidence:</span>
                              <Progress value={insight.confidence} className="flex-1 h-2" />
                              <span className="text-sm font-bold text-accent">{insight.confidence}%</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}