import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Flow } from "@/client";
import GetAboardIcon from "../Icons/GetAboardIcon";
import { getUserFlows } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

interface FlowsListProps {
  flows: Flow[];
}

export async function FlowsList() {
  setTimeout(() => {}, 2000);
  const flows = await getUserFlows();

  if (flows === undefined) {
    return <div>An error ocurred while retrieving data</div>;
  }

  if (flows.length === 0) {
    return <div>You don&apos;t have flows, create a new one</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-w-28">
      {flows.map((flow) => {
        return (
          <Card
            key={flow.flow_id}
            className="min-w-[200px] transition ease-in-out delay-100 duration-200 hover:shadow-xl hover:cursor-pointer"
          >
            <CardHeader className="space-y-2">
              <CardTitle className="flex items-center gap-x-2">
                <GetAboardIcon className="w-6 h-6 stroke-slate-900 dark:stroke-slate-200" />{" "}
                {flow.title}
              </CardTitle>
              <CardDescription>Click to see</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3">{flow.description}</p>
            </CardContent>
            <CardFooter>
              <p>{flow.updated_at}</p>
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
