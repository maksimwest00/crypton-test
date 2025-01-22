import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export const CardLoader = () => {
    return (
        <Card className={cn("flex min-w-[332px] min-h-[411px] justify-center items-center")}>
            <div className="flex flex-row gap-2 justify-center align-middle">
            <Spinner />
            <span className="font-medium">Загрузка...</span>
            </div>
        </Card>
    );
};