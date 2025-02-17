import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import PageLayout from '~/components/templates/PageLayout/PageLayout';
import { StatCard } from '~/components/molecules/StatCard/StatCard';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export const HeroSection = component$((props: HeroSectionProps) => {
  return (
    <div class="hero">
      <h1>{props.title}</h1>
      <p>{props.subtitle}</p>
      <a href={props.ctaLink} class="cta-button">{props.ctaText}</a>
      {/* Existing HeroSection content */}
    </div>
  );
});

// Inlined MissionVisionSection
const MissionVisionSection = component$((props: { mission: string; vision: string }) => {
  return (
    <section class="py-8 px-4 bg-gray-50 rounded-md my-6">
      <div class="mb-4">
        <h2 class="text-2xl font-bold mb-2">Our Mission</h2>
        <p class="text-gray-700">{props.mission}</p>
      </div>
      <div>
        <h2 class="text-2xl font-bold mb-2">Our Vision</h2>
        <p class="text-gray-700">{props.vision}</p>
      </div>
    </section>
  );
});

// Inlined TeamCarousel
const TeamCarousel = component$((props: { teamMembers: { name: string; role: string; bio: string }[] }) => {
  return (
    <section class="py-8 px-4 my-6">
      <h2 class="text-2xl font-bold mb-4">Our Team</h2>
      <div class="flex overflow-x-auto space-x-4">
        {props.teamMembers.map((member, index) => (
          <div key={index} class="min-w-[200px] bg-white shadow rounded p-4">
            <h3 class="font-semibold text-lg">{member.name}</h3>
            <p class="text-sm text-gray-500">{member.role}</p>
            <p class="mt-2 text-gray-700 text-sm">{member.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
});

// Inlined MilestoneTimeline
const MilestoneTimeline = component$((props: { milestones: { year: number; event: string }[] }) => {
  return (
    <section class="py-8 px-4 my-6">
      <h2 class="text-2xl font-bold mb-4">Milestones & Achievements</h2>
      <ul class="border-l-2 border-gray-300 pl-4">
        {props.milestones.map((milestone, idx) => (
          <li key={idx} class="mb-4">
            <span class="text-xl font-bold text-blue-600">{milestone.year}</span>
            <p class="ml-2 text-gray-700">{milestone.event}</p>
          </li>
        ))}
      </ul>
    </section>
  );
});

// Inlined PartnersGrid
const PartnersGrid = component$((props: { partners: string[] }) => {
  return (
    <section class="py-8 px-4 my-6">
      <h2 class="text-2xl font-bold mb-4">Our Partners</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {props.partners.map((src, idx) => (
          <div key={idx} class="border p-2 flex items-center justify-center bg-white">
            <img src={src} alt={`Partner ${idx + 1}`} class="object-contain h-12" />
          </div>
        ))}
      </div>
    </section>
  );
});

export async function fetchStats() {
  // Replace with actual API call logic if needed
  return {
    totalModels: 100,
    activeLabs: 50,
    userEngagement: 2000,
  };
}

export default component$(() => {
  const stats = useSignal({ totalModels: 0, activeLabs: 0, userEngagement: 0 });
  const isLoading = useSignal(true);
  const error = useSignal('');

  useTask$(async () => {
    try {
      const data = await fetchStats();
      stats.value = data;
    } catch (e: any) {
      error.value = e.message || 'Failed to fetch stats';
    } finally {
      isLoading.value = false;
    }
  });

  return (
    <PageLayout title="About Us">
      <div class="about-page">
        {/* Hero Section */}
        <HeroSection
          title="Empowering the Future of AI"
          subtitle="Discover, Explore, and Innovate with Cutting-Edge AI Models"
          ctaText="Explore AI Models"
          ctaLink="/models"
        />

        {/* Mission & Vision Section */}
        <MissionVisionSection
          mission="Our mission is to democratize access to AI by providing a platform where developers, researchers, and businesses can discover and deploy AI models effortlessly."
          vision="We envision a world where AI is accessible to everyone, driving innovation and solving real-world problems."
        />

        {/* Our Team Section */}
        <TeamCarousel
          teamMembers={[
            { name: 'John Doe', role: 'Founder & CEO', bio: 'Visionary leader in AI innovation.' },
            { name: 'Jane Smith', role: 'Head of Research', bio: 'Expert in machine learning algorithms.' },
            { name: 'Alex Johnson', role: 'Lead Developer', bio: 'Specializes in scalable AI solutions.' },
          ]}
        />

        {/* Milestones & Achievements Section */}
        <MilestoneTimeline
          milestones={[
            { year: 2020, event: 'Launched the first version of the AI webstore.' },
            { year: 2021, event: 'Partnered with top AI labs globally.' },
            { year: 2022, event: 'Reached 1 million active users.' },
            { year: 2023, event: 'Introduced real-time analytics for AI models.' },
          ]}
        />

        {/* Partnerships & Collaborations Section */}
        <PartnersGrid
          partners={['partner1.png', 'partner2.png', 'partner3.png']}
        />

        {/* Real-Time Stats Section */}
        <div class="stats-section py-6">
          <h2 class="text-2xl font-bold mb-4">Real-Time Insights</h2>
          {isLoading.value ? (
            <div class="text-center text-gray-500">Loading stats...</div>
          ) : error.value ? (
            <div class="text-center text-red-500">{error.value}</div>
          ) : (
            <div class="stats-grid grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard label="AI Models" value={stats.value.totalModels} />
              <StatCard label="Active Labs" value={stats.value.activeLabs} />
              <StatCard label="User Engagement" value={stats.value.userEngagement} />
            </div>
          )}
        </div>

        {/* Footer Call-to-Action */}
        <div class="footer-cta mt-8 text-center">
          <p class="mb-2">Ready to explore the future of AI?</p>
          <a href="/models" class="cta-button bg-blue-600 text-white font-semibold px-4 py-2 rounded">
            Get Started
          </a>
        </div>
      </div>
    </PageLayout>
  );
});