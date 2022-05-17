import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

let timer = null;
let seconds = 0;
let minutes = 0;
let hours = 0;

const App = () => {
  const [startTime, setStartTime] = useState(0);
  const [button, setButton] = useState('Iniciar');
  const [lastTime, setLastTime] = useState(null);
  const start = () => {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
      setButton('Iniciar');
    } else {
      timer = setInterval(() => {
        seconds++;
        if (seconds == 60) {
          seconds = 0;
          minutes++;
        }
        if (minutes == 60) {
          minutes = 0;
          hours++;
        }
        let format =
          (hours < 10 ? '0' + hours : hours) +
          ':' +
          (minutes < 10 ? '0' + minutes : minutes) +
          ':' +
          (seconds < 10 ? '0' + seconds : seconds);

        setStartTime(format);
      }, 1000);
      setButton('Parar');
    }
  };
  const restart = () => {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
    setLastTime(startTime);
    setStartTime(0);
    seconds = 0;
    minutes = 0;
    hours = 0;
  };
  return (
    <View style={styles.container}>
      <Image source={require('./src/crono.png')} />
      <Text style={styles.timer}>{startTime}</Text>
      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.btn} onPress={start}>
          <Text style={styles.textButton}>{button}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={restart}>
          <Text style={styles.textButton}>Limpar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lastArea}>
        <Text style={styles.lasTime}>
          {lastTime ? `Ultimo tempo: ${lastTime}` : ''}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef',
  },
  timer: {
    fontSize: 46,
    marginTop: -160,
    fontWeight: 'bold',
    color: 'white',
  },
  containerButton: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    height: 40,
    margin: 17,
  },
  textButton: {
    color: '#00aeef',
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastArea: {
    marginTop: 40,
  },
  lasTime: {
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: 'white',
  },
});

export default App;
