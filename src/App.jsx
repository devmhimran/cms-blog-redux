import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import Contact from './Pages/Contact/Contact'
import ErrorPage from './Pages/ErrorPage/ErrorPage'
import NavMenu from './Component/NavMenu/NavMenu'
import Dashboard from './Pages/Dashboard/Dashboard'
import AllBlog from './Pages/AllBlog/AllBlog'
import AddBlog from './Pages/AddBlog/AddBlog'
import AddCategory from './Pages/AddCategory/AddCategory'
import UpdateCategory from './Pages/UpdateCategory/UpdateCategory'
import { ToastContainer } from 'react-toastify'
import Loading from './Component/Loading/Loading'
import SignIn from './Pages/SignIn/SignIn'
import SignUp from './Pages/SignUp/SignUp'
import Footer from './Component/Footer/Footer'
import RequiredAuth from './Component/RequiredAuth/RequiredAuth'
import YourBlog from './Pages/YourBlog/YourBlog'
import UpdateBlog from './Pages/UpdateBlog/UpdateBlog'
import SingleBlog from './Pages/SingleBlog/SingleBlog'
import Favorite from './Pages/Favorite/Favorite'
import AllUsers from './Pages/AllUsers/AllUsers'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from './Pages/firebase.init'
import { useDispatch } from 'react-redux'
import { signOut } from 'firebase/auth'
import { emptyFavorite } from './Redux/actionCreators/actionCreators'
import RequireAdmin from './Component/RequireAdmin/RequireAdmin'
import ProtectRedirect from './Component/ProtectRedirect/ProtectRedirect'

function App() {

  return (
    <div className="App">
      <div className="posthub__main">
        <NavMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={
            <RequiredAuth>
              <SingleBlog />
            </RequiredAuth>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/sign-in" element={
            <SignIn />
          } />
          <Route path="/sign-up" element={
            <SignUp />
          } />
          <Route path="/favorite" element={
            <RequiredAuth>
              <Favorite />
            </RequiredAuth>
          } />
          <Route path="/forgot-password" element={<SignUp />} />
          <Route path="dashboard" element={
            <RequiredAuth>
              <Dashboard />
            </RequiredAuth>
          } >
            <Route index element={<YourBlog />} />
            <Route path='all-blog' index element={<RequireAdmin><AllBlog /></RequireAdmin>} />
            <Route path='add-blog' element={<AddBlog />} />
            <Route path='all-users' element={<RequireAdmin><AllUsers /></RequireAdmin>} />
            <Route path='add-category' element={<RequireAdmin><AddCategory /></RequireAdmin>} />
            <Route path='update-category/:id' element={<UpdateCategory />} />
            <Route path='update-blog/:id' element={<UpdateBlog />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Footer />
      </div>
    </div>
  )
}

export default App
