"use client";

import { API_URLS } from "@/app/api/url";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ThemeToggle } from "@/components/ThemToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";

type Description = {
  id: number;
  title: string;
  des: string;
  labels?: string;
};

type Question = {
  id: number;
  title: string;
  des: Description[];
  labels?: string[];
};

const QuestionsPage = () => {
  const { id } = useParams();
  const questionId = Number(id);

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(API_URLS.QUESTIONS);
        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
          const matchedQuestion = response.data.find(
            (q: Question) => q.id === questionId
          );

          if (matchedQuestion) {
            const extractedLabels = Array.from(
              new Set(
                matchedQuestion.des.flatMap(
                  (item: Description) => item.labels || []
                )
              )
            );

            setLabels(extractedLabels as string[]);
            setCurrentQuestion(matchedQuestion);
          } else {
            setCurrentQuestion(null);
          }
        } else {
          console.error("API response is not an array");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!isNaN(questionId)) {
      fetchQuestions();
    } else {
      setLoading(false);
    }
  }, [questionId]);

  const filteredDescriptions = selectedLabel
    ? currentQuestion?.des.filter((item) =>
        item.labels?.includes(selectedLabel)
      )
    : currentQuestion?.des;

  return (
    <div>
      <div className="max-w-2xl my-8 mx-auto p-4 rounded-md">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
            <Breadcrumbs />
          </div>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
        {loading ? (
          <div className="min-w-100 md:min-w-100">
            {[...Array(5)].map((_, index, arr) => (
              <div key={index} className="mb-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                {index < arr.length - 1 && <hr className="my-4" />}
              </div>
            ))}
          </div>
        ) : currentQuestion ? (
          <div>
            {labels.length > 0 && (
              <div className="flex space-x-2 mb-4 border-b pb-2 overflow-x-auto">
                {labels.map((label) => (
                  <button
                    key={label}
                    onClick={() =>
                      setSelectedLabel(label === selectedLabel ? null : label)
                    }
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      selectedLabel === label
                        ? "bg-neutral-100 dark:bg-neutral-600"
                        : "bg-neutral-50 dark:bg-neutral-900"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
            <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-md">
              {filteredDescriptions?.length ? (
                filteredDescriptions.map((item, index, arr) => (
                  <Link key={item.id} href={`/learn/help-center/${item.id}`}>
                    <div className="mb-4 p-1">
                      <h2 className="font-semibold">{item.title}</h2>
                      <p className="dark:text-gray-400 text-gray-700">
                        {`${item.des.slice(0, 100)}...` ||
                          "No description available."}
                      </p>
                      {index < arr.length - 1 && <hr className="my-4" />}
                    </div>
                  </Link>
                ))
              ) : (
                <p>No descriptions found for this question.</p>
              )}
            </div>
          </div>
        ) : (
          <p>No matching question found.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionsPage;
