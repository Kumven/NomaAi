import { useQuery } from '@tanstack/react-query';
import { fetchWeatherAdvisory } from '../services/weatherService';

export function useWeather(selectedState: string) {
  return useQuery({
    queryKey: ['weather', selectedState],
    queryFn: () => fetchWeatherAdvisory(selectedState),
    staleTime: 1000 * 60 * 15, // 15 minutes cache
    refetchOnWindowFocus: false
  });
}
