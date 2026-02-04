export const theme = {
    colors: {
        primary: '#1A73E8',      // Google Blue
        secondary: '#00BFA5',    // Premium Teal
        accent: '#FFAB00',       // Amber Accent
        background: '#F8FAFC',   // Premium Slate Background
        surface: '#FFFFFF',      // Pure White Surface
        text: '#1E293B',         // Deep Slate Text
        textSecondary: '#64748B', // Medium Slate Text
        error: '#EF4444',        // Vibrant Red
        success: '#10B981',      // Vibrant Green
        border: '#E2E8F0',       // Light Slate Border
        white: '#FFFFFF',
        black: '#000000',
        activeTab: '#1A73E8',
        inactiveTab: '#F1F3F4',
        tabTextActive: '#1A73E8',
        tabTextInactive: '#64748B',
        buttonGradient: ['#1A73E8', '#2076C7'],

        // Premium Client Portfolio Specific
        brandBlue: '#2563EB',     // Rich Blue
        brandTeal: '#0D9488',     // Deep Teal
        cardShadow: 'rgba(0, 0, 0, 0.05)',
        tableHeader: '#F8FAFC',
        tableBorder: '#F1F5F9',
        rowAlternate: '#F8FAFC',
        badgeReferralBg: '#EFF6FF',
        badgeReferralText: '#1D4ED8',
        badgeDetailedBg: '#F0FDF4',
        badgeDetailedText: '#15803D',
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
    },
    borderRadius: {
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        round: 100,
    },
    typography: {
        h1: { fontSize: 32, fontWeight: '800', letterSpacing: -0.8, color: '#0F172A' },
        h2: { fontSize: 24, fontWeight: '700', letterSpacing: -0.5 },
        h3: { fontSize: 20, fontWeight: '600', letterSpacing: -0.3 },
        body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
        caption: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
        label: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.2 },
    },
    shadow: {
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    }
};

export default theme;
