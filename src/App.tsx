import React, { useContext } from 'react'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import { AuthContext } from './context/Auth';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Thankyou from './Pages/Thankyou';

const App = () => {
  
  const ProtectedRoute = ({ children }:{children:React.ReactNode}) => {
    const { state } = useContext(AuthContext);

    if (state.user.length === 0) {
      return <Navigate to="/login" />;
    }

    return  <>{children}</>;
  };
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

      <div>
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
            </Route>

            <Route path="cart">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Cart/>
                  </ProtectedRoute>
                }
              />
              </Route>

              <Route path="thankyou">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Thankyou/>
                  </ProtectedRoute>
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