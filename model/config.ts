//BACKEND URL
export const BASE_URL_BACKEND = 'https://onfekoi-server.vercel.app/'
export const BASE_URL_CLIENT = 'https://onfekoi-client.vercel.app/'

//BACKEND ENV VAR
const BACK_END_MODE = process.env.EXPO_PUBLIC_BACKEND === 'Vercel';

export const featureFlags: { [key: string]: boolean } = {
  // backend
  isDeployed: BACK_END_MODE
};

// Helper function to check features
export const isFeatureEnabled = (feature: string) => {
  return featureFlags[feature] ?? false;
};
