// ~/hooks/models.ts
import { useSignal, useVisibleTask$, useTask$ } from '@builder.io/qwik';
import { mockLabs, mockCategories, mockModels } from '~/mocks/data';
import type { Lab, Category, Model } from '~/types/models';

// Hook to fetch and manage lab data
export const useLabsData = () => {
  const labs = useSignal<Lab[]>([]);
  const isLoading = useSignal(true);
  const error = useSignal<string | null>(null);

  useVisibleTask$(() => {
    // Simulate data fetching with a delay
    setTimeout(() => {
      labs.value = mockLabs;
      isLoading.value = false;
    }, 1000); // Simulate network delay
  });

  return { value: labs.value, isLoading: isLoading.value, error: error.value };
};

// Hook to fetch and manage category data
export const useCategoriesData = () => {
  const categories = useSignal<Category[]>([]);
  const isLoading = useSignal(true);
  const error = useSignal<string | null>(null);

  useVisibleTask$(() => {
    // Simulate data fetching with a delay
    setTimeout(() => {
      categories.value = mockCategories;
      isLoading.value = false;
    }, 1000); // Simulate network delay
  });

  return { value: categories.value, isLoading: isLoading.value, error: error.value };
};

// Hook to fetch and manage model data by modelId
export const useModelData = (modelId: string) => {
  const model = useSignal<Model | null>(null);
  const isLoading = useSignal(true);
  const error = useSignal<string | null>(null);

  useTask$(({ track }) => {
    track(() => modelId);
    if (modelId) {
      isLoading.value = true;
      error.value = null;
      try {
        const foundModel = mockModels.find((m) => m.id === modelId);
        if (foundModel) {
          model.value = foundModel;
        } else {
          error.value = 'Model not found';
        }
      } catch (err) {
        error.value = 'Failed to load model details';
      } finally {
        isLoading.value = false;
      }
    }
  });

  return { value: model.value, isLoading: isLoading.value, error: error.value };
};