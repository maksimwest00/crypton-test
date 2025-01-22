import { useEffect, useState } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { CardProps } from "@/shared/types";
import { profileUser } from "@/shared/apiHelper";
import { ClearJWTToken, ReadJWTToken } from "@/shared/localStorageHelper";

export const ProfileCard = (props: CardProps) => {
    const [email, setEmail] = useState<string>("");
    const [id, setID] = useState<string>("");

    const mutation = useMutation(profileUser, {
        onSuccess: (data) => {
          console.log('Пользователь успешно получен:', data);
          setEmail(data.email);
          setID(data.id);
        },
        onError: (error: Error) => {
          console.error('Произошла ошибка при получении пользователя:', error);
        },
    });

    useEffect(()=>{
        const jwtToken: string | null = ReadJWTToken();
        if (jwtToken !== null) {
            mutation.mutate(jwtToken);
        }
    },[]);

    const Exit = () => {
        ClearJWTToken();
        props.checkStatus();
    }

    interface CardItemProps {
        title: string;
        value: string;
    }

    const CardItem = (props: CardItemProps) => {
        return (
            <>
                <CardDescription>
                    {props.title}
                </CardDescription>
                <span>{props.value}</span>
            </>
        );
    };

    const CardItemSkeleton = () => {
        return (
            <Skeleton className="w-full h-full rounded-xl" />
        );
    };

    return (
        <div className="flex h-screen justify-center items-center">
            <Card className={cn("min-w-[332px]")}>
                <CardHeader className={cn("text-center")}>
                  <CardTitle>Профиль</CardTitle>
                </CardHeader>
                <CardContent className={cn("flex flex-col gap-10 p-2")}>
                    <div className="h-[72px] p-2 border rounded-xl shadow border-zinc-200">
                        {mutation.isLoading || mutation.isError ? 
                        <CardItemSkeleton/> : 
                        <CardItem title="Ваш Email" value={email}/>}
                    </div>
                    <div className="h-[72px] p-2 border rounded-xl shadow border-zinc-200">
                        {mutation.isLoading || mutation.isError ? 
                        <CardItemSkeleton/> : 
                        <CardItem title="Ваш ID" value={id}/>}
                    </div>
                    {mutation.isError ? 
                     <span className="pl-2 text-red-500">{mutation.error.message}</span>
                     : null}
                </CardContent>
                <CardFooter className={cn("p-2 pb-6")}>
                    <Button onClick={()=>Exit()} className={cn("w-full")}>Выйти</Button>
                </CardFooter>
            </Card>
        </div>
    );
};