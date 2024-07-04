import React, { useState, useContext, useEffect } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import Heart from '../../assets/Heart';
import './Posts.css';
import { FirebaseContext } from '../../Store/FirebaseContext';
import { PostContext } from '../../Store/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const { app, db } = useContext(FirebaseContext)
  const [products, setProducts] = useState([])
  const {setPostDetails}  =useContext(PostContext)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productList = []
        querySnapshot.forEach((doc) => {
          productList.push({ id: doc.id, ...doc.data() })
          console.log(doc, 'doc in post')
        })

        setProducts(productList);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchProducts()
  }, [])
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {
            products.map((product,index)=>{
            return <div className="card" key={index} onClick={()=>{
              setPostDetails(product)
              navigate('/view')
            }}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt="dfdf" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name" > {product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
            })
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">

          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
