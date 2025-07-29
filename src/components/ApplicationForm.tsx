import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const degreeTypes = [
  "Bachelor's Degree", "Honours Degree", "Master's Degree", "Doctorate/PhD", 
  "Professional Degree", "Diploma", "Certificate"
];

const southAfricanCities = [
  "Cape Town", "Johannesburg", "Durban", "Pretoria", "Port Elizabeth", 
  "Bloemfontein", "East London", "Pietermaritzburg", "Nelspruit", "Kimberley",
  "Polokwane", "Rustenburg", "Witbank", "George", "Ladysmith"
];

const fieldsOfStudy = [
  "Medicine", "Law", "Engineering", "Finance", "Architecture", "Computer Science",
  "Business Administration", "Accounting", "Psychology", "Dentistry", "Veterinary Science",
  "Pharmacy", "Nursing", "Teaching", "Marketing", "Economics", "Other"
];

const studyYears = [
  "1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "6th Year", "Graduate"
];

const formSchema = z.object({
  firstname: z.string().min(2, "First name must be at least 2 characters"),
  lastname: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  dob: z.date({ required_error: "Date of birth is required" }),
  degree_type: z.string().min(1, "Please select a degree type"),
  field_of_study: z.string().min(1, "Please select a field of study"),
  institution_name: z.string().min(1, "Institution name is required"),
  graduation_year: z.number().min(1990, "Please enter a valid graduation year"),
});

type FormData = z.infer<typeof formSchema>;

export default function ApplicationForm() {
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      dob: new Date(2000, 0, 1),
      degree_type: "",
      field_of_study: "",
      institution_name: "",
      graduation_year: 2024,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const { data: responseData, error } = await supabase.functions.invoke('submit-application', {
        body: data,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Application Submitted",
        description: "Thank you for your application. We'll be in touch soon!",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-background">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Apply for Profmed + RMB</CardTitle>
        <CardDescription className="text-center">
          Complete this form to apply for the dual benefit solution designed for young professionals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <Select 
                      value={field.value ? field.value.getFullYear().toString() : "2000"}
                      onValueChange={(value) => {
                        const year = parseInt(value);
                        const currentDate = field.value || new Date(2000, 0, 1);
                        const newDate = new Date(year, currentDate.getMonth(), currentDate.getDate());
                        field.onChange(newDate);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-background">
                        {Array.from({ length: new Date().getFullYear() - 1950 + 1 }, (_, i) => {
                          const year = new Date().getFullYear() - i;
                          return (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Month</FormLabel>
                    <Select 
                      value={field.value ? (field.value.getMonth() + 1).toString() : "1"}
                      onValueChange={(value) => {
                        const month = parseInt(value) - 1;
                        const currentDate = field.value || new Date(2000, 0, 1);
                        const newDate = new Date(currentDate.getFullYear(), month, currentDate.getDate());
                        field.onChange(newDate);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-background">
                        {Array.from({ length: 12 }, (_, i) => {
                          const month = i + 1;
                          const monthName = new Date(2000, i, 1).toLocaleString('default', { month: 'long' });
                          return (
                            <SelectItem key={month} value={month.toString()}>
                              {monthName}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Day</FormLabel>
                    <Select 
                      value={field.value ? field.value.getDate().toString() : "1"}
                      onValueChange={(value) => {
                        const day = parseInt(value);
                        const currentDate = field.value || new Date(2000, 0, 1);
                        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                        field.onChange(newDate);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Day" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-background">
                        {Array.from({ length: 31 }, (_, i) => {
                          const day = i + 1;
                          return (
                            <SelectItem key={day} value={day.toString()}>
                              {day}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="degree_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your degree type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {degreeTypes.map((degree) => (
                          <SelectItem key={degree} value={degree}>
                            {degree}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="field_of_study"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field of Study</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your field of study" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fieldsOfStudy.map((field) => (
                          <SelectItem key={field} value={field}>
                            {field}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="institution_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your institution" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="graduation_year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Graduation Year</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter graduation year" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Submit Application
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}