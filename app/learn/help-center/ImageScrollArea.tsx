import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";

interface ImageScrollAreaProps {
  link: string;
}

const ImageScrollArea: React.FC<ImageScrollAreaProps> = ({ link }) => {
  return (
    <ScrollArea className="w-full overflow-x-auto">
      <div className="flex space-x-4 p-4">
        <div className="relative w-48 h-36 flex-shrink-0">
          <Image
            src={link}
            alt="img"
            fill
            className="object-cover rounded-t-xl"
          />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ImageScrollArea;
