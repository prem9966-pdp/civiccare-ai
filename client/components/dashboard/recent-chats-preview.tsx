import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageSquare, Clock, Send, Bot } from "lucide-react";
import Link from 'next/link';

const mockChats = [
  { id: 1, topic: "Hospital Eligibility", lastMsg: "Which hospital is near me?", time: "2h ago" },
  { id: 2, topic: "Income Certificate", lastMsg: "Where can I find my local office?", time: "1d ago" },
];

export function RecentChatsPreview() {
  return (
    <Card className="border-none shadow-sm bg-white overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
        <div className="space-y-1">
          <CardTitle className="text-lg font-bold tracking-tight">Recent Counselor Chats</CardTitle>
          <CardDescription className="text-xs font-bold text-muted-foreground uppercase tracking-widest">AI Assisted Guidance</CardDescription>
        </div>
        <Link href="/dashboard/chat" className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-100 text-primary hover:bg-slate-50 transition-colors shadow-sm">
          <MessageSquare className="h-5 w-5" />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y p-4">
          {mockChats.map((chat) => (
            <div key={chat.id} className="flex flex-col p-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:bg-white hover:shadow-lg transition-all cursor-pointer mb-3 last:mb-0">
              <div className="flex items-start justify-between mb-3 px-1">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white ring-2 ring-white">
                      <Bot className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-black text-primary tracking-tight">{chat.topic}</p>
                </div>
                <div className="flex items-center space-x-1 text-[10px] font-bold text-slate-400">
                  <Clock className="h-3 w-3" />
                  <span>{chat.time}</span>
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-100 group-hover:border-accent/10 transition-colors">
                <p className="text-xs text-slate-500 italic flex items-start">
                   <span className="pr-2 opacity-30 text-lg leading-none">&ldquo;</span>
                   {chat.lastMsg}
                </p>
              </div>
              <div className="mt-3 flex items-center justify-end px-1">
                  <Link href={`/dashboard/chat/${chat.id}`} className="text-[10px] font-black text-primary hover:text-accent uppercase tracking-[0.1em] flex items-center">
                    Continue <Send className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-all" />
                  </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t bg-slate-50/50 text-center">
          <Link href="/dashboard/chat" className="text-xs font-black text-primary hover:underline underline-offset-4 uppercase tracking-[0.1em]">
            Start New Consultation
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
