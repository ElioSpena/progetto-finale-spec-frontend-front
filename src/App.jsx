import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecordList from "../pages/RecordList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecordList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
