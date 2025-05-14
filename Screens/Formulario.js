import { StyleSheet, Text, View, TextInput, Alert, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform } from 'react-native';



export default function Formulario({ route }) {
    const { guardarNuevo } = route.params;

    const [Cedula, setCedula] = useState('');
    const [Nombres, setNombres] = useState('');
    const [Apellidos, setApellidos] = useState('');
    const [FechadeNacimiento, setFechadeNacimiento] = useState('');
    const [Sexo, setSexo] = useState('');
    const navigation = useNavigation();


    const Guardar = () => {
        if (!Cedula || !Nombres) return (
            Alert.alert('Rellene los campos', `
                 Cedula
                Nombres 
                `
            )
        );
        const nuevocliente = {
            Cedula: Cedula,
            Nombres: Nombres,
            Apellidos: Apellidos,
            FechadeNacimiento: FechadeNacimiento,
            Sexo: Sexo
        }

        guardarNuevo(nuevocliente)
        Alert.alert('Datos almacenados', `
      cedula: ${Cedula}
      nombres: ${Nombres}
      Apellidos: ${Apellidos}
      FechadeNacimiento: ${FechadeNacimiento}
      sexo: ${Sexo}
    `);
        setCedula('');
        setNombres('');
        setApellidos('');
        setFechadeNacimiento('');
        setSexo('');
    };



    return (
        <KeyboardAvoidingView //permite scrollear cuando el teclado esta activo y evitar estarce saiendo del teclado para rellenar campos ocultos
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}
        >
            <ScrollView>
                <View style={styles.container}>


                    <Image style={styles.imagen} source={require('../assets/Imagenes/titulo.png')}></Image>

                    <View>

                        <Text style={styles.label}>Cedula</Text>

                        <TextInput
                            style={styles.input}
                            value={Cedula}
                            onChangeText={setCedula}
                            placeholder='ej: 000-000000-0000A'
                        />

                        <Text style={styles.label}>Nombres</Text>
                        <TextInput
                            style={styles.input}
                            value={Nombres}
                            onChangeText={setNombres}
                            placeholder='ej: Juan Carlos'
                        />
                        <Text style={styles.label}>Apellidos</Text>
                        <TextInput
                            style={styles.input}
                            value={Apellidos}
                            onChangeText={setApellidos}
                            placeholder='ej: Perez Lopes'
                        />
                        <Text style={styles.label}>Fecha de Nacimiento</Text>
                        <TextInput
                            style={styles.input}
                            value={FechadeNacimiento}
                            onChangeText={setFechadeNacimiento}
                            placeholder='ej: YYYY-MM-DD'
                        />
                        <Text style={styles.label}>Sexo</Text>
                        <View style={styles.Picker}>
                            <Picker
                                selectedValue={Sexo}
                                onValueChange={(itemValue) => setSexo(itemValue)}
                            >
                                <Picker.Item label="Selecione..." value="" />
                                <Picker.Item label="Masculino" value="Masculino" />
                                <Picker.Item label="Femenino" value="Femenino" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.boton}>
                        <TouchableOpacity style={styles.tboton} onPress={Guardar}>
                            <Text style={styles.textoboton}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={styles.boton}>
                    <TouchableOpacity style={styles.tboton} onPress={() => navigation.navigate('ListarClientes', { clientes })}>
                        <Text style={styles.textoboton}> lista de clientes</Text>
                    </TouchableOpacity>

                </View> */}

                </View>
            </ScrollView>
        </KeyboardAvoidingView >

    )
}

const styles = StyleSheet.create({
    contenedor: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    label: {
        fontWeight: 'bold',
        marginTop: 15,
        marginLeft: 30
    },
    input: {
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 8,
        padding: 8,
        marginTop: 5,
        borderRadius: 5,
        width: 300,
        height: 55,
        marginLeft: 10,

    },
    Picker: {
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 5,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 15,
        width: 300

    },
    imagen: {
        width: 400,
        height: 200,
        borderColor: "#c2c2c2",
        borderRadius: 10,
        borderWidth: 1,
        marginLeft: 'auto',
        marginRight: "auto",


    },
    boton: {
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 10,

        width: 200,
        height: 50,
        backgroundColor: 'green',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
    },
    textoboton: {
        color: '#fff',

    },
    tboton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    }

})