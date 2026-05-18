import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "../context/GlobalContext";
import RecordList from "../pages/RecordList";
import MainLayout from "../layouts/MainLayout";
import DetailsPage from "../pages/DetailsPage";
import ComparePage from "../pages/ComparePage";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<RecordList />} />
            <Route path="/details/:id" element={<DetailsPage />} />
            <Route path="/compare" element={<ComparePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
