"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { FormField } from "./form-field";
import { FormFieldPalette } from "./form-field-palette";
import { Form, FormQuestion } from "@/types/form";

interface FormEditorProps {
  initialForm: Form;
  onSave: (form: Form) => void;
  onCancel: () => void;
}

export function FormEditor({ initialForm, onSave, onCancel }: FormEditorProps) {
  const [form, setForm] = useState<Form>(initialForm);

  useEffect(() => {
    setForm(initialForm);
  }, [initialForm]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = form.questions.findIndex(q => q.id === active.id);
      const newIndex = form.questions.findIndex(q => q.id === over.id);

      const newQuestions = [...form.questions];
      const [movedQuestion] = newQuestions.splice(oldIndex, 1);
      newQuestions.splice(newIndex, 0, movedQuestion);

      setForm({ ...form, questions: newQuestions });
    }
  };

  const addField = (type: string) => {
    const newQuestion: FormQuestion = {
      id: `q${form.questions.length + 1}`,
      question: "",
      type,
      required: true,
      options: type === "radio" || type === "checkbox" ? [
        { id: 1, value: "Option 1" }
      ] : []
    };

    setForm({
      ...form,
      questions: [...form.questions, newQuestion]
    });
  };

  const updateField = (id: string, updates: Partial<FormQuestion>) => {
    setForm({
      ...form,
      questions: form.questions.map(q => 
        q.id === id ? { ...q, ...updates } : q
      )
    });
  };

  const removeField = (id: string) => {
    setForm({
      ...form,
      questions: form.questions.filter(q => q.id !== id)
    });
  };

  const handleSave = () => {
    if (!form.title || !form.targetStakeholder) return;
    onSave(form);
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-9">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Form Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Enter form title"
                />
              </div>
              <div>
                <Label>Target Stakeholder</Label>
                <Select
                  value={form.targetStakeholder}
                  onValueChange={(value) => setForm({ ...form, targetStakeholder: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select stakeholder" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="girls">Girls</SelectItem>
                    <SelectItem value="teachers">Teachers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Enter form description"
              />
            </div>

            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={form.questions} strategy={verticalListSortingStrategy}>
                <div className="space-y-4">
                  {form.questions.map((question) => (
                    <FormField
                      key={question.id}
                      question={question}
                      onUpdate={(updates) => updateField(question.id, updates)}
                      onRemove={() => removeField(question.id)}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Form
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="col-span-3">
        <FormFieldPalette onAddField={addField} />
      </div>
    </div>
  );
}