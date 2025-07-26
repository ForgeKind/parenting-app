import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';

// --- NEW: Style tag for loading fonts via CSS ---
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
  // In React Native for Web, we can use a <style> tag like this
  return (
    <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
  );
};


// --- Color Palette ---
const warmWisdom = {
  richSandstone: '#D7BFA7',
  midnightPlum: '#3C2A4D',
  crispVanilla: '#F6F1EB',
  oliveGold: '#A89B56',
  earthCoral: '#D96459',
};

// --- Mood Colors ---
const moodColors = {
  calmBlue: '#AEC6CF',
  tenseAmber: '#FFBF00',
  overwhelmedRed: '#C34A36',
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
  calmButton: { backgroundColor: moodColors.calmBlue },
  tenseButton: { backgroundColor: moodColors.tenseAmber },
  overwhelmedButton: { backgroundColor: moodColors.overwhelmedRed },
  carouselContainer: { width: '100%', alignItems: 'center' },
  adviceCard: { backgroundColor: warmWisdom.crispVanilla, borderRadius: 15, padding: 25, width: '100%', minHeight: 200, alignItems: 'center' },
  cardTitle: { fontFamily: 'Playfair, serif', fontSize: 24, color: warmWisdom.midnightPlum, marginBottom: 15 },
  cardTip: { fontFamily: 'Lato, sans-serif', fontSize: 16, color: warmWisdom.midnightPlum, textAlign: 'center', marginBottom: 20, lineHeight: 24 },
  cardButton: { backgroundColor: warmWisdom.earthCoral, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  cardButtonText: { fontFamily: 'LatoBold, sans-serif', color: '#FFFFFF', fontSize: 14 },
});

// --- Child Components ---
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

// --- Main App Component ---
const App = () => {
  const [moodSelected, setMoodSelected] = useState<string | null>(null);

  const handleMoodSelect = (mood: string) => {
    setTimeout(() => {
      setMoodSelected(mood);
    }, 300);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <FontLoader />
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
    </SafeAreaView>
  );
};

export default App;