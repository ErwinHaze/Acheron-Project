import { component$ } from '@builder.io/qwik';
import AuthLayout from '~/components/templates/AuthLayout/AuthLayout';

// Inline VerificationMessage component
const VerificationMessage = component$(() => {
  return (
    <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
      <p>
        Please check your email to verify your account. If you haven't received an email, please check your spam folder or contact support.
      </p>
    </div>
  );
});

export default component$(() => {
  return (
    <AuthLayout title="Verify Your Email">
      <div class="auth-page space-y-6 p-4 sm:max-w-md sm:mx-auto">
        <h2 class="text-2xl font-bold text-center">Verify Your Email Address</h2>
        <p class="text-center text-gray-600">
          We’ve sent a verification link to your email. Please check your inbox and follow the instructions.
        </p>
        {/* Inline Verification Message */}
        <VerificationMessage />
      </div>
    </AuthLayout>
  );
});