import { FieldInputProps, useField } from "formik";
import { FC } from "react";
import { MyStyledTextareaComponent } from "styles/MyStyledTextareaComponent";

const MyFormikTextareaField: FC<FieldInputProps<string | undefined>> = ({ ...props }) => {
    const [value, onChange] = useField(props);

  return (
    <MyStyledTextareaComponent
      as="textarea"
      value={value}
      onChange={onChange}
      placeholder="Additional Information"
    />
  );
}

export default MyFormikTextareaField
