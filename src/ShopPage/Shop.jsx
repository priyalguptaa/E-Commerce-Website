import React, { Suspense, lazy, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import PageHeader from "../component/PageHeader";
import Data from "../products.json";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import Search from "./Search";
import ShopCategory from "./ShopCategory";
import PopularPost from "./PopularPost";
import Tags from "./Tags";
import '../assets/css/LikedProductPage.css'
const showResult = "Showing 01 - 12 of 139 result";

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <FontAwesomeIcon className="icon-spinner" icon={faSpinner} spin />
  </div>
)
const Shop = () => {
  const [GridList, setGridList] = useState(true);
  const [Products, setProducts] = useState(Data);

  // isame ek promise create kiya he jab vo resolve hoga tab lazy loading chalegi
  const LazyProductCard = lazy(() => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(import("./ProductCard")), 2000)
    );
  });

  const LazyPagination = lazy(() => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(import("./Pagination")), 2000)
    );
  });

  // PAGINATION
  const [currPage, setCurrPage] = useState(1);
  const productPerPage = 12;
  const indexOfLastProduct = currPage * productPerPage;
  //                       = 1        * 12 = 12
  //                       = 2        * 12 = 24
  //                       = 3        * 12 = 36
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  //                        = 12                 - 12 = 0
  //                        = 24                 - 12 = 12
  const currentProducts = Products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // function to change the current page
  const paginate = (pageNumber) => {
    setCurrPage(pageNumber);
  };

  // filter products based on category
  const [selectedCategory, setSelectedCategory] = useState("All");
  // spread operator jo he vo apn jo search kare he vo de dega proper or set jo he vo jo bhi data rahega usame duplicate value nahi ane dega
  //so the main purpose is that menuItem is the contain only unique element in it
  const menuItems = [...new Set(Data.map((val) => val.category))];

  const filterItem = (curcat) => {
    const newItem = Data.filter((newVal) => {
      return newVal.category === curcat;
    });
    setSelectedCategory(curcat);
    setProducts(newItem);
  };

  return (
    <div>
      <PageHeader title="Our Shop Page" curPage="Shop" />

      {/* Shop Page */}
      <div className="shop-page padding-tb">
        <div className="container">
          <div className="row justify-content-center">
            {/* this colum is for left side */}
            <div className="col-lg-8 col-12">
              <article>
                {/* layout and title here */}
                <div className="shop-title d-flex flex-warp justify-content-between">
                  <p>{showResult}</p>
                  <div
                    className={`product-view-mode ${
                      GridList ? "gridActive" : "listActive"
                    }`}
                  >
                    <a className="grid" onClick={() => setGridList(!GridList)}>
                      <i className="icofont-ghost"></i>
                    </a>

                    {/* <a className='list' onClick={()=> setGridList(!GridList)}>
                        <i className='icofont-listine-dots'></i>
                      </a> */}
                  </div>
                </div>
                {/* Apply Lazy Loading here */}
                <Suspense fallback={<LoadingSpinner/>}>
                  <LazyProductCard
                    GridList={GridList}
                    Products={currentProducts}
                  />
                </Suspense>

                {/* Product Cards */}
                {/* <div>
                       <ProductCard GridList={GridList} Products={currentProducts}/>
                  </div>
                   */}
                   
                <Suspense>
                <LazyPagination
                  productPerPage={productPerPage}
                  totalProducts={Products.length}
                  paginate={paginate}
                  activePage={currPage}
                />
                </Suspense>
              </article>
            </div>

            {/* this is for right side */}
            <div className="col-lg-4 col-12">
              {/* aside tag is a symentic tag and it is basically used to side bar just like a navbar, footer tis things */}
              {/* aside tag is basically used to write the those content which we want to display on the side bars */}
              <aside>
                <Search Products={Products} GridList={GridList} />
                <ShopCategory
                  filterItem={filterItem}
                  setItem={setProducts}
                  menuItems={menuItems}
                  setProducts={setProducts}
                  selectedCategory={selectedCategory}
                />
                <PopularPost />
                <Tags />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
