import { useQuery } from '@tanstack/react-query';
import { fetchDirectoryConsultants, fetchDirectoryDealers } from '../services/directoryService';

export function useConsultants(stateFilter = '', specialtyFilter = '') {
  return useQuery({
    queryKey: ['consultants', stateFilter, specialtyFilter],
    queryFn: () => fetchDirectoryConsultants(stateFilter, specialtyFilter),
    staleTime: 1000 * 60 * 30 // 30 minutes
  });
}

export function useAgroDealers(stateFilter = '', categoryFilter = '') {
  return useQuery({
    queryKey: ['dealers', stateFilter, categoryFilter],
    queryFn: () => fetchDirectoryDealers(stateFilter, categoryFilter),
    staleTime: 1000 * 60 * 30
  });
}
