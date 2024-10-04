import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import LoadingBar from 'react-top-loading-bar';
import axios from 'axios';

export default function Create() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [progress, setProgress] = useState(0);
  let navigate = useNavigate();

  const postData = () => {
    axios.post('https://66ff381f2b9aac9c997e8f37.mockapi.io/api/oss/users', { // Update endpoint
      firstName,
      lastName,
      checkbox,
    }).then(() => {
      navigate('/read');  // Use navigate instead of history
    });
  };

  const handleButtonClick = () => {
    if (!checkbox) {
      return;
    }
    setProgress(30); // Optional: Set some initial progress value
    postData();   // Call the postData function
    setProgress(100); // Set the progress to 100
  };

  return (
    <div>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}  // Reset progress after completion
      />
      <Form className="create-form">
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder='First Name'
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder='Last Name'
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label='I agree to the Terms and Conditions'
            onChange={(e, { checked }) => setCheckbox(checked)}  // Proper event handling
            checked={checkbox}
          />
        </Form.Field>
        <Button
          type='submit'
          onClick={handleButtonClick}
          disabled={!checkbox}  // Disable if checkbox is not checked
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
