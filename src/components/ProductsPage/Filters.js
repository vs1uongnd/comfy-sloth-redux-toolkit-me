import React, { useCallback, useMemo } from "react";
import Wrapper from "../../wrappers/Filter";
import { getUniqueValues, formatPrice } from "../../utils/helpers";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  updateFilters,
  clearFilters,
  filterProducts,
} from "../../features/filter/filterSlice";

const Filters = () => {
  const { filters, all_products } = useSelector((store) => store.filter);
  const {
    text,
    category,
    company,
    color,
    min_price,
    max_price,
    price,
    shipping,
  } = filters;
  const dispatch = useDispatch();

  useEffect(() => {
    if (all_products.length < 1) return;
    dispatch(filterProducts());
  }, [all_products, filters, dispatch]);

  const categories = useMemo(
    () => getUniqueValues(all_products, "category"),
    [all_products]
  );
  const companies = useMemo(
    () => getUniqueValues(all_products, "company"),
    [all_products]
  );
  const colors = useMemo(
    () => getUniqueValues(all_products, "colors"),
    [all_products]
  );

  const getNameValue = useCallback((e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "category") {
      value = e.target.textContent;
    }
    if (name === "category-mobile") {
      name = "category";
    }
    if (name === "color") {
      value = e.target.dataset.color;
    }
    if (name === "price") {
      value = Number(value);
    }
    if (name === "shipping") {
      value = e.target.checked;
    }

    dispatch(updateFilters({ name, value }));
  }, []);
  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault}>
          {/* search input */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="search"
              className="search-input"
              value={text}
              onChange={getNameValue}
            />
          </div>
          {/* end search input */}
          {/* categories */}
          <div className="form-control tablet">
            <h5>category</h5>
            <div>
              {categories.map((c, index) => {
                return (
                  <button
                    key={index}
                    onClick={getNameValue}
                    name="category"
                    type="button"
                    className={`${
                      category === c.toLowerCase() ? "active" : null
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="form-control mobile">
            <h5>category</h5>
            <select
              name="category-mobile"
              value={category}
              onChange={getNameValue}
              className="input-select"
            >
              {categories.map((category, index) => {
                return (
                  <option key={index} value={category}>
                    {category}
                  </option>
                );
              })}
            </select>
          </div>
          {/* end categories */}
          {/* companies */}
          <div className="form-control">
            <h5>company</h5>
            <select
              name="company"
              value={company}
              onChange={getNameValue}
              className="input-select"
            >
              {companies.map((company, index) => {
                return (
                  <option key={index} value={company}>
                    {company}
                  </option>
                );
              })}
            </select>
          </div>
          {/* end companies */}
          {/* colors */}
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {colors.map((c, index) => {
                if (c === "all") {
                  return (
                    <button
                      name="color"
                      onClick={getNameValue}
                      data-color="all"
                      className={`${
                        color === "all" ? "all-btn active" : "all-btn"
                      }`}
                      key={index}
                    >
                      all
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    name="color"
                    style={{ background: c }}
                    className={`${
                      color === c ? "color-btn active" : "color-btn"
                    }`}
                    data-color={c}
                    onClick={getNameValue}
                    type="button"
                  >
                    {color === c ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end colors */}
          {/* price */}
          <div className="form-control">
            <h5>price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              onChange={getNameValue}
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>
          {/* end price */}
          {/* shipping */}
          <div className="form-control shipping">
            <label htmlFor="shipping">free shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              onChange={getNameValue}
              checked={shipping}
            />
          </div>
          {/* end shipping */}
        </form>
        <button
          type="button"
          className="clear-btn"
          onClick={() => dispatch(clearFilters())}
        >
          clear filters
        </button>
      </div>
    </Wrapper>
  );
};

export default Filters;
