import React from 'react'
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid } from '@material-ui/core'
import { useFormik } from 'formik';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            } else if (values.password.length < 6) {
                errors.password = 'Invalid password (minimal 6 sybmols)';
            }
            return errors;
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    })


    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                                target={'_blank'}>here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.errors.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            onBlur={formik.handleBlur}
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.errors.password ? <div style={{ color: 'red' }}>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                name="rememberMe"
                                onChange={formik.handleChange}
                                checked={formik.values.rememberMe}
                            />}

                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}

