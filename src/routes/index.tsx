import { component$ } from '@builder.io/qwik';
import { Header } from '../components/header/header';
import { Hero } from '../components/Hero/hero';
import { EditorsChoice } from '~/components/editors-choice/editors-choice';
import { CategorySection } from '~/components/category-section/category-section';
import { Footer } from '~/components/Footer/Footer';

export default component$(() => {
  return (
    <>
      <Header />
      <Hero />
      <EditorsChoice />
      <CategorySection />
      <Footer />
    </>
  )
});
