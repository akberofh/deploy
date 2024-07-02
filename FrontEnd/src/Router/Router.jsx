import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import Dashboard from '../Pages/Dashboard/Dashboard'
import AddNewTodo from '../Pages/AddTodo/AddNewTodo'
import Profile from '../Pages/Profile/Profile'
import PrivateRoute from './PrivateRoute'
import Register from '../Pages/Register/Register'
import AboutCard from '../Pages/About/AboutCard'
import ContactUsCompliment from './ContactUs/ContactUsCompliment'
import BmwCatagory from '../Catagory/BmwCatagory'
import ChevroletCatagory from '../Catagory/ChevroletCatagory'
import LadaCatagory from '../Catagory/LadaCatagory'
import NissanCatagory from '../Catagory/NissanCatagory'
import ToyotaCatagory from '../Catagory/ToyotaCatagory'
import MercedesCatagory from '../Catagory/MercedesCatagory'

import Detalbmw from '../Catagory/Detailpage/Detalbmw'
import ChatCard from '../ChatBot/ChatCard'

const Router = () => {
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detalbmw" element={<Detalbmw />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/addtodo" element={<AddNewTodo />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="" element={<PrivateRoute/>}  />
          <Route path="/chat" element={<ChatCard/>}  />
          <Route path="/about" element={<AboutCard/>} /> 
          <Route path='/contact' element={<ContactUsCompliment/>} />
          <Route path='/bmw' element={<BmwCatagory/>} />
          <Route path='/chevrolet' element={<ChevroletCatagory/>} />
          <Route path='/lada' element={<LadaCatagory/>} />
          <Route path='/nissan' element={<NissanCatagory/>} />
          <Route path='/toyota' element={<ToyotaCatagory/>} />
          <Route path='/mercedes' element={<MercedesCatagory/>} />
  </Routes>
  </BrowserRouter>
  )
}

export default Router