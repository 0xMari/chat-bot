import OpenAI from 'openai'

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY,
})

export async function Cose() {
    //const prompt = [{role:}]
    const headers= {
        'Content-Type' : 'applications/json',
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`
    }
    
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: 'deepseek-chat',
        // max_tokens: 300,
        // temperature: 1.5,
        // stream: true,
    })
    const r = completion.choices[0].message.content
    
    return (r)

}