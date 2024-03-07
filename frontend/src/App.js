import React from 'react'
import {Outlet} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { ToastContainer, Bounce } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/Header'
import Footer from './components/Footer';


const App = () => {
  return (
   <div>
   <Header />
   <ToastContainer 
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
   />

    <main className='py-3'>
    <Container >
      <Outlet />
    </Container>
   </main>

   <Footer />
   </div>
  )
}

export default App
