import { useState } from "react";
import { Header } from "./components/Header";
import { FileUpload } from "./components/FileUpload";
import { Footer } from "./components/Footer";
import { History } from "./components/History";
import { ProcessingView } from "./components/ProcessingView";

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'history' | 'processing'>('home');
  const [processingFiles, setProcessingFiles] = useState<File[]>([]);

  const handleNavigate = (page: 'home' | 'history') => {
    setCurrentPage(page);
  };

  const handleStartProcessing = (files: File[]) => {
    setProcessingFiles(files);
    setCurrentPage('processing');
  };

  const handleBackToUpload = () => {
    setCurrentPage('home');
    setProcessingFiles([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main className="flex-1">
        {currentPage === 'home' ? (
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="mb-4">Medical Image Analysis Platform</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Upload your medical imaging files for AI-powered analysis. Our advanced algorithms 
                  help radiologists and oncologists enhance diagnostic accuracy and efficiency.
                </p>
              </div>
              
              <FileUpload onStartProcessing={handleStartProcessing} />
              
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-lg bg-card border">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary">🔬</span>
                  </div>
                  <h3 className="mb-2">Advanced Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    AI-powered image processing with state-of-the-art algorithms
                  </p>
                </div>
                
                <div className="text-center p-6 rounded-lg bg-card border">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary">⚡</span>
                  </div>
                  <h3 className="mb-2">Fast Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Get results in minutes, not hours, for faster diagnosis
                  </p>
                </div>
                
                <div className="text-center p-6 rounded-lg bg-card border">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary">🔒</span>
                  </div>
                  <h3 className="mb-2">HIPAA Compliant</h3>
                  <p className="text-sm text-muted-foreground">
                    Secure, encrypted processing ensuring patient privacy
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : currentPage === 'history' ? (
          <History />
        ) : (
          <ProcessingView files={processingFiles} onBack={handleBackToUpload} />
        )}
      </main>
      
      <Footer />
    </div>
  );
}