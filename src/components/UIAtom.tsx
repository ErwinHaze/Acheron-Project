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
  value?: string | number | [number, number];
  onChange$?: (value: string | number | [number, number]) => void;
  onClick$?: () => void;
  onDismiss$?: () => void;
  icon?: 'chevron-down' | 'clock' | 'eye' | 'info' | 'search' | 'sort' | 'trash' | 'trend-up' | 'trend-down' | 'verified';
  label?: string;
  category?: string;
  min?: number;
  max?: number;
  title?: string;
  class?: string;
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
  const val = useSignal(value);
  const touchStart = useSignal(0);

  // Sync value changes for slider, range-slider, filter.
  useTask$(({ track }) => {
    if (type === 'slider' || type === 'range-slider' || type === 'filter') {
      track(() => val.value);
      if (onChange$) onChange$(val.value);
    }
  });

  // Badge colors based on category.
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

  // Minimal icon SVG paths.
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
            class="w-full h-1 rounded-lg bg-gray-300 accent-blue-500 focus:outline-none transition-colors"
            onChange$={(e) => val.value = parseFloat((e.target as HTMLInputElement).value)}
          />
          <div class="mt-1 text-xs text-gray-600 text-center font-medium">{val.value}%</div>
        </div>
      )}

      {type === 'range-slider' && (
        <div class={`relative h-8 ${className}`}>
          <div class="absolute top-3 w-full h-1 bg-gray-300 rounded-lg">
            <div
              class="absolute h-1 bg-blue-500 rounded-lg transition-all"
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
            class="absolute w-full top-1 h-1 bg-transparent appearance-none focus:outline-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 transition"
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
            class="absolute w-full top-1 h-1 bg-transparent appearance-none focus:outline-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 transition"
            onInput$={(e) => {
              const newMax = Math.max(Number((e.target as HTMLInputElement).value), (val.value as [number, number])[0] + 1);
              val.value = [(val.value as [number, number])[0], newMax];
            }}
          />
          <div class="mt-4 flex justify-between text-xs text-gray-600 font-medium">
            <span>{(val.value as [number, number])[0]}</span>
            <span>{(val.value as [number, number])[1]}</span>
          </div>
        </div>
      )}

      {type === 'button' && (
        <button
          class={`px-4 py-2 bg-white border border-gray-300 text-gray-800 rounded-md shadow-sm hover:bg-gray-50 transition ${className}`}
          onClick$={onClick$}
        >
          {label || <Slot />}
        </button>
      )}

      {type === 'fab' && (
        <button
          class={`fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition ${className}`}
          onClick$={onClick$}
        >
          {label || '+'}
        </button>
      )}

      {type === 'icon-button' && (
        <button
          class={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition ${className}`}
          onClick$={onClick$}
          aria-label={label}
        >
          {icon && <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icons[icon]}</svg>}
          {label && <span class="text-sm font-medium">{label}</span>}
        </button>
      )}

      {type === 'badge' && category && (
        <span class={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${getBadgeColor(category)} ${className}`}>
          {icon === 'verified' ? (
            <span class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icons['verified']}</svg>
              {category}
            </span>
          ) : category}
        </span>
      )}

      {type === 'filter' && (
        <select
          class={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${className}`}
          value={val.value as string}
          onChange$={(e) => val.value = (e.target as HTMLSelectElement).value}
        >
          {['', 'nlp', 'cv', 'rl', 'other'].map((opt) => (
            <option key={opt} value={opt}>{opt || 'All'}</option>
          ))}
        </select>
      )}

      {type === 'facet' && (
        <div class={`p-4 rounded-lg bg-white shadow-sm border border-gray-200 ${className}`}>
          {title && <h3 class="text-base font-semibold mb-2">{title}</h3>}
          <Slot />
        </div>
      )}

      {type === 'icon' && icon && (
        <svg class={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icons[icon]}
        </svg>
      )}

      {type === 'loader' && (
        <div class={label === 'skeleton' ? `bg-gray-300 h-4 w-full animate-pulse rounded ${className}` : `animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500 ${className}`} />
      )}

      {type === 'swipeable' && (
        <div
          class={`transition-transform ${className}`}
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
