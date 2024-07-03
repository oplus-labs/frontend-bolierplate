import Home from '@/ui/pages';

export interface IRoute {
  id?: number;
  path: string;
  name: string;
  component: any;
  userRoles?: string[];
  fallback?: React.ComponentType<any>;
}

const appRoutes: IRoute[] = [{ id: 1, path: '/', name: 'Home', component: Home }];

export default appRoutes;
