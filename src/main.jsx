import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import PrivateRoute from "./router/PrivateRoute";
import ProtectedRoute from "./router/ProtectedRoute";

let persistor = persistStore(store);

const App = lazy(() => import("./App"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));

const Module = lazy(() => import("./pages/setupAplikasi/setupModule/Module"));
const NewModule = lazy(() =>
  import("./pages/setupAplikasi/setupModule/NewModule")
);
const EditModule = lazy(() =>
  import("./pages/setupAplikasi/setupModule/EditModule")
);

const IndexMenu = lazy(() =>
  import("./pages/setupAplikasi/setupMenu/IndexMenu")
);
const NewMenu = lazy(() => import("./pages/setupAplikasi/setupMenu/NewMenu"));
const EditMenu = lazy(() => import("./pages/setupAplikasi/setupMenu/EditMenu"));

const Role = lazy(() => import("./pages/setupAplikasi/setupRole/Role"));
const NewRole = lazy(() => import("./pages/setupAplikasi/setupRole/NewRole"));
const EditRole = lazy(() => import("./pages/setupAplikasi/setupRole/EditRole"));

const RoleMenu = lazy(() =>
  import("./pages/setupAplikasi/setupRoleMenu/RoleMenu")
);
const NewRoleMenu = lazy(() =>
  import("./pages/setupAplikasi/setupRoleMenu/NewRoleMenu")
);

const Branch = lazy(() => import("./pages/network/setupBranch/Branch"));
const NewBranch = lazy(() => import("./pages/network/setupBranch/NewBranch"));
const EditBranch = lazy(() => import("./pages/network/setupBranch/EditBranch"));

const Outlet = lazy(() => import("./pages/network/setupOutlet/Outlet"));
const NewOutlet = lazy(() => import("./pages/network/setupOutlet/NewOutlet"));
const EditOutlet = lazy(() => import("./pages/network/setupOutlet/EditOutlet"));

const Job = lazy(() => import("./pages/personalia/setupJob/Job"));
const NewJob = lazy(() => import("./pages/personalia/setupJob/NewJob"));
const EditJob = lazy(() => import("./pages/personalia/setupJob/EditJob"));

const Position = lazy(() =>
  import("./pages/personalia/setupPosition/Position")
);
const NewPosition = lazy(() =>
  import("./pages/personalia/setupPosition/NewPosition")
);
const EditPosition = lazy(() =>
  import("./pages/personalia/setupPosition/EditPosition")
);

const Department = lazy(() =>
  import("./pages/personalia/setupDepartment/Department")
);
const NewDepartment = lazy(() =>
  import("./pages/personalia/setupDepartment/NewDepartment")
);
const EditDepartment = lazy(() =>
  import("./pages/personalia/setupDepartment/EditDepartment")
);

const Employee = lazy(() =>
  import("./pages/personalia/setupEmployee/Employee")
);
const NewEmployee = lazy(() =>
  import("./pages/personalia/setupEmployee/NewEmployee")
);
const EditEmployee = lazy(() =>
  import("./pages/personalia/setupEmployee/EditEmployee")
);

const User = lazy(() => import("./pages/setupAplikasi/setupUser/User"));
const NewUser = lazy(() => import("./pages/setupAplikasi/setupUser/NewUser"));
const EditUser = lazy(() => import("./pages/setupAplikasi/setupUser/EditUser"));

const Upload = lazy(() => import("./pages/pelamar/Upload"));
const Application = lazy(() => import("./pages/pelamar/Application"));
const ReSendWa = lazy(() => import("./pages/pelamar/ReSendWa"));

const Question = lazy(() => import("./pages/form/question/Question"));
const NewQuestion = lazy(() => import("./pages/form/question/NewQuestion"));
const EditQuestion = lazy(() => import("./pages/form/question/EditQuestion"));

const AssesmentSales = lazy(() =>
  import("./pages/form/assesment_sales/AssesmentSales")
);
const NewAssesmentSales = lazy(() =>
  import("./pages/form/assesment_sales/NewAssesmentSales")
);
const EditAssesmentSales = lazy(() =>
  import("./pages/form/assesment_sales/EditAssesmentSales")
);

const FiveC = lazy(() => import("./pages/form/five_c/FiveC"));
const NewFiveC = lazy(() => import("./pages/form/five_c/NewFiveC"));
const EditFiveC = lazy(() => import("./pages/form/five_c/EditFiveC"));

const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/setup-aplikasi/setup-module",
            element: <Module />,
          },
          {
            path: "/setup-aplikasi/setup-module/new",
            element: <NewModule />,
          },
          {
            path: "/setup-aplikasi/setup-module/:id/edit",
            element: <EditModule />,
          },
          {
            path: "/setup-aplikasi/setup-menu",
            element: <IndexMenu />,
          },
          {
            path: "/setup-aplikasi/setup-menu/new",
            element: <NewMenu />,
          },
          {
            path: "/setup-aplikasi/setup-menu/:id/edit",
            element: <EditMenu />,
          },
          {
            path: "/setup-aplikasi/setup-role",
            element: <Role />,
          },
          {
            path: "/setup-aplikasi/setup-role/new",
            element: <NewRole />,
          },
          {
            path: "/setup-aplikasi/setup-role/:id/edit",
            element: <EditRole />,
          },
          {
            path: "/setup-aplikasi/setup-role-menu",
            element: <RoleMenu />,
          },
          {
            path: "/setup-aplikasi/setup-role-menu/new",
            element: <NewRoleMenu />,
          },
          {
            path: "/network/setup-branch",
            element: <Branch />,
          },
          {
            path: "/network/setup-branch/new",
            element: <NewBranch />,
          },
          {
            path: "/network/setup-branch/:id/edit",
            element: <EditBranch />,
          },
          {
            path: "/network/setup-outlet",
            element: <Outlet />,
          },
          {
            path: "/network/setup-outlet/new",
            element: <NewOutlet />,
          },
          {
            path: "/network/setup-outlet/:id/edit",
            element: <EditOutlet />,
          },
          {
            path: "/personalia/setup-jabatan",
            element: <Job />,
          },
          {
            path: "/personalia/setup-jabatan/new",
            element: <NewJob />,
          },
          {
            path: "/personalia/setup-jabatan/:id/edit",
            element: <EditJob />,
          },
          {
            path: "/personalia/setup-position",
            element: <Position />,
          },
          {
            path: "/personalia/setup-position/new",
            element: <NewPosition />,
          },
          {
            path: "/personalia/setup-position/:id/edit",
            element: <EditPosition />,
          },
          {
            path: "/personalia/setup-department",
            element: <Department />,
          },
          {
            path: "/personalia/setup-department/new",
            element: <NewDepartment />,
          },
          {
            path: "/personalia/setup-department/:id/edit",
            element: <EditDepartment />,
          },
          {
            path: "/personalia/setup-employee",
            element: <Employee />,
          },
          {
            path: "/personalia/setup-employee/new",
            element: <NewEmployee />,
          },
          {
            path: "/personalia/setup-employee/:id/edit",
            element: <EditEmployee />,
          },
          {
            path: "/setup-aplikasi/setup-user",
            element: <User />,
          },
          {
            path: "/setup-aplikasi/setup-user/new",
            element: <NewUser />,
          },
          {
            path: "/setup-aplikasi/setup-user/:id/edit",
            element: <EditUser />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/pelamar/import",
            element: <Upload />,
          },
          {
            path: "/pelamar/application",
            element: <Application />,
          },
          {
            path: "/pelamar/resend",
            element: <ReSendWa />,
          },
          {
            path: "/form/question",
            element: <Question />,
          },
          {
            path: "/form/question/new",
            element: <NewQuestion />,
          },
          {
            path: "/form/question/:id/edit",
            element: <EditQuestion />,
          },
          {
            path: "/form/assesment-sales",
            element: <AssesmentSales />,
          },
          {
            path: "/form/assesment-sales/new",
            element: <NewAssesmentSales />,
          },
          {
            path: "/form/assesment-sales/:id/edit",
            element: <EditAssesmentSales />,
          },
          {
            path: "/form/5c",
            element: <FiveC />,
          },
          {
            path: "/form/5c/new",
            element: <NewFiveC />,
          },
          {
            path: "/form/5c/:id/edit",
            element: <EditFiveC />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense
          fallback={
            <Center h="100vh">
              <Spinner size="xl" />
            </Center>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </PersistGate>
    </Provider>
  </ChakraProvider>
);
