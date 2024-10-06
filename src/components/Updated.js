import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Update() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [id, setID] = useState(null);
  let navigate = useNavigate();

  // 컴포넌트가 처음 렌더링될 때 로컬 스토리지에서 데이터를 불러옴
  useEffect(() => {
    setID(localStorage.getItem('ID'));
    setFirstName(localStorage.getItem('First Name') || '');
    setLastName(localStorage.getItem('Last Name') || '');
    setEmail(localStorage.getItem('Email') || '');
    setPhoneNumber(localStorage.getItem('Phone Number') || '');
    setAddress(localStorage.getItem('Address') || '');
    setCheckbox(localStorage.getItem('Checkbox Value') === 'true');
  }, []);

  // 서버로 PUT 요청을 보내 데이터를 업데이트
  const updateAPIData = () => {
    axios.put(`https://66ff381f2b9aac9c997e8f37.mockapi.io/api/oss/users/${id}`, {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      checkbox,
    }).then(() => {
      navigate('/read');  // 업데이트 완료 후 /read 경로로 이동
    });
  };

  return (
    <div>
      <Form className="create-form">
        {/* First Name 필드 */}
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Field>

        {/* Last Name 필드 */}
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Field>

        {/* Email 필드 */}
        <Form.Field>
          <label>Email</label>
          <input
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Field>

        {/* Phone Number 필드 */}
        <Form.Field>
          <label>Phone Number</label>
          <input
            placeholder='Phone Number'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Field>

        {/* Address 필드 */}
        <Form.Field>
          <label>Address</label>
          <input
            placeholder='Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Field>

        {/* Checkbox 필드 */}
        <Form.Field>
          <Checkbox
            label='I agree to the Terms and Conditions'
            checked={checkbox}
            onChange={() => setCheckbox(!checkbox)}
          />
        </Form.Field>

        {/* Update 버튼 */}
        <Button type='submit' onClick={updateAPIData} disabled={!checkbox}>
          Update
        </Button>
      </Form>
    </div>
  );
}
