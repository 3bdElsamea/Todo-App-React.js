import { useEffect, useState } from "react";
import Axios from "./../../Axios";
import Btn from "../../SharedUi/Btn/Btn";
import Input from "../../SharedUi/Input/Input";
import { useNavigate } from 'react-router-dom'
import Nav from "../../Components/Nav/Nav";

const Create = () => {
    const navigate = useNavigate();
    const [TaskTitle, setTaskTitle] = useState("");
    const [TitleError, setTitleError] = useState("");

    const [LastTaskId, setLastTaskId] = useState(0);
    useEffect(() => {
        getLastTaskId();
    }, []);
    const getLastTaskId = async () => {
        const response = await Axios.get("/todos");
        try {
            setLastTaskId(response.data[response.data.length - 1].id);
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
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (TitleError.length > 1 || TaskTitle.length < 1) {
            return;
        }
        try {
            const newTodo ={
                id:LastTaskId+1,
                title: TaskTitle,
                created_at:new Date().toLocaleDateString(),
                updated_at:new Date().toLocaleDateString(),
            }
            await Axios.post("/todos", newTodo);
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
                        <label htmlFor="createInput" className="form-label mt-5"><h1>New Task</h1></label>
                        <Input type={"text"} placeholder={"Enter Task Title"} id={"createInput"}
                        handleChange={inputChange} value={TaskTitle} />
                        {TitleError.length>1 && <p className={"text-danger"}>{TitleError}</p>}
                        <Btn btn={"Add Task"} type={"primary"} ></Btn>
                </form>
            </div>
        </div>
    </>)
}
export default Create;