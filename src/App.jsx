import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "../context/GlobalContext";
import RecordList from "../pages/RecordList";
import MainLayout from "../layouts/MainLayout";
import DetailsPage from "../pages/DetailsPage";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<RecordList />} />
            <Route path="/details/:id" element={<DetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
