import React from 'react'
import { NavLink, Routes, BrowserRouter, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Create } from './pages/Create';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import Auth from "../Utils/auth"
import { OUser } from './pages/OUser';
import { AsyncSearchBar } from './extraComponents/AsyncSearchBar';





export const Navbar = () => {
  return (
    <>
      <BrowserRouter>
        <navbar className='navbar'>
          <h1>Jitzmate</h1>
          <ul className='navList'>

            {
              Auth.loggedIn() ?
                (
                  <>
                    <AsyncSearchBar />
                    <li>
                      <NavLink className={({ isActive }) => isActive ? "active" : "unactive"} to="/home"><i class="fa-solid fa-house"></i></NavLink>
                    </li>
                    <li>
                      <NavLink className={({ isActive }) => isActive ? "active" : "unactive"} to="/create"><i class="fa-solid fa-plus"></i></NavLink>
                    </li>
                    <li>
                      <NavLink className={({ isActive }) => isActive ? "active" : "unactive"} to="/notifications"><i class="fa-solid fa-bell"></i></NavLink>
                    </li>
                    <li>
                      <NavLink className={({ isActive }) => isActive ? "active" : "unactive"} to="/profile"><i class="fa-solid fa-user"></i></NavLink>
                    </li>
                  </>
                )
                :
                (
                  <>
                    <li>
                      <NavLink className={({ isActive }) => isActive ? "active" : "unactive"} to="/login"><i class="fa-solid fa-right-to-bracket"></i></NavLink>
                    </li>
                  </>
                )
            }

          </ul>
        </navbar>

        <Routes>
          {Auth.loggedIn() ?
            (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/*" element={<Home />} />
                <Route path="/ouser" element={<OUser />} />
              </>
            )
            :
            (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={<Login />} />
              </>
            )}


        </Routes>
      </BrowserRouter>
    </>
  )
}


// {Auth.loggedIn() ?
//   (
//     <>

//     </>
//   )
//   :
//   (
//     <>

//     </>
//   )}