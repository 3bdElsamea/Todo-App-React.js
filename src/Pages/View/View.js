import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "./../../Axios";
import Nav from "../../Components/Nav/Nav";

const View = () => {
    const viewId = useParams().todoId;
    // console.log(viewId)
    const [Todo, setTodo] = useState(null);
    // Use Effect
    useEffect(() => {
        getTodo();
    }
    , []);

    const getTodo = async () => {
        // Log the viewId
        console.log(viewId);
        // Log the route
        console.log(`${Axios.defaults.baseURL}/todos/${viewId}}`);
        try {
            const response = await Axios.get(`/todos/${viewId}`);
            setTodo (response.data);
            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
    }
    // Format the date created_at

    // console.log(Todo.created_at);
    // const createdAt = new Date(Todo.created_at).toLocaleDateString();
    // updated at
    // const updatedAt = new Date(Todo?.updated_at).toLocaleDateString();
    return Todo ? (
        <>
            <Nav/>
            <div className={"bgImg vh-100 align-items-center  p-5 "}>
                <div className={"p-5 mt-5 col-8 mx-auto"}>
                    <div className="card text-center mt-5 ">
                        <h3 className="card-header text-bg-dark text-warning ">
                            Created At : {Todo.created_at? Todo.created_at : "Not Created"}
                        </h3>
                        <div className="card-body text-bg-light text-dark">
                            <h1 className="card-text">{Todo.title}</h1>
                        </div>
                        <h3 className="card-footer text-bg-dark text-warning ">
                            Updated At : {Todo.updated_at? Todo.updated_at : "Not Updated"}
                        </h3>
                    </div>
                </div>
            </div>

        </>
    ):(
        <p>loading</p>
    );

}

export default View;