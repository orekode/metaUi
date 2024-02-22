import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"

import { General, Admin } from "./pages";
import Root from "./layouts/Root";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Root />}>
        <Route index element={<General.Home />} />

        <Route path='/admin' element={<Admin.Home />} />
      </Route>
  ));

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
