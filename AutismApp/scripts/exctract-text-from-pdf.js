import * as FileSystem from "expo-file-system";
import { CONFIG } from "../config";

const API_TOKEN = CONFIG.CONVERT_API_TOKEN;

export async function extractTextFromPdf(uri) {
  try {
    const formData = new FormData();
    formData.append("File", {
      uri,
      type: "application/pdf",
      name: "document.pdf",
    });

    const response = await fetch(
      "https://v2.convertapi.com/convert/pdf/to/txt",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: formData,
      }
    );

    const result = await response.json();
    console.log("ConvertAPI result:", result);

    if (!result.Files?.length) {
      throw new Error("Aucun fichier retourné par l'API");
    }

    const base64Txt = result.Files[0].FileData;

    // Décodage base64 → texte
    const decodedText = atob(base64Txt);

    return decodedText;
  } catch (error) {
    console.error("Erreur extraction texte :", error);
    throw error;
  }
}
