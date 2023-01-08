import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import Contact from './Pages/Contact/Contact'
import ErrorPage from './Pages/ErrorPage/ErrorPage'
import NavMenu from './Component/NavMenu/NavMenu'
import Dashboard from './Pages/Dashboard/Dashboard'
import AllBlog from './Pages/AllBlog/AllBlog'
import AddBlog from './Pages/AddBlog/AddBlog'
import AddCategory from './Pages/AddCategory/AddCategory'
import { Provider } from 'react-redux'
import store from './Redux/Store'
import UpdateCategory from './Pages/UpdateCategory/UpdateCategory'
import { ToastContainer } from 'react-toastify'
import Loading from './Component/Loading/Loading'
import SignIn from './Pages/SignIn/SignIn'
import SignUp from './Pages/SignUp/SignUp'
import Footer from './Component/Footer/Footer'
import RequiredAuth from './Component/RequiredAuth/RequiredAuth'


function App() {
  const history = useLocation()
  console.log(history)

  return (
    <Provider store={store}>
      <div className="App">
        <div className="posthub__main">
          <NavMenu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<SignUp />} />
            <Route path="dashboard" element={
              <RequiredAuth>
                <Dashboard />
              </RequiredAuth>
            } >
              <Route index element={<AllBlog />} />
              <Route path='add-blog' index element={<AddBlog />} />
              <Route path='add-category' element={<AddCategory />} />
              <Route path='update-category/:id' element={<UpdateCategory />} />
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
    </Provider>
  )
}

export default App
