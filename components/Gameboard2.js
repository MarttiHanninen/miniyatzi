import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style.js';
import Header from './Header';
import Footer from './Footer';
import{
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MIN_SPOT,
  MAX_SPOT,
  BONUS_POINTS_LIMIT,
  BONUS_POINTS} from '../constants/Game.js';
  import { Container, Row, Col} from 'react-native-flex-grid';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


  let board = [];

  
  const Gameboard = ({ route }) => { 
    const { playerName } = route.params; 



    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('Throw the dices');
    const [gameEndStatus, setGameEndStatus] = useState(false);
    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));

useEffect(() => {
  if (playerName === ''&& route.params?.player){
    setPlayerName(route.params.player);
  }
}, []);

    const [selectedDices, setSelectedDices] =  
      useState(new Array(NBR_OF_DICES).fill(false));

    const [diceSpots, setDiceSpots] = 
    useState(new Array(NBR_OF_DICES).fill(0));



    const [dicePointsTotal, setDicePointsTotal] = 
    useState(new Array(MAX_SPOT).fill(0));



    const row = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
      row.push(
        <Pressable 
            key={"row" + i}
            onPress={() => selectDice(i)}>
          <MaterialCommunityIcons
            name={board[i]}
            key={"row" + i}
            size={50} 
            color={getDiceColor(i)}>
          </MaterialCommunityIcons>
        </Pressable>
      );
    }


    function getDiceColor(i) {
        return selectedDices[i] ? 'red' : 'black';
    }

    function getDicePointsColor(i){
      return (selectedDicePoints[i] ? 'red' : 'black')
    }
    const selectDicePoints = (i) => {
      if (nbrOfThrowsLeft === 0){
        let selected =[...selectedDices];
        let selectedPoints = [...selectedDicePoints];
        let points = [...dicePointsTotal];
        if (!selectedPoints[i]){
        selectedPoints[i] = true;
        let nbrOfDices = diceSpots.reduce
        ((total, x) => (x === (i + 1) ? total + 1 : total), 0);
        points[i] = nbrOfDices * (i + 1);
        setDicePointsTotal(points);
        setSelectedDicePoints(selectedPoints);
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        return points [i];
        }
        else{
          setStatus('You already selected points for ' + (i + 1));
        }
      }
      else{
        setStatus("Throw" + NBR_OF_THROWS + " times before setting points" )
      }
    };

    const selectDice = (i) => {
      let dices = [...selectedDices];
      dices[i] = selectedDices[i] ? false : true;
      setSelectedDices(dices);
    }
     
     const checkWinner = () => {
      if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft > 0) {
        setStatus('You won');
      }
      else if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft === 0) {
        setStatus('You won, game over');
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
      }
      else if (nbrOfThrowsLeft === 0) {
        setStatus('Game over');
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
      }
      else {
        setStatus('Keep on throwing');
      }
    }
    const throwDices = () => {
      if (gameEndStatus) {
        
        setGameEndStatus(false);
        setDiceSpots(new Array(NBR_OF_DICES).fill(0));
        setDicePointsTotal(new Array(MAX_SPOT).fill(0));
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        setStatus('Throw the dices');
        return;
      }
      if (nbrOfThrowsLeft === 0 && !gameEndStatus) {
        setStatus('Select your points before throwing again');
        return; 
      }
    
      let spots = [...diceSpots];
    
      for (let i = 0; i < NBR_OF_DICES; i++) {
        if (!selectedDices[i]) {
          let randomNumber = Math.floor(Math.random() * 6) + 1;
          board[i] = "dice-" + randomNumber;
          spots[i] = randomNumber;
        }
      }
    
      setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
      setDiceSpots(spots);
      setStatus('Select and throw again');
    
      checkWinner(); 
    };
    
    const pointsRow = [];
    for (let spot =0; spot < MAX_SPOT; spot++) {
      pointsRow.push(
        <Col key={"PointsRow" + spot}>
          <Text key={"PointsRow" + spot}>{getSpotTotal(spot)}
          </Text>
        </Col>
          
      )
    }



    const pointsToSelectRow = [];
    for (let diceButton =0; diceButton < MAX_SPOT; diceButton++) {
      pointsToSelectRow.push(
        <Col key={"ButtonsRow" + diceButton}>
        <Pressable
          key={"buttonsRow" + diceButton
            }
            onPress={() => selectDicePoints(diceButton)}
            >
          <MaterialCommunityIcons
            name={"numeric-" + (diceButton + 1)+ "-circle"}
            key={"buttonsRow" + diceButton}
            size={35}
            color={getDicePointsColor(diceButton)}
          >

          </MaterialCommunityIcons>
        </Pressable>
        </Col>

      )
    }

    const resetGame = () => {
     
      setDiceSpots(new Array(NBR_OF_DICES).fill(0));
      setDicePointsTotal(new Array(MAX_SPOT).fill(0));
      setNbrOfThrowsLeft(NBR_OF_THROWS);
      setStatus('Throw the dices');
      setSelectedDices(new Array(NBR_OF_DICES).fill(false));
      setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
    };
    const calculateTotalPoints = () => {
      let totalPoints = 0;
      for (let i = 0; i < MAX_SPOT; i++) {
        totalPoints += dicePointsTotal[i];
      }
      return totalPoints;
    };

    function getSpotTotal(i){
      return dicePointsTotal[i];
    }
    return(
        <>
        <Header />
        <View>
          
        <View style={styles.gameboard}>
      <View style={styles.flex}>{row}</View>
      <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
      <Text style={styles.gameinfo}>{status}</Text>
      <Pressable style={styles.button}
        onPress={() => throwDices()}>
          <Text style={styles.buttonText}>
            Throw dices
          </Text>
      </Pressable>
      <Container>
      <Row>{pointsRow}</Row>
      </Container>
      <Container>
      <Row>{pointsToSelectRow}</Row>
      </Container>
      <Container fluid>
      <Row>{selectDicePoints}</Row>
      </Container>
    </View>
        <Text>Player: {playerName}</Text>
        <Text style={styles.gameinfo}>Total Points: {calculateTotalPoints()}</Text>

        </View>
        <Pressable style={styles.button} onPress={() => resetGame()}>
  <Text style={styles.buttonText}>Reset Game</Text>
</Pressable>
        <Footer />
        </>
    )
}
  
export default Gameboard ;