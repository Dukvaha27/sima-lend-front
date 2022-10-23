import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addField,
  fieldSelector,
  stepsSelector,
} from "../store/features/fieldData";

const useData = () => {
  const dispatch = useDispatch();
  const fields = useSelector(fieldSelector);
  const steps = useSelector(stepsSelector);

  const addFieldHandler = useCallback((fieldObj) => {
    dispatch(addField(fieldObj));
  }, []);

  return { fields, steps, addFieldHandler };
};

export default useData;
