import React, { useEffect, useState } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Read() {
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    axios.get('https://66ff381f2b9aac9c997e8f37.mockapi.io/api/oss/users') 
      .then((response) => {
        setAPIData(response.data);
      })
  }, [])

  const setData = (data) => {
    let { id, firstName, lastName, checkbox } = data;
    localStorage.setItem('ID', id);
    localStorage.setItem('First Name', firstName);
    localStorage.setItem('Last Name', lastName);
    localStorage.setItem('Checkbox Value', checkbox)
  }

  const onDelete = (id) => {
    axios.delete(`https://66ff381f2b9aac9c997e8f37.mockapi.io/api/oss/users/${id}`)
      .then(() => {
        getData();
      })
  }

  const getData = () => {
    axios.get('https://66ff381f2b9aac9c997e8f37.mockapi.io/api/oss/users')
      .then((getData) => {
        setAPIData(getData.data);
      })
  }

  return (
    <div>
      {APIData.length === 0 ? (
        <div>No data available</div>
      ) : (
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Checked</Table.HeaderCell>
              <Table.HeaderCell>Update</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {APIData.map((data) => {
              return (
                <Table.Row key={data.id}>  {/* 고유 key 설정 */}
                  <Table.Cell>{data.firstName}</Table.Cell>
                  <Table.Cell>{data.lastName}</Table.Cell>
                  <Table.Cell>{data.checkbox ? 'checkbox' : 'Unchecked'}</Table.Cell>
                  <Table.Cell>
                    <Link to='/update'>
                      <Button onClick={() => setData(data)}>Update</Button>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Button onClick={() => onDelete(data.id)}>Delete</Button>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      )}
    </div>
  )
}
