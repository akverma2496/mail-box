import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Form, Button, Container, Card } from 'react-bootstrap';
import FormItem from '../components/FormItem';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../store/auth-state/auth-actions';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';

const Signup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector(state => state.auth.loading)

  const handleFormSubmit = async (e) => {

    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Password mismatch!")
      return
    }

    try {
      const result = await dispatch(signUpUser({ email, password })).unwrap();
      toast.success("Account has been created!");
      navigate("/inbox");
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center my-5" style={{ minHeight: '50vh', paddingTop: '100px' }}>
      <Card style={{ width: '24rem' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Create Account</Card.Title>
          <Form onSubmit={handleFormSubmit}>

            <FormItem label={"Email Address"} id={"signupEmail"} type={"email"} placeholder={"Enter email"}
              value={email} onChange={(e) => setEmail(e.target.value.trim())} required />

            <FormItem label={"Password"} id={"signupPassword"} type={"password"} placeholder={"Enter password"}
              value={password} onChange={(e) => setPassword(e.target.value)} required />

            <FormItem label={"Confirm Password"} id={"signupConfirmPassword"} type={"password"} placeholder={"Enter confirm password"}
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? <BeatLoader color="#ffffff" size={10} /> : "Sign Up"}
            </Button>

          </Form>
          <p style={{ textAlign: "center", marginTop: "10px" }}>Have an account? <Link to="/login">Login</Link></p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
