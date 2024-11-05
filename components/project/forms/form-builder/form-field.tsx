"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { GripVertical, X, Plus } from "lucide-react";
import { FormQuestion } from "@/types/form";

interface FormFieldProps {
  question: FormQuestion;
  onUpdate: (updates: Partial<FormQuestion>) => void;
  onRemove: () => void;
}

export function FormField({ question, onUpdate, onRemove }: FormFieldProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const addOption = () => {
    const newOptions = [
      ...question.options,
      { id: question.options.length + 1, value: `Option ${question.options.length + 1}` }
    ];
    onUpdate({ options: newOptions });
  };

  const updateOption = (optionId: number, value: string) => {
    const newOptions = question.options.map(opt =>
      opt.id === optionId ? { ...opt, value } : opt
    );
    onUpdate({ options: newOptions });
  };

  const removeOption = (optionId: number) => {
    const newOptions = question.options.filter(opt => opt.id !== optionId);
    onUpdate({ options: newOptions });
  };

  return (
    <Card ref={setNodeRef} style={style}>
      <CardHeader className="flex flex-row items-center space-x-4 p-4">
        <div {...attributes} {...listeners} className="cursor-move">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <Input
            value={question.question}
            onChange={(e) => onUpdate({ question: e.target.value })}
            placeholder="Enter your question"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={question.required}
              onCheckedChange={(checked) => onUpdate({ required: checked })}
            />
            <Label>Required</Label>
          </div>
          <Button variant="ghost" size="sm" onClick={onRemove}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {(question.type === "radio" || question.type === "checkbox") && (
          <div className="space-y-2">
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Input
                  value={option.value}
                  onChange={(e) => updateOption(option.id, e.target.value)}
                  placeholder="Option text"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeOption(option.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={addOption}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}