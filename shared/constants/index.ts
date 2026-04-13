export const APP_NAME = 'CivicCare AI';

export const SCHEME_CATEGORIES = [
  'Healthcare',
  'Education',
  'Agriculture',
  'Housing',
  'Employment',
  'Social Welfare'
] as const;

export const API_ENDPOINTS = {
  AUTH: '/auth',
  SCHEMES: '/schemes',
  CHAT: '/chatbot',
  DOCUMENTS: '/documents'
};
