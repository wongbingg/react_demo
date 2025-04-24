import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type CustomNavigationBarRightButtonProps = {
    text: string,
    handler: () => void
}

type CustomNavigationBarProps = {
    title: string;
    isBack: boolean;
    rightButton?: CustomNavigationBarRightButtonProps;
}

const CustomNavigationBar = ({ title, isBack, rightButton }: CustomNavigationBarProps) => {
    const navigation = useNavigation();

    const isDisplay = isBack ? 'flex' : 'none'

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={[styles.backButton, { display: isDisplay }]}
            >
                <Text style={styles.backText}>{"<"}</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity
                onPress={rightButton?.handler}
                style={[styles.rightNavButton, {display: rightButton ? 'flex' : 'none'}]}
            >
                <Text style={{color: 'white'}}>{rightButton?.text}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: 'gray',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        marginRight: 10,
        zIndex: 1,
    },
    rightNavButton: {
        position: 'absolute',
        right: 20,
        zIndex: 1,
    },
    backText: {
        color: '#fff',
        fontSize: 18,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default CustomNavigationBar;