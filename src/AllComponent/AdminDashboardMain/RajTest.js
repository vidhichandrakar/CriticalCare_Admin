import React, { useRef } from 'react';
import { TextField, Button } from '@mui/material';

function Form() {
  const textField1Ref = useRef(null);
  const textField2Ref = useRef(null);
  const textField3Ref = useRef(null);
  const handleNextTextField = () => {
    textField2Ref.current.focus();
  };
  const handleNextTextField2 = () => {
    textField3Ref.current.focus();
  };

  return (
    <div>
      <TextField
        label="Field 1"
        inputRef={textField1Ref}
        onChange={(event)=>event.target.value.length==1 && handleNextTextField()}
        // Add any other props you need
      />
      <TextField
        label="Field 2"
        inputRef={textField2Ref}
        onChange={(event)=>event.target.value.length==1 && handleNextTextField2()}
        // Add any other props you need
      />
      <TextField
        label="Field 2"
        inputRef={textField3Ref}
        onChange={(event)=>event.target.value.length==1 && handleNextTextField()}
        // Add any other props you need
      />
      <Button onClick={handleNextTextField}>Next</Button>
    </div>
  );
}

export default Form;
