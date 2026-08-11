
import {
    Navigate
} from "react-router-dom";

import {
    useSelector
} from "react-redux";


function AdminRoute({ children }) {

    const {
        user,
        token,
        initialized
    } = useSelector(
        state => state.auth
    );


    if (!token) {
        return <Navigate to="/login" />;
    }


    if (!initialized) {

        return (

            <div className="
                min-h-screen
                bg-gray-50
                flex
                items-center
                justify-center
                px-6
            ">

                <div className="
                    bg-white
                    rounded-2xl
                    shadow-lg
                    border
                    border-gray-100
                    px-10
                    py-10
                    text-center
                    w-full
                    max-w-sm
                ">

                    <div className="
                        w-14
                        h-14
                        mx-auto
                        mb-5
                        rounded-full
                        border-4
                        border-gray-200
                        border-t-blue-600
                        animate-spin
                    " />

                    <h2 className="
                        text-xl
                        font-bold
                        text-gray-800
                    ">
                        Loading Admin Panel
                    </h2>

                    <p className="
                        text-sm
                        text-gray-500
                        mt-2
                    ">
                        Verifying your account...
                    </p>

                </div>

            </div>

        );

    }


    if (!user) {
        return <Navigate to="/login" />;
    }


    if (user.role !== "Admin") {
        return <Navigate to="/" />;
    }


    return children;

}


export default AdminRoute;
