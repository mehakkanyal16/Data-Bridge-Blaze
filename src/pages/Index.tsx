import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataFlowWizard } from "@/components/DataFlowWizard";
import { DatabaseIcon, FileIcon, ArrowRightIcon, ArrowLeftIcon } from "lucide-react";

// Defining a type for the flow direction to ensure type safety
type FlowDirection = "clickhouse-to-file" | "file-to-clickhouse";

const Index = () => {
  const [flowDirection, setFlowDirection] = useState<FlowDirection>("clickhouse-to-file");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container py-10">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-data-blue to-data-teal">
            Data Bridge Blaze
          </h1>
          <p className="text-lg text-muted-foreground">
            Bidirectional ClickHouse & Flat File Data Integration
          </p>
        </header>

        <Card className="w-full mx-auto max-w-5xl shadow-lg border-opacity-50">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold">Data Integration Flow</CardTitle>
            <CardDescription>
              Select the direction of your data transfer to begin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue="clickhouse-to-file" 
              className="w-full"
              onValueChange={(value: FlowDirection) => setFlowDirection(value)} // Explicitly type `value`
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="clickhouse-to-file" className="flex items-center justify-center gap-2 py-3">
                  <DatabaseIcon className="w-4 h-4" />
                  <span>ClickHouse</span>
                  <ArrowRightIcon className="w-4 h-4" />
                  <FileIcon className="w-4 h-4" />
                  <span>Flat File</span>
                </TabsTrigger>
                <TabsTrigger value="file-to-clickhouse" className="flex items-center justify-center gap-2 py-3">
                  <FileIcon className="w-4 h-4" />
                  <span>Flat File</span>
                  <ArrowRightIcon className="w-4 h-4" />
                  <DatabaseIcon className="w-4 h-4" />
                  <span>ClickHouse</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="clickhouse-to-file">
                <DataFlowWizard 
                  sourceType="clickhouse" 
                  targetType="file"
                />
              </TabsContent>
              
              <TabsContent value="file-to-clickhouse">
                <DataFlowWizard 
                  sourceType="file" 
                  targetType="clickhouse"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
