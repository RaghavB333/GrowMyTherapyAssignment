'use client';
import useInView from '@/hooks/useInView';

//animation component
export default function FadeInSection({ children, className = '', delay = 0 }) {
  const [ref, isVisible] = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`
        transition-all duration-700 ease-out transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
