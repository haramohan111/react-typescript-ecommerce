import { Link } from "react-router-dom";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux'
import "./topmenu.css"
import "./megamenu.css"
import { useEffect } from "react";
import { manageAllCategory, managelistsubCategory, managesubCategory } from "../actions/categoryAction";

interface Category {

  name: string;

  subcategories?: Subcategory[];
}

interface Subcategory {
  _id: string;
  name: string;

  listsubcategories?: Subcategory[];
}

interface CategoryState {
  error: string;
  loading: boolean;
  category: Category[];
}

interface CategoryRootState {
  categoryreducer: CategoryState;
}

interface SubcategoryState {
  subcategory: Subcategory[];
}

interface SubcategoryRootState {
  subcategoryreducer: SubcategoryState;
}

const TopMenu = () => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const categoryList = useSelector((state: CategoryRootState) => state.categoryreducer)
  const { error, loading, category } = categoryList
  //console.log(categoryList)
  const subcategoryList = useSelector((state: SubcategoryRootState) => state.subcategoryreducer)
  const { subcategory } = subcategoryList


  // const managesubCategory_id = (id) => {
  //   managesubCategory(id)
  // }
  // const managelistsubCategory_id = (id) => {
  //   dispatch(managelistsubCategory(id))
  // }
  useEffect(() => {
    dispatch(manageAllCategory())
    // dispatch(managesubCategory(id))
  }, [])
  return (
    <div className="ruby-menu-demo-header">

      <div className="ruby-wrapper">
        <button className="c-hamburger c-hamburger--htx visible-xs">
          <span>toggle menu</span>
        </button>
        <ul className="ruby-menu">
          <li className="ruby-active-menu-item">
            <a href="#">Home</a>
          </li>
          {category?.map((cat, index) => (
            <li key={cat.name} className="ruby-menu-mega" >
              <a href="#">{cat.name}</a>
              <div className="ruby-grid ruby-grid-lined">
                <div className="ruby-row">

                  {cat.subcategories?.map((subcat, index) => (
                    <div className="ruby-col-2" key={subcat.name}>
                      <h3 className="ruby-list-heading">{subcat.name}</h3>
                      <ul >

                        {subcat.listsubcategories?.map((listsubcat, index) => (
                          <li  key={listsubcat.name}>
                            <Link to={`/category?${listsubcat?._id}`}>{listsubcat.name}</Link>
                          </li>
                        ))}

                      </ul>
                    </div>
                  ))}


                </div>
              </div>
              <span className="ruby-dropdown-toggle" />
            </li>
          )).filter(cat => cat !== null)}
          <li className="ruby-menu-right">
            <a href="#">Right</a>
            <ul>
              <li>
                <a href="#">2nd Level #1</a>
              </li>
              <li>
                <a href="#">2nd Level #2</a>
              </li>
              <li className="ruby-open-to-left">
                <a href="#">2nd Level #3</a>
                <ul>
                  <li className="ruby-open-to-left">
                    <a href="#">
                      <i className="fa fa-university" aria-hidden="true" />
                      3rd Level #1
                    </a>
                    <ul>
                      <li>
                        <a href="#">4th Level #1</a>
                      </li>
                      <li>
                        <a href="#">4th Level #2</a>
                      </li>
                    </ul>
                    <span className="ruby-dropdown-toggle" />
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-thumbs-up" aria-hidden="true" />
                      3rd Level #2
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-users" aria-hidden="true" />
                      3rd Level #3
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-file" aria-hidden="true" />
                      3rd Level #4
                    </a>
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fa fa-paper-plane" aria-hidden="true" />
                          4th Level #1
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-print" aria-hidden="true" />
                          4th Level #2
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-shopping-bag" aria-hidden="true" />
                          4th Level #3
                        </a>
                      </li>
                    </ul>
                    <span className="ruby-dropdown-toggle" />
                  </li>
                </ul>
                <span className="ruby-dropdown-toggle" />
              </li>
              <li className="ruby-open-to-left">
                <a href="#">2nd Level #4</a>
                <ul>
                  <li>
                    <a href="#">3rd Level #1</a>
                  </li>
                  <li>
                    <a href="#">3rd Level #2</a>
                  </li>
                  <li>
                    <a href="#">3rd Level #3</a>
                  </li>
                </ul>
                <span className="ruby-dropdown-toggle" />
              </li>
              <li>
                <a href="#">2nd Level #5</a>
              </li>
            </ul>
            <span className="ruby-dropdown-toggle" />
          </li>
          <li className="ruby-menu-right ruby-menu-social">
            <a href="#">
              <i className="fa fa-facebook" aria-hidden="true" />
              <span>@rubymenu</span>
            </a>
          </li>
          <li className="ruby-menu-right ruby-menu-social">
            <a href="#">
              <i className="fa fa-twitter" aria-hidden="true" />
              <span>/rubymenu</span>
            </a>
          </li>
          <li className="ruby-menu-right ruby-menu-social ruby-menu-search">
            <a href="#">
              <i className="fa fa-search" aria-hidden="true" />
              <span>
                <input type="text" name="search" placeholder="Search.." />
              </span>
            </a>
          </li>
        </ul>
      </div>

    </div>
  );
};

export default TopMenu;
