import React, { useState, useEffect} from 'react';
import { Box, Button, TextField, useMediaQuery, Card, CardContent, } from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import * as yup from "yup";
import AuthAervice from '../../providers/AuthService';
import logo from '../../assets/images/logo.png'; 

const initialValues = {
  email: "",
  password: "",
};

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const Login = (props) => {
  const { setRole } = props;
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setDisabled(true);
  
    const form = event.currentTarget;
    const user = form.username.value;
    const password = form.password.value;
  
    const device = {
        browser: browserName,
        os_name: osName,
        os_version: osVersion,
    };
  
    const geoLocation= {
            IPv4: "123456"
        };
        AuthAervice.login(user, password, device,geoLocation).then(async (response) =>{
        if(response.data.success === true && response.data.data.admin === true){
            SessionProvider.set(response.data.data.token);
  
            const role = await UserService.getUserRole(response.data.data.token);
            setRole(role)
  
            window.location = '/dashboard';
        }else{
            setShow(false)
            setLoading(false);
            setDisabled(false);
            setError("Username or password is incorrect");
        }
    }).catch(error => {
        setShow(false)
        setError(error.message);
        setLoading(false);
        setDisabled(false);
    });
  }

  const handleFormSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm({
      values: initialValues,
    });
  };

  return (
    <Box 
       display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{backgroundColor: '#F2F0F0'}}
   >
    <Card sx={{ width: '50%', padding: '20px', backgroundColor: '#fff' }}>
    <CardContent>
          <Box display="flex" justifyContent="center" mb="10px">
            <img src={logo} alt="Logo" style={{ maxWidth: '100px', height: 'auto' }} />
          </Box>
      <Header  
      title="Admin Portal Login" 
      subtitle="login as admin user" 
      sx={{color: '#474d53'}}
       />

      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          onSubmit,
        }) => (
          <form onSubmit={onSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}

            >
              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={touched.email && errors.email}
                helperText={touched.email && errors.email}
                sx={{
                  gridColumn: "span 4",
                  "& .MuiFilledInput-root": {
                    backgroundColor: '#F2F0F0',
                    borderColor: 'gray',
                    color: 'gray',
                    "&:hover": {
                      borderColor: 'gray',
                    },
                    "&.Mui-focused": {
                      borderColor: 'gray',
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: 'gray',
                  },
                  "& .MuiFormHelperText-root": {
                    color: 'gray',
                  },
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={touched.password && errors.password}
                helperText={touched.password && errors.password}
                sx={{
                  gridColumn: "span 4",
                  "& .MuiFilledInput-root": {
                    backgroundColor: '#F2F0F0',
                    borderColor: 'gray',
                    color: 'gray',
                    "&:hover": {
                      borderColor: 'gray',
                    },
                    "&.Mui-focused": {
                      borderColor: 'gray',
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: 'gray',
                  },
                  "& .MuiFormHelperText-root": {
                    color: 'gray',
                  },
                }}
              />
              <Button 
              disabled={disabled}
              type="submit" 
              color="primary" 
              variant="contained"
              size="large"
              sx={{ gridColumn: "span 4", justifySelf: 'center' }}
              >
                 {disabled ? 'Processing request...' : 'Login to account'}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
