import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import type { StorySectionData } from '../../data/landingStories';

interface PictureStorySectionProps {
  story: StorySectionData;
  index: number;
}

export const PictureStorySection: React.FC<PictureStorySectionProps> = ({ story, index }) => {
  const isReversed = story.reverseLayout ?? index % 2 === 1;

  return (
    <section className="py-12 sm:py-20 border-b border-[#D5EEDC] last:border-b-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
            isReversed ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Picture Column */}
          <div
            className={`lg:col-span-6 relative ${
              isReversed ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            <div className="relative group">
              {/* Decorative Background Accent */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#2D6A4F]/20 via-[#F3A83B]/15 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition duration-500 opacity-80" />

              {/* Main Image Frame */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#D5EEDC] shadow-2xl bg-white aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src={story.imageSrc}
                  alt={story.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Floating Image Badge */}
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-xl bg-[#132E1E]/85 backdrop-blur-md text-white text-xs font-bold border border-white/20 shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#F3A83B]" />
                  <span>NomaAI Field Surveillance</span>
                </div>

                {/* Corner Stat Badge if defined */}
                {story.statBox && (
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#D5EEDC] shadow-lg flex items-center gap-3">
                    <span className="font-extrabold text-2xl text-[#132E1E]">
                      {story.statBox.value}
                    </span>
                    <span className="text-[11px] font-semibold text-[#526056] max-w-[120px] leading-tight">
                      {story.statBox.label}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Divs for Text Area Column */}
          <div
            className={`lg:col-span-6 space-y-5 ${
              isReversed ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            {/* Category / Badge Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF7EE] border border-[#D5EEDC] text-xs font-bold text-[#132E1E]">
              {story.badge}
            </div>

            {/* Editorial Header - Classic Sans-Serif */}
            <div className="space-y-2">
              <h2 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#132E1E] tracking-tight leading-snug">
                {story.title}
              </h2>
              <p className="text-sm sm:text-base font-medium text-[#2D6A4F]">
                {story.subtitle}
              </p>
            </div>

            {/* Div for Text Area 1: Primary Narrative */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D5EEDC] shadow-xs hover:border-[#2D6A4F]/40 transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2D6A4F]">
                  Field Context & Challenge
                </span>
                <span className="text-[10px] text-stone-400 font-mono">
                  [Text Area 1]
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#1A261D] leading-relaxed">
                {story.narrativeDiv1}
              </p>
            </div>

            {/* Div for Text Area 2: Solution & Impact */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F4FAF5] border border-[#D5EEDC] shadow-xs hover:border-[#2D6A4F]/40 transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#132E1E]">
                  NomaAI Agronomic Impact
                </span>
                <span className="text-[10px] text-stone-400 font-mono">
                  [Text Area 2]
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#526056] leading-relaxed">
                {story.narrativeDiv2}
              </p>
            </div>

            {/* Bullet Points Highlights */}
            <ul className="space-y-2 pt-1">
              {story.bulletPoints.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#132E1E]">
                  <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                  <span className="font-medium">{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Action Route CTA */}
            <div className="pt-2">
              <Link
                to={story.ctaLink}
                className="inline-flex items-center gap-2 btn-golden px-5 py-3 rounded-2xl text-[#161513] font-bold text-xs sm:text-sm hover:bg-[#E59828] shadow-sm hover:shadow transition"
              >
                <span>{story.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
