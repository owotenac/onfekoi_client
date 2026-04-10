import React from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

// ---- Types ----

type BodyItemType = {
  type: "text" | "link" | "bullet";
  value: string;
  href?: string;
  bold?: boolean;
};

type BlockType = {
  heading: string;
  body: BodyItemType[];
};

type SectionType = {
  id: string;
  title: string;
  num: string;
  content: BlockType[];
};

// ---- Données ----

const SECTIONS: SectionType[] = [
  {
    id: "mentions",
    title: "Mentions légales",
    num: "1",
    content: [
      {
        heading: "Éditeur",
        body: [
          { type: "text", value: "ONFEKOI", bold: true },
          { type: "text", value: "E2 Digital Studio" },
          { type: "link", value: "contact@e2digitalstudio.com", href: "mailto:contact@e2digitalstudio.com" },
        ],
      },
      {
        heading: "Hébergement",
        body: [
          { type: "link", value: "https://www.onfekoi.app", href: "https://www.onfekoi.app" },
        ],
      },
      {
        heading: "Propriété intellectuelle",
        body: [
          {
            type: "text",
            value:
              "L'ensemble des contenus présents sur l'application ONFEKOI (textes, images, logos) sont la propriété exclusive de leur auteur et protégés par le droit d'auteur. Toute reproduction sans autorisation écrite est interdite.",
          },
        ],
      },
      {
        heading: "Responsabilité",
        body: [
          {
            type: "text",
            value:
              "ONFEKOI s'efforce de fournir des informations exactes et à jour. L'exactitude des données relève de la responsabilité des établissements partenaires. ONFEKOI ne peut être tenu responsable d'erreurs ou de changements de prix depuis la publication.",
          },
        ],
      },
      {
        heading: "Sources des données touristiques",
        body: [
          {
            type: "text",
            value:
              "Une partie des données affichées dans l'application provient de la plateforme nationale DATAtourisme, pilotée par la Direction Générale des Entreprises (DGE). Ces données sont produites par les Offices de Tourisme, Agences départementales et Comités Régionaux du Tourisme, et mises à disposition en Open Data.",
          },
          {
            type: "text",
            value:
              "Elles sont diffusées sous Licence Ouverte Etalab 2.0. Conformément à cette licence, la paternité de chaque donnée est attribuée à son producteur d'origine (Office de Tourisme concerné), tel qu'indiqué dans le champ « HasBeenCreatedBy » des jeux de données.",
          },
          { type: "link", value: "En savoir plus sur DATAtourisme", href: "https://www.datatourisme.fr" },
          { type: "link", value: "Consulter la Licence Ouverte Etalab 2.0", href: "https://www.etalab.gouv.fr/licence-ouverte-open-licence/" },
        ],
      },
    ],
  },
  {
    id: "confidentialite",
    title: "Politique de confidentialité",
    num: "2",
    content: [
      {
        heading: "Données collectées",
        body: [
          { type: "bullet", value: "Localisation précise et approximative (si autorisée) pour afficher les bons plans à proximité" },
        ],
      },
      {
        heading: "Finalité",
        body: [
          {
            type: "text",
            value:
              "Les données sont utilisées pour améliorer l'application, afficher des contenus pertinents et, dans le cadre de la version monétisée, diffuser des publicités contextuelles via Google AdMob. AdMob peut collecter des identifiants publicitaires (AAID) et des données techniques sur votre appareil pour personnaliser les annonces.",
          },
        ],
      },
      {
        heading: "Conservation",
        body: [
          {
            type: "text",
            value: "Les données sont conservées pendant 13 mois maximum conformément aux recommandations de la CNIL.",
          },
        ],
      },
      {
        heading: "Vos droits (RGPD)",
        body: [
          {
            type: "text",
            value:
              "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement et d'opposition. Pour exercer ces droits, écrivez à : ",
          },
          { type: "link", value: "contact@e2digitalstudio.com", href: "mailto:contact@e2digitalstudio.com" },
        ],
      },
      {
        heading: "Partage des données",
        body: [
          {
            type: "text",
            value: "ONFEKOI ne vend aucune donnée personnelle à des tiers.",
          },
        ],
      },
      {
        heading: "Données tierces — DATAtourisme",
        body: [
          {
            type: "text",
            value:
              "Les données touristiques affichées dans l'application sont issues de la plateforme publique DATAtourisme et ne constituent pas des données personnelles. Elles sont mises à jour quotidiennement par les organismes territoriaux producteurs. ONFEKOI n'est pas responsable de l'exactitude ou de la mise à jour de ces données tierces.",
          },
        ],
      },
      {
        heading: "Cookies",
        body: [
          {
            type: "text",
            value:
              "La version web peut déposer des cookies fonctionnels et analytiques. Vous pouvez les refuser via les paramètres de votre navigateur.",
          },
        ],
      },
    ],
  },
  {
    id: "cgu",
    title: "Conditions générales d'utilisation",
    num: "3",
    content: [
      {
        heading: "Objet",
        body: [
          {
            type: "text",
            value:
              "ONFEKOI est une application mobile et web recensant des bons plans, sorties et événements dans toute la France. L'accès à l'application est gratuit.",
          },
        ],
      },
      {
        heading: "Utilisation",
        body: [
          { type: "bullet", value: "L'application est réservée à un usage personnel et non commercial." },
          { type: "bullet", value: "Il est interdit de scraper, copier ou redistribuer les contenus sans accord préalable." },
          { type: "bullet", value: "Les offres présentées sont susceptibles d'évoluer sans préavis." },
        ],
      },
      {
        heading: "Données open data",
        body: [
          {
            type: "text",
            value:
              "Certaines données affichées dans l'application proviennent de DATAtourisme et sont soumises à la Licence Ouverte Etalab 2.0. L'utilisateur est informé que ces données sont publiques et peuvent être inexactes ou obsolètes. ONFEKOI ne garantit pas leur exactitude et décline toute responsabilité en cas d'erreur.",
          },
        ],
      },
      {
        heading: "Droit applicable",
        body: [
          {
            type: "text",
            value:
              "Les présentes CGU sont régies par le droit français. En cas de litige, les tribunaux compétents sont ceux du ressort du siège social d'ONFEKOI.",
          },
        ],
      },
      {
        heading: "Modification des CGU",
        body: [
          {
            type: "text",
            value:
              "ONFEKOI se réserve le droit de modifier les présentes CGU à tout moment. La version en vigueur est celle accessible depuis l'application ou ce site.",
          },
        ],
      },
    ],
  },
];
// ---- Composants ----

function BodyItem({ item }: { item: BodyItemType }) {
  if (item.type === "link") {
    return (
      <Pressable onPress={() => Linking.openURL(item.href ?? "")}>
        <Text style={styles.link}>{item.value}</Text>
      </Pressable>
    );
  }
  if (item.type === "bullet") {
    return (
      <View style={styles.bulletRow}>
        <Text style={styles.bulletDot}>•</Text>
        <Text style={styles.bulletText}>{item.value}</Text>
      </View>
    );
  }
  return (
    <Text style={[styles.bodyText, item.bold === true && styles.bodyBold]}>
      {item.value}
    </Text>
  );
}

function LegalBlock({ block }: { block: BlockType }) {
  return (
    <View style={styles.block}>
      <Text style={styles.blockHeading}>{block.heading}</Text>
      {block.body.map((item, i) => (
        <BodyItem key={i} item={item} />
      ))}
    </View>
  );
}

function LegalSection({ section }: { section: SectionType }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionNum}>
          <Text style={styles.sectionNumText}>{section.num}</Text>
        </View>
        <Text style={styles.sectionTitle}>{section.title}</Text>
      </View>
      {section.content.map((block, i) => (
        <LegalBlock key={i} block={block} />
      ))}
    </View>
  );
}

// ---- Page principale ----

export default function LegalPage() {
  const today = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <View style={styles.content}>
          {SECTIONS.map((section) => (
            <LegalSection key={section.id} section={section} />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} ONFEKOI
          </Text>
          <Text style={styles.headerDate}>Dernière mise à jour : {today}</Text>
          <Pressable onPress={() => Linking.openURL("mailto:contact@e2digitalstudio.com")}>
            <Text style={styles.footerLink}>contact@e2digitalstudio.com</Text>
          </Pressable>
        </View>

      </ScrollView>
    </>
  );
}

// ---- Styles ----

const ORANGE = "#e07b39";
const DARK = "#1a0a00";
const CREAM = "#f0e6d3";
const TAUPE = "#c9a97a";
const BG = "#faf7f2";
const TEXT_COLOR = "#4a3a2a";
const BORDER = "#e8ddd0";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  contentContainer: {
    flexGrow: 1,
  },

  // Header
  header: {
    backgroundColor: DARK,
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  headerLogo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  headerCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ORANGE,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCircleText: {
    fontWeight: "700",
    fontSize: 16,
    color: DARK,
  },
  headerName: {
    fontSize: 22,
    fontWeight: "700",
    color: CREAM,
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: "300",
    letterSpacing: 3,
    color: TAUPE,
    marginBottom: 6,
  },
  headerDate: {
    fontSize: 13,
    color: "rgba(240,230,211,0.4)",
  },

  // Contenu
  content: {
    maxWidth: 800,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 60,
  },

  // Section
  section: {
    marginBottom: 56,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 28,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: BORDER,
  },
  sectionNum: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: ORANGE,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionNumText: {
    fontSize: 14,
    fontWeight: "700",
    color: DARK,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: DARK,
    flex: 1,
  },

  // Block
  block: {
    marginBottom: 24,
    paddingLeft: 16,
    borderLeftWidth: 3,
    borderLeftColor: BORDER,
  },
  blockHeading: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: ORANGE,
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 26,
    color: TEXT_COLOR,
    marginBottom: 4,
  },
  bodyBold: {
    fontWeight: "700",
  },
  link: {
    fontSize: 15,
    lineHeight: 26,
    color: ORANGE,
    textDecorationLine: "underline",
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 4,
  },
  bulletDot: {
    fontSize: 15,
    color: ORANGE,
    lineHeight: 26,
  },
  bulletText: {
    fontSize: 15,
    lineHeight: 26,
    color: TEXT_COLOR,
    flex: 1,
  },

  // Footer
  footer: {
    backgroundColor: DARK,
    paddingVertical: 24,
    paddingHorizontal: 24,
    alignItems: "center",
    gap: 6,
  },
  footerText: {
    fontSize: 13,
    color: "rgba(240,230,211,0.4)",
  },
  footerLink: {
    fontSize: 13,
    color: TAUPE,
  },
});