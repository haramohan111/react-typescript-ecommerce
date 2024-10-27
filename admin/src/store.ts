import { createStore, combineReducers, applyMiddleware, Action } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { categoryAddReducer, categoryListReducer, categoryEditReducer } from './reducers/categoryReducer';
import { addSubcategoryReducer, SubcategoryReducer } from './reducers/subcategoryReducer';
import { listSubcategoryReducer } from './reducers/listsubcategoryReducer';
import { productReducer } from './reducers/productReducer';
import { brandReducer } from './reducers/brandReducer';
import { colorReducer } from './reducers/colorReducer';
import { sizeReducer } from './reducers/sizeReducer';
import { sellerReducer } from './reducers/sellerReducer';
import { userReducer } from './reducers/userReducer';
import { orderReducer } from './reducers/orderReducer';
import { sliderReducer } from './reducers/sliderReducer';

interface InitialState {
  sidebarShow: boolean;
}

const initial: InitialState = {
  sidebarShow: true,
};

interface ChangeStateAction extends Action {
  type: string;
  rest: Partial<InitialState>;
}

const changeState = (state: InitialState = initial, action: ChangeStateAction): InitialState => {
  switch (action.type) {
    case 'set':
      return { ...state, ...action.rest };
    default:
      return state;
  }
};

const reducer = combineReducers({
  categoryList: categoryListReducer,
  categoryAdd: categoryAddReducer,
  categoryEdit: categoryEditReducer,
  addsubcategory: addSubcategoryReducer,
  subcategoryreducer: SubcategoryReducer,
  listsubcategoryreducer: listSubcategoryReducer,
  productreducer: productReducer,
  brandreducer: brandReducer,
  colorreducer: colorReducer,
  sizereducer: sizeReducer,
  sellerreducer: sellerReducer,
  userreducer: userReducer,
  orderreducer: orderReducer,
  changeState,
  sliderReducer
});

const middleware = [thunk];
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
