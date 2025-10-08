# Onco AI - Medical Image Analysis Platform

A professional medical-grade application for radiologists and oncologists to upload and analyze medical images using AI processing.

## Features

- **Medical Image Upload**: Drag-and-drop interface supporting DICOM, PNG, JPEG, TIFF formats
- **AI Processing**: Real-time processing simulation with progress tracking
- **Image Comparison**: Side-by-side view of original and AI-enhanced images
- **History Management**: Track previously uploaded and processed images
- **Medical-Grade UI**: Professional color scheme optimized for healthcare professionals
- **HIPAA Compliant Design**: Secure interface with healthcare compliance in mind

## Tech Stack

- **React** with TypeScript
- **Tailwind CSS v4** for styling
- **shadcn/ui** component library
- **Lucide React** for icons

## Project Structure

```
├── App.tsx                    # Main application component
├── lib/
│   └── utils.ts              # Utility functions
├── components/
│   ├── Header.tsx            # Application header with navigation
│   ├── Footer.tsx            # Footer with compliance information
│   ├── FileUpload.tsx        # Drag-and-drop file upload component
│   ├── ProcessingView.tsx    # Image processing and comparison view
│   ├── History.tsx           # Upload history management
│   ├── figma/
│   │   └── ImageWithFallback.tsx  # Image component with fallback
│   └── ui/                   # shadcn/ui component library
├── styles/
│   └── globals.css           # Global styles and medical theme
└── README.md                 # This file
```

## Key Components

### App.tsx
Main application router managing navigation between upload, processing, and history views.

### FileUpload.tsx
Handles medical image upload with:
- Drag-and-drop functionality
- File type validation
- Visual feedback for upload states

### ProcessingView.tsx
Manages the AI processing workflow:
- Upload progress tracking
- Processing animation
- Side-by-side image comparison
- Download functionality

### Medical Color Theme
Professional healthcare color palette featuring:
- Medical blue primary colors (#2563eb)
- Clean clinical whites and off-whites
- Professional grays for excellent readability
- High contrast ratios for accessibility

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm start
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Medical Compliance

This application is designed with healthcare professionals in mind and includes:
- HIPAA-compliant design patterns
- Secure file handling interfaces
- Professional medical aesthetic
- Accessibility considerations for clinical environments

## API Integration

The application is designed to integrate with medical AI processing APIs. Update the `ProcessingView.tsx` component to connect to your actual AI processing endpoints.