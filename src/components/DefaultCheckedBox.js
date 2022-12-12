
function DefaultCheckedBox({ id, className, value, setChecked, checked, open, setOpen, ...rest}) {
  function handleOpenCheckbox(evt) {
    if (evt.currentTarget.checked) {
      setOpen('true');
      setChecked(false);
    } else {
      setOpen('');
      setChecked(true);
    }
    console.log(open);
  }
  return(
    <input className={className} type="checkbox" defaultChecked={checked} onChange={(evt) => handleOpenCheckbox(evt)} />
  );
}

export default DefaultCheckedBox;