"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Share2, Pencil, Trash, Eye, ArrowLeft } from "lucide-react";
import { FormEditor } from "./form-builder/form-editor";
import { FormResponses } from "./form-responses";
import { Form } from "@/types/form";
import { toast } from "sonner";

export function FormBuilder() {
  const [isCreating, setIsCreating] = useState(false);
  const [viewingResponses, setViewingResponses] = useState<string | null>(null);
  const [forms, setForms] = useState<Form[]>([
    {
      id: "1",
      title: "Initial Assessment Form",
      description: "Evaluate the current situation and needs of girls entering the program",
      targetStakeholder: "girls",
      questions: [
        {
          id: "q1",
          question: "What are your primary educational goals?",
          type: "textarea",
          required: true,
          options: []
        },
        {
          id: "q2",
          question: "What technical skills would you like to learn?",
          type: "checkbox",
          required: true,
          options: [
            { id: 1, value: "Programming" },
            { id: 2, value: "Digital Design" },
            { id: 3, value: "Web Development" },
            { id: 4, value: "Data Analysis" }
          ]
        }
      ]
    },
    {
      id: "2",
      title: "Teacher Progress Report",
      description: "Monthly progress tracking for students under each teacher",
      targetStakeholder: "teachers",
      questions: [
        {
          id: "q1",
          question: "Student's progress in technical skills",
          type: "rating",
          required: true,
          options: [
            { id: 1, value: "Needs Improvement" },
            { id: 2, value: "Fair" },
            { id: 3, value: "Good" },
            { id: 4, value: "Excellent" }
          ]
        }
      ]
    }
  ]);

  const [currentForm, setCurrentForm] = useState<Form>({
    id: "",
    title: "",
    description: "",
    targetStakeholder: "",
    questions: []
  });

  const handleSaveForm = (form: Form) => {
    if (form.id) {
      setForms(forms.map(f => f.id === form.id ? form : f));
      toast.success("Form updated successfully");
    } else {
      const newForm = {
        ...form,
        id: (forms.length + 1).toString()
      };
      setForms([...forms, newForm]);
      toast.success("Form created successfully");
    }
    setIsCreating(false);
  };

  const handleEditForm = (form: Form) => {
    setCurrentForm(form);
    setIsCreating(true);
  };

  const handleDeleteForm = (id: string) => {
    setForms(forms.filter(f => f.id !== id));
    toast.success("Form deleted successfully");
  };

  const handleShareForm = (id: string) => {
    const shareableLink = `https://yourapp.com/forms/${id}`;
    navigator.clipboard.writeText(shareableLink);
    toast.success("Shareable link copied to clipboard");
  };

  if (viewingResponses) {
    const form = forms.find(f => f.id === viewingResponses);
    if (!form) return null;

    return (
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setViewingResponses(null)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Forms
          </Button>
        </div>
        <FormResponses form={form} />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        {isCreating ? (
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsCreating(false)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Forms
            </Button>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-medium">Forms</h3>
            <Button onClick={() => {
              setCurrentForm({
                id: "",
                title: "",
                description: "",
                targetStakeholder: "",
                questions: []
              });
              setIsCreating(true);
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Create Form
            </Button>
          </>
        )}
      </div>

      {isCreating ? (
        <FormEditor 
          initialForm={currentForm}
          onSave={handleSaveForm}
          onCancel={() => setIsCreating(false)}
        />
      ) : (
        <div className="grid gap-4">
          {forms.map((form) => (
            <Card key={form.id} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{form.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Target: {form.targetStakeholder} • {form.questions.length} questions
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {form.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShareForm(form.id)}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditForm(form)}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewingResponses(form.id)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Responses
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteForm(form.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}