
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare,
  X,
  Send,
  Bot
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    text: "👋 Welcome to IndoSource Support! How can I help you today?",
    isUser: false,
    timestamp: new Date()
  }
];

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addMessage = (text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    addMessage(inputValue, true);
    setInputValue("");

    // Simulate response after a short delay
    setTimeout(() => {
      const responses = [
        "Thank you for your message. Our support team will get back to you soon.",
        "I understand your question. Let me connect you with our sourcing experts.",
        "That's a great question about our platform! Our goal is to connect buyers with verified Indian sourcing agents.",
        "We currently support multiple industries including textiles, electronics and handicrafts.",
        "You can create a sourcing request from your buyer dashboard."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage(randomResponse, false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="flex flex-col w-80 h-96 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="flex items-center justify-between bg-marketplace-blue p-4 text-white">
            <div className="flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              <h3 className="font-medium">IndoSource Support</h3>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-marketplace-blue-light h-8 w-8"
              onClick={toggleChat}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser 
                      ? 'bg-marketplace-blue text-white rounded-br-none' 
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-white">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Type a message..."
                value={inputValue}
                onChange={handleInputChange}
                className="flex-1"
              />
              <Button type="submit" size="icon" className="bg-marketplace-blue hover:bg-marketplace-blue-light">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Button 
          onClick={toggleChat}
          className="h-14 w-14 rounded-full bg-marketplace-blue hover:bg-marketplace-blue-light shadow-lg flex items-center justify-center"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default ChatWidget;
