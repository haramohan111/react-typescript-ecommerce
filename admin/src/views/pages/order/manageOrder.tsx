import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormFeedback,
  CFormInput,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { manageOrder } from '../../../action/orderAction';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

interface Order {
  _id: string;
  orderItems: {
    product_id: {
      name: string;
    };
    price: number;
  }[];
  shippingAddress: {
    address: string;
    country: string;
  };
  // Add other properties as needed
}

interface OrderState {
  error: string;
  loading: boolean;
  orders:{
    result: Order[];
  }

}

interface RootState {
  orderreducer: OrderState;
}

const ManageOrder: React.FC = () => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const orderList = useSelector((state: RootState) => state.orderreducer);

  const { error, loading, orders } = orderList;
  console.log(orders);

  const [limit, setLimit] = useState<number>(5);
  const [pageCount, setPageCount] = useState<number>(1);
  const currentPage = useRef<number>(1);
  const [pageindex, setPageindex] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const handlePageClick = (e: { selected: number }) => {
    currentPage.current = e.selected + 1;
    dispatch(manageOrder(currentPage.current, limit, search, setPageCount, setPageindex));
  };

  const handleKeyPress = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    dispatch(manageOrder(currentPage.current, limit, search, setPageCount, setPageindex));
  };

  useEffect(() => {
    currentPage.current = 1;
    dispatch(manageOrder(currentPage.current, limit, search, setPageCount, setPageindex));
  }, [dispatch, search]);


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
                  <CTableHeaderCell scope="col">Order</CTableHeaderCell>
                  <CTableHeaderCell scope="col">product name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">shipping Address</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Total price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>

                {
                  orders?.result?.map((o, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{pageindex + index + 1}</CTableHeaderCell>
                      <CTableDataCell>{o?._id}</CTableDataCell>
                      <CTableDataCell>{o?.orderItems[index]?.product_id?.name}</CTableDataCell>
                      <CTableDataCell>{o?.orderItems[index]?.price}</CTableDataCell>
                      <CTableDataCell>Address - {o?.shippingAddress?.address}<br/> Country - {o?.shippingAddress?.country}</CTableDataCell>
                      <CTableDataCell>{o?.orderItems[index]?.price}</CTableDataCell>
                      <CTableDataCell>
                      <CCol md={6}>
            
            <CFormSelect id="validationCustom02" name="status" required aria-label="select example" >
              <option>Select menu</option>
              <option value="1">Process</option>
              <option value="2">Pendenging</option>
              <option value="2">Delevered</option>
            </CFormSelect>
            <CFormFeedback invalid>Example invalid select</CFormFeedback>
          </CCol>
                      </CTableDataCell>
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
  )
}

export default ManageOrder
