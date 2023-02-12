import "./App.css";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "./context/context";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import axios from "axios";


// import Home from "./components/home";
import About from "./components/about";
import Gallery from "./components/gallery";
import Login from "./components/login";
import Signup from "./components/signup";
import Content from "./components/content/content";
import Admin from "./components/admin";

// const baseUrl = "http://localhost:5001/api/v1";

let baseUrl = "";
if (window.location.href.split(":")[0] === "http") {
  baseUrl = `http://localhost:5001`;
}
else {
  baseUrl = `https://context-api-with-jwt.cyclic.app`;
}

function App() {
  // const [isLogin, setIsLogin] = useState(false);
  let { state, dispatch } = useContext(GlobalContext);

  const [fullName, setFullName] = useState("");

  const logoutHandler = () => {};

  useEffect(() => {
    // const baseUrl = "http://localhost:5001";

    const getProfile = async () => {
      try {
        let response = await axios.get(`${baseUrl}/api/v1/products`, {
          withCredentials: true,
        });

        console.log("response: ", response);

        dispatch({
          type: "USER_LOGIN",
        });
      } catch (error) {
        console.log("axios error: ", error);

        dispatch({
          type: "USER_LOGOUT",
        });
      }
    };
    getProfile();
  }, []);

  return (
    <div>
      {state.isLogin === true ? (
        <Admin />
      ) : 
      null}
      {state.isLogin === false ? (
        <div className="togglor">
          <ul className="navBar">
            <button className="btn togglor-login">
              <Link to={`/`}>Login</Link>
            </button>

            <button className="btn togglor-signup">
              <Link to={`/signup`}>Signup</Link>
            </button>
          </ul>
        </div>
      ) : null
      }

      {/* {state.isLogin === true ? (
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="about" element={<About />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      ) : null} */}
      {state.isLogin === false ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      ) : null}
      {state.isLogin === null ? (
        <div className="loader">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
            alt="...loading"
          />
        </div>
      ) : null}
    </div>
  );
}

export default App;

// import "./App.css";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import axios from "axios";
// import { useEffect, useState } from "react";

// function App() {
//   const [products, setProducts] = useState([]);
//   const [loadProduct, setLoadProduct] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);

//   const getAllProducts = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5001/products`);
//       console.log("response: ", response.data);

//       setProducts(response.data.data.reverse());
//     } catch (error) {
//       console.log("error in getting all products", error);
//     }
//   };

//   const deleteProduct = async (id) => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:5001/product/${id}`
//       );
//       console.log("response: ", response.data);

//       setLoadProduct(!loadProduct);
//     } catch (error) {
//       console.log("error in getting all products", error);
//     }
//   };

//   const editMode = (product) => {
//     setIsEditMode(!isEditMode);
//     setEditingProduct(product);

//     updateFormik.setFieldValue("productName", product.name);
//     updateFormik.setFieldValue("productPrice", product.price);
//     updateFormik.setFieldValue("productDescription", product.description);
//   };

//   useEffect(() => {
//     getAllProducts();
//   }, [loadProduct]);

//   const myFormik = useFormik({
//     initialValues: {
//       productName: "",
//       productPrice: "",
//       productDescription: "",
//     },
//     validationSchema: yup.object({
//       productName: yup
//         .string("Enter your product name")
//         .required("product name is required")
//         .min(3, "please enter more then 3 characters ")
//         .max(20, "please enter within 20 characters "),

//       productPrice: yup
//         .number("Enter your product price")
//         .positive("enter positive product price")
//         .required("product name is required"),

//       productDescription: yup
//         .string("Enter your product Description")
//         .required("product name is required")
//         .min(3, "please enter more then 3 characters ")
//         .max(500, "please enter within 20 characters "),
//     }),
//     onSubmit: (values) => {
//       console.log("values: ", values);

//       axios
//         .post(`http://localhost:5001/product`, {
//           name: values.productName,
//           price: values.productPrice,
//           description: values.productDescription,
//         })
//         .then((response) => {
//           console.log("response: ", response.data);
//           setLoadProduct(!loadProduct);
//         })
//         .catch((err) => {
//           console.log("error: ", err);
//         });
//     },
//   });
//   const updateFormik = useFormik({
//     initialValues: {
//       productName: "",
//       productPrice: "",
//       productDescription: "",
//     },
//     validationSchema: yup.object({
//       productName: yup
//         .string("Enter your product name")
//         .required("product name is required")
//         .min(3, "please enter more then 3 characters ")
//         .max(20, "please enter within 20 characters "),

//       productPrice: yup
//         .number("Enter your product price")
//         .positive("enter positive product price")
//         .required("product name is required"),

//       productDescription: yup
//         .string("Enter your product Description")
//         .required("product name is required")
//         .min(3, "please enter more then 3 characters ")
//         .max(500, "please enter within 20 characters "),
//     }),
//     onSubmit: (values) => {
//       console.log("values: ", values);

//       axios
//         .put(`http://localhost:5001/product/${editingProduct._id}`, {
//           name: values.productName,
//           price: values.productPrice,
//           description: values.productDescription,
//         })
//         .then((response) => {
//           console.log("response: ", response.data);
//           setLoadProduct(!loadProduct);
//         })
//         .catch((err) => {
//           console.log("error: ", err);
//         });
//     },
//   });

//   return (
//     <div className="container">
//       <nav className="navbar navbar-expand-lg">
//         <div className="container-fluid">
//           <a className="navbar-brand" href="#">
//             E/Commerce
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNavAltMarkup"
//             aria-controls="navbarNavAltMarkup"
//             aria-expanded="false"
//             aria-placeholder="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//             <div className="navbar-nav ms-auto">
//               <a
//                 className="nav-link active my-3 mx-3"
//                 aria-current="page"
//                 href="#"
//               >
//                 Home
//               </a>
//               <a className="nav-link active my-3 mx-3" href="#">
//                 Services
//               </a>
//               <a className="nav-link active my-3 mx-3" href="#">
//                 Pricing
//               </a>
//               <a className="nav-link active my-3 mx-3" href="#">
//                 shop
//               </a>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* ==================================  ======================================= */}

//       <div>
//         <form onSubmit={myFormik.handleSubmit}>
//           <input
//             id="productName"
//             placeholder="Product Name"
//             value={myFormik.values.productName}
//             onChange={myFormik.handleChange}
//           />
//           {myFormik.touched.productName &&
//           Boolean(myFormik.errors.productName) ? (
//             <span style={{ color: "red" }}>{myFormik.errors.productName}</span>
//           ) : null}

//           <br />

//           <input
//             id="productDescription"
//             placeholder="Product Description"
//             value={myFormik.values.productDescription}
//             onChange={myFormik.handleChange}
//           />
//           {myFormik.touched.productDescription &&
//           Boolean(myFormik.errors.productDescription) ? (
//             <span style={{ color: "red" }}>
//               {myFormik.errors.productDescription}
//             </span>
//           ) : null}

//           <br />

//           <input
//             id="productPrice"
//             placeholder="Product Price"
//             value={myFormik.values.productPrice}
//             onChange={myFormik.handleChange}
//           />
//           {myFormik.touched.productPrice &&
//           Boolean(myFormik.errors.productPrice) ? (
//             <span style={{ color: "red" }}>{myFormik.errors.productPrice}</span>
//           ) : null}

//           <br />

//           <button type="submit"> Submit </button>
//         </form>

//         <br />
//         <br />
//         <div>
//           {products.map((eachProduct, i) => (
//             <div
//               className="container"
//               key={i}
//               style={{ padding: "20px", margin: "10px" }}
//             >
//               <div className="card">
//                 <div className="card-body">
//                   <h1 className="card-title">{eachProduct.name}</h1>
//                   <p className="card-text">{eachProduct.description}</p>
//                   <p className="card-title">{eachProduct._id}</p>
//                   <h5 className="card-title">{eachProduct.price}</h5>
//                   <button
//                     onClick={() => {
//                       deleteProduct(eachProduct._id);
//                     }}
//                   >
//                     Delete
//                   </button>
//                   <button
//                     onClick={() => {
//                       editMode(eachProduct);
//                     }}
//                   >
//                     Edit
//                   </button>

//                   {isEditMode && editingProduct._id === eachProduct._id ? (
//                     <div>
//                       <form onSubmit={updateFormik.handleSubmit}>
//                         <input
//                           id="productName"
//                           placeholder="Product Name"
//                           value={updateFormik.values.productName}
//                           onChange={updateFormik.handleChange}
//                         />
//                         {updateFormik.touched.productName &&
//                         Boolean(updateFormik.errors.productName) ? (
//                           <span style={{ color: "red" }}>
//                             {updateFormik.errors.productName}
//                           </span>
//                         ) : null}

//                         <br />

//                         <input
//                           id="productDescription"
//                           placeholder="Product Description"
//                           value={updateFormik.values.productDescription}
//                           onChange={updateFormik.handleChange}
//                         />
//                         {updateFormik.touched.productDescription &&
//                         Boolean(updateFormik.errors.productDescription) ? (
//                           <span style={{ color: "red" }}>
//                             {updateFormik.errors.productDescription}
//                           </span>
//                         ) : null}

//                         <br />

//                         <input
//                           id="productPrice"
//                           placeholder="Product Price"
//                           value={updateFormik.values.productPrice}
//                           onChange={updateFormik.handleChange}
//                         />
//                         {updateFormik.touched.productPrice &&
//                         Boolean(updateFormik.errors.productPrice) ? (
//                           <span style={{ color: "red" }}>
//                             {updateFormik.errors.productPrice}
//                           </span>
//                         ) : null}

//                         <br />

//                         <button type="submit"> Submit </button>
//                       </form>
//                     </div>
//                   ) : null}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
