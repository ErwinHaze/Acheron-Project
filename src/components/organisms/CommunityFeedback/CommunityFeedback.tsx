import { component$ } from '@builder.io/qwik';

interface CommunityFeedbackProps {
  feedback: {
    user: string;
    comment: string;
    rating: number;
  }[];
}

export default component$<CommunityFeedbackProps>(({ feedback }) => {
  return (
    <div class="community-feedback bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 class="text-xl font-semibold mb-2">Community Feedback</h2>
      <ul class="space-y-4">
        {feedback.map((item, index) => (
          <li key={index} class="border-b pb-2">
            <div class="flex justify-between items-center">
              <span class="font-medium">{item.user}</span>
              <span class="text-yellow-500">{'★'.repeat(item.rating)}</span>
            </div>
            <p class="text-gray-700">{item.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
});
