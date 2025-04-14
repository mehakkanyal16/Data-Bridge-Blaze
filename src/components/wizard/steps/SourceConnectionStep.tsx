
import { useWizard } from "@/context/WizardContext";
import { ClickHouseConnectionForm } from "@/components/forms/ClickHouseConnectionForm";
import { FlatFileConnectionForm } from "@/components/forms/FlatFileConnectionForm";
import { useToast } from "@/hooks/use-toast";

type SourceConnectionStepProps = {
  sourceType: "clickhouse" | "file";
};

export function SourceConnectionStep({ sourceType }: SourceConnectionStepProps) {
  const { setClickhouseConnection, setFileConnection, nextStep, isLoading, setIsLoading } = useWizard();
  const { toast } = useToast();

  const handleSourceConnect = (data: any) => {
    setIsLoading(true);
    
    setTimeout(() => {
      if (sourceType === "clickhouse") {
        setClickhouseConnection(data);
        toast({
          title: "Connection successful",
          description: `Connected to ClickHouse at ${data.host}:${data.port}`,
        });
      } else {
        setFileConnection(data);
        toast({
          title: "Flat file selected",
          description: `File selected: ${data.filePath}`,
        });
      }
      setIsLoading(false);
      nextStep();
    }, 1500);
  };

  return sourceType === "clickhouse" ? (
    <ClickHouseConnectionForm 
      onSubmit={handleSourceConnect} 
      isLoading={isLoading} 
    />
  ) : (
    <FlatFileConnectionForm 
      onSubmit={handleSourceConnect} 
      isLoading={isLoading} 
    />
  );
}
