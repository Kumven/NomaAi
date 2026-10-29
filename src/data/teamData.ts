/**
 * ============================================================================
 * NomaAI Team Data Configuration
 * ============================================================================
 * 
 * 👉 HOW TO INTEGRATE YOUR TEAM PICTURES MANUALLY:
 * 1. Place your photo image file (JPG, PNG, or WEBP) into the folder:
 *      public/images/team/
 *    (e.g., public/images/team/aminu-bello.jpg)
 * 
 * 2. In this file below, update the `image` property with the relative path:
 *      image: '/images/team/aminu-bello.jpg'
 * 
 * You can also use direct web image URLs:
 *      image: 'https://example.com/photos/your-photo.jpg'
 * 
 * If no custom image is provided, it falls back to the clean placeholder avatar:
 *      image: '/images/team/placeholder-avatar.svg'
 * ============================================================================
 */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  image: string; // <-- Replace this path with your photo!
  location: string;
  badge?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

export const initialTeamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Dr. Aminu Bello',
    role: 'Co-Founder & Chief Agronomist',
    department: 'Agronomy & Crop Pathology',
    bio: 'Over 15 years specializing in Northern Nigerian cereal and legume pathologies (Maize, Sorghum, Cowpea). Former senior consultant with the National Agricultural Extension and Research Liaison Services (NAERLS), Zaria.',
    // 👉 REPLACE PHOTO HERE:
    image: '/images/team/placeholder-avatar.svg',
    location: 'Zaria, Kaduna State',
    badge: 'Agronomy Lead',
    email: 'aminu.bello@nomaai.ng',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'team-2',
    name: 'Ngozi Okonkwo',
    role: 'Lead AI & Computer Vision Engineer',
    department: 'Artificial Intelligence',
    bio: 'Computer vision specialist focused on mobile edge inference and leaf lesion segmentation in low-connectivity environments. Passionate about applying deep learning to food sovereignty across West Africa.',
    // 👉 REPLACE PHOTO HERE:
    image: '/images/team/placeholder-avatar.svg',
    location: 'Lagos & Abuja, Nigeria',
    badge: 'AI Research',
    email: 'ngozi.o@nomaai.ng',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'team-3',
    name: 'Babajide Adeleke',
    role: 'Head of Rural Outreach & Extension',
    department: 'Field Partnerships & ADPs',
    bio: 'Connects agricultural cooperatives, women farmer associations, and agro-dealers across Oyo, Benue, and Plateau. Pioneer of the NomaAI audio advisory in Hausa, Yoruba, and Pidgin.',
    // 👉 REPLACE PHOTO HERE:
    image: '/images/team/placeholder-avatar.svg',
    location: 'Ibadan, Oyo State',
    badge: 'Farmer Liaison',
    email: 'babajide.a@nomaai.ng',
    twitter: 'https://twitter.com'
  },
  {
    id: 'team-4',
    name: 'Fatima Sanusi',
    role: 'Principal Software Architect',
    department: 'Engineering & Platform',
    bio: 'Architect behind NomaAI mobile-first offline-first engine, payment wallet integration, and TanStack-driven state synchronization. Dedicated to clean, accessible interfaces for users of all literacy levels.',
    // 👉 REPLACE PHOTO HERE:
    image: '/images/team/placeholder-avatar.svg',
    location: 'Kano, Kano State',
    badge: 'Software Lead',
    email: 'fatima.s@nomaai.ng',
    linkedin: 'https://linkedin.com'
  }
];
