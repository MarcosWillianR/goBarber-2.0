import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Container } from './styles';

interface RouteParams {
  providerId: string | undefined;
}

const CreateAppointment: React.FC = () => {
  const { params } = useRoute();
  const [providerId, setProviderId] = useState('');

  useEffect(() => {
    const routeParams = params as RouteParams;

    if (routeParams.providerId) {
      setProviderId(routeParams.providerId);
    }
  }, [params]);

  return <Container />;
};

export default CreateAppointment;
