import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, Download, Eye, FileImage } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HistoryItem {
  id: string;
  originalImage: string;
  processedImage: string;
  fileName: string;
  uploadDate: string;
  status: 'completed' | 'processing' | 'failed';
  analysisType: string;
  fileSize: string;
}

// Mock data for demonstration
const mockHistoryData: HistoryItem[] = [
  {
    id: '1',
    originalImage: 'https://images.unsplash.com/photo-1631651363531-fd29aec4cb5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIweC1yYXklMjBjaGVzdHxlbnwxfHx8fDE3NTk4MjI3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    processedImage: 'https://images.unsplash.com/photo-1631651363531-fd29aec4cb5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIweC1yYXklMjBjaGVzdHxlbnwxfHx8fDE3NTk4MjI3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    fileName: 'chest_xray_patient_001.dcm',
    uploadDate: '2025-01-15',
    status: 'completed',
    analysisType: 'Chest X-Ray Analysis',
    fileSize: '2.4 MB'
  },
  {
    id: '2',
    originalImage: 'https://images.unsplash.com/photo-1758691463569-66de91d76452?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFpbiUyME1SSSUyMHNjYW4lMjBtZWRpY2FsfGVufDF8fHx8MTc1OTkwNjMxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    processedImage: 'https://images.unsplash.com/photo-1758691463569-66de91d76452?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFpbiUyME1SSSUyMHNjYW4lMjBtZWRpY2FsfGVufDF8fHx8MTc1OTkwNjMxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    fileName: 'brain_mri_patient_007.dcm',
    uploadDate: '2025-01-14',
    status: 'completed',
    analysisType: 'Brain MRI Analysis',
    fileSize: '5.1 MB'
  },
  {
    id: '3',
    originalImage: 'https://images.unsplash.com/photo-1706065638524-eb52e7165abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwQ1QlMjBzY2FufGVufDF8fHx8MTc1OTgwODAwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    processedImage: 'https://images.unsplash.com/photo-1706065638524-eb52e7165abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwQ1QlMjBzY2FufGVufDF8fHx8MTc1OTgwODAwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    fileName: 'ct_abdomen_patient_012.dcm',
    uploadDate: '2025-01-13',
    status: 'processing',
    analysisType: 'CT Scan Analysis',
    fileSize: '8.7 MB'
  }
];

export function History() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'processing':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Processing</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-4">Analysis History</h1>
          <p className="text-muted-foreground">
            View all your previously uploaded and processed medical images
          </p>
        </div>

        <div className="space-y-6">
          {mockHistoryData.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      <FileImage className="h-5 w-5" />
                      {item.fileName}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(item.uploadDate).toLocaleDateString()}
                      </span>
                      <span>{item.fileSize}</span>
                      <span>{item.analysisType}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(item.status)}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Original Image */}
                  <div className="space-y-3">
                    <h4>Original Image</h4>
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                      <ImageWithFallback
                        src={item.originalImage}
                        alt={`Original ${item.fileName}`}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge variant="outline" className="bg-white/90">
                          Original
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Processed Image */}
                  <div className="space-y-3">
                    <h4>Processed Image</h4>
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                      {item.status === 'completed' ? (
                        <>
                          <ImageWithFallback
                            src={item.processedImage}
                            alt={`Processed ${item.fileName}`}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge variant="outline" className="bg-white/90">
                              AI Enhanced
                            </Badge>
                          </div>
                        </>
                      ) : item.status === 'processing' ? (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center space-y-2">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                            <p className="text-sm text-muted-foreground">Processing...</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center space-y-2">
                            <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                              <span className="text-red-600">✕</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Processing Failed</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                {item.status === 'completed' && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Original
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Processed
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {mockHistoryData.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="space-y-4">
                <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <FileImage className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <h3>No Analysis History</h3>
                  <p className="text-muted-foreground">
                    Upload your first medical image to see it appear here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}