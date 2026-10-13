import React from 'react';
import { Phone, MessageCircle, Store, MapPin, CheckCircle2, CreditCard, Clock } from 'lucide-react';
import type { AgroDealer } from '../../types';
import { generateWhatsAppLink } from '../../services/directoryService';

interface DealerCardProps {
  dealer: AgroDealer;
}

export const DealerCard: React.FC<DealerCardProps> = ({ dealer }) => {
  const whatsappMsg = `Hello ${dealer.businessName}, I found your shop on NomaAi Agricultural Platform. I am inquiring about input availability at your store in ${dealer.marketLocation}.`;
  const whatsappUrl = generateWhatsAppLink(dealer.whatsapp, whatsappMsg);

  return (
    <div className="bg-white rounded-3xl p-5 border border-stone-200 hover:border-emerald-500 shadow-2xs hover:shadow-md transition-all space-y-4">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-0.5">
            <Store className="w-3.5 h-3.5 text-emerald-700" />
            <span className="font-semibold text-stone-700">{dealer.marketLocation}</span>
          </div>
          <h3 className="font-extrabold text-stone-900 text-base leading-snug">
            {dealer.businessName}
          </h3>
          <p className="text-xs font-semibold text-emerald-800 mt-0.5">
            Proprietor: {dealer.ownerName}
          </p>
          <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
            <span className="line-clamp-1">{dealer.fullAddress}</span>
          </p>
        </div>

        <span className="px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] font-bold shrink-0">
          {dealer.category}
        </span>
      </div>

      {/* Verified Badge */}
      {dealer.verifiedDealer && (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50 text-blue-900 text-xs font-bold border border-blue-200">
          <CheckCircle2 className="w-4 h-4 text-blue-600" />
          <span>Licensed Input Dealer</span>
        </div>
      )}

      {/* Products Stocked */}
      <div className="space-y-1">
        <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
          Currently Stocked Inputs:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {dealer.topStock.map((prod, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 rounded-lg bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200"
            >
              • {prod}
            </span>
          ))}
        </div>
      </div>

      {/* Extra info: transfers and hours */}
      <div className="flex items-center justify-between text-[11px] text-stone-600 pt-2 border-t border-stone-100">
        <div className="flex items-center gap-1 text-emerald-800 font-semibold">
          <CreditCard className="w-3.5 h-3.5" />
          <span>Bank Transfer Accepted</span>
        </div>
        <div className="flex items-center gap-1 text-stone-500">
          <Clock className="w-3.5 h-3.5" />
          <span>{dealer.openingHours}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <a
          href={`tel:${dealer.phone}`}
          className="py-2.5 px-3 rounded-xl border border-stone-300 hover:border-emerald-600 hover:bg-stone-50 text-stone-800 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-700" />
          <span>Call Shop</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp Stock</span>
        </a>
      </div>
    </div>
  );
};
