import { StackNavigator } from 'react-navigation';
import SignUpScreen from './screens/signUp';
import HomeScreen from './screens/home';
import CameraScreen from './screens/camera';
import ImageScreen from './screens/images';
import MapScreen from './screens/map';
import ProfileView from './screens/profileView';
import EditForm from './screens/editForm';
import ForgotPassScreen from './screens/forgotPass';
import MidWayScreen from './screens/midway';
import reEnterPassScreen from './screens/resetPass';
// import LayoutWithoutHeader from './layout/layoutWithoutHeader';
// import LayoutWithHeader from './layout/layoutWithHeader';

const App = StackNavigator({
  Home: { screen: HomeScreen, navigationOptions: { header: null } },
  SignUp: { screen: SignUpScreen, navigationOptions: { header: null } },
  Camera: { screen: CameraScreen, navigationOptions: { header: null } },
  Images: { screen: ImageScreen, navigationOptions: { header: null } },
  Maps: { screen: MapScreen, navigationOptions: { header: null } },
  ProfileView: { screen: ProfileView, navigationOptions: { header: null } },
  Edit: { screen: EditForm, navigationOptions: { header: null } },
  ForgotPass: { screen: ForgotPassScreen, navigationOptions: { header: null } },
  MidWay: { screen: MidWayScreen, navigationOptions: { header: null } },
  ResetPass: { screen: reEnterPassScreen, navigationOptions: { header: null } },
});

// const App = StackNavigator({
//   LayoutWithHeader: { screen: LayoutWithHeader, navigationOptions: { header: null } },
//   LayoutWithoutHeader: { screen: LayoutWithoutHeader, navigationOptions: { header: null } }
// })

export default App;
