# Ek-Drishti Digital Hub

A comprehensive government services portal providing unified access to digital tools, services, and resources. Built with modern HTML5, CSS3, and JavaScript for optimal performance and accessibility.

## 🌟 Features

### Core Functionality
- **Unified Government Portal Access** - Single platform for multiple government services
- **Dark/Light Mode Toggle** - Seamless theme switching with localStorage persistence
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Interactive Service Slider** - Auto-playing carousel with touch/swipe support
- **Real-time Contact Forms** - Email integration with WhatsApp fallback
- **Blog with Comments** - Local storage-based commenting system
- **User Authentication** - Login/signup pages with modern UI/UX

### Technical Features
- **Static Site** - Pure HTML/CSS/JS for fast loading and easy deployment
- **SEO Optimized** - Meta tags, OpenGraph, and semantic HTML structure
- **Glass Morphism Design** - Modern UI with backdrop filters and gradients
- **Accessibility** - WCAG compliant with proper ARIA labels and keyboard navigation
- **Progressive Enhancement** - Feature detection and graceful fallbacks

## 🚀 Pages

- **Home** (`index.html`) - Landing page with hero section and quick access
- **Services** (`services.html`) - Detailed government services catalog
- **Tools** (`tools.html`) - Software tools and utilities download center
- **Blog** (`blog.html`) - Latest news and updates with commenting
- **Contact** (`contact.html`) - Contact forms and support information
- **Login** (`login.html`) - User authentication with social login options
- **Signup** (`signup.html`) - Account creation with verification process

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#3b82f6` - Government services and CTAs
- **Accent Purple**: `#8b5cf6` - Highlights and secondary actions
- **Success Green**: `#10b981` - Confirmations and positive states
- **Warning Amber**: `#f59e0b` - Alerts and important notices
- **Error Red**: `#ef4444` - Errors and critical actions

### Typography
- **Font Family**: Inter (Google Fonts)
- **Responsive Scale**: Fluid typography using clamp()
- **Weight Range**: 300-700 for optimal hierarchy

### Layout
- **Container**: 1200px max-width with responsive padding
- **Grid System**: CSS Grid with auto-fit/auto-fill patterns
- **Spacing**: Consistent scale using CSS custom properties

## 🛠️ Technologies

- **HTML5** - Semantic markup with modern standards
- **CSS3** - Custom properties, Grid, Flexbox, and advanced animations
- **Vanilla JavaScript** - No frameworks, pure ES6+ with modern APIs
- **Google Fonts** - Inter font family for consistent typography
- **Icons8** - High-quality icons for visual elements

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile Safari** iOS 14+
- **Chrome Mobile** Android 90+

## 🌐 Deployment

### GitHub Pages Deployment

1. **Fork/Clone** this repository
2. **Enable GitHub Pages** in repository settings
3. **Select source** as "Deploy from a branch"
4. **Choose branch** `main` and folder `/ (root)`
5. **Access** your site at `https://yourusername.github.io/repository-name`

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/ek-drishti-hub.git

# Navigate to project directory
cd ek-drishti-hub

# Open with live server (VS Code extension) or serve with any static server
# No build process required - pure static files
```

### Custom Domain (Optional)

1. Add `CNAME` file in root with your domain
2. Configure DNS A records to GitHub Pages IPs:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153

## 🔧 Configuration

### Environment Variables
No environment variables required - fully static configuration.

### Customization
- **Colors**: Modify CSS custom properties in `styles.css`
- **Content**: Update HTML files with your specific information
- **Contact**: Change email addresses and WhatsApp numbers as needed
- **Branding**: Replace logo URLs and brand text throughout files

### Email Configuration
The contact form uses `mailto:` links. To integrate with a backend service:

1. Replace `mailto:` with your form handler endpoint
2. Update JavaScript in `contact.html` to POST to your service
3. Add proper error handling and success feedback

## 📂 File Structure

```
ek-drishti-hub/
├── index.html          # Main landing page
├── services.html       # Government services catalog
├── tools.html          # Software tools and downloads
├── blog.html           # News and updates with comments
├── contact.html        # Contact forms and information
├── login.html          # User authentication
├── signup.html         # Account registration
├── styles.css          # Comprehensive stylesheet
├── script.js           # Interactive functionality
├── README.md           # Project documentation
└── CNAME              # Custom domain configuration (optional)
```

## ✨ Key Features Breakdown

### Dark/Light Mode
- System preference detection
- Manual toggle with smooth transitions
- localStorage persistence across sessions
- Consistent theming across all pages

### Interactive Slider
- Touch/swipe support for mobile
- Keyboard navigation accessibility
- Auto-play with pause on hover
- Smooth animations and transitions

### Contact Integration
- Email form with mailto fallback
- WhatsApp integration for instant support
- Form validation and user feedback
- Responsive design for all devices

### Blog System
- Local storage comments (no backend required)
- Responsive grid layout
- Category filtering and search
- Social sharing integration

### Authentication UI
- Modern login/signup forms
- Password strength indicators
- Social login button styling
- Form validation and error handling

## 🎯 Performance Optimizations

- **Minified CSS** with efficient selectors
- **Optimized images** with proper sizing and formats
- **Lazy loading** for non-critical content
- **Progressive enhancement** for core functionality
- **Efficient JavaScript** with debounced events
- **CSS Grid/Flexbox** for performant layouts

## 📞 Support & Contact

- **Email**: brainimmensity@gmail.com
- **WhatsApp**: +91 80904 41419
- **Issues**: Create GitHub issues for bug reports
- **Contributions**: Pull requests welcome

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Icons8** for providing high-quality icons
- **Google Fonts** for the Inter typography
- **Unsplash** for blog post imagery
- **Government of India** for service integration guidelines

## 🔄 Updates & Changelog

### Version 1.0.0 (2025-01-29)
- Initial release with full static site functionality
- Dark/light mode implementation
- Complete responsive design
- All core pages and features implemented
- GitHub Pages deployment ready

---

**Built with ❤️ for digital governance and citizen services**