import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Camera,
  Users,
  PhoneCall,
  Home,
  Sprout
} from 'lucide-react';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { PictureStorySection } from '../components/landing/PictureStorySection';
import { TeamSection } from '../components/landing/TeamSection';
import { landingStories } from '../data/landingStories';

const CURRENT_YEAR = new Date().getFullYear();

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#EDF7EF] text-[#1A261D] flex flex-col font-sans selection:bg-[#2D6A4F] selection:text-white">
      {/* 1. Logo at Top & Navigation Bar with About Us Dropdown */}
      <LandingNavbar />

      {/* 2. Hero Section - Classic Sans-Serif Typography */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-[#D5EEDC]">
        {/* Subtle Decorative Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#2D6A4F]/10 via-[#F3A83B]/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-8 text-center">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#D5EEDC] shadow-xs animate-in fade-in slide-in-from-top-4 duration-500">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F] animate-pulse" />
            <span className="text-xs font-black tracking-wide uppercase text-[#132E1E]">
              Nigeria's #1 AI Crop Doctor Platform
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#EAF7EE] text-[10px] font-extrabold text-[#2D6A4F]">
              36 States
            </span>
          </div>

          {/* Main Headline - Classic Sans-Serif */}
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#132E1E] tracking-tight leading-[1.15]">
              Protect Your Harvest with Real-Time <span className="text-[#2D6A4F] underline decoration-[#F3A83B] decoration-wavy decoration-2">AI Crop Advisory</span>
            </h1>
            <p className="text-base sm:text-lg sm:leading-relaxed text-[#526056] max-w-2xl mx-auto font-normal">
              Instant crop disease diagnosis from leaf photos, hyper-local farm weather forecasts, and direct agronomist care — accessible in English, Hausa, Yoruba, Igbo, and Pidgin.
            </p>
          </div>

          {/* Primary Action Buttons: Route to Home Page and Team */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto pt-2">
            {/* Route to Home Page */}
            <Link
              to="/home"
              className="w-full sm:w-auto btn-golden px-7 py-3.5 rounded-2xl text-[#161513] font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg hover:bg-[#E59828] transition-all transform hover:-translate-y-0.5"
            >
              <Home className="w-5 h-5" />
              <span>Launch Home Page (App)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Route to Team Section via About Us */}
            <a
              href="#team"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white border border-[#D5EEDC] hover:bg-[#EAF7EE] text-[#132E1E] font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <Users className="w-5 h-5 text-[#2D6A4F]" />
              <span>Meet the Team</span>
            </a>
          </div>

          {/* Quick Scanner Shortcut */}
          <div className="pt-2">
            <Link
              to="/diagnose"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#2D6A4F] hover:text-[#132E1E] underline decoration-dotted"
            >
              <Camera className="w-4 h-4 text-[#F3A83B]" />
              <span>Have a sick leaf right now? Click to snap & diagnose immediately</span>
            </Link>
          </div>

          {/* Trust Highlights Grid - Classic Sans-Serif */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 text-left">
            <div className="p-3.5 rounded-2xl bg-white/80 border border-[#D5EEDC] shadow-2xs">
              <span className="font-extrabold text-xl sm:text-2xl text-[#132E1E] block">
                24+
              </span>
              <span className="text-[11px] font-semibold text-[#526056] leading-tight block">
                Nigerian Crop Pathologies Detected
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/80 border border-[#D5EEDC] shadow-2xs">
              <span className="font-extrabold text-xl sm:text-2xl text-[#132E1E] block">
                &lt; 3 Sec
              </span>
              <span className="text-[11px] font-semibold text-[#526056] leading-tight block">
                Instant Diagnosis on 2G/3G Speeds
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/80 border border-[#D5EEDC] shadow-2xs">
              <span className="font-extrabold text-xl sm:text-2xl text-[#132E1E] block">
                4 Languages
              </span>
              <span className="text-[11px] font-semibold text-[#526056] leading-tight block">
                Voice Audio in Hausa, Yoruba, Igbo, Pidgin
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/80 border border-[#D5EEDC] shadow-2xs">
              <span className="font-extrabold text-xl sm:text-2xl text-[#132E1E] block">
                100% Free
              </span>
              <span className="text-[11px] font-semibold text-[#526056] leading-tight block">
                Basic AI Scans for Nigerian Smallholders
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 4 Picture Sections with Divs for Text Areas */}
      <section id="stories" className="bg-[#EDF7EF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4 text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF7EE] border border-[#D5EEDC] text-xs font-bold text-[#132E1E]">
            <Sparkles className="w-3.5 h-3.5 text-[#F3A83B]" />
            <span>Field Stories & Impact Across Nigeria</span>
          </div>
          <h2 className="font-extrabold text-3xl sm:text-4xl text-[#132E1E] tracking-tight">
            How NomaAI Transforms Agricultural Livelihoods
          </h2>
          <p className="text-sm text-[#526056] max-w-xl mx-auto">
            From the fertile soils of the Middle Belt to the savanna grain baskets, explore how our technology directly supports farmers every single day.
          </p>
        </div>

        {/* Render each of the 4 picture sections with their customizable text area divs */}
        {landingStories.map((story, index) => (
          <PictureStorySection key={story.id} story={story} index={index} />
        ))}
      </section>

      {/* 4. About Us Section Wrapping the Team Section */}
      <section id="about" className="bg-[#EDF7EF] pt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF7EE] border border-[#D5EEDC] text-xs font-bold text-[#132E1E]">
            <Sprout className="w-3.5 h-3.5 text-[#2D6A4F]" />
            <span>About Us & Our Mission</span>
          </div>
          <h2 className="font-extrabold text-3xl sm:text-4xl text-[#132E1E] tracking-tight">
            Science, Empathy & Nigerian Agriculture
          </h2>
          <p className="text-sm sm:text-base text-[#526056] max-w-2xl mx-auto">
            NomaAI is built by a dedicated team of agronomists, computer vision engineers, and rural extension agents committed to eliminating crop failure across West Africa.
          </p>
        </div>

        {/* Team Section Component with Manual Picture Integration Slot */}
        <TeamSection showFullPageLink={true} />
      </section>

      {/* 5. Bottom Call to Action Banner */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#132E1E] to-[#0A1A10] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto text-3xl">
            🌱
          </div>
          <h2 className="font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Ready to Protect Your Crops Today?
          </h2>
          <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto leading-relaxed">
            Join thousands of Nigerian farmers improving their yields, detecting diseases early, and receiving daily weather farming tips.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/home"
              className="w-full sm:w-auto btn-golden px-8 py-4 rounded-2xl text-[#161513] font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:bg-[#E59828] transition"
            >
              <Home className="w-5 h-5" />
              <span>Go to Home Page (Crop Doctor)</span>
            </Link>
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition flex items-center justify-center gap-2"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-4 flex items-center justify-center gap-2 text-xs text-stone-400">
            <PhoneCall className="w-3.5 h-3.5 text-[#F3A83B]" />
            <span>Toll-Free Farmer Support: +234 800 000 0000 (Mon - Sat 7am - 6pm)</span>
          </div>
        </div>
      </section>

      {/* 6. Footer - Classic Sans-Serif */}
      <footer className="bg-[#0A1A10] border-t border-white/10 py-12 text-stone-400 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#2D6A4F] flex items-center justify-center text-white text-xl">
                🌱
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl text-white tracking-tight">
                  NomaAI
                </span>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#F3A83B]">
                  Smart Crop Doctor Nigeria
                </span>
              </div>
            </div>

            {/* Quick Navigation Routes */}
            <div className="flex flex-wrap items-center gap-6 font-semibold">
              <Link to="/home" className="hover:text-white transition">
                Home Page
              </Link>
              <Link to="/team" className="hover:text-white transition">
                About Us & Team
              </Link>
              <Link to="/diagnose" className="hover:text-white transition">
                Crop Diagnosis
              </Link>
              <Link to="/weather" className="hover:text-white transition">
                Weather Forecasts
              </Link>
              <Link to="/directory" className="hover:text-white transition">
                Agro-Dealers & ADPs
              </Link>
              <Link to="/login" className="hover:text-white transition">
                Sign In
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <p>© {CURRENT_YEAR} NomaAI Agritech Ltd. All rights reserved. Built for Nigerian farmers.</p>
            <p className="text-stone-500">
              Powered by on-device computer vision & localized agronomic intelligence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
