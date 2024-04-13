/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Kp45ffOxJok
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { authOptions } from "@/auth";
import { SubscriptionPlan } from "@/client";
import PlanButton from "@/components/Billing/PlanButton";
import { Button } from "@/components/ui/button";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { getSubscriptionPlans } from "@/lib/billing-actions";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Page() {
  const [susbcriptionPlans, session] = await Promise.all([
    getSubscriptionPlans(),
    getServerSession(authOptions),
  ]);

  const groupedPlans = new Map<number, SubscriptionPlan[]>();
  susbcriptionPlans.forEach((plan) => {
    if (!groupedPlans.has(plan.product_id)) {
      groupedPlans.set(plan.product_id, [{ ...plan }]);
    } else {
      const arr = groupedPlans.get(plan.product_id);
      arr?.push({ ...plan });
    }
  });
  let listGroupedMaps: SubscriptionPlan[][] = [];
  groupedPlans.forEach((v, k) => {
    listGroupedMaps.push(v);
  });

  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
            Pricing
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Choose the plan that's right for your team
          </h2>
          <p className="max-w-2xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            All plans include workspaces, access controls, and collaboration
            features. Save with annual billing.
          </p>
        </div>
        <div className="mx-auto grid place-items-stretch mt-5 max-w-3xl gap-12 px-4 sm:max-w-4xl lg:max-w-5xl lg:grid-cols-2 lg:gap-16">
          {listGroupedMaps.map((plans) => {
            const isFreePlan = parseFloat(plans[0].price) === 0.0;
            return (
              <Card
                key={plans[0].id}
                className="border-gray-200 dark:border-gray-800"
              >
                <CardHeader className="rounded-t-md p-4 bg-gray-50 dark:bg-gray-950">
                  <h3 className="text-xl font-bold">{plans[0].product_name}</h3>
                  <div
                    className="text-sm text-gray-500 dark:text-gray-400"
                    dangerouslySetInnerHTML={{
                      __html: plans[0].product_description ?? "Try it now",
                    }}
                  />
                </CardHeader>
                <CardContent
                  className="grid gap-4 p-4 text-sm"
                  dangerouslySetInnerHTML={{ __html: plans[0].description }}
                />
                <CardFooter className="p-4 flex flex-col items-stretch gap-2">
                  {plans.length > 1 ? (
                    <div className="grid grid-cols-2 gap-2">
                      <section>
                        <div className="text-2xl font-bold">
                          ${parseFloat(plans[0].price) / 100}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Monthly price
                        </div>
                      </section>
                      <section>
                        <div className="text-2xl font-bold">
                          ${parseFloat(plans[1].price) / 100}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Yearly price
                        </div>
                      </section>
                    </div>
                  ) : (
                    <>
                      <div className="text-2xl font-bold">
                        ${parseFloat(plans[0].price) / 100}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Monthly price
                      </div>
                    </>
                  )}
                  {isFreePlan ? (
                    <Button variant="outline" asChild>
                      <Link href="/dashboard">Get started</Link>
                    </Button>
                  ) : (
                    <PlanButton plans={plans} isLoggedIn={session !== null} />
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
