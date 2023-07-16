import { lazy, Suspense, useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loader from "./components/Loader";

const List = lazy(() => import("./pages/users/List"));

function App() {
  const [loader, setLoader] = useState(true);

  return (
    <div className="min-h-screen bg-slate-600">
      <Suspense>
        <List setLoader={setLoader} />
      </Suspense>

      {loader && <Loader />}

      <ToastContainer />
    </div>
  );
}

export default App;
