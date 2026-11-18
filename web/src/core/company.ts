/** Who makes the MSA Trainer. The imprint lines are the ones from the company website, word for word. */

export const COMPANY = {
  short: "DCS Analytics",
  place: "Rangsdorf bei Berlin",
  name: "DCS Analytics & Digital Consultancy Services",
  division: "Geschäftsbereich der Universe Connect KG",
  address: "Sachsenkorso 23, 15834 Rangsdorf",
  phone: "0049 175 979 73 08",
  email: "info@digitalconsultancysolutions.com",
  registration: "Untern. NR. 050 / 203 / 09875",
  owner: "Inhaber: Arne Bailliere",
  website: "https://www.dcs-analytics.net",
  websiteLabel: "www.dcs-analytics.net",
} as const;

const env = (import.meta as { env?: Record<string, string | undefined> }).env ?? {};
export const APP_VERSION = env.VITE_APP_VERSION ?? "";
