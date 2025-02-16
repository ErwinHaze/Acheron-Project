// components/organisms/LoginForm/LoginForm.tsx
import { component$, useSignal } from '@builder.io/qwik';
import TextInput from '~/components/atoms/TextInput/TextInput';
import PasswordInput from '~/components/atoms/PasswordInput/PasswordInput';
import Button from '~/components/atoms/Button/Button';

export default component$(({ onSubmit$, isLoading }) => {
  const email = useSignal('');
  const password = useSignal('');

  const handleSubmit = $(() => {
    onSubmit$(email.value, password.value);
  });

  return (
    <form class="login-form" onSubmit$={handleSubmit}>
      <TextInput label="Email" value={email.value} onInput$={(val) => (email.value = val)} />
      <PasswordInput label="Password" value={password.value} onInput$={(val) => (password.value = val)} />
      <Button type="submit" disabled={isLoading}>Login</Button>
    </form>
  );
});