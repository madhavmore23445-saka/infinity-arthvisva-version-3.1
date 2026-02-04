import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
import theme from '../constants/theme';

const HomeScreen = () => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

            {/* 🔹 HERO BANNER */}
            <View style={styles.heroCard}>
                <View style={styles.heroText}>
                    <Text style={styles.heroTitle}>
                        Your financial success is our true achievement
                    </Text>
                    <Text style={styles.heroSubtitle}>
                        End-to-end solutions in Loans, Investments, Insurance & Wealth
                    </Text>

                    <TouchableOpacity style={styles.heroButton}>
                        <Text style={styles.heroButtonText}>Explore Solutions</Text>
                    </TouchableOpacity>
                </View>

                <Image
                    source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135706.png'
                    }}
                    style={styles.heroImage}
                />
            </View>

            {/* 🔹 ACTIVE INFO CARD */}
            <View style={styles.infoCard}>
                <Image
                    source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/1995/1995522.png'
                    }}
                    style={styles.avatar}
                />

                <View style={{ flex: 1 }}>
                    <Text style={styles.infoTitle}>Infinity Arthvishva</Text>
                    <Text style={styles.infoSubtitle}>
                        Loans • Investments • Insurance • Wealth
                    </Text>
                </View>

                <View style={styles.badge}>
                    <Text style={styles.badgeText}>Trusted</Text>
                </View>
            </View>

            {/* 🔹 SECTION HEADER */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Our services</Text>
                <Text style={styles.sectionSubtitle}>
                    We simplify finance and empower your future
                </Text>
            </View>

            {/* 🔹 SERVICES GRID */}
            <View style={styles.grid}>
                {services.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.gridItem}>
                        <Image source={{ uri: item.image }} style={styles.gridImage} />
                        <Text style={styles.gridText}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>

        </ScrollView>
    );
};

const services = [
    {
        title: 'Home Loans',
        image: 'https://cdn-icons-png.flaticon.com/512/619/619153.png'
    },
    {
        title: 'Vehicle Loans',
        image: 'https://cdn-icons-png.flaticon.com/512/741/741407.png'
    },
    {
        title: 'Education Loans',
        image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
    },
    {
        title: 'Business Loans',
        image: 'https://cdn-icons-png.flaticon.com/512/3135/3135679.png'
    },
    {
        title: 'Investments',
        image: 'https://cdn-icons-png.flaticon.com/512/3135/3135706.png'
    },
    {
        title: 'Insurance',
        image: 'https://cdn-icons-png.flaticon.com/512/2966/2966487.png'
    },
        {
        title: 'Health Insurance',
        image: 'https://cdn-icons-png.flaticon.com/512/3135/3135679.png'
    },
        {
        title: 'Life Insurance',
        image: 'https://cdn-icons-png.flaticon.com/512/2966/2966487.png'
    },
        {
        title: 'Car Insurance',
        image: 'https://cdn-icons-png.flaticon.com/512/3135/3135679.png'
    }
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.lg
    },

    /* HERO */
    heroCard: {
        flexDirection: 'row',
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.xl
    },
    heroText: {
        flex: 1
    },
    heroTitle: {
        color: theme.colors.white,
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8
    },
    heroSubtitle: {
        color: '#E0F2FE',
        fontSize: 14,
        marginBottom: 16
    },
    heroButton: {
        borderWidth: 1,
        borderColor: theme.colors.white,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: theme.borderRadius.md,
        alignSelf: 'flex-start'
    },
    heroButtonText: {
        color: theme.colors.white,
        fontWeight: '600'
    },
    heroImage: {
        width: 90,
        height: 90,
        resizeMode: 'contain'
    },

    /* INFO CARD */
    infoCard: {
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
        ...theme.shadow
    },
    avatar: {
        width: 48,
        height: 48,
        marginRight: 12
    },
    infoTitle: {
        fontWeight: '700',
        color: theme.colors.text
    },
    infoSubtitle: {
        fontSize: 13,
        color: theme.colors.textSecondary
    },
    badge: {
        backgroundColor: theme.colors.badgeDetailedBg,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: theme.borderRadius.round
    },
    badgeText: {
        fontSize: 12,
        color: theme.colors.badgeDetailedText,
        fontWeight: '600'
    },

    /* SECTION */
    sectionHeader: {
        marginBottom: theme.spacing.lg
    },
    sectionTitle: {
        ...theme.typography.h3,
        color: theme.colors.text
    },
    sectionSubtitle: {
        color: theme.colors.textSecondary,
        fontSize: 14
    },

    /* GRID */
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    gridItem: {
        width: '30%',
        alignItems: 'center',
        marginBottom: theme.spacing.lg
    },
    gridImage: {
        width: 60,
        height: 60,
        marginBottom: 8
    },
    gridText: {
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'center',
        color: theme.colors.text
    }
});

export default HomeScreen;
