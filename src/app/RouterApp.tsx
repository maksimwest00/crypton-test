import { AuthorizationPage } from '@/pages';
import {Routes, Route} from 'react-router-dom';

// TEST
const HomePage = () => {
    return (
        <div>HomePage</div>
    );
}

export const RouterApp = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/authorization" element={<AuthorizationPage/>}/>
        </Routes>
    );
};