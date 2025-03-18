const API_KEY = "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";  
async function getNews() {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "Generating news...";
  const input = document.getElementById("input");

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
            content: "Generate a new on topic " + input.value ,
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

function clearNews() {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";
  document.getElementById("input").value = "";
}
