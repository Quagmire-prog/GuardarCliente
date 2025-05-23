import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

import { collection, getFirestore, query, doc, setDoc, getDocs } from 'firebase/firestore';
import appFirebase from '../BasedeDatos/Firebase';
const db = getFirestore(appFirebase);

export default function ListarClientes({ navigation }) {
    const [clientes, setClientes] = useState([]);
    const guardarNuevo =  async(nuevo) => {
        await setDoc(doc(db,"Cliente",nuevo.Cedula),nuevo);
    };
    const Eliminar = (index) => {
        Alert.alert(
            'Confirmar eliminacion',
            'Estas seguro que deseas eliminar el reguistro?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',

                },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => {
                        const nuevaLista = [...clientes];
                        nuevaLista.splice(index, 1);
                        setClientes(nuevaLista);
                    }
                }
            ],
            { cancelable: true }
        )
    };
    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titulo}>Lista de Clientes</Text>
                <TouchableOpacity style={styles.tbotonf} onPress={() => navigation.navigate('Formulario', { guardarNuevo })}>
                    <AntDesign name="adduser" size={30} color="green" />
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
                                <Text style={styles.label}>#<Text>{index + 1}</Text></Text>
                                <Text style={styles.label}>Cédula:<Text >{i.Cedula}</Text> </Text>
                                <Text style={styles.label}>Nombres:<Text >{i.Nombres}</Text> </Text>
                                <Text style={styles.label}>Apellidos:<Text >{i.Apellidos}</Text> </Text>
                                <Text style={styles.label}>Fecha de nacimiento:<Text > {i.FechadeNacimiento}</Text></Text>
                                <Text style={styles.label}>Sexo:<Text >{i.Sexo}</Text> </Text>
                            </View>
                            <View style={styles.botonformulario}>
                                <TouchableOpacity style={styles.tboton} onPress={Eliminar}>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#d6f5d6',
        padding: 10,
        borderRadius: 10,
        marginBottom: 15,
    },

    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',
    },

    tbotonf: {
        backgroundColor: '#ccffcc',
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'green'
    }




})