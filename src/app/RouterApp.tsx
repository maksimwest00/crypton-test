import {Routes, Route} from 'react-router-dom';
import { AuthorizationPage } from '@pages';

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