import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import { Providers } from './types';

import api from '../../services/apiClient';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  ProfileImage,
  NoImageProfile,
  ProvidersListTitle,
  ProvidersList,
  ProviderContainer,
  ProviderImage,
  ProviderImageContainer,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
} from './styles';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { navigate } = useNavigation();
  const [providers, setProviders] = useState<Providers[]>([]);

  const navigateToProfile = useCallback(() => navigate('Profile'), [navigate]);
  const navigateToCreateAppointment = useCallback(
    (providerId: string) => navigate('CreateAppointment', { providerId }),
    [navigate],
  );

  useEffect(() => {
    api.get('providers').then(({ data }) => setProviders(data));
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#28262e" />
      <Container>
        <Header>
          <HeaderTitle>
            Bem vindo,
            {'\n'}
            <UserName>{user.name}</UserName>
          </HeaderTitle>

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
          ListHeaderComponent={
            <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
          }
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => navigateToCreateAppointment(provider.id)}
            >
              {provider.avatar_url ? (
                <ProviderImage source={{ uri: provider.avatar_url }} />
              ) : (
                <ProviderImageContainer>
                  <Icon name="user" size={36} color="#ff9000" />
                </ProviderImageContainer>
              )}

              <ProviderInfo>
                <ProviderName>{provider.name}</ProviderName>

                <ProviderMeta>
                  <Icon name="calendar" size={14} color="#ff9000" />
                  <ProviderMetaText>Segunda à sexta</ProviderMetaText>
                </ProviderMeta>

                <ProviderMeta>
                  <Icon name="clock" size={14} color="#ff9000" />
                  <ProviderMetaText>8h às 18h</ProviderMetaText>
                </ProviderMeta>
              </ProviderInfo>
            </ProviderContainer>
          )}
        />
      </Container>
    </>
  );
};

export default Dashboard;
