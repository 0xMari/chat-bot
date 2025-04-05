'use client'
import React, { useState, useEffect, Suspense, useRef } from 'react'
import { getResponse } from '@/app/api/chat/aiRes'
import { ArrowUpIcon, PlusIcon, Bars3Icon } from '@heroicons/react/24/outline'
import {ChatMessage} from '@/app/ChatMessage'
import SideMenu from '@/app/components/SideMenu'



export default function ChatbotPage() {
  const [userMessage, setUserMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [trigger, setTrigger] = useState<string | null>(null)
  
  
  const [chats, setChats] = useState<{
    id: string;
    title: string;
    messages: { role: string; content: string }[];
  }[]>([{ id: '1', title: 'New Chat', messages: [] }])
  const [currentChatId, setCurrentChatId] = useState('1')
  
  
  const chatHistory = chats.find(chat => chat.id === currentChatId)?.messages || []
  
  
  const createNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: []
    }
    setChats(prev => [...prev, newChat])
    setCurrentChatId(newChat.id)
  }

  
  const updateCurrentChat = (messages: { role: string; content: string }[]) => {
    setChats(prev => prev.map(chat => 
      chat.id === currentChatId 
        ? { ...chat, messages, title: messages[0]?.content.slice(0, 30) || 'New Chat' }
        : chat
    ))
  }

  const chatRef = useRef<null | HTMLDivElement>(null)
  const temp = 1.0
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)

  useEffect(() => {
    const fetchResponse = async () => {
      if(trigger){
        const newMessages = [...chatHistory, { role: 'user', content: trigger }];
        updateCurrentChat(newMessages);
        
        
        updateCurrentChat([...newMessages, { role: 'assistant', content: '' }]);
        
        try {
          const stream = await getResponse(trigger, temp);
          let accumulatedContent = '';
          
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            accumulatedContent += content;
            
            
            updateCurrentChat([
              ...newMessages,
              { role: 'assistant', content: accumulatedContent }
            ]);
          }
        } catch (error) {
          console.error('Error:', error);
          updateCurrentChat([
            ...newMessages,
            { role: 'assistant', content: 'An error occurred while processing your request.' }
          ]);
        }
        setIsLoading(false);
      }
    }

    fetchResponse();
  }, [trigger]);

  const scrollBottom = () => {
    if(chatRef.current) {
      chatRef.current.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'})
      
    }
  }
  useEffect(() => {
    scrollBottom()
  }, [chatHistory])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsLoading(true)
    setTrigger(userMessage)
    setUserMessage('')
    
  }

  const handleDeleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(chats[0]?.id || '');
    }
  };

  const handleRenameChat = (chatId: string, newTitle: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, title: newTitle } : chat
    ));
  };

  return (
    <div className="flex h-screen relative">
      
      <button 
        onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
        className="absolute top-4 left-2 z-30 p-3 rounded-lg hover:bg-gray-100 md:hover:bg-transparent"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      
      <div className={`fixed md:relative z-20 h-full`}>
        <SideMenu 
          chats={chats}
          currentChatId={currentChatId}
          onNewChat={createNewChat}
          onSelectChat={setCurrentChatId}
          onDeleteChat={handleDeleteChat}
          onRenameChat={handleRenameChat}
          isOpen={isSideMenuOpen}
        />
      </div>

      
      <div className="flex-1 h-full">
        <div className="mx-auto md:w-[70vw] w-full h-full py-2 relative">
          <div className='h-full w-full flex flex-col pb-12'>
            {chatHistory.length>0 ? (
                <div className='flex-1 flex flex-col h-full w-full overflow-y-scroll p-6 mb-10' >
                  {chatHistory.map((chat, index)=> (
                    chat.role === 'user' ? (
                      <div key={index}  ref={chatRef} className='mb-5 px-[20px] py-[12px] max-w-[40vw] bg-pink-100 dark:bg-pink-800 border rounded-[14px] border-pink-100 dark:border-pink-800 self-end text-left'>
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
              <div className='text-center w-full mt-[40vh] text-5xl'> How can I help you today?</div>  
            )}
          </div>

          <div className='absolute bottom-0 left-0 right-0 bg-white mt-6 mx-6 pb-5 dark:bg-[#171717]'>
            <form onSubmit={handleSubmit} className="">
              <div className='flex items-center w-full h-16 border border-gray-300 rounded-3xl p-2'>
                <label className="grow" htmlFor='userMessage'>
                  <input
                    className="w-full max-w-md bottom-0 outline-none pl-4 dark:bg-[#171717]"
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
            <div className="w-full pt-4 text-center text-gray-500 text-sm ">
              model DeepSeek-V3
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}