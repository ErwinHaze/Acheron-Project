// src/components/molecules/IntelligentSearchBar/IntelligentSearchBar.tsx
import { component$ } from '@builder.io/qwik';
import { SearchIcon } from '../../atoms/Icons/SearchIcon';
import { SearchSuggestions } from '../SearchSuggestions/SearchSuggestions';

interface IntelligentSearchBarProps {
  query: string;
  onInput$: (value: string) => void;
}

export const IntelligentSearchBar = component$<IntelligentSearchBarProps>(({ query, onInput$ }) => {
  return (
    <div class="relative">
      <input
        type="text"
        class="w-full p-4 rounded-lg bg-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        placeholder="Search AI models by name, use case, or creator..."
        value={query}
        onInput$={(e) => onInput$((e.target as HTMLInputElement).value)}
      />
      <div class="absolute right-4 top-4">
        <SearchIcon />
      </div>
      
      {/* Autocomplete Suggestions */}
      {query.length > 2 && (
        <SearchSuggestions query={query} />
      )}
    </div>
  );
});