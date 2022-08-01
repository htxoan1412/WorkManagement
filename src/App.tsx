import "./App.css";
import { Route, Routes } from "react-router";
import Login from "./features/Login";
import Home from "./features";
import Task from "./features/Task/Task";
import Project from "./features/projects/components/project";

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="home" element={<Home />}>
        <Route path="tasks" element={<Task />} />
        <Route path="projects" element={<Project />} />
      </Route>
    </Routes>
  );
}

export default App;
