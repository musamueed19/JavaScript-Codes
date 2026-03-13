import { BrowserRouter, Route, Routes } from "react-router-dom"
import { authenticationRoutePaths, baseRoutePaths, protectedRoutePaths } from "./common/routes"

const AppRoutes = () => {
  return (
  //  Wrapper Browser router
   <BrowserRouter>
    
    {/* Routes Wrapper */}
    <Routes>

      {/* base layout routes */}
      <Route>
        {baseRoutePaths.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>

      {/* authentication + base layout routes */}
      <Route>
        {authenticationRoutePaths.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>

      {/* protected + app layout routes */}
      <Route>
        {protectedRoutePaths.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes