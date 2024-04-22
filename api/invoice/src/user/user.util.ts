import { UserEntity } from './entities/user.entity';

export const toResponse = (data: UserEntity) => {
  return {
    user_id: data.user_id,
    username: data.username,
    email: data.email,
    created_at: data.created_at,
    updated_at: data.updated_at,
    dob: data.dob,
    verified: data.verified,
  };
};
