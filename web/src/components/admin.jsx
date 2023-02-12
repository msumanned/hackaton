import "./admin.css";
import React from 'react'
import { useEffect, useState} from "react";
import axios from "axios";

let baseUrl = "";
if (window.location.href.split(":")[0] === "http") {
  baseUrl = `http://localhost:5001`;
}
else {
  baseUrl = `https://context-api-with-jwt.cyclic.app`;
}



function Admin() {
    const [productName, setproductName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setdescription] = useState("");
    const [unit, setUnit] = useState("");
    const [price, setPrice] = useState("");

    const loginHandler=async (e) => {
        e.preventDefault();


        try {
            let response = await axios.post(`${baseUrl}/api/v1/add`, {
                productName: productName,
                category: category,
                description: description,
                unit: unit,
                price: price,
            });

            console.log("product add successful");
            alert("product add Successfully")
            // setResult("signup successful");
        } catch (e) {
            console.log("e: ", e);
        }
    }

    useEffect(() => {

        // Add a request interceptor
        axios.interceptors.request.use(function (config) {
          // Do something before request is sent
          config.withCredentials = true;
          return config;
        }, function (error) {
          // Do something with request error
          return Promise.reject(error);
        });
    
        // Add a response interceptor
        axios.interceptors.response.use(function (response) {
          // Any status code that lie within the range of 2xx cause this function to trigger
          // Do something with response data
          return response;
        }, function (error) {
          // Any status codes that falls outside the range of 2xx cause this function to trigger
          // Do something with response error
        //   if (error.response.status === 401) {
        //     dispatch({
        //       type: 'USER_LOGOUT'
        //     })
        //   }
          return Promise.reject(error);
        });
      }, [])
    return (

        <div className="maindiv">
            
                <form onSubmit={loginHandler}>
                <h2>Add products</h2>
                <input className="text" type="text" placeholder="item name" onChange={(e) => {
                        setproductName(e.target.value);
                    }}  />
                <select className="text" placeholder='select catecory'onChange={(e) => {
                        setCategory(e.target.value);
                    }} >
                    <option value="Fruit">Fruit</option>
                    <option value="Meet">Chicken</option>
                    <option value="Vagatable">Vagatable</option>
                    <option value="Meet">Meet</option>
                </select>
                <textarea className="text" type="textarea" cols="35" row="7" placeholder="Descrption"onChange={(e) => {
                        setdescription(e.target.value);
                    }} />
                <label className="text">Unit name</label> <input type="text" placeholder="Kg/dozen/liters " onChange={(e) => {
                        setUnit(e.target.value);
                    }} />
                <label className="text">Unit price</label> <input type="text" placeholder="RS 200" onChange={(e) => {
                        setPrice(e.target.value);
                    }} />
                <button  className="add-button" type="submit">Add products </button>
                </form>
            </div>


    )
}

export default Admin


//  onChange={(e) => {
//     setCategory(e.target.value);
// }}