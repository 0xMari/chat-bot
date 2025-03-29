'use client'
import React, { useState, useEffect, Suspense, useRef } from 'react'
import { getResponse } from '@/app/api/chat/aiRes'
import { ArrowUpIcon } from '@heroicons/react/24/outline'
import {ChatMessage} from '@/app/ChatMessage'



export default function ChatbotPage() {
  const [userMessage, setUserMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [trigger, setTrigger] = useState<string | null> (null)

  const [chatHistory, setChatHistory] = useState <{ role: string; content: string}[]>([])

  const chatRef = useRef<null | HTMLDivElement>(null)
  const temp = 1.0

  useEffect(() => {
    const fetchResponse = async () => {
      if(trigger){
        const newChatHistory = [...chatHistory, { role: 'user', content: trigger }];
        setChatHistory(newChatHistory);
        const aiRes = await getResponse(trigger, temp)
        
        setChatHistory((prev) => [
          ...prev,
          {role: 'assistant', content: aiRes?.toString() || 'default fallback'},
        ])
        //console.log(aiRes)
        setIsLoading(false)
        
      }
    }

    fetchResponse()
    
  }, [trigger])

  const scrollBottom = () => {
    if(chatRef.current) {
      chatRef.current.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'})
      //chatRef.current.scrollIntoView(false)
    }
  }
  useEffect(() => {
    scrollBottom()
  }, [chatHistory])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    //if(!userMessage.trim()) return;
    setIsLoading(true)
    setTrigger(userMessage)
    setUserMessage('')
    
  }

  return (
    <div className="mx-0 w-full h-full py-2 relative overflow-y-hidden">
      <div className='h-full w-full flex flex-col'>
        {chatHistory.length>0 ? (
            <div className='flex-1 flex flex-col h-full w-full overflow-y-scroll p-6 mb-10' >
              {chatHistory.map((chat, index)=> (
                chat.role === 'user' ? (
                  <div key={index}  ref={chatRef} className='mb-5 px-[20px] py-[12px] max-w-[40vw] bg-pink-100 border rounded-[14px] border-pink-100 self-end text-left'>
                    {chat.content}
                  </div>
                ) : (
                  <Suspense fallback={<p>loading...</p>}>
                    <div key={index} ref={chatRef} className='mb-5 p-4 w-full self-start text-left'>
                      <ChatMessage message={chat.content} />
                    </div>
                  </Suspense>
                    
                )
                  
                ) 
              )} 
            </div>
        ):(
          <div className='text-center w-full mt-[40vh] text-5xl'> start a conversation</div>  
        )}
      </div>

      <form onSubmit={handleSubmit} className="absolute bottom-0 left-0 right-0 bg-white mt-6 mx-6 pb-5">
        <div className='flex items-center w-full h-16 border border-gray-300 rounded-3xl p-2'>
          <label className="grow" htmlFor='userMessage'>
            <input
              className="w-full max-w-md bottom-0 outline-none pl-4"
              type= 'text'
              id='userMessage'
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Ask anything..."
            />
            
            
          </label>
          {userMessage && (
            <button type="submit" disabled={isLoading} className='border rounded-3xl p-2 bg-black'>
              <ArrowUpIcon className='size-5 text-[#fff]'/>
            </button>
          )}
        </div>
      </form>
    </div>
  )
}