import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DatePicker from '@react-native-community/datetimepicker';
import { Platform, Alert } from 'react-native';
import { format } from 'date-fns';

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
  Content,
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
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  IsLoadingAvailabilityText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';

interface RouteParams {
  providerId: string | undefined;
}

interface AvailabilityItem {
  available: boolean;
  hour: number;
}

const CreateAppointment: React.FC = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [providers, setProviders] = useState<Providers[]>([]);
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);

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
    if (selectedProvider && selectedDate) {
      setIsLoadingAvailability(true);
      api
        .get<AvailabilityItem[]>(
          `providers/${selectedProvider}/day-availability`,
          {
            params: {
              day: selectedDate.getDate(),
              month: selectedDate.getMonth() + 1,
              year: selectedDate.getFullYear(),
            },
          },
        )
        .then(response => {
          setAvailability(response.data);
          setIsLoadingAvailability(false);
        });
    }
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

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('appointments', { provider_id: selectedProvider, date });

      navigate('AppointmentCreated', { date: date.getTime() });
    } catch (err) {
      Alert.alert(
        'Erro ao criar agendamento',
        'Ocorreu um erro ao tentar realizar o agendamento, tente novamente.',
      );
    }
  }, [navigate, selectedDate, selectedHour, selectedProvider]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => ({
        hour,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        available,
      }));
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => ({
        hour,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        available,
      }));
  }, [availability]);

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

      <Content>
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
          <Title>Escolha a data</Title>

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

        <Schedule>
          <Title>Escolha o horário</Title>

          <Section>
            <SectionTitle>Manhã</SectionTitle>

            <SectionContent>
              {isLoadingAvailability ? (
                <IsLoadingAvailabilityText>
                  Carregando horários da manhã, aguarde...
                </IsLoadingAvailabilityText>
              ) : (
                morningAvailability.map(
                  ({ hourFormatted, available, hour }) => (
                    <Hour
                      onPress={() => handleSelectHour(hour)}
                      enabled={available}
                      selected={selectedHour === hour}
                      available={available}
                      key={hourFormatted}
                    >
                      <HourText selected={selectedHour === hour}>
                        {hourFormatted}
                      </HourText>
                    </Hour>
                  ),
                )
              )}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>

            <SectionContent>
              {isLoadingAvailability ? (
                <IsLoadingAvailabilityText>
                  Carregando horários da tarde, aguarde...
                </IsLoadingAvailabilityText>
              ) : (
                afternoonAvailability.map(
                  ({ hourFormatted, available, hour }) => (
                    <Hour
                      onPress={() => handleSelectHour(hour)}
                      enabled={available}
                      selected={selectedHour === hour}
                      available={available}
                      key={hourFormatted}
                    >
                      <HourText selected={selectedHour === hour}>
                        {hourFormatted}
                      </HourText>
                    </Hour>
                  ),
                )
              )}
            </SectionContent>
          </Section>

          <CreateAppointmentButton onPress={handleCreateAppointment}>
            <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
          </CreateAppointmentButton>
        </Schedule>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
