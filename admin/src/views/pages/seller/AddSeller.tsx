import React, { ChangeEvent, FormEvent, useEffect,useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeCategory, addCategory,deleteCategory,deleteAllCategory  } from '../../../action/categoryAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import { NavLink } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormCheck,
    CFormInput,
    CFormFeedback,
    CFormLabel,
    CFormSelect,
    CFormTextarea,
    CInputGroup,
    CInputGroupText,
    CRow,
    CNavLink
} from '@coreui/react'


import {
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { selerPagination } from '../../../action/sellerAction';

interface Category {
  _id: string;
  name: string;
  status: number;
  isChecked?: boolean;
}

interface RootState {
  categoryList: {
    error: string;
    loading: boolean;
    sellers: { result: Category[] };
  };
}

const AddSeller: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inputName, setInputName] = useState('');
  const [inputStatus, setInputStatus] = useState('');
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  
  const categoryList = useSelector((state: RootState) => state.categoryList);
  const { error, loading, sellers } = categoryList;
  const [limit, setLimit] = useState<number>(3);
  const [pageCount, setPageCount] = useState<number>(1);
  const currentPage = useRef<number>(1);
  const [pageindex, setPageindex] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

  // Pagination
  const handlePageClick = (e: { selected: number }) => {
    currentPage.current = e.selected + 1;
    setCurrentPageNum(currentPage.current);
    dispatch(selerPagination(currentPage.current, limit, search, setPageCount, setPageindex));
  };

  const handleKeyPress = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    dispatch(selerPagination(currentPage.current, limit, e.target.value, setPageCount, setPageindex));
    setIsSubmitted(true);
  };

  // Checkbox
  const handleSelectAllChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name === 'selectAll') {
      const checkedvalues = categoryData.map(user => ({ ...user, isChecked: checked }));
      setCategoryData(checkedvalues);
    } else {
      const checkedvalue = categoryData.map(user => user.name === name ? { ...user, isChecked: checked } : user);
      setCategoryData(checkedvalue);
    }
  };

  const handlealldelete = async () => {
    const checkedinputvalue = categoryData.filter(user => user.isChecked).map(user => user._id);
    if (sellers?.result?.length === 1) {
      const pageBack = currentPage.current - 1;
      setCurrentPageNum(pageBack);
      setIsSubmitted(true);
    }
    dispatch(deleteAllCategory(checkedinputvalue, toast));
    setIsSubmitted(true);
  };

  const handleChange = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, id: string) => {
    const target = e.target as HTMLButtonElement;
    const act = target.value === "Active" ? 0 : 1;
    const data = { id, status: act };
    dispatch(activeCategory(data, toast));
    setIsSubmitted(true);
  };

  const handleChangeDelete = (e: FormEvent<HTMLButtonElement | HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const data = { id };
    dispatch(deleteCategory(data, toast));
    if (sellers?.result?.length === 1) {
      const pageBack = currentPage.current - 1;
      setCurrentPageNum(pageBack);
      setIsSubmitted(true);
    }
    setIsSubmitted(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { name: inputName, status: inputStatus };
    dispatch(addCategory(data, toast));
    setIsSubmitted(true);
    setInputName('');
    setInputStatus('');
  };

  useEffect(() => {
    if (isSubmitted) {
      dispatch(selerPagination(currentPageNum, limit, search, setPageCount, setPageindex));
      setIsSubmitted(false);
    }
    dispatch(selerPagination(currentPageNum, limit, search, setPageCount, setPageindex));
    setCategoryData(sellers?.result || []);
  }, [dispatch, search, isSubmitted, currentPageNum, limit, sellers?.result]);

  useEffect(() => {
    if (categoryList) {
      setCategoryData(sellers?.result || []);
    }
  }, [categoryList]);
    return (<>
        <ToastContainer/>
        <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
        >
            
            <CCol xs={12}>
                <CRow>
                    <CCol md={3}>
                        <CFormLabel htmlFor="validationCustom01">Category</CFormLabel>
                        <CFormInput type="text" id="validationCustom01"  name="categoryname" value={inputName || ''} onChange={(e) => setInputName(e.target.value)}  defaultValue="" placeholder='Enter Category' required />
                        <CFormFeedback valid>Looks good!</CFormFeedback>
                    </CCol>
                </CRow>

                <CRow>
                    <CCol md={3}>
                        <CFormLabel htmlFor="validationCustom02">Status</CFormLabel>
                        <CFormSelect  id="validationCustom02"  name="status" required aria-label="select example"  value={inputStatus|| ""} onChange={(e) => setInputStatus(e.target.value)}>
                            <option>Select menu</option>
                            <option value="1">Active</option>
                            <option value="2">Inactive</option>
                        </CFormSelect>
                        <CFormFeedback invalid>Example invalid select</CFormFeedback>
                    </CCol>
                </CRow>

            </CCol>

            <CCol xs={12}>
                <CButton color="primary" type="submit">
                    Submit
                </CButton>
            </CCol>
        </CForm>
        <CRow>
      <CCol xs={12}>
        <CCard className="mb-8">
          <CCardHeader>

          <CCol xs={12}>
              <CRow>
                  
              <CCol md={8}><CFormInput type="text" onChange={(e) => handleKeyPress(e)} placeholder='Enter Search' /></CCol>
                  
              <CCol md={1}><CButton color="primary" onClick={()=>{ handlealldelete()}}>Delete All</CButton></CCol>
               </CRow>
         </CCol>
          </CCardHeader>

          <CCardBody>

            <CTable color="success" striped>
              <CTableHead>
                <CTableRow>
                <CTableHeaderCell scope="col">     
        <input
        type="checkbox"
        name="selectAll"
        checked={!categoryData?.some((user)=>user?.isChecked!==true)}
        onChange={handleSelectAllChange}
      /></CTableHeaderCell>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>

                { 
                 categoryData?.map((cat, index) => (
                    <CTableRow key={index}>
                     <CTableDataCell > <div key={cat.name}>          
           <input
            type="checkbox"
            name={cat.name}
            value={cat._id}
            // checked={checkedItems[cat.name] || false}
            // onChange={handleCheckboxChange}
            checked={cat?.isChecked || false} 
             onChange={handleSelectAllChange}
            
          /></div></CTableDataCell>
                      <CTableHeaderCell scope="row">{pageindex + index + 1}</CTableHeaderCell>
                      <CTableDataCell>{cat.name}</CTableDataCell>
                      <CTableDataCell>
                        {cat.status == 1 ? <CButton component="input" type="button" color="success" value="Active" onClick={(e) => handleChange(e,cat._id)} /> :
                          <CButton component="input" type="button" color="danger" value="InActive" onClick={(e) => handleChange(e,cat._id)} />}
                      </CTableDataCell>
                      <CTableDataCell>
                        
                        <CNavLink to={`/category/editcategory/${cat?._id}`} color="primary" component={NavLink}>
                        <CButton component="input" type="button" color="primary" value="Edit" />
                        </CNavLink>
                        <CButton component="input" type="button" color="danger" value="Delete" onClick={(e) => handleChangeDelete(e,cat._id)} />
                      </CTableDataCell>
                    </CTableRow>
                  ))
                }



              </CTableBody>
            </CTable>

              <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              marginPagesDisplayed={2}
              containerClassName="pagination justify-content-center"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              activeClassName="active"

            // eslint-disable-next-line no-
            />

          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
        </>
    )
}


export default AddSeller
