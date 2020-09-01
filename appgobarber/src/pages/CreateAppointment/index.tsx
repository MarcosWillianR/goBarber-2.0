import React, { useEffect, useState, useCallback } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/apiClient';

import { Providers } from '../Dashboard/types';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTitleContainer,
  BackButton,
  HeaderTitleText,
  ProfileButton,
  ProfileImage,
  NoImageProfile,
} from './styles';

interface RouteParams {
  providerId: string | undefined;
}

const CreateAppointment: React.FC = () => {
  const [providerId, setProviderId] = useState('');
  const [providers, setProviders] = useState<Providers[]>([]);

  const { params } = useRoute();
  const { user } = useAuth();
  const { navigate, goBack } = useNavigation();

  const navigateToProfile = useCallback(() => navigate('Profile'), [navigate]);

  useEffect(() => {
    const routeParams = params as RouteParams;

    if (routeParams.providerId) {
      setProviderId(routeParams.providerId);
    }

    api.get('providers').then(response => {
      const formattedProviders = response.data.map(
        ({ id, avatar_url, name }: Providers) => ({
          id,
          avatar_url,
          name,
        }),
      );

      setProviders(formattedProviders);
    });
  }, [params]);

  return (
    <Container>
      <Header>
        <HeaderTitleContainer>
          <BackButton onPress={() => goBack()}>
            <Icon name="chevron-left" size={24} color="#999591" />
          </BackButton>
          <HeaderTitleText>Cabeleireiros</HeaderTitleText>
        </HeaderTitleContainer>

        {user.avatar_url ? (
          <ProfileButton onPress={navigateToProfile}>
            <ProfileImage source={{ uri: user.avatar_url }} />
          </ProfileButton>
        ) : (
          <ProfileButton onPress={navigateToProfile}>
            <NoImageProfile>
              <Icon name="user" size={36} color="#ff9000" />
            </NoImageProfile>
          </ProfileButton>
        )}
      </Header>
    </Container>
  );
};

export default CreateAppointment;
