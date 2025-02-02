import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

type Admins = {
  id: number;
  name: string;
  des: string;
  time: string;
  avatar: string;
  footer: string;
};

const TwitterBase = ({ id, avatar, name, footer, time, des }: Admins) => {
  return (
    <Card className="w-[350px] h-[250px] flex flex-col justify-between p-4 shadow-md bg-gray-100 dark:bg-gray-900 rounded-xl">
      <CardContent className="flex flex-col gap-3 flex-grow">
        <div className="flex items-center gap-3">
          <Image
            src={avatar}
            alt={name}
            width={40}
            height={40}
            className=" rounded-full"
          />
          <div>
            <h3 className="text-md font-semibold">{name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-sm break-words leading-relaxed">
          {des}
        </p>
      </CardContent>
      <div className="p-2 border-t text-green-600 dark:text-green-400 font-bold text-sm text-center">
        {footer}
      </div>
    </Card>
  );
};

export default TwitterBase;
