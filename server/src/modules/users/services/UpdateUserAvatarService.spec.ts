import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john_doe@example.com',
      password: '123123',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatar_filename: 'john_avatar.jpg',
    });

    expect(user.avatar).toBe('john_avatar.jpg');
  });

  it('should not be able to update avatar of an inexistent user', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatar_filename: 'john_avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john_doe@example.com',
      password: '123123',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatar_filename: 'john_avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatar_filename: 'john_new_avatar.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('john_avatar.jpg');
    expect(user.avatar).toBe('john_new_avatar.jpg');
  });
});
