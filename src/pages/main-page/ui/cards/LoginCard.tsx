import { useState } from "react";
import { useMutation } from "react-query";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { loginUser } from "@/shared/apiHelper";
import { SaveJWTToken } from "@/shared/localStorageHelper";
import { CardProps, EPagestate } from "@/shared/types";
import { ValidateDataLogin } from "@/shared/utils";
import { CardLoader } from "./CardLoader";

export const LoginCard = (props: CardProps) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [validateDataError, setValidateDataError] = useState<string>("");

    const mutation = useMutation(loginUser, {
        onSuccess: (data) => {
          console.log('Пользователь успешно авторизован:', data);
          SaveJWTToken(data.token);
          props.checkStatus();
        },
        onError: (error: Error) => {
          console.error('Произошла ошибка при авторизации пользователя:', error);
        },
    });

    function emailHandleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.currentTarget.value);
    }

    function passwordHandleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.currentTarget.value);
    }

    function Login() {
        const user = {email: email, password: password};
        const validateEmail = ValidateDataLogin(user);
        if (validateEmail) {
            mutation.mutate(user);
        }
        else {
            setValidateDataError("Ошибка валидации почты");
        }
    }

    function NavigateToLoginPage() {
        props.navigateTo!(EPagestate.Register);
    }

    return (
        <div className="flex h-screen justify-center items-center">
            {mutation.isLoading ? 
            <CardLoader/> :
            <Card className={cn("min-w-[332px]")}>
                <CardHeader className={cn("text-center")}>
                  <CardTitle>Авторизация</CardTitle>
                </CardHeader>
                <CardContent className={cn("flex flex-col gap-2 p-2")}>
                    <div className="p-2">
                        <CardDescription>
                            Email
                        </CardDescription>
                        <Input onChange={(e)=>emailHandleChangeValue(e)} placeholder="Введите ваш Email"/>
                    </div>
                    <div className="p-2">
                        <CardDescription>
                            Password
                        </CardDescription>
                        <Input onChange={(e)=>passwordHandleChangeValue(e)} placeholder="Введите пароль"/>
                    </div>
                    <div className="pl-2 flex flex-row gap-0.5">
                        <span className="text-zinc-1000 dark:text-zinc-400">У вас все еще нету аккаунта?</span>
                        <p className="underline cursor-pointer text-zinc-1000 dark:text-zinc-400" onClick={()=>NavigateToLoginPage()}>Регистрация</p>
                    </div>
                    {mutation.isError ? 
                        <span className="pl-2 text-red-500">{mutation.error.message}</span>
                        : null}
                    {validateDataError.length != null ?
                        <span className="pl-2 text-red-500">
                             {validateDataError}
                        </span>: null}
                </CardContent>
                <CardFooter className={cn("p-2 pb-6")}>
                    <Button className={cn("w-full")} onClick={()=>Login()}>Войти</Button>
                </CardFooter>
            </Card>}
        </div>
    );
};