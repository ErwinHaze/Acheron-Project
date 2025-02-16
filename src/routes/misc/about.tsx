import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import HeroSection from '~/components/organisms/HeroSection/HeroSection';
import MissionVisionSection from '~/components/organisms/MissionVisionSection/MissionVisionSection';
import TeamCarousel from '~/components/organisms/TeamCarousel/TeamCarousel';
import MilestoneTimeline from '~/components/organisms/MilestoneTimeline/MilestoneTimeline';
import PartnersGrid from '~/components/organisms/PartnersGrid/PartnersGrid';
import StatCard from '~/components/molecules/StatCard/StatCard';
import { fetchStats } from '~/api/stats';

export default component$(() => {
  const stats = useSignal({
    totalModels: 0,
    activeLabs: 0,
    userEngagement: 0,
  });

  // Fetch real-time stats from Supabase
  useTask$(async () => {
    const data = await fetchStats();
    stats.value = data;
  });

  return (
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
      <div class="stats-section">
        <h2>Real-Time Insights</h2>
        <div class="stats-grid">
          <StatCard label="AI Models" value={stats.value.totalModels} />
          <StatCard label="Active Labs" value={stats.value.activeLabs} />
          <StatCard label="User Engagement" value={stats.value.userEngagement} />
        </div>
      </div>

      {/* Footer Call-to-Action */}
      <div class="footer-cta">
        <p>Ready to explore the future of AI?</p>
        <a href="/models" class="cta-button">Get Started</a>
      </div>
    </div>
  );
});