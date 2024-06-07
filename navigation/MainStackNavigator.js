import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StaffList from '../screens/StaffList';
import AddUpdateProfile from '../screens/AddUpdateProfile';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StaffList">
        <Stack.Screen name="StaffList" component={StaffList} options={{ title: 'Staff List' }} />
        <Stack.Screen name="AddUpdateProfile" component={AddUpdateProfile} options={{ title: 'Add/Update Profile' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
