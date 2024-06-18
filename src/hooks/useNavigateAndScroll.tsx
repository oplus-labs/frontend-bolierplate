import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToComponent } from '@/utils';

interface IUseNavigateAndScroll {
  navigateTo: string;
  scrollToComponentId: string;
}

export default function useNavigateAndScroll({ navigateTo, scrollToComponentId }: IUseNavigateAndScroll) {
  const navigate = useNavigate();
  const location = useLocation();

  function navigateAndScroll() {
    if (location.pathname === navigateTo) {
      scrollToComponent(scrollToComponentId);
      return;
    }
    navigate(navigateTo);
    setTimeout(() => {
      scrollToComponent(scrollToComponentId);
    }, 400);
  }

  return navigateAndScroll;
}
