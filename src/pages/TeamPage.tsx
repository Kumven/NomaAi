import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Code2, FolderPlus, Image as ImageIcon } from 'lucide-react';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { TeamSection } from '../components/landing/TeamSection';

export const TeamPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#EDF7EF] text-[#1A261D] flex flex-col font-sans selection:bg-[#2D6A4F] selection:text-white">
      {/* Top Logo Navbar */}
      <LandingNavbar />

      {/* Team Page Breadcrumb & Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 w-full">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2D6A4F] hover:text-[#132E1E] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Landing Page</span>
          </Link>

          <Link
            to="/home"
            className="inline-flex items-center gap-1.5 btn-golden px-4 py-2 rounded-xl text-xs font-bold text-[#161513] shadow-xs hover:bg-[#E59828] transition"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home Page (Crop Doctor)</span>
          </Link>
        </div>
      </div>

      {/* Developer / User Guide for Manual Picture Integration */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5EEDC] shadow-sm space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#EAF7EE] text-[#2D6A4F] flex items-center justify-center font-bold">
              📷
            </div>
            <div>
              <h2 className="font-extrabold text-xl sm:text-2xl text-[#132E1E]">
                Team Photo Integration Guide
              </h2>
              <p className="text-xs sm:text-sm text-[#526056]">
                You can easily integrate and customize your team pictures manually in two simple steps:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-[#F4FAF5] border border-[#D5EEDC] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#132E1E]">
                <FolderPlus className="w-4 h-4 text-[#2D6A4F]" />
                <span>Step 1: Save Photo File</span>
              </div>
              <p className="text-[#526056] text-xs leading-relaxed">
                Copy your picture into the folder:
                <br />
                <code className="text-[#2D6A4F] font-mono font-bold block mt-1 bg-white p-1.5 rounded border border-[#D5EEDC]">
                  public/images/team/your-photo.jpg
                </code>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4FAF5] border border-[#D5EEDC] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#132E1E]">
                <Code2 className="w-4 h-4 text-[#2D6A4F]" />
                <span>Step 2: Update Data File</span>
              </div>
              <p className="text-[#526056] text-xs leading-relaxed">
                Open <code className="text-[#2D6A4F] font-mono font-bold">src/data/teamData.ts</code> and update the <code className="font-mono">image</code> field with your photo name:
                <code className="text-[#2D6A4F] font-mono font-bold block mt-1 bg-white p-1.5 rounded border border-[#D5EEDC]">
                  image: '/images/team/your-photo.jpg'
                </code>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4FAF5] border border-[#D5EEDC] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#132E1E]">
                <ImageIcon className="w-4 h-4 text-[#2D6A4F]" />
                <span>Instant In-Browser Preview</span>
              </div>
              <p className="text-[#526056] text-xs leading-relaxed">
                You can also click the <strong>"Change Photo"</strong> button directly on any card below to upload or paste a web URL to preview immediately!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Team Section Component */}
      <TeamSection showFullPageLink={false} />

      {/* Bottom Navigation Ribbon */}
      <div className="bg-white border-t border-[#D5EEDC] py-8 text-center">
        <div className="max-w-md mx-auto px-4 space-y-4">
          <p className="text-xs text-[#526056]">
            Ready to experience the agricultural advisory tool?
          </p>
          <Link
            to="/home"
            className="btn-golden px-6 py-3 rounded-2xl font-bold text-sm text-[#161513] inline-flex items-center gap-2 shadow-xs hover:bg-[#E59828] transition"
          >
            <Home className="w-4 h-4" />
            <span>Launch Home Page (Crop Doctor)</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
