import React, { useContext } from 'react';
import { AppState, CreateAppReducer, ECounter } from '../reducers/AppReducer';

interface ProviderStore {
    appReducer: [AppState, React.Dispatch<ECounter>],
};

interface ProviderStoreProps {
    children: React.ReactNode;
};


const InitContextProviderStore: () => ProviderStore = () => {
    const ProviderStore: ProviderStore = {
        appReducer: CreateAppReducer(),
    };
    return ProviderStore;
};

export const Context: React.Context<ProviderStore> = React.createContext<ProviderStore>({} as ProviderStore);

export const AppStore = ({ children }: ProviderStoreProps): JSX.Element => {
    const value: ProviderStore = InitContextProviderStore();
    return (
        <Context.Provider value={value}>{children}</Context.Provider>
    );
};

// export const useAppMode: () => AppModeReducer = () => {
//     return useContext(Context).appModeReducer;
// };