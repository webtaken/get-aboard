import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import GetAboardIcon from "../Icons/GetAboardIcon";
import { getUserFlows } from "@/lib/flow-actions";
import { Skeleton } from "../ui/skeleton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Badge } from "../ui/badge";
import FlowOptions from "./FlowOptions";
import { Pencil } from "lucide-react";

dayjs.extend(relativeTime);

export async function FlowsList() {
  const flows = await getUserFlows();

  if (flows === undefined) {
    return <div>An error ocurred while retrieving data</div>;
  }

  if (flows.length === 0) {
    return <div>You don&apos;t have flows yet, create a new one</div>;
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
                    <p className="truncate align-middle" title={flow.title}>
                      {flow.title}
                    </p>
                  </div>
                  <div className="col-span-1 mx-auto">
                    <FlowOptions flow={flow} />
                  </div>
                </div>
              </CardTitle>
              <CardDescription className="pl-8 flex items-center gap-x-1">
                Click <Pencil className="w-3 h-3" /> to see options
              </CardDescription>
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
      <Card className="min-w-[200px] transition ease-in-out delay-100 duration-200 hover:shadow-xl hover:cursor-pointer">
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
