import { Outlet, useNavigate } from "react-router-dom"
import { AuthLogout } from "../apiCalls/authentication";
import { useState } from "react";
import { Loading } from "../components";
import Swal from "sweetalert2";



const AdminLayout = () => {

    const [loading_visible, set_loading_visible] = useState(false);

    const navigate = useNavigate();

    const logout = async () => {

        set_loading_visible(true);

        const logout_response = await AuthLogout();

        Swal.fire({
            ...logout_response,
            icon: logout_response.status,
        });

        set_loading_visible(false);

        navigate('/');

    }

  return (
    <div>
        <Outlet />

        <Loading show={loading_visible}/>

        <div className="fixed bottom-3 right-3">
            <button onClick={logout} className="p-2 bg-red-500 text-white shadow-xl rounded-xl">Log Out</button>
        </div>
    </div>
  )
}

export default AdminLayout