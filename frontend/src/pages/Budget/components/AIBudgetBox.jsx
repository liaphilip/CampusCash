import { useState } from "react";

export default function AIBudgetBox() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
/*
  const generateBudget = async () => {
    setLoading(true);

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${
        import.meta.env.VITE_GEMINI_API_KEY
      }`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a budgeting assistant for college students.

                        Given the user's situation, return a JSON object with this EXACT format:

                        {
                        "Food": number,
                        "Travel": number,
                        "Shopping": number,
                        "Utilities": number,
                        "Savings": number
                        }

                        User details:
                        ${input}

                        Return ONLY valid JSON. No explanation.
                        `

                }
              ]
            }
          ]
        })
      }
    );

    const data = await res.json();
    try {
    const jsonText = data.candidates[0].content.parts[0].text;
    const parsed = JSON.parse(jsonText);
    setOutput(parsed);
    } catch (err) {
    setOutput("AI response error. Try again.");
    }
    setLoading(false);
  };
*/
    const generateBudget = async () => {
    setLoading(true);
    setOutput("");
    const MODEL = "gemini-2.5-flash";


    try {
        console.log("Button clicked");
        console.log("API KEY:", import.meta.env.VITE_GEMINI_API_KEY);

        const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            contents: [
                {
                parts: [
                    {
                    text: `
                            You are a budgeting assistant.

                            Return ONLY valid JSON in this format:
                            {
                            "Food": number,
                            "Travel": number,
                            "Shopping": number,
                            "Utilities": number,
                            "Savings": number
                            }

                            User input:
                            ${input}
                            `
                    }
                ]
                }
            ]
            }),
        }
        );

        const data = await res.json();
        console.log("RAW RESPONSE:", data);

        if (!data.candidates) {
        throw new Error("No candidates returned");
        }

        const text = data.candidates[0].content.parts[0].text;
        console.log("AI TEXT:", text);

        const cleanedText = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const parsed = JSON.parse(cleanedText);
        setOutput(parsed);

    } catch (err) {
        console.error("Gemini Error:", err);
        setOutput("Error generating budget. Check console.");
    }

    setLoading(false);
    };


  return (
    <div>
      <h3>AI Budget Assistant</h3>

      <textarea
        placeholder="Describe your income and expenses..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <br />

      <button onClick={generateBudget}>
        {loading ? "Generating..." : "Generate Budget"}
      </button>

      {output && typeof output === "object" && (
        <div style={{ marginTop: "10px" }}>
            <h4>Suggested Budget</h4>
            {Object.entries(output).map(([key, value]) => (
            <p key={key}>
                {key}: ₹{value}
            </p>
            ))}
        </div>
        )}
    </div>
  );
}
