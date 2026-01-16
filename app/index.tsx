import { router } from "expo-router";
import { Text, View , Button, StyleSheet} from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function Index() {

  const products = () => {
            router.push({
            pathname: '/products'
        })
  }
  const poi = () => {
            router.push({
            pathname: '/poi'
        })
  }
  const tours = () => {
            router.push({
            pathname: '/tours'
        })
  }
  const events = () => {
            router.push({
            pathname: '/events'
        })
  }



  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Button 
                title='Products'
                onPress={products}/>
        <Button 
                title='POI'
                onPress={poi}/>
        <Button 
                title='Events'
                onPress={events}/>
        <Button 
                title='Tours'
                onPress={tours}/>


      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#15151D",
    gap: 10
  }
})