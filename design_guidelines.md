# CineReviews Design Guidelines

## Design Approach
**Reference-Based Approach** - Drawing inspiration from modern media platforms like Netflix, Spotify, and IMDb for their sophisticated visual treatment of entertainment content and intuitive browsing experiences.

## Core Design Principles
- **Cinematic Experience**: Create an immersive, movie theater-like atmosphere
- **Content-First**: Let movie visuals drive the aesthetic while maintaining excellent readability
- **Modern Media Platform**: Clean, sophisticated interface similar to premium streaming services

## Color Palette

### Dark Mode Primary (Default)
- **Background**: 12 5% 8% (deep charcoal)
- **Surface**: 12 8% 12% (elevated dark surface)
- **Primary Brand**: 0 84% 60% (cinematic red)
- **Text Primary**: 0 0% 95% (near white)
- **Text Secondary**: 0 0% 70% (muted gray)

### Light Mode
- **Background**: 0 0% 98% (soft white)
- **Surface**: 0 0% 100% (pure white)
- **Primary Brand**: 0 84% 55% (darker cinematic red)
- **Text Primary**: 12 5% 15% (dark charcoal)
- **Text Secondary**: 12 5% 45% (medium gray)

### Accent Colors
- **Success/Rating**: 142 70% 45% (muted green for positive ratings)
- **Warning**: 38 90% 50% (warm amber for moderate ratings)

## Typography
- **Primary Font**: Inter (Google Fonts) - Clean, modern readability
- **Display Font**: Outfit (Google Fonts) - Bold headings and movie titles
- **Sizes**: Use Tailwind's type scale (text-sm to text-6xl)
- **Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

## Layout System
**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16, 24
- **Container**: Max-width with responsive padding (px-4, px-6, px-8)
- **Grid System**: CSS Grid for movie grids, Flexbox for navigation and cards
- **Responsive**: Mobile-first with careful attention to tablet and desktop experiences

## Component Library

### Navigation
- **Header**: Dark background with brand logo, search bar, and user controls
- **Search**: Prominent search with real-time suggestions dropdown
- **Categories**: Horizontal scrolling tabs for genres/categories

### Movie Display
- **Hero Section**: Full-width featured movie with gradient overlay
- **Movie Cards**: Poster-focused cards with hover effects revealing details
- **Movie Grid**: Responsive grid (2 cols mobile, 4-6 cols desktop)
- **Movie Modal**: Overlay with detailed information, cast, reviews

### Interactive Elements
- **Buttons**: Primary (brand red), Secondary (outlined), and Ghost variants
- **Rating System**: Star-based visual rating with hover states
- **Like/Bookmark**: Heart and bookmark icons with animation feedback
- **Filters**: Dropdown menus and toggle switches for sorting/filtering

### Data Display
- **Movie Details**: Clean typography hierarchy with proper spacing
- **Review Cards**: User avatars, ratings, and review text in card format
- **Loading States**: Skeleton screens matching content structure

## Images
The website features extensive use of movie poster imagery:

### Hero Section
- **Large Hero Image**: Full-width featured movie backdrop with gradient overlay
- **Overlay Content**: Movie title, description, and action buttons with blurred backgrounds
- **Height**: 60vh on desktop, 50vh on mobile

### Movie Posters
- **Aspect Ratio**: Standard movie poster ratio (2:3)
- **Quality**: High-resolution posters from movie APIs
- **Fallback**: Elegant placeholder for missing images
- **Hover Effects**: Subtle scale and shadow enhancement

### Background Treatments
- **Gradient Overlays**: Dark gradients on hero images for text readability
- **Backdrop Blurs**: Subtle backdrop filters for modal backgrounds
- **Pattern**: Optional subtle film grain texture on dark backgrounds

## Animation Strategy
**Minimal and Purposeful**:
- **Page Transitions**: Subtle fade effects between views
- **Hover States**: Gentle scale transforms on movie cards
- **Loading**: Smooth skeleton animations
- **Micro-interactions**: Button press feedback and icon animations

## Mobile Considerations
- **Touch Targets**: Minimum 44px touch areas
- **Gesture Support**: Swipe navigation for movie carousels
- **Performance**: Optimized image loading and lazy loading
- **Typography**: Larger base font sizes for mobile readability

This design creates a premium, Netflix-like experience that celebrates movie content while maintaining excellent usability across all devices.