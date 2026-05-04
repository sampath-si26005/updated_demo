import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';

export type FlowState = 'scan' | 'select' | 'confirm';

export interface Flight {
  id: string;
  destination: string;
  departure: string;
  airline: string;
  flightNo: string;
  gate: string;
  terminal: string;
  status: 'On Time' | 'Boarding' | 'Delayed';
}

export const FLIGHTS: Flight[] = [
  { id: '1', destination: 'Jabalpur',      departure: '17:10', airline: 'IndiGo',       flightNo: '6E7307', gate: 'A12', terminal: 'T1', status: 'On Time'  },
  { id: '2', destination: 'Coimbatore',    departure: '17:15', airline: 'IndiGo',       flightNo: '6E6328', gate: 'B4',  terminal: 'T2', status: 'Boarding'  },
  { id: '3', destination: 'Bangalore',     departure: '17:20', airline: 'Alliance Air', flightNo: '9I518',  gate: 'C7',  terminal: 'T1', status: 'On Time'  },
  { id: '4', destination: 'Rajahmundry',   departure: '17:20', airline: 'IndiGo',       flightNo: '6E7311', gate: 'A9',  terminal: 'T1', status: 'On Time'  },
  { id: '5', destination: 'Goa',           departure: '17:25', airline: 'AirAsia India',flightNo: 'I51983', gate: 'D2',  terminal: 'T2', status: 'Boarding'  },
  { id: '6', destination: 'Bhubaneshwar', departure: '17:30', airline: 'IndiGo',       flightNo: '6E168',  gate: 'B11', terminal: 'T2', status: 'On Time'  },
  { id: '7', destination: 'Delhi',         departure: '17:40', airline: 'Vistara',      flightNo: 'UK890',  gate: 'E5',  terminal: 'T3', status: 'On Time'  },
  { id: '8', destination: 'Delhi',         departure: '17:50', airline: 'Air India',    flightNo: 'AI4503', gate: 'E8',  terminal: 'T3', status: 'Delayed'  },
  { id: '9', destination: 'Vijayawada',    departure: '17:55', airline: 'IndiGo',       flightNo: '6E7213', gate: 'A3',  terminal: 'T1', status: 'On Time'  },
  { id: '10',destination: 'Chennai Intl', departure: '17:55', airline: 'IndiGo',       flightNo: '6E102',  gate: 'F1',  terminal: 'T2', status: 'Boarding'  },
];

/* ── SCAN VISUAL ───────────────────────────────────────── */
export function ScanVisual() {
  const line = useRef(new Animated.Value(0)).current;
  const glow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(line, { toValue: 1, duration: 2400, useNativeDriver: true }),
        Animated.timing(line, { toValue: 0, duration: 2400, useNativeDriver: true }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const translateY = line.interpolate({ inputRange: [0, 1], outputRange: [0, 250] });
  const glowOp    = glow.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0.9] });

  return (
    <View style={sv.wrap}>
      <Text style={sv.eyebrow}>Boarding Pass</Text>
      <Text style={sv.title}>Recognition</Text>

      <View style={sv.frame}>
        {/* corners */}
        <View style={[sv.c, sv.cTL]} /><View style={[sv.c, sv.cTR]} />
        <View style={[sv.c, sv.cBL]} /><View style={[sv.c, sv.cBR]} />

        {/* dot matrix */}
        <View style={sv.dots}>
          {Array.from({ length: 36 }).map((_, i) => (
            <View key={i} style={sv.dot} />
          ))}
        </View>

        {/* scan line */}
        <Animated.View style={[sv.line, { transform: [{ translateY }], opacity: glowOp }]} />

        <Text style={sv.scanLabel}>ALIGN · HOLD · SCAN</Text>
      </View>

      <Text style={sv.hint}>15 – 25 cm from the sensor</Text>
    </View>
  );
}

/* ── SELECT VISUAL ─────────────────────────────────────── */
export function SelectVisual() {
  return (
    <View style={selV.wrap}>
      <Text style={selV.eyebrow}>Chennai International</Text>
      <Text style={selV.title}>Today's{'\n'}Departures</Text>
      <View style={selV.rule} />
      <View style={selV.board}>
        {FLIGHTS.slice(0, 5).map(f => (
          <View key={f.id} style={selV.row}>
            <Text style={selV.time}>{f.departure}</Text>
            <Text style={selV.dest}>{f.destination}</Text>
            <View style={[selV.badge, f.status === 'Boarding' && selV.badgeBrd, f.status === 'Delayed' && selV.badgeDly]}>
              <Text style={[selV.badgeTxt, f.status === 'Boarding' && selV.badgeBrdTxt, f.status === 'Delayed' && selV.badgeDlyTxt]}>
                {f.status}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <Text style={selV.more}>+ {FLIGHTS.length - 5} more departures →</Text>
    </View>
  );
}

/* ── CONFIRM VISUAL ────────────────────────────────────── */
export function ConfirmVisual({ flight }: { flight: Flight | null }) {
  const scale = useRef(new Animated.Value(0.85)).current;
  const op    = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }),
      Animated.timing(op,    { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, [flight]);

  if (!flight) return null;

  return (
    <Animated.View style={[cv.wrap, { opacity: op, transform: [{ scale }] }]}>
      <View style={cv.checkCircle}>
        <Feather name="check" size={28} color="#F7F5F2" />
      </View>
      <Text style={cv.label}>Terminal</Text>
      <Text style={cv.bigVal}>{flight.terminal}</Text>
      <View style={cv.divider} />
      <Text style={cv.label}>Gate</Text>
      <Text style={cv.gateVal}>{flight.gate}</Text>
      <View style={cv.divider} />
      <Text style={cv.label}>Flight</Text>
      <Text style={cv.flightVal}>{flight.flightNo}</Text>
    </Animated.View>
  );
}

/* ─────────── STYLES ─────────── */
const C = {
  bg:     '#F0EBE4',
  text:   '#1C1917',
  sub:    '#78716C',
  muted:  '#A8A29E',
  accent: '#8B6914',
  border: '#D9D0C5',
};

const sv = StyleSheet.create({
  wrap:      { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  eyebrow:   { fontFamily: 'Inter_400Regular', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: C.muted, marginBottom: 6 },
  title:     { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 28, color: C.text, marginBottom: 36, textAlign: 'center' },
  frame: {
    width: 280, height: 280,
    backgroundColor: '#EDE7DF',
    position: 'relative', alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden',
  },
  c:  { position: 'absolute', width: 24, height: 24 },
  cTL:{ top: 0, left: 0,  borderTopWidth: 1.5, borderLeftWidth:  1.5, borderColor: C.accent },
  cTR:{ top: 0, right: 0, borderTopWidth: 1.5, borderRightWidth: 1.5, borderColor: C.accent },
  cBL:{ bottom: 0, left: 0,  borderBottomWidth: 1.5, borderLeftWidth:  1.5, borderColor: C.accent },
  cBR:{ bottom: 0, right: 0, borderBottomWidth: 1.5, borderRightWidth: 1.5, borderColor: C.accent },
  dots: { flexDirection: 'row', flexWrap: 'wrap', width: 168, height: 168, opacity: 0.15 },
  dot:  { width: 4, height: 4, borderRadius: 2, backgroundColor: C.text, margin: 10 },
  line: {
    position: 'absolute', top: 12, left: 12, right: 12, height: 1,
    backgroundColor: C.accent,
    shadowColor: C.accent, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1, shadowRadius: 6, elevation: 4,
  },
  scanLabel: { position: 'absolute', bottom: 12, fontFamily: 'Inter_400Regular', fontSize: 9, letterSpacing: 3, color: C.muted },
  hint:      { marginTop: 28, fontFamily: 'Inter_400Regular', fontSize: 13, color: C.sub, textAlign: 'center' },
});

const selV = StyleSheet.create({
  wrap:    { flex: 1, justifyContent: 'center', paddingHorizontal: 44 },
  eyebrow: { fontFamily: 'Inter_400Regular', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: C.muted, marginBottom: 8 },
  title:   { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 34, color: C.text, lineHeight: 44, marginBottom: 24 },
  rule:    { height: 1, backgroundColor: C.border, marginBottom: 24 },
  board:   { gap: 0 },
  row:     { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.border },
  time:    { fontFamily: 'Inter_600SemiBold', fontSize: 16, color: C.accent, width: 52 },
  dest:    { fontFamily: 'Inter_400Regular', fontSize: 15, color: C.text, flex: 1 },
  badge:   { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 3, backgroundColor: '#E8E2D9' },
  badgeBrd:{ backgroundColor: '#D4EDDA' },
  badgeDly:{ backgroundColor: '#F9DDD8' },
  badgeTxt:   { fontFamily: 'Inter_400Regular', fontSize: 11, color: C.muted },
  badgeBrdTxt:{ color: '#2D6A4F' },
  badgeDlyTxt:{ color: '#9B2335' },
  more:    { marginTop: 16, fontFamily: 'Inter_400Regular', fontSize: 12, color: C.muted },
});

const cv = StyleSheet.create({
  wrap:       { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  checkCircle:{ width: 56, height: 56, borderRadius: 28, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 36 },
  label:      { fontFamily: 'Inter_400Regular', fontSize: 11, letterSpacing: 2.5, textTransform: 'uppercase', color: C.muted, marginBottom: 4 },
  bigVal:     { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 48, color: C.text, marginBottom: 8 },
  divider:    { height: 1, backgroundColor: C.border, width: 120, marginVertical: 20 },
  gateVal:    { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 64, color: C.accent, marginBottom: 8 },
  flightVal:  { fontFamily: 'Inter_600SemiBold', fontSize: 22, color: C.text, letterSpacing: 2 },
});
