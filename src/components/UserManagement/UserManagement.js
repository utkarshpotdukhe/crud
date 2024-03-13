import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import "./UserManagement.css";


const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [modalTitle, setModalTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const openModal = (title, user) => {
    setModalTitle(title);
    setShowModal(true);
    setFormData(user);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modalTitle === 'Add User') {
      try {
        await addUser(formData);
        fetchUsers();
        closeModal();
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        await updateUser(formData);
        fetchUsers();
        closeModal();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const deleteUser = async (id) => {
    try {
      await deleteUserById(id);
      fetchUsers();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (user) => {
    try {
      await axios.post('https://jsonplaceholder.typicode.com/users', user);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateUser = async (user) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const deleteUserById = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div className="user-management-container">
    <Button variant="primary" onClick={() => openModal('Add User', {})}>
      Add User
    </Button>

<Table striped bordered hover className="user-management-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th className="actions-cell">Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td className="actions-cell">
          <Button variant="warning" className="btn-warning" onClick={() => openModal('Edit User', user)}>
            Edit
          </Button>
          <Button variant="danger" className="btn-danger" onClick={() => deleteUser(user.id)}>
            Delete
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {error && <p>{error}</p>}
    </div>
  );
};

export default UserManagement;
