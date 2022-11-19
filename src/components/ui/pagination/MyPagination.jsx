import React from "react";
import { getPagesArray } from "../../../utils/pages";

const MyPagination = ({ totalPages, page, changePage }) => {
  const pagesArray = getPagesArray(totalPages);

  return (
    <div className="page__wrapper">
      {pagesArray.map((p) => (
        <span
          onClick={() => changePage(p)}
          key={p}
          className={page === p ? "page page__current" : "page"}
          style={{ marginRight: "10px" }}
        >
          {p}
        </span>
      ))}
    </div>
  );
};

export default MyPagination;
