import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Star, ChevronRight, Bookmark } from "lucide-react";
import Link from 'next/link';

const mockSchemes = [
  { id: 1, title: "PM JAY Ayushman", category: "Health", matching: "98%", color: "text-emerald-500 bg-emerald-50" },
  { id: 2, title: "Kisan Credit Card", category: "Agriculture", matching: "85%", color: "text-blue-500 bg-blue-50" },
  { id: 3, title: "Skill India Program", category: "Education", matching: "92%", color: "text-purple-500 bg-purple-50" },
];

export function SavedSchemesPreview() {
  return (
    <Card className="border-none shadow-sm bg-white overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
        <div className="space-y-1">
          <CardTitle className="text-lg font-bold">Saved Schemes</CardTitle>
          <CardDescription className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Bookmarks & Followed items</CardDescription>
        </div>
        <Link href="/dashboard/schemes" className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-100 text-primary hover:bg-slate-50 transition-colors shadow-sm">
          <Bookmark className="h-5 w-5" />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y p-4">
          {mockSchemes.map((scheme) => (
            <div key={scheme.id} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 transition-all cursor-pointer group mb-2 last:mb-0">
              <div className="flex items-center space-x-4">
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center font-bold ${scheme.color}`}>
                  {scheme.category[0]}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-primary group-hover:text-accent transition-colors">{scheme.title}</p>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.1em]">{scheme.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6 text-right">
                <div className="space-y-1 flex flex-col items-end">
                    <p className="text-xs font-black text-emerald-600 transition-all">{scheme.matching} Match</p>
                    <div className="h-1 w-12 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 transition-all" style={{ width: scheme.matching }}></div>
                    </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-primary transition-all group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t bg-slate-50/50 text-center">
          <Link href="/dashboard/schemes" className="text-xs font-black text-primary hover:underline underline-offset-4 uppercase tracking-[0.1em]">
            View All Saved ({mockSchemes.length})
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
