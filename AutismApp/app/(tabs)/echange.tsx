import { Image } from "expo-image";
import { Platform, StyleSheet } from "react-native";

import { Collapsible } from "@/components/ui/collapsible";
import { ExternalLink } from "@/components/external-link";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import { Link } from "expo-router";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#f5f4f2", dark: "#f5f4f2" }}
      headerImage={
        <Image
          source={require("@/assets/svg/Logo.svg")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          Echange
        </ThemedText>
      </ThemedView>
      <ThemedText>Section d'échange</ThemedText>
      <Collapsible title="Vous pouvez échanger avec d'autres utilisateurs ici.">
        <Link href="/chat">
          <Link.Trigger>
            <ThemedText type="subtitle">Discuter avec des Mentors</ThemedText>
          </Link.Trigger>
        </Link>
      </Collapsible>
      <Collapsible title="Ou alors avec votre assitant virtuel.">
        <Link href="/textPdf">
          <Link.Trigger>
            <ThemedText type="subtitle">
              Discuter avec votre assistant virtuel
            </ThemedText>
          </Link.Trigger>
        </Link>
      </Collapsible>

      {Platform.select({
        ios: (
          <ThemedText>
            The{" "}
            <ThemedText type="defaultSemiBold">
              components/ParallaxScrollView.tsx
            </ThemedText>{" "}
            component provides a parallax effect for the header image.
          </ThemedText>
        ),
      })}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 238,
    width: 370,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
