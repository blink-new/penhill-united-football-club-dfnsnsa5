import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Users, Trophy, Calendar, TrendingUp, Zap } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'

export function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 14,
    minutes: 32,
    seconds: 45
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const stats = [
    { icon: Users, label: 'Active Players', value: '247', change: '+12%' },
    { icon: Trophy, label: 'Trophies Won', value: '18', change: '+3' },
    { icon: Calendar, label: 'Matches Played', value: '156', change: '+8' },
    { icon: TrendingUp, label: 'Win Rate', value: '78%', change: '+5%' }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden neural-pattern">
      {/* Background Video Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-12"
        >
          <Badge className="mb-6 bg-accent/10 text-accent border-accent/20 hover:bg-accent/20">
            <Zap className="w-3 h-3 mr-1" />
            AI-Powered Football Analytics
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Penhill United
            </span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-normal">
              Where Intelligence Meets Football
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Experience the future of football with AI-driven insights, real-time analytics, 
            and intelligent performance tracking that elevates every aspect of the beautiful game.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="ai-gradient text-white hover:scale-105 transition-transform ai-glow">
              <Play className="w-5 h-5 mr-2" />
              Watch Highlights
            </Button>
            <Button size="lg" variant="outline" className="glass-effect hover:scale-105 transition-transform">
              Join the Club
            </Button>
          </div>
        </motion.div>

        {/* Next Match Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <Card className="ai-border max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-center">Next Match vs Arsenal FC</h3>
              <div className="grid grid-cols-4 gap-4 text-center">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="space-y-1">
                    <div className="text-2xl md:text-3xl font-bold text-accent">
                      {value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">
                      {unit}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className="ai-border hover:ai-glow transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                  <Badge variant="secondary" className="text-xs">
                    {stat.change}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}