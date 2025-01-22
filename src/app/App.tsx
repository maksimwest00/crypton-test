import { BrowserRouter } from 'react-router-dom';
import { AppStore } from '@shared';
import { RouterApp } from './RouterApp';
import './App.css';

export const App = () => {
  return (
    <AppStore>
      <BrowserRouter>
        <div className='main'>
            <div className='routerApp'>
              <RouterApp/>
            </div>
        </div>
      </BrowserRouter>
    </AppStore>
  )
};