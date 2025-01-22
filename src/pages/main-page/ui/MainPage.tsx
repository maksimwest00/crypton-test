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

const AuthorizationCard = () => {
    return (
        <div className="flex h-screen justify-center items-center">
            <Card className={cn("min-w-[250px]")}>
                <CardHeader className={cn("text-center")}>
                  <CardTitle>Авторизация</CardTitle>
                </CardHeader>
                <CardContent className={cn("flex flex-col gap-2 p-2 pb-[50px]")}>
                    <div className="p-2">
                        <CardDescription>
                            Email
                        </CardDescription>
                        <Input placeholder="Введите ваш Email"/>
                    </div>
                    <div className="p-2">
                        <CardDescription>
                            Password
                        </CardDescription>
                        <Input placeholder="Введите пароль"/>
                    </div>
                </CardContent>
                <CardFooter className={cn("p-2 pb-6")}>
                    <Button className={cn("w-full")}>Войти</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

const RegisterCard = () => {
    return (
        <div className="flex h-screen justify-center items-center">
            <Card className={cn("min-w-[250px]")}>
                <CardHeader className={cn("text-center")}>
                  <CardTitle>Регистрация</CardTitle>
                </CardHeader>
                <CardContent className={cn("flex flex-col gap-2 p-2 pb-[50px]")}>
                    <div className="p-2">
                        <CardDescription>
                            Email
                        </CardDescription>
                        <Input placeholder="Введите ваш Email"/>
                    </div>
                    <div className="p-2">
                        <CardDescription>
                            Password
                        </CardDescription>
                        <Input placeholder="Придумайте пароль"/>
                    </div>
                </CardContent>
                <CardFooter className={cn("p-2 pb-6")}>
                    <Button className={cn("w-full")}>Создать аккаунт</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

const ProfileCard = () => {
    const email = "example.email@gmail.com";
    const id = "e32a6217-9742-44f3-a34ec";

    return (
        <div className="flex h-screen justify-center items-center">
            <Card className={cn("min-w-[250px]")}>
                <CardHeader className={cn("text-center")}>
                  <CardTitle>Профиль</CardTitle>
                </CardHeader>
                <CardContent className={cn("flex flex-col gap-2 p-2 pb-[50px]")}>
                    <div className="h-[72px] p-2 border rounded-xl shadow border-zinc-200">
                        <CardDescription>
                            Ваш Email
                        </CardDescription>
                        <span>{email}</span>
                    </div>
                    <div className="h-[72px] p-2 border rounded-xl shadow border-zinc-200">
                        <CardDescription>
                            Ваш ID
                        </CardDescription>
                        <span>{id}</span>
                    </div>
                </CardContent>
                <CardFooter className={cn("p-2 pb-6")}>
                    <Button className={cn("w-full")}>Выйти</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export const MainPage = () => {
    return (
        <div className="flex flex-row gap-5 justify-center">
            <AuthorizationCard/>
            <RegisterCard/>
            <ProfileCard/>
        </div>
    );
};