"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { StakeholderRole } from "@/types/stakeholder";

interface StakeholderFormProps {
  role: StakeholderRole;
  onSubmit: (data: Record<string, string>) => void;
  onCancel: () => void;
}

export function StakeholderForm({ role, onSubmit, onCancel }: StakeholderFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const missingRequired = role.fields
      .filter(field => field.required)
      .find(field => !formData[field.name]);

    if (missingRequired) {
      alert(`Please fill in the required field: ${missingRequired.name}`);
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onCancel}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Stakeholders
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New {role.name.slice(0, -1)}</CardTitle>
          <CardDescription>Enter the details for the new {role.name.slice(0, -1).toLowerCase()}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {role.fields.map((field) => (
              <div key={field.name}>
                <Label>
                  {field.name}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </Label>
                <Input
                  type={field.type}
                  value={formData[field.name] || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    [field.name]: e.target.value
                  })}
                  required={field.required}
                  placeholder={`Enter ${field.name.toLowerCase()}`}
                />
              </div>
            ))}
            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                Add {role.name.slice(0, -1)}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}