// ~/types/models.ts

export type Lab = {
  id: number;
  name: string;
  reputation: number;
  models_count: number;
  papers_count: number;
  funding: number;
  location: string;
  avatar_url: string;
  trending_score: number;
};

export type Category = {
  id: number;
  name: string;
  model_count: number;
  weekly_trend: number;
  dominance: number;
  total_compute_cost: number;
  top_model: string;
  icon_url: string;
  domain?: string;
};

export type Model = {
  id: string;
  name: string;
  description: string;
  documentationUrl?: string;
  repositoryUrl?: string;
  performanceMetrics?: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
  };
  feedback?: Array<{
    id: number;
    userId: string;
    username: string;
    comment: string;
    rating: number;
    createdAt: string;
  }>;
};