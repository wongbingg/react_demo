import { StyleSheet, Platform } from 'react-native';

const HomeScreenStyles = StyleSheet.create({
    stretchedItem: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      alignItems: 'center',
      justifyContent: 'center',
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
    container: {
      flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
      // paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    memoList: {
      padding: 16,
    },
    memoItem: {
      backgroundColor: '#fff',
      padding: 16,
      marginBottom: 10,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    memoText: {
      fontSize: 16,
      color: '#333',
    },
    floatingButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: '#007BFF',
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    floatingButtonText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
    },
    modalContainer: {
      height: '80%',
      backgroundColor: '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalContent: {
      fontSize: 16,
      color: '#333',
      marginBottom: 20,
    },
    closeButton: {
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
    },
    closeButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  export default HomeScreenStyles;