export interface RiskRequest  {
    title: string;
    description: string;
    probability: number;
    impact: number;
    providerId: number;
    countryCode: string;
}