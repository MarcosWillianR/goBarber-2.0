import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { isToday, format, isAfter, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FiPower, FiUser, FiClock } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.svg';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Avatar,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  AppointmentUserAvatar,
  Calendar,
} from './styles';

import api from '../../services/apiClient';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface AppointmentsItem {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string | null;
  };
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const [appointments, setAppointments] = useState<AppointmentsItem[]>([]);

  const handleDateChange = useCallback((date: Date, modifier: DayModifiers) => {
    if (modifier.available && !modifier.disabled) {
      setSelectedDate(date);
    }
  }, []);

  useEffect(() => {
    api
      .get(`providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  useEffect(() => {
    api
      .get<Omit<AppointmentsItem[], 'hourFormatted'>>('appointments/me', {
        params: {
          day: selectedDate.getDate(),
          month: selectedDate.getMonth() + 1,
          year: selectedDate.getFullYear(),
        },
      })
      .then(response => {
        const formattedAppointments = response.data.map(appointment => ({
          ...appointment,
          hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
        }));

        setAppointments(formattedAppointments);
      });
  }, [selectedDate]);

  const unavailableDays = useMemo(() => {
    return monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(
        ({ day }) =>
          new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day),
      );
  }, [currentMonth, monthAvailability]);

  const headerDayFormatted = useMemo(() => {
    const todayInText = format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
    const weekDayInText = format(selectedDate, 'cccc', { locale: ptBR });

    return { todayInText, weekDayInText };
  }, [selectedDate]);

  const morningAppointments: AppointmentsItem[] = useMemo(() => {
    return appointments.filter(
      appointment => parseISO(appointment.date).getHours() < 12,
    );
  }, [appointments]);

  const afternoonAppointments: AppointmentsItem[] = useMemo(() => {
    return appointments.filter(
      appointment => parseISO(appointment.date).getHours() >= 12,
    );
  }, [appointments]);

  const nextAppointment: AppointmentsItem | undefined = useMemo(() => {
    if (!appointments.length) {
      return undefined;
    }

    return appointments.find(appointment =>
      isAfter(parseISO(appointment.date), new Date()),
    );
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <Avatar url={user.avatar_url}>
              <FiUser />
            </Avatar>
            <div>
              <span>Bem vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{headerDayFormatted.todayInText}</span>
            <span>{headerDayFormatted.weekDayInText}</span>
          </p>

          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Agendamento a seguir</strong>

              <div>
                <AppointmentUserAvatar
                  url={nextAppointment.user.avatar_url || null}
                  size={85}
                  svgSize={44}
                >
                  <FiUser />
                </AppointmentUserAvatar>

                <strong>{nextAppointment.user.name}</strong>

                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>

            {morningAppointments.length ? (
              morningAppointments.map(appointment => {
                return (
                  <Appointment>
                    <span>
                      <FiClock />
                      {appointment.hourFormatted}
                    </span>

                    <div>
                      <AppointmentUserAvatar url={appointment.user?.avatar_url || null}>
                        <FiUser />
                      </AppointmentUserAvatar>

                      <strong>{appointment.user?.name}</strong>
                    </div>
                  </Appointment>
                );
              })
            ) : (
              <strong>Sem agendamentos na parte da manhã</strong>
            )}
          </Section>

          <Section>
            <strong>Tarde</strong>

            {afternoonAppointments.length ? (
              afternoonAppointments.map(ap => {
                return (
                  <Appointment>
                    <span>
                      <FiClock />
                      {ap.hourFormatted}
                    </span>

                    <div>
                      <AppointmentUserAvatar
                        url={ap.user?.avatar_url || null}
                      >
                        <FiUser />
                      </AppointmentUserAvatar>

                      <strong>{ap.user?.name}</strong>
                    </div>
                  </Appointment>
                );
              })
            ) : (
              <strong>Sem agendamentos na parte da tarde</strong>
            )}
          </Section>
        </Schedule>

        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...unavailableDays]}
            modifiers={{
              available: {
                daysOfWeek: [1, 2, 3, 4, 5],
              },
            }}
            onDayClick={handleDateChange}
            onMonthChange={(date: Date) => setCurrentMonth(date)}
            selectedDays={selectedDate}
            fromMonth={new Date()}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
