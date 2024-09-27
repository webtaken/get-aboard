import { Star, Twitter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ProductHunt } from "../Icons";

interface ReviewCardProps {
  userAvatar: string;
  userName: string;
  userHandle: string;
  rating?: number;
  comment: string;
  date: string;
  platform: "twitter" | "producthunt";
  verified?: boolean;
  link?: string;
}

export default function GeneralReviewCard({
  userAvatar = "/images/profiles/ghost2.png",
  userName = "John Doe",
  userHandle = "@johndoe",
  rating,
  comment = "This is an amazing product! It solved all my problems and I can't imagine working without it now.",
  date = "June 1, 2023",
  platform = "twitter",
  verified = false,
  link = "",
}: ReviewCardProps) {
  const isProductHunt = platform === "producthunt";

  return (
    <Link href={link} target="_blank">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{userName}</h3>
              {verified && (
                <Badge variant="secondary" className="text-xs">
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{userHandle}</p>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          {isProductHunt && rating && (
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
          <p className="text-sm text-gray-600">{comment}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center pt-2">
          <span className="text-xs text-muted-foreground">{date}</span>
          <div className="flex items-center gap-1">
            {isProductHunt ? (
              <>
                <ProductHunt className="size-4" />
                <span className="text-xs font-medium text-[#da552f]">
                  Product Hunt
                </span>
              </>
            ) : (
              <>
                <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                <span className="text-xs font-medium text-[#1DA1F2]">
                  Twitter
                </span>
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
