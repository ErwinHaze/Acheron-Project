import { component$ } from '@builder.io/qwik';
import { useDocumentHead } from '@builder.io/qwik-city';

export const RouterHead = component$(() => {
  const head = useDocumentHead();

  return (
    <>
      {head.title && <title>{head.title}</title>}
      {head.meta.map((meta, index) => (
        <meta key={index} {...meta} />
      ))}
      {head.links.map((link, index) => (
        <link key={index} {...link} />
      ))}
    </>
  );
});
