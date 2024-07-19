import React, { useEffect } from "react"
import { SafeAreaView, StatusBar, View, Text, StyleSheet, ScrollView, FlatList, FlatListProps, ListRenderItemInfo, Image, TouchableNativeFeedback, GestureResponderEvent, TouchableWithoutFeedback, ActivityIndicator } from "react-native";

import { useColorScheme } from "react-native"
import { Colors, Header } from "react-native/Libraries/NewAppScreen";

import { createNavigationContainerRef, NavigationContainer, NavigationProp, useNavigation, useNavigationContainerRef } from "@react-navigation/native"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Animated, { useSharedValue, withSpring, withTiming, useAnimatedStyle, withDelay, interpolate, Extrapolation, SharedTransition } from "react-native-reanimated";

import { Action, ThunkDispatch } from "@reduxjs/toolkit"

import {  fetchProductThunk, likeProduct, selectStatusServerProductsList } from "./store/Products/index"

const CardItemProduct = ({item,index,navigation}:{ item: Product, index: number , navigation?: NavigationProp<any,any> }) => {
    
    const dispatch = useDispatch()

    const animatedLike = useSharedValue(1)

    const reanimatedstyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: withSpring(animatedLike.value)  }
            ]
        }
    })

    const handlePressLike = () => {

        animatedLike.value = 1.3
        animatedLike.value = withDelay(500,withTiming(1))

        dispatch(likeProduct({ id: index, index: index }))
    }

    return (
        <TouchableNativeFeedback onPress={()=>{ 
              navigation?.navigate("ProductDetail",{ item: item })
         }}>
        <View style={styleItemProduct.card} >
        
               <Animated.Image 
                 style={styleItemProduct.product}
                 resizeMethod={"auto"}
                 resizeMode={"cover"}
                 source={{
                    uri: item.uri
                 }} />
               <View style={styleItemProduct.content} >
                    <Text style={styleItemProduct.title} >{item.title}</Text>
                    <Text style={styleItemProduct.category}>{item.category}</Text>
                    <Text style={styleItemProduct.price}>{formatInReais(item.price)}</Text>
               </View>  

               <TouchableNativeFeedback style={ styleItemProduct.likeTouch} onPress={handlePressLike} >
               <Animated.View style={[styleItemProduct.like,reanimatedstyle]}>
                   
                       <MaterialCommunityIcons size={25} color={item.like ? "red" : "rgba(0,0,0,0.5)"} name={ item.like ? "cards-heart" : "cards-heart-outline"} />
                  
               </Animated.View>
            </TouchableNativeFeedback>
                
        </View>
        </TouchableNativeFeedback>
)}

const styleItemProduct = StyleSheet.create({
    card: {
        width: '47%',
        height: 200,
        flexDirection: 'column',
        marginBottom: 8,
        position: 'relative'
    },
    product: {
        width: '100%',
        height: 90,
        borderRadius: 14,
    },
    content: {
        paddingHorizontal: 5,
        paddingTop: 10
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5
    },
    category: {
        fontSize: 14,
        fontWeight: "semibold",
        marginBottom: 5,
        opacity: 0.6
    },
    price: {
        fontSize: 16,
        fontWeight: "bold"
    },
    like: {
        width: 40,
        height: 40,
        borderRadius: 50,
        position: 'absolute',
        right: 0,
        bottom: 10,
        backgroundColor: 'rgba(230,230,230,1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    likeTouch: {
    }
})


import { selectProducts } from "./store/Products/index"
import { Product, StatusProduct } from "./store/Products/state_init";

interface PropsProductListScreen {
    navigation?: NavigationProp<any,any>,
    list: Array<Product>,
    status: StatusProduct,
    fetchProducts: () => void
}

class ProductList extends React.Component<PropsProductListScreen,object> {

    constructor(props:PropsProductListScreen){
        super(props)
       
    }

    componentDidMount(): void {
        const { fetchProducts } = this.props
        console.log("Fetch Products Teste.")
        fetchProducts()
    }

    render(): React.ReactNode {
        const { navigation, list, status } = this.props
        
        return (
            <SafeAreaView >
                <StatusBar backgroundColor={Colors.darker} />    
                    {
                        status == "loading" ? (
                                <View style={{ flex : 1, minHeight: "100%" , justifyContent: "center", alignItems: "center" }} >
                                    <ActivityIndicator size={25}/>
                                </View>
                            ) : (
                                <FlatList
                                style={styles.container}
                                data={list}
                                columnWrapperStyle={{justifyContent: 'space-evenly'}}
                                contentContainerStyle={styles.flatListContent}
                                numColumns={2}
                                keyExtractor={(item,index) => String(index)}
                                renderItem={({item,index,separators}:ListRenderItemInfo<any>) => (
                                   <CardItemProduct item={item} index={index} navigation={navigation} />
                                )}
                                /> 
                            )
                    }
            </SafeAreaView>
        )
    }
}

const mapStateProductListProps = (state: any, ownProps:any) => {
    return {
        list: selectProducts(state),
        status: selectStatusServerProductsList(state)
    }
}

const mapDispatchToProps = {
    fetchProducts: fetchProductThunk
}

const ProductListChange = connect(mapStateProductListProps,mapDispatchToProps)(ProductList)

import ProductDetail from "./screens/ProductDetail";
import CardListProducts from "./screens/CartListProducts";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useSelector, connect, useDispatch } from "react-redux"
import { selectProductsResult, selectLikesOfProducts } from "./store/Products";
import { state, StateProduct } from "./store/Products/state_init";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";
import { formatInDollar, formatInReais } from "./helps/format";


const TabBottom = createBottomTabNavigator()
const containerRef = createNavigationContainerRef()

interface PropsHomeScreen {
    navigation?: NavigationProp<any,any>,
    count: Number
}

class Home extends React.Component<PropsHomeScreen,object> {

    constructor(props: PropsHomeScreen){
        super(props)
    }

    componentDidMount(): void {
    }

    render(): React.ReactNode {

        const { count } = this.props
        
        return (
            <TabBottom.Navigator 
            screenOptions={{
                tabBarActiveTintColor: 'rgba(0,122,255,1.00)'
            }} >
            <TabBottom.Screen 
                name="ProductList"
                component={ProductListChange}
                options={{
                    headerShown: false,
                    tabBarIcon: ({color,size}) => {
                        return <MaterialCommunityIcons
                             size={25}
                             name="home"
                             color={color}
                        />
                    }
                }} />
            <TabBottom.Screen 
            name="CardListRroducts"
            component={CardListProducts}
            options={{
                headerShown: false,
                tabBarBadge: String(count),
                tabBarIcon: ({color,size}) => {
                    return <MaterialCommunityIcons
                         size={25}
                         name="cart"
                         color={color}
                    />
                }
            }} />
        </TabBottom.Navigator>
        )
    }
}

const mapStateProps = (state: any,ownProps:any) => {
    return {
        count: selectLikesOfProducts(state)
    }
}

const HomeChange = connect(mapStateProps,null)(Home)

type PropsApp = React.PropsWithChildren<{

}>

export type RootStackParamList = {
    Home: undefined,
    ProductDetail: { item: Product } | undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

class App extends React.Component {

    constructor(props: PropsApp) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <NavigationContainer ref={containerRef} >
                <Stack.Navigator >
                    <Stack.Screen 
                        name="Home"
                        component={HomeChange}
                        options={{
                            headerShown: false
                        }} />
                    <Stack.Screen 
                        name="ProductDetail"
                        component={ProductDetail}
                        options={{
                            headerShown: true
                        }} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: 5
    },
    background: {
        backgroundColor: 'red',
    },
    flatListContent: {
    }
})


export default App