import {
    Layers, Sparkles, Briefcase, Zap,
    Receipt, FileText, CheckSquare, Calculator,
    BookOpen, Brain, GraduationCap, Mic, LineChart,
    ShieldCheck, Users, PenTool, Globe, Calendar,
    Coins, ShoppingCart, Gamepad2, Play, LayoutTemplate
} from 'lucide-react';

export const ecosystemCategories = [
    {
        category: "Enterprise & Business",
        icon: <Briefcase className="w-5 h-5 text-primary-DEFAULT" />,
        apps: [
            { name: "SNISHOP ERP", url: "http://erp.snishop.com/", desc: "All-in-one business operating system for MSMEs.", logo: <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e711957c86e922f92ad49f/a236b74f4_Logosnishopbirupanjang.png" className="w-12 h-auto object-contain" alt="SNISHOP" />, image: "/projects/snishop.png" },
            { name: "AutoInvoice", url: "https://invoice.snishop.com", desc: "Automated billing and invoicing infrastructure.", logo: <Receipt className="w-6 h-6" />, image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800&h=500" },
            { name: "FormEase", url: "https://formease.snishop.com", desc: "Dynamic form builder and data collection.", logo: <FileText className="w-6 h-6" />, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=500" },
            { name: "TaskDay", url: "https://taskday.snishop.com", desc: "Enterprise project and task management.", logo: <CheckSquare className="w-6 h-6" />, image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=800&h=500" },
            { name: "KasirinAI", url: "https://kasirin.snishop.com", desc: "Smart AI cashier and POS system.", logo: <Calculator className="w-6 h-6" />, image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800&h=500" },
            { name: "CatatanID", url: "https://catatan.snishop.com", desc: "Secure digital note-taking and documentation.", logo: <BookOpen className="w-6 h-6" />, image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800&h=500" }
        ]
    },
    {
        category: "Artificial Intelligence",
        icon: <Sparkles className="w-5 h-5 text-accent-electric" />,
        apps: [
            { name: "TODOIT AI", url: "https://todoit.snishop.com", desc: "AI-powered productivity and financial planner.", logo: <Brain className="w-6 h-6" />, image: "/projects/todoit.png" },
            { name: "Budgy AI", url: "https://budgyai.vercel.app/", desc: "Intelligent budget tracking and forecasting suite.", logo: <Sparkles className="w-6 h-6" />, image: "/projects/budgyai.png" },
            { name: "StudeeAI", url: "https://studee.snishop.com", desc: "AI learning assistant for students.", logo: <GraduationCap className="w-6 h-6" />, image: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?auto=format&fit=crop&q=80&w=800&h=500" },
            { name: "VoiceScribe", url: "https://scribe.snishop.com", desc: "AI voice transcription and meeting notes.", logo: <Mic className="w-6 h-6" />, image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=800&h=500" },
            { name: "FineEaseAI", url: "https://fineease.snishop.com", desc: "Generative AI assistant for finance automation.", logo: <LineChart className="w-6 h-6" />, image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800&h=500" }
        ]
    },
    {
        category: "Education & Utilities",
        icon: <Layers className="w-5 h-5 text-primary-light" />,
        apps: [
            { name: "Cek Turnitin", url: "https://turnitin.snishop.com", desc: "Plagiarism checker and academic integrity tool.", logo: <ShieldCheck className="w-6 h-6" />, image: "/projects/turnitin.png" },
            { name: "TeamMath", url: "https://teammath.snishop.com", desc: "Collaborative mathematical problem solver.", logo: <Users className="w-6 h-6" />, image: "https://images.unsplash.com/photo-1596495578065-6f076336224e?auto=format&fit=crop&q=80&w=800&h=500" },
            { name: "Snidesain", url: "https://desain.snishop.com", desc: "Lightweight graphic design and mockups.", logo: <PenTool className="w-6 h-6" />, image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800&h=500" },
            { name: "Bangunweb", url: "https://bangunweb.snishop.com", desc: "No-code website builder and hosting.", logo: <Globe className="w-6 h-6" />, image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800&h=500" },
            { name: "Snijadwalin", url: "https://jadwalin.snishop.com", desc: "Automated scheduling and calendar booking.", logo: <Calendar className="w-6 h-6" />, image: "/projects/jadwalin.png" },
            { name: "CryptoCurrent.ID", url: "https://cryptocurrent.id", desc: "Cryptocurrency education and media platform.", logo: <Coins className="w-6 h-6" />, image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=800&h=500" }
        ]
    },
    {
        category: "Digital Services",
        icon: <Zap className="w-5 h-5 text-yellow-500" />,
        apps: [
            { name: "CoTrade", url: "https://cotrade.snishop.com", desc: "B2B/B2C marketplace for students and SMEs.", logo: <ShoppingCart className="w-6 h-6" />, image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800&h=500" },
            { name: "PPOB SNISHOP", url: "https://ppob.snishop.com", desc: "Digital payment and bill aggregator.", logo: <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e711957c86e922f92ad49f/a236b74f4_Logosnishopbirupanjang.png" className="w-12 h-auto object-contain" alt="SNISHOP" />, image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80&w=800&h=500" },
            { name: "TopUp Game", url: "https://topup.snishop.com", desc: "Instant game voucher and top-up center.", logo: <Gamepad2 className="w-6 h-6" />, image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=500" },
            { name: "Sninonton", url: "https://nonton.snishop.com", desc: "Curated entertainment streaming aggregator.", logo: <Play className="w-6 h-6" />, image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=800&h=500" }
        ]
    }
];

export const dockApps = [
    { name: "ERP", icon: <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e711957c86e922f92ad49f/a236b74f4_Logosnishopbirupanjang.png" className="w-8 h-auto object-contain" alt="SNISHOP" />, url: "http://erp.snishop.com/", color: "bg-primary-DEFAULT" },
    { name: "TODOIT AI", icon: <Sparkles className="w-5 h-5 text-white" />, url: "https://todoit.snishop.com", color: "bg-accent-electric" },
    { name: "CoTrade", icon: <Zap className="w-5 h-5 text-white" />, url: "https://cotrade.snishop.com", color: "bg-yellow-500" },
    { name: "Budgy AI", icon: <Sparkles className="w-5 h-5 text-white" />, url: "https://budgyai.vercel.app/", color: "bg-purple-500" },
];
