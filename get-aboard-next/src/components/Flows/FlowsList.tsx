import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import GetAboardIcon from "../Icons/GetAboardIcon";
import { getUserFlows, createFlow } from "@/lib/flow-actions";
import { Skeleton } from "../ui/skeleton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Badge } from "../ui/badge";
import FlowOptions from "./FlowOptions";
import { Pencil } from "lucide-react";
import FlowEditDialog from "../commons/FlowEditDialog";
import { Button } from "../ui/button";
import Link from "next/link";
import { HasAccess } from "@/client";

dayjs.extend(relativeTime);

export async function FlowsList({ access }: { access: HasAccess }) {
  const flows = await getUserFlows();

  if (flows === undefined) {
    return <div>An error ocurred while retrieving data</div>;
  }

  let message = null;
  if (access.has_free_trial) {
    message = (
      <>
        <h2 className="text-center font-semibold text-xl">
          You&apos;re on your free trial
        </h2>
        <p className="text-center text-sm text-muted-foreground">
          Start a new Roadmap
        </p>
        <div className="flex justify-center">
          <FlowEditDialog
            trigger={
              <Button className="flex items-center gap-x-2">
                Create Roadmap
              </Button>
            }
            title="Create your flow"
            submitText="Create"
            // @ts-expect-error
            action={createFlow.bind(null)}
          />
        </div>
      </>
    );
  } else {
    message = (
      <>
        <h2 className="text-center font-semibold text-xl">
          Your free trial has ended up
        </h2>
        <p className="text-center text-sm text-muted-foreground">
          Buy get-aboard to continue
        </p>
        <div className="flex justify-center">
          <Button className="px-3 py-2" asChild>
            <Link href="/#pricing_card">Buy get-aboard</Link>
          </Button>
        </div>
      </>
    );
  }

  if (access.is_staff) {
    message = (
      <>
        <h2 className="text-center font-semibold text-xl">
          You&apos;re on the staff, feel free to use the app
        </h2>
        <p className="text-center text-sm text-muted-foreground">
          Start a new Roadmap
        </p>
        <div className="flex justify-center">
          <FlowEditDialog
            trigger={
              <Button className="flex items-center gap-x-2">
                Create Roadmap
              </Button>
            }
            title="Create your flow"
            submitText="Create"
            // @ts-expect-error
            action={createFlow.bind(null)}
          />
        </div>
      </>
    );
  }

  if (!access.has_access) {
    return <div className="flex flex-col gap-5">{message}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-w-28">
      {flows.map((flow) => {
        return (
          <Card
            key={flow.flow_id}
            className="min-w-[200px] transition ease-in-out delay-100 duration-200 hover:shadow-xl"
          >
            <CardHeader className="space-y-2">
              <CardTitle>
                <div className="grid grid-cols-6 place-content-center gap-x-2">
                  <div className="col-span-5 flex items-center gap-x-2">
                    <GetAboardIcon className="min-w-6 min-h-6 w-6 h-6 stroke-slate-900 dark:stroke-slate-200" />
                    {access.has_access ? (
                      <Button
                        variant="link"
                        className="text-xl truncate align-middle"
                        asChild
                      >
                        <Link
                          href={`/dashboard/flows/${flow.flow_id}`}
                          title={flow.title}
                        >
                          {flow.title}
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        variant="link"
                        className="text-xl truncate align-middle"
                        asChild
                      >
                        {flow.title}
                      </Button>
                    )}
                  </div>
                  <div className="col-span-1 mx-auto">
                    {access.has_access && <FlowOptions flow={flow} />}
                  </div>
                </div>
              </CardTitle>
              {access.has_access ? (
                <CardDescription className="pl-8 flex items-center gap-x-1">
                  Click <Pencil className="w-3 h-3" /> to see options
                </CardDescription>
              ) : (
                <CardDescription className="pl-8 flex items-center gap-x-1">
                  Buy get-aboard to edit your flow
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-sm">{flow.description}</p>
            </CardContent>
            <CardFooter>
              <Badge
                variant="outline"
                title={`last update: ${dayjs(flow.updated_at).format(
                  "YYYY-MM-DD (hh:mm A)"
                )}`}
              >
                {dayjs(flow.updated_at).fromNow()}
              </Badge>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

export function FlowsListFallback() {
  return (
    <div className="grid grid-cols-1 justify-items-center">
      <Card className="min-w-[200px] transition ease-in-out delay-100 duration-200 hover:shadow-2xl hover:cursor-pointer">
        <CardHeader className="space-y-2">
          <CardTitle className="flex items-center gap-x-2">
            <GetAboardIcon className="w-6 h-6 stroke-slate-900 dark:stroke-slate-200" />{" "}
            <Skeleton className="w-[200px] h-4" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-16" />
        </CardContent>
        <CardFooter>
          <Skeleton className="w-full h-4" />
        </CardFooter>
      </Card>
    </div>
  );
}
