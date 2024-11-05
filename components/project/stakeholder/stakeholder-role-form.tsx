"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { X, Plus } from "lucide-react";
import { Field, StakeholderRole } from "@/types/stakeholder";

interface StakeholderRoleFormProps {
  initialRole?: StakeholderRole | null;
  onSubmit: (role: StakeholderRole) => void;
  onCancel: () => void;
}

export function StakeholderRoleForm({ initialRole, onSubmit, onCancel }: StakeholderRoleFormProps) {
  const [roleName, setRoleName] = useState(initialRole?.name || "");
  const [fields, setFields] = useState<Field[]>(
    initialRole?.fields || [{ name: "", type: "text", required: false }]
  );

  useEffect(() => {
    if (initialRole) {
      setRoleName(initialRole.name);
      setFields(initialRole.fields);
    }
  }, [initialRole]);

  const addField = () => {
    setFields([...fields, { name: "", type: "text", required: false }]);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = (index: number, updates: Partial<Field>) => {
    setFields(fields.map((field, i) => 
      i === index ? { ...field, ...updates } : field
    ));
  };

  const handleSubmit = () => {
    if (roleName && fields.every(f => f.name)) {
      onSubmit({ name: roleName, fields });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialRole ? "Edit Stakeholder Role" : "Define New Stakeholder Role"}</CardTitle>
        <CardDescription>
          {initialRole 
            ? "Modify the existing stakeholder role and its fields" 
            : "Create a new stakeholder role with custom fields"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="roleName">Role Name</Label>
            <Input
              id="roleName"
              placeholder="e.g., Student, Mentor, Teacher"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              disabled={!!initialRole}
            />
          </div>

          <div className="space-y-4">
            <Label>Fields</Label>
            {fields.map((field, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1">
                  <Input
                    placeholder="Field name"
                    value={field.name}
                    onChange={(e) => updateField(index, { name: e.target.value })}
                  />
                </div>
                <div className="w-32">
                  <Select
                    value={field.type}
                    onValueChange={(value) => updateField(index, { type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="tel">Phone</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={field.required}
                    onCheckedChange={(checked) => 
                      updateField(index, { required: checked as boolean })}
                  />
                  <Label>Required</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeField(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addField}>
              <Plus className="h-4 w-4 mr-2" />
              Add Field
            </Button>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {initialRole ? "Update Role" : "Create Role"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}