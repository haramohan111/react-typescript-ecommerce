import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, manageAllCategory } from '../../../action/categoryAction';
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
} from '@coreui/react'
import { addProducts } from '../../../action/productAction';
import { getSubcategoryById, manageSubcategory } from '../../../action/subcategoryAction';
import { getListsubcategoryById } from '../../../action/listsubcategoryAction';
import { manageBrand } from '../../../action/brandAction';
import { manageColor } from '../../../action/colorAction';
import { manageSize } from '../../../action/sizeAction';
import { manageSeller } from '../../../action/sellerAction';


import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

interface Category {
  _id: string;
  name: string;
  // Add other properties as needed
}

interface Subcategory {
  _id: string;
  name: string;
  // Add other properties as needed
}

interface ListSubcategory {
  _id: string;
  name: string;
  // Add other properties as needed
}

interface RootState {
  categoryList: {
    category: Category[];
    loading: boolean;
    error: string;
  };
  subcategoryreducer: {
    subcategorybyid: Subcategory[];
    loading: boolean;
    error: string;
  };
  listsubcategoryreducer: {
    listsubcategory: ListSubcategory[];
    loading: boolean;
    error: string;
  };
  productreducer: {
    products: any;
    loading: boolean;
    error: string;
  };
  brandreducer: {
    brands: any[];
    loading: boolean;
    error: string;
  };
  colorreducer: {
    colors: any[];
    loading: boolean;
    error: string;
  };
  sizereducer: {
    sizes: any[];
    loading: boolean;
    error: string;
  };
  sellerreducer: {
    sellers: any[];
    loading: boolean;
    error: string;
  };
}

const AddProducts: React.FC = () => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const [catid, setCatid] = useState<string>('');
  const [subcatid, setSubcatid] = useState<string>('');
  const [listsubcatid, setListsubcatid] = useState<string>('');
  const [productname, setProductname] = useState<string>('');
  const [price, setPrice] = useState<string|number>(0);
  const [stock, setStock] = useState<string|number>(0);
  const [brand, setBrand] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [seller, setSeller] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [photo, setPhoto] = useState<string>('');
  const [photofile, setPhotofile] = useState<File | null>(null);

  const categoryList = useSelector((state: RootState) => state.categoryList);
  const { category } = categoryList;

  const subcategoryList = useSelector((state: RootState) => state.subcategoryreducer);
  const { subcategorybyid } = subcategoryList;

  const listsubcategoryList = useSelector((state: RootState) => state.listsubcategoryreducer);
  const { listsubcategory } = listsubcategoryList;

  const product = useSelector((state: RootState) => state.productreducer);
  const { error, loading, products } = product;

  const brandlist = useSelector((state: RootState) => state.brandreducer);
  const { brands } = brandlist;

  const colorlist = useSelector((state: RootState) => state.colorreducer);
  const { colors } = colorlist;

  const sizelist = useSelector((state: RootState) => state.sizereducer);
  const { sizes } = sizelist;

  const sellerlist = useSelector((state: RootState) => state.sellerreducer);
  const { sellers } = sellerlist;

  const handleCreate = (e:React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("photo", photofile as Blob);
      formData.append("category_id", catid);
      formData.append("subcategory_id", subcatid);
      formData.append("listsubcategory_id", listsubcatid);
      formData.append("productname", productname);
      formData.append("price", price.toString());
      formData.append("stock", stock.toString());
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("seller", seller);
      formData.append("status", status);
      formData.append("tags", JSON.stringify(tags));
      formData.append("description", description);
      dispatch(addProducts(formData, toast));
    } catch (error) {
      console.error(error);
    }
  };

  const getallSubCategory = (cat_id: string) => {
    if (cat_id) {
      dispatch(getSubcategoryById(cat_id));
    }
  };

  const getlistsubcategoryById = (listcat_id: string) => {
    if (listcat_id) {
      dispatch(getListsubcategoryById(listcat_id));
    }
  };

  const showImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
      setPhotofile(e.target.files[0]);
    }
  };

  useEffect(() => {
    dispatch(manageAllCategory());
    dispatch(manageSubcategory());
    dispatch(manageBrand());
    dispatch(manageColor());
    dispatch(manageSize());
    dispatch(manageSeller());
  }, [dispatch]);


  return (
  <>
    <ToastContainer />
    <CForm
      className="row g-3 needs-validation"
      noValidate
    >

      <CCol xs={12}>
        <CRow>
          <CCol md={4}>
            <CFormLabel htmlFor="validationCustom02">Category</CFormLabel>
            <CFormSelect id="validationCustom02" name="status" required aria-label="select example"
              onChange={(e) => { setCatid(e.target.value); getallSubCategory(e.target.value) }}>
              <option>Select {category?.length}</option>
              {
                category.length>0 && category?.map((cat, index) => (
                  <option value={cat?._id} key={cat?.name}>{cat?.name}</option>
                ))
              }
            </CFormSelect>
            <CFormFeedback invalid>Example invalid select</CFormFeedback>
          </CCol>

          <CCol md={4}>
            <CFormLabel htmlFor="validationCustom02">Subcategory</CFormLabel>
            <CFormSelect id="validationCustom02" name="status" required aria-label="select example" onChange={(e) => {
              setSubcatid(e.target.value);
              getlistsubcategoryById(e.target.value)
            }}
            ><option>Select {subcategorybyid?.length !== 0 ? subcategorybyid?.length : ""}</option>
              {
                subcategorybyid?.map((cat, index) => (
                  <option value={cat._id} key={cat.name}>{cat.name}</option>
                ))
              }
            </CFormSelect>
            <CFormFeedback invalid>Example invalid select</CFormFeedback>
          </CCol>

          <CCol md={4}>
            <CFormLabel htmlFor="validationCustom02">List subcategory</CFormLabel>
            <CFormSelect id="validationCustom02" name="status" required aria-label="select example" onChange={(e) => setListsubcatid(e.target.value)}
            ><option>Select</option>{
              listsubcategory.length>0 && listsubcategory?.map((listcat, index) => (
                  <option value={listcat?._id} key={listcat?.name}>{listcat?.name}</option>
                ))
              }
            </CFormSelect>
            <CFormFeedback invalid>Example invalid select</CFormFeedback>
          </CCol>
        </CRow>
        <CRow>
          <CCol md={4}>
            <CFormLabel htmlFor="validationCustom01">Product name</CFormLabel>
            <CFormInput type="text" id="validationCustom01" name="categoryname" onChange={(e) => setProductname(e.target.value)} defaultValue="" placeholder='Enter Category' required />
            <CFormFeedback valid>Looks good!</CFormFeedback>
          </CCol>
          <CCol md={4}>
            <CFormLabel htmlFor="validationCustom01">Price</CFormLabel>
            <CFormInput type="text" id="validationCustom01" name="categoryname" onChange={(e) => setPrice(e.target.value)} defaultValue="" placeholder='Enter Category' required />
            <CFormFeedback valid>Looks good!</CFormFeedback>
          </CCol>
          <CCol md={4}>
            <CFormLabel htmlFor="validationCustom01">Stock</CFormLabel>
            <CFormInput type="text" id="validationCustom01" name="categoryname" onChange={(e) => setStock(e.target.value)} defaultValue="" placeholder='Enter Category' required />
            <CFormFeedback valid>Looks good!</CFormFeedback>
          </CCol>
        </CRow>
        <CRow>
          <CCol md={4}>
            <CFormLabel htmlFor="validationCustom02">Brand</CFormLabel>
            <CFormSelect id="validationCustom02" name="status" required aria-label="select example" onChange={(e) => setBrand(e.target.value)}
            >
              <option>Select</option>
              {
                brands?.map((bran, index) => (
                  <option key={index}>{bran.name}</option>
                ))
              }
            </CFormSelect>
            <CFormFeedback invalid>Example invalid select</CFormFeedback>
          </CCol>

          <CCol md={4}>
            <CFormLabel htmlFor="validationCustom02">Color</CFormLabel>
            <CFormSelect id="validationCustom02" name="status" required aria-label="select example" onChange={(e) => setColor(e.target.value)}
            >
              <option>Select</option>
              {
                colors?.map((bran, index) => (
                  <option key={index}>{bran.name}</option>
                ))
              }
            </CFormSelect>
            <CFormFeedback invalid>Example invalid select</CFormFeedback>
          </CCol>

          <CCol md={4}>
            <CFormLabel htmlFor="validationCustom02">Sizes</CFormLabel>
            <CFormSelect id="validationCustom02" name="status" required aria-label="select example" onChange={(e) => setSize(e.target.value)}
            >
              <option>Select</option>
              {
                sizes?.map((bran, index) => (
                  <option key={index}>{bran.name}</option>
                ))
              }
            </CFormSelect>
            <CFormFeedback invalid>Example invalid select</CFormFeedback>
          </CCol>
        </CRow>

        <CRow>
          <CCol md={4}>
            <CFormLabel htmlFor="validationCustom02">Sellers</CFormLabel>
            <CFormSelect id="validationCustom02" name="status" required aria-label="select example" onChange={(e) => setSeller(e.target.value)}
            >
              <option>Select</option>
              {
                sellers?.map((bran, index) => (
                  <option key={index}>{bran.name}</option>
                ))
              }
            </CFormSelect>
            <CFormFeedback invalid>Example invalid select</CFormFeedback>
          </CCol>

          <CCol md={4}>
            <CFormLabel htmlFor="validationCustom01">Tags</CFormLabel>
            <CFormInput type="text" id="validationCustom01" name="categoryname" onChange={(e) => setTags(e.target.value)} defaultValue="" placeholder='Enter Category' required />
            <CFormFeedback valid>Looks good!</CFormFeedback>
          </CCol>

          <CCol md={4}>
            <CFormLabel htmlFor="validationCustom02">Status</CFormLabel>
            <CFormSelect id="validationCustom02" name="status" required aria-label="select example" onChange={(e) => setStatus(e.target.value)}>
              <option>Select menu</option>
              <option value="1">Active</option>
              <option value="2">Inactive</option>
            </CFormSelect>
            <CFormFeedback invalid>Example invalid select</CFormFeedback>
          </CCol>


        </CRow>

        <CRow>
          <CCol md={4}>
            <CFormLabel htmlFor="validationCustom01">Image</CFormLabel>
            <CFormInput type="file" id="validationCustom01" name="categoryname" onChange={(e) => showImage(e)} required />
            <CFormFeedback valid>Looks good!</CFormFeedback>
          </CCol>

          <CCol md={4}>
            <CFormLabel htmlFor="validationCustom01">Images</CFormLabel>
            {photo ? (
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="f">Image:-</label>
                  {photofile ? photofile.name : "Upload Photo"}
                  {photo.length > 0 ? <img src={photo} alt="product" height={"100px"} /> : "No image"}

                </div>
              </div>
            ) : (
              ""
            )}
          </CCol>

          <CCol md={4}>
            <CFormLabel htmlFor="validationCustom01">Description</CFormLabel>
            <CFormInput type="textarea" id="validationCustom01" name="categoryname" onChange={(e) => setDescription(e.target.value)} required />
            <CFormFeedback valid>Looks good!</CFormFeedback>
          </CCol>
        </CRow>

      </CCol>

      <CCol xs={12}>
        <CButton color="primary" type="submit" onClick={handleCreate}>
          Submit
        </CButton>
      </CCol>
    </CForm>
  </>
  )
}
export default AddProducts
