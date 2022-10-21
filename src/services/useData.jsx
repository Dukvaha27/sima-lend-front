import React from "react";
import { useSelector } from "react-redux";
import { fieldSelector, stepsSelector } from "../store/features/fieldData";

const useData = () => {
  const fields = useSelector(fieldSelector);
  const steps = useSelector(stepsSelector);
  return { fields, steps };
};

export default useData;
