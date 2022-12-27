import { useState } from 'react'
import reactLogo from './assets/react.svg'
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


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <NavMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="dashboard" element={<Dashboard />} >
          <Route index element={<AllBlog/>} />
          <Route path='add-blog' index element={<AddBlog/>} />
          <Route path='add-category' element={<AddCategory/>} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default App
