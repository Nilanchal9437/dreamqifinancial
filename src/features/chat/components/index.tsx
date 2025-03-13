"use client";

import * as React from "react";
import { MessageSquare, RotateCcw } from "lucide-react";
import { ChatCategory } from "@/types/chat";
import getChatQuestions from "@/features/chat/apis/getChat";
import create from "@/features/chat/apis/submit";

type Message = {
  id: string;
  type: "bot" | "user";
  content: string | React.ReactNode;
  options?: { [key: string]: string };
  inputType?: string;
};

function Chat() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [categories, setCategories] = React.useState<ChatCategory[]>([]);
  const [doccat, setDocCat] = React.useState<ChatCategory[]>([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = React.useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<
    { [key: string | number]: string | number }[]
  >([]);
  const [loading, setLoading] = React.useState(true);
  const [inputValue, setInputValue] = React.useState("");
  const [selectedOptions, setSelectedOptions] = React.useState<Set<string>>(
    new Set()
  );
  const [lastAnsweredMessageIndex, setLastAnsweredMessageIndex] =
    React.useState(-1);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  React.useEffect(() => {
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  React.useEffect(() => {
    getChatQuestions().then((data: ChatCategory[]) => {
      setCategories(data);
      setDocCat(data);
      setMessages([
        {
          id: "welcome",
          type: "bot",
          content:
            "Hi! 👋 I'm your personality chat assistant. Let's get to know you better! Ready to start?",
          options: { "1": "Yes, let's begin!" },
        },
      ]);
    });
    setLoading(false);
  }, []);

  const getCurrentQuestion = (
    categories: ChatCategory[],
    currentCategoryIndex: number,
    currentQuestionIndex: number
  ) => {
    if (!categories.length) return null;
    return categories[currentCategoryIndex]?.questions[currentQuestionIndex];
  };

  const handleInputSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const currentQuestion = getCurrentQuestion(
      categories,
      currentCategoryIndex,
      currentQuestionIndex
    );
    if (!currentQuestion) return;

    await handleAnswer(inputValue, "input");
    setInputValue("");
  };

  const handleAnswer = async (answer: string, optionId: string) => {
    const messageIndex = messages.length - 1;
    setLastAnsweredMessageIndex(messageIndex);
    setSelectedOptions(
      (prev) => new Set([...prev, `${messageIndex}-${optionId}`])
    );

    if (
      categories.length > 2 &&
      currentCategoryIndex === 0 &&
      currentQuestionIndex === 1 &&
      optionId === "1"
    ) {
      setCategories([doccat[0], doccat[1]]);
      await handelCategory(answer, optionId, [doccat[0], doccat[1]]);
    } else if (
      categories.length > 2 &&
      currentCategoryIndex === 0 &&
      currentQuestionIndex === 1 &&
      optionId === "2"
    ) {
      setCategories([doccat[0], doccat[2]]);
      await handelCategory(answer, optionId, [doccat[0], doccat[2]]);
    } else if (
      categories.length > 2 &&
      currentCategoryIndex === 0 &&
      currentQuestionIndex === 1 &&
      optionId === "3"
    ) {
      setCategories([doccat[0], doccat[3]]);
      await handelCategory(answer, optionId, [doccat[0], doccat[3]]);
    } else if (
      categories.length > 2 &&
      currentCategoryIndex === 0 &&
      currentQuestionIndex === 1 &&
      optionId === "4"
    ) {
      setCategories([doccat[0], doccat[4]]);
      await handelCategory(answer, optionId, [doccat[0], doccat[4]]);
    } else {
      await handelCategory(answer, optionId, categories);
    }
  };

  const isLastQuestion = () => {
    return (
      currentCategoryIndex === categories.length - 1 &&
      currentQuestionIndex ===
        categories[currentCategoryIndex]?.questions.length - 1
    );
  };

  const handelCategory = async (
    answer: string,
    optionId: string,
    categories: ChatCategory[]
  ) => {
    const currentQuestion = getCurrentQuestion(
      categories,
      currentCategoryIndex,
      currentQuestionIndex
    );
    if (!currentQuestion) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        type: "user",
        content: answer,
      },
    ]);

    const newAnswers = [...answers];
    newAnswers.push({
      question: currentQuestion.question,
      answer,
      category_id: categories[currentCategoryIndex].category_id,
      option_id: optionId,
    });
    setAnswers(newAnswers);

    if (isLastQuestion()) {
      await create(newAnswers);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            type: "bot",
            content:
              "Thank you for completing all the questions! We'll be in touch with you shortly about your financial needs.",
          },
        ]);
      }, 500);
    } else {
      if (
        currentQuestionIndex <
        categories[currentCategoryIndex].questions.length - 1
      ) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setTimeout(() => {
          const nextQuestion = getCurrentQuestion(
            categories,
            currentCategoryIndex,
            currentQuestionIndex + 1
          );
          if (nextQuestion) {
            setMessages((prev) => [
              ...prev,
              {
                id: `bot-${Date.now()}`,
                type: "bot",
                content: nextQuestion.question,
                options: nextQuestion.options,
                inputType:
                  nextQuestion.type === "element"
                    ? nextQuestion.options?.[1]
                    : undefined,
              },
            ]);
          }
        }, 500);
      } else if (currentCategoryIndex < categories.length - 1) {
        setCurrentCategoryIndex((prev) => prev + 1);
        setCurrentQuestionIndex(0);
        setTimeout(() => {
          const nextQuestion = getCurrentQuestion(
            categories,
            currentCategoryIndex + 1,
            0
          );
          if (nextQuestion) {
            setMessages((prev) => [
              ...prev,
              {
                id: `bot-${Date.now()}`,
                type: "bot",
                content: nextQuestion.question,
                options: nextQuestion.options,
                inputType:
                  nextQuestion.type === "element"
                    ? nextQuestion.options?.[1]
                    : undefined,
              },
            ]);
          }
        }, 500);
      }
    }
  };

  const handleReset = async () => {
    setSelectedOptions(new Set());
    setLastAnsweredMessageIndex(-1);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  const lastMessage = messages[messages.length - 1];
  const showInput = lastMessage?.type === "bot" && lastMessage?.inputType;

  const isOptionSelected = (messageIndex: number, optionId: string) => {
    return selectedOptions.has(`${messageIndex}-${optionId}`);
  };

  const shouldDisableOption = (messageIndex: number) => {
    return messageIndex <= lastAnsweredMessageIndex;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4 bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-green-400" />
            <h1 className="text-xl font-semibold text-white">
              DreamQI Financial Chat
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="p-2 text-gray-300 hover:bg-gray-700 rounded-full transition-colors"
              title="Reset Chat"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg mb-4 border border-gray-700">
          <div className="h-[calc(100vh-200px)] overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message, messageIndex) => (
                <div
                  key={messageIndex}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.type === "user"
                        ? "bg-green-600 text-white"
                        : "bg-gray-700 text-gray-100"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    {message.options && !message.inputType && (
                      <div className="mt-3 space-y-2">
                        {Object.entries(message.options).map(
                          ([key, value], indexs) => (
                            <button
                              key={indexs}
                              onClick={() => handleAnswer(value, key)}
                              className={`w-full text-left p-2 rounded transition-colors text-gray-100 ${
                                isOptionSelected(messageIndex, key) ||
                                shouldDisableOption(messageIndex)
                                  ? "bg-gray-500 cursor-not-allowed opacity-50"
                                  : "bg-gray-600 hover:bg-gray-500"
                              }`}
                              disabled={
                                isOptionSelected(messageIndex, key) ||
                                shouldDisableOption(messageIndex)
                              }
                            >
                              {value}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {showInput && (
                <form onSubmit={handleInputSubmit} className="mt-4">
                  <div className="flex gap-2">
                    <input
                      type={lastMessage.inputType}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={`Enter your ${lastMessage.inputType}`}
                      className="flex-1 p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-500"
                      required
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </form>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
