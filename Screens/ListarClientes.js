import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React, { cloneElement, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { TextInput } from 'react-native';

import { collection, getFirestore, query, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
import appFirebase from '../BasedeDatos/Firebase';
const db = getFirestore(appFirebase);

export default function ListarClientes({ navigation }) {
    const [clientes, setClientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [clientesFiltrados, setClientesFiltrados] = useState([]);

    const guardarNuevo = async (nuevo) => {
        await setDoc(doc(db, "Cliente", nuevo.Cedula), nuevo);

    };
    const Eliminar = (Cedula) => {
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
                    onPress: async () => {
                        try {
                            await deleteDoc(doc(db, 'Cliente', Cedula));
                            await cargarClientes(); // Recargar la lista
                            Alert.alert('Eliminado', 'El cliente ha sido eliminado correctamente.');
                        } catch (error) {
                            Alert.alert('Error', 'No se pudo eliminar el cliente. Intenta de nuevo.');
                            console.error('Error eliminando cliente:', error);
                        }
                    }
                }
            ],
            { cancelable: true }
        )
    };
    //
    const buscarCliente = (texto) => {
        setSearchTerm(texto);
        if (texto.trim() === '') {
            setClientesFiltrados(clientes);
            return;
        }

        const resultados = clientes.filter(cliente => {
            const textoLower = texto.toLowerCase();
            return (
                cliente.Cedula.toLowerCase().includes(textoLower) ||
                cliente.Nombres.toLowerCase().includes(textoLower) ||
                cliente.Apellidos.toLowerCase().includes(textoLower) ||
                cliente.FechadeNacimiento.toLowerCase().includes(textoLower) ||
                cliente.Sexo.toLowerCase().includes(textoLower)
            );
        });

        setClientesFiltrados(resultados);
    };
    const cargarClientes = async () => {
        const q = query(collection(db, "Cliente"));
        const querySnapshot = await getDocs(q);
        const lista = [];
        querySnapshot.forEach((doc) => {
            lista.push(doc.data());
        });
        setClientes(lista);
        setClientesFiltrados(lista);
    };
    //
    useFocusEffect(
        useCallback(() => {
            cargarClientes();
        }, [])
    );




    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titulo}>Lista de Clientes</Text>
                <TouchableOpacity style={styles.tbotonf} onPress={() => navigation.navigate('Formulario', { guardarNuevo })}>
                    <AntDesign name="adduser" size={30} color="green" />
                </TouchableOpacity>

            </View>
            <TextInput
                style={{
                    backgroundColor: '#fff',
                    padding: 10,
                    borderRadius: 10,
                    borderColor: '#ccc',
                    borderWidth: 1,
                    marginBottom: 15
                }}
                placeholder="Buscar por cédula, nombre, sexo, etc..."
                value={searchTerm}
                onChangeText={buscarCliente}
            />


            {clientes.length === 0 ? (
                <View style={styles.card}>
                    <Text > No hay clientes registrados.</Text>
                </View>
            ) : (
                <KeyboardAvoidingView //permite scrollear cuando el teclado esta activo y evitar estarce saiendo del teclado para rellenar campos ocultos
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={100}
                >
                    <ScrollView style={styles.lista}>
                        {clientesFiltrados.map((i, index) =>
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
                                    <TouchableOpacity style={styles.tboton} onPress={() => Eliminar(i.Cedula)}>
                                        <MaterialIcons name="delete" size={40} color="red" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.tboton} onPress={() => navigation.navigate('Formulario', { guardarNuevo, clienteEditar: i })}>
                                        <MaterialIcons name="edit" size={40} color="blue" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        ))}
                    </ScrollView>
                </KeyboardAvoidingView>

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