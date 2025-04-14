
import { useWizard } from "@/context/WizardContext";
import { ClickHouseConnectionForm } from "@/components/forms/ClickHouseConnectionForm";
import { FlatFileConnectionForm } from "@/components/forms/FlatFileConnectionForm";
import { useToast } from "@/hooks/use-toast";

type TargetConnectionStepProps = {
  targetType: "clickhouse" | "file";
};

export function TargetConnectionStep({ targetType }: TargetConnectionStepProps) {
  const { clickhouseConnection, fileConnection, setClickhouseConnection, setFileConnection, nextStep, isLoading, setIsLoading } = useWizard();
  const { toast } = useToast();

  const handleTargetConnect = (data: any) => {
    setIsLoading(true);
    
    setTimeout(() => {
      if (targetType === "clickhouse") {
        setClickhouseConnection(data);
        toast({
          title: "Target connection successful",
          description: `Connected to ClickHouse at ${data.host}:${data.port}`,
        });
      } else {
        setFileConnection(data);
        toast({
          title: "Target file selected",
          description: `File selected: ${data.filePath}`,
        });
      }
      setIsLoading(false);
      nextStep();
    }, 1500);
  };

  return targetType === "clickhouse" ? (
    <ClickHouseConnectionForm 
      onSubmit={handleTargetConnect} 
      isLoading={isLoading} 
      defaultValues={clickhouseConnection}
    />
  ) : (
    <FlatFileConnectionForm 
      onSubmit={handleTargetConnect} 
      isLoading={isLoading} 
      defaultValues={fileConnection}
      isSaveMode={true}
    />
  );
}
