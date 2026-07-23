"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Tilt from "react-parallax-tilt";
import { FaReact, FaNodeJs, FaFigma, FaMobileAlt, FaCode, FaRocket, FaTwitter, FaLinkedin, FaGithub, FaStar, FaArrowRight, FaPlay, FaCheckCircle } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiTypescript, SiVercel, SiGraphql, SiRedis } from "react-icons/si";
import { HiMenu, HiX } from "react-icons/hi";
import Image from "next/image";

/* ─────────────────────────── ANIMATION VARIANTS ─────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
};
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

/* ─────────────────────────── COUNTER COMPONENT ─────────────────────────── */
function Counter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frame = 0;
    const total = 60;
    const timer = setInterval(() => {
      frame++;
      setCount(Math.round((end * frame) / total));
      if (frame >= total) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [started, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─────────────────────────── MAIN COMPONENT ─────────────────────────── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const services = [
    {
      title: "UI/UX Design",
      subtitle: "Human-Centered Design Systems",
      desc: "We craft stunning, conversion-optimized interfaces using Figma. Our design process includes user research, wireframing, interactive prototypes, and pixel-perfect handoffs. Every pixel is intentional.",
      icon: <FaFigma />,
      color: "from-pink-500 to-rose-500",
      bg: "bg-pink-50",
      tags: ["Figma", "Prototyping", "Design Systems", "User Research"]
    },
    {
      title: "Web Development",
      subtitle: "Blazing-Fast Web Applications",
      desc: "From landing pages to complex SaaS platforms, we build highly performant and SEO-optimized web apps with React and Next.js 14. Our code is clean, scalable, and built to last.",
      icon: <FaReact />,
      color: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50",
      tags: ["React", "Next.js 14", "TypeScript", "Tailwind CSS"]
    },
    {
      title: "Mobile Apps",
      subtitle: "Cross-Platform Excellence",
      desc: "We build native-feeling iOS and Android apps using React Native and Expo. One codebase, two platforms, zero compromise on performance or user experience.",
      icon: <FaMobileAlt />,
      color: "from-purple-500 to-violet-500",
      bg: "bg-purple-50",
      tags: ["React Native", "Expo", "iOS", "Android"]
    },
    {
      title: "Backend & APIs",
      subtitle: "Scalable Server Architecture",
      desc: "Our backend engineers build robust, secure REST and GraphQL APIs using Node.js and Express. We architect databases with PostgreSQL and MongoDB for peak performance at any scale.",
      icon: <FaNodeJs />,
      color: "from-green-500 to-emerald-500",
      bg: "bg-green-50",
      tags: ["Node.js", "GraphQL", "REST APIs", "Microservices"]
    },
    {
      title: "SaaS Development",
      subtitle: "Revenue-Ready Platforms",
      desc: "Transform your idea into a full-featured SaaS product. We handle multi-tenancy, subscription billing with Stripe, role-based access control, and everything in between.",
      icon: <FaCode />,
      color: "from-indigo-500 to-blue-600",
      bg: "bg-indigo-50",
      tags: ["Multi-Tenancy", "Stripe", "Auth", "Dashboards"]
    },
    {
      title: "SEO & Performance",
      subtitle: "Rank Higher, Load Faster",
      desc: "We optimize your web properties for Core Web Vitals, structured data, and technical SEO. From Lighthouse scores to schema markup, we help you dominate search rankings.",
      icon: <FaRocket />,
      color: "from-orange-500 to-amber-500",
      bg: "bg-orange-50",
      tags: ["Core Web Vitals", "Schema Markup", "Lighthouse", "Analytics"]
    },
  ];

  const testimonials = [
    { name: "Sarah Mitchell", role: "CEO, TechVentures", text: "WEBARRAYS delivered our platform in 6 weeks. The quality was extraordinary — the team is detail-oriented, communicative, and truly world-class.", avatar: "SM", stars: 5 },
    { name: "James Okafor", role: "CTO, FinFlow Inc.", text: "The React Native app they built for us has a 4.9-star rating on the App Store. Their attention to performance and UX is unmatched by any agency I've worked with.", avatar: "JO", stars: 5 },
    { name: "Priya Sharma", role: "Founder, EduSpark", text: "From design to deployment, WEBARRAYS handled everything flawlessly. Our new Next.js platform loads in under 1 second and ranks on page one of Google.", avatar: "PS", stars: 5 },
    { name: "Lucas Herrera", role: "Head of Product, NovaTech", text: "They're not just developers — they're product thinkers. Their suggestions improved our conversion rate by 40%. Absolutely the best investment we've made.", avatar: "LH", stars: 5 },
  ];

  const faqs = [
    { q: "What is your typical project timeline?", a: "Project timelines vary based on scope. A standard marketing website takes 2-4 weeks, a web app 6-12 weeks, and a full SaaS platform 3-6 months. We always provide a detailed timeline during discovery." },
    { q: "Do you work with international clients?", a: "Absolutely. While we're based in Lahore, Pakistan, we serve clients across the US, UK, UAE, Canada, and Europe. Our team is experienced in async-first communication across time zones." },
    { q: "What technologies do you specialize in?", a: "Our core stack is React, Next.js, Node.js, TypeScript, Tailwind CSS, PostgreSQL, and MongoDB for web. For mobile, we use React Native with Expo. We also work with GraphQL, Redis, and various cloud platforms." },
    { q: "Do you offer post-launch support and maintenance?", a: "Yes. We offer monthly retainer packages for ongoing development, bug fixes, performance monitoring, and feature additions. Our clients typically stay with us for years." },
    { q: "How do you handle project communication?", a: "We use a structured agile workflow with weekly sprint reviews, daily standups when needed, and dedicated Slack channels. You always have full visibility into progress." },
    { q: "Can you redesign an existing website or app?", a: "Definitely. Redesigns are one of our specialties. We conduct a thorough audit of your current product, identify friction points, and deliver a modern upgrade without breaking what already works." },
  ];

  return (
    <main className="bg-[#f8f9ff] text-slate-900 font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Syne', sans-serif; }
        .mesh-bg {
          background: radial-gradient(ellipse 80% 60% at 50% -20%, rgba(99,102,241,0.15) 0%, transparent 70%),
                      radial-gradient(ellipse 60% 50% at 80% 100%, rgba(139,92,246,0.1) 0%, transparent 60%),
                      radial-gradient(ellipse 50% 40% at 0% 60%, rgba(59,130,246,0.08) 0%, transparent 60%),
                      #f8f9ff;
        }
        .noise-texture::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }
        .grid-pattern {
          background-image: linear-gradient(to right, rgba(99,102,241,0.06) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(99,102,241,0.06) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .card-glow:hover { box-shadow: 0 0 0 1px rgba(99,102,241,0.2), 0 20px 60px rgba(99,102,241,0.12); }
        .text-gradient { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a855f7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .text-gradient-gold { background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .btn-shine { position: relative; overflow: hidden; }
        .btn-shine::after { content: ''; position: absolute; top: -50%; left: -100%; width: 60%; height: 200%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent); transform: skewX(-20deg); transition: left 0.5s; }
        .btn-shine:hover::after { left: 150%; }
        .floating { animation: floating 6s ease-in-out infinite; }
        .floating-slow { animation: floating 9s ease-in-out infinite; animation-delay: -3s; }
        @keyframes floating { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        .marquee-track { animation: marquee 30s linear infinite; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .faq-open { max-height: 300px; opacity: 1; }
        .faq-closed { max-height: 0; opacity: 0; }
        .dot-pattern {
          background-image: radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>

      {/* ══════════════ NAVBAR ══════════════ */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/80 backdrop-blur-2xl shadow-sm shadow-slate-200/50 border-b border-slate-200/50" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2.5 cursor-pointer">
            <Image src="/images/logo.png" alt="logo" width="40" height="40" className="w-9 h-auto" />
            <span className="font-display font-black text-xl tracking-tight text-slate-900">WEBARRAYS</span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-1">
            {["Services", "Process", "Portfolio", "Testimonials", "FAQ"].map((item, i) => (
              <motion.a key={item} href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">
                {item}
              </motion.a>
            ))}
          </nav>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="hidden md:flex items-center gap-3">
            <a href="mailto:hello@webarrays.com" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors">Contact</a>
            <a href="#contact" className="btn-shine px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all duration-300">
              Start Project →
            </a>
          </motion.div>

          <button className="md:hidden p-2 rounded-lg text-slate-700" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 px-6 pb-6">
              {["Services", "Process", "Portfolio", "Testimonials", "FAQ", "Contact"].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="block py-3 font-medium text-slate-700 border-b border-slate-50" onClick={() => setMenuOpen(false)}>{item}</a>
              ))}
              <a href="#contact" className="mt-4 block text-center py-3 rounded-xl bg-indigo-600 text-white font-semibold">Start Project →</a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ══════════════ HERO ══════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg">
        <div className="absolute inset-0 grid-pattern opacity-50" />

        {/* Floating orbs */}
        <div className="absolute top-32 left-16 w-72 h-72 bg-indigo-400/15 blur-[100px] rounded-full floating" />
        <div className="absolute bottom-32 right-16 w-96 h-96 bg-violet-400/15 blur-[120px] rounded-full floating-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-300/10 blur-[150px] rounded-full" />

        {/* Floating badge elements */}
        <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 0.8 }}
          className="absolute left-8 top-1/3 hidden xl:flex items-center gap-3 bg-white/90 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-xl shadow-slate-200/50 border border-white/80 floating">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
            <FaCheckCircle className="text-white text-lg" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Projects Delivered</p>
            <p className="font-display font-black text-slate-900 text-lg leading-none">150+</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute right-8 top-1/3 hidden xl:flex items-center gap-3 bg-white/90 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-xl shadow-slate-200/50 border border-white/80 floating-slow">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <FaStar className="text-white text-lg" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Client Rating</p>
            <p className="font-display font-black text-slate-900 text-lg leading-none">5.0 ★★★★★</p>
          </div>
        </motion.div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center max-w-6xl mx-auto px-6 pt-32 pb-20">
          <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-indigo-100 text-indigo-700 font-semibold text-sm mb-10 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            Pakistan's Premier Software Development Agency
            <span className="text-indigo-400">✦</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-black text-6xl md:text-8xl leading-[0.95] tracking-tight text-slate-900 mb-8">
            We Build Digital<br />
            <span className="text-gradient">Products That</span><br />
            <span className="relative">
              Matter.
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10 Q100 2 200 10 Q300 18 398 10" stroke="url(#underlineGrad)" strokeWidth="3" strokeLinecap="round" fill="none" />
                <defs><linearGradient id="underlineGrad" x1="0" y1="0" x2="400" y2="0"><stop offset="0%" stopColor="#4f46e5" /><stop offset="100%" stopColor="#a855f7" /></linearGradient></defs>
              </svg>
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-12 font-light">
            WEBARRAYS is a full-service agency specializing in <strong className="font-semibold text-slate-800">React</strong>, <strong className="font-semibold text-slate-800">Next.js</strong>, <strong className="font-semibold text-slate-800">Node.js</strong>, and <strong className="font-semibold text-slate-800">React Native</strong>. We turn complex ideas into beautifully engineered software that scales.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#contact" className="btn-shine group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-lg shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1 transition-all duration-300">
              Start Your Project
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#portfolio" className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/80 backdrop-blur-xl text-slate-800 font-bold text-lg border border-slate-200 hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                <FaPlay className="text-indigo-600 text-xs ml-0.5" />
              </div>
              See Our Work
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: 150, suffix: "+", label: "Projects Shipped" },
              { value: 98, suffix: "%", label: "Client Satisfaction" },
              { value: 5, suffix: "★", label: "Average Rating" },
              { value: 4, suffix: "+", label: "Years of Excellence" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/70 backdrop-blur-xl rounded-2xl px-5 py-5 border border-white/80 shadow-sm">
                <p className="font-display font-black text-3xl text-gradient leading-none">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-slate-500 text-sm mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-9 rounded-full border-2 border-slate-300 flex items-start justify-center pt-1.5">
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 rounded-full bg-indigo-400" />
          </div>
        </motion.div>
      </section>

      {/* ══════════════ MARQUEE STRIP ══════════════ */}
      <div className="py-6 bg-slate-900 border-y border-slate-800 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div className="marquee-track flex items-center gap-12 pr-12">
            {["React Development", "Next.js 14", "React Native", "Node.js APIs", "UI/UX Design", "TypeScript", "SaaS Platforms", "Mobile Apps", "Tailwind CSS", "PostgreSQL", "MongoDB", "GraphQL",
              "React Development", "Next.js 14", "React Native", "Node.js APIs", "UI/UX Design", "TypeScript", "SaaS Platforms", "Mobile Apps", "Tailwind CSS", "PostgreSQL", "MongoDB", "GraphQL"
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-4 text-slate-400 font-semibold text-sm uppercase tracking-widest">
                <span className="text-indigo-500">✦</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════ TRUST LOGOS ══════════════ */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-10">Trusted by ambitious companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-6">
            {["NovaTech", "FinFlow", "EduSpark", "CloudBase", "RetailOS", "DataSync"].map((name, i) => (
              <div key={i} className="text-2xl font-display font-black text-slate-200 hover:text-slate-400 transition-colors cursor-default select-none">{name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SERVICES ══════════════ */}
      <section id="services" className="py-32 px-6 bg-[#f8f9ff] relative">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-20">
            <motion.p variants={fadeUp} className="text-xs font-bold text-indigo-600 uppercase tracking-[0.3em] mb-4">What We Do</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-black text-5xl md:text-6xl tracking-tight mb-6 text-slate-900">
              End-to-End <span className="text-gradient">Software</span><br />Solutions
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              From idea validation to production deployment, we provide comprehensive software development services tailored to your unique business requirements.
            </motion.p>
          </motion.div>

          {/* Tab selector for services */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {services.map((s, i) => (
              <button key={i} onClick={() => setActiveTab(i)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === i ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25" : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-200 hover:text-indigo-600"}`}>
                {s.title}
              </button>
            ))}
          </div>

          {/* Featured service display */}
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-8 items-center mb-16 bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-100/50">
              <div>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${services[activeTab].color} flex items-center justify-center text-white text-3xl mb-6 shadow-lg`}>
                  {services[activeTab].icon}
                </div>
                <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider mb-2">{services[activeTab].subtitle}</p>
                <h3 className="font-display font-black text-4xl text-slate-900 mb-4">{services[activeTab].title}</h3>
                <p className="text-slate-600 leading-relaxed text-lg mb-6">{services[activeTab].desc}</p>
                <div className="flex flex-wrap gap-2">
                  {services[activeTab].tags.map((tag, i) => (
                    <span key={i} className={`px-4 py-1.5 ${services[activeTab].bg} text-slate-700 rounded-full text-xs font-bold`}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className={`h-64 md:h-80 rounded-2xl bg-gradient-to-br ${services[activeTab].color} opacity-10 flex items-center justify-center`}>
                <div className={`text-8xl bg-gradient-to-br ${services[activeTab].color} bg-clip-text text-transparent opacity-100`}>
                  {services[activeTab].icon}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Grid overview */}
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div key={i} variants={fadeUp} onClick={() => setActiveTab(i)}
                className={`card-glow group p-7 rounded-2xl bg-white border cursor-pointer transition-all duration-300 ${activeTab === i ? "border-indigo-200 shadow-lg shadow-indigo-100/50" : "border-slate-100 hover:border-slate-200"}`}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white text-xl mb-5 group-hover:scale-110 transition-transform`}>
                  {s.icon}
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════ PROCESS ══════════════ */}
      <section id="process" className="py-32 px-6 bg-slate-950 relative overflow-hidden noise-texture">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 blur-[150px] rounded-full" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-20">
            <motion.p variants={fadeUp} className="text-xs font-bold text-indigo-400 uppercase tracking-[0.3em] mb-4">Our Workflow</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-black text-5xl md:text-6xl tracking-tight text-white mb-6">
              How We Build<br /><span className="text-gradient">Excellence</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-2xl mx-auto">
              Our battle-tested agile methodology ensures rapid delivery, complete transparency, and zero-compromise quality on every project.
            </motion.p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery & Strategy", desc: "Deep-dive requirement analysis, technical architecture planning, scope definition, and timeline estimation. We map every corner before writing a line of code.", icon: "🔭", color: "from-blue-500 to-indigo-500" },
              { step: "02", title: "Design & Prototyping", desc: "User research, wireframing, and high-fidelity Figma prototypes. We validate the UX before development begins — saving time and budget.", icon: "🎨", color: "from-violet-500 to-purple-500" },
              { step: "03", title: "Agile Development", desc: "Two-week sprints with daily standups, weekly demos, and continuous integration. You see real progress every single week.", icon: "⚡", color: "from-indigo-500 to-blue-600" },
              { step: "04", title: "Launch & Growth", desc: "Rigorous QA testing, performance optimization, deployment to production, and hands-on post-launch support. We don't disappear after go-live.", icon: "🚀", color: "from-rose-500 to-pink-500" },
            ].map((item, i) => (
              <motion.div key={i} variants={scaleIn}
                className="relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/8 hover:border-indigo-500/30 transition-all duration-300 group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <div className="font-display font-black text-6xl text-white/5 absolute top-6 right-6">{item.step}</div>
                <h3 className="font-display font-bold text-xl text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                {i < 3 && <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-indigo-500/40" />}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════ PORTFOLIO ══════════════ */}
      <section id="portfolio" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <motion.p variants={fadeUp} className="text-xs font-bold text-indigo-600 uppercase tracking-[0.3em] mb-3">Our Work</motion.p>
              <motion.h2 variants={fadeUp} className="font-display font-black text-5xl md:text-6xl tracking-tight text-slate-900">
                Featured <span className="text-gradient">Projects</span>
              </motion.h2>
            </div>
            <motion.p variants={fadeUp} className="text-slate-500 max-w-sm">Real products, real impact. Each project is built with precision, performance, and purpose.</motion.p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Enterprise Analytics Platform",
                category: "SaaS Dashboard",
                desc: "A real-time B2B analytics platform handling 10M+ data points. Built with Next.js 14, server components, and optimized PostgreSQL queries for sub-100ms response times.",
                tags: ["Next.js", "PostgreSQL", "TypeScript", "Recharts"],
                badge: "SaaS",
                color: "from-blue-600 to-indigo-700",
                emoji: "📊",
                result: "10M+ data points processed daily"
              },
              {
                title: "Headless E-Commerce Platform",
                category: "E-Commerce",
                desc: "A lightning-fast shopping experience with 99 Lighthouse score, headless CMS, and custom cart engine. Increased conversion rate by 43% versus client's previous platform.",
                tags: ["React", "Node.js", "MongoDB", "Stripe"],
                badge: "E-Commerce",
                color: "from-emerald-500 to-teal-600",
                emoji: "🛒",
                result: "+43% conversion rate improvement"
              },
              {
                title: "FinTech Mobile Wallet",
                category: "Mobile App",
                desc: "A secure cross-platform fintech app for seamless money transfers and investment tracking. 4.9 App Store rating with biometric authentication and real-time transaction sync.",
                tags: ["React Native", "TypeScript", "Node.js", "Redis"],
                badge: "Mobile",
                color: "from-violet-600 to-purple-700",
                emoji: "💳",
                result: "4.9★ App Store rating"
              },
              {
                title: "Healthcare SaaS Portal",
                category: "Healthcare Tech",
                desc: "HIPAA-compliant patient management platform serving 200+ clinics. Features intelligent appointment scheduling, telemedicine, and EHR integration.",
                tags: ["Next.js", "GraphQL", "PostgreSQL", "WebRTC"],
                badge: "Healthcare",
                color: "from-rose-500 to-pink-600",
                emoji: "🏥",
                result: "200+ clinics onboarded"
              },
              {
                title: "Real Estate Marketplace",
                category: "PropTech",
                desc: "Full-featured property listing and management platform with advanced search filters, virtual tours, mortgage calculator, and agent CRM built-in.",
                tags: ["React", "Node.js", "MongoDB", "Mapbox"],
                badge: "PropTech",
                color: "from-amber-500 to-orange-600",
                emoji: "🏘️",
                result: "50,000+ active listings"
              },
              {
                title: "EdTech Learning Platform",
                category: "Education",
                desc: "An interactive online learning platform with live classes, AI-powered quiz generation, progress tracking, and certificate issuance. Serves students globally.",
                tags: ["Next.js", "TypeScript", "WebSockets", "Stripe"],
                badge: "EdTech",
                color: "from-cyan-500 to-blue-600",
                emoji: "🎓",
                result: "15,000+ active learners"
              },
            ].map((project, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} scale={1.01} transitionSpeed={2500}
                  className="group h-full rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-lg shadow-slate-100/80 hover:shadow-2xl hover:shadow-slate-200/60 hover:border-slate-200 transition-all duration-500 cursor-pointer">
                  <div className={`relative h-56 bg-gradient-to-br ${project.color} flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10 grid-pattern" />
                    <span className="text-8xl filter drop-shadow-lg group-hover:scale-110 transition-transform duration-500">{project.emoji}</span>
                    <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-bold border border-white/30">{project.badge}</div>
                    <div className="absolute bottom-4 right-4 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-semibold">{project.result}</div>
                  </div>
                  <div className="p-7">
                    <p className="text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">{project.category}</p>
                    <h3 className="font-display font-bold text-xl text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-3">{project.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, j) => (
                        <span key={j} className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold border border-slate-100">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════ TECH STACK ══════════════ */}
      <section id="tech" className="py-24 px-6 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-xs font-bold text-indigo-400 uppercase tracking-[0.3em] mb-4">Our Arsenal</motion.p>
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="font-display font-black text-5xl md:text-6xl text-white mb-6 tracking-tight">
            Built With the<br /><span className="text-gradient">Best Tools</span>
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-slate-400 text-lg mb-16 max-w-2xl mx-auto">
            We carefully select technologies that maximize performance, developer productivity, and long-term maintainability.
          </motion.p>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: <FaReact className="text-[#61DAFB] text-4xl" />, name: "React", category: "Frontend" },
              { icon: <SiNextdotjs className="text-white text-4xl" />, name: "Next.js 14", category: "Framework" },
              { icon: <SiTypescript className="text-[#3178C6] text-4xl" />, name: "TypeScript", category: "Language" },
              { icon: <SiTailwindcss className="text-[#06B6D4] text-4xl" />, name: "Tailwind CSS", category: "Styling" },
              { icon: <FaNodeJs className="text-[#339933] text-4xl" />, name: "Node.js", category: "Backend" },
              { icon: <SiGraphql className="text-[#E10098] text-4xl" />, name: "GraphQL", category: "API" },
              { icon: <SiPostgresql className="text-[#4169E1] text-4xl" />, name: "PostgreSQL", category: "Database" },
              { icon: <SiMongodb className="text-[#47A248] text-4xl" />, name: "MongoDB", category: "Database" },
              { icon: <FaMobileAlt className="text-[#61DAFB] text-4xl" />, name: "React Native", category: "Mobile" },
              { icon: <SiRedis className="text-[#FF4438] text-4xl" />, name: "Redis", category: "Cache" },
              { icon: <SiVercel className="text-white text-4xl" />, name: "Vercel", category: "Deployment" },
              { icon: <FaFigma className="text-[#F24E1E] text-4xl" />, name: "Figma", category: "Design" },
            ].map((tech, i) => (
              <motion.div key={i} variants={scaleIn}
                className="flex flex-col items-center gap-3 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-300 group cursor-default">
                <div className="group-hover:scale-110 transition-transform duration-300">{tech.icon}</div>
                <div>
                  <p className="text-white font-bold text-sm">{tech.name}</p>
                  <p className="text-slate-500 text-xs">{tech.category}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section id="testimonials" className="py-32 px-6 bg-[#f8f9ff] relative">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-20">
            <motion.p variants={fadeUp} className="text-xs font-bold text-indigo-600 uppercase tracking-[0.3em] mb-4">Client Love</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-black text-5xl md:text-6xl tracking-tight text-slate-900 mb-6">
              What Our Clients<br /><span className="text-gradient">Say About Us</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 text-lg max-w-xl mx-auto">
              Don't take our word for it. Here's what the people who matter most — our clients — have to say.
            </motion.p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp}
                className="card-glow bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-100/80 transition-all duration-300">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(t.stars)].map((_, j) => (
                    <FaStar key={j} className="text-amber-400 text-sm" />
                  ))}
                </div>
                <blockquote className="text-slate-700 text-lg leading-relaxed mb-8 font-light italic">
                  "{t.text}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{t.name}</p>
                    <p className="text-slate-500 text-sm">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════ WHY US ══════════════ */}
      <section className="py-24 px-6 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <motion.p variants={fadeUp} className="text-xs font-bold text-indigo-600 uppercase tracking-[0.3em] mb-4">Why WEBARRAYS</motion.p>
              <motion.h2 variants={fadeUp} className="font-display font-black text-5xl tracking-tight text-slate-900 mb-6">
                We're not just<br />developers — <span className="text-gradient">we're your product partners.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-500 text-lg leading-relaxed mb-8">
                Based in Lahore, Pakistan, we serve ambitious clients in the US, UK, UAE, Europe, and beyond. Our team combines world-class technical expertise with a genuine understanding of product strategy and business growth.
              </motion.p>
              <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-4">
                {[
                  "Senior-level engineers on every project — no junior outsourcing",
                  "Full transparency with real-time project tracking access",
                  "Post-launch support & maintenance retainers available",
                  "NDA-friendly with IP ownership transferred to clients",
                  "Timezone-flexible communication for global clients",
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5 shrink-0">
                      <FaCheckCircle className="text-indigo-600 text-xs" />
                    </div>
                    <p className="text-slate-700 font-medium">{item}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <motion.div variants={scaleIn} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="grid grid-cols-2 gap-4">
              {[
                { value: "150+", label: "Projects Delivered", color: "from-blue-500 to-indigo-600" },
                { value: "50+", label: "Happy Clients", color: "from-violet-500 to-purple-600" },
                { value: "4+", label: "Years Experience", color: "from-emerald-500 to-teal-600" },
                { value: "98%", label: "Client Retention", color: "from-amber-500 to-orange-600" },
              ].map((stat, i) => (
                <div key={i} className={`p-8 rounded-2xl bg-gradient-to-br ${stat.color} text-white`}>
                  <p className="font-display font-black text-4xl mb-2">{stat.value}</p>
                  <p className="text-white/80 text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section id="faq" className="py-32 px-6 bg-[#f8f9ff] relative">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-xs font-bold text-indigo-600 uppercase tracking-[0.3em] mb-4">Got Questions?</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-black text-5xl tracking-tight text-slate-900 mb-4">
              Frequently <span className="text-gradient">Asked</span>
            </motion.h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════ CTA BANNER ══════════════ */}
      <section className="py-24 px-6 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-slate-950 to-violet-900/30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/20 blur-[120px] rounded-full" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-5">Ready to Build?</motion.p>
            <motion.h2 variants={fadeUp} className="font-display font-black text-5xl md:text-7xl text-white mb-6 tracking-tight leading-tight">
              Your next great<br />product starts here.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Join 50+ companies that trusted WEBARRAYS to bring their digital vision to life. Let's schedule a free 30-minute discovery call today.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#contact" className="btn-shine inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-slate-900 font-bold text-lg hover:bg-slate-100 hover:-translate-y-1 transition-all duration-300 shadow-2xl">
                Get a Free Quote
                <FaArrowRight />
              </a>
              <a href="mailto:hello@webarrays.com" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/20 text-white font-bold text-lg hover:bg-white/5 hover:-translate-y-1 transition-all duration-300">
                hello@webarrays.com
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ CONTACT ══════════════ */}
      <section id="contact" className="py-32 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100/50 blur-[150px] rounded-full -z-0" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-100/50 blur-[120px] rounded-full -z-0" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <motion.p variants={fadeUp} className="text-xs font-bold text-indigo-600 uppercase tracking-[0.3em] mb-4">Contact Us</motion.p>
              <motion.h2 variants={fadeUp} className="font-display font-black text-5xl md:text-6xl tracking-tight text-slate-900 mb-6 leading-tight">
                Let's build something<br /><span className="text-gradient">incredible together.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-500 text-lg leading-relaxed mb-10">
                Whether you're a startup with a bold idea or an enterprise looking to modernize, we're here to help. Share your project and we'll get back to you within 24 hours.
              </motion.p>

              <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-5">
                {[
                  { icon: "✉️", title: "Email Us", value: "hello@webarrays.com", color: "bg-indigo-50" },
                  { icon: "📍", title: "Location", value: "Lahore, Pakistan — Serving Clients Globally", color: "bg-violet-50" },
                  { icon: "⏰", title: "Response Time", value: "We respond within 24 hours, guaranteed", color: "bg-green-50" },
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center text-xl shrink-0`}>{item.icon}</div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{item.title}</p>
                      <p className="text-slate-500 text-sm">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-10 flex items-center gap-4">
                {[FaTwitter, FaLinkedin, FaGithub].map((Icon, i) => (
                  <a key={i} href="#" className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-indigo-100 text-slate-500 hover:text-indigo-600 flex items-center justify-center transition-all duration-200">
                    <Icon size={18} />
                  </a>
                ))}
              </motion.div>
            </div>

            <motion.div variants={scaleIn} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="bg-white p-10 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100">
              <h3 className="font-display font-bold text-2xl text-slate-900 mb-8">Send Us a Message</h3>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">First Name</label>
                    <input type="text" placeholder="John" className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-900 placeholder:text-slate-400" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Last Name</label>
                    <input type="text" placeholder="Doe" className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-900 placeholder:text-slate-400" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Email Address</label>
                  <input type="email" placeholder="john@company.com" className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-900 placeholder:text-slate-400" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Service Needed</label>
                  <select className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-700 appearance-none">
                    <option value="">Select a service...</option>
                    <option>Web Design & UI/UX</option>
                    <option>React / Next.js Web App</option>
                    <option>React Native Mobile App</option>
                    <option>Backend & API Development</option>
                    <option>SaaS Platform Development</option>
                    <option>SEO & Performance Optimization</option>
                    <option>Full-Stack Project</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Project Details</label>
                  <textarea rows={4} placeholder="Tell us about your project — goals, timeline, budget range..." className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none text-slate-900 placeholder:text-slate-400"></textarea>
                </div>
                <button className="btn-shine w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-base shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all duration-300">
                  Send Message — It's Free ✦
                </button>
                <p className="text-center text-xs text-slate-400">No spam. No commitment. We respond within 24 hours.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-10 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-5">
                <Image src="/images/logo.png" alt="logo" width="40" height="40" className="w-9 h-auto" />
                <span className="font-display font-black text-xl text-white">WEBARRAYS</span>
              </div>
              <p className="text-slate-400 max-w-xs leading-relaxed text-sm mb-6">
                Pakistan's premier software development agency. Building world-class React, Next.js, and React Native solutions for ambitious global clients.
              </p>
              <div className="flex items-center gap-3">
                {[FaTwitter, FaLinkedin, FaGithub].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-indigo-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200">
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: "Services",
                links: ["Web Design & UI/UX", "React Web Apps", "Next.js Development", "Mobile App Development", "Node.js Backend", "SaaS Development", "SEO Optimization"]
              },
              {
                title: "Company",
                links: ["Our Portfolio", "Our Process", "Tech Stack", "About Us", "Careers", "Contact"]
              },
              {
                title: "Contact",
                links: ["hello@webarrays.com", "Lahore, Pakistan", "Available Globally", "Mon–Fri, 9am–6pm PKT"]
              }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link, j) => (
                    <li key={j}><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-sm">© {new Date().getFullYear()} WEBARRAYS. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm text-slate-600">
              <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ─────────────────────────── FAQ ITEM ─────────────────────────── */
function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fadeUp}
      className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${open ? "border-indigo-200 shadow-lg shadow-indigo-100/50" : "border-slate-100"}`}>
      <button onClick={() => setOpen(!open)} className="w-full px-7 py-5 flex items-center justify-between gap-4 text-left">
        <span className="font-bold text-slate-900 text-base">{question}</span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${open ? "bg-indigo-600 text-white rotate-45" : "bg-slate-100 text-slate-600"}`}>
          <span className="text-xl leading-none">+</span>
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            <p className="px-7 pb-6 text-slate-500 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

