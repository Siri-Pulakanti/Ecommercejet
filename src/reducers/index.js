import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";
import { drawerReducer } from "./drawerReducer";
import { couponReducer } from "./couponReducer";
import { cartReducer } from "./cartReducer";
import { CODReducer } from "./CODReducer";

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  drawer: drawerReducer,
  coupon: couponReducer,
  cart: cartReducer,
  COD: CODReducer,
});

export default rootReducer;
