export interface SEOLink {
  url: string;
  tier: 1 | 2;
  targetUrl?: string;
  title: string;
}

export interface RankingProgress {
  date: string;
  position: number;
}

export interface KeywordData {
  keyword: string;
  currentPosition: number;
  previousPosition: number;
  history: RankingProgress[];
  goal: string;
}

export interface DashboardData {
  branding: string;
  tier1Links: SEOLink[];
  tier2Links: SEOLink[];
  keywords: KeywordData[];
  siteRanking: KeywordData;
}
