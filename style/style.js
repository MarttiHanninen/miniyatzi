import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    marginTop: 0,
    marginBottom: 0,
    borderBottomColor: 'black',
    borderTopColor: 'black',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    backgroundColor: 'red',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 0,
    marginBottom: 0,
    borderBottomColor: 'black',
    borderTopColor: 'black',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    backgroundColor: 'red',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "red",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20,
    
  }
  
});