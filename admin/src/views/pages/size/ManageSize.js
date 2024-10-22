import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { activeCategory, addexcelCategory, manageCategory } from 'src/action/categoryAction'
import ReactPaginate from 'react-paginate';
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


const ManageSize = () => {

  const dispatch = useDispatch()
  const categoryList = useSelector(state => state.categoryList)
  const { error, loading, category } = categoryList
  const [limit, setLimit] = useState(5);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();
  const [pageindex, setPageindex] = useState(1);
  const [search, setSearch] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [exceldata, setExcelData] = useState([]);
  //pagination
  function handlePageClick(e) {

    currentPage.current = e.selected + 1;
    dispatch(manageCategory(currentPage.current, limit, search, setPageCount, setPageindex))


  }
  function changeLimit() {
    currentPage.current = 1;
    getPaginatedUsers();
  }

  function handleKeyPress(e) {
    setSearch(e.target.value)
    dispatch(manageCategory(currentPage.current, limit, search, setPageCount, setPageindex))
  }

  // function getPaginatedUsers() {
  //   console.log(search)
  //   fetch(`http://localhost:8000/api/v1/categorypagination?page=${currentPage.current}&limit=${limit}&search=${search}`, {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPageCount(data.results.pageCount);
  //       setData(data.results.result)
  //       setPageindex(data.results.pageindex)

  //     });
  // }

  const handleChange = (e,id) => {
    e.preventDefault();
   
    var act
    e.target.value=="Active"? act =0:act=1
    const data = { id: id,status:act}
    
     dispatch(activeCategory(data,toast))
   

}

  useEffect(() => {
    currentPage.current = 1;
    if(isSubmitted==true ){
    dispatch(manageCategory(currentPage.current, limit, search, setPageCount, setPageindex))
    }
    dispatch(manageCategory(currentPage.current, limit, search, setPageCount, setPageindex))
    dispatch(addexcelCategory(exceldata,toast))

  }, [dispatch, search,exceldata])



  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
     
      setExcelData(parsedData);
      setIsSubmitted(true);
    };
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CFormInput type="text" onChange={(e) => handleKeyPress(e)} placeholder='Enter Search' />

          </CCardHeader>
          <CCardBody>

            <CTable color="success" striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  <CTableHeaderCell scope="col">     <input 
        type="file" 
        accept=".xlsx, .xls" 
        onChange={handleFileUpload} 
      /></CTableHeaderCell>
                  
                </CTableRow>
              </CTableHead>
              <CTableBody>

                {
                  category?.result?.map((cat, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{pageindex + index + 1}</CTableHeaderCell>
                      <CTableDataCell>{cat.name}</CTableDataCell>
                      <CTableDataCell>
                        {cat.status == 1 ? <CButton component="input" type="button" color="success" value="Active" onClick={(e) => handleChange(e,cat._id)} /> :
                          <CButton component="input" type="button" color="danger" value="InActive" onClick={(e) => handleChange(e,cat._id)} />}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton component="input" type="button" color="primary" value="Edit" />
                        <CButton component="input" type="button" color="danger" value="Delete" />
                      </CTableDataCell>
                      <CTableDataCell>
                       
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
  )
}

export default ManageSize
