import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate';
import { manageSubcategoryPagination,deleteAllSubcategory,addexcelSubCategory } from '../../../action/subcategoryAction';
import { ToastContainer, toast } from 'react-toastify';
import * as XLSX from 'xlsx';

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CRow,
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

interface Category {
  _id: string;
  name: string;
  status: number;
  // Add other properties as needed
}

interface CategoryState {
  error: string;
  loading: string;
  subcategory:{
    result: Category[];
  }

}

interface RootState {
  subcategoryreducer: CategoryState;
}

const ManageSubcategory: React.FC = () => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const categoryList = useSelector((state: RootState) => state.subcategoryreducer);
  const { error, loading, subcategory } = categoryList;
  const [subcategoryData, setSubcategoryData] = useState<any[]>([]);
  const [limit, setLimit] = useState<number>(5);
  const [pageCount, setPageCount] = useState<number>(1);
  const currentPage = useRef<number>(1);
  const [pageindex, setPageindex] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [exceldata, setExcelData] = useState<any[]>([]);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

  // Pagination
  const handlePageClick = (e: { selected: number }) => {
    currentPage.current = e.selected + 1;
    setCurrentPageNum(currentPage.current);
    dispatch(manageSubcategoryPagination(currentPage.current, limit, search, setPageCount, setPageindex));
  };

  const handleKeyPress = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    dispatch(manageSubcategoryPagination(currentPage.current, limit, e.target.value, setPageCount, setPageindex));
  };

  // Checkbox
  const handleSelectAllChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name === 'selectAll') {
      const checkedvalues = subcategoryData.map((user) => ({ ...user, isChecked: checked }));
      setSubcategoryData(checkedvalues);
    } else {
      const checkedvalue = subcategoryData.map((user) => user.name === name ? { ...user, isChecked: checked } : user);
      setSubcategoryData(checkedvalue);
    }
  };

  const handlealldelete = async () => {
    const checkedinputvalue = [];
    for (let i = 0; i < subcategoryData.length; i++) {
      if (subcategoryData[i].isChecked === true) {
        checkedinputvalue.push(subcategoryData[i]._id);
      }
    }
    if (subcategory?.result?.length === 1) {
      const pageBack = currentPage.current - 1;
      setCurrentPageNum(pageBack);
      setIsSubmitted(true);
    }
    console.log(checkedinputvalue);
    dispatch(deleteAllSubcategory(checkedinputvalue, toast));
    setIsSubmitted(true);
  };

  // File upload
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files![0]);
    reader.onload = (event) => {
      const data = event.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      console.log(parsedData);
      setExcelData(parsedData);
      setIsSubmitted(true);
    };
  };

  useEffect(() => {
    if (isSubmitted) {
      dispatch(addexcelSubCategory(exceldata, toast));
      if (inputFileRef.current) {
        inputFileRef.current.value = '';
      }
      dispatch(manageSubcategoryPagination(currentPageNum, limit, search, setPageCount, setPageindex));
    }
    dispatch(manageSubcategoryPagination(currentPageNum, limit, search, setPageCount, setPageindex));
    setSubcategoryData(subcategory?.result);
    setIsSubmitted(false);
  }, [dispatch, search, isSubmitted]);

  useEffect(() => {
    if (categoryList) {
      setSubcategoryData(subcategory?.result);
    }
  }, [categoryList]);

  return (<>
  <ToastContainer/>
  
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CFormInput type="text" onChange={(e) => handleKeyPress(e)} placeholder='Enter Search' />
            <CCol md={1}><CButton color="primary" onClick={()=>{ handlealldelete()}}>Delete All</CButton></CCol>
            <CTableHeaderCell scope="col">     <input 
        type="file" 
        accept=".xlsx, .xls" 
        onChange={handleFileUpload} 
        ref={inputFileRef}
      /></CTableHeaderCell>
          </CCardHeader>
          <CCardBody>

            <CTable color="success" striped>
              <CTableHead>
                <CTableRow>
                <CTableHeaderCell scope="col">     
        <input
        type="checkbox"
        name="selectAll"
        checked={!subcategoryData?.some((user)=>user?.isChecked!==true)}
        onChange={handleSelectAllChange}
      /></CTableHeaderCell>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Subcategory</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  
                </CTableRow>
              </CTableHead>
              <CTableBody>

                {
                  subcategoryData?.map((cat, index) => (
                    <CTableRow key={index}>
                                           <CTableDataCell > <div key={cat.name}>          
           <input
            type="checkbox"
            name={cat.name}
            value={cat._id}
            checked={cat?.isChecked || false} 
             onChange={handleSelectAllChange}
            
          /></div></CTableDataCell>
                      <CTableHeaderCell scope="row">{pageindex + index + 1}</CTableHeaderCell>
                   
                      <CTableDataCell>{cat?.category_id?.name}</CTableDataCell>
                      <CTableDataCell>{cat.name}</CTableDataCell>
                      <CTableDataCell>{cat.status}</CTableDataCell>
                      <CTableDataCell>
                        <CButton component="input" type="button" color="primary" value="Edit" />
                        <CButton component="input" type="button" color="danger" value="Delete" />
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
              pageRangeDisplayed={5}
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
    </CRow></>
  )
}

export default ManageSubcategory
