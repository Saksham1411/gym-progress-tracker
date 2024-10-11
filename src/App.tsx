import Accordian from "./components/Accordian/Accordian"
import Header from "./components/Header/Header"
import SaveDataButton from "./components/SaveDataButton"
import { Analytics } from "@vercel/analytics/react"

const App = () => {
  return (
    <div>
      <Analytics/>
      <Header/>
      <Accordian/>
      <SaveDataButton/>
    </div>
  )
}

export default App