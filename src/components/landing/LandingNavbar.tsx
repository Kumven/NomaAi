import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Menu,
  X,
  Users,
  Home,
  ChevronDown,
  Sparkles,
  BookOpen,
  Sprout
} from 'lucide-react';

export const LandingNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileAboutExpanded, setMobileAboutExpanded] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const isTeamPage = location.pathname === '/team';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleScrollTo = (id: string) => {
    setAboutDropdownOpen(false);
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#EDF7EF]/95 backdrop-blur-md border-b border-[#D5EEDC] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo at the Top - Classic Sans-Serif */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-[#132E1E] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-all">
            <span className="text-2xl">🌱</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-black text-2xl tracking-tight text-[#132E1E] leading-none">
              NomaAI
            </span>
            <span className="text-[10px] font-extrabold tracking-widest uppercase text-[#2D6A4F] mt-1">
              Smart Crop Doctor • Nigeria
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7">
          {/* Link 1: Home Page (Crop Doctor App Hub) */}
          <Link
            to="/home"
            className="flex items-center gap-2 text-sm font-bold text-[#132E1E] hover:text-[#2D6A4F] px-3.5 py-2 rounded-xl hover:bg-white/70 transition"
          >
            <Home className="w-4 h-4 text-[#2D6A4F]" />
            <span>Home Page</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#EAF7EE] text-[#132E1E] border border-[#D5EEDC] font-semibold">
              App
            </span>
          </Link>

          {/* Link 2: About Us Dropdown containing Team Section */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setAboutDropdownOpen(true)}
            onMouseLeave={() => setAboutDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
              className={`flex items-center gap-1.5 text-sm font-bold px-3.5 py-2 rounded-xl transition cursor-pointer ${
                aboutDropdownOpen || isTeamPage
                  ? 'bg-white text-[#132E1E] shadow-2xs border border-[#D5EEDC]'
                  : 'text-[#132E1E] hover:text-[#2D6A4F] hover:bg-white/70'
              }`}
              aria-expanded={aboutDropdownOpen}
            >
              <span>About Us</span>
              <ChevronDown
                className={`w-4 h-4 text-[#2D6A4F] transition-transform duration-200 ${
                  aboutDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu Card */}
            {aboutDropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-72 bg-white rounded-2xl border border-[#D5EEDC] shadow-xl p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                {/* Dropdown Item 1: Team Section (Primary) */}
                <Link
                  to="/team"
                  onClick={() => setAboutDropdownOpen(false)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#EAF7EE] transition group"
                >
                  <div className="p-2 rounded-lg bg-[#EAF7EE] text-[#2D6A4F] group-hover:bg-[#132E1E] group-hover:text-white transition">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#132E1E]">
                        Team Section
                      </span>
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#F3A83B] text-[#161513]">
                        Team
                      </span>
                    </div>
                    <p className="text-[11px] text-[#526056] leading-tight mt-0.5">
                      Meet our agronomists, AI engineers, and rural leaders.
                    </p>
                  </div>
                </Link>

                {/* Dropdown Item 2: Jump to In-Page Team Section */}
                <button
                  type="button"
                  onClick={() => handleScrollTo('team')}
                  className="w-full text-left flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F4FAF5] transition group cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-[#F4FAF5] text-[#2D6A4F] group-hover:bg-[#EAF7EE] transition">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#132E1E] block">
                      In-Page Team & Photo Area
                    </span>
                    <span className="text-[11px] text-[#526056] leading-tight block mt-0.5">
                      Scroll to team cards with manual photo upload slot.
                    </span>
                  </div>
                </button>

                {/* Dropdown Item 3: Mission & Vision */}
                <button
                  type="button"
                  onClick={() => handleScrollTo('about')}
                  className="w-full text-left flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F4FAF5] transition group cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-[#F4FAF5] text-[#2D6A4F] group-hover:bg-[#EAF7EE] transition">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#132E1E] block">
                      Our Agricultural Mission
                    </span>
                    <span className="text-[11px] text-[#526056] leading-tight block mt-0.5">
                      Protecting Nigerian farm yields and food security.
                    </span>
                  </div>
                </button>

                {/* Dropdown Item 4: Field Stories */}
                <button
                  type="button"
                  onClick={() => handleScrollTo('stories')}
                  className="w-full text-left flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F4FAF5] transition group cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-[#F4FAF5] text-[#2D6A4F] group-hover:bg-[#EAF7EE] transition">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#132E1E] block">
                      Field Impact Stories
                    </span>
                    <span className="text-[11px] text-[#526056] leading-tight block mt-0.5">
                      Photo stories from Nigerian farming communities.
                    </span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Link 3: Field Stories Shortcut */}
          <button
            type="button"
            onClick={() => handleScrollTo('stories')}
            className="text-sm font-semibold text-[#526056] hover:text-[#132E1E] transition cursor-pointer"
          >
            Field Stories
          </button>

          {/* Link 4: Sign In */}
          <Link
            to="/login"
            className="text-sm font-bold text-[#132E1E] hover:text-[#2D6A4F] px-2 py-2 transition"
          >
            Sign In
          </Link>

          {/* Golden Call to Action Button */}
          <Link
            to="/signup"
            className="btn-golden px-5 py-2.5 rounded-2xl text-[#161513] font-bold text-sm flex items-center gap-2 hover:bg-[#E59828] shadow-sm hover:shadow transition-all"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            to="/home"
            className="btn-golden px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#161513] flex items-center gap-1 shadow-xs"
          >
            <Home className="w-3.5 h-3.5" />
            <span>App</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-white border border-[#D5EEDC] text-[#132E1E] hover:bg-[#EAF7EE] transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#D5EEDC] px-5 py-4 space-y-3 shadow-xl">
          {/* Mobile Home Page Link */}
          <Link
            to="/home"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-2xl bg-[#EAF7EE] text-[#132E1E] font-bold text-sm"
          >
            <div className="flex items-center gap-2.5">
              <Home className="w-4 h-4 text-[#2D6A4F]" />
              <span>Go to Home Page (Crop Doctor)</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#2D6A4F]" />
          </Link>

          {/* Mobile About Us Accordion (Contains Team Section) */}
          <div className="rounded-2xl border border-[#D5EEDC] overflow-hidden bg-[#F4FAF5]">
            <button
              type="button"
              onClick={() => setMobileAboutExpanded(!mobileAboutExpanded)}
              className="w-full flex items-center justify-between p-3.5 font-bold text-sm text-[#132E1E] text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#2D6A4F]" />
                <span>About Us</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-[#2D6A4F] transition-transform duration-200 ${
                  mobileAboutExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            {mobileAboutExpanded && (
              <div className="p-2.5 pt-0 space-y-1.5 border-t border-[#D5EEDC]/60 bg-white">
                {/* Team Section in mobile dropdown */}
                <Link
                  to="/team"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#EAF7EE] text-[#132E1E] font-bold text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2D6A4F]" />
                    <span>Team Section (Directory & Photos)</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#2D6A4F]" />
                </Link>

                <button
                  type="button"
                  onClick={() => handleScrollTo('team')}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-[#F4FAF5] text-xs font-semibold text-[#526056] block"
                >
                  • In-Page Team & Manual Photo Slot
                </button>

                <button
                  type="button"
                  onClick={() => handleScrollTo('about')}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-[#F4FAF5] text-xs font-semibold text-[#526056] block"
                >
                  • Our Agricultural Mission
                </button>
              </div>
            )}
          </div>

          {/* Field Stories */}
          <button
            type="button"
            onClick={() => handleScrollTo('stories')}
            className="w-full text-left p-3 rounded-2xl hover:bg-[#F4FAF5] text-[#526056] font-semibold text-sm block"
          >
            Field Impact Stories
          </button>

          {/* Auth Buttons */}
          <div className="pt-2 border-t border-[#D5EEDC] flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-sm font-bold text-[#132E1E] rounded-xl hover:bg-[#EAF7EE]"
            >
              Sign In to Farm Account
            </Link>
            <Link
              to="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-center text-sm font-bold btn-golden text-[#161513] rounded-2xl shadow-xs"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
