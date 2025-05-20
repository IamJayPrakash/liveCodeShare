<h1 align="center">🚀 LiveCodeShare</h1>
<p align="center">
  <a href="https://livecodeshare.vercel.app/room/1"><img src="https://img.shields.io/badge/Live-Demo-orange?style=for-the-badge&logo=vercel" alt="Live Demo" /></a>
  <a href="https://github.com/IamJayPrakash/liveCodeShare/actions/workflows/ci.yml"><img src="https://img.shields.io/badge/CI-Build-pink?style=for-the-badge&logo=githubactions" alt="CI Status" /></a>
  <a href="https://github.com/IamJayPrakash/liveCodeShare/actions/workflows/test.yml"><img src="https://img.shields.io/badge/Tests-Passing-brightgreen?style=for-the-badge&logo=jest" alt="Tests" /></a>
  <a href="https://coveralls.io/github/IamJayPrakash/liveCodeShare?branch=main"><img src="https://img.shields.io/coveralls/IamJayPrakash/liveCodeShare/main?style=for-the-badge" alt="Coverage" /></a>
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="MIT License" />
</p>

<p align="center"><em>Collaborate on code live with beautiful animations and smooth transitions.</em></p>

---

## 🔥 Features

<p align="center">
  <!-- Real-time collaboration GIF -->
  <img src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif" alt="Real-time Collaboration" width="50%" />
</p>

- **Real-Time Collaboration**: Bi-directional updates via [Socket.IO](https://socket.io/).
- **Syntax Highlighting**: Powered by [Monaco Editor](https://microsoft.github.io/monaco-editor/).
- **Customizable Editor**: Themes, auto-formatting, and code snippets integrated.
- **Shareable Rooms**: Instantly generate and share unique URLs.
- **Light & Dark Mode**: Seamless theme toggling with [next-themes](https://github.com/pacocoursey/next-themes).
- **Secure Auth**: Login via [NextAuth.js](https://next-auth.js.org/) or [Firebase](https://firebase.google.com/).
- **Smooth Animations**: Engaging transitions with [Framer Motion](https://www.framer.com/motion/).
- **Toast Notifications**: Instant feedback using [Sonner](https://sonner.vercel.app/).

---

## 🛠️ Tech Stack & Tools

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.3.0-black?style=for-the-badge&logo=nextdotjs" alt="Next.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-blue?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Monaco_Editor-4.7.0-magenta?style=for-the-badge&logo=microsoft" alt="Monaco Editor" />
  <img src="https://img.shields.io/badge/Socket.IO-4.8.1-white?style=for-the-badge&logo=socket.io" alt="Socket.IO" />
  <img src="https://img.shields.io/badge/Framer_Motion-12.6.5-purple?style=for-the-badge&logo=framer" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Sonner-2.0.3-teal?style=for-the-badge" alt="Sonner" />
  <img src="https://img.shields.io/badge/Zod-3.24.2-lightgrey?style=for-the-badge" alt="Zod" />
  <img src="https://img.shields.io/badge/Faker-9.7.0-orange?style=for-the-badge&logo=faker" alt="Faker" />
</p>

---

## 🚀 Installation

```bash
# Clone the repo
git clone https://github.com/IamJayPrakash/liveCodeShare.git
cd liveCodeShare

# Install dependencies
npm install

# Setup environment variables
# Create .env in project root:
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
# (Optional) Production socket URL:
# NEXT_PUBLIC_SOCKET_URL=https://livecodeshare-socket.onrender.com

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤝 Contributing

1. Fork the repository 🔀
2. Create a feature branch: `git checkout -b feature/YourFeatureName`
3. Implement your feature and write tests 🧪
4. Commit changes with clear messages 💬
5. Push to your fork: `git push origin feature/YourFeatureName`
6. Open a Pull Request and wait for review 🚀

![Alt](https://repobeats.axiom.co/api/embed/3a5680a77e2785974c42df953cd1b7b042ad5df4.svg "Repobeats analytics image")


See [Code of Conduct](CODE_OF_CONDUCT.md) for community guidelines.

---

## 🧪 Testing & Linting

```bash
# Lint and format
npm run lint
npm run format

# Run tests
npm run test
npm run test:coverage
```

---

## 📄 License

<p align="center">
  <!-- Demo animation GIF -->
  <img src="https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif" alt="LiveCodeShare Demo" width="80%" />
</p>

---

<p align="center">Happy coding with <strong>LiveCodeShare</strong>! 🚀</p>
