import { StyleSheet } from "react-native";

export const LoginScreenStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#004225', // 배경색 (녹색 계열)
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    logo: {
      width: 300,
      height: 300,
    },
    appName: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#00FF7F', // 밝은 녹색
      marginBottom: 40,
    },
    input: {
      width: '90%',
      height: 50,
      backgroundColor: '#013220', // 어두운 녹색
      borderRadius: 10,
      paddingHorizontal: 15,
      marginBottom: 15,
      color: '#FFFFFF', // 텍스트 색상
      fontSize: 16,
      elevation: 5, // 입체감 추가
      shadowColor: '#000', // 그림자 색상
      shadowOffset: { width: 0, height: 2 }, // 그림자 위치
      shadowOpacity: 0.2, // 그림자 투명도
      shadowRadius: 4, // 그림자 반경
    },
    loginButton: {
      width: '90%',
      height: 50,
      backgroundColor: '#00FF7F', // 밝은 녹색
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      elevation: 5, // 입체감 추가
      shadowColor: '#000', // 그림자 색상
      shadowOffset: { width: 0, height: 2 }, // 그림자 위치
      shadowOpacity: 0.2, // 그림자 투명도
      shadowRadius: 4, // 그림자 반경
    },
    loginButtonText: {
      color: '#004225', // 어두운 녹색
      fontSize: 18,
      fontWeight: 'bold',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '90%',
      marginTop: 20,
    },
    footerText: {
      color: '#A9A9A9', // 회색
      fontSize: 14,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#004225',
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: '#FFFFFF',
    },
  });