import { Image, StyleSheet, Text, View } from 'react-native';
import { gameAssets } from '@/assets/gameAssets';
import colors from '@/constants/colors';

export function NativeFoundationScreen() {
  return (
    <View style={styles.container}>
      <Image source={gameAssets.logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.eyebrow}>NATIVE ANDROID GAME FOUNDATION</Text>
      <Text style={styles.title}>Lumen Pop Native</Text>
      <Text style={styles.text}>
        The native game architecture is ready for the next port phase.
      </Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>7 Lumens · touch-linking · no swapping</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    backgroundColor: colors.light.background,
  },
  logo: {
    width: 168,
    height: 168,
    marginBottom: 22,
  },
  eyebrow: {
    color: colors.light.mutedForeground,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.6,
    textAlign: 'center',
  },
  title: {
    marginTop: 10,
    color: colors.light.foreground,
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  text: {
    maxWidth: 300,
    marginTop: 10,
    color: colors.light.mutedForeground,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  badge: {
    marginTop: 22,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: colors.radius,
    backgroundColor: colors.light.secondary,
  },
  badgeText: {
    color: colors.light.secondaryForeground,
    fontSize: 12,
    fontWeight: '700',
  },
});