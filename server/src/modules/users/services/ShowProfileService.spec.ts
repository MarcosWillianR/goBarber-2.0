import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jdoe@example.com',
      password: '123123',
    });

    const showUser = await showProfileService.execute(user.id);

    expect(showUser).toBe(user);
  });

  it('should not be able to show the profile of a non-existing user', async () => {
    await expect(
      showProfileService.execute('non-existing-user-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
