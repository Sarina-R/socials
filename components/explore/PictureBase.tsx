import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Props = {
  title: string;
  des: string;
  imgSrc: string;
  imgAlt: string;
  onClick: () => void;
};

const PictureBase = ({ title, des, imgSrc, imgAlt, onClick }: Props) => {
  return (
    <Card
      className="w-[350px] h-[350px] flex flex-col justify-between shadow-md bg-neutral-50 dark:bg-neutral-900 rounded-xl hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-52 w-full">
        <Image
          src={imgSrc}
          alt={imgAlt}
          fill
          className="object-cover rounded-t-xl"
        />
      </div>
      <div className="h-[10rem]">
        <CardHeader>
          <h2 className="text-xl font-bold">{title}</h2>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            {des.length > 100 ? `${des.slice(0, 100)}...` : des}
          </p>
        </CardContent>
      </div>
    </Card>
  );
};

export default PictureBase;
