
import { createContext, useContext, useState, ReactNode } from "react";

type ClickHouseConnection = {
  host: string;
  port: number;
  database: string;
  user: string;
  jwtToken: string;
  secure: boolean;
};

type FlatFileConnection = {
  filePath: string;
  delimiter: string;
  hasHeader: boolean;
};

type Table = {
  name: string;
  columns: Column[];
};

type Column = {
  name: string;
  type: string;
};

type WizardContextType = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  clickhouseConnection: ClickHouseConnection;
  setClickhouseConnection: (conn: ClickHouseConnection) => void;
  fileConnection: FlatFileConnection;
  setFileConnection: (conn: FlatFileConnection) => void;
  tables: Table[];
  setTables: (tables: Table[]) => void;
  selectedTable: string;
  setSelectedTable: (tableName: string) => void;
  selectedColumns: string[];
  setSelectedColumns: (columns: string[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  previewData: any[];
  setPreviewData: (data: any[]) => void;
  ingestStatus: "idle" | "running" | "completed" | "error";
  setIngestStatus: (status: "idle" | "running" | "completed" | "error") => void;
  processedRecords: number;
  setProcessedRecords: (count: number) => void;
  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;
  nextStep: () => void;
  prevStep: () => void;
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children, sourceType, targetType }: { 
  children: ReactNode,
  sourceType: "clickhouse" | "file",
  targetType: "clickhouse" | "file" 
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [clickhouseConnection, setClickhouseConnection] = useState<ClickHouseConnection>({
    host: "localhost",
    port: 9440,
    database: "default",
    user: "default",
    jwtToken: "",
    secure: true
  });
  const [fileConnection, setFileConnection] = useState<FlatFileConnection>({
    filePath: "",
    delimiter: ",",
    hasHeader: true
  });
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [ingestStatus, setIngestStatus] = useState<"idle" | "running" | "completed" | "error">("idle");
  const [processedRecords, setProcessedRecords] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      
      if (currentStep === 2) {
        setIsLoading(true);
        // Mock data loading
        setTimeout(() => {
          setTables(mockTables);
          setIsLoading(false);
        }, 1000);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Mock data for testing
  const mockTables: Table[] = [
    {
      name: "users",
      columns: [
        { name: "id", type: "Int32" },
        { name: "name", type: "String" },
        { name: "email", type: "String" },
        { name: "created_at", type: "DateTime" }
      ]
    },
    {
      name: "orders",
      columns: [
        { name: "order_id", type: "Int32" },
        { name: "user_id", type: "Int32" },
        { name: "amount", type: "Decimal(10, 2)" },
        { name: "status", type: "String" },
        { name: "order_date", type: "DateTime" }
      ]
    }
  ];

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        clickhouseConnection,
        setClickhouseConnection,
        fileConnection,
        setFileConnection,
        tables,
        setTables,
        selectedTable,
        setSelectedTable,
        selectedColumns,
        setSelectedColumns,
        isLoading,
        setIsLoading,
        previewData,
        setPreviewData,
        ingestStatus,
        setIngestStatus,
        processedRecords,
        setProcessedRecords,
        errorMessage,
        setErrorMessage,
        nextStep,
        prevStep
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
};
