
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUp, Upload, CheckCircle, AlertCircle, Info, List } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { formatDistanceToNow } from "date-fns";

type UploadedFile = {
  name: string;
  size: number;
  timestamp: number;
};

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(() => {
    if (typeof window === 'undefined') return [];
    const savedFiles = localStorage.getItem("uploadedFiles");
    if (savedFiles) {
      const files: UploadedFile[] = JSON.parse(savedFiles);
      // Filter out files older than 24 hours
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;
      return files.filter(f => now - f.timestamp < oneDay);
    }
    return [];
  });
  
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUploadProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!file) {
       toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select a file to upload.",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + 5;
      });
    }, 100);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearInterval(progressInterval);
    setUploadProgress(100);

    const newFile: UploadedFile = {
      name: file.name,
      size: file.size,
      timestamp: Date.now(),
    };

    const updatedFiles = [newFile, ...uploadedFiles];
    setUploadedFiles(updatedFiles);
    localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
    
    toast({
      title: "Upload Successful",
      description: `File "${file.name}" has been uploaded.`,
    });
    
    setIsUploading(false);
    setFile(null);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload Report</h1>
        <p className="text-muted-foreground">
          Add a new patient report to the system.
        </p>
      </div>

       <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>File Format Reminder</AlertTitle>
        <AlertDescription>
          Please ensure your file is in one of the accepted formats: PDF, JPG, or PNG.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Upload New Patient File</CardTitle>
          <CardDescription>
            Select a file from your device and click upload.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-muted rounded-lg text-center space-y-4">
            <FileUp className="h-16 w-16 text-muted-foreground" />
             <Input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="w-full max-w-sm"
              disabled={isUploading}
              accept=".pdf,.jpg,.jpeg,.png"
            />
            {file && <p className="text-sm text-muted-foreground">Selected file: {file.name}</p>}
          </div>

           <Button onClick={handleUpload} disabled={isUploading || !file} className="w-full">
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload File
              </>
            )}
          </Button>

          {isUploading && (
             <Progress value={uploadProgress} className="w-full" />
          )}

        </CardContent>
      </Card>
      
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <List className="h-5 w-5" />
              Recent Uploads (last 24 hours)
            </CardTitle>
            <CardDescription>
              Files you've recently uploaded to the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {uploadedFiles.map((uploadedFile, index) => (
                <li key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{uploadedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(uploadedFile.size / 1024).toFixed(2)} KB - Uploaded {formatDistanceToNow(uploadedFile.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                   <CheckCircle className="h-5 w-5 text-green-500" />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
