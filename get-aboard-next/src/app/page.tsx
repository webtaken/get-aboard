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
} from "@/components/ui/card";
import PlanButton from "@/components/Billing/PlanButton";
import ProductButton from "@/components/Billing/ProductButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export default async function Home() {
  const [products, session] = await Promise.all([
    getOneTimePaymentProducts(),
    getServerSession(authOptions),
  ]);
  const product = products[0];

  return (
    <div className="px-10">
      <main className="min-h-screen min-w-80 px-5 sm:px-10 md:px-14">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 mb-10">
          <div className="space-y-4">
            {/* <h1 className="mt-20 mb-5 text-left text-5xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent gradient-text bg-gradient-to-r from-fuchsia-500 via-teal-600 to-fuchsia-500 bg-clip-text">
              Convert onboardings
              <br />
              into easy roadmaps
            </h1> */}
            <h1 className="mt-20 mb-5 text-left text-5xl md:text-5xl lg:text-5xl font-extrabold tracking-tight">
              Convert <span className="text-primary">onboardings</span>
            </h1>
            <h1 className="mt-20 mb-5 text-left text-5xl md:text-5xl lg:text-5xl font-extrabold tracking-tight">
              into <span className="text-primary">easy roadmaps</span>
            </h1>
            <p className="font-semibold">
              Organize all important information to new team members in one easy
              to follow roadmap: tools, tech stack, communication software,
              repositories, benefits info, career path, etc.
            </p>
            <Button asChild>
              <Link href="/#pricing_card" className="flex items-center gap-x-2">
                <Zap className="w-4 h-4" />
                Get started
              </Link>
            </Button>
          </div>
          <div>
            <AllToolsIcon className="w-100 h-100" />
          </div>
        </div>

        <p className="text-xl text-center mt-20 mb-5 text-muted-foreground">
          Avoid unorganized instruction docs onboardings 🫠 <br />
          in your development team. Make it roadmaps.
        </p>
        <iframe
          className="mx-auto w-11/12 h-[150px] sm:h-[250px] md:h-[350px] lg:h-[450px] rounded-lg"
          src="https://www.youtube.com/embed/xqWuGNOsJPM?autoplay=1&mute=1&controls=0&loop=1"
          title="Get-aboard Presentation"
          allow="accelerometer; autoplay; mute; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; loop;"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>

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
            <iframe
              className="mx-auto w-full h-80 rounded-lg"
              src="https://www.youtube.com/embed/YBvichU4CRU?autoplay=1&mute=1&controls=0&loop=1"
              title="Share feature"
              allow="accelerometer; autoplay; mute; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; loop;"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
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
          <iframe
            className="mx-auto w-11/12 h-[150px] sm:h-[250px] md:h-[350px] lg:h-[450px] rounded-lg mt-5"
            src="https://www.youtube.com/embed/57QTBgV0Yqc?autoplay=1&mute=1&controls=0&loop=1"
            title="Navigation feature"
            allow="accelerometer; autoplay; mute; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; loop;"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
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
          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader className="rounded-t-md p-4 bg-gray-50 dark:bg-gray-950">
              <h3 className="text-xl font-bold">{product.product_name}</h3>
              <div
                className="text-sm text-gray-500 dark:text-gray-400"
                dangerouslySetInnerHTML={{
                  __html: product.product_description ?? "Try it now",
                }}
              />
            </CardHeader>
            <CardContent
              className="grid gap-4 p-4 text-sm"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            <CardFooter className="p-4 flex flex-col items-stretch gap-2">
              <div className="text-2xl font-bold">
                ${parseFloat(product.price) / 100}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                One Time Payment
              </div>
              <ProductButton
                products={products}
                isLoggedIn={session !== null}
              />
            </CardFooter>
          </Card>
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
