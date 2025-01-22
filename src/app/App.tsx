import { AppStore } from '@/shared';
import { MainPage } from '@/pages';

export const App = () => {
  return (
    <AppStore>
      <MainPage/>
    </AppStore>
  )
};