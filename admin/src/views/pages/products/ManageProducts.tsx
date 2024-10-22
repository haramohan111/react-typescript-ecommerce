import React, { useEffect, useRef, useState, ChangeEvent, FormEvent } from 'react';
import ReactPaginate from 'react-paginate';
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
} from '@coreui/react';
import { manageProductsPagination } from '../../../action/productAction';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

interface category_id{
name:string
}
interface subcategory_id{
  name:string
}
interface listsubcategory_id{
  name:string
}
interface Product {
  category_id: category_id;
  subcategory_id:subcategory_id;
  listsubcategory_id:listsubcategory_id;
  price:number;
  name: string;
  brand:string;
  countInStock:string;
  isChecked?: boolean;
  status:number;
  image:any
}


interface RootState {
  productreducer:{
    error: any;
    loading: boolean;
    products: {
      result: Product[];
    };
  }

}


const ManageProducts: React.FC = () => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const productList = useSelector((state:RootState) => state.productreducer);
  const { error, loading, products } = productList;
  const [limit, setLimit] = useState<number>(3);
  const [pageCount, setPageCount] = useState<number>(1);
  const currentPage = useRef<number>(1);
  const [pageindex, setPageindex] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  // Pagination
  const handlePageClick = (e: { selected: number }) => {
    currentPage.current = e.selected + 1;
    dispatch(manageProductsPagination(currentPage.current, limit, search, setPageCount, setPageindex));
  };

  const changeLimit = () => {
    currentPage.current = 1;
  };

  const handleKeyPress = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    dispatch(manageProductsPagination(currentPage.current, limit, e.target.value, setPageCount, setPageindex));
  };

  useEffect(() => {
    currentPage.current = 1;
    dispatch(manageProductsPagination(currentPage.current, limit, search, setPageCount, setPageindex));
  }, [dispatch, search]);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CFormInput type="text" onChange={handleKeyPress} placeholder="Enter Search" />
          </CCardHeader>
          <CCardBody>
            <CTable color="success" striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Category Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Subcategory Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">List SubCategoryName</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Product Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Brand</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Stock</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {products?.result?.map((prod, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">{pageindex + index + 1}</CTableHeaderCell>
                    <CTableDataCell>{prod?.category_id?.name}</CTableDataCell>
                    <CTableDataCell>{prod?.subcategory_id?.name}</CTableDataCell>
                    <CTableDataCell>{prod?.listsubcategory_id?.name}</CTableDataCell>
                    <CTableDataCell>{prod?.name}</CTableDataCell>
                    <CTableDataCell><img src={require(`../../../uploads/${prod?.image}`)} alt={prod.image} height={50} width={50} /></CTableDataCell>
                    <CTableDataCell>{prod?.price}</CTableDataCell>
                    <CTableDataCell>{prod?.brand}</CTableDataCell>
                    <CTableDataCell>{prod?.countInStock}</CTableDataCell>
                    <CTableDataCell>{prod?.status}</CTableDataCell>
                    <CTableDataCell>
                      <CButton component="input" type="button" color="primary" value="Edit" />
                      <CButton component="input" type="button" color="danger" value="Delete" />
                    </CTableDataCell>
                  </CTableRow>
                ))}
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
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ManageProducts;
