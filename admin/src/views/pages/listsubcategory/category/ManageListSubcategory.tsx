import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addexcelListSubCategory, deleteAllListSubcategory, manageListSubcategoryPagination } from '../../../../action/listsubcategoryAction';
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
import * as XLSX from 'xlsx';

import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

interface ListSubCategory {
  _id: string;
  name: string;
  isChecked?: boolean;
  category_id: { name: string };
  subcategory_id: { name: string };
  status: string;
  // Add other properties as needed
}

interface RootState {
  listsubcategoryreducer: {
    loading: boolean;
    listsubcategory: {
      result: ListSubCategory[];
    };
  };
}

const ManageListSubcategory: React.FC = () => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const listsubcategoryList = useSelector((state: RootState) => state.listsubcategoryreducer);
  const { loading, listsubcategory } = listsubcategoryList;

  const [listsubcategoryData, setListsubcategoryData] = useState<ListSubCategory[]>([]);
  const [limit, setLimit] = useState<number>(5);
  const [pageCount, setPageCount] = useState<number>(1);
  const currentPage = useRef<number>(1);
  const [pageindex, setPageindex] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [exceldata, setExcelData] = useState<any[]>([]);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

  const handlePageClick = (e: { selected: number }) => {
    currentPage.current = e.selected + 1;
    dispatch(manageListSubcategoryPagination(currentPage.current, limit, search, setPageCount, setPageindex));
  };

  const handleKeyPress = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    dispatch(manageListSubcategoryPagination(currentPage.current, limit, search, setPageCount, setPageindex));
  };

  const handleSelectAllChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name === 'selectAll') {
      const checkedvalues = listsubcategoryData.map(user => ({ ...user, isChecked: checked }));
      setListsubcategoryData(checkedvalues);
    } else {
      const checkedvalue = listsubcategoryData.map(user =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setListsubcategoryData(checkedvalue);
    }
  };

  const handlealldelete = async () => {
    const checkedinputvalue: string[] = [];
    for (let i = 0; i < listsubcategoryData.length; i++) {
      if (listsubcategoryData[i].isChecked) {
        checkedinputvalue.push(listsubcategoryData[i]._id);
      }
    }
    if (listsubcategory?.result?.length === 1) {
      const pageBack = currentPage.current - 1;
      setCurrentPageNum(pageBack);
      setIsSubmitted(true);
    }
    dispatch(deleteAllListSubcategory(checkedinputvalue, toast));
    setIsSubmitted(true);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = e.target.files?.[0];
    if (file) {
      reader.readAsBinaryString(file);
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json(sheet);
          setExcelData(parsedData);
          setIsSubmitted(true);
        }
      };
    }
  };
//upload end
useEffect(() => {
  currentPage.current = 1;

  if (isSubmitted) {
    dispatch(addexcelListSubCategory(exceldata, toast));
    if (inputFileRef.current) inputFileRef.current.value = '';
    dispatch(manageListSubcategoryPagination(currentPage.current, limit, search, setPageCount, setPageindex));
  }

  dispatch(manageListSubcategoryPagination(currentPage.current, limit, search, setPageCount, setPageindex));
  setListsubcategoryData(listsubcategory?.result || []);
  setIsSubmitted(false);
}, [dispatch, search, isSubmitted]);

useEffect(() => {
  if (listsubcategoryList) {
    setListsubcategoryData(listsubcategory?.result || []);
  }
}, [listsubcategoryList]);

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
        checked={!listsubcategoryData?.some((user)=>user?.isChecked!==true)}
        onChange={handleSelectAllChange}
      /></CTableHeaderCell>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Subcategory</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ListSubCategory</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>

                {
                  listsubcategoryData?.map((cat, index) => (
                    
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
                      <CTableDataCell>{cat?.subcategory_id?.name}</CTableDataCell>
                      <CTableDataCell>{cat?.name}</CTableDataCell>
                      <CTableDataCell>{cat?.status}</CTableDataCell>
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
    </CRow>
    </> )
}

export default ManageListSubcategory
