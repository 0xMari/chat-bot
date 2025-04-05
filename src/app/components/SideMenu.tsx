import { 
  PlusIcon, 
  ChatBubbleLeftIcon, 
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon 
} from '@heroicons/react/24/outline'
import { useState, useEffect, useRef } from 'react'

interface Chat {
  id: string;
  title: string;
  messages: { role: string; content: string }[];
}

interface SideMenuProps {
  chats: Chat[];
  currentChatId: string;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onRenameChat: (chatId: string, newTitle: string) => void;
  isOpen: boolean;
}

export default function SideMenu({ 
  chats, 
  currentChatId, 
  onNewChat, 
  onSelectChat, 
  onDeleteChat,
  onRenameChat,
  isOpen 
}: SideMenuProps) {
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && 
          !dropdownRef.current.contains(event.target as Node) && 
          !menuButtonRef.current?.contains(event.target as Node)) {
        setMenuOpenId(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRename = (chatId: string) => {
    setMenuOpenId(null);
    setEditingId(chatId);
    setEditTitle(chats.find(chat => chat.id === chatId)?.title || '');
  };

  const submitRename = (chatId: string) => {
    if (editTitle.trim()) {
      onRenameChat(chatId, editTitle.trim());
    }
    setEditingId(null);
  };

  return (
    <div className={`h-full md:pt-8 bg-gray-100 transition-all duration-300 absolute md:relative
      ${isOpen ? 'w-64 p-4 translate-x-0' : 'w-0 -translate-x-full md:w-16 md:p-2 md:translate-x-0'}
    `}>
      <div className={`h-full flex flex-col pt-12 ${!isOpen && 'hidden md:flex'}`}>
        <button 
          onClick={onNewChat}
          className={`flex items-center justify-center gap-2 w-full mb-4 p-3 rounded-lg bg-gray-700 text-white hover:bg-pink-300`}
        >
          <PlusIcon className="h-5 w-5" />
          {isOpen && <span>New Chat</span>}
        </button>
        
        <div className="flex-1 overflow-y-auto min-h-0">
          {chats.map(chat => (
            <div key={chat.id} className="relative">
              <div
                onClick={() => onSelectChat(chat.id)}
                className={`w-full text-left mb-2 p-3 rounded-lg flex items-center relative cursor-pointer ${
                  chat.id === currentChatId ? 'bg-gray-200' : 'hover:bg-gray-200'
                } ${!isOpen && 'justify-center'} ${
                  editingId === chat.id ? 'border border-pink-400' : ''
                }`}
              >
                <ChatBubbleLeftIcon className="h-5 w-5 shrink-0" />
                {isOpen && (
                  <>
                    {editingId === chat.id ? (
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onBlur={() => submitRename(chat.id)}
                        onKeyDown={(e) => e.key === 'Enter' && submitRename(chat.id)}
                        className="ml-2 flex-1 bg-transparent outline-none"
                        autoFocus
                      />
                    ) : (
                      <>
                        <div className="ml-2 flex-1 overflow-hidden mr-8">
                          <span className="truncate block">{chat.title}</span>
                        </div>
                        <button
                          ref={menuButtonRef}
                          onClick={(e) => {
                            e.stopPropagation();
                            setMenuOpenId(chat.id === menuOpenId ? null : chat.id);
                          }}
                          className="absolute right-3 p-1 hover:bg-gray-300 rounded"
                        >
                          <EllipsisVerticalIcon className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>

              
              <div
                ref={dropdownRef}
                className={`absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 
                  transition-all duration-200 origin-top-right
                  ${menuOpenId === chat.id ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
                `}
              >
                <div className="py-1">
                  <button
                    onClick={() => handleRename(chat.id)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <PencilSquareIcon className="h-4 w-4" />
                    Rename
                  </button>
                  <button
                    onClick={() => {
                      onDeleteChat(chat.id);
                      setMenuOpenId(null);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <TrashIcon className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 