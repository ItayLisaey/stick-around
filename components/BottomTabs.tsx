
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';
export const ButtonTabs = (props: BottomTabBarProps) => {
    const tabs = Object.values(props.descriptors);


    return <View style={styles.container}>
        {
            tabs.map((tab, index) => {
                return <View key={index}>
                    {tab.options.tabBarIcon && tab.options.tabBarIcon({ focused: props.state.index === index, color: 'black', size: 24 })}
                    <Text>{tab.route.name}</Text>
                </View>
            })
        }
    </View>

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        zIndex: 1000,
    },

})