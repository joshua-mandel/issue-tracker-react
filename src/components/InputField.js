function InputField({ label, id, className, error, ...rest }) {
  const inputClasses = 'form-control ' + (error ? 'is-invalid': '');

  return (
    <div className="mb-3">
      <label className="form-label fs-5" htmlFor={id}>
        {label}
      </label>
      <input className={inputClasses} id={id} {...rest} />
      {error && <div className="text-danger mt-1">{error}</div>}
    </div>
  );
}

export default InputField;