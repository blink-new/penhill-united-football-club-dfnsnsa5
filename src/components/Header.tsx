import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, Menu, X, Globe, ChevronDown, 
  Users, Calendar, BarChart3, MessageSquare, 
  Trophy, Settings, User, LogOut, Cloud,
  Home, Newspaper, Info, Zap, Target
} from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { 
  ShieldGradientIcon, 
  BellIcon, 
  AIStatusIcon 
} from './icons/SkyIcons'

interface HeaderProps {
  user: any
  currentPage?: string
  onPageChange?: (page: string) => void
}

export function Header({ user, currentPage = 'dashboard', onPageChange }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('EN')
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications] = useState(5)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const mainNavItems = [
    { 
      name: 'DASHBOARD', 
      page: 'dashboard', 
      icon: Home,
      active: currentPage === 'dashboard'
    },
    { 
      name: 'TEAMS', 
      page: 'teams', 
      icon: Users,
      active: currentPage === 'teams'
    },
    { 
      name: 'MATCH CENTER', 
      page: 'match-center', 
      icon: Trophy,
      active: currentPage === 'match-center'
    },
    { 
      name: 'TRAINING', 
      page: 'training', 
      icon: Target,
      active: currentPage === 'training'
    },
    { 
      name: 'AI ANALYTICS', 
      page: 'ai-analytics', 
      icon: BarChart3,
      active: currentPage === 'ai-analytics'
    },
    { 
      name: 'PARENT PORTAL', 
      page: 'parent-portal', 
      icon: MessageSquare,
      active: currentPage === 'parent-portal'
    }
  ]

  const languages = ['EN', 'ES', 'FR', 'DE']

  return (
    <>
      {/* Main Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'header-surface shadow-2xl py-2' 
            : 'header-surface py-3'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo Section */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="relative">
                <ShieldGradientIcon size={48} className="drop-shadow-lg" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <Zap className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white text-display">
                  Penhill United FC
                </h1>
                <p className="text-xs text-white/70">Youth Teams • North Wilts League</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {mainNavItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={`nav-underline flex items-center space-x-2 px-4 py-2 text-sm font-medium uppercase tracking-wider text-white/90 hover:text-white hover:bg-white/10 micro-transition ${
                    item.active ? 'active text-white' : ''
                  }`}
                  onClick={() => onPageChange?.(item.page)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Button>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              
              {/* AI Status Indicator */}
              <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-green-500/20 rounded-lg border border-green-500/30">
                <AIStatusIcon className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">AI Active</span>
              </div>

              {/* Language Toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center space-x-1 text-white/90 hover:text-white hover:bg-white/10 micro-transition"
                  >
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">{currentLanguage}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="stadium-arc">
                  {languages.map((lang) => (
                    <DropdownMenuItem 
                      key={lang} 
                      onClick={() => setCurrentLanguage(lang)}
                      className={`micro-transition ${lang === currentLanguage ? 'bg-primary/10' : ''}`}
                    >
                      {lang}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Search */}
              <div className="hidden sm:flex items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                  <Input
                    placeholder="AI Smart Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-56 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40 micro-transition rounded-full h-10"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 text-white/60 hover:text-white/80"
                      onClick={() => setSearchQuery('')}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Notifications */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative text-white/90 hover:text-white hover:bg-white/10 micro-transition"
              >
                <BellIcon className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs border-2 border-slate-900">
                    {notifications}
                  </Badge>
                )}
              </Button>

              {/* User Avatar */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center space-x-2 px-2 text-white/90 hover:text-white hover:bg-white/10 micro-transition"
                  >
                    <Avatar className="w-8 h-8 ring-2 ring-white/20">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {user?.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 stadium-arc elevation-modal">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">My Account</span>
                      <span className="text-xs text-muted-foreground truncate">
                        {user?.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="micro-transition">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="micro-transition">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 micro-transition">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white/90 hover:text-white hover:bg-white/10 micro-transition"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="lg:hidden mt-4 pb-4 border-t border-white/10"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <div className="flex flex-col space-y-2 pt-4">
                  {mainNavItems.map((item) => (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className={`w-full justify-start text-white/90 hover:text-white hover:bg-white/10 micro-transition ${
                        item.active ? 'bg-white/10 text-white' : ''
                      }`}
                      onClick={() => {
                        onPageChange?.(item.page)
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </Button>
                  ))}
                  
                  {/* Mobile Search */}
                  <div className="px-4 py-2 mt-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                      <Input
                        placeholder="AI Smart Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40 micro-transition rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  )
}