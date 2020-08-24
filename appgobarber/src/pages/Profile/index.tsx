import React, { useEffect } from 'react';

import { useAuth } from '../../hooks/auth';
import { Container } from './styles';

const Profile: React.FC = () => {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
  }, [signOut]);
  return <Container />;
};

export default Profile;
