import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import MetaData from "../Layouts/MetaData/MetaData";
import Loader from "../Layouts/loader/Loader";
import Sidebar from "./Siderbar";
import { createProduct, clearErrors } from "../../actions/productAction";
// import { useHistory } from "react-router-dom";
import { NEW_PRODUCT_RESET } from "../../constants/productsConstants";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CollectionsIcon from "@mui/icons-material/Collections";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InfoIcon from "@mui/icons-material/Info";

import Navbar from "./Navbar";
import "../User/LoginFormStyle.css";
import {
  Avatar,
  TextField,
  Typography,
  FormControl,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function NewProduct() {
  const dispatch = useDispatch();
  // const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector(
    (state) => state.addNewProduct
  );
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [info, setInfo] = useState("")
  const [isCategory, setIsCategory] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageUrls, setImageUrls] = useState([]);

  const handleInputChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleUpload = () => {
    if (imageUrl.trim() !== '') {
      setImageUrls([...imageUrls, imageUrl]);
      setImageUrl('');
    }
  };


  const [toggle, setToggle] = useState(false);
  const user = sessionStorage.getItem("user");

  // const classes = useStyles();
  // togle handler =>
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setIsCategory(true);
  };


  const categories = [
    "Bags",
    "Shoes",
    "Clothing",
    "Accessories",
  ];
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch,
    // alert,
    error,
    navigate,
    success]);



  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    myForm.set("info", info);
    myForm.set("user", JSON.parse(user)._id);

    imageUrls.forEach((currImg) => {
      myForm.append("images", currImg);
    });

    dispatch(createProduct(myForm));
  };



  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"New Product"} />
          <div className="updateProduct">
            <div
              className={"firstBox1"}
            >
              <Sidebar />
            </div >

            <div className="secondBox1">
              <div className="navBar1">
                <Navbar toggleHandler={toggleHandler} />
              </div >

              <div
                className={`formContainer formContainer2`}
              >
                <form
                  className={`form form2`}
                  encType="multipart/form-data"
                  onSubmit={createProductSubmitHandler}
                >
                  <Avatar className="avatar">
                    <AddCircleOutlineIcon />
                  </Avatar>
                  <Typography
                    variant="h5"
                    component="h1"
                    style={{
                      textAlign: "center",
                      marginBottom: "3px",
                      color: "#414141",
                      fontWeight: "bold",
                    }}
                  >
                    Create Product
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    className="nameInput textField"
                    label="Product Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <ShoppingCartOutlinedIcon
                            style={{
                              fontSize: 20,
                              color: "#414141",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    variant="outlined"
                    label="Price"
                    value={price}
                    required
                    fullWidth
                    className="passwordInput textField"
                    onChange={(e) => setPrice(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          style={{
                            fontSize: 20,
                            color: "#414141",
                          }}
                        >
                          <AttachMoneyIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    variant="outlined"
                    label="Stock"
                    value={Stock}
                    required
                    className="passwordInput textField"
                    onChange={(e) => setStock(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          style={{
                            fontSize: 20,
                            color: "#414141",
                          }}
                        >
                          <StorageIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    variant="outlined"
                    label="Product info"
                    value={info}
                    required
                    className="passwordInput textField"
                    onChange={(e) => setInfo(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          style={{
                            fontSize: 20,
                            color: "#414141",
                          }}
                        >
                          <InfoIcon />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <div className="selectOption">
                    {!isCategory && (
                      <Typography variant="body2" style={{
                        color: "#414141",
                        fontSize: "14px",
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        left: "14px",
                        pointerEvents: "none",
                        // opacity: (props) => (props.category ? 0 : 1);
                        transition: "opacity 0.3s ease"
                      }}>
                        Choose Category
                      </Typography>
                    )}
                    <FormControl className="formControl">
                      <Select
                        variant="outlined"
                        fullWidth
                        value={category}
                        onChange={handleCategoryChange}
                        className="select"
                        inputProps={{
                          name: "category",
                          id: "category-select",
                        }}
                        MenuProps={{
                          classes: {
                            // paper: classes.menu,
                          },
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                          },
                          transformOrigin: {
                            vertical: "top",
                            horizontal: "left",
                          },
                          getContentAnchorEl: null,
                        }}
                      >
                        {!category && (
                          <MenuItem value="">
                            <em>Choose Category</em>
                          </MenuItem>
                        )}
                        {
                          categories.map((cate) => (
                            <MenuItem key={cate} value={cate}>
                              {cate}
                            </MenuItem>
                          ))
                        }
                      </Select >
                    </FormControl >
                  </div >
                  <TextField
                    variant="outlined"
                    fullWidth
                    className="descriptionInput"
                    label="Product Description"
                    multiline
                    rows={1}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <DescriptionIcon
                            style={{ marginRight: "1" }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    type="text"
                    variant="outlined"
                    label="Images"
                    className="nameInput textField"
                    placeholder="Enter image URL"
                    value={imageUrl}
                    onChange={handleInputChange}
                  />

                  <Button
                    variant="contained"
                    className="loginButton"
                    onClick={handleUpload}
                  >Upload Image</Button>

                  <Box className="imageArea">
                    {imageUrls &&
                      imageUrls.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt="Product Preview"
                          className="image"
                        />
                      ))}
                  </Box>

                  <Button
                    variant="contained"
                    className="loginButton"
                    fullWidth
                    type="submit"
                    disabled={loading ? true : false}
                  >
                    Create
                  </Button>
                </form>
              </div >
            </div >
          </div >
        </>
      )}
    </>
  );
}
export default NewProduct;
