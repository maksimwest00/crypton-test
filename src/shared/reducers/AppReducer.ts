import { useReducer } from "react";

export type Counter = [AppState, React.Dispatch<ECounter>];

export interface AppState {
    count: number;
};

export enum ECounter {
    Increment = 0,
    Decrement = 1,
    Reset = 2
};

export const CreateAppReducer: () => [AppState, React.Dispatch<ECounter>] = () => {
    const reducer = (state: AppState, action: ECounter): AppState => {
        switch (action) {
            case ECounter.Increment:
                return { ...state, count: state.count + 1 };
            case ECounter.Decrement:
                return { ...state, count: state.count - 1 };
            case ECounter.Reset:
                return { ...state, count: 0 };
            default:
                return state;
        };
    };
    const initialState: AppState = {
        count: 0,
    };
    return useReducer(reducer, initialState);
};

// export const useCounter: () => Counter = () => {
//     return useContext(Context).counter;
// };