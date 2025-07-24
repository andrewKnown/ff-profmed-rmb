
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { PlusCircle, Sparkles, BookTemplate } from "lucide-react";
import { useThemeParam } from "@/hooks/useThemeParam";
import { ProfessionalTheme, predefinedThemes, ThemeSourceType } from "@/utils/themes/themeTypes";

// Function to format profession name for display
export const formatProfessionName = (profession: string): string => {
  if (!profession) return '';
  
  // Replace underscores and other common separators with spaces
  const withSpaces = profession.replace(/[_-]/g, ' ');
  
  // Capitalize each word
  return withSpaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const ThemeSelector = () => {
  const { theme, changeTheme, themeSource } = useThemeParam();
  const [newProfession, setNewProfession] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // Handle theme change
  const handleThemeChange = (value: string) => {
    if (value === "add-custom") {
      setIsDialogOpen(true);
      return;
    }
    
    changeTheme(value as ProfessionalTheme);
  };

  // Handle adding a new profession
  const handleAddProfession = () => {
    if (!newProfession.trim()) return;
    
    // Convert profession name to lowercase for URL and storage
    const formattedProfession = newProfession.toLowerCase().trim();
    
    // Update theme using the hook's change function
    changeTheme(formattedProfession as ProfessionalTheme);
    
    // Close dialog and reset input
    setIsDialogOpen(false);
    setNewProfession("");
  };

  // Function to render the correct icon based on theme source
  const renderThemeSourceBadge = () => {
    if (themeSource === 'Standard Template') {
      return (
        <Badge variant="outline" className="ml-2 bg-slate-100">
          <BookTemplate size={12} className="mr-1" />
          For professionals with degrees
        </Badge>
      );
    } else if (themeSource === 'AI Customised') {
      return (
        <Badge variant="outline" className="ml-2 bg-purple-100">
          <Sparkles size={12} className="mr-1" />
          Personalised by profession
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="ml-2 bg-slate-100">
          {themeSource}
        </Badge>
      );
    }
  };

  return (
    <div className="flex items-center">
      <Select value={theme} onValueChange={handleThemeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Theme">
            {theme !== 'default' ? formatProfessionName(theme) : 'Default'}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="architects">Architects</SelectItem>
          <SelectItem value="accountants">Accountants</SelectItem>
          <SelectItem value="pps">PPS Members</SelectItem>
          <SelectItem value="attorneys">Attorneys</SelectItem>
          <SelectItem value="doctors">Doctors</SelectItem>
          <SelectItem value="add-custom" className="text-secondary">
            <div className="flex items-center gap-2">
              <PlusCircle size={16} />
              <span>Add Custom Profession</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      
      {renderThemeSourceBadge()}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Custom Profession</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Enter profession name"
              value={newProfession}
              onChange={(e) => setNewProfession(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddProfession();
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddProfession}>Add Profession</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ThemeSelector;
