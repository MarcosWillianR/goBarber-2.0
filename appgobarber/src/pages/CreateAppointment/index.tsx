import React, { useEffect, useState, useCallback } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DatePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

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
  ProvidersContainer,
  ProvidersList,
  ProviderContainer,
  ProviderImage,
  ProviderImageContainer,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
} from './styles';

interface RouteParams {
  providerId: string | undefined;
}

const CreateAppointment: React.FC = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedProvider, setSelectedProvider] = useState('');
  const [providers, setProviders] = useState<Providers[]>([]);

  const { params } = useRoute();
  const { user } = useAuth();
  const { navigate, goBack } = useNavigation();

  const navigateToProfile = useCallback(() => navigate('Profile'), [navigate]);

  useEffect(() => {
    const routeParams = params as RouteParams;

    if (routeParams.providerId) {
      setSelectedProvider(routeParams.providerId);
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

  useEffect(() => {
    api.get(`providers/${selectedProvider}/day-availability`, {});
  }, [selectedProvider, selectedDate]);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state);
  }, []);

  const handleSelectedDate = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }

      if (date) {
        setSelectedDate(date);
      }
    },
    [],
  );

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

      <ProvidersContainer>
        <ProvidersList
          data={providers}
          keyExtractor={provider => provider.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              isActive={provider.id === selectedProvider}
              onPress={() => setSelectedProvider(provider.id)}
            >
              {provider.avatar_url ? (
                <ProviderImage source={{ uri: provider.avatar_url }} />
              ) : (
                <ProviderImageContainer
                  isActive={provider.id === selectedProvider}
                >
                  <Icon
                    name="user"
                    size={18}
                    color={
                      provider.id === selectedProvider ? '#3e3b47' : '#ff9000'
                    }
                  />
                </ProviderImageContainer>
              )}

              <ProviderName isActive={provider.id === selectedProvider}>
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersContainer>

      <Calendar>
        <Title>
          Escolha a data
          {showDatePicker ? ' true' : ' false'}
        </Title>

        <OpenDatePickerButton onPress={handleToggleDatePicker}>
          <OpenDatePickerButtonText>
            Selecionar outra data
          </OpenDatePickerButtonText>
        </OpenDatePickerButton>

        {showDatePicker && (
          <DatePicker
            mode="date"
            display="calendar"
            onChange={handleSelectedDate}
            value={selectedDate}
          />
        )}
      </Calendar>
    </Container>
  );
};

export default CreateAppointment;
