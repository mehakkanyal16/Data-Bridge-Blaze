
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Loader2, DatabaseIcon, LinkIcon } from "lucide-react";

const formSchema = z.object({
  host: z.string().min(1, "Host is required"),
  port: z.coerce.number().int().min(1, "Port must be a positive number"),
  database: z.string().min(1, "Database is required"),
  user: z.string().min(1, "User is required"),
  jwtToken: z.string().min(1, "JWT token is required"),
  secure: z.boolean().default(true),
});

type ClickHouseConnectionFormProps = {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
  defaultValues?: Partial<z.infer<typeof formSchema>>;
};

export function ClickHouseConnectionForm({ 
  onSubmit, 
  isLoading,
  defaultValues = {
    host: "localhost",
    port: 9440,
    database: "default",
    user: "default",
    jwtToken: "",
    secure: true,
  }
}: ClickHouseConnectionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="host"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Host</FormLabel>
                <FormControl>
                  <Input placeholder="localhost or example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="port"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Port</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="9440" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Use 9440/8443 for HTTPS, 9000/8123 for HTTP
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="database"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Database</FormLabel>
                <FormControl>
                  <Input placeholder="default" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="user"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User</FormLabel>
                <FormControl>
                  <Input placeholder="default" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="jwtToken"
          render={({ field }) => (
            <FormItem>
              <FormLabel>JWT Token</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Paste your JWT token here" 
                  className="resize-none h-24"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="secure"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Use HTTPS (Secure Connection)
                </FormLabel>
                <FormDescription>
                  Enable to use secure connection protocol
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
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connecting...
            </>
          ) : (
            <>
              <LinkIcon className="mr-2 h-4 w-4" /> Connect to ClickHouse
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
