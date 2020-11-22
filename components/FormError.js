const FormError = ({ errors, fieldName }) => {
  if (!errors?.hasOwnProperty?.(fieldName)) return null;

  return <small className="u-text-error">{errors[fieldName]}</small>;
};

export default FormError;
