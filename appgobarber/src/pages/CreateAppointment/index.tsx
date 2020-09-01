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
  ProvidersList,
  ProviderContainer,
  ProviderImage,
  ProviderImageContainer,
  ProviderName,
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

      <ProvidersList
        data={providers}
        keyExtractor={provider => provider.id}
        horizontal
        renderItem={({ item: provider }) => (
          <ProviderContainer
            isActive={provider.id === providerId}
            onPress={() => setProviderId(provider.id)}
          >
            {provider.avatar_url ? (
              <ProviderImage source={{ uri: provider.avatar_url }} />
            ) : (
              <ProviderImageContainer isActive={provider.id === providerId}>
                <Icon
                  name="user"
                  size={18}
                  color={provider.id === providerId ? '#3e3b47' : '#ff9000'}
                />
              </ProviderImageContainer>
            )}

            <ProviderName isActive={provider.id === providerId}>
              {provider.name}
            </ProviderName>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default CreateAppointment;
