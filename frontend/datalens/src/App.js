import Home from "./pages/home";
import About from "./pages/about";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/about" exact Component={About} />
      </Routes>
    </BrowserRouter>
  );
}
