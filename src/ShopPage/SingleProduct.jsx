import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../component/PageHeader";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Autoplay } from "swiper/modules";
import ProductDisplay from "./ProductDisplay";

const SingleProduct = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  // console.log(id)
  //when we load the data so we use useEffect beacsuse its run when componenet is loaded
  useEffect(() => {
    fetch("/src/products.json")
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  const result = product.filter((p) => p.id === id);
  console.log(result);

  return (
    <div>
      <PageHeader title={"OUR SHOP SINGLE"} curPage={"Shop / Single Product"} />
      <div className="shop-single padding-tb aside-bg">
        <div className="container">
          <div className="row justify-content-center">
            {/* for large devices it take 8 */}
            {/* Left Side */}
            <div className="col-lg-8 col-12">
              {/* article tag is basically used to write the content of whole data related to the article like title and paragaraph*/}
              <article>
                <div className="product-details">
                  <div className="row align-items-center">

                    {/* image left side*/}
                    <div className="col-md-6 col-12">
                      <div className="product-thumb">
                        <div className="swiper-container pro-single-top">
                          <Swiper 
                          spaceBetween={30}
                          slidesPerView={1}
                          Loop={true}
                          autoplay={{
                            delay:2000,
                            disableOnInteraction:false
                          }}
                          modules={[Autoplay]}
                          navigation={
                            {
                              prevEl: ".pro-single-prev",
                              nextEl: ".pro-single-next"
                            }
                          }
                          className="mySwiper">
                            {result.map((item, i) => (
                              <SwiperSlide key={i}>
                                <div className="single-thumb">
                                  <img src={item.img} alt="" />
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                          <div className="pro-single-next">
                              <i className="icofont-rounded-left"></i>
                          </div>
                          <div className="pro-single-prev">
                              <i className="icofont-rounded-right"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* detail right side*/}
                    <div className="col-md-6 col-12">
                      <div className="post-content">
                        {
                          result.map(item => <ProductDisplay key={item.id} item={item}/>)
                        }
                      </div>
                    </div>
                    
                  </div>
                </div>

                {/* reviews */}
                <div className="review">Review</div>
              </article>
            </div>

            {/* Right Side */}
            {/* for small devices it take 4 */}
            <div className="col-lg-4 col-12">Right Side</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
