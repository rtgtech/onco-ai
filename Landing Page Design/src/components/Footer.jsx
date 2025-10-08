export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
              <span className="text-sm text-white">O</span>
            </div>
            <span className="text-sm text-muted-foreground">Onco AI</span>
          </div>
          
          <div className="flex flex-col items-center space-y-2 md:flex-row md:space-x-6 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Onco AI. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border/40">
          <p className="text-xs text-muted-foreground text-center">
            This platform is designed for medical professionals. Please ensure compliance with applicable healthcare regulations and institutional policies.
          </p>
        </div>
      </div>
    </footer>
  );
}