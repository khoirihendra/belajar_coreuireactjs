import React, {useState} from 'react'
import { Redirect, Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
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

const Register = () => {

  const [alert, setAlert] = useState(null);

  localStorage.clear();

  const handleSubmit = () => {
    let msg = "";

    //data
    const data = {
      fullname: document.getElementById("fullname").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      confirmPassword: document.getElementById("confirmPassword").value
    }

    //validate confirm password
    let isValid = isPasswordMatched(data.password, data.confirmPassword);

    if (!isValid) {
      msg = (
        <div className='alert alert-danger' role='alert'>
          Confirm password not matched!
        </div>
      );

      setAlert(msg);
      return false;
    }

    //call api
    axios.post("register-admin", data).then(
      res => {
        if (res.data.status) {
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("userid", res.data.data.user.userid);

          msg = (
            <div className='alert alert-success' role='alert'>
              Your account has been created. <Link to={"/login"}>Sign in here</Link>
            </div>
          );
          setAlert(msg);
          
        }
        else {
          msg = (
            <div className='alert alert-danger' role='alert'>
              Something went wrong.
            </div>
          );
          
          setAlert(msg);
        }
      }
    ).catch(
      err => {
        msg = (
          <div className='alert alert-danger' role='alert'>
            Something went wrong.
          </div>
        );
        
        setAlert(msg);
      }
    )
  }

  const isPasswordMatched = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return false;
    }
    else {
      return true;
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
        
          <CCol md="9" lg="7" xl="6">
          {alert}
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" id="username" placeholder="Username" autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" id="fullname" placeholder="Full Name" autoComplete="fullname" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" id="password" placeholder="Password" autoComplete="new-password" />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" id="confirmPassword" placeholder="Confirm password" autoComplete="new-password" />
                  </CInputGroup>
                  <CButton color="success" block onClick={handleSubmit}>Create Account</CButton>
                  <Link to={"/login"}>Already have account? Sign In Here</Link>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
