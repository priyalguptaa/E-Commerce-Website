import React from "react";
// import "../assets/css/LeftIconDisable.css";
const Pagination = ({
  productPerPage,
  totalProducts,
  paginate,
  activePage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
    pageNumbers.push(i);
  }

  const isAtFirstPage = activePage === 1;
  const isAtLastPage = activePage === pageNumbers.length;
  return (
    <ul className="default-pagination lab-ul">
      {/* left arraow */}
      <li>
        <button
          href="#"
          disabled={isAtFirstPage}
          onClick={() => {
            if (!isAtFirstPage) {
              paginate(activePage - 1);
            }
          }}
        >
          <i className={`icofont-rounded-left disabled ${isAtFirstPage ? "disabled":""}`}></i>
        </button>
      </li>

      {/* mpping of pageNumber Array */}
      {pageNumbers.map((number) => (
        <li
          key={number}
          className={`page-item ${number === activePage ? "bg-warning" : ""}`}
        >
          <button onClick={() => paginate(number)} className="bg-transparent">
            {number}
          </button>
        </li>
      ))}

      {/* right arrow */}
      <li>
        <button
          href="#"
          disabled={isAtLastPage}
          onClick={() => {
            if (!isAtLastPage) {
              paginate(activePage + 1);
            }
          }}
          // className={isAtLastPage ? "disabled" : ""}
        >
          <i className={`icofont-rounded-right disabled ${isAtLastPage ? "disabled":""}`}></i>
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
