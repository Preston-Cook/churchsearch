import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

// Layout
import AppLayout from './layout/AppLayout';

// Pages
import Home from './pages/Home';
import Church from './pages/Church';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import Login from './pages/LogIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import ErrorElement from './components/ErrorElement';
import AddChurch from './pages/AddChurch';
import searchLoader from './loaders/searchLoader';
import homeLoader from './loaders/homeLoader';
import churchLoader from './loaders/churchLoader';
import Manage from './pages/Manage';
import CreateChurch from './pages/CreateChurch';
import ManageChurch from './pages/ManageChurch';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route
        path="/"
        loader={homeLoader}
        index
        element={<Home />}
        errorElement={<ErrorElement />}
      />
      <Route
        path="/search"
        loader={searchLoader}
        element={<Search />}
        errorElement={<ErrorElement />}
      />
      <Route
        path="/add-church"
        element={<AddChurch />}
        errorElement={<ErrorElement />}
      />
      <Route
        path="/church/:id"
        loader={churchLoader}
        element={<Church />}
        errorElement={<ErrorElement />}
      />
      <Route
        path="/log-in"
        element={<Login />}
        errorElement={<ErrorElement />}
      />
      <Route
        path="/sign-up"
        element={<SignUp />}
        errorElement={<ErrorElement />}
      />
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
        errorElement={<ErrorElement />}
      />
      <Route
        path="/reset-password/:id"
        element={<ResetPassword />}
        errorElement={<ErrorElement />}
      />
      <Route
        path="/contact"
        element={<Contact />}
        errorElement={<ErrorElement />}
      />
      <Route
        path="/feedback"
        element={<Feedback />}
        errorElement={<ErrorElement />}
      />
      <Route
        path="/manage"
        element={
          <ProtectedRoute>
            <Manage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage/create"
        element={
          <ProtectedRoute>
            <CreateChurch />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage/:id"
        element={
          <ProtectedRoute>
            <ManageChurch />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
