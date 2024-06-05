// import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import { Footer } from 'flowbite-react';

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>

        {/* <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/search' element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/create-shop' element={<CreateShop />} />
          
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>

        <Route path='/projects' element={<Projects />} />
        <Route path='/post/:postSlug' element={<PostPage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/shop/:productId' element={<ShopSingle />} /> */}
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/' element={<Home />} />
        <Route element={<PrivateRoute />}>
        <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
