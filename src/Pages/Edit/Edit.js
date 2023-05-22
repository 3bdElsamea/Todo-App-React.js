import { useEffect, useState } from "react";
import Axios from "./../../Axios";
import Btn from "../../SharedUi/Btn/Btn";
import Input from "../../SharedUi/Input/Input";
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
import Nav from "../../Components/Nav/Nav";

const Edit = () => {
    const navigate = useNavigate();
    const idToEdit = useParams().editId;
    const [TaskTitle, setTaskTitle] = useState("");
    const [oldTodo, setOldTodo] = useState({});
    const [TitleError, setTitleError] = useState("");
    console.log(idToEdit);

    useEffect(() => {
        getTodoToEdit();
    }, []);
    const getTodoToEdit = async () => {
        const response = await Axios.get(`/todos/${idToEdit}`);
        try {
            setOldTodo(response.data);
            setTaskTitle(response.data.title);
        }catch (error) {
            console.log(error);
        }
    }
    const inputChange = (e) => {
        setTaskTitle(e.target.value);
        if (e.target.value.length < 10 ) {
            setTitleError("Title must be at least 10 characters long");
        }else if (e.target.value.length > 250 ) {
            setTaskTitle(e.target.value.slice(0,250));
            setTitleError("Title must be at least 50 characters long");
        }else {
            setTitleError("");
        }
        console.log(oldTodo);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (TitleError.length > 1 || TaskTitle.length < 1) {
            return;
        }
        try {
            console.log(oldTodo);

            const newTodo ={
                id:oldTodo.id,
                title: TaskTitle,
                updated_at:new Date().toLocaleDateString(),
            }
            await Axios.patch(`/todos/${idToEdit}`, newTodo);
            setTaskTitle("");
            setTitleError("");
            navigate("/");

        }catch (error) {
            console.log(error);
        }
    }

    return(<>
        <Nav/>
        <div className={"bgImg vh-100"}>
            <div className={"p-5 mt-5 col-8 mx-auto"}>
                <form className="row g-3 col-6 mx-auto mt-5" onSubmit={handleSubmit}>
                    <label htmlFor="createInput" className="form-label mt-5"><h1>Edit Task</h1></label>
                    <Input type={"text"} placeholder={"Enter Task Title"} id={"createInput"}
                           handleChange={inputChange} value={
                        TaskTitle
                    } />
                    {TitleError.length>1 && <p className={"text-danger"}>{TitleError}</p>}
                    {/*Add The Creation Date of this task*/}
                    <p className={"form-control"}>Created At :
                        {oldTodo.created_at}
                    </p>
                    <Btn btn={"Update Task"} type={"success"} ></Btn>
                </form>
            </div>
        </div>
    </>)

}

export default Edit;