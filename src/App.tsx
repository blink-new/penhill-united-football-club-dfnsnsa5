import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Zap } from 'lucide-react'
import { blink } from './blink/client'
import { Header } from './components/Header'
import { Dashboard } from './components/Dashboard'
import { TeamManagement } from './components/TeamManagement'
import { MatchCenter } from './components/MatchCenter'
import { TrainingHub } from './components/TrainingHub'
import { ParentPortal } from './components/ParentPortal'
import { AIAnalytics } from './components/AIAnalytics'
import { FinancialCenter } from './components/FinancialCenter'
import { Footer } from './components/Footer'
import { ShieldGradientIcon } from './components/icons/SkyIcons'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showSplash, setShowSplash] = useState(true)
  const [currentPage, setCurrentPage] = useState('dashboard')

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    // Show splash screen for 2.5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return (
      <div className="min-h-screen header-surface flex items-center justify-center neural-pattern">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          <motion.div
            className="mx-auto mb-8"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            }}
          >
            <ShieldGradientIcon size={96} className="drop-shadow-2xl" />
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-3 text-display"
          >
            Penhill United FC
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-white/80 mb-8 text-lg"
          >
            AI-Powered Football Intelligence
          </motion.p>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="flex items-center justify-center space-x-3"
          >
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 neural-pattern flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6">
            <ShieldGradientIcon size={80} className="drop-shadow-lg" />
          </div>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
            <span className="text-muted-foreground font-medium">Initializing AI systems...</span>
          </div>
          <div className="w-48 h-1 bg-muted rounded-full overflow-hidden mx-auto">
            <motion.div 
              className="h-full sky-gradient"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 neural-pattern flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="mb-8">
            <ShieldGradientIcon size={96} className="mx-auto drop-shadow-2xl" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-display">
            Welcome to <span className="stat-gradient">Penhill United</span>
          </h1>
          
          <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
            Experience the future of football with AI-powered analytics, 
            real-time insights, and intelligent performance tracking.
          </p>
          
          <motion.button
            onClick={() => blink.auth.login()}
            className="w-full py-4 px-8 sky-gradient text-white rounded-xl font-semibold text-lg hover:scale-105 micro-transition sky-glow elevation-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Sign In to Continue</span>
            </div>
          </motion.button>
          
          <p className="text-sm text-muted-foreground mt-6">
            Join the AI revolution in football
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen"
      >
        <Header user={user} currentPage={currentPage} onPageChange={setCurrentPage} />
        
        <main>
          {currentPage === 'dashboard' && <Dashboard onPageChange={setCurrentPage} />}
          {currentPage === 'teams' && <TeamManagement />}
          {currentPage === 'match-center' && <MatchCenter />}
          {currentPage === 'training' && <TrainingHub />}
          {currentPage === 'parent-portal' && <ParentPortal />}
          {currentPage === 'ai-analytics' && <AIAnalytics />}
          {currentPage === 'financial' && <FinancialCenter />}
        </main>
        
        <Footer />
      </motion.div>
    </AnimatePresence>
  )
}

export default App