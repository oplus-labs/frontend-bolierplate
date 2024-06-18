import { useState, useEffect } from 'react';

const useScrollDirection = (threshold = 10) => {
  const [scrollDir, setScrollDir] = useState<string | null>(null);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = (e: any) => {
      const currentScrollTop = e.target.scrollTop;
      if (Math.abs(currentScrollTop - lastScrollTop) > threshold) {
        const currentDirection = currentScrollTop > lastScrollTop ? 'down' : 'up';
        if (currentDirection === scrollDir) return;
        setScrollDir(currentDirection);
        setLastScrollTop(currentScrollTop);
      }
    };
    const app = document.getElementById('app_playground');

    app?.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollTop, threshold]);

  return scrollDir;
};

export default useScrollDirection;
