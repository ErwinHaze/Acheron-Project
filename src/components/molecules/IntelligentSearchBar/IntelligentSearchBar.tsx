// components/molecules/IntelligentSearchBar.tsx
export const IntelligentSearchBar = component$(({ query, onInput$ }) => {
    return (
      <div class="relative">
        <input
          type="text"
          class="w-full p-4 rounded-lg bg-dark-700 focus:ring-2 focus:ring-primary-500"
          placeholder="Search AI models by name, use case, or creator..."
          value={query}
          onInput$={(e) => onInput$((e.target as HTMLInputElement).value)}
        />
        <div class="absolute right-4 top-4">
          <SearchIcon class="w-6 h-6 text-gray-400" />
        </div>
        
        {/* Autocomplete Suggestions */}
        {query.length > 2 && (
          <SearchSuggestions query={query} />
        )}
      </div>
    );
  });