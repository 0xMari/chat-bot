import OpenAI from 'openai'

// const deepSeek = new OpenAI({
//     baseURL: 'https://api.deepseek.com',
//     apiKey: process.env.DEEPSEEK_API_KEY,
// })


const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: 'sk-f89487bd5ece499895f3a7057d70d952',
    //apiKey: ``+process.env.DEEPSEEK_API_KEY,
    dangerouslyAllowBrowser: true,
})

export async function getResponse (userMessage: string, temp: number){
    
    try{
        console.log(process.env.DEEPSEEK_API_KEY)
        const response = await openai.chat.completions.create({
        messages: [{ role: 'user' , content: userMessage}],
        model: 'deepseek-chat',
        temperature: temp,        
        })
        return(response.choices[0].message.content)
    } catch (error) {
        console.error(error)
        throw new Error('An error has occured while processing your message.')
    }
}
