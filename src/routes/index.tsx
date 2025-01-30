import { component$ } from '@builder.io/qwik';
import { Header } from '../components/header/header';
import { Hero } from '../components/Hero/hero';
import { EditorsChoice } from '~/components/editors-choice/editors-choice';
import { CategorySection } from '~/components/category-section/category-section';
import { Footer } from '~/components/Footer/Footer';
import { ModelCard } from '~/components/model-card/model-card';
import { EmptyLine } from '~/components/empty-line/empty-line';

export default component$(() => {
  return (
    <>
      <Header />
      <EmptyLine />
      <Hero />
      <EmptyLine />
      <ModelCard />
      <EmptyLine />
      <EditorsChoice />
      <EmptyLine />
      <CategorySection />
      <EmptyLine />
      <Footer />
    </>
  )
});
