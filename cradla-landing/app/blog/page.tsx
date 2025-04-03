// app/blog/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AnimatedGradientBackground from '@/components/ui/animated-gradient-background';
import { NoiseOverlay } from '@/components/ui/noise-overlay';
import { Search, Tag, Clock, Star } from 'lucide-react';
import Footer from '@/components/ui/footer';

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Blog post data
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Therapeutic Context Transfer in Mental Healthcare",
      excerpt: "How AI can help maintain continuity of care when patients switch therapists",
      category: "technical",
      readingTime: "8 min read",
      date: "March 28, 2025",
      featured: true,
      image: "/api/placeholder/800/400"
    },
    {
      id: 2,
      title: "The Mental Health Provider Shortage: A Data-Driven Analysis",
      excerpt: "Examining wait times and access issues across the United States",
      category: "industry",
      readingTime: "12 min read",
      date: "March 15, 2025",
      featured: false,
      image: "/api/placeholder/800/400"
    },
    {
      id: 3,
      title: "How Our Multimodal AI Understands Therapy Sessions",
      excerpt: "A technical deep dive into Cradla's approach to analyzing verbal and non-verbal therapy cues",
      category: "technical",
      readingTime: "15 min read",
      date: "March 10, 2025",
      featured: true,
      image: "/api/placeholder/800/400"
    },
    {
      id: 4,
      title: "Case Study: How Bay Area Therapy Group Increased Throughput by 31%",
      excerpt: "Real-world results from implementing Cradla's dynamic allocation model",
      category: "case-study",
      readingTime: "10 min read",
      date: "March 5, 2025",
      featured: false,
      image: "/api/placeholder/800/400"
    },
    {
      id: 5,
      title: "HIPAA Compliance and AI in Mental Healthcare",
      excerpt: "Navigating the regulatory landscape for AI therapy tools",
      category: "industry",
      readingTime: "7 min read",
      date: "February 28, 2025",
      featured: false,
      image: "/api/placeholder/800/400"
    },
    {
      id: 6,
      title: "The Psychology of Context Preservation in Therapeutic Relationships",
      excerpt: "Understanding why continuity matters in mental healthcare outcomes",
      category: "research",
      readingTime: "14 min read",
      date: "February 20, 2025",
      featured: true,
      image: "/api/placeholder/800/400"
    }
  ];

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Featured posts
  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <AnimatedGradientBackground 
          gradientColors={[
            "#FFFFFF", // White center
            "#BFC261", // Olive/chartreuse
            "#E195AB", // Pink 
            "#DE3163", // Blue
            "#FFD600", // Yellow
            "#00E676", // Green
            "#BFC261"  // Back to olive
          ]}
          Breathing={true}
          startingGap={125}
        />
        <NoiseOverlay 
          opacity={0.05}
          zIndex={5}
          startingGap={125}
          firstStopThreshold={90}
          transitionWidth={25}
        />
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm py-4 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-gray-900">Cradla Blog</a>
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
            <a href="/therapists" className="text-gray-700 hover:text-gray-900">For Therapists</a>
            <a href="/investors" className="text-gray-700 hover:text-gray-900">For Investors</a>
          </nav>
          <Button 
            variant="default"
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Subscribe
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-6 md:pt-40 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Insights from the Future of Mental Healthcare
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Deep dives into AI therapy technology, industry trends, research findings, and success stories from mental health professionals.
            </p>
            
            {/* Search bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {['all', 'technical', 'industry', 'case-study', 'research'].map(category => (
              <Badge
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className={`px-4 py-2 cursor-pointer ${
                  activeCategory === category 
                    ? 'bg-indigo-600' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && searchQuery === '' && activeCategory === 'all' && (
        <section className="relative py-16 px-4 md:px-6 bg-white/70">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-gray-900">Featured Articles</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPosts.map(post => (
                <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                        {post.category.charAt(0).toUpperCase() + post.category.slice(1).replace('-', ' ')}
                      </Badge>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{post.readingTime}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{post.title}</h3>
                    <p className="text-gray-700 mb-4">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{post.date}</span>
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts Section */}
      <section className="relative py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">
            {searchQuery ? `Search Results: "${searchQuery}"` : 
             activeCategory !== 'all' ? `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1).replace('-', ' ')} Articles` : 
             "Latest Articles"}
          </h2>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No articles found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                        {post.category.charAt(0).toUpperCase() + post.category.slice(1).replace('-', ' ')}
                      </Badge>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{post.readingTime}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{post.title}</h3>
                    <p className="text-gray-700 mb-4">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{post.date}</span>
                      {post.featured && <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <nav className="flex items-center space-x-2">
              <Button variant="outline" className="px-3 py-2" disabled>Previous</Button>
              <Button variant="default" className="px-3 py-2 bg-indigo-600">1</Button>
              <Button variant="outline" className="px-3 py-2">2</Button>
              <Button variant="outline" className="px-3 py-2">3</Button>
              <span className="px-2">...</span>
              <Button variant="outline" className="px-3 py-2">10</Button>
              <Button variant="outline" className="px-3 py-2">Next</Button>
            </nav>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative py-20 px-4 md:px-6 bg-indigo-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Stay at the Forefront of Mental Healthcare
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            Subscribe to our newsletter and get the latest insights into therapeutic AI, industry trends, and Cradla product updates.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-l-lg border-y border-l border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Button 
                variant="default" 
                className="px-6 rounded-l-none bg-indigo-600 hover:bg-indigo-700"
              >
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Deep Dive Example */}
      <section className="relative py-16 px-4 md:px-6 bg-white/90">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Featured Deep Dive</h2>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img 
              src="/api/placeholder/1200/600" 
              alt="AI Multimodal Analysis" 
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-indigo-100 text-indigo-800">
                  Technical Deep Dive
                </Badge>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>15 min read</span>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">How Our Multimodal AI Understands Therapy Sessions</h3>
              <p className="text-gray-700 mb-4">
                While many AI solutions can transcribe therapy sessions, Cradla's approach goes beyond words to capture the full therapeutic context. Our system analyzes multiple dimensions of the therapeutic interaction:
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Verbal Content Analysis</h4>
                  <p className="text-gray-700">Understanding not just what is said, but the emotional connotations, therapeutic frameworks employed, and narrative progression.</p>
                </div>
                
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Prosodic Pattern Recognition</h4>
                  <p className="text-gray-700">Detecting vocal tone, pitch variations, pauses, and speech rate that signal emotional states and therapeutic engagement.</p>
                </div>
                
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Context Preservation</h4>
                  <p className="text-gray-700">Building a continuous therapeutic narrative across sessions, even when different therapists are involved.</p>
                </div>
              </div>
              
              <Button 
                variant="default" 
                className="mt-4 bg-indigo-600 hover:bg-indigo-700"
              >
                Read Full Article
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;