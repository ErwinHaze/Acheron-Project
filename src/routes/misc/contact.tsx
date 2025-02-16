import { component$, useSignal, $ } from '@builder.io/qwik';
import PageLayout from '~/components/templates/PageLayout/PageLayout';
import ContactForm from '~/components/organisms/ContactForm/ContactForm';

export default component$(() => {
  const formData = useSignal({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = $(() => {
    console.log('Form submitted:', formData.value);
    // Add logic to send form data (e.g., via email or API)
  });

  return (
    <PageLayout title="Contact Us">
      <div class="contact-page">
        {/* Introduction */}
        <section>
          <h2>Contact Us</h2>
          <p>We’d love to hear from you! Reach out with questions, feedback, or partnership inquiries.</p>
        </section>

        {/* Contact Form */}
        <section>
          <h3>Send Us a Message</h3>
          <ContactForm formData={formData} onSubmit$={handleSubmit} />
        </section>

        {/* Alternative Contact Methods */}
        <section>
          <h3>Other Ways to Reach Us</h3>
          <ul>
            <li>Email: <a href="mailto:support@aiwebstore.com">support@aiwebstore.com</a></li>
            <li>Phone: +1 (800) 123-4567</li>
            <li>Social Media: <a href="https://twitter.com/aiwebstore">Twitter</a>, <a href="https://linkedin.com/company/aiwebstore">LinkedIn</a></li>
          </ul>
        </section>
      </div>
    </PageLayout>
  );
});