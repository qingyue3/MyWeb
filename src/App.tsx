import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Github, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  Code2, 
  Palette, 
  ArrowRight,
  Instagram,
  BookHeart,
  Music2,
  Link,
  Sun,
  Moon
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

interface Work {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "3D 虚拟遗址交互",
    description: "数字重建的真实遗址场景，用户可以在虚拟环境中交互查看遗址的详细信息，包括历史事件、人物介绍、环境变化等。",
    tags: ["Ureal5", "A/B Test", "Human Computer Interaction", "Virtual Reality","3D Modeling"],
    image: "/images/Heritage.webp",
    link: "https://github.com/qingyue3/VR_Heritage"
  },
  {
    id: 2,
    title: "黑白棋游戏设计",
    description: "实现黑白棋游戏的基本规则，包括棋盘布局、棋子移动、游戏结束判断等功能。",
    tags: ["Unity 3D", "C#", "MiniMax Algorithm", "Game Design","Animation Design"],
    image: "/images/Othello.webp",
    link: "https://github.com/qingyue3/Othello"
  },
  {
    id: 3,
    title: "机器学习驱动等离子化学反应过程的优化",
    description: "通过分析等离子体催化甲烷燃烧反应实验数据，利用多种机器学习方法（如支持向量机、神经网络等）建立模型，优化反应过程。",
    tags: ["Python", "SVM","Random Forest", "Data Analysis", "Machine Learning"],
    image: "/images/Analysis.webp",
    link: "#"
  }
];

const WORKS: Work[] = [
  {
    id: 1,
    role: "客户项目经理实习 Customer Project Manager Intern",
    company: "Momenta",
    period: "2025.11 - 2026.03",
    description: "协助与客户需求对接，项目管理，车辆和人员资源管理"
  },
  {
    id: 2,
    role: "产品经理实习 Product Manager Intern",
    company: "江西青团有限责任公司",
    period: "2022.07 - 2022.08",
    description: "协助需求调研与原型设计，进行数据分析与产品优化"
  },
];

const Navbar = ({ activeTab, onTabClick, isDark, onToggleDark }: { activeTab: string, onTabClick: (tab: string) => void, isDark: boolean, onToggleDark: () => void }) => {
  const tabs = [
    { id: 'home', label: '首页' },
    { id: 'about', label: '关于我' },
    { id: 'tags', label: '探索' },
    { id: 'works', label: '我的作品' },
    { id: 'projects', label: '我的项目' },
    { id: 'contact', label: '联系我' }
  ];

  return (
    <>
      <button
        onClick={onToggleDark}
        className="fixed top-8 right-8 z-50 p-2 rounded-full glass-nav hover:bg-white/10 transition-colors hidden landscape:flex"
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-4 h-4" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-2 md:px-4">
        <div className="glass-nav flex items-center gap-1 md:gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabClick(tab.id)}
              className={`text-xs md:text-sm font-medium transition-colors relative py-1 px-1 md:px-2 whitespace-nowrap ${
                activeTab === tab.id ? '' : 'opacity-60 hover:opacity-100'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-green"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
          <button
            onClick={onToggleDark}
            className="p-1.5 md:p-2 rounded-full hover:bg-white/10 transition-colors landscape:hidden"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="w-3 h-3 md:w-4 md:h-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-3 h-3 md:w-4 md:h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>
    </>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.2]);

  const sectionRef = useRef<HTMLElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const beta = event.beta || 0;
      const gamma = event.gamma || 0;
      const rotateX = Math.min(Math.max(beta * 0.5, -20), 20);
      const rotateY = Math.min(Math.max(gamma * 0.5, -20), 20);
      setRotate({ x: rotateX, y: rotateY });
    };

    if (typeof DeviceOrientationEvent !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [isMobile]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobile) return;
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    //旋转的角度
    const rotateX = -(mouseY / (rect.height / 2)) * 20;
    const rotateY = -(mouseX / (rect.width / 2)) * 20;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setRotate({ x: 0, y: 0 });
  };

  return (
  <section 
    ref={sectionRef}
    onMouseMove={handleMouseMove}
    onMouseLeave={handleMouseLeave}
    className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden"
  >
    <motion.div 
      style={{ opacity, scale }}
      className="absolute inset-0 z-0"
    >
      <img 
        src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=2000" 
        alt="Nature Background" 
        className="w-full h-full object-cover opacity-60"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0a0a0a]" />
    </motion.div>
    
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 0.8, y: 0, rotateX: rotate.x, rotateY: rotate.y }}
      // 旋转的过渡时间设置
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative z-10 max-w-5xl px-6"
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight mb-4">
        自在生长 永远热烈 
      </h1>
      <p className="text-base md:text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed">
        <span className="text-brand-green font-bold">E</span>nergetic &nbsp;
        <span className="text-brand-green font-bold">N</span>ovel &nbsp;
        <span className="text-brand-green font-bold">F</span>ree-spirited &nbsp;
        <span className="text-brand-green font-bold">P</span>layful
      </p>
    </motion.div>
  </section>
  );
};

const About = () => (
  <section className="section-padding grid md:grid-cols-2 gap-16 items-center">
    <div className="relative">
      <div className="aspect-[3/4] rounded-3xl overflow-hidden">
        <img 
          src="/images/Me.webp" 
          alt="Profile" 
          className="w-full h-full object-cover md:grayscale-[30%] md:hover:grayscale-0 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-green rounded-full flex items-center justify-center text-black font-serif italic text-xl">
        Hello!
      </div>
    </div>
    <div>
      <span className="text-brand-pink font-serif font-bold text-sm tracking-widest uppercase mb-4 block">
        • About Me
      </span>
      <h2 className="text-4xl md:text-6xl mb-8 leading-tight">
        罗清月 <br />
        <span className="italic">Lorien</span>
      </h2>
      <p className="text-lg mb-8 leading-relaxed">
        一个致力于自我成长的探索者，想法很多，乐于创造，想要慢慢把想法落地成现实。会好奇飞机降落停下的原理；也想知道禽类翅膀再不具备飞行能力的时候有什么作用；思考过机器人的未来是否一定要像"人"；也曾因适应孤独究竟是成长了还是妥协了而感到困惑...
      </p>
      <div className="space-y-6">
        <div className="glass-card flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white">
            <img src="/images/XJTLU.webp" alt="西交利物浦大学" className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="text-xl mb-1">西交利物浦大学 <span className="text-base ml-2">2020.09 - 2022.07</span></h3>
            <p className="text-sm">数字媒体技术专业</p>
          </div>
        </div>
        <div className="glass-card flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white">
            <img src="/images/UoL.webp" alt="利物浦大学" className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="text-xl mb-1">利物浦大学 <span className="text-base ml-2">2022.09 - 2024.07</span></h3>
            <p className="text-sm">计算机科学与技术专业· 学士学位</p>
          </div>
        </div>
        <div className="glass-card flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white">
            <img src="/images/UoB.webp" alt="布里斯托大学" className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="text-xl mb-1">布里斯托大学 <span className="text-base ml-2">2024.09 - 2026.02</span></h3>
            <p className="text-sm">机器人学 · 工程学硕士</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Tags = () => (
  <section className="section-padding">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
      <div>
        <span className="text-brand-green font-serif font-bold text-sm tracking-widest uppercase mb-4 block">
          • Discovery
        </span>
        <h2 className="text-4xl md:text-6xl">探索与成长</h2>
      </div>
      <p className="max-w-sm">
        世界、学习和兴趣，构成了我生活的三原色
      </p>
    </div>
    
    <div className="space-y-12">
      <div>
        <h3 className="text-2xl font-medium mb-6 flex items-center gap-2">
          <span className="text-2xl">🌏</span>
          我的足迹
        </h3>
        
        <div className="relative overflow-hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollBehavior: 'smooth' }}>
            {[
              { name: '英国', image: '/images/UK.webp' },
              { name: '西班牙', image: '/images/SPA.webp' },
              { name: '葡萄牙', image: '/images/POR.webp' },
              { name: '瑞典', image: '/images/SWE.webp' },
              { name: '挪威', image: '/images/NOR.webp' },
              { name: '埃及', image: '/images/EGY.webp' },
              { name: '法国', image: '/images/FRA.webp' },
              { name: '匈牙利', image: '/images/HUN.webp' },
              { name: '奥地利', image: '/images/AUT.webp' },
              { name: '捷克', image: '/images/CZE.webp' },
              { name: '冰岛', image: '/images/ICE.webp' },
              { name: '荷兰', image: '/images/NET.webp' },
              { name: '意大利', image: '/images/ITA.webp' },
              { name: '瑞士', image: '/images/SWI.webp' },
            ].map((country, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-64 md:w-72 group cursor-pointer"
                style={{ marginLeft: i === 0 ? 0 : '-40px' }}
              >
                <div className="relative rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/30 transition-all duration-300">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img 
                      src={country.image} 
                      alt={country.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-2xl font-bold group-hover:text-brand-green transition-colors">{country.name}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-medium mb-6 flex items-center gap-2">
            <span className="text-2xl">📚</span>
            正在学习
          </h3>
          <div className="glass-card p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <ul className="space-y-3">
              {[
                { name: 'Python', learned: true },
                { name: 'Unreal', learned: true },
                { name: 'Unity', learned: true },
                { name: 'C++', learned: true },
                { name: '韩语', learned: false },
                { name: 'AI 大模型', learned: false },
                { name: 'Vibe Coding', learned: false }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${item.learned ? 'bg-brand-green border-brand-green' : 'border-white/30'}`}>
                    {item.learned && (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className={`text-base ${item.learned ? 'line-through' : ''}`}>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-medium mb-6 flex items-center gap-2">
            <span className="text-2xl">✨</span>
            感兴趣的事
          </h3>
          <div className="glass-card p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <ul className="space-y-3">
              {['旅游', 'Kpop', '想做一个自媒体博主', '想做一款播客', '想看一次庭审', '想设计一个互联网产品', '想学会一门乐器'].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-pink flex-shrink-0"></span>
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Works = () => (
  <section className="section-padding">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
      <div>
        <span className="text-brand-pink font-serif font-bold text-sm tracking-widest uppercase mb-4 block">
          • Experience
        </span>
        <h2 className="text-4xl md:text-6xl">工作经历</h2>
      </div>
      <p className="max-w-sm">
        一路走来的成长轨迹，记录下那些让我变得更强，更丰富的经历～
      </p>
    </div>
    <div className="space-y-4">
      {WORKS.map((work) => (
        <div key={work.id} className="glass-card group cursor-default">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="font-mono text-xs mb-1">{work.period}</div>
              <h3 className="text-2xl group-hover:text-brand-green transition-colors">{work.role}</h3>
              <div className="italic">{work.company}</div>
            </div>
            <p className="max-w-md text-sm md:text-right">
              {work.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Projects = () => (
  <section className="section-padding">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
      <div>
        <span className="text-brand-green font-serif font-bold text-sm tracking-widest uppercase mb-4 block">
          • Portfolio
        </span>
        <h2 className="text-4xl md:text-6xl">精选项目</h2>
      </div>
      <p className="max-w-sm">
        这里藏着我的奇思妙想和动手实践～每个项目都是一段有趣的探索旅程！
      </p>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {PROJECTS.map((project) => (
        <motion.div 
          key={project.id}
          whileHover={{ y: -10 }}
          className="glass-card p-0 overflow-hidden group relative"
        >
          <div className="aspect-video overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover object-bottom group-hover:scale-110 transition-transform duration-500"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
          <div className="p-6 relative">
            <div className="flex gap-2 mb-4 flex-wrap">
              {project.tags.map(tag => (
                <span key={tag} className="text-[10px] font-mono px-2 py-1 bg-white/5 rounded border border-white/10 uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-2xl mb-2 group-hover:text-brand-green transition-colors">{project.title}</h3>
            <p className="text-sm mb-6 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
              {project.description}
            </p>
            <a href={project.link} className="inline-flex items-center gap-2 text-sm font-medium hover:text-brand-green transition-colors">
              View Case Study <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const Contact = () => (
  <section className="section-padding">
    <div className="max-w-7xl mx-auto w-full">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div>
          <span className="text-brand-green font-serif font-bold text-sm tracking-widest uppercase mb-4 block">
            • Contact
          </span>
          <h2 className="text-4xl md:text-6xl mb-6">让我们<br />
           <span className="italic">chat!
           </span>
          </h2>
          <p className="text-lg">
            有新的想法或只是想打个招呼？随时联系我～
          </p>
        </div>
        
        <div className="pt-2 md:pt-4 flex flex-col gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-brand-green" />
              邮箱
            </h3>
            <a href="mailto:luoqingyue01@163.com" className="text-xl hover:text-brand-green transition-colors break-all">
              luoqingyue01@163.com
            </a>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Link className="w-5 h-5 text-brand-green" />
              社交媒体
            </h3>
            <div className="flex gap-4">
              {[
                { icon: Github, name: 'GitHub', href: 'https://github.com/qingyue3' },
                { icon: BookHeart, name: '小红书', href: 'https://www.xiaohongshu.com/user/profile/6068ab110000000001001b14' },
                { icon: Music2, name: '抖音：LORIEN_douyin', href: 'https://www.douyin.com/user/self?from_tab_name=main' }
              ].map(({ icon: Icon, name, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="relative flex flex-col items-center group">
                  <div className="p-3 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 hover:border-brand-green transition-all duration-300 group-hover:scale-130">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="absolute -bottom-8 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-white/10 border border-white/10 px-2 py-1 rounded text-xs font-mono whitespace-nowrap">
                    {name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 px-6 md:px-12 lg:px-24 border-t border-white/5">
    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="font-serif font-bold text-2xl tracking-tighter">PORTFOLIO</div>
      <div className="text-sm font-mono">
        © 2024 DESIGNED & BUILT BY HAND. ALL RIGHTS RESERVED.
      </div>
    </div>
  </footer>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return true;
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'tags', 'works', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : 'light'}`}>
      <Navbar activeTab={activeTab} onTabClick={handleTabClick} isDark={isDark} onToggleDark={() => setIsDark(!isDark)} />
      
      <main>
        <div id="home">
          <Hero />
        </div>
        
        <div id="about">
          <About />
        </div>
        
        <div id="tags">
          <Tags />
        </div>
        
        <div id="works">
          <Works />
        </div>
        
        <div id="projects">
          <Projects />
        </div>
        
        <div id="contact">
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
}
