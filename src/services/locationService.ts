import type { LocationCoordinates } from '../types';

export interface StateGeoInfo {
  state: string;
  capital: string;
  hub: string;
  lat: number;
  lng: number;
  zone: string;
  lgas: string[];
}

export const PLATEAU_STATE: StateGeoInfo = {
  state: 'Plateau',
  capital: 'Jos',
  hub: 'Jos / Bokkos Highland',
  lat: 9.8965,
  lng: 8.8583,
  zone: 'North Central',
  lgas: [
    'Barkin Ladi', 'Bassa', 'Bokkos', 'Jos East', 'Jos North', 'Jos South',
    'Kanam', 'Kanke', 'Langtang North', 'Langtang South', 'Mangu', 'Mikang',
    'Pankshin', "Qua'an Pan", 'Riyom', 'Shendam', 'Wase'
  ]
};

export function requestBrowserLocation(): Promise<LocationCoordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: LocationCoordinates = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracyMeters: pos.coords.accuracy
        };
        resolve(coords);
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  });
}
