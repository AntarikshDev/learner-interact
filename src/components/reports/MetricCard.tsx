import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export const MetricCard = ({
  title,
  value,
  change,
  changeLabel = "vs previous",
  icon: Icon,
  trend = "neutral",
  className,
}: MetricCardProps) => {
  const trendColor = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-muted-foreground",
  }[trend];

  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
        <CardTitle className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-3 w-3 text-muted-foreground" />
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="text-xl font-semibold">{value}</div>
        {change !== undefined && (
          <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
            <span className={cn("font-medium", trendColor)}>
              {change > 0 ? "+" : ""}
              {change}%
            </span>
            <span>{changeLabel}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};
