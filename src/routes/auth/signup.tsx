import { component$, useSignal, $ } from '@builder.io/qwik';
import AuthLayout from '~/components/templates/AuthLayout/AuthLayout';
// Removed: import SignupForm from '~/components/organisms/SignupForm/SignupForm';

// Inline SignupForm component
const SignupForm = component$(
  ({ onSubmit$, isLoading }: { onSubmit$: (name: string, email: string, password: string) => void; isLoading: boolean }) => {
    const handleSubmit = $(async (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;
      const name = (target.elements.namedItem("name") as HTMLInputElement).value;
      const email = (target.elements.namedItem("email") as HTMLInputElement).value;
      const password = (target.elements.namedItem("password") as HTMLInputElement).value;
      onSubmit$(name, email, password);
    });
    return (
      <form onSubmit$={handleSubmit} class="space-y-4">
        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          type="submit"
          disabled={isLoading}
          class="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    );
  }
);

export default component$(() => {
  const isLoading = useSignal(false);

  const handleSignup = $(async (name: string, email: string, password: string) => {
    isLoading.value = true;
    try {
      // Supabase signup logic
      console.log('Signing up with:', name, email, password);
      // Trigger email verification
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      isLoading.value = false;
    }
  });

  return (
    <AuthLayout title="Sign Up">
      <div class="auth-page space-y-6 p-4 sm:max-w-md sm:mx-auto">
        <h2 class="text-2xl font-bold text-center">Create Your Account</h2>
        <p class="text-center text-gray-600">
          Join the AI Model Store and start exploring cutting-edge AI tools.
        </p>

        {/* Inline Signup Form */}
        <SignupForm onSubmit$={handleSignup} isLoading={isLoading.value} />
      </div>
    </AuthLayout>
  );
});