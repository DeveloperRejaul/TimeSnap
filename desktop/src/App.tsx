import Header from "./core/components/Header";
import { Outlet } from "react-router";
import AppProvider from "./core/context/AppProvider";
import { Provider } from "react-redux";
import { store } from "./core/rtk/store";
import Toast from "./core/components/Toast";

export default function App() {
  return (
    <AppProvider>
      <Provider store={store}>
        <main class="bg-background h-[100vh] w-[100vw] flex flex-col flex-1 overflow-hidden rounded-md shadow-2xl ">
          <Header/>
          <Outlet/>
        </main>
        <Toast/>
      </Provider>
    </AppProvider>
  );
}
