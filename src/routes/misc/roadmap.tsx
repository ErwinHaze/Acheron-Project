import { component$ } from '@builder.io/qwik';
import PageLayout from '~/components/templates/PageLayout/PageLayout';
import Timeline from '~/components/organisms/Timeline/Timeline';

export default component$(() => {
  const roadmapItems = [
    { phase: 'Q1 2024', status: 'Completed', description: 'Launch of AI model marketplace.' },
    { phase: 'Q2 2024', status: 'In Progress', description: 'Integration of real-time analytics.' },
    { phase: 'Q3 2024', status: 'Planned', description: 'AI model playground feature.' },
  ];

  return (
    <PageLayout title="Roadmap">
      <div class="roadmap-page">
        {/* Introduction */}
        <section>
          <h2>Roadmap</h2>
          <p>Our vision for the future of the AI webstore. Stay tuned for exciting updates!</p>
        </section>

        {/* Timeline */}
        <section>
          <h3>Upcoming Milestones</h3>
          <Timeline items={roadmapItems} />
        </section>

        {/* Community Involvement */}
        <section>
          <h3>Get Involved</h3>
          <p>We value your feedback! Share your ideas for future features.</p>
        </section>
      </div>
    </PageLayout>
  );
});