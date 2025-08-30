# PromptCraft Academy

Welcome to PromptCraft Academy, an interactive, web-based guide to the art and science of prompt engineering. This application provides hands-on demonstrations and clear explanations of the core concepts, advanced techniques, and critical risks involved in working with Large Language Models (LLMs).

This project was built with Firebase Studio.

## ✨ Features

- **Interactive Demos**: Manipulate core LLM parameters like **Temperature**, **Top-p**, and **Top-k** to see how they affect model output in real-time.
- **Transformer Simulation**: A step-by-step visualization of how a Transformer model processes input, from tokenization to final prediction.
- **Advanced Techniques Explained**: Interactive examples for **Chain-of-Thought (CoT)**, **Few-shot vs. Zero-shot prompting**, and **Role-Playing**.
- **Security Awareness**: Learn about common vulnerabilities like **Prompt Injection**, **Leaking**, and **Jailbreaking** through safe, interactive attack simulations.
- **LLM Guardrails**: Explore 20 different types of AI guardrails with a simulator that demonstrates how they protect against harmful or irrelevant content.
- **Fully Responsive**: A seamless experience across desktop, tablet, and mobile devices.
- **Light & Dark Mode**: A sleek, modern UI with theme toggling.
- **Smooth Navigation**: A sticky table of contents with smooth scrolling and section highlighting for easy navigation through the content.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Generative AI**: [Firebase Genkit](https://firebase.google.com/docs/genkit) (with Google AI)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/promptcraft-academy.git
    cd promptcraft-academy
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add your Google AI API key.
    ```env
    GEMINI_API_KEY=your_google_ai_api_key_here
    ```

### Running the Development Server

To run the application in development mode, execute the following command:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

The page will auto-update as you edit the code.

## 📦 Building for Production

To create a production-ready build of the application, run:

```bash
npm run build
```

This will create an optimized build in the `.next` directory.
