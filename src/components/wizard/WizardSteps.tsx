
import { LucideIcon, DatabaseIcon, FileIcon, TableIcon, EyeIcon } from "lucide-react";
import { useWizard } from "@/context/WizardContext";
import { SourceConnectionStep } from "./steps/SourceConnectionStep";
import { TargetConnectionStep } from "./steps/TargetConnectionStep";
import { TableColumnStep } from "./steps/TableColumnStep";
import { PreviewIngestStep } from "./steps/PreviewIngestStep";

type WizardStepsProps = {
  sourceType: "clickhouse" | "file";
  targetType: "clickhouse" | "file";
};

export function WizardSteps({ sourceType, targetType }: WizardStepsProps) {
  const { currentStep } = useWizard();

  const getStepTitle = (step: number) => {
    switch(step) {
      case 1: return sourceType === "clickhouse" ? "Configure ClickHouse Source" : "Configure Flat File Source";
      case 2: return targetType === "clickhouse" ? "Configure ClickHouse Target" : "Configure Flat File Target";
      case 3: return "Select Tables & Columns";
      case 4: return "Preview & Ingest Data";
      default: return "Unknown Step";
    }
  };

  const getStepIcon = (step: number): LucideIcon => {
    switch(step) {
      case 1: return sourceType === "clickhouse" ? DatabaseIcon : FileIcon;
      case 2: return targetType === "clickhouse" ? DatabaseIcon : FileIcon;
      case 3: return TableIcon;
      case 4: return EyeIcon;
      default: return EyeIcon;
    }
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return <SourceConnectionStep sourceType={sourceType} />;
      case 2:
        return <TargetConnectionStep targetType={targetType} />;
      case 3:
        return <TableColumnStep />;
      case 4:
        return <PreviewIngestStep />;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">{getStepTitle(currentStep)}</h3>
      {renderStep()}
    </div>
  );
}
