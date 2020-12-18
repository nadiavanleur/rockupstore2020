const FormError = ({ errors, fieldName }) => {
  if (!errors?.hasOwnProperty?.(fieldName)) return null;

  return <p className="u-text-error">{errors[fieldName]}</p>;
};

export default FormError;
