import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import 'swiper/css';

// bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


// fonts and icons
import '././assets/css/icofont.min.css';
import '././assets/css/animate.css';
import '././assets/css/style.min.css';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './home/Home.jsx';
import Blog from './blog/Blog.jsx';
import Shop from './ShopPage/Shop.jsx';
import SingleProduct from './ShopPage/SingleProduct.jsx';
import Page404 from './component/Page404.jsx';
import CartPage from './ShopPage/CartPage.jsx';
import LikedProducts from './component/LikedProduct.jsx';
import LikedProductsPage from './component/LikedProductPage.jsx';
import SingleBlog from './blog/SingleBlog.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/blog",
        element: <Blog />
      },
      {
        path: "/blog/:id",
        element: <SingleBlog/>
      },
      {
         path:"/shop",
         element:  <Shop/>
      },
      {
        path:"shop/:id",
        element:<SingleProduct/>
      },
      {
        path:"/about",
        element:<Page404/>
      },
      {
        path:"/cart-page",
        element:<CartPage/>
      },
      {
        path:"/liked-products",
        element:<LikedProductsPage/>
      },
      {
        path:"/*",
        element:<Page404/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>

)
