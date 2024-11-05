"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Type,
  AlignLeft,
  CheckSquare,
  ListChecks,
  Calendar,
  Star,
  Phone,
  MapPin,
  Upload,
  ToggleLeft,
} from "lucide-react";

const elements = [
  {
    category: "Content",
    items: [
      { icon: Type, label: "Heading", type: "heading" },
      { icon: AlignLeft, label: "Paragraph", type: "paragraph" },
    ],
  },
  {
    category: "Form",
    items: [
      { icon: Type, label: "Short Text", type: "text" },
      { icon: AlignLeft, label: "Long Text", type: "textarea" },
      { icon: CheckSquare, label: "Single Choice", type: "radio" },
      { icon: ListChecks, label: "Multiple Choice", type: "checkbox" },
      { icon: Calendar, label: "Date & Time", type: "datetime" },
      { icon: Star, label: "Rating", type: "rating" },
      { icon: Phone, label: "Phone", type: "phone" },
      { icon: MapPin, label: "Location", type: "location" },
      { icon: Upload, label: "File Upload", type: "file" },
      { icon: ToggleLeft, label: "Yes/No", type: "boolean" },
    ],
  },
];

interface FormElementsSidebarProps {
  onAddElement: (type: string) => void;
}

export function FormElementsSidebar({ onAddElement }: FormElementsSidebarProps) {
  return (
    <div className="w-60 border-r bg-muted/10">
      <ScrollArea className="h-[calc(100vh-10rem)]">
        <div className="p-4 space-y-6">
          {elements.map((category) => (
            <div key={category.category}>
              <h3 className="text-sm font-medium mb-2">{category.category}</h3>
              <div className="space-y-2">
                {category.items.map((item) => (
                  <Button
                    key={item.type}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => onAddElement(item.type)}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                ))}
              </div>
              <Separator className="my-4" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}