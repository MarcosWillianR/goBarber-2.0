import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'user1',
      email: 'user1@example.com',
      password: 'password1',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'user2',
      email: 'user2@example.com',
      password: 'password2',
    });

    const exceptUser = await fakeUsersRepository.create({
      name: 'user3',
      email: 'user3@example.com',
      password: 'password3',
    });

    const providers = await listProvidersService.execute(exceptUser.id);

    expect(providers).toEqual([user1, user2]);
  });
});
