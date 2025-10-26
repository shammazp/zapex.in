# PDF Viewer Implementation

## Overview
The menu page now uses an advanced PDF viewer built with PDF.js instead of a simple iframe. This provides better user experience with navigation controls, zoom functionality, and mobile optimization.

## Features

### Navigation Controls
- **Previous/Next Page**: Navigate through PDF pages using buttons or arrow keys
- **Page Counter**: Shows current page and total pages
- **Keyboard Navigation**: Use left/right arrow keys to navigate pages

### Zoom Controls
- **Zoom In/Out**: Use +/- buttons or keyboard shortcuts (+/- keys)
- **Fit to Width**: Automatically adjust zoom to fit the container width
- **Zoom Level Display**: Shows current zoom percentage

### Mobile Optimization
- **Responsive Design**: Adapts to different screen sizes
- **Touch-Friendly Controls**: Optimized button sizes for mobile devices
- **Smooth Scrolling**: Enhanced scrolling experience on mobile

## Technical Implementation

### Files Created/Modified
1. **`/public/js/pdf-viewer.js`** - Main PDF viewer JavaScript class
2. **`/public/css/pdf-viewer.css`** - Styling for the PDF viewer
3. **`/views/menu.ejs`** - Updated to use the new PDF viewer

### Dependencies
- **PDF.js**: Loaded from CDN (https://cdnjs.cloudflare.com/ajax/libs/pdf.js/)
- **Font Awesome**: For icons (https://cdnjs.cloudflare.com/ajax/libs/font-awesome/)

### Browser Support
- Modern browsers with Canvas support
- Mobile browsers (iOS Safari, Chrome Mobile, etc.)
- Fallback to error message if PDF.js fails to load

## Usage

The PDF viewer automatically initializes when:
1. User visits `/menu?BIS=<business_number>`
2. A valid PDF URL is provided via the `menuPdf` variable
3. The page loads successfully

### Example URL
```
http://localhost:3000/menu?BIS=12345
```

## Error Handling

The viewer includes comprehensive error handling:
- **PDF Load Failures**: Shows user-friendly error message
- **Network Issues**: Graceful fallback with retry option
- **Browser Compatibility**: Detects unsupported browsers

## Performance

- **Lazy Loading**: PDF pages are rendered on-demand
- **Memory Efficient**: Only current page is kept in memory
- **Smooth Animations**: CSS transitions for better UX

## Customization

The viewer can be easily customized by modifying:
- **CSS Variables**: Colors, spacing, and animations
- **JavaScript Settings**: Default zoom level, page rendering options
- **UI Elements**: Add/remove toolbar buttons or controls
