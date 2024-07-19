import { View, Text, Button, StyleSheet, Image, ImageBackground, TouchableNativeFeedback } from "react-native"
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { Product } from "../../../../store/Products/state_init";
import { formatInReais } from "../../../../helps/format";
import { useDispatch } from "react-redux";
import { addQuantiyProduct } from "../../../../store/Products";

export const CardProductRow = ({ item }: { item: Product }) => {

    const dispatch = useDispatch()

    const addQuantity = (typeAction: "plus" | "minus") => {
        dispatch(addQuantiyProduct({ id: item.id, operator: typeAction, quantity: item.quantity }))
    }

    return (
        <View style={styles.container}>
            <ImageBackground 
                style={styles.image} 
                resizeMethod="scale" 
                resizeMode="cover" 
                source={{
                    uri: item.uri
                }}/>
            <View style={styles.content} > 
                <Text style={styles.title} >{item.title}</Text>
                <Text style={styles.category} >{item.category}</Text>
                <View style={styles.contentBottom} >
                    <Text style={styles.price}>{formatInReais(item.price)}</Text>
                    <View style={styles.ButtonAddQuantity} >
                        <TouchableNativeFeedback onPress={() => addQuantity("minus")} >
                            <View style={styles.buttonAddQuantityLeft} >
                                <MaterialCommunityIcon name="minus" size={15}  />
                            </View>
                        </TouchableNativeFeedback>
                        
                        <Text style={styles.buttonAddQuantityCenter} >{String(item.quantity + 1)}</Text>
                        <TouchableNativeFeedback onPress={() => addQuantity("plus")} >
                            <View style={styles.buttonAddQuantityRight} >
                                <MaterialCommunityIcon name="plus" color={"white"} size={18}  />
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 80,
        marginVertical: 20,
        
        borderRadius: 10,
        flexDirection: "row",
    },
    image: {
        width: 90,
        height: 80,
        borderRadius: 12,
        overflow: "hidden"
    },
    content: {
        paddingLeft: 10,
        paddingTop: 10,
        flex: 1
    },
    title: {
        fontSize: 16,
        fontWeight: "bold"
    },
    category: {
        fontSize: 12,
        marginBottom: 3,
        opacity: 0.7
    },
    price: {
        fontSize: 16,
        fontWeight: "700"
    },
    contentBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    ButtonAddQuantity: {
        width: 80,
        height: 30,
        backgroundColor: "white",
        borderRadius: 50,
        alignContent: "center",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: 5,
    },
    buttonAddQuantityLeft: {
        width: 25,
        height: 25,
        borderWidth: 1.5,
        borderColor: 'rgba(0,0,0,0.5)',
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonAddQuantityCenter: {
        fontWeight: "600"
    },
    buttonAddQuantityRight: {
        width: 25,
        height: 25,
        borderWidth: 1.5,
        borderColor: 'rgba(0,0,0,0.5)',
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black"
    },
})