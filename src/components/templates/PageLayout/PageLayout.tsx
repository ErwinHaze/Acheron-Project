import { component$, JSX } from '@builder.io/qwik';

interface PageLayoutProps {
  title: string;
  children?: JSX.Element | JSX.Element[];
}

const PageLayout = component$(({ title, children }: PageLayoutProps) => {
  return (
    <div class="page-layout p-4">
      <header class="mb-4 bg-blue-600 text-white p-4 rounded">
        <h1 class="text-2xl font-bold">{title}</h1>
      </header>
      <main class="bg-white p-4 rounded shadow">{children}</main>
    </div>
  );
});

export default PageLayout;
