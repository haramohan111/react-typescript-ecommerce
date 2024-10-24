import React, { Dispatch, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addbrand, brandPagination, deleteAllbrand, deleteBrand, activeBrand } from '../../../action/brandAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import { NavLink } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
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
interface brand {
  _id: string;
  name: string;
  status: number;
  // Add other properties as needed
}

interface RootState {
  brandreducer: {
    error: string;
    loading: boolean;
    brands: brand[];
  };
}

const AddBrand: React.FC = () => {

  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [brandData, setbrandData] = useState<brand[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inputName, setInputName] = useState('');
  const [inputStatus, setInputStatus] = useState('');
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

  const brandList = useSelector((state: RootState) => state.brandreducer);
  const { error, loading, brands } = brandList;
  const [limit, setLimit] = useState<number>(3);
  const [pageCount, setPageCount] = useState<number>(1);
  const currentPage = useRef<number>(1);
  const [pageindex, setPageindex] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

  const handlePageClick = (e: { selected: number }) => {
    currentPage.current = e.selected + 1;
    setCurrentPageNum(currentPage.current);
    dispatch(brandPagination(currentPage.current, limit, search, setPageCount, setPageindex));
  };

  const handleKeyPress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    dispatch(brandPagination(currentPage.current, limit, search, setPageCount, setPageindex));
    setIsSubmitted(true);
  };

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name === 'selectAll') {
      const checkedvalues = brandData.map((user) => ({ ...user, isChecked: checked }));
      setbrandData(checkedvalues);
    } else {
      const checkedvalue = brandData.map((user) => (user.name === name ? { ...user, isChecked: checked } : user));
      setbrandData(checkedvalue);
    }
  };
  interface brand {
    _id: string;
    name: string;
    status: number;
    isChecked: boolean; // Adjust as needed
    result?: brand[];
  }
  interface brandState {
    result: brand[];
  }

  interface RootState {
    brandreducer: any;
    brandList: {
      error: string;
      loading: boolean;
      brand: brandState; // Adjusted type
    };
  }

  const handlealldelete = async () => {
    const checkedinputvalue = [];
    for (let i = 0; i < brandData.length; i++) {
      if (brandData[i].isChecked === true) {
        checkedinputvalue.push(brandData[i]._id);
      }
      // else
      // {
      //  alert("Please select at least one checkbix");
      // }
    }
    if (brands?.result?.length === 1) {

      const pageBack = currentPage.current - 1
      setCurrentPageNum(pageBack)
      setIsSubmitted(true);

    }
    console.log(checkedinputvalue)
    dispatch(deleteAllbrand(checkedinputvalue, toast))
    setIsSubmitted(true);
  }

  const handleChange = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    const target = e.target as HTMLButtonElement | HTMLAnchorElement; // Type assertion

    let act: number;
    if (target instanceof HTMLButtonElement) {
      act = target.value === 'Active' ? 0 : 1;
    } else {
      act = 1; // Fallback for anchors or other elements without a value property
    }

    const data = { id, status: act };
    dispatch(activeBrand(data, toast));
    setIsSubmitted(true);
  };



  const handleChangeDelete = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    // Type narrowing
    if (e.currentTarget instanceof HTMLButtonElement) {
      // Handling for button
      const data = { id };
      dispatch(deleteBrand(data, toast));
      if (brands?.result?.length === 1) {
        const pageBack = currentPage.current - 1;
        setCurrentPageNum(pageBack);
        setIsSubmitted(true);
      }
      setIsSubmitted(true);
    } else if (e.currentTarget instanceof HTMLAnchorElement) {
      // Handling for anchor
      const data = { id };
      dispatch(deleteBrand(data, toast));
      if (brands?.result?.length === 1) {
        const pageBack = currentPage.current - 1;
        setCurrentPageNum(pageBack);
        setIsSubmitted(true);
      }
      setIsSubmitted(true);
    }
  };



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { name: inputName, status: inputStatus }
    dispatch(addbrand(data, toast))
    setIsSubmitted(true);
    setInputName('');
    setInputStatus("")

  }


  useEffect(() => {
    if (isSubmitted) {
      dispatch(brandPagination(currentPageNum, limit, search, setPageCount, setPageindex));
    }
    dispatch(brandPagination(currentPageNum, limit, search, setPageCount, setPageindex));
    setIsSubmitted(false);
    setbrandData(brands?.result);
  }, [dispatch, search, isSubmitted]);

  useEffect(() => {
    if (brandList) {
      setbrandData(brands?.result);
    }
  }, [brandList]);
  return (<>
    <ToastContainer />
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >

      <CCol xs={12}>
        <CRow>
          <CCol md={3}>
            <CFormLabel htmlFor="validationCustom01">brand</CFormLabel>
            <CFormInput type="text" id="validationCustom01" name="brandname" value={inputName || ''} onChange={(e) => setInputName(e.target.value)} defaultValue="" placeholder='Enter brand' required />
            <CFormFeedback valid>Looks good!</CFormFeedback>
          </CCol>
        </CRow>

        <CRow>
          <CCol md={3}>
            <CFormLabel htmlFor="validationCustom02">Status</CFormLabel>
            <CFormSelect id="validationCustom02" name="status" required aria-label="select example" value={inputStatus || ""} onChange={(e) => setInputStatus(e.target.value)}>
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

                <CCol md={1}><CButton color="primary" onClick={() => { handlealldelete() }}>Delete All</CButton></CCol>
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
                      checked={!brandData?.some((user) => user?.isChecked !== true)}
                      onChange={handleSelectAllChange}
                    /></CTableHeaderCell>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">brand</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>

                {
                  brandData?.map((cat, index) => (
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
                        {cat.status == 1 ? <CButton component="input" type="button" color="success" value="Active" onClick={(e) => handleChange(e, cat._id)} /> :
                          <CButton component="input" type="button" color="danger" value="InActive" onClick={(e) => handleChange(e, cat._id)} />}
                      </CTableDataCell>
                      <CTableDataCell>

                        <CNavLink to={`/brand/editbrand/${cat?._id}`} color="primary" component={NavLink}>
                          <CButton component="input" type="button" color="primary" value="Edit" />
                        </CNavLink>
                        <CButton component="input" type="button" color="danger" value="Delete" onClick={(e) => handleChangeDelete(e, cat._id)} />
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


export default AddBrand
