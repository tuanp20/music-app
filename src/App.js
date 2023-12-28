import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom/dist";
import { Home, Login } from "./components";
import { getAuth } from "firebase/auth";
import { app } from "./config/firebase.config";

const App = () => {
    const fireBaseAuth = getAuth(app);

    const navigate = useNavigate();

    const [auth, setAuth] = useState(
        false || window.localStorage.getItem("auth") === "true"
    );

    useEffect(() => {
        fireBaseAuth.onAuthStateChanged((userCred) => {
            if (userCred) {
                userCred.getIdToken().then((token) => {
                    console.log("token", token);
                });
            } else {
                setAuth(false);
                window.localStorage.setItem("auth", "false");
                navigate("/login");
            }
        });
    }, []);

    return (
        <div className="w-screen h-screen bg-primary flex justify-center items-center">
            <Routes>
                <Route path="/login" element={<Login setAuth={setAuth} />} />
                <Route path="/*" element={<Home />} />
            </Routes>
        </div>
    );
};

export default App;
