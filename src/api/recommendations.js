import axios from "axios"
export const fetchRecommendations = async (preferences) => {
  const REACT_APP_API_KEY = "AIzaSyBxoTiHUFceaYmO4PS6cBU70SzMahm81W8"
  try {
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${REACT_APP_API_KEY}`,
      method: "post",
      data: {
        contents: [
          {
            parts: [
              {
                text: `Generate 5 random category names based on: ${preferences}. Example: travel, education, etc.`,
              },
            ],
          },
        ],
      },
    });

    const generatedContent = response.data?.candidates?.[0]?.content?.parts?.[0]?.text.split("\n");
    console.log('Generated Content:', generatedContent);
    return generatedContent;
  } catch (error) {
    console.error('Error generating category names:', error);
  }
};
