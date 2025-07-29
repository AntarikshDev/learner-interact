import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Chat {
  avatar: string;
  name: string;
  text: string;
  time: number;
  textCount: number;
  dot: number;
}

const chatData: Chat[] = [
  {
    avatar: "/placeholder.svg",
    name: "Devid Heilo",
    text: "How are you?",
    time: 12,
    textCount: 3,
    dot: 3,
  },
  {
    avatar: "/placeholder.svg",
    name: "Henry Fisher",
    text: "Waiting for you!",
    time: 12,
    textCount: 0,
    dot: 1,
  },
  {
    avatar: "/placeholder.svg",
    name: "Jhon Doe",
    text: "What's up?",
    time: 32,
    textCount: 0,
    dot: 3,
  },
  {
    avatar: "/placeholder.svg",
    name: "Jane Doe",
    text: "Great",
    time: 32,
    textCount: 2,
    dot: 6,
  },
  {
    avatar: "/placeholder.svg",
    name: "Jhon Doe",
    text: "How are you?",
    time: 32,
    textCount: 0,
    dot: 3,
  },
  {
    avatar: "/placeholder.svg",
    name: "Jhon Doe",
    text: "How are you?",
    time: 32,
    textCount: 3,
    dot: 6,
  },
];

const ChatCard = () => {
  const getStatusColor = (dot: number) => {
    switch (dot) {
      case 1: return "bg-yellow-500";
      case 3: return "bg-green-500";
      case 6: return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="col-span-12 rounded-sm border border-border bg-card py-6 shadow-lg dark:bg-card xl:col-span-4">
      <h4 className="mb-6 px-7 text-xl font-semibold text-card-foreground">
        Chats
      </h4>

      <div>
        {chatData.map((chat, key) => (
          <div
            className="flex items-center gap-5 px-7 py-3 hover:bg-muted/50 cursor-pointer transition-colors"
            key={key}
          >
            <div className="relative">
              <Avatar className="h-14 w-14">
                <AvatarImage src={chat.avatar} alt={chat.name} />
                <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-background ${getStatusColor(chat.dot)}`}
              />
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-card-foreground">
                  {chat.name}
                </h5>
                <p className="text-sm text-muted-foreground">
                  <span>{chat.text}</span>
                  <span className="text-xs"> · {chat.time} min</span>
                </p>
              </div>
              {chat.textCount !== 0 && (
                <Badge variant="default" className="h-6 w-6 rounded-full p-0 flex items-center justify-center bg-primary text-primary-foreground">
                  <span className="text-sm font-medium">
                    {chat.textCount}
                  </span>
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatCard;