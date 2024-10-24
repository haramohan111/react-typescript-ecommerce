import React, { useEffect, useRef, useState, ChangeEvent, MouseEvent } from 'react'
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { activeCategory, addexcelCategory } from '../../../action/categoryAction';
import ReactPaginate from 'react-paginate';
import * as XLSX from 'xlsx';
import { 
    CButton, CCard, CCardBody, CCardHeader, CCol, 
    CFormInput, CRow, CTable, CTableBody, CTableCaption, 
    CTableDataCell, CTableHead, CTableHeaderCell, CTableRow 
} from '@coreui/react';
import { sizePagination } from '../../../action/sizeAction';

interface Category {
    _id: string;
    name: string;
    status: number;
}

interface RootState {
    sizereducer: {
        error: any;
        loading: boolean;
        sizes: {
            result: Category[]
        }
    }
}

const ManageSize: React.FC = () => {
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const categoryList = useSelector((state: RootState) => state.sizereducer);
    const { error, loading, sizes } = categoryList;

    const [limit, setLimit] = useState(5);
    const [pageCount, setPageCount] = useState(1);
    const currentPage = useRef<number>(1);
    const [pageindex, setPageindex] = useState(1);
    const [search, setSearch] = useState<string>("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [exceldata, setExcelData] = useState<any[]>([]);

    const handlePageClick = (e: { selected: number }) => {
        currentPage.current = e.selected + 1;
        dispatch(sizePagination(currentPage.current, limit, search, setPageCount, setPageindex));
    }

    const changeLimit = () => {
        currentPage.current = 1;
        dispatch(sizePagination(currentPage.current, limit, search, setPageCount, setPageindex));
    }

    const handleKeyPress = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        dispatch(sizePagination(currentPage.current, limit, search, setPageCount, setPageindex));
    }

    const handleChange = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const target = e.target as HTMLButtonElement;
        const act = target.value === "Active" ? 0 : 1;
        const data = { id, status: act };
        dispatch(activeCategory(data, toast));
    }

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files![0]);
        reader.onload = (event) => {
            const data = event.target?.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);

            setExcelData(parsedData);
            setIsSubmitted(true);
        };
    }

    useEffect(() => {
        currentPage.current = 1;
        if (isSubmitted) {
            dispatch(sizePagination(currentPage.current, limit, search, setPageCount, setPageindex));
        }
        dispatch(sizePagination(currentPage.current, limit, search, setPageCount, setPageindex));
        dispatch(addexcelCategory(exceldata, toast));
    }, [dispatch, search, exceldata, isSubmitted, limit, setPageCount, setPageindex]);

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
                                    <CTableHeaderCell scope="col">Size</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        <input
                                            type="file"
                                            accept=".xlsx, .xls"
                                            onChange={handleFileUpload}
                                        />
                                    </CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {sizes?.result?.map((cat, index) => (
                                    <CTableRow key={index}>
                                        <CTableHeaderCell scope="row">{pageindex + index + 1}</CTableHeaderCell>
                                        <CTableDataCell>{cat.name}</CTableDataCell>
                                        <CTableDataCell>
                                            {cat.status === 1 ? 
                                                <CButton component="input" type="button" color="success" value="Active" onClick={(e) => handleChange(e, cat._id)} /> : 
                                                <CButton component="input" type="button" color="danger" value="InActive" onClick={(e) => handleChange(e, cat._id)} />
                                            }
                                        </CTableDataCell>
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
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default ManageSize;
