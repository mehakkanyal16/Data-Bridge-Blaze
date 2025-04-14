
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { EyeIcon, Loader2 } from "lucide-react";

type DataPreviewProps = {
  columns: string[];
  data: any[];
  onPreview: () => void;
  isLoading: boolean;
};

export function DataPreview({ 
  columns, 
  data, 
  onPreview, 
  isLoading 
}: DataPreviewProps) {
  const hasData = data.length > 0;
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-base font-medium">Data Preview</h4>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onPreview}
          disabled={isLoading || columns.length === 0}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <EyeIcon className="mr-2 h-4 w-4" />
              {hasData ? "Refresh Preview" : "Preview Data"}
            </>
          )}
        </Button>
      </div>
      
      <Card className="border rounded-md overflow-hidden">
        <ScrollArea className="h-[300px]">
          {isLoading ? (
            <div className="p-4 space-y-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          ) : hasData ? (
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column}>{column}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((column) => (
                      <TableCell key={`${rowIndex}-${column}`}>
                        {row[column] !== undefined ? String(row[column]) : "-"}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
              {columns.length === 0 
                ? "Please select columns to preview data" 
                : "Click Preview Data to load sample records"}
            </div>
          )}
        </ScrollArea>
      </Card>
      
      {hasData && (
        <div className="text-sm text-muted-foreground flex items-center space-x-1">
          <span>Showing</span>
          <span className="font-medium">{data.length}</span>
          <span>sample records</span>
        </div>
      )}
    </div>
  );
}
