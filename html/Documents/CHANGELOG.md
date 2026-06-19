# Changelog - WEDE5020 Part 3 (POE)

All notable changes to this project are documented below, demonstrating how iterative development directly addresses the feedback received from the Part 2 evaluation.

## [Part 2 Feedback Implementation Updates] - 2026-06-19

### 1. Structure & Accessibility Fixes
- **Assessor Feedback:** Improve semantic layout hierarchy and ensure all media assets support screen readers.
- **Correction Applied:** Replaced legacy generic generic `<div>` wrappers with semantic HTML5 elements (`<header>`, `<main>`, `<section>`). Added explicit, highly descriptive `alt` text to all visual elements.

### 2. Form Styling & User Experience (UX)
- **Assessor Feedback:** Input fields lacked distinct interactive states and clear error notification fields.
- **Correction Applied:** Engineered active focus indicators using CSS box-shadow configurations. Added custom dynamic validation message containers beneath every crucial input control.

### 3. SEO Configurations
- **Assessor Feedback:** Meta-data discovery hooks were absent or uniform across pages.
- **Correction Applied:** Created unique, optimized `<title>` tags, targeted `<meta name="keywords">`, and distinctive `<meta name="description">` strings tailored specifically for each individual page layout.