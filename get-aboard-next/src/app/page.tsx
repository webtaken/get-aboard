import AllToolsIcon from "@/components/Icons/AllToolsIcon";
import GetAboardIcon from "@/components/Icons/GetAboardIcon";
import { Button } from "@/components/ui/button";
import { getOneTimePaymentProducts } from "@/lib/billing-actions";
import { Github, Twitter, Zap } from "lucide-react";
import Link from "next/link";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import ProductButton from "@/components/Billing/ProductButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { AnimatedBeamMultipleOutputDemo } from "@/components/Landing/AnimatedBeam";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import Reviews from "@/components/Landing/Reviews";

export default async function Home() {
  const [products, session] = await Promise.all([
    getOneTimePaymentProducts(),
    getServerSession(authOptions),
  ]);
  let billingCard = null;
  if ("code" in products) {
    billingCard = (
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader className="rounded-t-md p-4 bg-gray-50 dark:bg-gray-950">
          <h3 className="text-xl font-bold">
            Please Login to view the pricing
          </h3>
        </CardHeader>
        <CardFooter className="flex flex-col items-stretch gap-2 px-10">
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  } else {
    const product = products[0];
    billingCard = (
      <Card className="min-w-[350px]">
        <CardHeader className="rounded-t-md p-4 text-center">
          <div className="flex justify-center mb-2">
            <Badge variant="secondary" className="px-3 py-1">
              15 Days Free Trial
            </Badge>
          </div>
          <CardTitle className="text-2xl font-bold">
            {product.product_name}
          </CardTitle>
          <CardDescription>Start your journey with get-aboard</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-2">
            <span className="text-4xl font-bold">
              ${parseFloat(product.price) / 100}
            </span>
          </div>
          <p className="text-sm font-medium text-primary mb-4">
            One-time purchase
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Try it free for 15 days before buying, <br />
            no card info required
          </p>
          <div
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </CardContent>
        <CardFooter className="p-4 flex flex-col items-stretch gap-2">
          <ProductButton products={products} isLoggedIn={session !== null} />
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="px-10">
      <main className="min-h-screen min-w-80 px-5 sm:px-10 md:px-14">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="space-y-4 self-center">
            <a
              href="https://www.producthunt.com/posts/get-aboard?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-get&#0045;aboard"
              target="_blank"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=471411&theme=light"
                alt="get&#0045;aboard - Convert&#0032;your&#0032;onboarding&#0032;process&#0032;into&#0032;interactive&#0032;roadmaps | Product Hunt"
                className="w-56"
              />
            </a>
            <h1 className="mt-20 mb-5 text-left text-4xl lg:text-5xl font-bold tracking-tight">
              Make job <span className="text-primary">onboardings</span>
            </h1>
            <h1 className="mt-20 mb-5 text-left text-5xl md:text-5xl lg:text-5xl font-bold tracking-tight">
              in <span className="text-primary">minutes</span> 🚀
            </h1>
            <p className="text-muted-foreground font-semibold">
              Organize all important information to new team members in one easy
              to follow roadmap: tools, tech stack, communication software,
              repositories, benefits info, career path, etc.
            </p>
            <Button asChild>
              <Link href="/demo" className="flex items-center gap-x-2">
                <Zap className="w-4 h-4" />
                Try get-aboard now!
              </Link>
            </Button>
          </div>
          <div className="hidden sm:block">
            <AnimatedBeamMultipleOutputDemo />
            {/* <AllToolsIcon className="w-100 h-100" /> */}
          </div>
        </div>

        <Reviews />

        <p className="text-xl text-center mt-20 mb-5 text-muted-foreground">
          Avoid unorganized instruction docs onboardings 🫠 <br />
          in your development team. Make it roadmaps.
        </p>
        <HeroVideoDialog
          className="dark:hidden block mx-auto w-11/12 h-[150px] sm:h-[250px] md:h-[350px] lg:h-[450px] rounded-lg"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/xqWuGNOsJPM?autoplay=1&mute=1&controls=0&loop=1"
          thumbnailSrc="/images/marketing/roadmap.jpeg"
          thumbnailAlt="Demo Video"
        />
        <HeroVideoDialog
          className="hidden dark:block mx-auto w-11/12 h-[150px] sm:h-[250px] md:h-[350px] lg:h-[450px] rounded-lg"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/xqWuGNOsJPM?autoplay=1&mute=1&controls=0&loop=1"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
          thumbnailAlt="Demo Video"
        />

        <h1 className="mt-20 mb-5 text-center text-4xl font-extrabold tracking-tight lg:text-5xl text-transparent gradient-text bg-gradient-to-r from-fuchsia-500 via-teal-600 to-fuchsia-500 bg-clip-text">
          Save time and get
          <br />
          more done
        </h1>

        <p className="text-center mt-5 mb-20 text-muted-foreground font-semibold">
          Developers, UX/UI designers, QA...
          <br /> deserve quality onboardings
        </p>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-2 my-2">
          <div className="w-full">
            <h1 className="mt-5 text-center text-2xl font-extrabold tracking-tight lg:text-3xl gradient-text bg-gradient-to-r">
              Improve collaboration
            </h1>
            <p className="text-center my-5 font-semibold">
              Improve the quality of your team integration process
              <br /> by collaborating and providing a better vision of
              <br /> your organization.
            </p>
            <div className="flex items-center justify-center gap-2">
              <Button variant="default" className="rounded-lg">
                Intuitive
              </Button>
              <Button variant="secondary" className="rounded-lg">
                Automatic
              </Button>
              <Button variant="default" className="rounded-lg">
                Organized
              </Button>
              <Button variant="secondary" className="rounded-lg">
                Shareable
              </Button>
            </div>
          </div>
          <div className="w-full">
            <HeroVideoDialog
              className="dark:hidden block mx-auto w-full h-80 rounded-lg"
              animationStyle="from-center"
              videoSrc="https://www.youtube.com/embed/YBvichU4CRU?autoplay=1&mute=1&controls=0&loop=1"
              thumbnailSrc="/images/marketing/share.png"
              thumbnailAlt="Share Feature"
            />
            <HeroVideoDialog
              className="hidden dark:block mx-auto w-full h-80 rounded-lg"
              animationStyle="from-center"
              videoSrc="https://www.youtube.com/embed/YBvichU4CRU?autoplay=1&mute=1&controls=0&loop=1"
              thumbnailSrc="/images/marketing/share.png"
              thumbnailAlt="Share Feature"
            />
          </div>
        </section>

        <section className="my-20 flex flex-col justify-center">
          <h1 className="text-center text-3xl font-extrabold tracking-tight lg:text-5xl text-transparent gradient-text bg-gradient-to-r from-fuchsia-500 via-teal-600 to-fuchsia-500 bg-clip-text">
            Interactive
          </h1>
          <h1 className="text-center text-3xl font-extrabold tracking-tight lg:text-5xl">
            Roadmaps
          </h1>
          <p className="text-xl text-center my-5 text-muted-foreground">
            Make on-boarding process an interactive and{" "}
            <span className="font-semibold">easy-to-follow</span> journey
          </p>
          <HeroVideoDialog
            className="dark:hidden block mx-auto w-11/12 h-[150px] sm:h-[250px] md:h-[350px] lg:h-[450px] rounded-lg mt-5"
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/57QTBgV0Yqc?autoplay=1&mute=1&controls=0&loop=1"
            thumbnailSrc="/images/marketing/navigation.png"
            thumbnailAlt="Navigation Feature"
          />
          <HeroVideoDialog
            className="hidden dark:block mx-auto w-11/12 h-[150px] sm:h-[250px] md:h-[350px] lg:h-[450px] rounded-lg mt-5"
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/57QTBgV0Yqc?autoplay=1&mute=1&controls=0&loop=1"
            thumbnailSrc="/images/marketing/navigation.png"
            thumbnailAlt="Navigation Feature"
          />
        </section>

        <section className="mt-20 flex flex-col justify-center">
          <GetAboardIcon className="w-10 h-10 mx-auto stroke-slate-900 dark:stroke-slate-200 stroke-2" />
          <h1 className="text-center text-4xl font-extrabold tracking-tight lg:text-5xl text-transparent gradient-text bg-gradient-to-r from-fuchsia-500 via-teal-600 to-fuchsia-500 bg-clip-text">
            Improve
          </h1>
          <h1 className="text-center text-3xl font-extrabold tracking-tight lg:text-4xl">
            your organization&apos;s processes
          </h1>
          <p className="text-xl text-center my-5 text-muted-foreground">
            <span className="font-semibold">Start your journey</span>
          </p>
        </section>
        <div className="flex justify-center" id="pricing_card">
          {billingCard}
        </div>
      </main>
      <footer className="w-full grid grid-cols-2 py-10">
        <div className="flex flex-col">
          <Link href="/" className="flex items-center gap-x-2">
            <GetAboardIcon className="w-6 h-6 stroke-slate-900 dark:stroke-slate-200" />{" "}
            <span className="text-2xl font-semibold">Get-Aboard</span>
          </Link>
          <p className="text-muted-foreground text-sm font-semibold my-6">
            Improving organizations on-boardings with tools
          </p>
          <p className="text-xs text-muted-foreground">
            © 2024 Get-Aboard Technologies, Inc.
          </p>
        </div>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
          <div className="text-sm flex flex-col gap-y-4">
            <h1 className="font-bold">Features</h1>
            <p className="text-muted-foreground">Roadmap Builder</p>
            <p className="text-muted-foreground">Node Editor</p>
            <p className="text-muted-foreground">Shareable Roadmaps</p>
          </div>
          <div className="text-sm flex flex-col gap-y-4">
            <h1 className="font-bold">Product</h1>
            <Link
              href="https://twitter.com/node_srojas1"
              target="_blank"
              className="text-muted-foreground"
            >
              Help center
            </Link>
            <Link href="/pricing" className="text-muted-foreground">
              Pricing
            </Link>
          </div>
          <div className="text-sm flex flex-col gap-y-4">
            <h1 className="font-bold">Extra links</h1>
            <Link
              href="https://github.com/webtaken/get-aboard"
              target="_blank"
              className="text-sm text-muted-foreground flex items-center gap-x-1"
            >
              <Github className="w-4 h-4" /> project
            </Link>
            <Link
              href="https://twitter.com/node_srojas1"
              target="_blank"
              className="text-sm text-muted-foreground flex items-center gap-x-1"
            >
              <Twitter className="w-4 h-4" /> creator
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
