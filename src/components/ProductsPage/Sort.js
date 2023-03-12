import React from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../wrappers/Sort";
import {
  setGridView,
  updateSort,
  sortProducts,
} from "../../features/filter/filterSlice";
import { useEffect } from "react";

const Sort = () => {
  const { filtered_products, all_products, grid_view, sort } = useSelector(
    (store) => store.filter
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (all_products.length < 1) return;
    dispatch(sortProducts());
  }, [all_products, sort, dispatch]);

  return (
    <Wrapper>
      <div className="btn-container">
        <button
          type="button"
          className={`${grid_view ? "active" : null}`}
          onClick={() => dispatch(setGridView(true))}
        >
          <BsFillGridFill />
        </button>
        <button
          type="button"
          className={`${!grid_view ? "active" : null}`}
          onClick={() => dispatch(setGridView(false))}
        >
          <BsList />
        </button>
      </div>
      <p>{filtered_products.length} products found</p>
      <hr />
      <form>
        <label htmlFor="sort">sort by</label>
        <select
          name="sort"
          id="sort"
          className="sort-input"
          value={sort}
          onChange={(e) => dispatch(updateSort(e.target.value))}
        >
          <option value="price-lowest">price (lowest)</option>
          <option value="price-highest">price (hightest)</option>
          <option value="name-a">name (a-z)</option>
          <option value="name-z">name (z-a)</option>
        </select>
      </form>
    </Wrapper>
  );
};

export default Sort;
