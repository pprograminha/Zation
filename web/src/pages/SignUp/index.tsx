import { FormHandles } from '@unform/core';
import { tint } from 'polished';
import { useCallback, useRef } from 'react';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import {
  Background,
  Container,
  Content,
  Form,
  FormContainer,
  SameRow,
} from './styles';

interface SignUpFormData {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
}
const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const handleSubmit = useCallback(
    async (credencials: SignUpFormData) => {
      formRef.current?.setErrors({});
      try {
        const schema = yup.object().shape({
          firstname: yup.string().required('your firstname field is required'),
          lastname: yup.string().required('your lastname field is required'),
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

        await api.post('/users', credencials);

        history.push('/');
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [history],
  );
  return (
    <Container>
      <Background />
      <Content>
        <FormContainer>
          <h2>Sign Up</h2>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <SameRow>
              <Input
                icon={{
                  component: FiUser,
                  props: {
                    color: tint(0.1, '#111316'),
                    size: 20,
                  },
                }}
                name="firstname"
                placeholder="Firstname"
              />
              <Input
                icon={{
                  component: FiUser,
                  props: {
                    color: tint(0.1, '#111316'),
                    size: 20,
                  },
                }}
                name="lastname"
                placeholder="Lastname"
              />
            </SameRow>
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
        <Link to="/">
          <FiArrowLeft size={30} />
          Back to log in
        </Link>
      </Content>
    </Container>
  );
};
export default SignIn;
