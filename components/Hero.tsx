
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Button from './Button';

interface HeroProps {
  onCtaClick?: () => void;
}

const HERO_SLIDES = [
  {
    title: "Timeless Elegance",
    subtitle: "Spring/Summer Collection 2024",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1920&q=80",
    cta: "Explore Collection"
  },
  {
    title: "Masterful Tailoring",
    subtitle: "Bespoke Stitching for Every Occasion",
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1920&q=80",
    cta: "Book a Fitting"
  },
  {
    title: "Royal Heritage",
    subtitle: "Intricate Hand-Work & Authentic Fabrics",
    image: "https://images.unsplash.com/photo-1598411037744-8025287f354f?auto=format&fit=crop&w=1920&q=80",
    cta: "Shop The Craft"
  }
];

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-matteBlack/80 via-matteBlack/40 to-transparent" />
          </div>
          
          <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-start text-white">
            <p className="text-elegantGold uppercase tracking-[4px] font-bold text-sm mb-4 animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              {slide.subtitle}
            </p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl luxury-heading mb-8 max-w-2xl leading-tight animate-fade-in opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              {slide.title}
            </h2>
            <div className="animate-fade-in opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              <Button variant="secondary" className="px-10" onClick={onCtaClick}>
                {slide.cta} <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <div className="absolute bottom-10 right-10 flex space-x-4 z-20">
        <button 
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-elegantGold hover:border-elegantGold transition-all active:scale-90"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-elegantGold hover:border-elegantGold transition-all active:scale-90"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Progress Bars */}
      <div className="absolute bottom-10 left-10 flex space-x-2 z-20">
        {HERO_SLIDES.map((_, index) => (
          <div 
            key={index}
            className={`h-1 transition-all duration-300 rounded-full ${index === activeSlide ? 'w-12 bg-elegantGold' : 'w-4 bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
