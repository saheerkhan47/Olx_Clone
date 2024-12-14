import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';

const Create = () => {

  const nav=useNavigate();
  const { firebase } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const date = new Date();

  function handleSubmit() {
    if (!name || !category || !price) {
      alert('Please fill out all fields before submitting');
      return;
    }

    firebase.firestore().collection('products').add({
      name,
      category,
      price,
      userId: user.uid,
      createdAt: date.toDateString(),
    }).then(() => {
      alert('Product saved successfully!');
    }).catch((error) => {
      console.error('Error saving product to Firestore:', error);
      alert('Error saving product to Firestore');
    });
    nav('/')
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="fname"
            name="Name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="fname"
            name="category"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
