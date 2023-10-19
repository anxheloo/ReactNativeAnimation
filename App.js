import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  PanResponder,
} from "react-native";

import { useEffect, useRef } from "react";

export default function App() {
  //1.THis moves the block with a animation. We specify the starting and ending position.
  const position = new Animated.ValueXY({ x: 50, y: 50 });
  const animation = Animated.timing(position, {
    toValue: { x: 170, y: 300 },
    duration: 1000,
    speed: 5,
    bounciness: 5,
    useNativeDriver: true,
  });

  //2. This moves the box by using our fingers, drag and drop similar.
  const pan = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      { dx: position.x, dy: position.y },
    ]),
    onPanResponderRelease: () => {
      // position.setValue({ x: 50, y: 50 });-> this sends the box back to its starting position on release

      //this animate the box back to its starting position
      Animated.spring(position, {
        toValue: { x: 50, y: 50 },
        useNativeDriver: true,
      }).start();
    },
  });

  //3.This rotates the block
  //Less the number of "100" in inputRange, more rotations it will handle.
  const rotate = position.x.interpolate({
    inputRange: [0, 100],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        {...pan.panHandlers}
        style={{
          height: 80,
          width: 80,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
          transform: [
            { translateX: position.x },
            { translateY: position.y },
            { rotate: rotate },
          ],
        }}
      >
        <TouchableOpacity onPress={() => animation.start()}>
          <Text>cnq</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

// export default function App() {
//   const progress = useRef(new Animated.Value(0)).current;
//   const scale = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     Animated.timing(progress, { toValue: 1, useNativeDriver: true }).start();
//     Animated.timing(scale, { toValue: 2, useNativeDriver: true }).start();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Animated.View
//         style={[
//           styles.squareStyle,
//           {
//             borderRadius: 50,
//             opacity: progress,
//             transform: [{ scaleX: scale }, { scaleY: scale }],
//           },
//         ]}
//       ></Animated.View>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  squareStyle: {
    width: 100,
    height: 100,
    backgroundColor: "rgba(0,0,256,0.5)",
  },
});
