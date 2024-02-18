import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import AppBarTab from './AppBarTab';
import theme from '../../theme';

const padding = 20;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.appBar,
    flexDirection: 'row',
    gap: 15,
    padding: padding,
    paddingTop: Constants.statusBarHeight + padding,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab text="Repositories" view="/" />
      <AppBarTab text="Sign in" view="/signin" />
    </View>
  );
};

export default AppBar;
