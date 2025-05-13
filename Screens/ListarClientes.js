import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Formulario from './Formulario';
// import Formulario from './Formulario'
export default function ListarClientes({ navigation }) {
     const [clientes, setClientes] = useState([]);

    return (
        <View style={styles.container}>
            <Text>ListarClientes</Text>
            <View style={styles.botonformulario}>
                <TouchableOpacity style={styles.tbotonf} onPress={() => navigation.navigate('Formulario',{clientes, setClientes})}>
                    <AntDesign name="adduser" size={50} color="blue" />
                </TouchableOpacity>
            </View>
            {clientes.length === 0 ? (
                <View style={styles.card}>
                    <Text > No hay clientes registrados.</Text>
                </View>
            ) : (
                <ScrollView style={styles.lista}>
                    {clientes.map((i, index) =>
                    (
                        <View key={index} style={styles.card}>

                            <View>
                                <Text style={styles.label}>Cédula:<Text >{i.Cedula}</Text> </Text>
                                <Text style={styles.label}>Nombres:<Text >{i.Nombres}</Text> </Text>
                                <Text style={styles.label}>Apellidos:<Text >{i.Apellidos}</Text> </Text>
                                <Text style={styles.label}>Fecha de nacimiento:<Text > {i.FechaNacimiento}</Text></Text>
                                <Text style={styles.label}>Sexo:<Text >{i.Sexo}</Text> </Text>
                            </View>
                            <View style={styles.botonformulario}>
                                <TouchableOpacity style={styles.tboton} onPress={'Formulario'}>
                                    <MaterialIcons name="delete" size={40} color="red" />
                                </TouchableOpacity>
                            </View>
                        </View>

                    ))}
                </ScrollView>
            )}


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6ffee',
        padding: 15
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'green',
        marginBottom: 15,
        textAlign: 'center'
    },
    card: {
        backgroundColor: '#b2fab4',
        padding: 5,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        marginTop: 5,
    },
    label: {
        fontWeight: 'bold'
    },
    botonformulario: {
        marginLeft: 'auto',
        marginRight: 10,
        width: 50,
        height: 50,


    },
    tbotonf: {


    }


})