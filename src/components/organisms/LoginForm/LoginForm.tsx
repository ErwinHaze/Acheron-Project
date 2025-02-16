// src/components/organisms/LoginForm/LoginForm.tsx
import { component$, useSignal, $ } from '@builder.io/qwik';

interface LoginFormProps {
  onSubmit$: (email: string, password: string) => void;
  isLoading: boolean;
}

export default component$<LoginFormProps>(({ onSubmit$, isLoading }) => {
  const email = useSignal('');
  const password = useSignal('');

  const handleSubmit = $(() => {
    onSubmit$(email.value, password.value);
  });

  return (
    <form class="login-form" onSubmit$={handleSubmit}>
      {/* Email Input */}
      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input
          type="email"
          id="email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your email"
          value={email.value}
          onInput$={(e) => (email.value = (e.target as HTMLInputElement).value)}
        />
      </div>

      {/* Password Input */}
      <div class="mb-6">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
        <input
          type="password"
          id="password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your password"
          value={password.value}
          onInput$={(e) => (password.value = (e.target as HTMLInputElement).value)}
        />
      </div>

      {/* Submit Button */}
      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </div>
    </form>
  );
});