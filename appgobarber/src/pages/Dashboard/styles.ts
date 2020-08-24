import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { Providers } from './types';

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

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 24px;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #ff9000;
  font-family: 'RobotoSlab-Medium';
`;

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

export const ProfileButton = styled.TouchableOpacity``;

export const ProvidersListTitle = styled.Text`
  font-size: 24px;
  margin-bottom: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Providers>)`
  padding: 34px 24px 16px;
`;

export const ProviderContainer = styled(RectButton)`
  background: #3e3b47;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const ProviderImage = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 1000px;
`;

export const ProviderImageContainer = styled.View`
  width: 72px;
  height: 72px;
  justify-content: center;
  align-items: center;

  border: 2px solid #ff9000;
  border-radius: 1000px;
`;

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #f4ede8;
`;

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const ProviderMetaText = styled.Text`
  margin-left: 8px;
  color: #999591;
  font-family: 'RobotoSlab-Regular';
`;
