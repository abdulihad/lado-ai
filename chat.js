export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.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}`
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: "You are Lado AI, a helpful assistant."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    console.log("Groq response:", data); // IMPORTANT for debugging

    const reply =
      data?.choices?.[0]?.message?.content ||
      data?.error?.message ||
      "No response from AI";

    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({
      reply: "Server error: " + error.message
    });
  }
}
