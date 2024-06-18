import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTopOnRouteUpdate() {
  const { pathname } = useLocation();
  useEffect(() => {
    const playgroundElement = document.getElementById('app_playground');
    const timer = setTimeout(() => {
      playgroundElement?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}

export default ScrollToTopOnRouteUpdate;
