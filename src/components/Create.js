import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import axios from 'axios';

export default function Create() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [error, setError] = useState('');  // 오류 메시지 상태 추가
  let navigate = useNavigate();

  const postData = () => {
    if (!firstName || !lastName || !email || !phoneNumber || !address) {
      setError('모든 필드를 입력해야 합니다.');  // 필수 항목 확인
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('올바른 이메일 주소를 입력하세요.');  // 이메일 형식 확인
      return;
    }

    setError('');  // 오류 초기화
    axios.post('https://66ff381f2b9aac9c997e8f37.mockapi.io/api/oss/users', {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      checkbox,
    }).then(() => {
      navigate('/read');
    }).catch((err) => {
      setError('서버 요청 중 오류가 발생했습니다.');  // 서버 오류 처리
    });
  };

  return (
    <div>
      <Form className="create-form">
        <Form.Field>
          <label>First Name</label>
          <input placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Phone Number</label>
          <input placeholder='Phone Number' onChange={(e) => setPhoneNumber(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Address</label>
          <input placeholder='Address' onChange={(e) => setAddress(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' onChange={(e, { checked }) => setCheckbox(checked)} />
        </Form.Field>
        {error && <div style={{ color: 'red' }}>{error}</div>}  {/* 오류 메시지 표시 */}
        <Button type='submit' onClick={postData}>Submit</Button>
      </Form>
    </div>
  );
}
