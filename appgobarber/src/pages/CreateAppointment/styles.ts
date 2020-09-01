import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background: blue;
`;

export const Header = styled.View`
  padding: ${getStatusBarHeight()}px 24px 24px 24px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  margin-right: 12px;
  padding: 4px;
`;

export const HeaderTitleText = styled.Text`
  color: #f4ede8;
  font-size: 22px;
  font-family: 'RobotoSlab-Regular';
  line-height: 26px;
`;

export const ProfileButton = styled.TouchableOpacity``;

export const ProfileImage = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 1000px;
`;

export const NoImageProfile = styled.View`
  width: 56px;
  height: 56px;
  justify-content: center;
  align-items: center;

  border: 2px solid #ff9000;
  border-radius: 1000px;
`;
