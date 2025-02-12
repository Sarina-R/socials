import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Card = ({
  country,
  rank,
  className,
}: {
  country: {
    countryName: string;
    countryFlag: string;
    totalPoint: number;
  };
  rank: number;
  className: string;
}) => {
  const borderColors = [
    "border-yellow-300",
    "border-gray-300",
    "border-orange-300",
  ];
  const textColors = ["text-yellow-500", "text-gray-500", "text-orange-500"];

  return (
    <div
      className={`flex flex-col items-center p-2 rounded-2xl shadow-md bg-neutral-50 dark:bg-neutral-900 dark:border ${className}`}
    >
      <h3 className={`text-sm md:text-base font-bold ${textColors[rank - 1]}`}>
        Place {rank}
      </h3>
      <Avatar
        className={`w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-white mb-2 ${
          borderColors[rank - 1]
        }`}
      >
        <AvatarImage
          className="object-cover"
          src={country.countryFlag}
          alt={`${country.countryName} flag`}
        />
        <AvatarFallback>{country.countryName.charAt(0)}</AvatarFallback>
      </Avatar>
      <h3 className="text-sm md:text-base font-bold">{country.countryName}</h3>
      <Badge className="text-xs md:w-full m-1 text-center">
        {country.totalPoint} Points
      </Badge>
    </div>
  );
};

export default Card;
