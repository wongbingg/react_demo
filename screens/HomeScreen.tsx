import React, { useState } from 'react';
import {
  View, Button, Text, StyleSheet, BackHandler, ScrollView, ImageBackground, Animated, useWindowDimensions, useAnimatedValue, Platform, Modal, TouchableOpacity,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

const images = new Array(6).fill(
  // 'https://images.unsplash.com/photo-1673678886475-3a2f8c5d0b1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  'https://images.unsplash.com/photo-1556740749-887f6717d7e4'
);
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const CustomAlert = ({ visible, onClose, onConfirm }: { visible: boolean, onClose: () => void, onConfirm: () => void }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertTitle}>로그아웃</Text>
          <Text style={styles.alertMessage}>정말 로그아웃 하시겠습니까?</Text>
          <View style={styles.alertButtons}>
            <TouchableOpacity style={styles.alertButton} onPress={onClose}>
              <Text style={styles.alertButtonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.alertButton, styles.confirmButton]} onPress={onConfirm}>
              <Text style={[styles.alertButtonText, styles.confirmButtonText]}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const [isAlertVisible, setAlertVisible] = useState(false);
  const scrollX = useAnimatedValue(0);
  const { width: windowWidth } = useWindowDimensions();

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => { return true; }) // 뒤로가기 무시
      return () => backHandler.remove();
    }, [])
  );

  const handleLogout = () => {
    setAlertVisible(true);
  }

  const handleLogoutConfirm = () => {
    setAlertVisible(false);
    navigation.goBack()
  }

  const handleProfile = () => {
    navigation.navigate('Profile')
  }

  const { id } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={handleLogout}
          title="Logout"
        />
      ),
    });
  }, [navigation]);

  const Container = Platform.OS === 'ios' ? SafeAreaView : View;

  return (
    <SafeAreaProvider>
      <Container style={styles.container}>
        <View style={styles.scrollContainer}>
          <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { x: scrollX }
                  }
                }
              ])}
            scrollEventThrottle={1}>
            {images.map((image, index) => {
              return (
                <View
                  style={{ width: windowWidth, height: 250 }}
                  key={index}>
                  <ImageBackground source={{ uri: image }} style={styles.card}>
                    <View style={styles.textContainer}>
                      <Text style={styles.infoText}>
                        {'Image - ' + index}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              )
            })}
          </ScrollView>
          <View style={styles.indicatorContainer}>
            {images.map((image, index) => {
              const width = scrollX.interpolate({
                inputRange: [
                  windowWidth * (index - 1),
                  windowWidth * index,
                  windowWidth * (index + 1)
                ],
                outputRange: [8, 16, 8],
                extrapolate: 'clamp'
              });
              return (
                <Animated.View
                  key={index}
                  style={[styles.normalDot, { width }]}
                />
              );
            })}
          </View>

          {/* <View style={styles.container}>
            <Text>안녕하세요, {id} 님</Text>
            <Button title="Profile" onPress={handleProfile} />
          </View> */}
        </View>
        <View style={{ marginTop: 16 }}>
          <Button
            title="Go to Profile"
            onPress={handleProfile} />
        </View>
        <CustomAlert
          visible={isAlertVisible}
          onClose={() => setAlertVisible(false)}
          onConfirm={handleLogoutConfirm}
        />
      </Container>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  alertButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  alertButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#ddd',
  },
  confirmButton: {
    backgroundColor: '#007BFF',
  },
  alertButtonText: {
    fontSize: 16,
    color: 'black',
  },
  confirmButtonText: {
    color: 'white',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0, 0.7)',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
  },
  scrollContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'silver',
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});