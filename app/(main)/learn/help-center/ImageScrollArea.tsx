import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";

interface ImageScrollAreaProps {
  link: string;
}

const ImageScrollArea: React.FC<ImageScrollAreaProps> = ({ link }) => {
  return (
    <ScrollArea className="w-full overflow-x-auto">
      <div className="flex p-1">
        <div className="relative w-72 h-44 flex-shrink-0">
          <Image
            src={link}
            alt="img"
            fill
            className="object-cover rounded-md"
          />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ImageScrollArea;
