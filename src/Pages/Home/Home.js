import { Link } from "react-router-dom";
import Axios from "./../../Axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare , faTrashCan , faEye} from '@fortawesome/free-solid-svg-icons'

import Btn from "../../SharedUi/Btn/Btn";
import "./Home.css";
import Nav from "../../Components/Nav/Nav";

const Home = () => {
    const [Todos, setTodos] = useState(null);

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = async () => {
        const response = await Axios.get("/todos");
        try {
            setTodos(response.data);
        }catch (error) {
            console.log(error);
        }
    }

    // Delete Todo
    const deleteTodo = async (id) => {
        try {
            await Axios.delete(`/todos/${id}`);
            getTodos();
        }catch (error) {
            console.log(error);
        }
    }
    return Todos? (
        <>
            <Nav/>
            <section className="vh-100 gradient-custom-2 bgImg">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center ">
                        {/*Create New Component Button*/}
                        <div className="col-md-12 col-xl-10 ">
                            <div className="card mask-custom bg-dark ">
                                <Link to={"/todos/create"}>
                                    <Btn btn={"Create New Task"} text={"warning"} />
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-12 col-xl-10 my-4">

                            <div className="card mask-custom bg-dark ">
                                <div className="card-body p-4 ">
                                    <div className="text-center pt-3 pb-2 text-warning">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                                            alt="Check" width="60" />
                                            <h2 className="my-4">To Do List</h2>
                                    </div>

                                    <table className="table mb-0 text-warning">
                                        <thead>
                                        <tr>
                                            <th scope="col">Task</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {Todos.map((todo) => (
                                            <tr key={todo.id}>
                                                <td>{todo.title}</td>
                                                <td>
                                                    <span className={"mx-2"}>
                                                        <Link to={`/todos/${todo.id}`}>
                                                            <FontAwesomeIcon icon={faEye} className="text-warning" />
                                                        </Link>
                                                    </span>
                                                    |
                                                    <span className={"mx-2"}>
                                                        <Link to={`/todos/${todo.id}/edit`}>
                                                            <FontAwesomeIcon icon={faPenToSquare} className="text-warning" />
                                                        </Link>
                                                    </span>
                                                    |
                                                    <span className={"mx-2"}>
                                                        <FontAwesomeIcon icon={faTrashCan} className="text-warning" onClick={() => deleteTodo (todo.id)}
                                                        style={{cursor: "pointer"}}
                                                        />
                                                    </span>


                                                </td>
                                            </tr>
                                        ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
): (
        <p>loading</p>
    );
};

export default Home;