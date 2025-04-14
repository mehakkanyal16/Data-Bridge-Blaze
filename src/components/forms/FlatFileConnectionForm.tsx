
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, FileIcon, FileUpIcon, FilePenIcon } from "lucide-react";

const formSchema = z.object({
  filePath: z.string().min(1, "File path is required"),
  delimiter: z.string().min(1, "Delimiter is required"),
  hasHeader: z.boolean().default(true),
});

type FlatFileConnectionFormProps = {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
  defaultValues?: Partial<z.infer<typeof formSchema>>;
  isSaveMode?: boolean;
};

export function FlatFileConnectionForm({
  onSubmit,
  isLoading,
  defaultValues = {
    filePath: "",
    delimiter: ",",
    hasHeader: true,
  },
  isSaveMode = false
}: FlatFileConnectionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // In a real app, this would handle file selection via an actual file input
  const handleFileBrowse = () => {
    const mockFilePath = `/path/to/${isSaveMode ? 'output' : 'input'}_${Math.floor(Math.random() * 1000)}.csv`;
    form.setValue("filePath", mockFilePath);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="filePath"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isSaveMode ? "Output File Path" : "Input File Path"}</FormLabel>
              <div className="flex space-x-2">
                <FormControl>
                  <Input 
                    placeholder={isSaveMode ? "/path/to/output.csv" : "/path/to/input.csv"} 
                    {...field} 
                  />
                </FormControl>
                <Button 
                  type="button"
                  variant="outline"
                  onClick={handleFileBrowse}
                >
                  Browse
                </Button>
              </div>
              <FormDescription>
                {isSaveMode 
                  ? "Select where to save the extracted data" 
                  : "Select the input file containing your data"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="delimiter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delimiter</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select delimiter" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value=",">Comma (,)</SelectItem>
                    <SelectItem value=";">Semicolon (;)</SelectItem>
                    <SelectItem value="\t">Tab</SelectItem>
                    <SelectItem value="|">Pipe (|)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="hasHeader"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    {isSaveMode ? "Include Header Row" : "Has Header Row"}
                  </FormLabel>
                  <FormDescription>
                    {isSaveMode 
                      ? "Include column names in the first row" 
                      : "First row contains column names"}
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
              {isSaveMode ? "Configuring Output..." : "Reading File..."}
            </>
          ) : (
            <>
              {isSaveMode ? (
                <>
                  <FilePenIcon className="mr-2 h-4 w-4" /> Configure Output File
                </>
              ) : (
                <>
                  <FileUpIcon className="mr-2 h-4 w-4" /> Select File
                </>
              )}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
