import MockDate from 'mockdate';
import { isAfter } from 'date-fns';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('listProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );

    MockDate.set(new Date(2020, 7));
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'fake-user-id',
      date: new Date(2020, 7, 21, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'fake-user-id',
      date: new Date(2020, 7, 21, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'fake-user-id',
      date: new Date(2020, 7, 21, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'fake-user-id',
      date: new Date(2020, 7, 21, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'fake-user-id',
      date: new Date(2020, 7, 21, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'fake-user-id',
      date: new Date(2020, 7, 21, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'fake-user-id',
      date: new Date(2020, 7, 21, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'fake-user-id',
      date: new Date(2020, 7, 21, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'fake-user-id',
      date: new Date(2020, 7, 21, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'fake-user-id',
      date: new Date(2020, 7, 21, 17, 0, 0),
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'provider',
      month: 8,
      year: 2020,
    });

    const daysAvailability = Array.from({ length: 31 }, (_, index) => {
      const compareDate = new Date(2020, 7, 21, 23, 59, 59);

      return {
        day: index + 1,
        available: isAfter(compareDate, new Date()) && index + 1 !== 21,
      };
    });

    expect(availability).toEqual(expect.arrayContaining(daysAvailability));
  });
});
