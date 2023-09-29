import React from 'react';
 import { FieldInputProps, FieldProps, useField } from 'formik';

 function MyTextField(props: FieldInputProps<string | undefined>) {
   // this will return field props for an <input />
   const [field, meta, helpers] = useField(props.name);
   return (
     <>
       <input {...field} {...props} />
       {meta.error && meta.touched && <div>{meta.error}</div>}
     </>
   );
 }
