const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
console.log(
  "OpenAI API Key:",
  apiKey ? `${apiKey.substring(0, 10)}...` : "undefined"
);

export async function makeCallToOpenAI(text) {
  try {
    if (!apiKey || apiKey === "your_openai_api_key_here") {
      throw new Error(
        "Clé API OpenAI non configurée. Vérifiez votre fichier .env"
      );
    }

    // Limiter le texte à 100000 caractères pour éviter de dépasser les limites d'OpenAI
    const maxLength = 100000;
    const truncatedText =
      text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

    console.log(
      `Texte original: ${text.length} caractères, texte tronqué: ${truncatedText.length} caractères`
    );

    const prompt = `Résume moi simplement avec des mots simples ce texte : ${truncatedText}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Erreur API OpenAI: ${response.status} - ${
          errorData.error?.message || "Erreur inconnue"
        }`
      );
    }

    const data = await response.json();
    const summaryText =
      data.choices[0]?.message?.content || "Aucune réponse générée";

    console.log("Résumé OpenAI:", summaryText);
    return summaryText;
  } catch (error) {
    console.error("Erreur OpenAI:", error);
    throw error;
  }
}
