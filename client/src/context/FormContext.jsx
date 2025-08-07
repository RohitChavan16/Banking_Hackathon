// context/FormContext.js
import React, { createContext, useState, useContext } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    registration: {},
    documents: {},
    address: {},
    personal: {},
    nominee: {},
    services: {},
  });

  const updateSection = (section, data) => {
    setFormData((prev) => ({ ...prev, [section]: { ...prev[section], ...data } }));
  };

  return (
    <FormContext.Provider value={{ formData, updateSection }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
