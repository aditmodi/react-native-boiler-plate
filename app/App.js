import { StackNavigator } from 'react-navigation';
import SignInScreen from './screens/signIn';
import SignUpScreen from './screens/signUp';
import HomeScreen from './screens/home';

export const App = StackNavigator({
  SignIn : { screen: SignInScreen },
  SignUp : { screen: SignUpScreen },
  Home : { screen: HomeScreen }
})
