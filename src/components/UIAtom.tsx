// src/components/atoms/UIAtom.tsx
import { component$, Slot, useSignal, useTask$ } from '@builder.io/qwik';

interface UIAtomProps {
  type: 
    | 'slider' 
    | 'range-slider' 
    | 'button' 
    | 'fab' 
    | 'icon-button' 
    | 'badge' 
    | 'filter' 
    | 'facet' 
    | 'icon' 
    | 'loader' 
    | 'swipeable';
  value?: string | number | [number, number]; // For slider/range-slider/filter
  onChange$?: (value: string | number | [number, number]) => void; // For slider/range-slider/filter
  onClick$?: () => void; // For buttons
  onDismiss$?: () => void; // For swipeable
  icon?: 'chevron-down' | 'clock' | 'eye' | 'info' | 'search' | 'sort' | 'trash' | 'trend-up' | 'trend-down' | 'verified'; // For icon/icon-button
  label?: string; // For button/icon-button/badge
  category?: string; // For badge/filter
  min?: number; // For range-slider
  max?: number; // For range-slider
  title?: string; // For facet
  class?: string; // Optional additional classes
}

export const UIAtom = component$<UIAtomProps>(({
  type,
  value = type === 'range-slider' ? [0, 100] : '',
  onChange$,
  onClick$,
  onDismiss$,
  icon,
  label,
  category,
  min = 0,
  max = 100,
  title,
  class: className = '',
}) => {
  const val = useSignal(value); // Single value for slider/filter
  const touchStart = useSignal(0); // For swipeable

  // Sync value changes
  useTask$(({ track }) => {
    if (type === 'slider' || type === 'range-slider' || type === 'filter') {
      track(() => val.value);
      if (onChange$) onChange$(val.value);
    }
  });

  // Badge colors
  const getBadgeColor = (cat: string = '') => {
    const colors: Record<string, string> = {
      'ML': 'bg-blue-100 text-blue-800',
      'NLP': 'bg-green-100 text-green-800',
      'CV': 'bg-purple-100 text-purple-800',
      'RL': 'bg-orange-100 text-orange-800',
      'GAI': 'bg-pink-100 text-pink-800',
    };
    return colors[cat] || 'bg-gray-100 text-gray-800';
  };

  // Icon SVGs (minimal paths)
  const icons = {
    'chevron-down': <path d="M6 9l6 6 6-6" />,
    'clock': <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 14v-4H9" />,
    'eye': <path d="M12 4c5 0 9 8 9 8s-4 8-9 8-9-8-9-8 4-8 9-8zm0 10a2 2 0 100-4 2 2 0 000 4z" />,
    'info': <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 4v2m0 4v6" />,
    'search': <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    'sort': <path d="M3 6h18M6 12h12M9 18h6" />,
    'trash': <path d="M6 6h12v2H6zm2 4h8v8H8z" />,
    'trend-up': <path d="M3 18l9-9 4 4 5-5" fill="green" />,
    'trend-down': <path d="M3 6l9 9 4-4 5 5" fill="red" />,
    'verified': <path d="M20 6L9 17l-5-5" fill="blue" />,
  };

  return (
    <>
      {type === 'slider' && (
        <div class={`relative ${className}`}>
          <input
            type="range"
            min={0}
            max={100}
            value={val.value as number}
            class="w-full h-1 bg-gray-200 rounded appearance-none"
            onChange$={(e) => val.value = parseFloat((e.target as HTMLInputElement).value)}
          />
          <div class="mt-1 text-xs text-gray-600">{val.value}%</div>
        </div>
      )}

      {type === 'range-slider' && (
        <div class={`relative h-8 ${className}`}>
          <div class="absolute top-2 w-full h-1 bg-gray-200 rounded">
            <div
              class="absolute h-1 bg-blue-500 rounded"
              style={{
                left: `${((val.value as [number, number])[0] - min) / (max - min) * 100}%`,
                width: `${(((val.value as [number, number])[1] - (val.value as [number, number])[0]) / (max - min)) * 100}%`,
              }}
            />
          </div>
          <input
            type="range"
            min={min}
            max={max}
            value={(val.value as [number, number])[0]}
            class="absolute w-full top-1 h-1 bg-transparent appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
            onInput$={(e) => {
              const newMin = Math.min(Number((e.target as HTMLInputElement).value), (val.value as [number, number])[1] - 1);
              val.value = [newMin, (val.value as [number, number])[1]];
            }}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={(val.value as [number, number])[1]}
            class="absolute w-full top-1 h-1 bg-transparent appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
            onInput$={(e) => {
              const newMax = Math.max(Number((e.target as HTMLInputElement).value), (val.value as [number, number])[0] + 1);
              val.value = [(val.value as [number, number])[0], newMax];
            }}
          />
          <div class="mt-4 flex justify-between text-xs text-gray-600">
            <span>{(val.value as [number, number])[0]}</span>
            <span>{(val.value as [number, number])[1]}</span>
          </div>
        </div>
      )}

      {type === 'button' && (
        <button
          class={`px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 ${className}`}
          onClick$={onClick$}
        >
          {label || <Slot />}
        </button>
      )}

      {type === 'fab' && (
        <button
          class={`fixed bottom-2 right-2 p-2 bg-pink-500 text-white rounded-full shadow hover:bg-pink-600 ${className}`}
          onClick$={onClick$}
        >
          {label || '+'}
        </button>
      )}

      {type === 'icon-button' && (
        <button
          class={`flex items-center gap-1 p-1 rounded hover:bg-gray-100 ${className}`}
          onClick$={onClick$}
          aria-label={label}
        >
          {icon && <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icons[icon]}</svg>}
          {label && <span class="text-xs">{label}</span>}
        </button>
      )}

      {type === 'badge' && category && (
        <span class={`px-1 py-0.5 rounded-full text-xs ${getBadgeColor(category)} ${className}`}>
          {icon === 'verified' ? (
            <span class="flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icons['verified']}</svg>
              {category}
            </span>
          ) : category}
        </span>
      )}

      {type === 'filter' && (
        <select
          class={`w-full p-1 border rounded ${className}`}
          value={val.value as string}
          onChange$={(e) => val.value = (e.target as HTMLSelectElement).value}
        >
          {['', 'nlp', 'cv', 'rl', 'other'].map((opt) => (
            <option key={opt} value={opt}>{opt || 'All'}</option>
          ))}
        </select>
      )}

      {type === 'facet' && (
        <div class={`p-2 rounded bg-gray-100 ${className}`}>
          {title && <h3 class="text-sm font-semibold mb-1">{title}</h3>}
          <Slot />
        </div>
      )}

      {type === 'icon' && icon && (
        <svg class={`w-4 h-4 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icons[icon]}
        </svg>
      )}

      {type === 'loader' && (
        <div class={label === 'skeleton' ? `bg-gray-200 h-4 w-full animate-pulse ${className}` : `animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500 ${className}`} />
      )}

      {type === 'swipeable' && (
        <div
          class={className}
          onTouchStart$={(e) => touchStart.value = e.touches[0].clientX}
          onTouchEnd$={(e) => {
            if (touchStart.value - e.changedTouches[0].clientX > 100) onDismiss$?.();
          }}
        >
          <Slot />
        </div>
      )}
    </>
  );
});