import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 40 : 40}px;
`;

export const Header = styled.View`
  margin-top: 50px;
  flex-direction: row;
  justify-content: center;
`;

export const BackButton = styled.TouchableOpacity`
  margin-right: auto;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-right: 70px;
`;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 1000px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';

  margin: 24px 0;
`;
