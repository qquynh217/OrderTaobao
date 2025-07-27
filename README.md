# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Setup and run project

### 🚀 Installation
To get this project up and running on your local machine, follow these steps:
1. Clone the repository:
```bash
git clone https://github.com/qquynh217/OrderTaobao.git
```
2. Navigate into the project directory:
```bash
cd your-project-name
```
3. Install the dependencies:
```bash
npm install
# or if you use yarn
# yarn install
```

### 🏃 Running the Project
Once the dependencies are installed, you can start the development server:
```bash
npm run dev
# or
# yarn dev
```
The application will be available at http://localhost:5173 (or another port if 5173 is busy). Open your browser and navigate to this address to see the app running. Any changes you make to the source code will automatically refresh the browser thanks to Vite's Hot Module Replacement (HMR).

### 📁 Folder Structure
Here's a basic overview of the project's folder structure:
```bash
your-project-name/
├── public/             # Static assets served directly (e.g., index.html, favicon.ico)
├── src/                # Main application source code
│   ├── components/     # Reusable UI components 
│   ├── constants/      # Application-wide constants 
│   ├── context/        # React Context APIs for global state management
│   ├── i18n/           # Internationalization/localization files (translations)
│   ├── pages/          # Top-level components representing distinct views or routes
│   ├── resources/      # Static assets that are processed by the bundler (e.g., images, fonts)
│   ├── routes/         # Route definitions and potentially route-specific logic
│   ├── services/       # Logic for interacting with external APIs, backend
│   ├── store/          # Centralized state management (Zustand)
│   ├── styles/         # Global or shared stylesheets 
│   ├── utils/          # Utility functions, helpers, and common logic
│   ├── App.jsx         # The root React component of the application
│   ├── main.jsx        # Entry point of the application 
│   └── index.css       # Global CSS styles or root styling imports
├── .gitignore          # Specifies intentionally untracked files to ignore by Git
├── package.json        # Project metadata and dependency list
├── vite.config.js      # Vite configuration file
└── README.md           # This README file!
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
