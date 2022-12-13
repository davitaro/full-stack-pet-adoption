import "./App.css";
import NavBar from "../src/Front_End/Components/Menu/NavBar";
import { useToast } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import routes from "../src/Front_End/Constants/routes";
import useAuth from "../src/Front_End/hooks/useAuth";
import AuthContext from "../src/Front_End/contexts/authContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useMemo } from "react";

const queryClient = new QueryClient();

function App() {
  const toast = useToast();

  queryClient.setDefaultOptions({
    mutations: {
      onError: (error) => {
        if (
          ["FormError", "AccessError", "AuthError", "ValidationError"].includes(error.response?.data?.errorType)
        ) {
          toast({
            title: error.response?.data?.errorType,
            position: "top",
            description: error.response.data.error,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      },
    },
    queries: {
      onError: (error) => {
        if (
          ["FormError", "AccessError", "AuthError", "ValidationError"].includes(error.response?.data?.errorType)
        ) {
          toast({
            title: error.response?.data?.errorType,
            position: "top",
            description: error.response.data.error,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <InnerApp />
    </QueryClientProvider>
  );
}

const InnerApp = () => {
  const auth = useAuth(); // { ..., isLoggedIn}
  const { isLoggedIn } = auth;

  const filterFunc = useMemo(() => {
    const isAdmin = isLoggedIn?.accessLevel === "admin";
    if (isAdmin) return (route) => route.protected || route.admin;
    if (isLoggedIn) return (route) => route.protected && !route.admin;
    return (route) => !route.protected;
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={auth}>
      {/* <PetsContext.Provider> */}
      <Router>
        <NavBar mt="0" />
        <Routes>
          {routes.filter(filterFunc).map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      {/* </PetsContext.Provider> */}
    </AuthContext.Provider>
  );
};

export default App;
