# AGENTS.md

This file provides development guidance when working with code in this repository.

## Memory Bank Structure

This project uses an optimized memory bank system with focused documentation:

- **[Codex-overview.md](Codex-overview.md)**: Project overview, app facts, and brand identity
- **[Codex-architecture.md](Codex-architecture.md)**: Technical architecture, security, and performance patterns
- **[Codex-development.md](Codex-development.md)**: Development guidelines and coding standards
- **[Codex-deployment.md](Codex-deployment.md)**: GitHub Pages deployment and maintenance
- **[Codex-patterns.md](Codex-patterns.md)**: Design patterns, conventions, and best practices
- **[Codex-decisions.md](Codex-decisions.md)**: Technical decisions and rationale

## Quick Reference

### Project Type

Static marketing website for CardKeepApp (iOS greeting card collection app)

### Key Technologies

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Hosting**: GitHub Pages (cardkeep.app)
- **Architecture**: Multi-page static site
- **Dependencies**: Google Fonts only

### Critical Requirements

- **ALWAYS run linters/formatters** (prettier) after any code changes
- **Maintain WCAG 2.1 AA accessibility** compliance
- **Keep app facts accurate**: App Store pricing varies by region, iOS-only, greeting cards (not trading cards)
- **Universal appeal**: No holiday-specific content
- **Security**: CSP headers, noopener/noreferrer on external links

### File Structure Overview

```
/
├── index.html          # Main marketing page
├── documentation.html  # User guide
├── faq.html           # FAQ page
├── releases.html      # Release notes
├── privacy.html       # Privacy policy
├── terms.html         # Terms of service
├── styles.css         # All styling
├── script.js          # All JavaScript
├── site.webmanifest   # PWA manifest
├── favicon.ico        # Site icon
└── Screenshots/       # App images
```

## Usage Instructions

1. **Before making changes**: Read the relevant memory bank file(s) for context
2. **During development**: Follow patterns and guidelines from the patterns documentation
3. **After changes**: Always run prettier/linters (critical requirement)
4. **For deployment**: Refer to deployment procedures documentation
5. **For decisions**: Document significant choices in decisions documentation

## Contact and App Information

- **App**: CardKeepApp (iOS greeting card collection)
- **Pricing**: Available on the App Store; pricing varies by region
- **Contact**: memories@cardkeep.app
- **Website**: cardkeep.app
- **Purpose**: Greeting card memories (NOT trading cards)

For detailed information on any aspect of this project, consult the appropriate memory bank file listed above.
