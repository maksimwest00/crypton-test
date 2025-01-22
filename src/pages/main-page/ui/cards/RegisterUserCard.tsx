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
import { registerUser } from "@/shared/apiHelper";
import { SaveJWTToken } from "@/shared/localStorageHelper";
import { CardProps, EPagestate, UserSuccess } from "@/shared/types";
import { ValidateDataRegister } from "@/shared/utils";
import { CardLoader } from "./CardLoader";

export const RegisterUserCard = (props: CardProps) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [validateDataError, setValidateDataError] = useState<string[]>([]);

    const mutation = useMutation(registerUser, {
        onSuccess: (data: UserSuccess) => {
            console.log('Пользователь успешно зарегестрирован:', data);
            SaveJWTToken(data.token);
            props.checkStatus();
        },
        onError: (error: Error) => {
          console.error('Произошла ошибка при регистрации пользователя:', error);
        },
    });

    const emailHandleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    }

    const passwordHandleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
    }

    const confirmPasswordHandleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.currentTarget.value);
    }

    const CreateAccount = () => {
        const user = {email: email, password: password};

        const [validateEmail, validatePassword] = ValidateDataRegister(user, confirmPassword);

        if (!validateEmail && !validatePassword) {
            setValidateDataError(["Ошибка валидации почты", "Введенные пароли не совпадают"]);
        }
        else {
            if (!validateEmail) {
                setValidateDataError(["Ошибка валидации почты"]);
            }
            if (!validatePassword) {
                setValidateDataError(["Введенные пароли не совпадают"]);
            }
        }

        if (validateEmail && validatePassword) {
            mutation.mutate(user);
        }
    }

    const NavigateToLoginPage = () => {
        props.navigateTo(EPagestate.Login);
    };

    return (
        <div className="flex h-screen justify-center items-center">
            {mutation.isLoading ? 
            <CardLoader/> : 
            <Card className={cn("min-w-[332px] min-h-[411px]")}>
                <CardHeader className={cn("text-center")}>
                    <CardTitle>Регистрация</CardTitle>
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
                        <Input onChange={(e)=>passwordHandleChangeValue(e)} placeholder="Придумайте пароль"/>
                    </div>
                    <div className="p-2">
                        <CardDescription>
                            Confirm Password
                        </CardDescription>
                        <Input onChange={(e)=>confirmPasswordHandleChangeValue(e)} placeholder="Подтвердите пароль"/>
                    </div>
                    <div className="pl-2 flex flex-row gap-1">
                        <span className="text-zinc-1000 dark:text-zinc-400">У вас уже есть аккаунт?</span>
                        <p className="underline cursor-pointer text-zinc-1000 dark:text-zinc-400" onClick={()=>NavigateToLoginPage()}>Войти</p>
                    </div>
                    {mutation.isError ? 
                     <span className="pl-2 text-red-500">{mutation.error.message}</span>
                     : null}
                    {validateDataError.map((item, _)=>{
                       return (
                           <span key={item} className="pl-2 text-red-500">
                               {item}
                           </span>
                       );
                    })}
                </CardContent>
                <CardFooter className={cn("p-2 pb-6")}>
                    <Button onClick={()=>CreateAccount()} className={cn("w-full")}>Создать аккаунт</Button>
                </CardFooter>
            </Card>}
        </div>
    );
}