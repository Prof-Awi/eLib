import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Permissions from "expo-permissions"
import {BarCodeScanner} from "expo-barcode-scanner"
import { TouchableOpacity } from "react-native-gesture-handler";

export default class TransactionScreen extends Component {
  constructor(){
    super()
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: "",
      domState: "normal"
    }

  }
  getCameraPermissions = async domState =>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermissions: status === "granted",
      domState: domState,
      scanned: false

    })
  }
  handleBarCodeScanned = async({type,data}) =>{
    this.setState({
      scannedData: data,
      domState: "normal",
      scanned: true
    })
  }

  render() {
    const {domState, hasCameraPermissions, scannedData, scanned} = this.state
    if(domState === "scanner"){
    return (
      <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}/>
    )}
    return(
      <View style={styles.container}>
        <Text style={styles.text}>Transaction screens
        {hasCameraPermissions ? scannedData: "Request for Camera permission"}
        </Text>
        <View>
          <TouchableOpacity onPress={()=> this.getCameraPermissions("scanner")}>
            <Text>QR Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  }
});