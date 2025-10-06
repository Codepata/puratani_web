# **App Name**: Puratani - A - Nostalgia

## Core Features:

- Header Navigation: Fixed header with links/buttons to Home, About, Causes, Blog, and Contact pages. Includes sticky behavior and smooth transition animations.
- Hero Banner: Display a background image with a large title, subtitle, and CTAs ('Donate Now' and 'Learn More') with parallax or fade-in animation.
- Featured Causes: Show horizontal scrollable cards, each with a cause image, title, progress bar, short description, and 'Donate' button. Data fetched from FastAPI's /causes endpoint.
- About Us Section: Fetch and render content from Django CMS's About page with Markdown support and animated fade-in effects.
- User Profile Page: A protected route displaying the user's profile photo, name, email, donation history, and joined date, with edit and logout options, managed by Clerk authentication.
- Login/Register Screen: Email/password and social login options, styled forms matching the theme, and seamless navigation between login, register, and profile pages using Clerk’s React Native SDK.
- Donate Page: A dynamic donation form linked to FastAPI backend for submission and confirmation, storing donation data in Neon PostgreSQL database.
- Blog Section: Display blog posts from Django CMS (via API), each including a title, date, thumbnail, short preview, and 'read more' link. Content is pulled dynamically.

## Style Guidelines:

- Primary color: Deep black (#000000) for a stark, sophisticated aesthetic.
- Background color: Soft Gray (#F2F2F2), a slightly desaturated near-white hue providing contrast but not starkness, allowing elements to pop against the background.
- Accent color: Pink (#D81B60), offering a vibrant highlight for key interactive elements; it complements the primary color and reflects the specified design system. This color is chosen in the hue neighborhood to the user requested primary color (#E91E63), but with adjustments for maximum contrast and visual harmony.
- Body font: 'PT Sans', a humanist sans-serif that offers both a modern look and a touch of warmth.
- Headline font: 'Playfair', a modern sans-serif for headlines, with a high-end feel. Pair with PT Sans for body.
- Use a set of clear, minimalist icons from a consistent set (e.g., Feather, Phosphor). Match icons to primary color.
- Employ a mobile-first, responsive layout with touch-friendly components and consistent spacing throughout the app. Use expo and tailwind CSS
- Subtle animations using Reanimated 2 for transitions, button hovers, and other interactive elements.