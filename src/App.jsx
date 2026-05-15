import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecordList from "../pages/RecordList";
import MainLayout from "../layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<RecordList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
