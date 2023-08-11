/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './ReactNavigatorProps';
import ImageView from './component/ImageView';
import CameraView from './component/CameraView';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, View } from 'react-native';
import TextResult from '@/TextResult';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamList>();
function App(): JSX.Element {
	const [fontsLoaded] = useFonts({
		'MaterialIconsOutlined-Regular': require("./assets/fonts/MaterialIconsOutlined-Regular.otf"),
		'MaterialIcons-Regular': require("./assets/fonts/MaterialIcons-Regular.ttf")
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}
	return (
		<View style={[StyleSheet.absoluteFill]} onLayout={onLayoutRootView}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName='home' screenOptions={{ headerShown: false, statusBarStyle: "auto", statusBarColor: "black", contentStyle: {backgroundColor: "black"}}} >
					<Stack.Screen name='home' component={CameraView}/>
					<Stack.Screen name='imageView' component={ImageView} />
					<Stack.Screen name='textResult' component={TextResult} />
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	);
}

export default App;