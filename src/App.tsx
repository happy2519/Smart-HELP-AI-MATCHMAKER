import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Zap, 
  User, 
  LogOut, 
  Search, 
  Bell, 
  Send, 
  CheckCircle2, 
  Award, 
  TrendingUp,
  Clock,
  Heart,
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Leaf
} from 'lucide-react';
import { cn } from './lib/utils';
import { getVolunteerMatches } from './services/gemini';
import { FLASH_TASKS, USER_STATS, Task } from './constants/data';

// --- Components ---

const Navbar = ({ onNavigate, currentView }: { onNavigate: (view: string) => void, currentView: string }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex items-center justify-between">
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
      <div className="w-10 h-10 bg-brand-yellow rounded-xl flex items-center justify-center shadow-lg shadow-brand-yellow/20">
        <Heart className="text-black w-6 h-6" />
      </div>
      <span className="text-xl font-bold tracking-tight text-white">Smart<span className="text-brand-yellow">Help</span> 🤝✨</span>
    </div>
    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
      <button onClick={() => onNavigate('landing')} className={cn("hover:text-brand-yellow transition-colors", currentView === 'landing' && "text-brand-yellow")}>Home 🏠</button>
      <button className="hover:text-brand-yellow transition-colors">NGOs 🌿</button>
      <button className="hover:text-brand-yellow transition-colors">Impact 📈</button>
      <button onClick={() => onNavigate('dashboard')} className="bg-brand-lavender text-black px-5 py-2.5 rounded-full hover:bg-brand-lavender/90 transition-all shadow-lg shadow-brand-lavender/20">Get Started 🚀</button>
    </div>
  </nav>
);

const Sidebar = ({ currentView, onNavigate }: { currentView: string, onNavigate: (view: string) => void }) => {
  const items = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'tasks', icon: Zap, label: 'Flash Tasks' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-zinc-950 border-r border-white/10 p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-12">
        <div className="w-8 h-8 bg-brand-yellow rounded-lg flex items-center justify-center">
          <Heart className="text-black w-5 h-5" />
        </div>
        <span className="text-lg font-bold text-white">SmartHelp 🌿</span>
      </div>
      <nav className="flex-1 space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
              currentView === item.id 
                ? "bg-white/10 text-brand-yellow shadow-sm border border-white/5" 
                : "text-slate-400 hover:bg-white/5"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>
      <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all mt-auto">
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </aside>
  );
};

const TopBar = ({ title }: { title: string }) => (
  <header className="h-20 flex items-center justify-between px-8 bg-black/50 backdrop-blur-sm sticky top-0 z-10 border-b border-white/5">
    <h1 className="text-xl font-bold text-white">{title} ✨</h1>
    <div className="flex items-center gap-6">
      <div className="relative hidden md:block">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input 
          type="text" 
          placeholder="Search opportunities..." 
          className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm w-64 text-white focus:ring-2 focus:ring-brand-yellow/20 outline-none transition-all"
        />
      </div>
      <button className="relative p-2 text-slate-400 hover:bg-white/5 rounded-full transition-all">
        <Bell className="w-5 h-5" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-brand-yellow rounded-full border-2 border-black"></span>
      </button>
      <div className="flex items-center gap-3 pl-4 border-l border-white/10">
        <div className="text-right">
          <p className="text-sm font-semibold text-white">{USER_STATS.name} 🙋</p>
          <p className="text-xs text-slate-500">{USER_STATS.level}</p>
        </div>
        <div className="w-10 h-10 bg-brand-yellow/10 rounded-full flex items-center justify-center text-brand-yellow font-bold border border-brand-yellow/20">
          A
        </div>
      </div>
    </div>
  </header>
);

// --- Views ---

const Footer = () => (
  <footer className="bg-zinc-950 border-t border-white/10 py-12 px-6">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
      <div className="col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-brand-yellow rounded-lg flex items-center justify-center">
            <Heart className="text-black w-5 h-5" />
          </div>
          <span className="text-lg font-bold text-white">SmartHelp 🌿</span>
        </div>
        <p className="text-slate-400 max-w-sm">
          Empowering the next generation of social changemakers in India through AI-driven matching and micro-volunteering. 🇮🇳✨
        </p>
      </div>
      <div>
        <h4 className="font-bold text-white mb-6">Platform 🚀</h4>
        <ul className="space-y-4 text-sm text-slate-400">
          <li><a href="#" className="hover:text-brand-yellow transition-colors">For Volunteers 🙋</a></li>
          <li><a href="#" className="hover:text-brand-yellow transition-colors">For NGOs 🤝</a></li>
          <li><a href="#" className="hover:text-brand-yellow transition-colors">Impact Stories 📈</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-white mb-6">Company 🌿</h4>
        <ul className="space-y-4 text-sm text-slate-400">
          <li><a href="#" className="hover:text-brand-yellow transition-colors">About Us 🌱</a></li>
          <li><a href="#" className="hover:text-brand-yellow transition-colors">Contact 🆘</a></li>
          <li><a href="#" className="hover:text-brand-yellow transition-colors">Privacy Policy 🔒</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-sm text-slate-500">
      © 2026 SmartHelp. Built for impact. 🌵✨
    </div>
  </footer>
);

const LandingPage = ({ onStart }: { onStart: () => void }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="min-h-screen mandala-bg pt-20 bg-black">
      <Navbar onNavigate={(v) => v === 'dashboard' ? onStart() : null} currentView="landing" />
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-brand-yellow/10 text-brand-yellow rounded-full text-sm font-semibold mb-6 border border-brand-yellow/20">
              ✨ AI-Powered Social Impact 🌿
            </span>
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-8">
              AI-Powered <br />
              <span className="text-brand-yellow">Volunteer Matching 🤝</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0">
              Find meaningful opportunities instantly using AI. We bridge the gap between passionate volunteers and NGOs across India. 🇮🇳🌱
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={onStart}
                className="px-8 py-4 bg-brand-yellow text-black rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-brand-yellow/20 flex items-center gap-2"
              >
                Get Started 🚀 <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowInfo(!showInfo)}
                className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-2"
              >
                {showInfo ? 'Hide Info 🌵' : 'Learn More 📖'}
              </button>
            </div>

            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl text-left overflow-hidden"
                >
                  <h3 className="text-xl font-bold text-brand-yellow mb-4">How SmartHelp Works 🌿</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-brand-yellow" /> AI Analysis
                      </h4>
                      <p className="text-sm text-slate-400">Our Gemini-powered AI analyzes your skills, interests, and availability to find the perfect match. 🌱</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-brand-lavender" /> Micro-Tasks
                      </h4>
                      <p className="text-sm text-slate-400">Don't have much time? Join "Flash Tasks" that take as little as 15 minutes to complete. ⚡</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                        <Heart className="text-brand-yellow w-4 h-4" /> Direct Impact
                      </h4>
                      <p className="text-sm text-slate-400">Connect directly with verified NGOs across India and track your contribution in real-time. 🤝</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                        <Award className="w-4 h-4 text-brand-lavender" /> Growth
                      </h4>
                      <p className="text-sm text-slate-400">Earn impact points, level up your profile, and grow your virtual "Impact Tree". 🌵</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        <div className="flex-1 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10"
          >
            <div className="w-full aspect-square bg-gradient-to-br from-brand-yellow/10 to-brand-lavender/10 rounded-[40px] flex items-center justify-center p-12">
              <div className="w-full h-full glass rounded-[32px] overflow-hidden shadow-2xl flex flex-col p-8 bg-black/40">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-brand-yellow rounded-2xl flex items-center justify-center">
                    <Sparkles className="text-black w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">AI Matching ✨</h3>
                    <p className="text-xs text-slate-500">Processing skills & interests...</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/10 shadow-sm flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-xl" />
                      <div className="flex-1">
                        <div className="h-3 w-24 bg-white/20 rounded-full mb-2" />
                        <div className="h-2 w-32 bg-white/10 rounded-full" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-brand-yellow/10 text-brand-yellow flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-yellow/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-lavender/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-zinc-950 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Empowering Change through Technology 🌿</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Our platform uses advanced AI to ensure every volunteer finds a role where they can truly make a difference. 🤝✨</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Sparkles, title: "AI Matching Assistant", desc: "Intelligent matching based on your skills, location, and availability. 🌱", color: "bg-brand-yellow", iconColor: "text-black" },
              { icon: Zap, title: "Micro-Volunteering", desc: "Short-term tasks that fit into your busy schedule, from 15 to 60 minutes. ⚡", color: "bg-brand-lavender", iconColor: "text-black" },
              { icon: TrendingUp, title: "Impact Tracking", desc: "Visualize your contribution with real-time analytics and impact points. 📈", color: "bg-brand-yellow", iconColor: "text-black" }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 bg-white/5 rounded-[24px] border border-white/10 shadow-sm hover:shadow-xl hover:border-brand-yellow/20 transition-all"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg", feature.color)}>
                  <feature.icon className={cn("w-7 h-7", feature.iconColor)} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const DashboardView = () => {
  const [query, setQuery] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);
  const [appliedTasks, setAppliedTasks] = useState<Set<string>>(new Set());
  const [reactions, setReactions] = useState<Record<string, number>>({});

  const handleMatch = async () => {
    if (!query.trim()) return;
    setIsMatching(true);
    const results = await getVolunteerMatches(query);
    setMatches(results);
    setIsMatching(false);
  };

  const handleApply = (id: string) => {
    setAppliedTasks(prev => new Set(prev).add(id));
    alert('Applied successfully! 🎉 Check your email for next steps.');
  };

  const handleReaction = (id: string) => {
    setReactions(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <div className="space-y-8">
      {/* AI Assistant Panel */}
      <section className="glass rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-brand-yellow/10 text-brand-yellow rounded-xl flex items-center justify-center border border-brand-yellow/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">AI Matching Assistant 🤖✨</h2>
            <p className="text-sm text-slate-400">Tell me your availability and interests 💭🌿</p>
          </div>
        </div>
        
        <div className="flex gap-4 mb-8">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., I'm free this weekend for 2 hours and I love teaching kids. 🏫🌱"
            className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-brand-yellow/20 focus:border-brand-yellow outline-none transition-all"
          />
          <button 
            onClick={handleMatch}
            disabled={isMatching}
            className="px-8 bg-brand-yellow text-black rounded-2xl font-bold hover:bg-brand-yellow/90 transition-all shadow-lg shadow-brand-yellow/20 disabled:opacity-50 flex items-center gap-2"
          >
            {isMatching ? 'Matching... 🔄' : <><Send className="w-5 h-5" /> Match Me ✨</>}
          </button>
        </div>

        <AnimatePresence>
          {matches.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {matches.map((match, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 bg-white/5 rounded-2xl border border-white/10 shadow-sm hover:shadow-md hover:border-brand-yellow/20 transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-brand-yellow/10 text-brand-yellow text-xs font-bold rounded-full border border-brand-yellow/20">
                      {match.impactPoints} pts 🏆
                    </span>
                    <button 
                      onClick={() => handleReaction(`match-${i}`)}
                      className="flex items-center gap-1 text-slate-500 hover:text-brand-yellow transition-colors"
                    >
                      <Heart className={cn("w-4 h-4", (reactions[`match-${i}`] || 0) > 0 && "fill-brand-yellow text-brand-yellow")} />
                      <span className="text-xs">{reactions[`match-${i}`] || 0}</span>
                    </button>
                  </div>
                  <h3 className="font-bold text-white mb-1 group-hover:text-brand-yellow transition-colors">{match.task}</h3>
                  <p className="text-xs text-brand-lavender font-medium mb-3">{match.ngoName} 🤝</p>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">{match.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {match.time}
                    </span>
                    <button 
                      onClick={() => handleApply(`match-${i}`)}
                      disabled={appliedTasks.has(`match-${i}`)}
                      className={cn(
                        "text-sm font-bold transition-colors",
                        appliedTasks.has(`match-${i}`) ? "text-slate-500" : "text-brand-yellow hover:underline"
                      )}
                    >
                      {appliedTasks.has(`match-${i}`) ? 'Applied ✅' : 'Apply Now 🙋'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Flash Tasks Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-brand-yellow" /> Flash Tasks ⚡🌿
            </h2>
            <button className="text-sm font-medium text-brand-lavender hover:underline">View All 📂</button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {FLASH_TASKS.map((task) => (
              <div key={task.id} className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:border-brand-yellow/30 transition-all group">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-brand-yellow/10 group-hover:text-brand-yellow transition-all">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleReaction(task.id)}
                      className="flex items-center gap-1 text-slate-500 hover:text-brand-yellow transition-colors"
                    >
                      <Heart className={cn("w-4 h-4", (reactions[task.id] || 0) > 0 && "fill-brand-yellow text-brand-yellow")} />
                      <span className="text-xs">{reactions[task.id] || 0}</span>
                    </button>
                    <span className="text-xs font-bold text-slate-500">{task.timeRequired}</span>
                  </div>
                </div>
                <h3 className="font-bold text-white mb-1">{task.title}</h3>
                <p className="text-xs text-slate-500 mb-4">{task.ngoName} 🤝</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-yellow">+{task.points} pts 💎</span>
                  <button 
                    onClick={() => handleApply(task.id)}
                    disabled={appliedTasks.has(task.id)}
                    className={cn(
                      "px-4 py-2 text-black text-xs font-bold rounded-lg transition-all",
                      appliedTasks.has(task.id) ? "bg-slate-700 text-slate-400" : "bg-brand-yellow hover:bg-brand-yellow/80"
                    )}
                  >
                    {appliedTasks.has(task.id) ? 'Joined ✅' : 'Quick Join 🙋'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Overview */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-yellow" /> Impact Overview 📈
          </h2>
          <div className="p-8 bg-zinc-900 text-white rounded-[32px] relative overflow-hidden border border-white/10">
            <div className="relative z-10">
              <p className="text-slate-400 text-sm mb-2">Total Points Earned 🏆</p>
              <h3 className="text-4xl font-bold mb-6 text-brand-yellow">{USER_STATS.points.toLocaleString()}</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Level Progression 🌱</span>
                  <span className="font-bold text-brand-lavender">{USER_STATS.level}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(USER_STATS.points / USER_STATS.nextLevelPoints) * 100}%` }}
                    className="h-full bg-brand-yellow"
                  />
                </div>
                <p className="text-xs text-slate-500 text-center">
                  {USER_STATS.nextLevelPoints - USER_STATS.points} pts to reach <span className="text-white">Changemaker 🚀</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-xs text-slate-400 mb-1">Tasks Done 🤝</p>
                  <p className="text-xl font-bold">12</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-xs text-slate-400 mb-1">Hours Given ⏳</p>
                  <p className="text-xl font-bold">48</p>
                </div>
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-yellow/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileView = () => {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Profile Card */}
      <div className="space-y-6">
        <div className="glass rounded-[32px] p-8 text-center bg-zinc-900/40">
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-brand-yellow to-brand-lavender rounded-full p-1">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-4xl font-bold text-white">
                A
              </div>
            </div>
            <div className="absolute bottom-1 right-1 w-8 h-8 bg-brand-yellow rounded-full border-4 border-black flex items-center justify-center">
              <CheckCircle2 className="text-black w-4 h-4" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">{USER_STATS.name} 🙋</h2>
          <p className="text-slate-500 text-sm mb-6">{USER_STATS.level}</p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {USER_STATS.skills.map(skill => (
              <span key={skill} className="px-3 py-1 bg-white/5 text-slate-300 text-xs font-medium rounded-full border border-white/10">
                {skill}
              </span>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex justify-around">
            <div>
              <p className="text-xs text-slate-500 mb-1">Availability ⏳</p>
              <p className="text-sm font-bold text-white">{USER_STATS.availability}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Joined 🌿</p>
              <p className="text-sm font-bold text-white">Jan 2024</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-[32px] p-8 bg-zinc-900/40">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-brand-yellow" /> Achievements 🏆
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className={cn("aspect-square rounded-2xl flex items-center justify-center border", i <= 3 ? "bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20" : "bg-white/5 text-slate-700 border-white/5")}>
                <Award className="w-6 h-6" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gamification & History */}
      <div className="lg:col-span-2 space-y-8">
        <section className="glass rounded-[32px] p-10 relative overflow-hidden bg-zinc-900/40">
          <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-4">Your Impact Tree 🌱✨</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                As you complete more tasks, your impact tree grows. You're currently at the <span className="font-bold text-brand-yellow">Sapling</span> stage. 🌿
              </p>
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-500">Growth Progress 🌵</span>
                  <span className="text-brand-yellow">62%</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "62%" }}
                    className="h-full bg-brand-yellow shadow-[0_0_10px_rgba(255,255,0,0.5)]"
                  />
                </div>
              </div>
            </div>
            <div className="w-48 h-48 bg-brand-yellow/5 rounded-full flex items-center justify-center relative border border-brand-yellow/10">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Leaf className="w-24 h-24 text-brand-yellow" />
              </motion.div>
              {/* Sparkles around the tree */}
              <Sparkles className="absolute top-4 right-4 w-6 h-6 text-brand-yellow/40" />
              <Sparkles className="absolute bottom-8 left-2 w-4 h-4 text-brand-lavender/30" />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-bold text-white">Activity History 📜🌿</h2>
          <div className="space-y-4">
            {USER_STATS.history.map(item => (
              <div key={item.id} className="p-6 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between hover:shadow-md hover:border-brand-yellow/20 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-brand-yellow">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{item.task}</h3>
                    <p className="text-sm text-slate-500">{item.ngo} 🤝 • {item.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-brand-yellow font-bold">+{item.points} pts</p>
                  <p className="text-xs text-slate-500">Completed ✅</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState('landing'); // landing, dashboard, tasks, profile

  const renderContent = () => {
    switch (view) {
      case 'dashboard': return <DashboardView />;
      case 'tasks': return <DashboardView />; // Reusing dashboard for now as it has tasks
      case 'profile': return <ProfileView />;
      default: return null;
    }
  };

  if (view === 'landing') {
    return <LandingPage onStart={() => setView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-black flex mandala-bg text-white">
      <Sidebar currentView={view} onNavigate={setView} />
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        <TopBar title={view.charAt(0).toUpperCase() + view.slice(1)} />
        <div className="p-8 max-w-6xl mx-auto w-full">
          <motion.div
            key={view}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
