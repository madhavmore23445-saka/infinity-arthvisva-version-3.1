import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';
import theme from '../constants/theme';

const MoreScreen = () => {
    const { user, logout } = useAuth();

    return (
        <View style={styles.container}>
<Text>
    more screen
</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.lg,
    }
});

export default MoreScreen;
