import { Route, Routes } from "react-router";
import Landing from "./components/Landing";
import Private from "./components/Private";
import Company from "./components/Company";
import Home from "./components/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Landing/>}/>
          <Route path="/private" element={<Private />} />
          <Route path="/company" element={<Company />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
