function DropDown({ id, children, ...rest }) {
  return (
    <select id={id} {...rest}>
      {children}
    </select>
  );
}

export default DropDown;
