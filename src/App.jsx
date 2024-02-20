import { RouterProvider } from "react-router-dom"
import router from "./PAGES/Routes/Router"
import ScrollToTop from "./PAGES/Shared/ScrollToTop";

function App() {

  return (

    <div>

      <RouterProvider router={router}>
        <ScrollToTop>
          <div></div>
        </ScrollToTop>

      </RouterProvider>
    </div>

  )
}

export default App
