// components/organisms/ActivityFeed/ActivityFeed.tsx
import { component$ } from '@builder.io/qwik';

interface Activity {
  id: string;
  description: string;
  timestamp: number;
}

interface ActivityFeedProps {
  activities: Activity[];
}

export default component$<ActivityFeedProps>(({ activities }) => {
  return (
    <div class="activity-feed">
      {activities.length > 0 ? (
        activities.map((activity) => (
          <div key={activity.id} class="activity-item">
            <p>{activity.description}</p>
            <small>{new Date(activity.timestamp).toLocaleString()}</small>
          </div>
        ))
      ) : (
        <p>No recent activity.</p>
      )}
    </div>
  );
});