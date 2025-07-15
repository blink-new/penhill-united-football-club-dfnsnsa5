import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Clock, Share2, Sparkles } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader } from './ui/card'
import { Badge } from './ui/badge'
import { useState } from 'react'

export function NewsSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const news = [
    {
      id: 1,
      title: 'AI Analytics Reveal Hidden Player Potential',
      excerpt: 'Our advanced machine learning algorithms have identified breakthrough patterns in player performance, leading to strategic improvements.',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop',
      category: 'AI Insights',
      date: '2 hours ago',
      readTime: '3 min read'
    },
    {
      id: 2,
      title: 'Victory Against Manchester United 3-1',
      excerpt: 'Spectacular performance powered by real-time tactical analysis and predictive modeling delivers stunning victory.',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop',
      category: 'Match Report',
      date: '1 day ago',
      readTime: '5 min read'
    },
    {
      id: 3,
      title: 'Neural Network Predicts Season Success',
      excerpt: 'Deep learning models forecast 85% probability of championship victory based on current performance metrics.',
      image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=800&h=400&fit=crop',
      category: 'Predictions',
      date: '3 days ago',
      readTime: '4 min read'
    },
    {
      id: 4,
      title: 'Smart Training Protocols Boost Performance',
      excerpt: 'AI-optimized training regimens show 40% improvement in player stamina and tactical awareness.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
      category: 'Training',
      date: '5 days ago',
      readTime: '6 min read'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % news.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + news.length) % news.length)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Curated News
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest <span className="text-accent">Intelligence</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with AI-powered insights, match analysis, and predictive reports 
            that give you the edge in understanding the beautiful game.
          </p>
        </motion.div>

        {/* News Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="glass-effect hover:ai-glow transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="glass-effect hover:ai-glow transition-all duration-300"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Main Featured Article */}
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Card className="ai-border overflow-hidden hover:ai-glow transition-all duration-300">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={news[currentSlide].image}
                    alt={news[currentSlide].title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-accent/10 text-accent border-accent/20">
                      {news[currentSlide].category}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {news[currentSlide].date}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                    {news[currentSlide].title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {news[currentSlide].excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {news[currentSlide].readTime}
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Read More
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* News Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {news.slice(1, 4).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="ai-border hover:ai-glow transition-all duration-300 h-full">
                  <CardHeader className="p-0">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {article.category}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {article.date}
                      </div>
                    </div>
                    
                    <h4 className="font-semibold mb-2 line-clamp-2">
                      {article.title}
                    </h4>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {article.readTime}
                      </span>
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {news.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-accent w-8'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}