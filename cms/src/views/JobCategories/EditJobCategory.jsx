import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import jobCategoryService from '../../services/jobCategoryService';
import { updateCategory } from '../../store/features/jobCategorySlice';
import { Toast } from 'primereact/toast';
import LocationForm from '../../components/locations/LocationForm';
import { jobCategory as jobCategorySchema } from '../../utils/schema';
import useFetchResource from '../../utils/fetchResource';

function EditJobCategory(props) {
  const { id } = useParams();
  const toast = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  
  const resource = useFetchResource(id, jobCategorySchema, jobCategoryService);

  async function updateCategoryById(submit) {
    setLoading(true);
    try {
      await jobCategoryService.update(submit, submit.id);
      dispatch(updateCategory(submit));
      toast.current.show({
        severity: 'success',
        summary: 'Job category updated',
      });
    } catch (error) {
      console.error(error);
      toast.current.show({
        severity: 'error',
        summary: 'There was a problem updating that job category',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="font-normal">Edit job category</h1>
      <LocationForm
        formData={resource}
        submit={updateCategoryById}
        loading={loading}
      />
      <Toast ref={toast} />
    </div>
  );
}

export default EditJobCategory;
