import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { EPagestate } from "@/shared/types";
import { ReadJWTToken } from "@/shared/localStorageHelper";
import { LoginCard } from "./cards/LoginCard";
import { ProfileCard } from "./cards/ProfileCard";
import { RegisterUserCard } from "./cards/RegisterUserCard";

export const MainPage = () => {
    const [pageState, setPageState] = 
        useState<EPagestate>(EPagestate.Register);

    function CheckStatus() {
        const jwtToken: string | null = ReadJWTToken();
        if (jwtToken !== null) {
            NavigateTo(EPagestate.Profile);
        }
        else {
            NavigateTo(EPagestate.Register);
        }
    }

    function NavigateTo(state: EPagestate){
        setPageState(state);
    }

    useEffect(()=>{
        CheckStatus();
    },[]);


    return (
        <div className="flex flex-row gap-5 justify-center items-center">
            <div className="flex flex-row gap-3 justify-center items-center">
                <span>Сменить тему</span>
                <ModeToggle/>
            </div>
            <div className={`transition-all ease-in-out duration-1000 ${pageState == EPagestate.Register ? 'opacity-100' : 'opacity-0'}`}>
                {pageState == EPagestate.Register && 
                <RegisterUserCard navigateTo={NavigateTo} checkStatus={CheckStatus}/>
                }
            </div>

            <div className={`transition-all ease-in-out duration-1000 ${pageState == EPagestate.Login ? 'opacity-100' : 'opacity-0'}`}>
                {pageState == EPagestate.Login && 
                    <LoginCard navigateTo={NavigateTo} checkStatus={CheckStatus}/>
                }
            </div>
            
            <div className={`transition-all ease-in-out duration-1000 ${pageState == EPagestate.Profile ? 'opacity-100' : 'opacity-0'}`}>
                {pageState == EPagestate.Profile && 
                    <ProfileCard navigateTo={NavigateTo} checkStatus={CheckStatus}/>
                }
            </div>

            {/* Вариант без анимаций */}
            {/* {pageState == EPagestate.Register ?
                    <RegisterUserCard navigateTo={NavigateTo} checkStatus={CheckStatus}/> :
                    (pageState == EPagestate.Login ?
                    <LoginCard navigateTo={NavigateTo} checkStatus={CheckStatus}/> :
                    <ProfileCard checkStatus={CheckStatus}/>
            )} */}
        </div>
    );
};