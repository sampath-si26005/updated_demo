import React, { useRef, useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Pressable, ScrollView,
  Animated, StatusBar, Image,
} from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import PageLayout from '../components/landing_page/PageLayout';

/* ── Design tokens (matches landing page) ────────────────── */
const NAVY     = '#0D1F35';
const BG       = '#F4F1EC';   // same as MainSection / PageLayout
const WHITE    = '#FFFFFF';
const GOLD     = '#C9A96E';   // same accent gold as header + eyebrow rule
const MUTED    = '#5C6370';
const RULE     = '#EAE6DF';
const CHARCOAL = '#111111';

/* ── Airline data ─────────────────────────────────────────── */
interface Flight {
  id: string;
  airline: string;
  airlineShort: string;
  color: string;
  iataCode: string | null; // null = fictional airline → fallback badge
  flightNo: string;
  destination: string;
  departure: string;
}

// Google Flights public CDN — official logos by IATA code, no API key needed.
// Format: https://www.gstatic.com/flights/airline_logos/70px/{IATA}.png
const logoUrl = (iata: string) =>
  `https://www.gstatic.com/flights/airline_logos/70px/${iata}.png`;

const FLIGHTS: Flight[] = [
  { id: '1', airline: 'Air Asia',           airlineShort: 'AA', color: '#D91428', iataCode: 'AK',   flightNo: 'QH7DU',  destination: 'London',    departure: '15:30' },
  { id: '2', airline: 'Thai Airways',       airlineShort: 'TH', color: '#5D2782', iataCode: 'TG',   flightNo: 'SL7KSD', destination: 'Bangkok',   departure: '15:32' },
  { id: '3', airline: 'Singapore Airlines', airlineShort: 'SQ', color: '#1A5276', iataCode: 'SQ',   flightNo: 'LKUE6J', destination: 'Hanoi',     departure: '15:35' },
  { id: '4', airline: 'Qantas',             airlineShort: 'QF', color: '#E8112D', iataCode: 'QF',   flightNo: 'LAKS6L', destination: 'Sydney',    departure: '15:37' },
  { id: '5', airline: 'Emirates',           airlineShort: 'EK', color: '#C8102E', iataCode: 'EK',   flightNo: 'UFGT5U', destination: 'Abu Dhabi', departure: '15:42' },
  { id: '6', airline: 'Qatar Airways',      airlineShort: 'QR', color: '#5C0E2D', iataCode: 'QR',   flightNo: 'NBSVD',  destination: 'Doha',      departure: '15:47' },
  { id: '7', airline: 'IndiGo',             airlineShort: '6E', color: '#2B3990', iataCode: '6E',   flightNo: 'UYWE4',  destination: 'Bangalore', departure: '15:53' },
];

/* ── Animated QR scan area ────────────────────────────────── */
function QRDisplay() {
  const scanLine = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLine, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(scanLine, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  const translateY = scanLine.interpolate({ inputRange: [0, 1], outputRange: [-60, 60] });

  return (
    <View style={qr.frame}>
      <MaterialIcons name="qr-code" size={124} color={WHITE} />
      <Animated.View style={[qr.line, { transform: [{ translateY }] }]} />
    </View>
  );
}

/* ── Airline logo with badge fallback ────────────────────── */
function AirlineLogo({ flight }: { flight: Flight }) {
  const [logoFailed,  setLogoFailed]  = useState(false);
  const [logoLoaded,  setLogoLoaded]  = useState(false);
  const uri = flight.iataCode ? logoUrl(flight.iataCode) : null;

  const showBadge = !uri || logoFailed;

  if (showBadge) {
    return (
      <View style={[row.logoBox, { backgroundColor: flight.color }]}>
        <Text style={row.badgeTxt}>{flight.airlineShort}</Text>
      </View>
    );
  }

  return (
    <View style={row.logoBox}>
      {/* Show initials while loading */}
      {!logoLoaded && (
        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: flight.color, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }]}>
          <Text style={row.badgeTxt}>{flight.airlineShort}</Text>
        </View>
      )}
      <Image
        source={{
          uri,
          headers: { Accept: 'image/png,image/*' },
        }}
        style={[row.logoImg, !logoLoaded && { opacity: 0 }]}
        resizeMode="contain"
        onLoad={() => setLogoLoaded(true)}
        onError={() => setLogoFailed(true)}
      />
    </View>
  );
}

/* ── Flight row ────────────────────────────────────────────── */
function FlightRow({ flight, alt, onSelect }: { flight: Flight; alt: boolean; onSelect: (f: Flight) => void }) {
  const [pressed, setPressed] = React.useState(false);
  return (
    <Pressable
      style={[row.wrap, alt && row.alt, pressed && row.hover]}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={() => onSelect(flight)}
    >
      {/* Airline logo + name */}
      <View style={[row.colAirline, { flexDirection: 'row', alignItems: 'center', gap: 14 }]}>
        <AirlineLogo flight={flight} />
        <Text style={row.cell}>{flight.airline}</Text>
      </View>

      <Text style={[row.cell, row.colFlight, row.bold]}>{flight.flightNo}</Text>
      <Text style={[row.cell, row.colDest]}>{flight.destination}</Text>
      <Text style={[row.cell, row.colDep]}>{flight.departure}</Text>

      <View style={row.colAction}>
        <View style={[row.arrowBtn, pressed && row.arrowBtnActive]}>
          <Feather name="arrow-right" size={16} color={WHITE} />
        </View>
      </View>
    </Pressable>
  );
}

/* ── Main screen ───────────────────────────────────────────── */
export default function ScannerScreen() {
  const router = useRouter();

  const handleSelect = (flight: Flight) => {
    router.push({
      pathname: '/gate',
      params: {
        airline:     flight.airline,
        flightNo:    flight.flightNo,
        destination: flight.destination,
        departure:   flight.departure,
        origin:      'MAA',
        terminal:    'T2',
        gate:        'A14',
      },
    });
  };

  return (
    <PageLayout>
      <View style={s.body}>

        {/* ══ LEFT: Flight list ════════════════════════════════ */}
        <View style={s.left}>

          {/* Section eyebrow — matches landing page pattern */}
          <View style={s.eyebrow}>
            <View style={s.eyebrowRule} />
            <Text style={s.eyebrowText}>DEPARTURES</Text>
          </View>

          <Text style={s.title}>Select your flight</Text>

          {/* Table header */}
          <View style={s.tableHead}>
            <Text style={[s.th, s.colAirline]}>Airlines</Text>
            <Text style={[s.th, s.colFlight]}>Flight #</Text>
            <Text style={[s.th, s.colDest]}>Destination</Text>
            <Text style={[s.th, s.colDep]}>Departure</Text>
            <View style={s.colAction} />
          </View>

          {/* Gold rule under header — matches FeatureBar topRule */}
          <View style={s.goldRule} />

          <ScrollView style={s.list} showsVerticalScrollIndicator={false}>
            {FLIGHTS.map((f, i) => (
              <FlightRow key={f.id} flight={f} alt={i % 2 !== 0} onSelect={handleSelect} />
            ))}
          </ScrollView>
        </View>

        {/* ── "or" pill at split ─────────────────────────────── */}
        <View style={s.orWrap}>
          <View style={s.orCircle}>
            <Text style={s.orText}>or</Text>
          </View>
        </View>

        {/* ══ RIGHT: Scan panel ════════════════════════════════ */}
        <View style={s.right}>
          {/* Gold top rule — matches AboutSection promoPanel goldTop */}
          <View style={s.rightGoldTop} />

          {/* Decorative circles (subtle depth) */}
          <View style={s.circleTopRight} />
          <View style={s.circleBottomLeft} />

          <View style={s.rightContent}>
            {/* Eyebrow label */}
            <View style={s.rightLabelRow}>
              <View style={s.labelDot} />
              <Text style={s.rightLabel}>BOARDING PASS</Text>
            </View>

            {/* Heading — Playfair Display matches landing page hero */}
            <Text style={s.scanTitle}>
              Scan your{'\n'}
              <Text style={s.scanTitleItalic}>boarding pass</Text>
            </Text>

            <QRDisplay />

            {/* CTA — same pattern as MainSection's ctaWrap */}
            <Pressable
              style={({ pressed }) => [s.scanBtn, pressed && s.scanBtnPressed]}
            >
              <MaterialIcons name="qr-code-scanner" size={18} color={NAVY} />
              <Text style={s.scanBtnTxt}>Scan QR</Text>
            </Pressable>
          </View>
        </View>

      </View>
    </PageLayout>
  );
}

/* ── QR frame ────────────────────────────────────────────── */
const qr = StyleSheet.create({
  frame: {
    width: 152, height: 152,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: 'rgba(201, 169, 110, 0.45)',
    borderRadius: 8, overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: 28,
  },
  line: {
    position: 'absolute', left: 0, right: 0, height: 2,
    backgroundColor: GOLD,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9, shadowRadius: 8, elevation: 4,
  },
});

/* ── Flight row ───────────────────────────────────────────── */
const row = StyleSheet.create({
  wrap:    { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, backgroundColor: WHITE },
  alt:     { backgroundColor: BG },
  hover:   { backgroundColor: '#EDE4D8' },
  logoBox: {
    width: 44, height: 44, borderRadius: 8,
    backgroundColor: WHITE,
    alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1, borderColor: RULE,
  },
  logoImg: { width: 38, height: 38 },
  badgeTxt:{ fontFamily: 'Inter_600SemiBold', fontSize: 11, color: WHITE, letterSpacing: 0.3 },
  cell:    { fontFamily: 'Inter_400Regular', fontSize: 15, color: CHARCOAL },
  bold:    { fontFamily: 'Inter_600SemiBold', color: NAVY },
  colAirline: { width: 240 },
  colFlight:  { width: 110 },
  colDest:    { width: 140 },
  colDep:     { width: 100 },
  colAction:  { flex: 1, alignItems: 'flex-end' },
  arrowBtn:      { width: 36, height: 36, borderRadius: 18, backgroundColor: NAVY, alignItems: 'center', justifyContent: 'center' },
  arrowBtnActive:{ backgroundColor: '#1E3A5F' },
});

/* ── Screen styles ────────────────────────────────────────── */
const s = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: BG,
  },

  /* ── Left panel ── */
  left: {
    flex: 7,
    backgroundColor: WHITE,
    paddingHorizontal: 36,
    paddingTop: 32,
    paddingBottom: 16,
    borderRightWidth: 0,  // handled by "or" pill gap
  },

  /* Eyebrow — mirrors MainSection eyebrow pattern */
  eyebrow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  eyebrowRule: { width: 24, height: 1.5, backgroundColor: GOLD },
  eyebrowText: { fontFamily: 'Inter_600SemiBold', color: GOLD, fontSize: 9, letterSpacing: 3.5 },

  /* Title — Playfair Display as on landing page */
  title: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 30,
    color: NAVY,
    marginBottom: 24,
    lineHeight: 38,
  },

  /* Table header */
  tableHead: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  th: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: MUTED,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  colAirline: { width: 240 },
  colFlight:  { width: 110 },
  colDest:    { width: 140 },
  colDep:     { width: 100 },
  colAction:  { flex: 1 },

  /* Gold rule under table header — matches FeatureBar topRule */
  goldRule: { height: 1.5, backgroundColor: GOLD, opacity: 0.4, marginBottom: 4 },

  list: { flex: 1 },

  /* ── "or" pivot ── */
  orWrap: { width: 0, alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  orCircle: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: BG,
    borderWidth: 1, borderColor: RULE,
    alignItems: 'center', justifyContent: 'center',
    marginLeft: -19,
    shadowColor: NAVY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 4,
  },
  orText: { fontFamily: 'Inter_600SemiBold', fontSize: 12, color: MUTED },

  /* ── Right panel — dark navy, matches Header bg ── */
  right: {
    flex: 3,
    backgroundColor: NAVY,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  /* Gold top accent line — mirrors AboutSection goldTop */
  rightGoldTop: { position: 'absolute', top: 0, left: 0, right: 0, height: 2, backgroundColor: GOLD, opacity: 0.7 },

  /* Decorative translucent circles — adds subtle depth */
  circleTopRight: {
    position: 'absolute', top: -80, right: -80,
    width: 220, height: 220, borderRadius: 110,
    backgroundColor: 'rgba(201, 169, 110, 0.06)',
  },
  circleBottomLeft: {
    position: 'absolute', bottom: -100, left: -80,
    width: 260, height: 260, borderRadius: 130,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },

  rightContent: { alignItems: 'center', paddingHorizontal: 32, zIndex: 1 },

  /* Right eyebrow label row — mirrors AboutSection labelRow */
  rightLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  labelDot:      { width: 4, height: 4, borderRadius: 2, backgroundColor: GOLD },
  rightLabel:    { fontFamily: 'Inter_600SemiBold', color: GOLD, fontSize: 9, letterSpacing: 3.5 },

  /* Heading — Playfair Display bold + italic, same as landing hero */
  scanTitle: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 26,
    color: '#EDE9E3',
    textAlign: 'center',
    lineHeight: 36,
  },
  scanTitleItalic: {
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#EDE9E3',
    fontStyle: 'italic',
  },

  /* Scan button — white fill, navy text, mirrors landing CTA structure */
  scanBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: WHITE,
    paddingVertical: 14, paddingHorizontal: 32,
    borderRadius: 8,
    shadowColor: NAVY,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3, shadowRadius: 14, elevation: 6,
  },
  scanBtnPressed: { backgroundColor: '#EDE9E3' },
  scanBtnTxt: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: NAVY,
    letterSpacing: 0.3,
  },
});
