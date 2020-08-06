import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const isPastDate = isBefore(appointmentDate, Date.now());

    const unavailableHour =
      getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17;

    if (isPastDate) {
      throw new AppError(
        "You can't create a new appointment with a past date.",
      );
    }

    if (unavailableHour) {
      throw new AppError(
        'You can only create appointments between 8am and 5pm.',
      );
    }

    if (provider_id === user_id) {
      throw new AppError("You can't create a new appointment with himself.");
    }

    const isDateUnavailable = await this.appointmentsRepository.findByDate(
      appointmentDate,
      provider_id,
    );

    if (isDateUnavailable) {
      throw new AppError('Appointment date is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    this.notificationsRepository.create({
      content: `Novo agendamento para dia ${dateFormatted}`,
      recipient_id: provider_id,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
