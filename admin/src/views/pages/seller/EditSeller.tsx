import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editCategory, updateCategory } from '../../../action/categoryAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormFeedback,
    CFormLabel,
    CFormSelect,
    CRow,
} from '@coreui/react';

import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

interface RootState {
    categoryEdit: {
        loading: boolean;
        error: string;
        geteditcategory: {
            category: {
                name: string;
                status: string;
            };
        };
    };
}

interface Params extends Record<string, string | undefined> {
    id: string;
  }
  

const EditSeller: React.FC = () => {
    const [validated, setValidated] = useState(false);
    const [inputs, setInputs] = useState({ categoryname: "", status: "" });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
    const categoryList = useSelector((state: RootState) => state.categoryEdit);
    const { loading, error, geteditcategory } = categoryList;
    const { id } = useParams<Params>();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = { name: inputs.categoryname, status: inputs.status, id };
        dispatch(updateCategory(data, toast));
    };

    useEffect(() => {
        if (isSubmitted) {
            dispatch(editCategory(id ?? "", toast));
        }
        dispatch(editCategory(id ?? "", toast));
    }, [dispatch, id, isSubmitted]);

    return (
        <>
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
                            <CFormLabel htmlFor="validationCustom01">Category</CFormLabel>
                            <CFormInput
                                type="text"
                                id="validationCustom01"
                                name="categoryname"
                                onChange={(e) => handleChange(e)}
                                defaultValue={geteditcategory?.category?.name}
                                placeholder='Enter Category'
                                required
                            />
                            <CFormFeedback valid>Looks good!</CFormFeedback>
                        </CCol>
                    </CRow>

                    <CRow>
                        <CCol md={3}>
                            <CFormLabel htmlFor="validationCustom02">Status</CFormLabel>
                            <CFormSelect
                                id="validationCustom02"
                                value={geteditcategory?.category?.status}
                                name="status"
                                required
                                aria-label="select example"
                                onChange={(e) => handleChange(e)}
                            >
                                <option>Select menu</option>
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
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
        </>
    );
};

export default EditSeller;
