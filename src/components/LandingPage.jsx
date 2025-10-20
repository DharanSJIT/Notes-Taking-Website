import React, { useState } from 'react';
import { FileText, Lock, Cloud, Zap, Search, Tag, ArrowRight, CheckCircle, Users, Star, TrendingUp, Heart, Play } from 'lucide-react';

export default function LandingPage({ onGetStarted }) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleGetStarted = () => {
    setIsTransitioning(true);
    setTimeout(() => onGetStarted(), 500);
  };

  return (
    <div className={`min-h-screen bg-white transition-all duration-500 ${
      isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
    }`}>
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="p-2 bg-blue-600 rounded-lg transition-all duration-300 group-hover:scale-105">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-900">NotesApp</span>
            </div>
            <button
              onClick={handleGetStarted}
              className="group flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105"
              disabled={isTransitioning}
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        <div className="text-center">
          {/* <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-blue-200">
            <TrendingUp className="w-4 h-4" />
            Trusted by 10,000+ thoughtful creators
          </div> */}
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-8 leading-tight">
            Where Your
            <span className="block text-blue-600">
              Best Ideas Live
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-[200px] font-light">
            Capture your thoughts, organize your life, and unleash your creativity. 
            The simplest way to remember what matters, beautifully designed for humans.
          </p>
         
        </div>

        {/* Hero Illustration */}
        <div className="mt-20">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200 hover:shadow-2xl transition-shadow duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { color: 'blue', title: 'Meeting Notes', emoji: '📝', bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-500', bar: 'bg-blue-200' },
                { color: 'blue', title: 'Creative Ideas', emoji: '💡', bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-500', bar: 'bg-blue-200' },
                { color: 'blue', title: 'To-Do List', emoji: '✅', bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-500', bar: 'bg-blue-200' }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`${item.bg} p-6 rounded-xl border ${item.border} hover:transform hover:scale-105 transition-all duration-300 cursor-pointer`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-sm font-semibold text-slate-700">{item.title}</span>
                  </div>
                  <div className="space-y-2">
                    <div className={`h-2 ${item.bar} rounded-full w-full`}></div>
                    <div className={`h-2 ${item.bar} rounded-full w-4/5`}></div>
                    <div className={`h-2 ${item.bar} rounded-full w-3/5`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Designed for Your Mind
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to capture, organize, and find your thoughts—without the complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Cloud, title: 'Seamless Sync', description: 'Your notes travel with you. Pick up where you left off on any device, automatically.' },
            { icon: Lock, title: 'Private & Secure', description: 'Your thoughts are yours alone. End-to-end encryption keeps them private.' },
            { icon: Zap, title: 'Lightning Fast', description: 'Open and search notes instantly. No waiting, just pure productivity.' },
            { icon: Search, title: 'Smart Search', description: 'Find anything in seconds, even if you barely remember what you wrote.' },
            { icon: Tag, title: 'Intuitive Organization', description: 'Tags and categories that work the way your brain thinks.' },
            { icon: FileText, title: 'Beautiful Editing', description: 'A distraction-free writing experience that feels just right.' }
          ].map((feature, index) => (
            <div 
              key={index}
              className="group bg-white p-8 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 cursor-pointer"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Your Second Brain, Perfected
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                We built NotesApp to work the way your mind works—naturally, intuitively, and beautifully.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Free Forever", description: "Start capturing ideas immediately. No hidden costs, no surprises." },
                  { title: "Works Everywhere", description: "From your phone to your laptop, your notes are always with you." },
                  { title: "Human-Centered Design", description: "Every feature is designed with real people in mind." }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">{benefit.title}</h4>
                      <p className="text-blue-100">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-700 rounded-2xl p-8 border border-blue-500">
              <div className="text-center">
                <Users className="w-12 h-12 text-white mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">10,000+</div>
                <div className="text-xl text-blue-100 mb-8">Happy Creators</div>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">50K+</div>
                    <div className="text-sm text-blue-100">Ideas Captured</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">99.9%</div>
                    <div className="text-sm text-blue-100">Always Available</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">4.9★</div>
                    <div className="text-sm text-blue-100">Love Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-slate-900 rounded-2xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Organize Your Thoughts?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of creators who've found their perfect note-taking home. 
            Your best ideas deserve a beautiful space.
          </p>
          <button
            onClick={onGetStarted}
            className="group inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-50 transition-all duration-300 hover:shadow-lg"
          >
            <FileText className="w-5 h-5" />
            Create Your First Note
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <p className="text-slate-400 text-sm mt-4">
            No credit card required • Start in seconds • Free forever
          </p>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">NotesApp</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Helping thoughtful people capture and organize their best ideas since 2024.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Community</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Forum</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-400">
            <p>Made with ❤️ for creators everywhere. © 2024 NotesApp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}