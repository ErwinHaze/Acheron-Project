export interface Model {
  id: string;
  name: string;
  description: string;
  documentationUrl: string;
  repositoryUrl: string;
  feedback: FeedbackData[];
  performanceMetrics: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
  };
}

export interface FeedbackData {
  id: string;
  userId: string;
  comment: string;
  rating: number;
  createdAt: string;
}
