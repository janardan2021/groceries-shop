import React from 'react';
import './index.css';

import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { UsersContextProvider } from './contexts/usersContext.js';
import { CartContextProvider } from './contexts/cartContext.js';
import App from './App';
import Homepage from './pages/Homepage';
import ProductPage from './pages/ProductPage.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import ShoppingCartPage from './pages/ShoppingCartPage.js'
import ShippingAddressPage from './pages/ShippingAddressPage.js';
import PlaceOrderPage from './pages/PlaceOrderPage.js';
import PrivateRoutes from './components/PrivateRoutes.js';
import OrderPage from './pages/OrderPage.js';
import Profile from './pages/Profile.js';
import ProfileInfo from './pages/ProfileInfo.js';
import ProfileOrders from './pages/ProfileOrders.js';

import AdminRoutes from './components/AdminRoutes.js';
import OrderListPage from './pages/admin/OrderListPage.js'
import ProductListPage from './pages/admin/ProductListPage.js';
import ProductEditPage from './pages/admin/ProductEditPage.js'
import UserListPage from './pages/admin/UserListPage.js';
import UserEditPage from './pages/admin/UserEditPage.js';

const queryClient = new QueryClient()


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
       <Route index={true} path='/' element={<Homepage/>}/> 
       <Route path='/products/:category' element={<Homepage/>}/>
       <Route path='/product/:id' element={<ProductPage/>}/>
       <Route path='/register' element={<Register/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/cart' element={<ShoppingCartPage />}/>
       
       <Route path='' element={<PrivateRoutes />}>
            <Route path='/shipping' element={<ShippingAddressPage />}/>
            <Route path='/placeorder' element={<PlaceOrderPage />} />
            <Route path='/order/:id' element={<OrderPage/>}/>
            <Route path='/profile' element={<Profile />} > 
               <Route index  element={<ProfileInfo />} />
               <Route path='orders' element={<ProfileOrders />} />
            </Route>
       </Route>
       <Route path='' element={<AdminRoutes />}>
             <Route path='/admin/orderlist' element={<OrderListPage/>}/>
             <Route path='/admin/productlist' element={<ProductListPage/>}/>
             <Route path='/admin/product/:id/edit' element={<ProductEditPage/>}/>
             <Route path='/admin/userlist' element={<UserListPage/>}/>
             <Route path='/admin/user/:id/edit' element={<UserEditPage/>}/>
        </Route> 
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 
    <UsersContextProvider>
     <CartContextProvider>
     <QueryClientProvider client={queryClient}> 
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools initialIsOpen={false} position='top-right'/> */}
      </QueryClientProvider>
     </CartContextProvider>
    </UsersContextProvider> 
   </React.StrictMode>
);

