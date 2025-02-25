// ~/mocks/data.ts
import { Lab, Category, Model } from '~/types/models';

export const mockLabs: Lab[] = [
  {
    id: 1,
    name: 'Lab A',
    reputation: 95,
    models_count: 150,
    papers_count: 200,
    funding: 5000000,
    location: 'New York',
    avatar_url: '',
    trending_score: 85,
  },
  {
    id: 2,
    name: 'Lab B',
    reputation: 88,
    models_count: 120,
    papers_count: 150,
    funding: 3000000,
    location: 'London',
    avatar_url: '',
    trending_score: 72,
  },
];

export const mockCategories: Category[] = [
  {
    id: 1,
    name: 'Category A',
    model_count: 200,
    weekly_trend: 5,
    dominance: 0.3,
    total_compute_cost: 1000000,
    top_model: 'Model X',
    icon_url: '/category-a.jpg',
    domain: 'AI',
  },
  {
    id: 2,
    name: 'Category B',
    model_count: 150,
    weekly_trend: -2,
    dominance: 0.25,
    total_compute_cost: 800000,
    top_model: 'Model Y',
    icon_url: '/category-b.jpg',
    domain: 'ML',
  },
];

export const mockModels: Model[] = [
  {
    id: '1',
    name: 'Model 1',
    description: 'A powerful AI model.',
    documentationUrl: 'https://example.com/docs',
    repositoryUrl: 'https://github.com/example/repo',
    performanceMetrics: {
      accuracy: 0.95,
      precision: 0.9,
      recall: 0.85,
      f1Score: 0.87,
    },
    feedback: [
      {
        id: 1,
        userId: 'user1',
        username: 'User1',
        comment: 'Great model!',
        rating: 5,
        createdAt: new Date().toISOString(),
      },
    ],
  },
  // Add more mock models as needed
];