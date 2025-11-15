import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { AppRouter } from "./router/AppRouter";
import './App.css'
import { Toaster } from "sonner";

export default function App() {
  return (
    <div className="font-sans text-gray-900">
      <AppRouter />
      <Toaster position="top-right" richColors />
    </div>
  );
}