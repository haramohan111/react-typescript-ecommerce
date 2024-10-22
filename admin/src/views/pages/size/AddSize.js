import React, { useEffect,useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeCategory, addCategory,manageCategory,deleteCategory,deleteAllCategory  } from '../../../action/categoryAction';
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


const AddSize = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [categoryData,setCategoryData] = useState([])
  const [isAllChecked, setIsAllChecked] = useState(false);
  //const [selectedItems, setSelectedItems] = useState([]);
    const [validated, setValidated] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [inputName, setInputName] = useState('');
    const [inputStatus, setInputStatus] = useState('');
    const dispatch = useDispatch()

    //manage categorystart

    const categoryList = useSelector(state => state.sizereducer)
    const { error, loading, category } = categoryList
    const [limit, setLimit] = useState(3);
    const [pageCount, setPageCount] = useState(1);
    const currentPage = useRef();
    const [pageindex, setPageindex] = useState(1)
    const [search, setSearch] = useState("")
    const [currentPageNum, setCurrentPageNum] = useState(1);
    //pagination
    
    function handlePageClick(e) {
    
      currentPage.current = e.selected + 1;
      
      setCurrentPageNum(currentPage.current)
    // console.log(currentPage.current, limit, search)
      dispatch(manageCategory(currentPage.current, limit, search, setPageCount, setPageindex))
  
  
    }
    function handleKeyPress(e) {
      
        setSearch(e.target.value)
        dispatch(manageCategory(currentPage.current, limit, search, setPageCount, setPageindex))
        setIsSubmitted(true);
      }

  //checkbox

  const handleSelectAllChange = (e) => {
 
    const {name,checked} = e.target
    if(name === 'selectAll'){
      const checkedvalues = categoryData.map((user)=>{return{...user,isChecked:checked}})
      setCategoryData(checkedvalues)
      //console.log(checkedvalues)
    }else{
      const checkedvalue= categoryData.map( (user)=>
      user.name ===name? {...user, isChecked:checked}:user);
      //console.log(checkedvalue);
      setCategoryData(checkedvalue);
     }

  };

  const handlealldelete = async()=>{
    const checkedinputvalue=[];
  for(let i=0; i<categoryData.length; i++)
  {
    if(categoryData[i].isChecked===true)
    {
        checkedinputvalue.push(categoryData[i]._id);
    }
    // else
    // {
    //  alert("Please select at least one checkbix");
    // }
  }
  if(category?.result?.length === 1){

    const pageBack = currentPage.current - 1
    setCurrentPageNum(pageBack)
    setIsSubmitted(true);
   
  }
  console.log(checkedinputvalue)
  dispatch(deleteAllCategory(checkedinputvalue,toast))
  setIsSubmitted(true);
}
 

      const handleChange = (e,id) => { 
        var act
        e.target.value=="Active"? act =0:act=1
        const data = { id: id,status:act}
        console.log(data)
        dispatch(activeCategory(data,toast)) 
        setIsSubmitted(true);
    }

    const handleChangeDelete =(e,id) =>{
   
      e.preventDefault();
  
      const data = { id: id}
      dispatch(deleteCategory(data,toast))

     if(category?.result?.length === 1){

       const pageBack = currentPage.current - 1
       setCurrentPageNum(pageBack)
       setIsSubmitted(true);
      
     }
      setIsSubmitted(true);
    }
      const handleSubmit = (e) => {
          e.preventDefault();
  
          const data = { name: inputName, status: inputStatus }
          dispatch(addCategory(data,toast))
          setIsSubmitted(true);
          setInputName('');
          setInputStatus("")

      }
     // let currentItems = []
      //const itemsPerPage = 5;
//       const indexOfLastItem = (currentPage.current) * limit;
//       const indexOfFirstItem = indexOfLastItem - limit;
// console.log(currentPage.current)
//       const currentItems = categoryData?.slice(indexOfFirstItem, indexOfLastItem);
//       console.log(currentItems)
    useEffect(() => {    
      if (isSubmitted) { 

        dispatch(manageCategory(currentPageNum, limit, search, setPageCount, setPageindex))
      }  
        dispatch(manageCategory(currentPageNum, limit, search, setPageCount, setPageindex))
        setIsSubmitted(false);
        setCategoryData(category?.result)
      }, [dispatch, search,isSubmitted])
       //manage category end

       useEffect(() => {      
        if (categoryList) {
            setCategoryData(category?.result);   
                  
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

export default AddSize
