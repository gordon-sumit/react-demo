import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fethData, login} from "../../store/actions/login";
import {useForm} from "react-hook-form";
import {Navigate, useNavigate} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {error} = useSelector((state) => state.root.errorReducer);
    const {userToken} = useSelector((state) => state.root.auth);
    const {
        register,
        watch,
        reset,
        formState: {errors}
        , handleSubmit
    } = useForm({
        reValidateMode: "onSubmit"
    });

    const onSubmit = (data) => {
        dispatch(login(data))
    }

    useEffect(() => {
        if (userToken) {
            navigate('/')
        }
    }, [userToken])

    return (<>
        <Container>
            <h2>Login Here</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...register('email', {required: true})}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" autoComplete="true"
                                  placeholder="Password"  {...register('password', {required: true})}/>
                </Form.Group>
                {error && <p className={'text-danger'}>{error}</p>}
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </Container>
    </>)
}
export default Login;