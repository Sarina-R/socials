import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    handle: "@johndoe",
    review: "This is an amazing product! Highly recommend it.",
  },
  {
    id: 2,
    name: "Jane Smith",
    handle: "@janesmith",
    review: "Absolutely love it! Will buy again.",
  },
  {
    id: 3,
    name: "Sam Wilson",
    handle: "@samwilson",
    review: "Great value for the price. Exceeded my expectations.",
  },
];

const XFeed = () => {
  return (
    <>
      <div className="instagram-header h-[60px] mb-5 bg-blue-600 p-4 text-white">
        <h2 className="text-xl font-semibold">Latest X Posts</h2>
      </div>
      <Carousel orientation="vertical" className="mt-12 ">
        <CarouselContent className="h-[300px]">
          {reviews.map((review) => (
            <CarouselItem key={review.id} className="pt-1 md:basis-1/2">
              <div className="p-1">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
                        {review.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <p className="font-semibold">{review.name}</p>
                        <p className="text-gray-600 text-sm">{review.handle}</p>
                      </div>
                    </div>
                    <p className="mt-2">{review.review}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default XFeed;
