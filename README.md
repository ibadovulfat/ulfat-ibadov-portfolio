# React Portfolio Project

> **Note:** Usage requires explicit permission from the author.

**Creator:** Ulfat Ibadov
**LinkedIn:** [Ulfat Ibadov](https://www.linkedin.com/in/ibadovulfat/)

This is a modern portfolio website built with React, Vite, TypeScript, and styled with Tailwind CSS. It features a clean design, various UI components from the shadcn/ui library, and includes sections for a hero introduction, project showcases, skills, and contact information.

## Technologies Used

This project is built with a modern, component-based architecture. Here are the core technologies and libraries used:

### Core Stack

*   **[React](https://react.dev/)**: A JavaScript library for building user interfaces.
*   **[TypeScript](https://www.typescriptlang.org/)**: A typed superset of JavaScript that compiles to plain JavaScript, adding static types for better developer experience and code quality.
*   **[Vite](https://vitejs.dev/)**: A next-generation frontend build tool that provides an extremely fast development experience and bundles code for production.
*   **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapidly building custom designs without leaving your HTML.

### UI & Styling

*   **[shadcn/ui](https://ui.shadcn.com/)**: A collection of re-usable UI components (such as Buttons, Cards, Dialogs, and Forms) built on top of Radix UI and Tailwind CSS.
*   **[Radix UI](https://www.radix-ui.com/)**: Provides unstyled, accessible, and low-level UI primitives that form the foundation of the `shadcn/ui` components.
*   **[Lucide React](https://lucide.dev/)**: A beautiful and consistent icon library.
*   **[tailwind-merge](https://github.com/dcastil/tailwind-merge)**: A utility function to intelligently merge Tailwind CSS classes.
*   **[tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)**: A Tailwind CSS plugin for adding enter/exit animations.

### Routing & State Management

*   **[React Router](https://reactrouter.com/)**: The standard library for routing in React, enabling navigation and view composition.
*   **[TanStack Query (React Query)](https://tanstack.com/query/latest)**: A powerful library for server-state management, handling data fetching, caching, and synchronization.

### Forms

*   **[React Hook Form](https://react-hook-form.com/)**: A performant and easy-to-use library for managing forms in React.
*   **[Zod](https://zod.dev/)**: A TypeScript-first schema declaration and validation library, used with React Hook Form to ensure data integrity.

### Backend & API (for Contact Form)

*   **[Express](https://expressjs.com/)**: A minimal and flexible Node.js web application framework used here to create a simple backend API endpoint.
*   **[Nodemailer](https://nodemailer.com/)**: A module for Node.js applications to allow easy email sending, used for the contact form functionality.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (which includes npm) and/or [Bun](https://bun.sh/) installed on your system.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using Bun:
    ```bash
    bun install
    ```

### Running the Development Server

To start the Vite development server and view the project in your browser:

```bash
npm run dev
```
or
```bash
bun run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Building for Production

To create a production-ready build of the application:

```bash
npm run build
```
or
```bash
bun run build
```

This command bundles the application into the `dist/` directory. The files in this directory are optimized and ready for deployment to a web server.
