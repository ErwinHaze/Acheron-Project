import { component$, JSX } from '@builder.io/qwik';

// PageLayout component
interface PageLayoutProps {
  title: string;
  children?: JSX.Element | JSX.Element[];
}

const PageLayout = component$(({ title, children }: PageLayoutProps) => {
  return (
    <div class="page-layout p-4">
      <header class="mb-4">
        <h1 class="text-2xl font-bold">{title}</h1>
      </header>
      <main>{children}</main>
    </div>
  );
});

// Timeline component
interface TimelineProps {
  items: { phase: string; status: string; description: string }[];
}

const Timeline = component$(({ items }: TimelineProps) => {
  return (
    <ul class="timeline list-disc pl-5">
      {items.map((item) => (
        <li key={item.phase} class="mb-2">
          <h4 class="font-semibold">{item.phase}</h4>
          <p>Status: {item.status}</p>
          <p>{item.description}</p>
        </li>
      ))}
    </ul>
  );
});

export default component$(() => {
  const roadmapItems = [
    { phase: 'Q1 2024', status: 'Completed', description: 'Launch of AI model marketplace.' },
    { phase: 'Q2 2024', status: 'In Progress', description: 'Integration of real-time analytics.' },
    { phase: 'Q3 2024', status: 'Planned', description: 'AI model playground feature.' },
  ];

  return (
    <PageLayout title="Roadmap">
      <div class="roadmap-page space-y-6">
        {/* Introduction */}
        <section>
          <h2 class="text-xl font-semibold">Roadmap</h2>
          <p>Our vision for the future of the AI webstore. Stay tuned for exciting updates!</p>
        </section>

        {/* Timeline */}
        <section>
          <h3 class="text-lg font-semibold">Upcoming Milestones</h3>
          <Timeline items={roadmapItems} />
        </section>

        {/* Community Involvement */}
        <section>
          <h3 class="text-lg font-semibold">Get Involved</h3>
          <p>We value your feedback! Share your ideas for future features.</p>
        </section>
      </div>
    </PageLayout>
  );
});

// No bugs found.