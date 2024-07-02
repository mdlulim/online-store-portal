import React, { useState } from 'react';
import { Box, Button, TextField, useMediaQuery, Card, CardContent, Typography } from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import * as yup from "yup";
import AuthService from '../../providers/AuthService'; // Ensure AuthService is correctly imported
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

  const onSubmit = (values, { setSubmitting }) => {
    setLoading(true);
    setDisabled(true);

    const { email, password } = values;

    const device = {
        browser: "browserName", // You might want to use actual browser detection here
        os_name: "osName",      // You might want to use actual OS detection here
        os_version: "osVersion",// You might want to use actual OS version detection here
    };

    const geoLocation = {
        IPv4: "123456" // You might want to use actual IP detection here
    };

    AuthService.login(email, password)
      .then(async (response) => {
        console.log("test ======================================================================");
        console.log(response.data);

        if (response.data.success) {
          //if (response.data.success && response.data.data.admin) {
          SessionProvider.set(response.data.data.jwtToken);

          const role = response.data.data.roles;
          setRole(role);

          window.location = '/dashboard';
        } else {
          setLoading(false);
          setDisabled(false);
          setError(response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
        setLoading(false);
        setDisabled(false);
      });

    setSubmitting(false);
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
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
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
                    error={touched.email && Boolean(errors.email)}
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
                    error={touched.password && Boolean(errors.password)}
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
          {error && (
            <Box mt="20px" textAlign="center">
              <Typography color="error" variant="body1">
                {error}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;