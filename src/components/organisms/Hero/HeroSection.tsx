import { component$ } from '@builder.io/qwik';

export const HeroSection = component$(() => {
  return (
    <section class="relative h-[400px] flex items-center justify-center bg-black overflow-hidden">
      {/* Background Video or Image */}
      <video autoplay muted loop class="absolute w-full h-full object-cover opacity-50">
        <source src="../public/bg-motion.mp4" type="video/mp4" />
        <source src="../public/bg-motion.webm" type="video/webm" />
        <img
          src="../public/bg-fallback.jpg"
          alt="Background"
          class="absolute w-full h-full object-cover opacity-50"
          width="1920"
          height="1080"
          loading="lazy"
        />
      </video>

      {/* Content */}
      <div class="relative text-center text-white">
        <h1 class="text-5xl font-bold mb-4">Discover the Future of AI</h1>
        <p class="text-xl mb-8">Explore cutting-edge AI models for every need.</p>
        <button class="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
          Get Started
        </button>
      </div>
    </section>
  );
});