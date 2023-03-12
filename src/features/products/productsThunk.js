import { products_url as url } from "../../utils/constants";
import axios from "axios";

export const getFeaturedProductsThunk = async (_, thunkAPI) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      "An error occurred while loading featured products"
    );
  }
};
