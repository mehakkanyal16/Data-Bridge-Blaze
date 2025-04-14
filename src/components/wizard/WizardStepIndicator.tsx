
import { useWizard } from "@/context/WizardContext";
import { StepIndicator } from "@/components/StepIndicator";
import { DatabaseIcon, FileIcon, TableIcon, EyeIcon } from "lucide-react";

type WizardStepIndicatorProps = {
  sourceType: "clickhouse" | "file";
  targetType: "clickhouse" | "file";
};

export function WizardStepIndicator({ sourceType, targetType }: WizardStepIndicatorProps) {
  const { currentStep } = useWizard();

  return (
    <StepIndicator 
      steps={4} 
      currentStep={currentStep}
      stepTitles={[
        sourceType === "clickhouse" ? "ClickHouse Source" : "File Source",
        targetType === "clickhouse" ? "ClickHouse Target" : "File Target",
        "Table & Columns",
        "Preview & Ingest"
      ]} 
      icons={[
        sourceType === "clickhouse" ? DatabaseIcon : FileIcon,
        targetType === "clickhouse" ? DatabaseIcon : FileIcon,
        TableIcon,
        EyeIcon
      ]}
    />
  );
}
