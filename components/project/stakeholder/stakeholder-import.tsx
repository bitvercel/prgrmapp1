"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Upload, ArrowRight, Check, X } from "lucide-react";
import { StakeholderRole } from "@/types/stakeholder";
import { toast } from "sonner";

interface StakeholderImportProps {
  role: StakeholderRole;
  onImportComplete: () => void;
}

type ImportStep = 1 | 2 | 3;

interface ColumnMapping {
  csvColumn: string;
  roleField: string;
}

export function StakeholderImport({ role, onImportComplete }: StakeholderImportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<ImportStep>(1);
  const [csvColumns, setCsvColumns] = useState<string[]>([]);
  const [mappings, setMappings] = useState<ColumnMapping[]>([]);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const headers = text.split('\n')[0].split(',').map(header => header.trim());
      setCsvColumns(headers);
      // Initialize mappings with empty values
      setMappings(role.fields.map(field => ({
        csvColumn: '',
        roleField: field.name
      })));
      setCurrentStep(2);
    };
    reader.readAsText(file);
  };

  const handleMapping = (roleField: string, csvColumn: string) => {
    setMappings(prev => prev.map(mapping => 
      mapping.roleField === roleField ? { ...mapping, csvColumn } : mapping
    ));
  };

  const simulateImport = () => {
    setCurrentStep(3);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setProgress(progress);
      if (progress === 100) {
        clearInterval(interval);
        setTimeout(() => {
          toast.success("Stakeholders imported successfully");
          setIsOpen(false);
          onImportComplete();
        }, 500);
      }
    }, 200);
  };

  const resetImport = () => {
    setCurrentStep(1);
    setCsvColumns([]);
    setMappings([]);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setIsOpen(true)}
      >
        <Upload className="h-4 w-4 mr-2" />
        Import {role.name}
      </Button>

      <Dialog open={isOpen} onOpenChange={(open) => {
        if (!open) resetImport();
        setIsOpen(open);
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Import {role.name}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Progress Steps */}
            <div className="flex justify-between mb-8">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`flex items-center ${
                    step !== 3 ? 'flex-1' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                      ${
                        currentStep === step
                          ? 'border-primary bg-primary text-primary-foreground'
                          : currentStep > step
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-muted'
                      }`}
                  >
                    {currentStep > step ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      step
                    )}
                  </div>
                  {step !== 3 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 ${
                        currentStep > step ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Upload a CSV file containing stakeholder information. 
                  The first row should contain column headers.
                </p>
                <div className="flex justify-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Select CSV File
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Map the columns from your CSV file to the corresponding fields.
                </p>
                <Card className="p-4">
                  <div className="space-y-4">
                    {role.fields.map((field) => (
                      <div key={field.name} className="flex items-center gap-4">
                        <div className="w-1/3">
                          <p className="text-sm font-medium">
                            {field.name}
                            {field.required && <span className="text-destructive">*</span>}
                          </p>
                        </div>
                        <div className="flex-1">
                          <Select
                            value={mappings.find(m => m.roleField === field.name)?.csvColumn}
                            onValueChange={(value) => handleMapping(field.name, value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select CSV column" />
                            </SelectTrigger>
                            <SelectContent>
                              {csvColumns.map((column) => (
                                <SelectItem key={column} value={column}>
                                  {column}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
                <div className="flex justify-end">
                  <Button
                    onClick={simulateImport}
                    disabled={!mappings.every(m => 
                      !role.fields.find(f => f.name === m.roleField)?.required || m.csvColumn
                    )}
                  >
                    Start Import
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Importing stakeholders...</p>
                  <Progress value={progress} />
                  <p className="text-sm text-muted-foreground">
                    {progress === 100 
                      ? "Import complete!" 
                      : "Processing and validating data..."}
                  </p>
                </div>
                {progress === 100 && (
                  <div className="flex justify-end">
                    <Button onClick={() => setIsOpen(false)}>
                      Close
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}