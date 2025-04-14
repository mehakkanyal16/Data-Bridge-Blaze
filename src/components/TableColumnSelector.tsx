
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, TableIcon } from "lucide-react";

type Table = {
  name: string;
  columns: Column[];
};

type Column = {
  name: string;
  type: string;
};

type TableColumnSelectorProps = {
  tables: Table[];
  selectedTable: string;
  selectedColumns: string[];
  onTableSelect: (tableName: string) => void;
  onColumnsSelect: (columns: string[]) => void;
  isLoading: boolean;
};

export function TableColumnSelector({
  tables,
  selectedTable,
  selectedColumns,
  onTableSelect,
  onColumnsSelect,
  isLoading,
}: TableColumnSelectorProps) {
  // Get selected table object from name
  const selectedTableObj = tables.find((t) => t.name === selectedTable);
  
  // Handle toggling individual column
  const handleColumnToggle = (column: string) => {
    const updatedColumns = selectedColumns.includes(column)
      ? selectedColumns.filter((c) => c !== column)
      : [...selectedColumns, column];
    
    onColumnsSelect(updatedColumns);
  };
  
  // Handle select all columns
  const handleSelectAll = () => {
    if (selectedTableObj) {
      if (selectedColumns.length === selectedTableObj.columns.length) {
        onColumnsSelect([]);
      } else {
        onColumnsSelect(selectedTableObj.columns.map((col) => col.name));
      }
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-2">Select Table</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {isLoading ? (
            <>
              <Skeleton className="h-16 rounded-md" />
              <Skeleton className="h-16 rounded-md" />
              <Skeleton className="h-16 rounded-md" />
            </>
          ) : (
            tables.map((table) => (
              <Card
                key={table.name}
                className={`cursor-pointer transition-all ${
                  selectedTable === table.name
                    ? "border-data-indigo bg-data-indigo/5"
                    : "hover:border-muted-foreground/50"
                }`}
                onClick={() => onTableSelect(table.name)}
              >
                <CardHeader className="p-4 flex flex-row items-center space-y-0">
                  <div className="flex items-center space-x-2">
                    <TableIcon className="h-4 w-4" />
                    <span className="font-medium">{table.name}</span>
                  </div>
                  <div className="ml-auto text-xs text-muted-foreground">
                    {table.columns.length} columns
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      </div>
      
      {selectedTableObj && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium">Select Columns</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
            >
              {selectedColumns.length === selectedTableObj.columns.length
                ? "Deselect All"
                : "Select All"}
            </Button>
          </div>
          
          <Card>
            <ScrollArea className="h-[300px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Column Name</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedTableObj.columns.map((column) => (
                    <TableRow key={column.name}>
                      <TableCell className="pr-0">
                        <Checkbox
                          checked={selectedColumns.includes(column.name)}
                          onCheckedChange={() => handleColumnToggle(column.name)}
                        />
                      </TableCell>
                      <TableCell>{column.name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {column.type}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </Card>
          
          <div className="mt-3 text-sm text-muted-foreground">
            {selectedColumns.length} of {selectedTableObj.columns.length} columns selected
          </div>
        </div>
      )}
    </div>
  );
}
