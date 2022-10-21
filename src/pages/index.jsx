import React from 'react';
import SignUp from "../components/SignUp";
import {Route, Routes} from "react-router-dom";

const SuccessPage = () => <>Success authorization</>
const pages = [
    {
        key:1,
        path:"/",
        element:<SignUp/>
    },
    {
        key: 2,
        path:"/success",
        element: <SuccessPage/>
    }
]
const Pages = () => {
    return (
        <Routes>
            {pages.map(el =>
                <Route key={el.key} {...el} />
            )}
        </Routes>
    );
};

export default Pages;