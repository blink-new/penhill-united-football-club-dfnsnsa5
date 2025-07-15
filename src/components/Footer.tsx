import { motion } from 'framer-motion'
import { 
  Shield, Mail, Phone, MapPin, Facebook, 
  Twitter, Instagram, Youtube, ArrowUp,
  Heart, Users, Trophy, Calendar
} from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Separator } from './ui/separator'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const quickLinks = [
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Team Management', href: '#team-management' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Finance', href: '#finance' },
    { name: 'Communication', href: '#communication' },
    { name: 'Development', href: '#development' }
  ]

  const supportLinks = [
    { name: 'Help Center', href: '#help' },
    { name: 'Contact Support', href: '#support' },
    { name: 'Training Resources', href: '#resources' },
    { name: 'Parent Guide', href: '#parent-guide' },
    { name: 'Safeguarding', href: '#safeguarding' },
    { name: 'Privacy Policy', href: '#privacy' }
  ]

  const clubStats = [
    { icon: Users, label: 'Active Players', value: '150+' },
    { icon: Trophy, label: 'Trophies Won', value: '25' },
    { icon: Calendar, label: 'Years Active', value: '15' },
    { icon: Heart, label: 'Families', value: '120+' }
  ]

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Club Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-red-500 rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Penhill United FC</h3>
                <p className="text-sm text-gray-300">Youth Teams</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Developing young talent through professional coaching, 
              modern facilities, and a commitment to excellence both 
              on and off the pitch.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>Penhill Recreation Ground, Swindon</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+44 1793 123456</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="w-4 h-4" />
                <span>info@penhillunitedfc.co.uk</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support & Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold">Support & Resources</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold">Stay Connected</h4>
            <p className="text-gray-300 text-sm">
              Get the latest updates, match results, and club news.
            </p>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter your email"
                  className="bg-slate-800 border-slate-700 text-white placeholder-gray-400"
                />
                <Button 
                  style={{ backgroundColor: 'hsl(var(--primary))' }}
                  size="sm"
                >
                  Subscribe
                </Button>
              </div>
              <div className="flex space-x-3">
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-slate-800">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-slate-800">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-slate-800">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-slate-800">
                  <Youtube className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Club Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-slate-700"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {clubStats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <Separator className="my-8 bg-slate-700" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-gray-300">
            <p>&copy; 2024 Penhill United FC. All rights reserved.</p>
            <span>•</span>
            <p>North Wilts League</p>
            <span>•</span>
            <p>FA Affiliated</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-300">
              Powered by AI Technology
            </p>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <ArrowUp className="w-5 h-5 mx-auto" />
      </motion.button>
    </footer>
  )
}