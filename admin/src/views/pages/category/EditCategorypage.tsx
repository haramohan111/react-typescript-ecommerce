import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
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
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';

import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

interface Category {
  _id: string;
  name: string;
  status: number;
  // Add other properties as needed
}

interface RootState {
  categoryEdit: {
    error: string;
    loading: boolean;
    geteditcategory: Category[];
  };
}

const EditCategoryPage: React.FC = () => {
  const [validated, setValidated] = useState(false);
  const [inputs, setInputs] = useState({ categoryname: '', status: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const categoryList = useSelector((state: RootState) => state.categoryEdit);
  const { loading, error, geteditcategory } = categoryList;
  const { id } = useParams();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { name: inputs.categoryname, status: inputs.status, id: id ?? '' };
    dispatch(updateCategory(data, toast));
  };

  useEffect(() => {
    if (isSubmitted) {
      dispatch(editCategory(id ?? '', toast));
    }
    dispatch(editCategory(id ?? '', toast));
  }, [dispatch, id, isSubmitted]);

  const category = geteditcategory.length > 0 ? geteditcategory[0] : null;

  useEffect(() => {
    if (category) {
      setInputs({ categoryname: category.name, status: category.status.toString() });
    }
  }, [category]);

  return (
    <>
      <ToastContainer />
      <CForm className="row g-3 needs-validation" noValidate validated={validated} onSubmit={handleSubmit}>
        <CCol xs={12}>
          <CRow>
            <CCol md={3}>
              <CFormLabel htmlFor="validationCustom01">Category</CFormLabel>
              <CFormInput
                type="text"
                id="validationCustom01"
                name="categoryname"
                onChange={handleChange}
                value={inputs.categoryname}
                placeholder="Enter Category"
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
                value={inputs.status}
                name="status"
                required
                aria-label="select example"
                onChange={handleChange}
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

export default EditCategoryPage;
