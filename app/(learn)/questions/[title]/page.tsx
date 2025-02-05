"use client";

import { useParams } from "next/navigation";

const QuestionsPage = () => {
  const params = useParams();
  const title = params?.title;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Question: {title}</h1>
      <p>این صفحه برای سوال مربوط به "{title}" است.</p>
    </div>
  );
};

export default QuestionsPage;
