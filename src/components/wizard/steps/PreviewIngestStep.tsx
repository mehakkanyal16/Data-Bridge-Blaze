
import { useWizard } from "@/context/WizardContext";
import { DataPreview } from "@/components/DataPreview";
import { IngestProgress } from "@/components/IngestProgress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockPreviewData = [
  { id: 1, name: "John Doe", email: "john@example.com", created_at: "2023-04-01 12:00:00" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", created_at: "2023-04-02 10:30:00" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", created_at: "2023-04-03 15:45:00" },
];

export function PreviewIngestStep() {
  const { 
    selectedColumns, 
    selectedTable,
    previewData, 
    setPreviewData, 
    isLoading, 
    setIsLoading,
    ingestStatus,
    setIngestStatus,
    processedRecords,
    setProcessedRecords,
    errorMessage
  } = useWizard();
  const { toast } = useToast();

  const handlePreviewData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPreviewData(mockPreviewData);
      setIsLoading(false);
    }, 1000);
  };

  const handleStartIngestion = () => {
    setIngestStatus("running");
    setProcessedRecords(0);
    
    const totalRecords = 25000;
    const updateInterval = 100;
    const recordsPerUpdate = 1250;
    let processed = 0;
    
    const interval = setInterval(() => {
      processed += recordsPerUpdate;
      setProcessedRecords(processed);
      
      if (processed >= totalRecords) {
        clearInterval(interval);
        setIngestStatus("completed");
        toast({
          title: "Ingestion completed",
          description: `Successfully processed ${totalRecords.toLocaleString()} records`,
        });
      }
    }, updateInterval);
  };

  return (
    <div className="space-y-6">
      <DataPreview 
        columns={selectedColumns}
        data={previewData} 
        onPreview={handlePreviewData}
        isLoading={isLoading}
      />
      
      <Separator className="my-6" />
      
      <IngestProgress 
        status={ingestStatus}
        recordsProcessed={processedRecords}
        errorMessage={errorMessage}
      />
      
      <div className="flex justify-end mt-4">
        {ingestStatus === "idle" && (
          <Button 
            onClick={handleStartIngestion} 
            disabled={isLoading || selectedColumns.length === 0 || !selectedTable}
            className="bg-data-green hover:bg-data-green/90"
          >
            <PlayIcon className="mr-2 h-4 w-4" /> Start Ingestion
          </Button>
        )}
      </div>
    </div>
  );
}
