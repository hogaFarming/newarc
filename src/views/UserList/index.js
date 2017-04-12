import React from 'react';
import { getUsers } from '../../api/user';

function UserList({
    records = mockRecords
  }) {
  return (
    <div>
      <h2>user list</h2>
      <table>
        <tr>
          <th>姓名</th>
          <th>年龄</th>
        </tr>
        {records.map(rec => (
          <tr key={rec.name}>
            <td>{rec.name}</td>
            <td>{rec.age}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default UserList;
