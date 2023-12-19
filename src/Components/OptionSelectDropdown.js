import Form from "react-bootstrap/Form";

function OptionSelectDropdown({
  listOption,
  userForm,
  setUserForm,
  tipoPersona,
}) {
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
    console.log(userForm);
  };
  return (
    <Form.Select
      onChange={onInputChange}
      name="tipoPersona"
      value={tipoPersona}
      defaultValue={tipoPersona}
      aria-label="Default select example"
      className="my-3 w-75"
    >
      <option>{tipoPersona}</option>
      {listOption.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </Form.Select>
  );
}

export default OptionSelectDropdown;
