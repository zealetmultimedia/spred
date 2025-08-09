import React from 'react';
import {
  Splash,
  Loader,
  Onboarding,
  Register,
  SignIn,
  ForgotPassword,
  PhoneVerification,
  VerificationSuccessful,
  Success,
  Download,
} from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTab from './BottomTab';
import PlayVideos from '../screens/PlayVideos/PlayVideos';
import Account from '../screens/Account/Account';
import SpredWallet from '../screens/SpredWallet/SpredWallet';
import ConfirmEmail from '../screens/ConfirmEmail';
import ResetPassword from '../screens/ResetPassword';
import PlayDownloadedVideos from '../screens/PlayDownloadedVideo';
import DepositScreen from '../screens/Deposit/Deposit';

const Stack = createStackNavigator();

// @refresh reset
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Loader" component={Loader} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="dashboard" component={BottomTab} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />

      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="PhoneVerification" component={PhoneVerification} />
      <Stack.Screen
        name="VerificationSuccessful"
        component={VerificationSuccessful}
      />
      <Stack.Screen name="Success" component={Success} />
      <Stack.Screen name="PlayVideos" component={PlayVideos} />
      <Stack.Screen
        name="PlayDownloadedVideos"
        component={PlayDownloadedVideos}
      />
      <Stack.Screen name="Download" component={Download} />

      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="SpredWallet" component={SpredWallet} />
      <Stack.Screen name="Deposit" component={DepositScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
