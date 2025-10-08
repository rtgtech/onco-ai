import { Header } from "./components/Header.jsx";
import { FileUpload } from "./components/FileUpload.jsx";
import { Footer } from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="mb-4">Medical Image Analysis Platform</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Upload your medical imaging files for AI-powered analysis. Our advanced algorithms 
              help radiologists and oncologists enhance diagnostic accuracy and efficiency.
            </p>
          </div>
          
          <FileUpload />
          
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
      </main>
      
      <Footer />
    </div>
  );
}