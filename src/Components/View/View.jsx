import React,{useEffect,useState,useContext} from 'react';
import { collection,where,getDocs,query } from 'firebase/firestore';

import './View.css';
import { PostContext } from '../../Store/PostContext';
import { FirebaseContext } from '../../Store/FirebaseContext';
function View() {
  const [userDetails,setUserDetails] = useState(null)
  const {postDetails} = useContext(PostContext)
  const {app ,db} = useContext(FirebaseContext)
  // useEffect(() => {
  // const {userId} = postDetails
  // firebase.firestore().collection('users').where('id','==',userId).get().then((res)=>{
  //   res.forEach(doc=>{
  //     setUserDetails(doc.data())
  //   })
  // })
  // }, [])
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (postDetails && postDetails.userId) {
        try {
          const { userId } = postDetails;
          console.log('Fetching details for userId:', userId);

          const userRef = collection(db, 'users');
          const q = query(userRef, where('id', '==', userId));
          const querySnapshot = await getDocs(q);
          console.log(querySnapshot,'query snap shot');
          // if (querySnapshot.empty) {
          //   console.log('No matching documents.');
          //   return;
          // }

          querySnapshot.forEach((doc) => {
            console.log( doc.data(),'doc  data ( ) ');
            setUserDetails(doc.data());
          });
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      } else {
        console.warn('No userId in postDetails');
      }
    };

    fetchUserDetails();
  }, [postDetails, db]);
  useEffect(() => {
    console.log('userDetails in view:', userDetails);
  }, [userDetails]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt="image"
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;{postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
       {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
