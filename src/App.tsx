import Accordian from "./components/Accordian/Accordian"
import Header from "./components/Header/Header"
import { Analytics } from "@vercel/analytics/react"

const App = () => {
  return (
    <div>
      <Analytics/>
      <Header/>
      <Accordian/>
    </div>
  )
}

export default App