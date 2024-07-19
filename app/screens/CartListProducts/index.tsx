import React from "react"
import { SafeAreaView, View, Text, FlatList, StyleSheet } from "react-native"
import { connect } from "react-redux"
import { selectListLikesProducts, selectPricesTotalProducts, selectProducts, selectProductsResult } from "../../store/Products"
import { Product } from "../../store/Products/state_init"
import { CardProductRow } from "./components/CardProductRow"
import { formatInReais } from "../../helps/format"


interface PropsCardListProducts {
    list: Array<Product>,
    listLikes: Array<Product>,
    total: Number
}

const Dividir = () => (
    <View style={stylesDividir.container} ></View>
)

const stylesDividir = StyleSheet.create({
    container: {
        height: 0.5,
        backgroundColor: "rgba(0,0,0,0.2)"
    }
})

class CardListProducts extends React.Component<PropsCardListProducts,object>{


    render(): React.ReactNode {

        const { list, listLikes, total } = this.props

        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                   data={listLikes}
                   style={styles.flatList}
                   contentContainerStyle={styles.flatListContainer}
                   keyExtractor={(item,index)=>String(index)}
                   renderItem={({item}) => (
                        <View>
                            <CardProductRow item={item} />
                            <Dividir></Dividir>
                        </View>
                    )}
                />
                <View style={styles.containerFooter}>
                    <Text style={styles.total} >Total: </Text>
                    <Text style={styles.priceTotal} >{formatInReais(total)}</Text>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    flatList: {
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 30,
        marginBottom: 50
    },
    flatListContainer: {
        
    },
    containerFooter: {
        position: "absolute",
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        height: 50,
        bottom: 0,
        left: 0,
        right: 0
    },
    total: {
        fontWeight: "semibold"
    },
    priceTotal: {
        fontWeight: "bold"
    }
})

const mapStateCardListProducts = (state:any,ownProps:any) => {

    return {
        list: selectProducts(state),
        listLikes: selectListLikesProducts(state),
        total: selectPricesTotalProducts(state)
    }
}

export default connect(mapStateCardListProducts,null)(CardListProducts)