import { StyleSheet, Text, View } from "react-native";

type MemoCellProps = { title: string };

export const MemoCell = ({ title }: MemoCellProps) => (
  <View style={MemoCellStyles.stretchedItem}>
    <Text>{title}</Text>
  </View>
);

const MemoCellStyles = StyleSheet.create({
    stretchedItem: {
      backgroundColor: 'lightgray',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
})