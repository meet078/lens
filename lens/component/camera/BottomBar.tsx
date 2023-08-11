import { FC } from "react";
import IconButton from "../custom/IconButton";
import { TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../ReactNavigatorProps";


export interface BottomBarProps {
    hide: boolean,
    navigation: NativeStackNavigationProp<RootStackParamList, 'home'>,
}


const BottomBar: FC<BottomBarProps> = ({ hide, navigation }) => {
    return (
        <View>

            <View style={{
                backgroundColor: "#00000055",
                height: 90,
                display: hide ? "none" : "flex",
                alignItems: "flex-start",
                justifyContent: "center"
            }}>
                <IconButton
                    icon={{ value: 'image', size: 40 }}

                    onPress={async () => {
                        const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, selectionLimit: 1, allowsEditing: true });
                        if (!res.canceled)
                            navigation.navigate("imageView", { image: res.assets?.[0] })
                    }}
                />
            </View>
        </View>
    );
}

export default BottomBar;