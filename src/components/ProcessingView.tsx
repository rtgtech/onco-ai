import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, Download, RotateCcw, CheckCircle, AlertCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProcessingViewProps {
  files: File[];
  onBack: () => void;
}

interface ProcessingState {
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  processedImageUrl?: string;
  originalImageUrl?: string;
}

export function ProcessingView({ files, onBack }: ProcessingViewProps) {
  const [processingState, setProcessingState] = useState<ProcessingState>({
    status: 'uploading',
    progress: 0
  });

  // Simulate the processing workflow
  useEffect(() => {
    const processImages = async () => {
      // Create object URL for the original image
      const originalUrl = URL.createObjectURL(files[0]);
      setProcessingState(prev => ({ ...prev, originalImageUrl: originalUrl }));

      // Step 1: Upload simulation (2 seconds)
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setProcessingState(prev => ({ 
          ...prev, 
          progress: i,
          status: 'uploading'
        }));
      }

      // Step 2: Processing simulation (5 seconds)
      setProcessingState(prev => ({ ...prev, status: 'processing', progress: 0 }));
      
      for (let i = 0; i <= 100; i += 2) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setProcessingState(prev => ({ ...prev, progress: i }));
      }

      // Step 3: Complete with mock processed image
      // In a real app, this would be the processed image from your API
      setProcessingState(prev => ({
        ...prev,
        status: 'completed',
        progress: 100,
        processedImageUrl: originalUrl // Using same image for demo - replace with actual API response
      }));
    };

    if (files.length > 0) {
      processImages().catch(() => {
        setProcessingState(prev => ({
          ...prev,
          status: 'error',
          progress: 0
        }));
      });
    }

    // Cleanup object URLs on unmount
    return () => {
      if (processingState.originalImageUrl) {
        URL.revokeObjectURL(processingState.originalImageUrl);
      }
      if (processingState.processedImageUrl && processingState.processedImageUrl !== processingState.originalImageUrl) {
        URL.revokeObjectURL(processingState.processedImageUrl);
      }
    };
  }, [files]);

  const getStatusDisplay = () => {
    switch (processingState.status) {
      case 'uploading':
        return {
          text: 'Uploading Image...',
          color: 'bg-blue-100 text-blue-800',
          icon: <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        };
      case 'processing':
        return {
          text: 'AI Processing...',
          color: 'bg-orange-100 text-orange-800',
          icon: <div className="animate-pulse rounded-full h-4 w-4 bg-orange-600"></div>
        };
      case 'completed':
        return {
          text: 'Analysis Complete',
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle className="h-4 w-4" />
        };
      case 'error':
        return {
          text: 'Processing Failed',
          color: 'bg-red-100 text-red-800',
          icon: <AlertCircle className="h-4 w-4" />
        };
    }
  };

  const status = getStatusDisplay();
  const currentFile = files[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Upload
            </Button>
            <div>
              <h1 className="mb-2">Image Analysis</h1>
              <p className="text-muted-foreground">{currentFile.name}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge className={status.color}>
              <div className="flex items-center space-x-2">
                {status.icon}
                <span>{status.text}</span>
              </div>
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        {(processingState.status === 'uploading' || processingState.status === 'processing') && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{processingState.status === 'uploading' ? 'Uploading' : 'Processing'}</span>
                  <span>{processingState.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${processingState.progress}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Image Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Original Image */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Original Image</span>
                <Badge variant="outline">Source</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                {processingState.originalImageUrl && (
                  <ImageWithFallback
                    src={processingState.originalImageUrl}
                    alt="Original medical image"
                    className="object-contain w-full h-full"
                  />
                )}
              </div>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>File Size:</span>
                  <span>{(currentFile.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span>{currentFile.type || 'Medical Image'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Processed Image */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>AI Enhanced Image</span>
                {processingState.status === 'completed' && (
                  <Badge className="bg-green-100 text-green-800">Enhanced</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                {processingState.status === 'completed' && processingState.processedImageUrl ? (
                  <ImageWithFallback
                    src={processingState.processedImageUrl}
                    alt="AI processed medical image"
                    className="object-contain w-full h-full"
                  />
                ) : processingState.status === 'error' ? (
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <p>Processing Failed</p>
                      <p className="text-sm text-muted-foreground">
                        Please try again or contact support
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Retry
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-muted border-t-primary mx-auto"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-pulse w-6 h-6 bg-primary/20 rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <p>AI Analysis in Progress</p>
                      <p className="text-sm text-muted-foreground">
                        This may take a few minutes...
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {processingState.status === 'completed' && (
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Analysis Type:</span>
                    <span>AI Enhancement</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Time:</span>
                    <span>7.2 seconds</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        {processingState.status === 'completed' && (
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download Original
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download Enhanced
            </Button>
            <Button variant="outline">
              View Detailed Report
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}