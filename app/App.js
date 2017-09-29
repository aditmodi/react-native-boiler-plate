import { StackNavigator } from 'react-navigation';
import SignUpScreen from './screens/signUp';
import HomeScreen from './screens/home';
import ProfileScreen from './screens/profile';
import CameraScreen from './screens/camera';
import ImageScreen from './screens/images';
// import LayoutWithoutHeader from './layout/layoutWithoutHeader';
// import LayoutWithHeader from './layout/layoutWithHeader';

const App = StackNavigator({
  Home: { screen: HomeScreen, navigationOptions: { header: null } },
  SignUp: { screen: SignUpScreen, navigationOptions: { header: null } },
  Profile: { screen: ProfileScreen, navigationOptions: { header: null } },
  Camera: { screen: CameraScreen, navigationOptions: { header: null } },
  Images: { screen: ImageScreen, navigationOptions: { header: null } },
});

// const App = StackNavigator({
//   LayoutWithHeader: { screen: LayoutWithHeader, navigationOptions: { header: null } },
//   LayoutWithoutHeader: { screen: LayoutWithoutHeader, navigationOptions: { header: null } }
// })

export default App;
