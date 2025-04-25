
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare,
  X,
  Send,
  Bot,
  Paperclip,
  Mic,
  Image as ImageIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
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
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // When opening chat, check for unread messages
      toast({
        title: "IndoSource Support",
        description: "You have 2 unread messages",
      });
    }
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

  const simulateTyping = () => {
    setIsTyping(true);
    // Add a temporary typing indicator message
    const typingMessage: Message = {
      id: "typing-" + Date.now().toString(),
      text: "",
      isUser: false,
      timestamp: new Date(),
      isTyping: true
    };
    
    setMessages(prev => [...prev, typingMessage]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    addMessage(inputValue, true);
    setInputValue("");

    // Show typing indicator
    simulateTyping();

    // Simulate response after a short delay
    setTimeout(() => {
      setIsTyping(false);
      // Remove typing indicator
      setMessages(prev => prev.filter(msg => !msg.isTyping));
      
      const responses = [
        "Thank you for your message. Our support team will get back to you soon.",
        "I understand your question. Let me connect you with our sourcing experts.",
        "That's a great question about our platform! Our goal is to connect buyers with verified Indian sourcing agents.",
        "We currently support multiple industries including textiles, electronics and handicrafts.",
        "You can create a sourcing request from your buyer dashboard.",
        "Our blockchain integration ensures all transactions are secure and transparent.",
        "Let me help you understand how our verification process works for sourcing agents.",
        "Yes, we can connect you with agents who specialize in your specific industry."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage(randomResponse, false);
    }, 1500);
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
                  {message.isTyping ? (
                    <div className="flex space-x-1 items-center py-2 px-1">
                      <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-white">
            <div className="flex items-center gap-2">
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full text-gray-500"
                onClick={() => toast({
                  title: "Attachment Feature",
                  description: "File upload coming soon!"
                })}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
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
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <button type="button" className="flex items-center hover:text-gray-700" onClick={() => toast({
                title: "Voice Message",
                description: "Voice recording coming soon!"
              })}>
                <Mic className="h-3 w-3 mr-1" />
                <span>Record</span>
              </button>
              <button type="button" className="flex items-center hover:text-gray-700" onClick={() => toast({
                title: "Image Upload",
                description: "Image sharing coming soon!"
              })}>
                <ImageIcon className="h-3 w-3 mr-1" />
                <span>Send Image</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <Button 
          onClick={toggleChat}
          className="h-14 w-14 rounded-full bg-marketplace-blue hover:bg-marketplace-blue-light shadow-lg flex items-center justify-center relative"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 rounded-full h-5 w-5 flex items-center justify-center text-xs text-white font-bold">2</span>
        </Button>
      )}
    </div>
  );
};

export default ChatWidget;
