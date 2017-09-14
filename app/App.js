import { StackNavigator } from 'react-navigation';
import SignInScreen from './screens/signIn';
import SignUpScreen from './screens/signUp';
import HomeScreen from './screens/home';
import ProfileScreen from './screens/profile';

export const App = StackNavigator({
  Home : { screen: HomeScreen },
  SignIn : { screen: SignInScreen },
  SignUp : { screen: SignUpScreen },
  Profile : { screen: ProfileScreen }
})
