# Irodov Video Solutions

AI-generated video solutions for I.E. Irodov's "Problems in General Physics"

## 📋 Project Overview

This project creates a comprehensive platform that:
- Organizes Irodov problems chapter-wise
- Generates AI-powered video solutions
- Hosts videos on YouTube
- Provides a seamless learning experience

## 🚀 Features

- **Chapter-wise Organization**: Problems systematically organized by chapters
- **AI-Generated Videos**: High-quality video solutions powered by AI
- **YouTube Integration**: Videos hosted on YouTube with proper metadata
- **Responsive Design**: Works seamlessly on all devices
- **Dark/Light Mode**: Toggle between themes
- **Search & Filter**: Find problems easily
- **Progress Tracking**: Monitor your learning progress

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand + TanStack Query
- **UI Components**: shadcn/ui + Lucide icons

### Backend
- **API Framework**: Next.js API Routes
- **Database**: Prisma ORM + SQLite (dev) / PostgreSQL (prod)
- **Auth**: NextAuth.js
- **Queue System**: Background jobs for video generation

### AI & Video Generation
- **AI SDK**: z-ai-web-dev-sdk
- **Video Generation**: FFmpeg + Canvas/SVG
- **Voice Synthesis**: AI-powered narration
- **YouTube API**: YouTube Data API v3

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sulabhvarshney-glitch/irodov-video-solutions.git
   cd irodov-video-solutions
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗂️ Project Structure

```
irodov-video-solutions/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Homepage
│   ├── components/          # React components
│   │   └── ui/             # shadcn/ui components
│   ├── lib/                # Utility functions
│   │   ├── db.ts          # Database client
│   │   └── utils.ts       # Helper functions
│   └── types/              # TypeScript type definitions
├── prisma/                 # Database schema
├── public/                 # Static assets
├── components.json         # shadcn/ui config
├── tailwind.config.ts      # Tailwind CSS config
├── next.config.ts         # Next.js config
└── package.json           # Dependencies and scripts
```

## 📝 Implementation Plan

See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for detailed implementation roadmap and phase breakdown.

## 🎯 Development Workflow

### Week 1-2: Foundation ✅
- [x] Set up Next.js project with TypeScript
- [ ] Design and implement database schema
- [ ] Create basic UI components and layout
- [ ] Implement chapter and problem management

### Week 3-4: AI Video Generation
- [ ] Implement problem analysis AI
- [ ] Create solution generation pipeline
- [ ] Set up diagram and animation generation
- [ ] Integrate voice synthesis

### Week 5-6: Video Processing & YouTube
- [ ] Implement video composition
- [ ] Set up YouTube API integration
- [ ] Create automated upload system
- [ ] Implement video queue management

### Week 7-8: Frontend Features
- [ ] Complete responsive design
- [ ] Implement search and filtering
- [ ] Add user progress tracking
- [ ] Create admin dashboard

### Week 9-10: Polish & Launch
- [ ] Performance optimization
- [ ] Testing and bug fixes
- [ ] Documentation and deployment
- [ ] Launch and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- I.E. Irodov for the classic physics problems
- The physics community for continuous inspiration
- AI technology providers for making this project possible

## 📞 Contact

- **Project Owner**: sulabhvarshney-glitch
- **GitHub**: https://github.com/sulabhvarshney-glitch/irodov-video-solutions

---

*"Physics is the poetry of the universe, and mathematics is its language."*