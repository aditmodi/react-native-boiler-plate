import { StackNavigator } from 'react-navigation';
import SignInScreen from './screens/signIn';
import SignUpScreen from './screens/signUp';
import HomeScreen from './screens/home';
import ProfileScreen from './screens/profile';
import CameraScreen from './screens/camera';

const App = StackNavigator({
  Home: { screen: HomeScreen, navigationOptions: { header: null } },
  SignIn: { screen: SignInScreen, navigationOptions: { header: null } },
  SignUp: { screen: SignUpScreen, navigationOptions: { header: null } },
  Profile: { screen: ProfileScreen, navigationOptions: { header: null } },
  Camera: { screen: CameraScreen, navigationOptions: { header: null } }
});

export default App;
