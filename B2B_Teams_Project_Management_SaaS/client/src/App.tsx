import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <div>
    <Button variant="outline" size="lg">
      Hello World
    </Button>
   </div>
   </>
  )
}

export default App
