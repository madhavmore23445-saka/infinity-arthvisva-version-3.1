import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '../../constants/theme';
// import theme from '../../constants/theme';

const AppHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      {/* Left: Drawer Menu */}
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        style={styles.left}
        activeOpacity={0.7}
      >
        <Ionicons name="menu-outline" size={27} color={theme.colors.text} />
      </TouchableOpacity>

      {/* Center: Logo */}
      <View style={styles.center}>
        <Image
          source={require('../../../assets/images/logo5.png')} // <-- update if needed
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Right: Notification */}
      <TouchableOpacity style={styles.right} activeOpacity={0.7}>
        <Ionicons
          name="notifications-outline"
          size={24}
          color={theme.colors.text}
        />

        {/* Badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>3</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
};

export default AppHeader;


const styles = StyleSheet.create({
  container: {
    marginTop:25,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  left: {
    width: 50,
    marginLeft:17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    height: 30,
    width: 120,
  },
  right: {
    width: 50,
    marginRight:17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 10,
    backgroundColor: '#E53935',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
