# Resort System Constitution

## Core Principles

### I. Static-First Architecture
All content must be pre-rendered and served as static files; No server-side rendering or dynamic content generation; Use static site generators or build tools for compilation; Optimize for CDN delivery and edge caching

### II. Progressive Enhancement
Core functionality must work without JavaScript; Enhance user experience with JavaScript where appropriate; Graceful degradation for older browsers; Mobile-first responsive design approach

### III. Test-First (NON-NEGOTIABLE)
TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced; Unit tests for all JavaScript functions; Visual regression tests for UI components

### IV. Performance Standards
Page load times under 3 seconds on 3G networks; Lighthouse performance score above 90; Optimize images and assets; Minimize HTTP requests; Use modern web standards (ES6+, CSS Grid, Flexbox)

### V. Accessibility & Standards
WCAG 2.1 AA compliance required; Semantic HTML structure; Proper ARIA labels and roles; Keyboard navigation support; Screen reader compatibility

## Technical Requirements

### Build System
- Use modern build tools (Vite, Webpack, or Parcel)
- CSS preprocessing (Sass/SCSS or PostCSS)
- JavaScript bundling and minification
- Asset optimization and compression
- Source maps for debugging

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for IE11 if required
- Progressive Web App capabilities

## Development Workflow

### Code Quality
- ESLint for JavaScript linting
- Prettier for code formatting
- Pre-commit hooks for quality checks
- Code review required for all changes
- Automated testing in CI/CD pipeline

### Deployment
- Static hosting (Netlify, Vercel, GitHub Pages)
- HTTPS required in production
- Environment-specific configurations
- Automated deployments from main branch

## Governance

This constitution supersedes all other development practices. All changes must be documented, approved, and include a migration plan. All PRs must verify compliance with these principles. Complexity must be justified with clear business value.

**Version**: 1.0.0 | **Ratified**: 2025-01-27 | **Last Amended**: 2025-01-27