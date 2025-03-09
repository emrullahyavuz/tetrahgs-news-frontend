import { RouterProvider } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import router from "./routes/routes"
import "./App.css";



const App = () => {
  return (
    <div className="App">
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;