import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { Providers } from '../Dashboard/types';

interface ProviderListProps {
  isActive: boolean;
}

export const Container = styled.View`
  flex: 1;
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

export const ProvidersList = styled(FlatList as new () => FlatList<Providers>)`
  padding: 34px 24px 16px;
  margin: 0 12px;
`;

export const ProviderContainer = styled(RectButton)<ProviderListProps>`
  background: ${props => (props.isActive ? '#ff9000' : '#3e3b47')};
  border-radius: 10px;
  padding: 20px;
  margin-right: 16px;
  flex-direction: row;
  align-items: center;
  height: 52px;
`;

export const ProviderImage = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 1000px;
  margin-right: 12px;
`;

export const ProviderImageContainer = styled.View<ProviderListProps>`
  width: 32px;
  height: 32px;
  margin-right: 12px;
  border: 1px solid ${props => (props.isActive ? '#3e3b47' : '#ff9000')};
  border-radius: 1000px;

  align-items: center;
  justify-content: center;
`;

export const ProviderName = styled.Text<ProviderListProps>`
  font-family: 'RobotoSlab-Medium';
  font-size: 14px;
  color: ${props => (props.isActive ? '#3e3b47' : '#f4ede8')};
`;
