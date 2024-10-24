import React, { ChangeEvent, FormEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeColor, addColor, colorPagination, deleteColor, deleteAllcolor } from '../../../action/colorAction';
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

interface color {
  _id: string;
  name: string;
  isChecked?: boolean;
  status?: number;
  // Add other properties as needed
}

interface colorState {
  error: string;
  loading: boolean;
  colors: {
    result:color[]
  };
}

interface RootState {
  colorreducer: colorState;
}

const AddColor: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [colorData, setcolorData] = useState<color[]>([]);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [inputName, setInputName] = useState<string>('');
  const [inputStatus, setInputStatus] = useState<string>('');
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

  const colorList = useSelector((state: RootState) => state.colorreducer);
  const { error, loading, colors } = colorList;
  const [limit, setLimit] = useState<number>(3);
  const [pageCount, setPageCount] = useState<number>(1);
  const currentPage = useRef<number>(1);
  const [pageindex, setPageindex] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

  const handlePageClick = (e: { selected: number }) => {
    currentPage.current = e.selected + 1;
    setCurrentPageNum(currentPage.current);
    dispatch(colorPagination(currentPage.current, limit, search, setPageCount, setPageindex));
  };

  const handleKeyPress = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    dispatch(colorPagination(currentPage.current, limit, search, setPageCount, setPageindex));
    setIsSubmitted(true);
  };

  const handleSelectAllChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name === 'selectAll') {
      const checkedvalues = colorData.map(user => ({ ...user, isChecked: checked }));
      setcolorData(checkedvalues);
    } else {
      const checkedvalue = colorData.map(user =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setcolorData(checkedvalue);
    }
  };

  const handlealldelete = async () => {
    const checkedinputvalue: string[] = [];
    for (let i = 0; i < colorData.length; i++) {
      if (colorData[i].isChecked) {
        checkedinputvalue.push(colorData[i]._id);
      }
    }
    if (colors?.result?.length === 1) {
      const pageBack = currentPage.current - 1;
      setCurrentPageNum(pageBack);
      setIsSubmitted(true);
    }
    dispatch(deleteAllcolor(checkedinputvalue, toast));
    setIsSubmitted(true);
  };

  const handleChange = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, id: string) => {
    const target = e.target as HTMLButtonElement;
    const act = target.value === "Active" ? 0 : 1;
    const data = { id: id, status: act };
    dispatch(activeColor(data, toast));
    setIsSubmitted(true);
  };

  const handleChangeDelete = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (e.currentTarget instanceof HTMLButtonElement) {
      const data = { id: id };
      dispatch(deleteColor(data, toast));

      if (colors?.result?.length === 1) {
        const pageBack = currentPage.current - 1;
        setCurrentPageNum(pageBack);
        setIsSubmitted(true);
      }
      setIsSubmitted(true);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { name: inputName, status: inputStatus };
    dispatch(addColor(data, toast));
    setIsSubmitted(true);
    setInputName('');
    setInputStatus('');
  };

  useEffect(() => {
    if (isSubmitted) {
      dispatch(colorPagination(currentPageNum, limit, search, setPageCount, setPageindex));
    }
    dispatch(colorPagination(currentPageNum, limit, search, setPageCount, setPageindex));
    setIsSubmitted(false);
    setcolorData(colors?.result);
  }, [dispatch, search, isSubmitted]);

  useEffect(() => {
    if (colorList) {
      setcolorData(colors?.result);
    }
  }, [colorList]);

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
            <CFormLabel htmlFor="validationCustom01">color</CFormLabel>
            <CFormSelect id="validationCustom02" name="status" required aria-label="select example" value={inputStatus || ""} onChange={(e) => setInputName(e.target.value)}>
              <option>Select color</option>
              <option value="">Select a color</option>
              <option value="red" style={{ color: 'red' }}>Red</option>
              <option value="green" style={{ color: 'green' }}>Green</option>
              <option value="blue" style={{ color: 'blue' }}>Blue</option>
              <option value="yellow" style={{ color: 'yellow' }}>Yellow</option>
              <option value="purple" style={{ color: 'purple' }}>Purple</option>

            </CFormSelect>
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
                      checked={!colorData?.some((user) => user?.isChecked !== true)}
                      onChange={handleSelectAllChange}
                    /></CTableHeaderCell>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">color</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className="text-primary">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>

                {
                  colorData?.map((cat, index) => (
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
                      <CTableDataCell><span style={{backgroundColor: `${cat.name}`}}>{cat.name}</span>
                      </CTableDataCell>
                      <CTableDataCell>
                        {cat.status == 1 ? <CButton component="input" type="button" color="success" value="Active" onClick={(e) => handleChange(e, cat._id)} /> :
                          <CButton component="input" type="button" color="danger" value="InActive" onClick={(e) => handleChange(e, cat._id)} />}
                      </CTableDataCell>
                      <CTableDataCell>

                        <CNavLink to={`/color/editcolor/${cat?._id}`} color="primary" component={NavLink}>
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

export default AddColor
