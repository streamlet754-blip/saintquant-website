# SaintQuant Website

A modern, responsive landing page for SaintQuant's free crypto trading bot platform. Built with Next.js, TypeScript, and TailwindCSS.

## Features

- **Modern UI**: Clean, professional design with gradient accents
- **Responsive**: Fully responsive layout for mobile, tablet, and desktop
- **Components**: Modular React components for easy maintenance
- **SEO Optimized**: Proper metadata and semantic HTML
- **Fast**: Built with Next.js 15 for optimal performance

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/saintquant-website.git
cd saintquant-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── Features.tsx    # Features grid
│   ├── TradingStyles.tsx  # Trading strategies
│   ├── SetupGuide.tsx  # Setup instructions
│   ├── Parameters.tsx  # Parameters & security
│   └── Footer.tsx      # Footer with newsletter
└── lib/
    └── utils.ts        # Utility functions
```

## Deployment to Vercel via GitHub

### Step 1: Push to GitHub

1. Initialize git (if not already done):
```bash
git init
```

2. Add all files:
```bash
git add .
```

3. Commit changes:
```bash
git commit -m "Initial commit: SaintQuant website"
```

4. Create a new repository on GitHub (github.com/new)

5. Add remote and push:
```bash
git remote add origin https://github.com/your-username/saintquant-website.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in/up
2. Click "Add New Project" or "Import Project"
3. Import your GitHub repository
4. Vercel will automatically detect Next.js settings
5. Click "Deploy"

Your site will be live at `https://your-project-name.vercel.app`

### Step 3: Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Update DNS records as instructed by Vercel

## Environment Variables

No environment variables are required for this static site.

## Build Commands

- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Start**: `npm start`
- **Lint**: `npm run lint`

## Customization

### Colors

The site uses a blue-purple gradient theme. To customize, update Tailwind classes in the components:
- Primary gradient: `from-blue-600 to-purple-600`
- Hover states: `hover:from-blue-700 hover:to-purple-700`

### Content

Edit the content in each component file:
- `Hero.tsx` - Main headline and CTA
- `Features.tsx` - Feature cards
- `TradingStyles.tsx` - Trading strategy descriptions
- `SetupGuide.tsx` - Installation instructions
- `Footer.tsx` - Footer links and company info

## License

© 2026 SaintQuant. All Rights Reserved.

## Support

For issues or questions, please contact SaintQuant support.
