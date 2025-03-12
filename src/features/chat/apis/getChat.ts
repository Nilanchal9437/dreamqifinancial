import { ChatCategory } from "@/types/chat";

export default async function getChatQuestions(): Promise<ChatCategory[]> {
  const generateYear = (): string[] => {
    const select: string[] = [];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0-based index (Jan = 0)
    const currentYear = currentDate.getFullYear();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Generate options for the current and next year
    for (let year = currentYear; year <= currentYear + 2; year++) {
      for (let month = 0; month < 12; month++) {
        // Skip past months in the current year
        if (year === currentYear && month < currentMonth) continue;
        select.push(`📅 ${months[month]} ${year}`);
      }
    }

    return select;
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          category:
            "We can help with a range of different lending scenarios. Select the option below that most suits your needs:",
          category_id: 1,
          questions: [
            {
              id: 1,
              type: "string",
              question:
                "Hi! 👋 I'm your personality chat assistant. Let's get to know you better! Ready to start?",
              options: { "1": "Yes, let's begin!" },
            },
            {
              id: 2,
              question: "Which option best describes your situation?",
              type: "string",
              options: {
                "1": "💵 Borrowing Capacity (I want to understand how much I can borrow to purchase a property.)",
                "2": "💲Loan Health Check (I already have a loan but want to make sure I'm getting the best deal.)",
                "3": " % My Fixed Rate is Expiring (I have a fixed rate loan and want to know how much I could save.)",
                "4": "📆 Book an Appointment (I'd rather book an appointment to speak to someone about my situation)",
              },
            },
          ],
        },
        {
          category: "Borrowing Capacity",
          category_id: 2,
          questions: [
            {
              id: 1,
              question:
                "What is your total household income each year before tax?",
              type: "element",
              options: {
                "1": "number",
              },
            },
            {
              id: 2,
              question: "What are your monthly household expenses?",
              type: "string",
              options: {
                "1": "💰$2,500",
                "2": "💰$2,500 - $4,000",
                "3": "💰$4,001 - $6,000",
                "4": "💰$6,000+",
              },
            },
            {
              id: 3,
              question: "How big is your household?",
              type: "string",
              options: {
                "1": "1",
                "2": "2",
                "3": "3",
                "4": "4+",
              },
            },
            {
              id: 4,
              question: "What is your name?",
              type: "element",
              options: {
                "1": "text",
              },
            },
            {
              id: 5,
              question: "What is your email address?",
              type: "element",
              options: {
                "1": "email",
              },
            },
            {
              id: 6,
              question: "What is your contact number?",
              type: "element",
              options: {
                "1": "number",
              },
            },
          ],
        },
        {
          category: "Loan Health Check",
          category_id: 3,
          questions: [
            {
              id: 1,
              question: "What is your property address?",
              type: "element",
              options: {
                "1": "text",
              },
            },
            {
              id: 2,
              question: "What is your property type?",
              type: "string",
              options: {
                "1": "🏠Woner Occupied",
                "2": "🌆 Investment",
              },
            },
            {
              id: 3,
              question: "Enter your current bank name?",
              type: "element",
              options: {
                "1": "text",
              },
            },
            {
              id: 4,
              question: "Enter your approximate loan balance?",
              type: "element",
              options: {
                "1": "number",
              },
            },
            {
              id: 5,
              question: "Enter your current interest rate?",
              type: "element",
              options: {
                "1": "text",
              },
            },
            {
              id: 6,
              question: "What is your name?",
              type: "element",
              options: {
                "1": "text",
              },
            },
            {
              id: 7,
              question: "What is your email address?",
              type: "element",
              options: {
                "1": "email",
              },
            },
            {
              id: 8,
              question: "What is your contact number?",
              type: "element",
              options: {
                "1": "number",
              },
            },
          ],
        },
        {
          category: "My Fixed Rate is Expiring",
          category_id: 4,
          questions: [
            {
              id: 1,
              question: "What is your approximate loan balance?",
              type: "element",
              options: {
                "1": "number",
              },
            },
            {
              id: 2,
              question: "Enter your current interest rate?",
              type: "element",
              options: {
                "1": "text",
              },
            },
            {
              id: 3,
              question: "When does your fixed term end?",
              type: "string",
              options: generateYear().reduce(
                (acc: { [key: number]: string }, month, index) => {
                  acc[index + 1] = month; // Assign the month to a 1-based index
                  return acc;
                },
                {}
              ),
            },
            {
              id: 4,
              question: "Enter your current bank name?",
              type: "element",
              options: {
                "1": "text",
              },
            },
            {
              id: 5,
              question: "Years remaining on your loan?",
              type: "element",
              options: {
                "1": "number",
              },
            },
            {
              id: 6,
              question: "Enter roll of rate?",
              type: "element",
              options: {
                "1": "text",
              },
            },
            {
              id: 7,
              question: "What is your name?",
              type: "element",
              options: {
                "1": "text",
              },
            },
            {
              id: 8,
              question: "What is your email address?",
              type: "element",
              options: {
                "1": "email",
              },
            },
            {
              id: 9,
              question: "What is your contact number?",
              type: "element",
              options: {
                "1": "number",
              },
            },
          ],
        },
        {
          category: "Book an Appointment",
          category_id: 5,
          questions: [
            {
              id: 1,
              question: "Enter your name?",
              type: "element",
              options: {
                "1": "text",
              },
            },
            {
              id: 2,
              question: "Enter your contact number?",
              type: "element",
              options: {
                "1": "number",
              },
            },
            {
              id: 3,
              question: "Enter your email address?",
              type: "element",
              options: {
                "1": "email",
              },
            },
            {
              id: 4,
              question: "Enter your call date and time?",
              type: "element",
              options: {
                "1": "date",
              },
            },
          ],
        },
      ]);
    }, 1000);
  });
}
