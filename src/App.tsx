import { initDomToCode } from 'dom-to-code';
import DevTool from '@/ui/_lib/DevTool';
import ScrollToTopOnRouteUpdate from '@/ui/_lib/ScrollToTopOnRouteUpdate';
import generateRoutes from '@/ui/_lib/generateRoutes';
import appRoutes from '@/routes';
import './assets/css/tailwind.css';

export default function App() {
  return (
    <>
      {process.env.NODE_ENV === 'development' && <DevTool />}
      {process.env.NODE_ENV !== 'production' && initDomToCode()}
      <ScrollToTopOnRouteUpdate />
      <div id="app_playground" className="scrollbar w-screen overflow-y-auto">
        {generateRoutes({ routes: appRoutes })}
      </div>
    </>
  );
}
