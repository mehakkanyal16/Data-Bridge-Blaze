
import { useWizard } from "@/context/WizardContext";
import { TableColumnSelector } from "@/components/TableColumnSelector";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export function TableColumnStep() {
  const { 
    tables, 
    selectedTable, 
    setSelectedTable, 
    selectedColumns, 
    setSelectedColumns, 
    isLoading, 
    nextStep 
  } = useWizard();

  const handleTableSelect = (tableName: string) => {
    setSelectedTable(tableName);
    setSelectedColumns([]);
  };

  const handleColumnsSelect = (columns: string[]) => {
    setSelectedColumns(columns);
  };

  return (
    <div className="space-y-6">
      <TableColumnSelector 
        tables={tables} 
        selectedTable={selectedTable}
        selectedColumns={selectedColumns}
        onTableSelect={handleTableSelect}
        onColumnsSelect={handleColumnsSelect}
        isLoading={isLoading}
      />
      
      <div className="flex justify-end">
        <Button 
          onClick={nextStep} 
          disabled={isLoading || selectedColumns.length === 0 || !selectedTable}
        >
          Next <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
