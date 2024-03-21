import React, { useState } from 'react';
import { Text, View, Pressable, TextInput, Keyboard } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Footer from './Footer';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from '../constants/Game.js';
import styles from '../style/style.js';

export default function Home({ navigation }) {
    const [playerName, setPlayerName] = useState('');
    const [hasPlayerName, setHasPlayerName] = useState(false);

    const handlePlayerName = (value) => {
        if (value.trim().length > 0) {
            setHasPlayerName(true);
            navigation.navigate('Gameboard', { playerName: value }); 
            Keyboard.dismiss();
        }
    }

    return (
        <>
            <Header />
            <View>
                <MaterialCommunityIcons
                    name="information"
                    size={90}
                    color="black"
                />
                <Text>
                    For scoreboard enter name and press start
                </Text>
                <TextInput
                    onChangeText={setPlayerName}
                    autoFocus={true}
                    style={{
                        borderWidth: 1,
                        borderColor: 'black',
                        borderRadius: 8, 
                        paddingHorizontal: 8, 
                        paddingVertical: 8, 
                        marginTop: 1, 
                    }}
                />

                <Text>Rules of the game</Text>
                <Text multiline={true}>
                    THE GAME: Upper section of the classic Yahtzee
                    dice game. You have {NBR_OF_DICES} dices and
                    for the every dice you have {NBR_OF_THROWS}
                    throws. After each throw you can keep dices in
                    order to get same dice spot counts as many as
                    possible. In the end of the turn you must select
                    your points from {MIN_SPOT} to {MAX_SPOT}.
                    Game ends when all points have been selected.
                    The order for selecting those is free.
                </Text>
                
                <Text>Good luck, {playerName}</Text>
                <Pressable
                    onPress={() => handlePlayerName(playerName)}>
                    <Text style={{ color: 'black', fontWeight: 'bold' }} >Start</Text>
                </Pressable>
            </View>
            <Footer />
        </>
    )
}
