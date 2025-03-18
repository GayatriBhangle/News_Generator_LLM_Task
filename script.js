const API_KEY = "YOUR_GROQ_API_KEY";  // Replace with your LLM API Key

async function getNews() {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "Generating news...";

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: "Generate a short news article about technology in simple language.",
          }
        ],
      }),
    });

    const data = await response.json();
    if (response.ok) {
      const newsContent = data.choices[0].message.content;
      newsContainer.innerHTML = `<p>${newsContent}</p>`;
    } else {
      newsContainer.innerHTML = "Failed to generate news.";
    }
  } catch (error) {
    console.error("Error:", error);
    newsContainer.innerHTML = "An error occurred.";
  }
}
