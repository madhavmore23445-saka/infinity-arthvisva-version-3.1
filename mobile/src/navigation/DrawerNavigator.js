import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppTabs from './AppTabs';
import CustomDrawerContent from '../components/CustomDrawerContent';
import ProfileScreen from '../screens/ProfileScreen';
import BackButton from '../components/common/BackButton';
// Products
import HomeLoanScreen from '../screens/products/HomeLoanScreen';
import CarLoanScreen from '../screens/products/CarLoanScreen';
import InsuranceScreen from '../screens/products/InsuranceScreen';
import MutualFundScreen from '../screens/products/MutualFundScreen';
import InvestmentScreen from '../screens/products/InvestmentScreen';
// Primary
// import DashboardScreen from '../screens/primary/DashboardScreen';
// import LeadManagementScreen from '../screens/primary/LeadManagementScreen';
// Secondary
// import ClientPortfolioScreen from '../screens/secondary/ClientPortfolioScreen';
import IncentivesScreen from '../screens/secondary/IncentivesScreen';
import MarketingScreen from '../screens/secondary/MarketingScreen';
import DownloadsScreen from '../screens/secondary/DownloadsScreen';

import theme from '../constants/theme';
import TestScreen from '../screens/test/TestScreen';
import LeadManagementScreen from '../screens/dashboard/referral/LeadManagementScreen';
import AddDetailedLeadScreen from '../screens/dashboard/detailed/AddDetailedLeadScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import ClientPortfolioScreen from '../screens/dashboard/clientPortfolio/ClientPortfolioScreen';
import HomeLoanFormScreen from '../screens/dashboard/detailed/forms/HomeLoanFormScreen';
import PersonalLoanFormScreen from '../screens/dashboard/detailed/forms/PersonalLoanFormScreen';
import BusinessLoanFormScreen from '../screens/dashboard/detailed/forms/BusinessLoanFormScreen';
import EducationLoanFormScreen from '../screens/dashboard/detailed/forms/EducationLoanFormScreen';
import MortgageLoanFormScreen from '../screens/dashboard/detailed/forms/MortgageLoanFormScreen';
import SMELoanFormScreen from '../screens/dashboard/detailed/forms/SMELoanFormScreen';
import NRPLoanFormScreen from '../screens/dashboard/detailed/forms/NRPLoanFormScreen';
import VehicleLoanFormScreen from '../screens/dashboard/detailed/forms/VehicleLoanFormScreen';
import LoanAgainstSecuritiesFormScreen from '../screens/dashboard/detailed/forms/LoanAgainstSecuritiesFormScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.background,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.border,
                },
                headerTintColor: theme.colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                drawerStyle: {
                    width: '80%',
                    backgroundColor: theme.colors.background,
                },
            }}
        >
            <Drawer.Screen
                name="MainTabs"
                component={AppTabs}
                options={{
                    title: 'Home',
                    headerTitle: 'Infinity Arhvisva'
                }}
            />


            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: 'My Profile',
                    headerLeft: () => <BackButton />
                }}
            />

            {/* test screen */}
            <Drawer.Screen
                name="Test"
                component={TestScreen}
                options={{
                    title: 'Test Screen',
                    headerLeft: () => <BackButton />
                }}
            />

            {/* Products */}
            <Drawer.Screen
                name="HomeLoan"
                component={HomeLoanScreen}
                options={{
                    title: 'Home Loan',
                    headerLeft: () => <BackButton />
                }}
            />
            <Drawer.Screen
                name="CarLoan"
                component={CarLoanScreen}
                options={{
                    title: 'Car Loan',
                    headerLeft: () => <BackButton />
                }}
            />
            <Drawer.Screen
                name="Insurance"
                component={InsuranceScreen}
                options={{
                    title: 'Insurance',
                    headerLeft: () => <BackButton />
                }}
            />
            <Drawer.Screen
                name="MutualFund"
                component={MutualFundScreen}
                options={{
                    title: 'Mutual Fund',
                    headerLeft: () => <BackButton />
                }}
            />
            <Drawer.Screen
                name="Investment"
                component={InvestmentScreen}
                options={{
                    title: 'Investment',
                    headerLeft: () => <BackButton />
                }}
            />

            {/* Primary */}
            <Drawer.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    title: 'Dashboard',
                    headerLeft: () => <BackButton />
                }}
            />
            <Drawer.Screen
                name="LeadManagement"
                component={LeadManagementScreen}
                options={{
                    title: 'Lead Management',
                    headerLeft: () => <BackButton />
                }}
            />
            <Drawer.Screen
                name="AddDetailedLead"
                component={AddDetailedLeadScreen}
                options={{
                    title: 'Add Detailed Lead',
                    headerShown: false,
                    drawerItemStyle: { display: 'none' }
                }}
            />
            <Drawer.Screen
                name="HomeLoanForm"
                component={HomeLoanFormScreen}
                options={{
                    title: 'Home Loan Application',
                    headerShown: false,
                    drawerItemStyle: { display: 'none' }
                }}
            />
            <Drawer.Screen
                name="PersonalLoanForm"
                component={PersonalLoanFormScreen}
                options={{
                    title: 'Personal Loan Application',
                    headerShown: false,
                    drawerItemStyle: { display: 'none' }
                }}
            />
            <Drawer.Screen
                name="BusinessLoanForm"
                component={BusinessLoanFormScreen}
                options={{
                    title: 'Business Loan Application',
                    headerShown: false,
                    drawerItemStyle: { display: 'none' }
                }}
            />
            <Drawer.Screen
                name="EducationLoanForm"
                component={EducationLoanFormScreen}
                options={{
                    title: 'Education Loan Application',
                    headerShown: false,
                    drawerItemStyle: { display: 'none' }
                }}
            />
            <Drawer.Screen
                name="MortgageLoanForm"
                component={MortgageLoanFormScreen}
                options={{
                    title: 'Mortgage Loan Application',
                    headerShown: false,
                    drawerItemStyle: { display: 'none' }
                }}
            />
            <Drawer.Screen
                name="SMELoanForm"
                component={SMELoanFormScreen}
                options={{
                    title: 'SME Loan Application',
                    headerShown: false,
                    drawerItemStyle: { display: 'none' }
                }}
            />
            <Drawer.Screen
                name="NRPLoanForm"
                component={NRPLoanFormScreen}
                options={{
                    title: 'NRP Loan Application',
                    headerShown: false,
                    drawerItemStyle: { display: 'none' }
                }}
            />
            <Drawer.Screen
                name="VehicleLoanForm"
                component={VehicleLoanFormScreen}
                options={{
                    title: 'Vehicle Loan Application',
                    headerShown: false,
                    drawerItemStyle: { display: 'none' }
                }}
            />
            <Drawer.Screen
                name="LoanAgainstSecuritiesForm"
                component={LoanAgainstSecuritiesFormScreen}
                options={{
                    title: 'Loan Against Securities Application',
                    headerShown: false,
                    drawerItemStyle: { display: 'none' }
                }}
            />

            {/* Secondary */}
            <Drawer.Screen
                name="ClientPortfolio"
                component={ClientPortfolioScreen}
                options={{
                    title: 'Client Portfolio',
                    headerLeft: () => <BackButton />
                }}
            />
            <Drawer.Screen
                name="Incentives"
                component={IncentivesScreen}
                options={{
                    title: 'Incentives & Payouts',
                    headerLeft: () => <BackButton />
                }}
            />
            <Drawer.Screen
                name="Marketing"
                component={MarketingScreen}
                options={{
                    title: 'Marketing Campaign',
                    headerLeft: () => <BackButton />
                }}
            />
            <Drawer.Screen
                name="Downloads"
                component={DownloadsScreen}
                options={{
                    title: 'Downloads',
                    headerLeft: () => <BackButton />
                }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
