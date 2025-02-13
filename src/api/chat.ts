

export async function chat(id: string, messages: string[]) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs: messages }),
        }
    );
    return await response.json();
}