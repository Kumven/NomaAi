import React from 'react';
import { Phone, MessageCircle, ShieldCheck, Star, MapPin } from 'lucide-react';
import type { Consultant } from '../../types';
import { generateWhatsAppLink } from '../../services/directoryService';

interface ConsultantCardProps {
  consultant: Consultant;
}

export const ConsultantCard: React.FC<ConsultantCardProps> = ({ consultant }) => {
  const whatsappMsg = `Hello ${consultant.name}, I found your contact on NomaAi Agricultural Advisory platform. I would like agricultural advice regarding my farm in ${consultant.state} State.`;
  const whatsappUrl = generateWhatsAppLink(consultant.whatsapp, whatsappMsg);

  return (
    <div className="bg-white rounded-3xl p-5 border border-stone-200 hover:border-emerald-500 shadow-2xs hover:shadow-md transition-all space-y-4">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-0.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            <span className="font-semibold text-stone-700">{consultant.cityOrLga}, {consultant.state} State</span>
          </div>
          <h3 className="font-extrabold text-stone-900 text-base leading-snug">
            {consultant.name}
          </h3>
          <p className="text-xs font-semibold text-emerald-800 mt-0.5">
            {consultant.role}
          </p>
          <p className="text-[11px] text-stone-500">
            {consultant.organization}
          </p>
        </div>

        <div className="text-right shrink-0">
          <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2 py-0.5 rounded-lg border border-amber-200 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{consultant.rating}</span>
            <span className="text-[10px] text-stone-400">({consultant.reviewsCount})</span>
          </div>
          <span className="text-[10px] font-semibold text-emerald-700 block mt-1">
            {consultant.yearsExperience} yrs exp
          </span>
        </div>
      </div>

      {/* Verified Badge */}
      {consultant.isVerified && (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-bold border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{consultant.badge}</span>
        </div>
      )}

      {/* Specialization Tags */}
      <div className="space-y-1">
        <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
          Crop Focus:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {consultant.specializations.map((spec, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 rounded-lg bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Languages & Fee */}
      <div className="flex items-center justify-between text-xs text-stone-600 pt-2 border-t border-stone-100">
        <div>
          <span className="text-[10px] text-stone-400 uppercase font-bold block">Languages:</span>
          <span className="font-semibold text-stone-800">{consultant.languages.join(', ')}</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-stone-400 uppercase font-bold block">Fee:</span>
          <span className="font-bold text-emerald-800">{consultant.consultationFee}</span>
        </div>
      </div>

      {/* Direct Contact Actions: Phone and WhatsApp */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <a
          href={`tel:${consultant.phone}`}
          className="py-2.5 px-3 rounded-xl border border-stone-300 hover:border-emerald-600 hover:bg-stone-50 text-stone-800 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-700" />
          <span>Call Direct</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
