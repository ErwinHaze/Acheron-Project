import { component$ } from '@builder.io/qwik';
import PageLayout from '~/components/templates/PageLayout/PageLayout';

export default component$(() => {
  return (
    <PageLayout title="Terms of Service">
      <div class="terms-page space-y-6">
        {/* Anchor Links */}
        <div class="anchor-links space-x-4 mb-4">
          <a href="#introduction" class="text-blue-600 underline">Introduction</a>
          <a href="#user-responsibilities" class="text-blue-600 underline">User Responsibilities</a>
          <a href="#intellectual-property" class="text-blue-600 underline">Intellectual Property</a>
          <a href="#liability" class="text-blue-600 underline">Limitations of Liability</a>
          <a href="#contact" class="text-blue-600 underline">Contact Us</a>
        </div>

        {/* Introduction */}
        <section id="introduction">
          <h2 class="text-xl font-semibold">Introduction</h2>
          <p>Welcome to our AI webstore. These terms outline the rules and regulations for using our platform.</p>
        </section>

        {/* User Responsibilities */}
        <section id="user-responsibilities">
          <h2 class="text-xl font-semibold">User Responsibilities</h2>
          <p>Users are responsible for ensuring their use of the platform complies with applicable laws and regulations.</p>
        </section>

        {/* Intellectual Property */}
        <section id="intellectual-property">
          <h2 class="text-xl font-semibold">Intellectual Property</h2>
          <p>All content on this platform is protected by intellectual property laws.</p>
        </section>

        {/* Limitations of Liability */}
        <section id="liability">
          <h2 class="text-xl font-semibold">Limitations of Liability</h2>
          <p>We are not liable for any damages arising from the use of this platform.</p>
        </section>

        {/* Contact Information */}
        <section id="contact">
          <h2 class="text-xl font-semibold">Contact Us</h2>
          <p>For questions about these terms, please contact us at <a href="mailto:support@aiwebstore.com" class="text-blue-600 underline">support@aiwebstore.com</a>.</p>
        </section>
      </div>
    </PageLayout>
  );
});