# Work Management & Task Assignment System - Project Overview

A comprehensive project overview website showcasing a scalable work management and task assignment system built with modern web technologies.

## 🚀 Live Demo

This website provides a detailed overview of a Work Management & Task Assignment System designed for multi-hierarchy organizations.

## 📋 Project Overview

The Work Management System is a full-stack web application built using:
- **Frontend & Backend**: Next.js with TailwindCSS
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with Role-Based Access Control
- **Real-Time Features**: WebRTC, Socket.IO for video conferencing and notifications
- **Email System**: SMTP integration with Nodemailer

## 🎯 Key Features Showcased

### User Roles & Hierarchy
- **Department Head** - Complete system control
- **Manager** - Department-level management
- **Assistant Manager** - Team coordination support  
- **Team Lead** - Direct team management
- **Employee** - Task execution and reporting

### Core Functionality
- **Authentication & Security**: JWT, RBAC, audit logs
- **Task Management**: Multi-level delegation, Kanban boards, file attachments
- **Video Conferencing**: Integrated WebRTC/Jitsi Meet with scheduling
- **Notifications**: Real-time in-app and email notifications
- **Reporting**: Performance analytics and exportable reports
- **System Features**: Responsive design, dark mode, global search

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Responsive Design** principles

### Backend (Project Being Showcased)
- **Next.js** full-stack framework
- **Node.js** with Express
- **MongoDB** with Mongoose ODM
- **JWT** authentication
- **Socket.IO** for real-time features

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
