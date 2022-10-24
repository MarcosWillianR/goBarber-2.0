import React, { useCallback, useRef, useState, useEffect } from 'react';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { ParsedQs } from 'qs';

import { UrlParser } from '../../utils/UrlParser';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';
import logoImg from '../../assets/logo.svg';

import { Container, AnimationContainer, Content, Background } from './styles';
import { Input, Button } from '../../components/Form';
import api from '../../services/apiClient';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const [locationParamsParsed, setLocationParamsParsed] = useState<ParsedQs>();
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: ResetPasswordFormData) => {
    try {
      setLoading(true);
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        password: Yup.string().required('Senha obrigatória'),
        password_confirmation: Yup.string().oneOf(
          [Yup.ref('password'), null],
          'Confirmação inválida',
        ),
      });

      await schema.validate(data, { abortEarly: false });

      if (!locationParamsParsed?.token) {
        throw new Error();
      }

      const { token } = locationParamsParsed;
      const { password, password_confirmation } = data;

      await api.post('/password/reset', {
        token,
        password,
        password_confirmation,
      });

      addToast({
        title: 'Sucesso!',
        type: 'success',
        description: 'Sua senha foi redefinida com sucesso.',
      });

      history.push('/');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }
    } finally {
      setLoading(false);
    }
  }, [addToast, history, locationParamsParsed]);

  useEffect(() => {
    const parser = UrlParser(location);
    if (parser) setLocationParamsParsed(parser);
  }, [location]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Redefinir senha</h1>

            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Nova senha"
            />
            <Input
              icon={FiLock}
              name="password_confirmation"
              type="password"
              placeholder="Confirmação de Senha"
            />

            <Button loading={loading} type="submit">
              Redefinir
            </Button>
          </Form>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default ResetPassword;
