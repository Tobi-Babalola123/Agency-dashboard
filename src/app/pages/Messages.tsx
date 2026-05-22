import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Send, MoreVertical, Phone, Video, Paperclip, Smile } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';
import { Separator } from '../components/ui/separator';
import { cn } from '../components/ui/utils';

const conversations = [
  {
    id: 1,
    name: 'John Smith',
    avatar: 'JS',
    lastMessage: 'Thanks for the update on the project!',
    time: '2m ago',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: 'Sarah Miller',
    avatar: 'SM',
    lastMessage: 'Can we schedule a call tomorrow?',
    time: '1h ago',
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: 'Alex Brown',
    avatar: 'AB',
    lastMessage: 'The design files look great!',
    time: '3h ago',
    unread: 1,
    online: false,
  },
  {
    id: 4,
    name: 'Emma Wilson',
    avatar: 'EW',
    lastMessage: 'I\'ve sent over the invoice',
    time: '1d ago',
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: 'David Lee',
    avatar: 'DL',
    lastMessage: 'Let me know if you need anything else',
    time: '2d ago',
    unread: 0,
    online: true,
  },
];

const messages = [
  {
    id: 1,
    sender: 'John Smith',
    content: 'Hey! How\'s the project coming along?',
    time: '10:30 AM',
    isSelf: false,
  },
  {
    id: 2,
    sender: 'You',
    content: 'Going great! We\'re about 75% done with the redesign.',
    time: '10:32 AM',
    isSelf: true,
  },
  {
    id: 3,
    sender: 'John Smith',
    content: 'That\'s fantastic! When can I expect to see the preview?',
    time: '10:33 AM',
    isSelf: false,
  },
  {
    id: 4,
    sender: 'You',
    content: 'I can share it by end of day tomorrow. Just putting the final touches on the homepage.',
    time: '10:35 AM',
    isSelf: true,
  },
  {
    id: 5,
    sender: 'John Smith',
    content: 'Perfect! Thanks for the update on the project!',
    time: '10:36 AM',
    isSelf: false,
  },
];

export function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-4rem)] p-6 sm:p-8">
      <div className="h-full flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground mt-1">
            Chat with clients and team members
          </p>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 grid gap-4 lg:grid-cols-[320px_1fr] min-h-0">
          {/* Conversations List */}
          <Card className="border-border/40 bg-card/50 backdrop-blur flex flex-col h-full">
            <div className="p-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Separator className="bg-border/40" />
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                {filteredConversations.map((conversation) => (
                  <motion.button
                    key={conversation.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => setSelectedConversation(conversation)}
                    className={cn(
                      'w-full flex items-center gap-3 rounded-lg p-3 text-left transition-colors',
                      'hover:bg-accent/80',
                      selectedConversation.id === conversation.id && 'bg-accent'
                    )}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white">
                          {conversation.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-medium truncate">{conversation.name}</h4>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {conversation.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread > 0 && (
                          <Badge className="h-5 w-5 rounded-full bg-violet-600 p-0 text-[10px] flex items-center justify-center">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Chat Area */}
          <Card className="border-border/40 bg-card/50 backdrop-blur flex flex-col h-full">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/40">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white">
                      {selectedConversation.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {selectedConversation.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{selectedConversation.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedConversation.online ? 'Active now' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      'flex gap-3',
                      message.isSelf && 'flex-row-reverse'
                    )}
                  >
                    {!message.isSelf && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-xs text-white">
                          {selectedConversation.avatar}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        'max-w-[70%] rounded-lg px-4 py-2',
                        message.isSelf
                          ? 'bg-violet-600 text-white'
                          : 'bg-accent'
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={cn(
                          'text-xs mt-1',
                          message.isSelf ? 'text-violet-200' : 'text-muted-foreground'
                        )}
                      >
                        {message.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-border/40">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && messageInput.trim()) {
                      setMessageInput('');
                    }
                  }}
                  className="flex-1"
                />
                <Button variant="ghost" size="icon">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button className="bg-violet-600 hover:bg-violet-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
