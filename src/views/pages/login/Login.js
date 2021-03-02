import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { GoogleLogin } from 'react-google-login';

const Login = () => {

  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);

  if(user == null) {
    localStorage.clear();
  }
  else{
    return <Redirect to={{
                pathname:'/dashboard',
                state: {user : user}
              }} ></Redirect>
  }

  const failedLoginGoogle = () => {
    let msg = (
      <div className='alert alert-danger' role='alert'>
        Something went wrong, cannot login using google
      </div>
    );

    localStorage.clear();
    setAlert(msg);
    setUser(null);
  }

  const handleLogin = () => {
    const data = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    }
    
    axios.post('login-admin', data).then(
      res => {
        let msg = "";
        if (res.data.status) {
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("userid", res.data.data.user.userid);

          setUser(res.data.data.user);
          setAlert(null);
        }
        else {
          msg = (
            <div className='alert alert-danger' role='alert'>
              {res.data.message}
            </div>
          );

          localStorage.clear();
          setAlert(msg);
          setUser(null);
        }
      }
    ).catch(
      err => {
        let msg = (
          <div className='alert alert-danger' role='alert'>
            {err}
          </div>
        );

        localStorage.clear();
        setAlert(msg);
        setUser(null);
      }
    )
  }

  const handleLoginGoogle = (response) => {
    const data = {
      "accessToken" : response.accessToken
    }
    axios.post('login-google-admin', data).then(
      res => {
        let msg = "";
        if (res.data.status && (res.data.data.user.userid != null)) {
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("userid", res.data.data.user.userid);

          setUser(res.data.data.user);
          setAlert(null);
        }
        else {
          msg = (
            <div className='alert alert-danger' role='alert'>
              {res.data.message}
            </div>
          );

          localStorage.clear();
          setAlert(msg);
          setUser(null);
        }
      }
    ).catch(
      err => {
        let msg = (
          <div className='alert alert-danger' role='alert'>
            {err}
          </div>
        );

        localStorage.clear();
        setAlert(msg);
        setUser(null);
      }
    )
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            {alert}
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" id="username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" id="password" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="12">
                        <CButton onClick={handleLogin} color="primary" className="btn-block" style={{marginBottom:"10px"}}>Login</CButton>
                      </CCol>
                      <CCol xs="12">
                        <GoogleLogin
                            clientId={"705728199948-5738q1qdqp6lots56p0qiic43l3kk237.apps.googleusercontent.com"}
                            buttonText="Log in with Google"
                            onSuccess={handleLoginGoogle}
                            onFailure={failedLoginGoogle}
                            cookiePolicy={'single_host_origin'}
                            className=" btn-block"
                        />
                      </CCol>
                      <CCol xs="12" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
