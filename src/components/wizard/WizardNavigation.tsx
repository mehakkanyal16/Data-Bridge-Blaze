
import { useWizard } from "@/context/WizardContext";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, HomeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function WizardNavigation() {
  const { currentStep, prevStep, isLoading } = useWizard();
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-between mt-6">
      {currentStep === 1 ? (
        <Button 
          variant="outline" 
          onClick={navigateHome}
          className="flex items-center"
        >
          <HomeIcon className="mr-2 h-4 w-4" />Home
        </Button>
      ) : (
        <Button 
          variant="outline" 
          onClick={prevStep} 
          disabled={isLoading}
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back
        </Button>
      )}
    </div>
  );
}
