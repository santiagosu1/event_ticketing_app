import {Route,Routes} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import MainLayout from './Layouts/MainLayout';
import NoContent from './Pages/NoContent';
import CheckOut from './Pages/CheckOut';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/checkout/:id" element={<CheckOut />} />
      </Route>
      <Route path="*" element={<NoContent />} />
    </Routes>
  );
}