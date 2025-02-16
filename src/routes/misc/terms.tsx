import { component$ } from '@builder.io/qwik';
import PageLayout from '~/components/templates/PageLayout/PageLayout';

export default component$(() => {
  return (
    <PageLayout title="Terms of Service">
      <div class="terms-page">
        {/* Anchor Links */}
        <div class="anchor-links">
          <a href="#introduction">Introduction</a>
          <a href="#user-responsibilities">User Responsibilities</a>
          <a href="#intellectual-property">Intellectual Property</a>
          <a href="#liability">Limitations of Liability</a>
          <a href="#contact">Contact Us</a>
        </div>

        {/* Introduction */}
        <section id="introduction">
          <h2>Introduction</h2>
          <p>Welcome to our AI webstore. These terms outline the rules and regulations for using our platform.</p>
        </section>

        {/* User Responsibilities */}
        <section id="user-responsibilities">
          <h2>User Responsibilities</h2>
          <p>Users are responsible for ensuring their use of the platform complies with applicable laws and regulations.</p>
        </section>

        {/* Intellectual Property */}
        <section id="intellectual-property">
          <h2>Intellectual Property</h2>
          <p>All content on this platform is protected by intellectual property laws.</p>
        </section>

        {/* Limitations of Liability */}
        <section id="liability">
          <h2>Limitations of Liability</h2>
          <p>We are not liable for any damages arising from the use of this platform.</p>
        </section>

        {/* Contact Information */}
        <section id="contact">
          <h2>Contact Us</h2>
          <p>For questions about these terms, please contact us at <a href="mailto:support@aiwebstore.com">support@aiwebstore.com</a>.</p>
        </section>
      </div>
    </PageLayout>
  );
});