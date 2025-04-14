
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StepIndicatorProps = {
  steps: number;
  currentStep: number;
  stepTitles?: string[];
  icons?: LucideIcon[];
};

export function StepIndicator({ steps, currentStep, stepTitles, icons }: StepIndicatorProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: steps }).map((_, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;
          const Icon = icons && icons[index];
          
          return (
            <div key={index} className="flex flex-col items-center relative">
              {/* Connect with line except for last item */}
              {index < steps - 1 && (
                <div className="absolute top-5 w-full h-[2px] left-1/2">
                  <div
                    className={cn(
                      "h-full bg-border",
                      isCompleted && "bg-data-indigo"
                    )}
                  ></div>
                </div>
              )}
              
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 z-10",
                  isActive && "border-data-indigo bg-data-indigo/10",
                  isCompleted && "border-data-indigo bg-data-indigo text-white",
                  !isActive && !isCompleted && "border-muted bg-background"
                )}
              >
                {Icon ? (
                  <Icon className={cn(
                    "h-5 w-5",
                    isCompleted && "text-white"
                  )} />
                ) : (
                  <span>{stepNum}</span>
                )}
              </div>
              
              {stepTitles && (
                <span
                  className={cn(
                    "mt-2 text-xs font-medium",
                    isActive && "text-data-indigo",
                    isCompleted && "text-data-indigo",
                    !isActive && !isCompleted && "text-muted-foreground"
                  )}
                >
                  {stepTitles[index]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
