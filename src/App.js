import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import RNSpeedometer from 'react-native-speedometer'
import axios from 'axios';
import LastValues from './LastValues';

const App = () => {
  const [fng, setFng] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const getDatas = async () => {
    const fngData = await axios.get(
      'https://api.alternative.me/fng/?limit=30',
    );
    setFng(fngData.data);
    setisLoading(false);
  };
  useEffect(() => {
    getDatas();
  }, []);

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  }

  if (isLoading) {
    return <Loading />
  }
  const time = timeConverter(fng.data[0].timestamp)

  const fear = parseInt(fng.data[0].value);
  return (

    <SafeAreaView style={{ flex: 4, backgroundColor: "#8D99AE" }}>
      <View style={styles.container}>
        <View style={styles.title}><Text style={{ fontWeight: "bold", fontSize: 20 }}>{fng.name}</Text></View>
        <View style={styles.title}><Text style={{ fontSize: 16, paddingHorizontal: 12, paddingBottom: 8 }}>Each day, we analyze emotions and sentiments from different sources and crunch them into one simple number: The Fear & Greed Index for Bitcoin and other large cryptocurrencies.</Text></View>
        <View style={styles.title}><Text style={{ fontSize: 16, paddingHorizontal: 12, paddingBottom: 8, fontWeight: "bold" }}>Last Updated: {time}</Text></View>
        <View style={styles.speedo}><RNSpeedometer value={fear} size={300} /></View>
      </View>
      <View style={{ alignSelf: "center" }}><Text style={{ fontWeight: "bold", fontSize: 18 }}>Last 30days</Text></View>
      <ScrollView style={{ backgroundColor: "#8D99AE" }}>

        {
          fng.data.map((value, key) => <LastValues data={value} key={key} />)
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8D99AE",
    paddingTop: 20,
  },
  speedo: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.8,
    shadowRadius: 11.14,

    elevation: 17,
    paddingBottom: 70
  },
  title: {
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  }
})