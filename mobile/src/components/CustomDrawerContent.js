import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager, Image } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
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
    // Default open sections: Dashboard and Products
    const [expandedSections, setExpandedSections] = useState({
        products: false,
        dashboard: true,
        secondary: false,
    });

    const toggleSection = (section) => {
        // Custom efficient animation config
        LayoutAnimation.configureNext(LayoutAnimation.create(250, 'easeInEaseOut', 'opacity'));
        setExpandedSections({
            ...expandedSections,
            [section]: !expandedSections[section],
        });
    };

    const renderHeader = () => (
        <TouchableOpacity
            style={styles.header}
            onPress={() => props.navigation.navigate('Profile')}
            activeOpacity={0.8}
        >
            <View style={styles.profileContainer}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{user?.role?.charAt(0)?.toUpperCase() || 'U'}</Text>
                </View>
                <View style={styles.userInfo}>
                    <Text style={styles.userName} numberOfLines={1}>{user?.adv_id || 'User ID'}</Text>
                    <Text style={styles.userRole}>{user?.role || 'Advisor'}</Text>
                    <View style={styles.viewProfileBtn}>
                        <Text style={styles.viewProfileText}>View Profile</Text>
                        <Ionicons name="chevron-forward" size={12} color={theme.colors.brandBlue} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderMenuItem = (label, icon, onPress, isSubItem = false, key) => (
        <TouchableOpacity
            key={key}
            style={[styles.menuItem, isSubItem && styles.subMenuItem]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Ionicons
                name={icon}
                size={isSubItem ? 20 : 22}
                color={isSubItem ? theme.colors.textSecondary : theme.colors.text}
                style={{ width: 26 }} // Fixed width for alignment
            />
            <Text style={[styles.menuText, isSubItem && styles.subMenuText]}>{label}</Text>
            {/* Optional chevron for main items if needed, but keeping clean for now */}
        </TouchableOpacity>
    );

    const renderCollapsibleSection = (title, icon, sectionKey, items) => {
        const isOpen = expandedSections[sectionKey];
        return (
            <View style={styles.sectionContainer}>
                <TouchableOpacity
                    style={[styles.sectionHeader, isOpen && styles.sectionHeaderActive]}
                    onPress={() => toggleSection(sectionKey)}
                    activeOpacity={0.7}
                >
                    <View style={styles.sectionTitleRow}>
                        <View style={[styles.iconBox, isOpen && styles.iconBoxActive]}>
                            <Ionicons
                                name={icon}
                                size={20}
                                color={isOpen ? theme.colors.white : theme.colors.brandBlue}
                            />
                        </View>
                        <Text style={[styles.sectionTitle, isOpen && styles.sectionTitleActive]}>{title}</Text>
                    </View>
                    <Ionicons
                        name={isOpen ? "chevron-up" : "chevron-down"}
                        size={18}
                        color={isOpen ? theme.colors.brandBlue : theme.colors.textSecondary}
                    />
                </TouchableOpacity>

                {isOpen && (
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
    };

    const dashboardItems = [
        { label: 'Dashboard', icon: 'grid-outline', screen: 'Dashboard' },
        { label: 'Lead Management', icon: 'people-outline', screen: 'LeadManagement' },
        { label: 'Client Portfolio', icon: 'briefcase-outline', screen: 'ClientPortfolio' },
    ];

    const productsItems = [
        { label: 'Home Loan', icon: 'home-outline', screen: 'HomeLoan' },
        { label: 'Car Loan', icon: 'car-outline', screen: 'CarLoan' },
        { label: 'Insurance', icon: 'shield-checkmark-outline', screen: 'Insurance' },
        { label: 'Mutual Fund', icon: 'trending-up-outline', screen: 'MutualFund' },
        { label: 'Investment', icon: 'wallet-outline', screen: 'Investment' },
    ];

    const secondaryItems = [
        { label: 'Incentives & Payouts', icon: 'cash-outline', screen: 'Incentives' },
        { label: 'Marketing Campaign', icon: 'megaphone-outline', screen: 'Marketing' },
        { label: 'Downloads', icon: 'download-outline', screen: 'Downloads' },
    ];

    return (
        <View style={styles.container}>
            {renderHeader()}

            <DrawerContentScrollView
                {...props}
                contentContainerStyle={styles.drawerContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.menuContainer}>
                    {renderCollapsibleSection('Dashboard', 'apps-outline', 'dashboard', dashboardItems)}
                    {renderCollapsibleSection('Products', 'cube-outline', 'products', productsItems)}
                    {renderCollapsibleSection('Growth', 'rocket-outline', 'secondary', secondaryItems)}
                    {/* Test section removed for production readiness */}
                </View>
            </DrawerContentScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <View style={styles.logoutIconBox}>
                        <Ionicons name="log-out-outline" size={20} color={theme.colors.error} />
                    </View>
                    <Text style={styles.logoutText}>Sign Out</Text>
                </TouchableOpacity>
                <Text style={styles.versionText}>v3.1.0</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    drawerContent: {
        paddingTop: 10,
        paddingBottom: 20,
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 60 : 60,
        paddingBottom: 24,
        paddingHorizontal: 24,
        backgroundColor: theme.colors.white,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: theme.colors.brandBlue,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: theme.colors.brandBlue,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    avatarText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.white,
    },
    userInfo: {
        marginLeft: 16,
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: '700',
        color: theme.colors.text,
        marginBottom: 2,
    },
    userRole: {
        fontSize: 13,
        color: theme.colors.textSecondary,
        marginBottom: 4,
    },
    viewProfileBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewProfileText: {
        fontSize: 12,
        fontWeight: '600',
        color: theme.colors.brandBlue,
        marginRight: 2,
    },
    menuContainer: {
        paddingHorizontal: 16,
        marginTop: 10,
    },
    sectionContainer: {
        marginBottom: 8,
        backgroundColor: theme.colors.white,
        borderRadius: 12,
        overflow: 'hidden', // Clean corners when collapsed
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12, // Active state background matches
    },
    sectionHeaderActive: {
        backgroundColor: '#F1F5F9', // Very subtle active indicator
    },
    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#EFF6FF', // Light blue bg
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBoxActive: {
        backgroundColor: theme.colors.brandBlue,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: theme.colors.text,
    },
    sectionTitleActive: {
        color: theme.colors.primary,
        fontWeight: '700',
    },
    subItemsContainer: {
        paddingTop: 4,
        paddingBottom: 12,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        gap: 12,
    },
    subMenuItem: {
        paddingLeft: 20, // Indent sub-items
        borderLeftWidth: 2,
        borderLeftColor: 'transparent',
        marginLeft: 26, // Align with parent text
    },
    menuText: {
        fontSize: 15,
        color: theme.colors.text,
        fontWeight: '500',
    },
    subMenuText: {
        fontSize: 14,
        color: theme.colors.textSecondary,
    },
    footer: {
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        backgroundColor: theme.colors.white,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    logoutIconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#FEF2F2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutText: {
        fontSize: 15,
        fontWeight: '600',
        color: theme.colors.error,
    },
    versionText: {
        fontSize: 12,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        opacity: 0.5,
    },
});

export default CustomDrawerContent;