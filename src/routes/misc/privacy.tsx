import { component$, Slot } from '@builder.io/qwik';
import PageLayout from '~/components/templates/PageLayout/PageLayout';

export default component$(() => {
  return (
    <PageLayout title="Privacy Policy">
      <div class="privacy-page space-y-6">
        {/* Introduction */}
        <section>
          <h2 class="text-xl font-semibold">Introduction</h2>
          <p>We collect data to improve your experience on our platform. This policy explains how we handle your information.</p>
        </section>

        {/* Data Collection */}
        <section>
          <h2 class="text-xl font-semibold">Data Collection</h2>
          <ul class="list-disc pl-5">
            <li><strong>Cookies:</strong> Used to enhance site functionality.</li>
            <li><strong>Analytics:</strong> Tracks usage patterns to improve the platform.</li>
            <li><strong>User Input:</strong> Data provided during account creation or interactions.</li>
          </ul>
        </section>

        {/* User Rights */}
        <section>
          <h2 class="text-xl font-semibold">Your Rights</h2>
          <p>You have the right to access, delete, or opt out of data collection. Contact us for assistance.</p>
        </section>

        {/* Third-Party Sharing */}
        <section>
          <h2 class="text-xl font-semibold">Third-Party Sharing</h2>
          <p>We share data only with trusted partners for analytics and service improvements.</p>
        </section>

        {/* Updates to Policy */}
        <section>
          <h2 class="text-xl font-semibold">Updates to Policy</h2>
          <p>We will notify you of any changes to this policy via email or a site announcement.</p>
        </section>
      </div>
    </PageLayout>
  );
});