
import { useEffect } from "react";
import NavBar from "@/components/NavBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfessionContentManager from "@/components/ProfessionContentManager";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Basic check if user has admin rights (in a real app, this would use proper auth)
  // For demo purposes, we'll just check if there's a session
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data.session) {
        toast({
          title: "Access Restricted",
          description: "You must be logged in to access admin features",
          variant: "destructive",
        });
        navigate("/");
      }
    };
    
    // Uncomment this to enable authentication check
    // checkSession();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8 text-primary">Admin Dashboard</h1>
        
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="content">Content Management</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-6">
            <h2 className="text-2xl font-semibold">Profession Content</h2>
            <p className="text-muted-foreground mb-6">
              Manage themed content for different professions. You can view existing content, 
              regenerate it using the OpenAI API via edge functions, or delete content entries.
            </p>
            <ProfessionContentManager />
          </TabsContent>
          
          <TabsContent value="settings">
            <h2 className="text-2xl font-semibold">Admin Settings</h2>
            <p className="text-muted-foreground">
              Additional admin settings would appear here.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
