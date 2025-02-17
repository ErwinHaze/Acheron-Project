export const fetchStats = async () => {
  // In a real application, replace this with actual fetching logic (using fetch or a Supabase client).
  return new Promise<{ totalModels: number; activeLabs: number; userEngagement: number }>(resolve => {
    setTimeout(() => {
      resolve({
        totalModels: 100,
        activeLabs: 20,
        userEngagement: 300,
      });
    }, 500);
  });
};
