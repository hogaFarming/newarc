import React from 'react';
import { connect } from 'react-redux';
import { connectViewModel } from '../../view-models';
import vmUserList from '../../view-models/user-list';


const UserList = ({ records, fetchUserList }) => {
  return (
    <div>
      <h2>user list</h2>
      <button onClick={() => { fetchUserList(); }}>fetch</button>
      <table>
        <tbody>
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
        </tbody>
      </table>
    </div>
  );
}

export default connectViewModel(vmUserList)(UserList);
