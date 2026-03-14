import { BrowserRouter, Route, Routes } from "react-router-dom"
import { authenticationRoutePaths, baseRoutePaths, protectedRoutePaths } from "./common/routes"
import AuthRoute from "./auth.route"
import AppLayout from "@/layout/app.layout"
import BaseLayout from "@/layout/base.layout"

const AppRoutes = () => {
  return (
  //  Wrapper Browser router
   <BrowserRouter>
    
    {/* Routes Wrapper */}
    <Routes>

      {/* no auth + base layout - routes */}
      <Route element={<BaseLayout />}>
        {baseRoutePaths.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>

      {/* authentication + base layout - routes */}
      <Route element={<AuthRoute />}>
        <Route element={<BaseLayout />}>
          {authenticationRoutePaths.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      </Route>

      {/* protected + app layout - routes */}
      <Route element={<AppLayout />}>
        {protectedRoutePaths.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>

      {/* Catch all undefined routes */}
      <Route path="*" element={"Not Found"} />
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes