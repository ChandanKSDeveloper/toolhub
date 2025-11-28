// import axios from "axios";

// export const generateImage = async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     if (!prompt) {
//       return res.status(400).json({ error: "Prompt is required" });
//     }

//     console.log("🔹 Prompt Received:", prompt);
//     console.log("sending request to api");


//     // 1️⃣ Request Image Generation from HuggingFace
//     const response = await axios.post(
//       "https://router.huggingface.co/fal-ai/fal-ai/qwen-image",
//       {
//         prompt,
//         sync_mode: true,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         validateStatus: () => true, // so we manually handle errors
//       }
//     );
//     console.log(response);


//     console.log("got the response and checking if valid or not");


//     // 2️⃣ Handle Credits Exceeded Error
//     if (response.status === 402) {
//       return res.status(402).json({
//         success: false,
//         message:
//           "You have exceeded your monthly API credits. Please upgrade plan or try later.",
//       });
//     }

//     // 3️⃣ Handle API Errors
//     if (response.status < 200 || response.status >= 300) {
//       console.error("❌ HuggingFace Error Response:", response.data);
//       return res.status(400).json({
//         success: false,
//         error: "Hugging Face API error",
//         details: response.data,
//       });
//     }

//     console.log("evething is all right");

//     const data = response.data;
//     const imageUrl = data?.images?.[0]?.url;
//     if (!imageUrl) {
//       throw new Error("No image URL found in HuggingFace API response.");
//     }

//     // console.log("✅ Image URL:", imageUrl);

//     // 4️⃣ Download the generated image
//     const imageResponse = await axios.get(imageUrl, {
//       responseType: "arraybuffer",
//       validateStatus: () => true,
//     });

//     if (imageResponse.status !== 200) {
//       throw new Error(
//         `Failed to download generated image: ${imageResponse.status} ${imageResponse.statusText}`
//       );
//     }

//     // 5️⃣ Convert to Base64 for frontend preview
//     const base64Image = Buffer.from(imageResponse.data).toString("base64");

//     return res.status(200).json({
//       success: true,
//       photo: `data:image/png;base64,${base64Image}`,
//     });

//   } catch (error) {
//     console.error("🔥 Image Generation Error:", error);

//     return res.status(500).json({
//       success: false,
//       error: "Image generation failed",
//       details: error.message,
//     });
//   }
// };


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

    // 1️⃣ Generate Image Using New HuggingFace Inference API
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

    // 2️⃣ Convert to Base64 for frontend
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


