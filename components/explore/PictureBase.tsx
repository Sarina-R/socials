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
      className="w-full h-full flex flex-col justify-between shadow-md bg-neutral-50 dark:bg-neutral-900 rounded-xl hover:cursor-pointer"
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
      <div className="p-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {des.length > 100 ? `${des.slice(0, 60)}...` : des}
        </p>
      </div>
    </Card>
  );
};

export default PictureBase;
