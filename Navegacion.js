import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import Formulario from "./Screens/Formulario";
import ListarClientes from "./Screens/ListarClientes";

import { StyleSheet, Text, View } from 'react-native'


const ListaNavigation = createStackNavigator();

function Stacklistacliente() {
    return (
        <ListaNavigation.Navigator initialRouteName='ListarClientes'>
            <ListaNavigation.Screen name='ListarClientes' component={ListarClientes} />
            <ListaNavigation.Screen name='Formulario' component={Formulario} />
            

        </ListaNavigation.Navigator>
    );
}


export default function Navegacion() {


    return (
        <NavigationContainer>
           <Stacklistacliente/>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})