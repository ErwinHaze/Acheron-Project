// src/components/molecules/SearchSuggestions/SearchSuggestions.tsx
import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { fetchSearchSuggestions } from '~/api/search';

interface SearchSuggestionsProps {
  query: string;
}

export const SearchSuggestions = component$<SearchSuggestionsProps>(({ query }) => {
  const suggestions = useSignal<string[]>([]);

  useTask$(async () => {
    if (query.length > 2) {
      const data = await fetchSearchSuggestions(query);
      suggestions.value = data;
    } else {
      suggestions.value = [];
    }
  });

  return (
    <div class="absolute w-full mt-1 bg-white shadow-lg rounded-b-lg z-10">
      {suggestions.value.length > 0 ? (
        suggestions.value.map((suggestion) => (
          <div
            key={suggestion}
            class="p-3 cursor-pointer hover:bg-gray-100"
          >
            {suggestion}
          </div>
        ))
      ) : (
        <div class="p-3 text-gray-400">No suggestions</div>
      )}
    </div>
  );
});