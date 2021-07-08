import { FormHandles } from '@unform/core';
import { tint } from 'polished';
import { useCallback, useRef } from 'react';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import useAuthenticate from '../../hooks/useAuthenticate';

import getValidationErrors from '../../utils/getValidationErrors';
import {
  Container,
  Background,
  Content,
  Form,
  FormContainer,
  SameRow,
} from './styles';

interface SignInFormData {
  password: string;
  email: string;
}
const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuthenticate();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (credencials: SignInFormData) => {
      formRef.current?.setErrors({});
      try {
        const schema = yup.object().shape({
          email: yup
            .string()
            .email(`this i'snt a valid email`)
            .required('this email field is required'),
          password: yup
            .string()
            .min(10, 'the minimum number of caracters is 10'),
        });

        await schema.validate(credencials, {
          abortEarly: false,
        });

        await signIn(credencials);

        history.push('/dashboard');
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [signIn, history],
  );
  return (
    <Container>
      <Background />
      <Content>
        <FormContainer>
          <h2>Log In</h2>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              icon={{
                component: FiMail,
                props: {
                  color: tint(0.1, '#111316'),
                  size: 20,
                },
              }}
              name="email"
              placeholder="Email"
            />
            <Input
              icon={{
                component: FiLock,
                props: {
                  color: tint(0.1, '#111316'),
                  size: 20,
                },
              }}
              name="password"
              placeholder="Password"
            />
            <SameRow>
              <Button type="submit">Send</Button>
              <Link to="/forgot-password">Forgot password?</Link>
            </SameRow>
          </Form>
        </FormContainer>
        <Link to="/signup">
          <FiLogIn size={30} />
          Create an account
        </Link>
      </Content>
    </Container>
  );
};
export default SignIn;
