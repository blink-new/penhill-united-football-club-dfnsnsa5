import { motion } from 'framer-motion'
import { Calendar, Users, Dumbbell, Trophy, BarChart3, Brain, Zap, Target } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'

export function QuickAccessGrid() {
  const quickActions = [
    {
      icon: Calendar,
      title: 'Smart Schedule',
      description: 'AI-optimized match calendar',
      color: 'from-blue-500 to-cyan-500',
      href: '#schedule',
      badge: 'Live'
    },
    {
      icon: Users,
      title: 'Team Analytics',
      description: 'Player performance insights',
      color: 'from-purple-500 to-pink-500',
      href: '#teams',
      badge: 'Updated'
    },
    {
      icon: Dumbbell,
      title: 'Neural Training',
      description: 'AI-powered workout plans',
      color: 'from-green-500 to-emerald-500',
      href: '#training',
      badge: 'New'
    },
    {
      icon: Trophy,
      title: 'Victory Predictor',
      description: 'Match outcome forecasting',
      color: 'from-yellow-500 to-orange-500',
      href: '#events',
      badge: '85% Accuracy'
    },
    {
      icon: BarChart3,
      title: 'Performance Metrics',
      description: 'Real-time statistics dashboard',
      color: 'from-red-500 to-rose-500',
      href: '#stats',
      badge: 'Real-time'
    },
    {
      icon: Brain,
      title: 'Tactical AI',
      description: 'Strategic game analysis',
      color: 'from-indigo-500 to-purple-500',
      href: '#tactics',
      badge: 'Beta'
    },
    {
      icon: Zap,
      title: 'Energy Monitor',
      description: 'Player fitness tracking',
      color: 'from-cyan-500 to-blue-500',
      href: '#fitness',
      badge: 'Live'
    },
    {
      icon: Target,
      title: 'Goal Optimizer',
      description: 'Scoring opportunity analysis',
      color: 'from-orange-500 to-red-500',
      href: '#goals',
      badge: 'Pro'
    }
  ]

  return (
    <section className="py-20 neural-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
            <Brain className="w-3 h-3 mr-1" />
            Intelligent Dashboard
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI-Powered <span className="text-accent">Quick Access</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access advanced football intelligence tools designed to give you unprecedented 
            insights into every aspect of the game.
          </p>
        </motion.div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {quickActions.map((action, index) => (
            <motion.a
              key={action.title}
              href={action.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { type: 'spring', stiffness: 300 }
              }}
              whileTap={{ scale: 0.95 }}
              className="block"
            >
              <Card className="ai-border hover:ai-glow transition-all duration-300 h-full relative overflow-hidden group">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <CardContent className="p-4 md:p-6 text-center relative z-10">
                  {/* Badge */}
                  <div className="absolute top-2 right-2">
                    <Badge 
                      variant="secondary" 
                      className="text-xs bg-accent/10 text-accent border-accent/20"
                    >
                      {action.badge}
                    </Badge>
                  </div>

                  {/* Icon */}
                  <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-sm md:text-base mb-1 md:mb-2 group-hover:text-accent transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-tight">
                    {action.description}
                  </p>

                  {/* Hover Effect Indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </div>

        {/* AI Status Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Card className="ai-border max-w-md mx-auto">
            <CardContent className="p-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">AI Systems Online</span>
                <Badge variant="secondary" className="text-xs">
                  99.9% Uptime
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                All neural networks operational and processing real-time data
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}