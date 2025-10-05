import FormData from "form-data";
import fetch from "node-fetch";

export const generateImage = async (req, res) => {
  const { prompt } = req.body;

  try {
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("output_format", "png"); 
    formData.append("size", "1024x1024");

    const response = await fetch(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.STABILITY_API_KEY}`,
          "Accept": "application/json"
        },
        body: formData
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Stability API error:", errorText);
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();

    res.status(200).json({
  imageUrl: `data:image/png;base64,${data.image}`
});

  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
};
