import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router';
import { Form, Button, Container, Card } from 'react-bootstrap';
import FormItem from '../components/FormItem';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { loginUser } from '../store/auth-state/auth-actions';
import { setUpEmailState } from '../store/email-state/email-actions';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isLoggedIn, loading} = useSelector(state => state.auth)

  if (isLoggedIn) {
    return <Navigate to="/inbox" replace />;
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      dispatch(setUpEmailState(email))
      toast.success("Logged In Successfully!");
      navigate("/inbox", { replace: true });
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center my-5" style={{ minHeight: '50vh', paddingTop: '100px' }}>
      <Card style={{ width: '24rem' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Login</Card.Title>
          <Form onSubmit={handleFormSubmit}>

            <FormItem label={"Email Address"} id={"loginEmail"} type={"email"} placeholder={"Enter email"}
              value={email} onChange={(e) => setEmail(e.target.value.trim())} required />

            <FormItem label={"Password"} id={"loginPassword"} type={"password"} placeholder={"Enter password"}
              value={password} onChange={(e) => setPassword(e.target.value)} required />

            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? <BeatLoader color="#ffffff" size={10} /> : "Login"}
            </Button>

          </Form>
          <p style={{ textAlign: "center", marginTop: "10px" }}>Don't have an account? <Link to="/signup">Signup</Link></p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
