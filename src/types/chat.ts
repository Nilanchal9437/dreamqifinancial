export type ChatCategory = {
  category: string;
  category_id: number;
  questions: ChatQuestion[];
};

export type ChatQuestion = {
  id: number;
  question: string;
  type?: "string" | "element";
  options?: { [key: string]: string };
};
