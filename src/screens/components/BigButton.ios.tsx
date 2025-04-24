import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface BigButtonProps {
  title: string;
  onPress: () => void;
}

const BigButton: React.FC<BigButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'skyblue',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: 4, // Android 전용 그림자 효과
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default BigButton;