import axios from "axios";
import { single_product_url as url } from "../../utils/constants";

export const fetchSingleProductThunk = async (productId, thunkAPI) => {
  try {
    const res = await axios.get(`${url + productId}`);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      "An error occurred while loading the product"
    );
  }
};
