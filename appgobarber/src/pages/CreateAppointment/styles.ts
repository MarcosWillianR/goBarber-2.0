import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { Providers } from '../Dashboard/types';

interface ProviderListProps {
  isActive: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: ${getStatusBarHeight() + 24}px 24px 24px 24px;
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

export const Content = styled.ScrollView``;

export const ProvidersContainer = styled.View`
  height: 102px;
  margin-bottom: 24px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Providers>)`
  padding: 34px 0px 16px;
  margin-left: 24px;
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
  font-size: 16px;
  color: ${props => (props.isActive ? '#3e3b47' : '#f4ede8')};
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 24px;
  margin: 0 24px 24px;
`;

export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  background: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`;

export const OpenDatePickerButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #232129;
`;

export const Schedule = styled.View`
  padding: 24px 0 16px;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  margin: 0 24px 12px;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  showsHorizontalScrollIndicator: false,
  horizontal: true,
})``;

export const Hour = styled(RectButton)<HourProps>`
  padding: 12px;
  background: ${props => (props.selected ? '#ff9000' : '#3e3b47')};
  border-radius: 10px;
  margin-right: 8px;
  opacity: ${props => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.Text<HourTextProps>`
  color: ${props => (props.selected ? '#232129' : '#f4ede8')};
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
`;

export const IsLoadingAvailabilityText = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Regular';
  font-size: 14px;
`;

export const CreateAppointmentButton = styled(RectButton)`
  height: 50px;
  background: #ff9000;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px 24px;
`;

export const CreateAppointmentButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #232129;
`;
