const FormError = ({ errors, fieldName }) => {
  if (!errors?.hasOwnProperty?.(fieldName)) return null;

  return <div className="invalid-feedback d-block">{errors[fieldName]}</div>;
};

export default FormError;
