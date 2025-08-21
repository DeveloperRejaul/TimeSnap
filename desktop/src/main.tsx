import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./core/routes/routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<RouterProvider router={router}/>);
