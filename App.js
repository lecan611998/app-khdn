import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Image, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  RecoveryScreen, SignInScreen, EmpDashboardScreen, PlanFollowDashboardScreen, ExecutePlanDashboardScreen,
  TotalPostpaidScreen, QualitySubScreen, IncurredRevenueScreen, GrowthEnterpriseScreen, TelecommunicationRevenueScreen,
  RetailRevenueScreen, Change4GsimScreen, DeliveringEnterpriseDashboardScreen, DeliveEnterpriseAmountScreen,
  DeliveSubsciberAmountScreen, KAMPTScreen, ProductivitySubScreen, SalaryByMonthDashboardScreen,
  FixedwageScreen, ProductScreen, PlanOutScreen, SanctionsScreen, OthersScreen, AVGIncomeDashboardScreen,
  TotalFixedwageScreen, TotalProductwageScreen, PlanOutOutcomeScreen, OtherOutcomeScreen, SubscriberQualityScreen,
  WarningDashboardScreen, SubFluctScreen, IncomeFluctScreen, EnterpriseFluctScreen, KPIMonthReportScreen,
  ProfileDashboardScreen, UpdatePasswordScreen, UpdateProfileScreen, SignOutScreen, AdminMonthSalaryShopScreen, AdminMonthSalaryEmpScreen, AdminDashboardScreen,
  KPICurrentMonthDashboardScreen, TopAMScreen, GroupKPIScreen, DeliveryListDashboardScreen, DeliveEnterpriseScreen,
  SubsByEnterpriseScreen, RevenueByEnterpriseScreen, ProductivitySubAdminScreen, SalaryByMonthAdminScreen,
  SubscriberQualityAdminDashboardScreen, SumReportStaffScreen, SumReportUnitScreen, AVGIncomeAdminScreen, SumReportUnitShopScreen, SumReportUnitByUnitScreen
  , AdminAVGIncomeShopScreen, AdminAVGIncomeEmpScreen, DeliveEnterpriseDetailScreen, SubsByEnterpriseDetailScreen, RevenueByEnterpriseDetailScreen, BranchProductivitySubScreen,
  ShopProductivitySubScreen,SumReportUnitByEmpScreen
} from './src/screens';

import { colors } from './src/utils/Colors';
import { images } from './src/utils/Images';
import { _retrieveData } from './src/utils/Storage';
import { fontScale } from './src/utils/Fonts';
import { LogBox } from 'react-native';
import Splash from './src/screens/Auth/Splash';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const EMPBottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size, focused }) => {
            return <Image style={{ width: fontScale(size), height: fontScale(size), tintColor: focused == false ? colors.grey : colors.primary }} resizeMode="cover" source={images.user} />
          }
        }} />
      <Tab.Screen
        name="Home"
        component={EMPStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) => {
            return <Image style={{ width: fontScale(size), height: fontScale(size), tintColor: focused == false ? colors.grey : colors.primary }} resizeMode="cover" source={images.home} />
          }
        }} />
      <Tab.Screen
        name="SignOut"
        component={SignOutScreen}
        options={{
          tabBarLabel: 'Logout',
          tabBarIcon: ({ color, size, focused }) => {
            return <Image style={{ width: fontScale(size), height: fontScale(size), tintColor: focused == false ? colors.grey : colors.primary }} resizeMode="cover" source={images.logout} />
          }
        }} />
    </Tab.Navigator>
  );
}

const AdminBottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size, focused }) => {
            return <Image style={{ width: fontScale(size), height: fontScale(size), tintColor: focused == false ? colors.grey : colors.primary }} resizeMode="cover" source={images.user} />
          }
        }} />
      <Tab.Screen
        name="Home"
        component={AdminStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) => {
            return <Image style={{ width: fontScale(size), height: fontScale(size), tintColor: focused == false ? colors.grey : colors.primary }} resizeMode="cover" source={images.home} />
          }
        }} />
      <Tab.Screen
        name="SignOut"
        component={SignOutScreen}
        options={{
          tabBarLabel: 'Logout',
          tabBarIcon: ({ color, size, focused }) => {
            return <Image style={{ width: fontScale(size), height: fontScale(size), tintColor: focused == false ? colors.grey : colors.primary }} resizeMode="cover" source={images.logout} />
          }
        }} />
    </Tab.Navigator>
  );
}

const EMPStack = () => {
  return (
    <Stack.Navigator initialRouteName="EmpDashboardScreen" screenOptions={{ headerShown: false, gestureEnabled: true }} >
      <Stack.Screen name="EmpDashboardScreen" component={EmpDashboardScreen} />

      <Stack.Screen name="PlanFollowDashboard" component={PlanFollowDashboardScreen} />
      <Stack.Screen name="TotalPostpaid" component={TotalPostpaidScreen} />
      <Stack.Screen name="QualitySub" component={QualitySubScreen} />
      <Stack.Screen name="IncurredRevenue" component={IncurredRevenueScreen} />
      <Stack.Screen name="GrowthEnterprise" component={GrowthEnterpriseScreen} />
      <Stack.Screen name="TelecommunicationRevenue" component={TelecommunicationRevenueScreen} />
      <Stack.Screen name="RetailRevenue" component={RetailRevenueScreen} />
      <Stack.Screen name="Change4Gsim" component={Change4GsimScreen} />

      <Stack.Screen name="ExecutePlanDashboard" component={ExecutePlanDashboardScreen} />

      <Stack.Screen name="DeliveringEnterprise" component={DeliveringEnterpriseDashboardScreen} />
      <Stack.Screen name="DeliveEnterpriseAmount" component={DeliveEnterpriseAmountScreen} />
      <Stack.Screen name="DeliveSubsciberAmount" component={DeliveSubsciberAmountScreen} />
      <Stack.Screen name="KAMPT" component={KAMPTScreen} />
      <Stack.Screen name="ProductivitySub" component={ProductivitySubScreen} />
      <Stack.Screen name="SalaryByMonthDashboard" component={SalaryByMonthDashboardScreen} />
      <Stack.Screen name="Fixedwage" component={FixedwageScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="PlanOut" component={PlanOutScreen} />
      <Stack.Screen name="Sanctions" component={SanctionsScreen} />
      <Stack.Screen name="Others" component={OthersScreen} />
      <Stack.Screen name="AVGIncomeDashboard" component={AVGIncomeDashboardScreen} />
      <Stack.Screen name="TotalFixedwage" component={TotalFixedwageScreen} />
      <Stack.Screen name="TotalProductwage" component={TotalProductwageScreen} />
      <Stack.Screen name="PlanOutOutcome" component={PlanOutOutcomeScreen} />
      <Stack.Screen name="OtherOutcome" component={OtherOutcomeScreen} />
      <Stack.Screen name="SubscriberQuality" component={SubscriberQualityScreen} />
      <Stack.Screen name="WarningDashboard" component={WarningDashboardScreen} />
      <Stack.Screen name="SubFluct" component={SubFluctScreen} />
      <Stack.Screen name="IncomeFluct" component={IncomeFluctScreen} />
      <Stack.Screen name="EnterpriseFluct" component={EnterpriseFluctScreen} />
      <Stack.Screen name="KPIMonthReport" component={KPIMonthReportScreen} />



    </Stack.Navigator>
  )
}

const AdminStack = () => {
  return (
    <Stack.Navigator initialRouteName="AdminashboardScreen" screenOptions={{ headerShown: false, gestureEnabled: true }} >

      <Stack.Screen name="AdminDashboardScreen" component={AdminDashboardScreen} />
      <Stack.Screen name="KPICurrentMonthDashboard" component={KPICurrentMonthDashboardScreen} />
      <Stack.Screen name="GroupKPI" component={GroupKPIScreen} />
      <Stack.Screen name="DeliveryListDashboard" component={DeliveryListDashboardScreen} />
      <Stack.Screen name="DeliveEnterprise" component={DeliveEnterpriseScreen} />
      <Stack.Screen name="DeliveEnterpriseDetail" component={DeliveEnterpriseDetailScreen} />

      <Stack.Screen name="SubsByEnterprise" component={SubsByEnterpriseScreen} />
      <Stack.Screen name="SubsByEnterpriseDetail" component={SubsByEnterpriseDetailScreen} />

      <Stack.Screen name="RevenueByEnterprise" component={RevenueByEnterpriseScreen} />
      <Stack.Screen name="RevenueByEnterpriseDetail" component={RevenueByEnterpriseDetailScreen} />

      <Stack.Screen name="ProductivitySubAdmin" component={ProductivitySubAdminScreen} />

      <Stack.Screen name="BranchProductivitySub" component={BranchProductivitySubScreen} />
      <Stack.Screen name="ShopProductivitySub" component={ShopProductivitySubScreen} />

      {/* SalaryByMonthAdmin */}
      <Stack.Screen name="SalaryByMonthAdmin" component={SalaryByMonthAdminScreen} />
      <Stack.Screen name="AdminMonthSalaryShop" component={AdminMonthSalaryShopScreen} />
      <Stack.Screen name="AdminMonthSalaryEmp" component={AdminMonthSalaryEmpScreen} />


      {/* AVGIncomeAdmin */}
      <Stack.Screen name="AVGIncomeAdmin" component={AVGIncomeAdminScreen} />
      <Stack.Screen name="AdminAVGIncomeShop" component={AdminAVGIncomeShopScreen} />
      <Stack.Screen name="AdminAVGIncomeEmp" component={AdminAVGIncomeEmpScreen} />



      <Stack.Screen name="SubscriberQualityAdminDashboard" component={SubscriberQualityAdminDashboardScreen} />
      <Stack.Screen name="SumReportStaff" component={SumReportStaffScreen} />
      <Stack.Screen name="SumReportUnit" component={SumReportUnitScreen} />

      <Stack.Screen name="SumReportUnitShop" component={SumReportUnitShopScreen} />
      <Stack.Screen name="SumReportUnitByUnit" component={SumReportUnitByUnitScreen} />
      <Stack.Screen name="SumReportUnitByEmp" component={SumReportUnitByEmpScreen} />
      <Stack.Screen name="TopAM" component={TopAMScreen} />







    </Stack.Navigator>
  )

}

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileDashboardScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileDashboardScreen" component={ProfileDashboardScreen} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
      <Stack.Screen name="UpdatePassword" component={UpdatePasswordScreen} />

    </Stack.Navigator>
  )
}

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Recovery" component={RecoveryScreen} />
    </Stack.Navigator>
  )
}

export default function App() {
  StatusBar.setBarStyle('light-content', true);
  LogBox.ignoredYellowBox = ["Warning: Each", "Warning: Failed"]

  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="AdminStack" component={AdminStack} />
        <Stack.Screen name="EMPHome" component={EMPBottomTab} options={{ headerShown: false }} />
        <Stack.Screen name="AdminHome" component={AdminBottomTab} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}