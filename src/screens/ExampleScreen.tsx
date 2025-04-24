import React from 'react';
import { Text, StyleSheet, Pressable, View, TouchableHighlight, FlatList } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    console.log('showRightProgress:', prog.value);
    console.log('appliedTranslation:', drag.value);

    return {
      transform: [{ translateX: drag.value + 100 }],
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <TouchableHighlight
        onPress={() => console.error('pressed!!')}
      >
        <Text style={styles.rightAction}>삭제</Text>
      </TouchableHighlight>
    </Reanimated.View>
  );
}

export default function ExampleScreen() {
  return (
    <GestureHandlerRootView>
      <FlatList
        data={[{ id: '1', text: 'hello' }, { id: '2', text: 'world' }]}
        renderItem={
          ({ item }) =>
        <ReanimatedSwipeable
          containerStyle={styles.swipeable}
          friction={2}
          enableTrackpadTwoFingerGesture
          rightThreshold={40}
          renderRightActions={RightAction}>
          <Text>Swipe me!</Text>
          <Text>Swipe me2</Text>
        </ReanimatedSwipeable>
        }
        keyExtractor={item => item.id}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rightAction: {
    width: 100,
    height: 50,
    backgroundColor: 'red',
    textAlign: 'center',
    textAlignVertical: "center",
    color: 'white',
    fontWeight: '800'
  },
  separator: {
    width: '100%',
    borderTopWidth: 1,
  },
  swipeable: {
    height: 50,
    backgroundColor: 'papayawhip',
    alignItems: 'center',
  },
});

// todo; https://docs.swmansion.com/react-native-gesture-handler/docs/components/reanimated_swipeable/