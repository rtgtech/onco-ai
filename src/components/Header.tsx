import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { User, Settings, History, Home } from "lucide-react";

interface HeaderProps {
  currentPage: 'home' | 'history';
  onNavigate: (page: 'home' | 'history') => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="font-bold text-white">O</span>
          </div>
          <span className="text-xl font-semibold text-primary">Onco AI</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant={currentPage === 'home' ? "default" : "ghost"} 
            size="sm"
            onClick={() => onNavigate('home')}
          >
            <Home className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Button 
            variant={currentPage === 'history' ? "default" : "ghost"} 
            size="sm"
            onClick={() => onNavigate('history')}
          >
            <History className="h-4 w-4 mr-2" />
            History
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="User" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}