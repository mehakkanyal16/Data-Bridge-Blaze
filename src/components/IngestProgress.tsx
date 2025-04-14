
import { CheckIcon, AlertTriangleIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type IngestProgressProps = {
  status: "idle" | "running" | "completed" | "error";
  recordsProcessed: number;
  errorMessage: string | null;
};

export function IngestProgress({
  status,
  recordsProcessed,
  errorMessage,
}: IngestProgressProps) {
  if (status === "idle") {
    return (
      <div className="p-6 border border-dashed rounded-md text-center">
        <h3 className="text-sm font-medium text-muted-foreground">
          Ready to start data ingestion
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Click the "Start Ingestion" button to begin the transfer process
        </p>
      </div>
    );
  }
  
  if (status === "error") {
    return (
      <Alert variant="destructive">
        <AlertTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error during data ingestion</AlertTitle>
        <AlertDescription>
          {errorMessage || "An unexpected error occurred during data ingestion."}
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">
          {status === "running" ? "Ingestion in Progress" : "Ingestion Complete"}
        </h3>
        <div className="text-sm font-medium">
          {recordsProcessed.toLocaleString()} records
        </div>
      </div>
      
      <Progress 
        value={status === "completed" ? 100 : undefined} 
        className={cn(
          "h-2",
          status === "running" && "animate-progress"
        )}
      />
      
      {status === "completed" && (
        <div className="p-4 border rounded-md bg-green-50 text-green-700 flex items-center space-x-2">
          <CheckIcon className="h-5 w-5" />
          <div>
            <h4 className="font-medium">Ingestion Completed Successfully</h4>
            <p className="text-sm">
              Successfully processed {recordsProcessed.toLocaleString()} records
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
