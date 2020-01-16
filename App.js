import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();

  const[guessRounds, setGuessRounds] = useState(0);
  //we know if guessRounds is 0, we know that the game hasn't started yet, or it's running

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
    //if setGuessRound is greater than 0, we know the gameOverHandler exectued and the game is over
  };

  let content = <StartGameScreen onStartGame ={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen 
    //the userNumber is received on the userChoice prop in GameScreen, which is only rendered if we have a userNumber
    userChoice = {userNumber} onGameOver = {gameOverHandler}
    />
    
  } else if (guessRounds > 0){
    content = <GameOverScreen roundsNumber = {guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler}/>;
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
