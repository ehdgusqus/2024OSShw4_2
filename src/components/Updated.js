import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import axios from 'axios';

export default function Update() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [progress, setProgress] = useState(0);
  const [id, setID] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    setID(localStorage.getItem('ID'));
    setFirstName(localStorage.getItem('First Name') || '');
    setLastName(localStorage.getItem('Last Name') || '');
    setCheckbox(localStorage.getItem('Checkbox Value') === 'true');
  }, []);

  const updateAPIData = () => {
    axios.put(`https://66ff381f2b9aac9c997e8f37.mockapi.io/api/oss/users/${id}`, {
      firstName,
      lastName,
      checkbox
    }).then(() => {
      navigate('/read');
    });
  };

  const handleButtonClick = () => {
    if (!checkbox) {
      return;
    }
    setProgress(30); // 초기 진행 상태 설정
    updateAPIData();  // 데이터 업데이트
    setProgress(100); // 완료 후 진행 상태 설정
  };

  return (
    <div>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)} // 로딩 완료 후 진행 상태 초기화
      />
      <Form className="create-form">
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label='I agree to the Terms and Conditions'
            checked={checkbox}
            onChange={() => setCheckbox(!checkbox)}
          />
        </Form.Field>
        <Button type='submit' onClick={handleButtonClick} disabled={!checkbox}>
          Update
        </Button>
      </Form>
    </div>
  );
}
