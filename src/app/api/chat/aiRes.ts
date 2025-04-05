import OpenAI from 'openai'


const key = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY

const deepSeek = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: key ,
    dangerouslyAllowBrowser: true,
})

export async function getResponse (userMessage: string, temp: number){
    
    try{
        // console.log(process.env.DEEPSEEK_API_KEY)
        //console.log(key)
        const response = await deepSeek.chat.completions.create({
        messages: [{ role: 'user' , content: userMessage}],
        model: 'deepseek-chat',
        temperature: temp,
        stream: true,        
        })
        //return(response.choices[0].message.content)
        return response
    } catch (error) {
        console.error(error)
        throw new Error('An error has occured while processing your message.')
    }
}
