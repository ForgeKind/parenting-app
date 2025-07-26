import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

// --- Import Placeholder Screens (Corrected Paths) ---
import ToolshedScreen from './screens/ToolshedScreen.tsx';
import JournalScreen from './screens/JournalScreen.tsx';
import ProfileScreen from './screens/ProfileScreen.tsx';


// --- Font Loader ---
const FontLoader = () => {
  const fontStyles = `
    @font-face {
      font-family: 'Playfair';
      src: url('/assets/assets/fonts/PlayfairDisplay-Regular.ttf') format('truetype');
    }
    @font-face {
      font-family: 'Lato';
      src: url('/assets/assets/fonts/Lato-Regular.ttf') format('truetype');
    }
    @font-face {
      font-family: 'LatoBold';
      src: url('/assets/assets/fonts/Lato-Bold.ttf') format('truetype');
    }
  `;
  return (<style dangerouslySetInnerHTML={{ __html: fontStyles }} />);
};

// --- Color Palette ---
const warmWisdom = {
  richSandstone: '#D7BFA7',
  midnightPlum: '#3C2A4D',
  crispVanilla: '#F6F1EB',
  oliveGold: '#A89B56',
  earthCoral: '#D96459',
};

// --- Styles ---
const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: warmWisdom.richSandstone },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  header: { fontFamily: 'Playfair, serif', fontSize: 32, color: warmWisdom.midnightPlum, textAlign: 'center', marginBottom: 12 },
  subHeader: { fontFamily: 'Lato, sans-serif', fontSize: 18, color: warmWisdom.midnightPlum, textAlign: 'center', marginBottom: 40 },
  moodContainer: { width: '100%', alignItems: 'center' },
  moodButton: { width: '90%', paddingVertical: 20, borderRadius: 25, marginBottom: 20, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 3.84, elevation: 5 },
  moodButtonText: { fontFamily: 'LatoBold, sans-serif', fontSize: 20, color: '#FFFFFF' },
  calmButton: { backgroundColor: '#AEC6CF' },
  tenseButton: { backgroundColor: '#FFBF00' },
  overwhelmedButton: { backgroundColor: '#C34A36' },
  carouselContainer: { width: '100%', alignItems: 'center' },
  adviceCard: { backgroundColor: warmWisdom.crispVanilla, borderRadius: 15, padding: 25, width: '100%', minHeight: 200, alignItems: 'center' },
  cardTitle: { fontFamily: 'Playfair, serif', fontSize: 24, color: warmWisdom.midnightPlum, marginBottom: 15 },
  cardTip: { fontFamily: 'Lato, sans-serif', fontSize: 16, color: warmWisdom.midnightPlum, textAlign: 'center', marginBottom: 20, lineHeight: 24 },
  cardButton: { backgroundColor: warmWisdom.earthCoral, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  cardButtonText: { fontFamily: 'LatoBold, sans-serif', color: '#FFFFFF', fontSize: 14 },
});


// --- Home Screen Component (Logic moved from App) ---
const HomeScreen = () => {
  const [moodSelected, setMoodSelected] = useState<string | null>(null);

  const handleMoodSelect = (mood: string) => {
    setTimeout(() => {
      setMoodSelected(mood);
    }, 300);
  };

  const adviceData = {
    Calm: [{ id: 'c1', title: 'Deepen Your Calm', tip: 'Take a moment to notice three things you can see around you.' }],
    Tense: [{ id: 't1', title: 'Release the Tension', tip: 'Slowly clench and then release your fists. Repeat three times.' }],
    Overwhelmed: [{ id: 'o1', title: 'Find Your Anchor', tip: 'Place one hand on your heart and just breathe for ten seconds.' }],
  };

  const AdviceCarousel: React.FC<{ mood: string }> = ({ mood }) => {
    const cards = adviceData[mood as keyof typeof adviceData] || [];
    return (
      <View style={styles.carouselContainer}>
        <Text style={styles.header}>Here's a little guidance</Text>
        <View style={styles.adviceCard}>
          <Text style={styles.cardTitle}>{cards[0].title}</Text>
          <Text style={styles.cardTip}>{cards[0].tip}</Text>
          <TouchableOpacity style={styles.cardButton}>
            <Text style={styles.cardButtonText}>Save for Later</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const moods = [
    { name: 'Calm', emoji: '😌', style: styles.calmButton },
    { name: 'Tense', emoji: '⚠️', style: styles.tenseButton },
    { name: 'Overwhelmed', emoji: '🔥', style: styles.overwhelmedButton },
  ];

  const MoodSelector: React.FC<{ onSelectMood: (mood: string) => void }> = ({ onSelectMood }) => {
    return (
      <View style={styles.moodContainer}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.name}
            style={[styles.moodButton, mood.style]}
            onPress={() => onSelectMood(mood.name)}
            activeOpacity={0.7}
          >
            <Text style={styles.moodButtonText}>{mood.emoji} {mood.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  return (
      <View style={styles.container}>
        {!moodSelected ? (
          <>
            <Text style={styles.header}>Let's make it all a win today!</Text>
            <Text style={styles.subHeader}>Let us meet you where YOU are!</Text>
            <MoodSelector onSelectMood={handleMoodSelect} />
          </>
        ) : (
          <AdviceCarousel mood={moodSelected} />
        )}
      </View>
  );
};


// --- Main App Component (Now controls navigation) ---
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <>
      <FontLoader />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap = 'ellipse-outline'; // Default icon

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Parent Toolshed') {
                iconName = focused ? 'hammer' : 'hammer-outline';
              } else if (route.name === 'Journal') {
                iconName = focused ? 'book' : 'book-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: warmWisdom.earthCoral,
            tabBarInactiveTintColor: warmWisdom.midnightPlum,
            tabBarStyle: { backgroundColor: warmWisdom.crispVanilla },
            headerShown: false, // We hide the default header
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Parent Toolshed" component={ToolshedScreen} />
          <Tab.Screen name="Journal" component={JournalScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;