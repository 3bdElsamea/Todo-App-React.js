import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import View from "./Pages/View/View";
import Create from "./Pages/Create/Create";
import Edit from "./Pages/Edit/Edit";

const Routes = createBrowserRouter([
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/todos",
            element: <Home/>,
        },
        {
            path: "/todos/:todoId",
            element: <View/>,
        },
        {
            path: "/todos/create",
            element: <Create/>,
        },
        {
            path: "/todos/:editId/edit",
            element: <Edit/>,
        }
]
);

export default Routes;