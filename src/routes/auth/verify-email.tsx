import { component$ } from '@builder.io/qwik';
import AuthLayout from '~/components/templates/AuthLayout/AuthLayout';
import VerificationMessage from '~/components/molecules/VerificationMessage/VerificationMessage';

export default component$(() => {
  return (
    <AuthLayout title="Verify Your Email">
      <div class="auth-page">
        <h2>Verify Your Email Address</h2>
        <p>We’ve sent a verification link to your email. Please check your inbox and follow the instructions.</p>

        {/* Verification Message */}
        <VerificationMessage />
      </div>
    </AuthLayout>
  );
});