import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid"; //random id generator library
import data from "./mock-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

const App = () => {
  const [contacts, setContacts] = useState(data);

  //추가 상태
  //id는 nanoid generator로 랜덤 생성된다
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: ""
  });

  //수정 상태
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: ""
  });

  //수정 id 상태
  const [editContactId, setEditContactId] = useState(null);

  //changeHandler
  //입력 데이터로 상태 업데이트
  const handleAddFormChange = (event) => {
    event.preventDefault(); // ???

    //fullname, address, phoneNumber, email
    const fieldName = event.target.getAttribute("name");
    //각 input 입력값
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    //addFormData > event.target(input)
    //fullName:"" > name="fullName", value=fullName input 입력값

    setAddFormData(newFormData);
  };

  //수정 데이터로 상태 업데이트
  const handleEditFormChange = (event) => {
    event.preventDefault(); // ???

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  //submit handler
  //Add 버튼을 누르면 새 데이터 행을 기존 행에 추가
  const handleAddFormSubmit = (event) => {
    event.preventDefault(); // ???

    //data.json으로 이루어진 기존 행에 새로 입력받은 데이터 행 덧붙이기
    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName, //handleAddFormChange로 받은 새 데이터
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email
    };

    //contacts의 초기값은 data.json 데이터
    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  //수정 데이터 save (App 컴포넌트)
  const handleEditFormSubmit = (event) => {
    event.preventDefault(); // prevent submit

    const editedContact = {
      id: editContactId, //초깃값 null
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email
    };

    const newContacts = [...contacts]; //json.data + 새로 입력받아 위에서 setContacts로 추가된 데이터
    const index = contacts.findIndex((contact) => contact.id === editContactId);
    newContacts[index] = editedContact; //전체 데이터인 contacts배열 index번째 행의 객체에 수정 데이터 객체 대입

    setContacts(newContacts);
    setEditContactId(null);
  };

  //읽기전용 데이터 edit 버튼 클릭하면 기존 데이터로 보여주기
  const handleEditClick = (event, contact) => {
    event.preventDefault(); // ???

    setEditContactId(contact.id);
    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email
    };
    setEditFormData(formValues);
  };

  //edit 눌렀을 때 취소 버튼
  const handleCancelClick = () => {
    setEditContactId(null);
  };

  // 삭제
  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];
    const index = contacts.findIndex((contact) => contact.id === contactId);
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };

  //수정 완료 후 save(submit) 누르면 submit > handleEditFormSubmit 동작
  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add a Contact</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="fullName"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="address"
          required="required"
          placeholder="Enter an addres..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="phoneNumber"
          required="required"
          placeholder="Enter a phone number..."
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          required="required"
          placeholder="Enter an email..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
