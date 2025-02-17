import { component$, useSignal, $ } from '@builder.io/qwik';
import AuthLayout from '~/components/templates/AuthLayout/AuthLayout';

interface AuthLayoutProps {
  title: string;
  children?: any;
}

// New ForgotPasswordForm component with Tailwind CSS styling
const ForgotPasswordForm = component$(
  ({ onSubmit$, isLoading }: { onSubmit$: (email: string) => void; isLoading: boolean }) => {
    const handleSubmit = $(async (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const email = (target.elements.namedItem("email") as HTMLInputElement).value;
      onSubmit$(email);
    });
    return (
      <form onSubmit$={handleSubmit} class="space-y-4">
        <input
          type="email"
          required
          name="email"
          placeholder="Email"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          type="submit"
          disabled={isLoading}
          class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    );
  }
);

export default component$(() => {
  const isLoading = useSignal(false);

  const handleForgotPassword = $(async (email: string) => {
    isLoading.value = true;
    try {
      // Supabase forgot password logic
      console.log('Sending password reset email to:', email);
    } catch (error) {
      console.error('Password reset failed:', error);
    } finally {
      isLoading.value = false;
    }
  });

  return (
    <AuthLayout title="Forgot Your Password?">
      <div class="auth-page space-y-6">
        <h2 class="text-2xl font-bold text-center">Reset Your Password</h2>
        <p class="text-center text-gray-600">
          Enter your email address to receive a password reset link.
        </p>
        {/* Forgot Password Form */}
        <ForgotPasswordForm onSubmit$={handleForgotPassword} isLoading={isLoading.value} />
      </div>
    </AuthLayout>
  );
});