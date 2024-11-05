"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Type, 
  AlignLeft, 
  CheckSquare, 
  Circle,
  Calendar,
  Star,
  Phone,
  MapPin,
  Upload,
  Clock
} from "lucide-react";

interface FormFieldPaletteProps {
  onAddField: (type: string) => void;
}

export function FormFieldPalette({ onAddField }: FormFieldPaletteProps) {
  const fields = [
    { type: "text", icon: Type, label: "Short Text" },
    { type: "textarea", icon: AlignLeft, label: "Long Text" },
    { type: "checkbox", icon: CheckSquare, label: "Multiple Choice" },
    { type: "radio", icon: Circle, label: "Single Choice" },
    { type: "date", icon: Calendar, label: "Date" },
    { type: "rating", icon: Star, label: "Rating" },
    { type: "phone", icon: Phone, label: "Phone" },
    { type: "location", icon: MapPin, label: "Location" },
    { type: "file", icon: Upload, label: "File Upload" },
    { type: "time", icon: Clock, label: "Time" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Fields</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-2">
          {fields.map((field) => (
            <Button
              key={field.type}
              variant="outline"
              className="justify-start"
              onClick={() => onAddField(field.type)}
            >
              <field.icon className="h-4 w-4 mr-2" />
              {field.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}