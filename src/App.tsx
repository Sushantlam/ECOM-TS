import React, { useContext, useEffect } from 'react'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import { AuthContext } from './context/Auth';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Thankyou from './Pages/Thankyou';
import { DarkContext } from './context/ThemeContext';

const App = () => {
  
  const { themeState, dispatch } = useContext(DarkContext);

  // function logOut() {
  //   localStorage.clear();
  //   router("login");
  // }
  return (
  <>
      
{/*    
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="cart">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Cart/>
                  </ProtectedRoute>
                }
              />
             
        </Routes>
      </BrowserRouter> */}

      <div id={themeState.theme}>
        <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
               
                  <Home />
               
              }
            />
            </Route>

            <Route path="cart">
              <Route
                index
                element={
                
                    <Cart/>
                 
                }
              />
              </Route>

              <Route path="thankyou">
              <Route
                index
                element={
               
                    <Thankyou/>
                 
                }
              />
              </Route>
            </Routes>
        </BrowserRouter>
      </div>
    </>
    
    
  )
}

export default App