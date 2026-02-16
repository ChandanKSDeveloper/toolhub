import axios from "axios";
import { InferenceClient } from "@huggingface/inference";

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    console.log("🔹 Prompt Received:", prompt);
    console.log("sending request to HuggingFace textToImage...");

    // NEW CLIENT
    const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY);

    // 1 Generate Image Using New HuggingFace Inference API
    // const imageBlob = await client.textToImage({
    //   provider: "auto",
    //   model: "Tongyi-MAI/Z-Image-Turbo",
    //   inputs: prompt,
    //   parameters: { num_inference_steps: 5 },
    // });

    const imageBlob = await client.textToImage({
      provider: "auto",
      model: "black-forest-labs/FLUX.1-dev",  // FREE MODEL
      inputs: prompt,
      parameters: { num_inference_steps: 25 },
    });

    console.log("✔ Image generation done. Now converting...");

    // Convert Blob → ArrayBuffer
    const arrayBuffer = await imageBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 2 Convert to Base64 for frontend
    const base64Image = buffer.toString("base64");

    return res.status(200).json({
      success: true,
      photo: `data:image/png;base64,${base64Image}`,
    });

  } catch (error) {
    console.error("🔥 Image Generation Error:", error);

    return res.status(500).json({
      success: false,
      error: "Image generation failed",
      details: error.message,
    });
  }
};


