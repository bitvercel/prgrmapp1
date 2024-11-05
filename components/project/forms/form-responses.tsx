"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Filter } from "lucide-react";
import { Form } from "@/types/form";

interface Response {
  id: string;
  submittedAt: string;
  respondent: string;
  answers: Record<string, string | string[]>;
}

interface FormResponsesProps {
  form: Form;
}

export function FormResponses({ form }: FormResponsesProps) {
  const [filter, setFilter] = useState("all");
  
  // Mock responses data - in a real app, this would come from your backend
  const responses: Response[] = [
    {
      id: "1",
      submittedAt: "2024-03-20T10:30:00Z",
      respondent: "Sarah Johnson",
      answers: {
        "What are your primary educational goals?": "I want to learn programming and get into tech",
        "What technical skills would you like to learn?": ["Programming", "Web Development"]
      }
    },
    {
      id: "2",
      submittedAt: "2024-03-19T15:45:00Z",
      respondent: "Maria Garcia",
      answers: {
        "What are your primary educational goals?": "Interested in digital design and web development",
        "What technical skills would you like to learn?": ["Digital Design", "Web Development"]
      }
    },
    {
      id: "3",
      submittedAt: "2024-03-18T09:15:00Z",
      respondent: "Emily Chen",
      answers: {
        "What are your primary educational goals?": "Want to become a data analyst",
        "What technical skills would you like to learn?": ["Programming", "Data Analysis"]
      }
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAnswer = (answer: string | string[]) => {
    if (Array.isArray(answer)) {
      return answer.join(", ");
    }
    return answer;
  };

  const handleExport = () => {
    // In a real app, implement CSV export functionality
    console.log("Exporting responses...");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{form.title}</h2>
          <p className="text-muted-foreground">{form.description}</p>
        </div>
        <Button onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export Responses
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{responses.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">100%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5m 30s</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Individual Responses</h3>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter responses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Responses</SelectItem>
              <SelectItem value="complete">Complete</SelectItem>
              <SelectItem value="incomplete">Incomplete</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Submitted</TableHead>
              <TableHead>Respondent</TableHead>
              {form.questions.map((question) => (
                <TableHead key={question.id}>{question.question}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {responses.map((response) => (
              <TableRow key={response.id}>
                <TableCell>{formatDate(response.submittedAt)}</TableCell>
                <TableCell>{response.respondent}</TableCell>
                {form.questions.map((question) => (
                  <TableCell key={question.id}>
                    {formatAnswer(response.answers[question.question])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}