import 'react-native';
import React from 'react';
import LoginForm from '../../app/components/loginForm';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <LoginForm/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
