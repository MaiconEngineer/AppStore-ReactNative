import React from "react"
import { SafeAreaView, View, Text, Image, StyleSheet } from "react-native";
import Animated from "react-native-reanimated"
import { Product } from "../../store/Products/state_init";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../..";
import { formatInReais } from "../../helps/format";

type PropsProductDetail = {
    route: RouteProp<RootStackParamList,'ProductDetail'>
}

class ProductDetail extends React.Component<PropsProductDetail>{

    constructor(props: PropsProductDetail){
        super(props)
    }

    componentDidMount(): void {
        console.log()
    }

    render(): React.ReactNode {

        const { params } = this.props.route
        const { item } = params!

        return (
            <SafeAreaView>
                    <Animated.Image  
                        style={styles.presentation} 
                        source={{
                            uri: item.uri
                        }} >
                        
                    </Animated.Image>
                    <View style={styles.content} >
                        <Text style={styles.title} >{item.title}</Text>
                        <Text style={styles.category} >{item.category}</Text>
                        <Text style={styles.price} >{ formatInReais(item.price)}</Text>
                    </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    presentation: {
        width: "100%",
        height: 240
    },
    content: {
        paddingTop: 20,
        paddingHorizontal: 14
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5
    },
    category: {
        fontSize: 14,
        fontWeight: "semibold",
        opacity: 0.8,
        marginBottom: 10
    },
    price: {
        fontSize: 20,
        fontWeight: "700"
    }
})

export default ProductDetail