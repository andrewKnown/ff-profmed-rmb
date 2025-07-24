
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw, Trash, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { predefinedThemes } from "@/utils/themes/themeTypes";

export default function ProfessionContentManager() {
  const { toast } = useToast();
  const [selectedProfession, setSelectedProfession] = useState<string>("");
  const [customProfession, setCustomProfession] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentContent, setCurrentContent] = useState<any | null>(null);

  // Fetch existing content for a profession
  const fetchProfessionContent = async (profession: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("profession_content")
        .select("*")
        .eq("profession", profession.toLowerCase())
        .maybeSingle();

      if (error) throw error;
      
      setCurrentContent(data);
      if (data) {
        toast({
          title: "Content Found",
          description: `Existing content for ${profession} found in the database.`,
        });
      } else {
        toast({
          title: "No Content Found",
          description: `No existing content for ${profession} in the database.`,
        });
      }
    } catch (error) {
      console.error("Error fetching content:", error);
      toast({
        title: "Error",
        description: "Failed to fetch profession content",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger the edge function to generate new content
  const generateNewContent = async (profession: string) => {
    setIsLoading(true);
    try {
      toast({
        title: "Processing Request",
        description: `Preparing content for ${profession}...`,
      });

      // Directly call the edge function to generate content
      const response = await supabase.functions.invoke("generate-profession-content", {
        body: { profession },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      // Update the local state with the newly generated content
      setCurrentContent(response.data);
      
      toast({
        title: "Content Ready",
        description: `New content for ${profession} has been prepared and saved.`,
      });
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Request Failed",
        description: `Failed to prepare content for ${profession}: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete existing content
  const deleteContent = async (profession: string) => {
    if (!currentContent) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("profession_content")
        .delete()
        .eq("profession", profession.toLowerCase());

      if (error) throw error;
      
      setCurrentContent(null);
      toast({
        title: "Content Deleted",
        description: `Content for ${profession} has been removed from the database.`,
      });
    } catch (error) {
      console.error("Error deleting content:", error);
      toast({
        title: "Deletion Failed",
        description: "Failed to delete profession content",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle profession selection
  const handleProfessionChange = (value: string) => {
    setSelectedProfession(value);
    if (value !== "custom") {
      fetchProfessionContent(value);
      setCustomProfession("");
    } else {
      setCurrentContent(null);
    }
  };

  // Handle custom profession input and search
  const handleCustomProfessionSearch = () => {
    if (customProfession.trim()) {
      fetchProfessionContent(customProfession.trim());
    }
  };

  // Handle regeneration of content
  const handleRegenerate = () => {
    const profession = selectedProfession === "custom" ? customProfession : selectedProfession;
    if (profession) {
      generateNewContent(profession);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Profession Content Manager</CardTitle>
        <CardDescription>
          Manage and regenerate content for different professions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="profession">Select Profession</Label>
            <Select value={selectedProfession} onValueChange={handleProfessionChange}>
              <SelectTrigger id="profession">
                <SelectValue placeholder="Select a profession" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {predefinedThemes.filter(theme => theme !== "default").map((theme) => (
                    <SelectItem key={theme} value={theme}>
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">Custom Profession</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {selectedProfession === "custom" && (
            <div className="flex items-end space-x-2">
              <div className="flex-1 space-y-2">
                <Label htmlFor="customProfession">Custom Profession</Label>
                <Input
                  id="customProfession"
                  value={customProfession}
                  onChange={(e) => setCustomProfession(e.target.value)}
                  placeholder="Enter profession (e.g. engineers)"
                />
              </div>
              <Button 
                onClick={handleCustomProfessionSearch}
                disabled={!customProfession.trim() || isLoading}
              >
                Search
              </Button>
            </div>
          )}

          {currentContent && (
            <div className="space-y-4 pt-4">
              <Separator />
              <div className="space-y-2">
                <h3 className="font-medium">Current Content for "{currentContent.profession}"</h3>
                <div className="rounded-md bg-muted p-4 space-y-2">
                  <p><strong>Title:</strong> {currentContent.title}</p>
                  <p><strong>Subtitle:</strong> {currentContent.subtitle}</p>
                  <p><strong>CTA:</strong> {currentContent.cta}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          {currentContent && (
            <Button
              variant="destructive"
              onClick={() => deleteContent(currentContent.profession)}
              disabled={isLoading}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete Content
            </Button>
          )}
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={handleRegenerate}
            disabled={
              isLoading || 
              (selectedProfession === "custom" && !customProfession.trim()) ||
              (!selectedProfession && !customProfession.trim())
            }
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            {isLoading ? "Processing..." : "Refresh Content"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
