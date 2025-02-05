import { Card, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface HelpCardProps {
  title: string;
  iconUrl: string;
  links: string[];
}

const HelpCard: React.FC<HelpCardProps> = ({ title, iconUrl, links }) => {
  return (
    <Card className="shadow-md bg-gray-100 dark:bg-gray-900 ">
      <div
        className="h-20 mb-4 w-full bg-cover bg-center rounded-t-lg"
        style={{ backgroundImage: `url(${iconUrl})` }}
      />
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <ul className="mt-2 space-y-1 text-sm">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                className="hover:underline hover:cursor-pointer text-green-700 dark:text-green-400"
                href={`/questions/${encodeURIComponent(link)}`}
              >
                • {link}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default HelpCard;
