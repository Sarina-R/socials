"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SendFeedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (name.trim() === "" || email.trim() === "" || feedback.trim() === "")
      return;
    setSubmitted(true);
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md my-6"
      >
        <Card className="sm:p-6 p-4 rounded-2xl shadow-lg">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <h2 className="text-xl font-bold text-green-500">Thank you!</h2>
              <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                Your feedback helps us improve.
              </p>
            </motion.div>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-3">Give us your feedback</h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                How was your experience?
              </p>

              <Input
                placeholder="Your Name"
                className="mb-4"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                type="email"
                placeholder="Your Email"
                className="mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Textarea
                placeholder="Write your feedback..."
                className="mb-4 h-32"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />

              <Button
                onClick={handleSubmit}
                className="w-full transition font-semibold py-2 rounded-lg"
              >
                Submit Feedback
              </Button>
            </>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default SendFeedback;
