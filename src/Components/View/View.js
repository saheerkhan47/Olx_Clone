import React, { useState, useEffect, useContext } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext) || {};  
  const { firebase } = useContext(FirebaseContext);
  

  useEffect(() => {
    console.log('Post details:', postDetails);
    if (postDetails && postDetails.userId) {
      const { userId } = postDetails;

      console.log('Fetching user details for userId:', userId);

      firebase.firestore().collection('user').where('id', '==', userId).get()
      .then((res) => {
          if (!res.empty) {
            res.forEach(doc => {
              console.log('User data fetched:', doc.data()); 
              setUserDetails(doc.data());
            });
            
          } else {
            console.log('No user found for userId:', userId);  
          }
        })
        .catch((err) => {
          console.error('Error fetching user details:', err);  
        });
    }
  }, [postDetails, firebase]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails?.url || "../../../Images/R15V3.jpg"}  
          alt="Product"
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          {postDetails && postDetails.price ? (
            <>
              <p>&#x20B9; {postDetails.price} </p>
              <span>{postDetails.name}</span>
              <p>{postDetails.category}</p>
              <span>{postDetails.createdAt}</span>
            </>
          ) : (
            <p>Loading product details...</p>
          )}
        </div>
        {userDetails ? (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        ) : (
          <p>Loading seller details...</p>
        )}
      </div>
    </div>
  );
}

export default View;
