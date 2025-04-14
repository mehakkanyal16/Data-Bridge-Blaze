
import { WizardProvider } from "@/context/WizardContext";
import { Card } from "@/components/ui/card";
import { WizardSteps } from "@/components/wizard/WizardSteps";
import { WizardNavigation } from "@/components/wizard/WizardNavigation";
import { WizardStepIndicator } from "@/components/wizard/WizardStepIndicator";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type DataFlowWizardProps = {
  sourceType: "clickhouse" | "file";
  targetType: "clickhouse" | "file";
};

export function DataFlowWizard({ sourceType, targetType }: DataFlowWizardProps) {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/');
  };

  return (
    <WizardProvider sourceType={sourceType} targetType={targetType}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          {/* <Button 
            variant="outline" 
            onClick={navigateHome}
            className="flex items-center"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back
          </Button> */}

          <WizardStepIndicator sourceType={sourceType} targetType={targetType} />
        </div>
        
        <Card className="p-6">
          <WizardSteps sourceType={sourceType} targetType={targetType} />
        </Card>
        
        <WizardNavigation />
      </div>
    </WizardProvider>
  );
}
