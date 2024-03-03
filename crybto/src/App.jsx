import { Routes, Route } from 'react-router-dom'
import './App.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@fontsource/roboto";
import "vazirmatn/misc/Farsi-Digits-Non-Latin/Vazirmatn-FD-NL-font-face.css"
import 'react-loading-skeleton/dist/skeleton.css'

// components
import Main from './components/Main';
import CoinDetails from "./components/CoinDetails"
import Header from './components/Header'

function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <Header />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path='/:id' element={<CoinDetails />} />
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App
