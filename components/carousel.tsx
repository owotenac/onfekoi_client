import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import { useSharedValue } from "react-native-reanimated";
import { Representation } from '@/model/products';

import React from 'react'
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

const width = Dimensions.get("window").width;

type CarouselImageProps = {
    images : Representation[]
}

const CarouselImage = ({ images }: CarouselImageProps) => {
    
    const data = images

  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

    return (
        <View style={{ flex: 1 , marginBottom: 20}}>
            <Carousel
                ref={ref}
                style={{ width, height: width *0.6}}
                width={width}
                data={data}
                onProgressChange={progress}
                renderItem={({ item, index }) => (
                    // <View
                    //     style={{
                    //         flex: 1,
                    //         borderWidth: 1,
                    //         justifyContent: "center",
                    //     }}
                    // >
                    <Image source={{ uri:  item.locator }} style={styles.image} resizeMode="cover" />
                    // </View>
                )}
            />

            <Pagination.Basic
                progress={progress}
                data={data}
                dotStyle={{ backgroundColor: "rgb(247, 244, 244)", borderRadius: 50 }}
                containerStyle={{ gap: 5, marginTop: 10, marginBottom: 20 }}
                onPress={onPressPagination}
            />
        </View>
    )
}

export default CarouselImage

const styles = StyleSheet.create({
    image : {
        width: width,
        height: 300
    }
})