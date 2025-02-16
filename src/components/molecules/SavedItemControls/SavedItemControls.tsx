// src/components/organisms/SavedItemControls/SavedItemControls.tsx
import { component$, $ } from '@builder.io/qwik';
import { createClient } from '@supabase/supabase-js';
import { IconButton } from '~/components/atoms/Buttons/IconButton/IconButton';
import { showToast } from '~/utils/toast';
import { EyeIcon } from '~/components/atoms/Icons/EyeIcon';
import { TrashIcon } from '~/components/atoms/Icons/TrashIcon';

interface SavedItemControlsProps {
  modelId: string;
}

export const SavedItemControls = component$<SavedItemControlsProps>(({ modelId }) => {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  const handleRemove = $(async () => {
    const { error } = await supabase
      .from('saved_models')
      .delete()
      .eq('model_id', modelId);
    if (!error) showToast('Model removed from watchlist');
  });

  const openPreview = $(async (id: string) => {
    // Logic to open preview
    console.log(`Opening preview for model ID: ${id}`);
  });

  return (
    <div class="absolute top-2 right-2 flex gap-2">
      <IconButton
        icon={<EyeIcon />}
        label="Preview"
        onClick$={() => openPreview(modelId)}
      />
      <IconButton
        icon={<TrashIcon />}
        label="Remove"
        onClick$={handleRemove}
        class="text-red-500"
      />
    </div>
  );
});