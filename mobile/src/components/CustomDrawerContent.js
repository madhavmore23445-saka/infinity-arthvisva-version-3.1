import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, LayoutAnimation, Platform, UIManager } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import theme from '../constants/theme';

// Only enable LayoutAnimation on Android if not using New Architecture
if (Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental &&
    !global.RN$Fabric) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CustomDrawerContent = (props) => {
    const { user, logout } = useAuth();
    const [expandedSections, setExpandedSections] = useState({
        products: false,
        dashboard: true,
        secondary: false,
    });

    const toggleSection = (section) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedSections({
            ...expandedSections,
            [section]: !expandedSections[section],
        });
    };

    const renderHeader = () => (
        <TouchableOpacity
            style={styles.header}
            onPress={() => props.navigation.navigate('Profile')}
        >
            <View style={styles.profileInfo}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{user?.role?.charAt(0) || 'T'}</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.userName}>{user?.adv_id || 'User Name'}</Text>
                    <Text style={styles.viewProfile}>View Profile</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.white} />
            </View>
        </TouchableOpacity>
    );
    {/* <View>

</View> */}
    const renderMenuItem = (label, icon, onPress, isSubItem = false, key) => (
        <TouchableOpacity
            key={key}
            style={[styles.menuItem, isSubItem && styles.subMenuItem]}
            onPress={onPress}
        >
            <Ionicons
                name={icon}
                size={isSubItem ? 18 : 22}
                color={isSubItem ? theme.colors.textSecondary : theme.colors.text}
            />
            <Text style={[styles.menuText, isSubItem && styles.subMenuText]}>{label}</Text>
        </TouchableOpacity>
    );

    const renderCollapsibleSection = (title, icon, sectionKey, items) => (
        <View style={styles.sectionContainer}>
            <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => toggleSection(sectionKey)}
            >
                <View style={styles.sectionTitleRow}>
                    <Ionicons name={icon} size={22} color={theme.colors.primary} />
                    <Text style={styles.sectionTitle}>{title}</Text>
                </View>
                <Ionicons
                    name={expandedSections[sectionKey] ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={theme.colors.textSecondary}
                />
            </TouchableOpacity>

            {expandedSections[sectionKey] && (
                <View style={styles.subItemsContainer}>
                    {items.map((item, index) => (
                        renderMenuItem(
                            item.label,
                            item.icon,
                            () => props.navigation.navigate(item.screen),
                            true,
                            `${sectionKey}-${index}`
                        )
                    ))}
                </View>
            )}
        </View>
    );

    const productsItems = [
        { label: 'Home Loan', icon: 'home-outline', screen: 'HomeLoan' },
        { label: 'Car Loan', icon: 'car-outline', screen: 'CarLoan' },
        { label: 'Insurance', icon: 'shield-checkmark-outline', screen: 'Insurance' },
        { label: 'Mutual Fund', icon: 'trending-up-outline', screen: 'MutualFund' },
        { label: 'Investment', icon: 'wallet-outline', screen: 'Investment' },
    ];

    const dashboardItems = [
        { label: 'Dashboard', icon: 'grid-outline', screen: 'Dashboard' },
        { label: 'Lead Management', icon: 'people-outline', screen: 'LeadManagement' },
        { label: 'Client Portfolio', icon: 'briefcase-outline', screen: 'ClientPortfolio' },
    ];

    const secondaryItems = [
        // { label: 'Client Portfolio', icon: 'briefcase-outline', screen: 'ClientPortfolio' },
        { label: 'Incentives & Payouts', icon: 'cash-outline', screen: 'Incentives' },
        { label: 'Marketing Campaign', icon: 'megaphone-outline', screen: 'Marketing' },
        { label: 'Downloads', icon: 'download-outline', screen: 'Downloads' },
    ];

    const testItems = [
        { label: 'test', icon: 'briefcase-outline', screen: 'Test' },
    ];

    return (
        <View style={{ flex: 1 }}>
            {renderHeader()}
            <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
                {renderCollapsibleSection('Products', 'cube-outline', 'products', productsItems)}
                {renderCollapsibleSection('Dashboard', 'star-outline', 'dashboard', dashboardItems)}
                {renderCollapsibleSection('Secondary', 'options-outline', 'secondary', secondaryItems)}
                {renderCollapsibleSection('Test', 'options-outline', 'test', testItems)}
            </DrawerContentScrollView>

            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Ionicons name="log-out-outline" size={22} color={theme.colors.error} />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        paddingTop: 10,
    },
    header: {
        backgroundColor: theme.colors.primary,
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: theme.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    nameContainer: {
        flex: 1,
        marginLeft: 15,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.white,
    },
    viewProfile: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    sectionContainer: {
        marginBottom: 5,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.surface,
    },
    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text,
    },
    subItemsContainer: {
        backgroundColor: theme.colors.surface,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        gap: 12,
    },
    subMenuItem: {
        paddingLeft: 45,
    },
    menuText: {
        fontSize: 16,
        color: theme.colors.text,
    },
    subMenuText: {
        fontSize: 15,
        color: theme.colors.textSecondary,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        gap: 12,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.error,
    },
});

export default CustomDrawerContent;
