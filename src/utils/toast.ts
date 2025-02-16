// src/utils/toast.ts
import { component$, useSignal, useTask$ } from '@builder.io/qwik';

interface ToastProps {
  message: string;
  duration?: number;
}

export const Toast = component$<ToastProps>(({ message, duration = 3000 }) => {
  const isVisible = useSignal(true);

  useTask$(({ track }) => {
    track(() => duration);
    const timer = setTimeout(() => {
      isVisible.value = false;
    }, duration);

    return () => clearTimeout(timer);
  });

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 bg-gray-800 text-white rounded-lg shadow-lg transition-opacity ${
        isVisible.value ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {message}
    </div>
  );
});

export const showToast = (message: string, duration?: number) => {
  const toastContainer = document.createElement('div');
  document.body.appendChild(toastContainer);

  ReactDOM.render(<Toast message={message} duration={duration} />, toastContainer);

  setTimeout(() => {
    toast.unmount();
    ReactDOM.unmountComponentAtNode(toastContainer);
  }, duration || 3000);
};