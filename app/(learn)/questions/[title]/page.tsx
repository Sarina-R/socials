"use client";

import { API_URLS } from "@/app/api/url";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

type Description = {
  title: string;
  des: string;
};

type Question = {
  title: string;
  des: Description[];
};

const QuestionsPage = () => {
  const params = useParams();
  const title = Array.isArray(params?.title)
    ? decodeURIComponent(params.title[0])
    : decodeURIComponent(params?.title || "");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(API_URLS.QUESTIONS);

        const matchedQuestion = response.data.find(
          (q: Question) => q.title === title
        );
        setCurrentQuestion(matchedQuestion || null);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, [title]);

  return (
    <div>
      <div
        className="bg-cover bg-center h-[220px] flex flex-col justify-center items-center text-white"
        style={{
          backgroundImage:
            "url('https://tribe-s3-production.imgix.net/pNjC7h1dgJgePWHQA7krF?w=2000&auto=compress')",
        }}
      >
        <h1 className="text-center sm:text-4xl text-xl font-bold">
          How can we help you?
        </h1>
        <div className="relative mt-4 w-[60%]">
          <Input
            type="text"
            placeholder="Search for answers"
            className="pr-12 bg-gray-950 bg-opacity-40"
          />
          <Search className="absolute top-1.5 right-3 text-gray-400" />
        </div>
      </div>

      <div className="p-4 m-4">
        <h1 className="text-2xl font-bold mb-4">Question: {title}</h1>
        {currentQuestion ? (
          <div>
            {currentQuestion.des.map((item, index) => (
              <div key={index} className="mb-4">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-700">{item.des}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No matching question found.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionsPage;
