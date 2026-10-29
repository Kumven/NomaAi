import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Upload,
  Check,
  MapPin,
  Mail,
  ExternalLink
} from 'lucide-react';
import { initialTeamMembers, type TeamMember } from '../../data/teamData';

interface TeamSectionProps {
  showFullPageLink?: boolean;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ showFullPageLink = true }) => {
  const [members, setMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [activeEditingMember, setActiveEditingMember] = useState<string | null>(null);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [previewSuccess, setPreviewSuccess] = useState(false);

  // Live client-side manual picture replacement
  const handleApplyCustomImage = (memberId: string) => {
    if (!customImageUrl.trim()) return;
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, image: customImageUrl.trim() } : m))
    );
    setPreviewSuccess(true);
    setTimeout(() => {
      setPreviewSuccess(false);
      setActiveEditingMember(null);
      setCustomImageUrl('');
    }, 1200);
  };

  // Local file upload for instant preview
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, memberId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setMembers((prev) =>
        prev.map((m) => (m.id === memberId ? { ...m, image: previewUrl } : m))
      );
      setPreviewSuccess(true);
      setTimeout(() => {
        setPreviewSuccess(false);
        setActiveEditingMember(null);
      }, 1200);
    }
  };

  return (
    <section id="team" className="py-16 sm:py-24 bg-[#EAF7EE]/50 border-t border-[#D5EEDC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D5EEDC] text-xs font-bold text-[#132E1E] shadow-2xs">
              <Users className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span>Leadership, Science & Agronomy</span>
            </div>
            <h2 className="font-extrabold text-3xl sm:text-4xl text-[#132E1E] tracking-tight">
              Meet the NomaAI Team
            </h2>
            <p className="text-sm sm:text-base text-[#526056] leading-relaxed">
              Bridging Nigerian agronomy research with mobile edge AI to protect crops and ensure food security for millions of smallholder families.
            </p>
          </div>

          {showFullPageLink && (
            <Link
              to="/team"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-[#D5EEDC] text-[#132E1E] hover:bg-[#EAF7EE] font-bold text-xs sm:text-sm shadow-xs transition shrink-0"
            >
              <span>View Full Team Directory</span>
              <ExternalLink className="w-4 h-4 text-[#2D6A4F]" />
            </Link>
          )}
        </div>

        {/* Manual Photo Integration Helper Banner */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border-2 border-dashed border-[#2D6A4F]/40 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-[#EAF7EE] text-[#2D6A4F] shrink-0 mt-0.5">
              <Upload className="w-5 h-5" />
            </div>
            <div className="space-y-0.5 text-xs sm:text-sm">
              <span className="font-bold text-[#132E1E] block">
                How to Integrate Team Pictures Manually
              </span>
              <span className="text-[#526056] block">
                1. Place your pictures in <code className="bg-[#EDF7EF] text-[#132E1E] px-1.5 py-0.5 rounded font-mono font-bold text-[11px]">public/images/team/your-photo.jpg</code>
                <br className="hidden sm:inline" />
                2. Edit <code className="bg-[#EDF7EF] text-[#132E1E] px-1.5 py-0.5 rounded font-mono font-bold text-[11px]">src/data/teamData.ts</code> or use the <strong>"Change Photo"</strong> button below for a live preview!
              </span>
            </div>
          </div>
          <Link
            to="/team"
            className="text-xs font-bold text-[#2D6A4F] hover:underline shrink-0"
          >
            Learn more →
          </Link>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl p-5 border border-[#D5EEDC] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Picture Frame with Manual Photo Overlay */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#EDF7EF] border border-[#D5EEDC]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback to placeholder if custom path not found
                      (e.currentTarget as HTMLImageElement).src = '/images/team/placeholder-avatar.svg';
                    }}
                  />

                  {/* Badge */}
                  {member.badge && (
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-xl bg-[#132E1E]/85 backdrop-blur-xs text-white text-[10px] font-bold">
                      {member.badge}
                    </div>
                  )}

                  {/* Change Photo Overlay Button */}
                  <button
                    type="button"
                    onClick={() =>
                      setActiveEditingMember(
                        activeEditingMember === member.id ? null : member.id
                      )
                    }
                    className="absolute bottom-2.5 right-2.5 px-2.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-xs hover:bg-[#F3A83B] text-[#132E1E] text-[11px] font-bold border border-[#D5EEDC] shadow-xs flex items-center gap-1 transition cursor-pointer"
                    title="Change picture manually"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#2D6A4F]" />
                    <span>Change Photo</span>
                  </button>
                </div>

                {/* Inline Manual Picture URL / File Input Modal */}
                {activeEditingMember === member.id && (
                  <div className="p-3 bg-[#F4FAF5] rounded-2xl border border-[#D5EEDC] space-y-2 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#132E1E]">
                      <span>Manual Photo Integration</span>
                      <button
                        type="button"
                        onClick={() => setActiveEditingMember(null)}
                        className="text-stone-400 hover:text-stone-700"
                      >
                        ✕
                      </button>
                    </div>

                    {/* File upload option */}
                    <label className="block w-full py-1.5 px-2.5 bg-white border border-[#D5EEDC] rounded-xl text-[11px] font-semibold text-[#132E1E] text-center hover:bg-[#EAF7EE] cursor-pointer transition">
                      <span className="flex items-center justify-center gap-1.5">
                        <Upload className="w-3.5 h-3.5 text-[#2D6A4F]" />
                        Upload from Computer
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, member.id)}
                        className="hidden"
                      />
                    </label>

                    {/* Image URL input option */}
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        placeholder="Or paste image URL / path..."
                        value={customImageUrl}
                        onChange={(e) => setCustomImageUrl(e.target.value)}
                        className="flex-1 px-2.5 py-1.5 bg-white border border-[#D5EEDC] rounded-xl text-[11px] text-[#132E1E] focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                      />
                      <button
                        type="button"
                        onClick={() => handleApplyCustomImage(member.id)}
                        className="px-2.5 py-1.5 btn-golden rounded-xl text-[11px] font-bold text-[#161513] shrink-0"
                      >
                        {previewSuccess ? <Check className="w-3.5 h-3.5" /> : 'Set'}
                      </button>
                    </div>

                    <p className="text-[10px] text-stone-500 leading-tight">
                      To make permanent: save to <code className="text-[#2D6A4F]">public/images/team/</code> and set path in <code className="text-[#2D6A4F]">teamData.ts</code>.
                    </p>
                  </div>
                )}

                {/* Member Identity */}
                <div className="space-y-1">
                  <h3 className="font-extrabold text-lg text-[#132E1E] leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold text-[#2D6A4F]">
                    {member.role}
                  </p>
                  <p className="text-[11px] text-stone-500 font-medium">
                    {member.department}
                  </p>
                </div>

                {/* Location Pill */}
                <div className="flex items-center gap-1 text-[11px] text-stone-600">
                  <MapPin className="w-3 h-3 text-[#2D6A4F] shrink-0" />
                  <span className="truncate">{member.location}</span>
                </div>

                {/* Bio text area div */}
                <div className="p-3 bg-[#F4FAF5] rounded-2xl border border-[#D5EEDC] text-[11px] text-[#526056] leading-relaxed">
                  {member.bio}
                </div>
              </div>

              {/* Social / Contact Links */}
              <div className="pt-4 mt-4 border-t border-[#D5EEDC] flex items-center justify-between text-stone-400">
                <div className="flex items-center gap-2">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="p-1.5 rounded-lg hover:bg-[#EAF7EE] hover:text-[#2D6A4F] transition"
                      title={member.email}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg hover:bg-[#EAF7EE] hover:text-[#2D6A4F] transition"
                      title="LinkedIn Profile"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 1.54-1.54 1.54 1.54 0 0 0-3.08 0c0 .85.69 1.54 1.54 1.54m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                      </svg>
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg hover:bg-[#EAF7EE] hover:text-[#2D6A4F] transition"
                      title="Twitter / X"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  )}
                </div>

                <span className="text-[10px] font-mono text-stone-400">
                  #{member.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
