"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import GeneralReviewCard from "./GeneralReviewCard";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

// Sample review data
const reviews = [
  {
    userAvatar:
      "https://ph-avatars.imgix.net/4843676/ded95233-0a30-49a2-ad48-7b06b96f4e12.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=120&h=120&fit=crop&dpr=1",
    userName: "Nika Kotláriková",
    userHandle: "@busmark_w_nika",
    rating: 5,
    comment:
      "Interesting idea. I saw some onboarding processing when wireframing the app, it is not easy, when some people skip steps you need to insert the most crucial info the way they will catch everything (and understand it).",
    date: "July 21, 2024",
    platform: "producthunt" as const,
    verified: true,
    link: "https://www.producthunt.com/products/get-aboard?comment=3682335#get-aboard",
  },
  {
    userAvatar:
      "https://pbs.twimg.com/profile_images/1821440903891804160/0xwJzGWe_400x400.jpg",
    userName: "Louis",
    userHandle: "@thegrowthcoder",
    comment:
      "@node_srojas1 impressive reach. productive feedback makes projects shine. keep iterating",
    date: "July 23, 2024",
    platform: "twitter" as const,
    verified: true,
  },
  {
    userAvatar:
      "https://ph-avatars.imgix.net/7334792/56db9539-60b2-47da-8783-df719b36bba0.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=120&h=120&fit=crop&dpr=1",
    userName: "Jules (Juhyeon) Im",
    userHandle: "@jules_offlight",
    rating: 4,
    comment:
      "Congratulations on launching get-aboard! 🙌 It sounds like a great tool to streamline onboarding processes!",
    date: "July 22, 2024",
    platform: "producthunt" as const,
    verified: true,
    link: "https://www.producthunt.com/products/get-aboard?comment=3683189#get-aboard",
  },
  {
    userAvatar:
      "https://ph-avatars.imgix.net/4431771/f3740c50-1dcb-4682-97ec-c4231508862a.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=120&h=120&fit=crop&dpr=1",
    userName: "Leo Y.",
    userHandle: "@leo_ye",
    rating: 4,
    comment:
      "This sounds like a game-changing tool for streamlining onboarding processes! The drag-and-drop feature and integrated editor make it so user-friendly. The ability to share roadmaps with the dev team is just awesome. Excited to see how get-aboard will revolutionize the onboarding experience! Great work! 🚀",
    date: "July 21, 2024",
    platform: "producthunt" as const,
    verified: true,
  },
];

export default function Reviews() {
  return (
    <section className="bg-transparent">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What Users Say</h2>
        <ScrollArea className="relative">
          <div className="flex gap-6 pb-6 -mx-4 px-4 scroll-smooth scrollbar-hide">
            {reviews.map((review, index) => (
              <div key={index} className="flex-none w-full max-w-md">
                <GeneralReviewCard {...review} />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}
