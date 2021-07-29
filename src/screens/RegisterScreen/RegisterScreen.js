import React, { useEffect, useState } from 'react'
import { Button,Col,Form, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import MainScreen from '../../components/MainScreen'
import { Link } from 'react-router-dom'

import ErrorMessage from "../../components/ErrorMessage";
import { register } from "../../actions/userActions";
import './RegisterScreen.css'

const RegisterScreen = ({history}) => {
    const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const postDetails = (pics) => {
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "note-maker");
      data.append("cloud_name", "dzc10zwow");
      fetch("https://api.cloudinary.com/v1_1/dzc10zwow/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else dispatch(register(name, email, password, pic));
  };
    return (
      <div className="main">
        <MainScreen title="Register">
            <div className="loginContainer">
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {/* {loading && <Loading />} */}
                <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' md={6}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                        type="name"
                        value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='formBasicEmail' md={6}>
                        <Form.Label>Email Id</Form.Label>
                        <Form.Control 
                        type="email"
                        value={email}
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='formBasicPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="passowrd"
                        value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                        type="passowrd"
                        value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='pic'>
                        <Form.Label>Profile Password</Form.Label>
                        <Form.File 
                        onChange={(e) => postDetails(e.target.files[0])}
                        id='custom-file'
                        type="image/png"
                        label="Upload Profile Picture"
                        custom
                        />
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                    {loading && <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />}
                        Register
                    </Button>
                </Form>
                <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
                
            </div>
        </MainScreen>
        </div>
    )
}

export default RegisterScreen
