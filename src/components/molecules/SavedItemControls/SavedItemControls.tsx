// components/molecules/SavedItemControls.tsx
export const SavedItemControls = component$(({ modelId }) => {
    const supabase = createClient();
    
    const handleRemove = $(async () => {
      const { error } = await supabase
        .from('saved_models')
        .delete()
        .eq('model_id', modelId);
      
      if (!error) showToast('Model removed from watchlist');
    });
  
    return (
      <div class="absolute top-2 right-2 flex gap-2">
        <IconButton
          icon="eye"
          label="Preview"
          onClick$={() => openPreview(modelId)}
        />
        <IconButton
          icon="trash"
          label="Remove"
          onClick$={handleRemove}
          class="text-red-500"
        />
      </div>
    );
  });