import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ErrorMessage from "../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux"
import MainScreen from '../../components/MainScreen'
import { login } from "../../actions/userActions"
import './LoginScreen.css'

const LoginScreen = ({ history }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            history.push('/mynotes')
        }
    }, [history, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault();

        dispatch(login(email, password));
    }

    return (
        <div className="mainLogin">
            <MainScreen title="Login" >
                <div className="loginContainer">
                    {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                    {/* {loading && <Loading />} */}
                    <Form onSubmit={submitHandler}>
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
                                type="password"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
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
                            Login
                        </Button>
                    </Form>
                    <Row className='py-3'>
                        <Col>
                            New Customer ? <Link to='/register'>Register Here</Link></Col>
                    </Row>
                </div>
            </MainScreen>
        </div>
    )
}

export default LoginScreen
