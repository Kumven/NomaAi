import React, { useState } from 'react';
import { Users, Store, Search, MapPin, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useConsultants, useAgroDealers } from '../hooks/useDirectory';
import { ConsultantCard } from '../components/directory/ConsultantCard';
import { DealerCard } from '../components/directory/DealerCard';
import type { Consultant, AgroDealer } from '../types';

export const DirectoryPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'consultants' | 'dealers'>('consultants');
  const selectedState = 'Plateau';
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: consultants,
    isLoading: loadingConsultants,
    refetch: refetchConsultants
  } = useConsultants(selectedState, '');

  const {
    data: dealers,
    isLoading: loadingDealers,
    refetch: refetchDealers
  } = useAgroDealers(selectedState, '');

  // Filter with client search query
  const filteredConsultants = consultants?.filter((c: Consultant) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.organization.toLowerCase().includes(q) ||
      c.specializations.some((s: string) => s.toLowerCase().includes(q))
    );
  });

  const filteredDealers = dealers?.filter((d: AgroDealer) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      d.businessName.toLowerCase().includes(q) ||
      d.marketLocation.toLowerCase().includes(q) ||
      d.topStock.some((s: string) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-[#132E1E] tracking-tight flex items-center gap-2">
          <Users className="w-6 h-6 text-[#2D6A4F]" />
          <span>{t('directory.title')}</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#526056] leading-relaxed">
          {t('directory.subtitle')}
        </p>
      </div>

      {/* Tabs Switcher: Consultants vs Dealers */}
      <div className="bg-white rounded-3xl p-1.5 border border-[#D5EEDC] shadow-xs flex gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('consultants')}
          className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition cursor-pointer ${
            activeTab === 'consultants'
              ? 'bg-[#132E1E] text-white shadow-xs'
              : 'text-[#526056] hover:text-[#132E1E] hover:bg-[#F4FAF5]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{t('directory.tabConsultants')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('dealers')}
          className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition cursor-pointer ${
            activeTab === 'dealers'
              ? 'bg-[#132E1E] text-white shadow-xs'
              : 'text-[#526056] hover:text-[#132E1E] hover:bg-[#F4FAF5]'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>{t('directory.tabDealers')}</span>
        </button>
      </div>

      {/* Search and Plateau location */}
      <div className="bg-white rounded-3xl p-4 border border-[#D5EEDC] shadow-xs space-y-3">
        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              activeTab === 'consultants'
                ? 'Search by agronomist name, ADP, or crop (e.g. Maize, Cassava)...'
                : 'Search by market, seed brand, fertilizer, or chemicals...'
            }
            className="w-full pl-10 pr-4 py-2.5 bg-[#F4FAF5] rounded-2xl border border-[#D5EEDC] text-xs sm:text-sm text-[#132E1E] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white transition"
          />
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-xl bg-[#EAF7EE] px-3 py-1.5 text-xs font-bold text-[#132E1E]">
          <MapPin className="w-3.5 h-3.5 text-[#2D6A4F]" />
          <span>Plateau State</span>
        </div>
      </div>

      {/* Directory Content List */}
      {activeTab === 'consultants' ? (
        loadingConsultants ? (
          <div className="bg-white rounded-3xl p-8 border border-stone-200 text-center space-y-3">
            <div className="w-8 h-8 rounded-full border-3 border-emerald-600 border-t-transparent animate-spin mx-auto" />
            <p className="text-xs text-stone-600 font-semibold">
              Loading verified extension officers...
            </p>
          </div>
        ) : filteredConsultants && filteredConsultants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredConsultants.map((c) => (
              <ConsultantCard key={c.id} consultant={c} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 border border-stone-200 text-center space-y-3">
            <p className="text-sm font-semibold text-stone-700">
              No extension officers found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                refetchConsultants();
              }}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )
      ) : loadingDealers ? (
        <div className="bg-white rounded-3xl p-8 border border-stone-200 text-center space-y-3">
          <div className="w-8 h-8 rounded-full border-3 border-emerald-600 border-t-transparent animate-spin mx-auto" />
          <p className="text-xs text-stone-600 font-semibold">
            Loading licensed input dealers and commodity markets...
          </p>
        </div>
      ) : filteredDealers && filteredDealers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDealers.map((d) => (
            <DealerCard key={d.id} dealer={d} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 border border-stone-200 text-center space-y-3">
          <p className="text-sm font-semibold text-stone-700">
            No input dealers found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              refetchDealers();
            }}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};
