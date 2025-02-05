import { Card, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface HelpCardProps {
  title: string;
  iconUrl: string;
  links: { id: number; title: string }[];
}

const HelpCard: React.FC<HelpCardProps> = ({ title, iconUrl, links }) => {
  return (
    <Card className="shadow-md bg-gray-100 dark:bg-gray-900">
      <div
        className="h-20 mb-4 w-full bg-cover bg-center rounded-t-lg"
        style={{ backgroundImage: `url(${iconUrl})` }}
      />
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <ul className="mt-2 space-y-1 text-sm">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                className="hover:text-green-600 hover:cursor-pointer text-green-700 dark:text-green-400 dark:hover:text-green-300"
                href={`/questions/${link.id}`}
              >
                • {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default HelpCard;
