import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator
} from "react-native";

import axios from "axios";


export default function RegisterScreen({ navigation }) {


  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [loading,setLoading] = useState(false);



  const register = async()=>{


    if(!name || !email || !password){

      Alert.alert(
        "Error",
        "Please fill all fields"
      );

      return;

    }



    try{


      setLoading(true);



     const response = await axios.post(
  "http://192.168.43.214:5000/api/auth/register",
  {
    name:name,
    email:email,
    password:password
  }
);



      Alert.alert(
        "Success",
        response.data.message
      );


      navigation.navigate("Login");



    }
    catch(error){


      Alert.alert(
        "Register Failed",
        error.response?.data?.message || 
        "Server Error"
      );


    }
    finally{

      setLoading(false);

    }


  };



  return (

    <View style={styles.container}>


      <Text style={styles.logo}>
        🔐 VPN APP
      </Text>


      <Text style={styles.title}>
        Create Account
      </Text>



      <TextInput

        style={styles.input}

        placeholder="Full Name"

        placeholderTextColor="#94A3B8"

        value={name}

        onChangeText={setName}

      />



      <TextInput

        style={styles.input}

        placeholder="Email"

        placeholderTextColor="#94A3B8"

        keyboardType="email-address"

        autoCapitalize="none"

        value={email}

        onChangeText={setEmail}

      />




      <TextInput

        style={styles.input}

        placeholder="Password"

        placeholderTextColor="#94A3B8"

        secureTextEntry

        value={password}

        onChangeText={setPassword}

      />





      <TouchableOpacity

        style={styles.button}

        onPress={register}

      >

        {
          loading ?

          <ActivityIndicator color="white"/>

          :

          <Text style={styles.buttonText}>
            REGISTER
          </Text>
        }


      </TouchableOpacity>





      <TouchableOpacity

        onPress={()=>{
          navigation.navigate("Login")
        }}

      >

        <Text style={styles.login}>
          Already have an account? Login
        </Text>


      </TouchableOpacity>



    </View>

  );

}





const styles = StyleSheet.create({


  container:{

    flex:1,

    backgroundColor:"#0F172A",

    justifyContent:"center",

    padding:25

  },



  logo:{

    color:"#38BDF8",

    fontSize:35,

    fontWeight:"bold",

    textAlign:"center",

    marginBottom:10

  },



  title:{

    color:"white",

    fontSize:26,

    fontWeight:"bold",

    textAlign:"center",

    marginBottom:35

  },



  input:{

    backgroundColor:"#1E293B",

    color:"white",

    padding:15,

    borderRadius:12,

    marginBottom:15,

    fontSize:16

  },



  button:{

    backgroundColor:"#2563EB",

    padding:16,

    borderRadius:12,

    alignItems:"center",

    marginTop:10

  },



  buttonText:{

    color:"white",

    fontSize:18,

    fontWeight:"bold"

  },



  login:{

    color:"#38BDF8",

    textAlign:"center",

    marginTop:25,

    fontSize:15

  }


});