"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Plus } from "lucide-react"

interface Field {
  name: string
  type: string
  required: boolean
}

interface StakeholderRoleDialogProps {
  onRoleCreated: (role: { name: string; fields: Field[] }) => void
}

export function StakeholderRoleDialog({ onRoleCreated }: StakeholderRoleDialogProps) {
  const [open, setOpen] = useState(false)
  const [roleName, setRoleName] = useState("")
  const [fields, setFields] = useState<Field[]>([])

  const handleAddField = () => {
    setFields([...fields, { name: "", type: "text", required: false }])
  }

  const handleRemoveField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index))
  }

  const handleFieldChange = (index: number, field: Partial<Field>) => {
    setFields(
      fields.map((f, i) => (i === index ? { ...f, ...field } : f))
    )
  }

  const handleSubmit = () => {
    if (roleName && fields.length > 0) {
      onRoleCreated({ name: roleName, fields })
      setRoleName("")
      setFields([])
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Define Stakeholder Role</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Define New Stakeholder Role</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Input
              placeholder="e.g., Student, Mentor, Teacher"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium">Fields</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddField}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Field
              </Button>
            </div>

            {fields.map((field, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder="Field name"
                  value={field.name}
                  onChange={(e) =>
                    handleFieldChange(index, { name: e.target.value })
                  }
                />
                <Select
                  value={field.type}
                  onValueChange={(value) =>
                    handleFieldChange(index, { type: value })
                  }
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`required-${index}`}
                    checked={field.required}
                    onCheckedChange={(checked) =>
                      handleFieldChange(index, {
                        required: checked as boolean,
                      })
                    }
                  />
                  <label
                    htmlFor={`required-${index}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Required
                  </label>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveField(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button
            type="button"
            className="w-full"
            onClick={handleSubmit}
            disabled={!roleName || fields.length === 0}
          >
            Create Role
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}