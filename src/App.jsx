import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"

import { General, Admin } from "./pages";
import Root from "./layouts/Root";

import { isAuthenticated } from "./apiCalls/authentication";
import AdminLayout from "./layouts/AdminLayout";
import GeneralLayout from "./layouts/GeneralLayout";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Root />}>

        <Route path="/"           element={<GeneralLayout          />}  >
          <Route index            element={<General.Home           />} />
          <Route path="about"     element={<General.About          />} />
          <Route path='programs'  element={<General.Programs       />} />
          <Route path='contact'   element={<General.Contact        />} />
          <Route path='gallery'   element={<General.Gallery        />} />
          <Route path='donate'    element={<General.Donate         />} />
          <Route path='donation'  element={<General.Donation       />} />
          <Route path='anonymous' element={<General.Anonymous      />} />
        </Route>

        <Route path="/admin" loader={isAuthenticated} element={<AdminLayout />}>
          <Route element={<GeneralLayout isEditable={true} />}>
            <Route index           element={<General.Home        isEditable={true} />} />
            <Route path='about'    element={<General.About       isEditable={true} />} />
            <Route path='programs' element={<General.Programs    isEditable={true} />} />
            <Route path='contact'  element={<General.Contact     isEditable={true} />} />
            <Route path='gallery'  element={<General.Gallery     isEditable={true} />} />
            <Route path='donation' element={<General.Donation    isEditable={true} />} />
          </Route>
        </Route>

        <Route path='/login' element={<General.Login /> } />


      </Route>
  ));

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
