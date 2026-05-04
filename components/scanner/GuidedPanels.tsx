import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Flight, FLIGHTS } from './GuidedScanFlow';

const C = {
  bg:     '#F7F5F2',
  text:   '#1C1917',
  sub:    '#78716C',
  muted:  '#A8A29E',
  accent: '#8B6914',
  border: '#E0D8CF',
  surface:'#EDE7DF',
};

/* ── SCAN PANEL (right side, scan state) ───────────────── */
interface ScanPanelProps { onBrowse: () => void; }

export function ScanPanel({ onBrowse }: ScanPanelProps) {
  const steps = [
    { n: '01', title: 'Hold at distance',  desc: 'Keep the boarding pass 15–25 cm away from the sensor.' },
    { n: '02', title: 'Keep it steady',    desc: 'Hold flat and still — avoid movement while scanning.' },
    { n: '03', title: 'Reduce glare',      desc: 'Tilt the pass slightly to eliminate screen reflection.' },
  ];
  return (
    <View style={sp.wrap}>
      <Text style={sp.eyebrow}>Step 1 of 2</Text>
      <Text style={sp.title}>Place your{'\n'}boarding pass</Text>
      <View style={sp.rule} />

      {steps.map((s, i) => (
        <View key={s.n} style={[sp.step, i < steps.length - 1 && sp.stepBorder]}>
          <Text style={sp.num}>{s.n}</Text>
          <View style={sp.stepBody}>
            <Text style={sp.stepTitle}>{s.title}</Text>
            <Text style={sp.stepDesc}>{s.desc}</Text>
          </View>
        </View>
      ))}

      <View style={sp.altRow}>
        <Text style={sp.altLabel}>Can't scan?</Text>
        <Pressable style={sp.altBtn} onPress={onBrowse}>
          <Feather name="list" size={14} color={C.accent} />
          <Text style={sp.altBtnText}>Browse flights manually</Text>
        </Pressable>
      </View>
    </View>
  );
}

/* ── SELECT PANEL (right side, select state) ───────────── */
interface SelectPanelProps { onSelect: (f: Flight) => void; onBack: () => void; }

export function SelectPanel({ onSelect, onBack }: SelectPanelProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <View style={selP.wrap}>
      <View style={selP.header}>
        <View>
          <Text style={selP.eyebrow}>Manual Selection</Text>
          <Text style={selP.title}>Choose your flight</Text>
        </View>
        <Pressable style={selP.backBtn} onPress={onBack}>
          <Feather name="arrow-left" size={16} color={C.sub} />
          <Text style={selP.backTxt}>Back</Text>
        </Pressable>
      </View>

      <View style={selP.tableHead}>
        <Text style={[selP.th, { width: 60 }]}>Departs</Text>
        <Text style={[selP.th, { flex: 1 }]}>Destination</Text>
        <Text style={[selP.th, { width: 80 }]}>Airline</Text>
        <Text style={[selP.th, { width: 72 }]}>Flight</Text>
        <Text style={[selP.th, { width: 60 }]}>Gate</Text>
      </View>

      <ScrollView style={selP.list} showsVerticalScrollIndicator={false}>
        {FLIGHTS.map((f, i) => (
          <Pressable
            key={f.id}
            style={[selP.row, i % 2 !== 0 && selP.rowAlt, hovered === f.id && selP.rowHover]}
            onPress={() => onSelect(f)}
            onPressIn={() => setHovered(f.id)}
            onPressOut={() => setHovered(null)}
          >
            <Text style={[selP.cell, selP.timeCell, { width: 60 }]}>{f.departure}</Text>
            <Text style={[selP.cell, { flex: 1 }]}>{f.destination}</Text>
            <Text style={[selP.cell, selP.subCell, { width: 80 }]}>{f.airline}</Text>
            <Text style={[selP.cell, selP.subCell, { width: 72 }]}>{f.flightNo}</Text>
            <View style={{ width: 60, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={[selP.cell, selP.timeCell]}>{f.gate}</Text>
              {hovered === f.id && <Feather name="chevron-right" size={14} color={C.accent} />}
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

/* ── CONFIRM PANEL (right side, confirm state) ─────────── */
interface ConfirmPanelProps { flight: Flight | null; onNavigate: () => void; onRestart: () => void; }

export function ConfirmPanel({ flight, onNavigate, onRestart }: ConfirmPanelProps) {
  if (!flight) return null;
  return (
    <View style={cfP.wrap}>
      <Text style={cfP.eyebrow}>Boarding Pass Confirmed</Text>
      <Text style={cfP.title}>You're all set,{'\n'}have a great flight.</Text>
      <View style={cfP.rule} />

      <View style={cfP.detail}>
        <View style={cfP.detailRow}>
          <Text style={cfP.detailLabel}>Destination</Text>
          <Text style={cfP.detailVal}>{flight.destination}</Text>
        </View>
        <View style={cfP.detailRow}>
          <Text style={cfP.detailLabel}>Departure</Text>
          <Text style={cfP.detailVal}>{flight.departure}</Text>
        </View>
        <View style={cfP.detailRow}>
          <Text style={cfP.detailLabel}>Airline</Text>
          <Text style={cfP.detailVal}>{flight.airline}</Text>
        </View>
        <View style={cfP.detailRow}>
          <Text style={cfP.detailLabel}>Flight</Text>
          <Text style={[cfP.detailVal, cfP.accent]}>{flight.flightNo}</Text>
        </View>
        <View style={cfP.detailRow}>
          <Text style={cfP.detailLabel}>Status</Text>
          <Text style={[cfP.detailVal, flight.status === 'Boarding' ? cfP.green : flight.status === 'Delayed' ? cfP.red : cfP.detailVal]}>
            {flight.status}
          </Text>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [cfP.navBtn, pressed && cfP.navBtnPressed]}
        onPress={onNavigate}
      >
        <Text style={cfP.navBtnTxt}>Navigate to Gate {flight.gate}</Text>
        <Feather name="arrow-right" size={16} color={C.bg} />
      </Pressable>

      <Pressable style={cfP.restartBtn} onPress={onRestart}>
        <Text style={cfP.restartTxt}>Scan another pass</Text>
      </Pressable>
    </View>
  );
}

/* ─────────── STYLES ─────────── */
const sp = StyleSheet.create({
  wrap:      { flex: 1, justifyContent: 'center', paddingHorizontal: 52, paddingVertical: 40 },
  eyebrow:   { fontFamily: 'Inter_400Regular', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: C.muted, marginBottom: 10 },
  title:     { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 34, color: C.text, lineHeight: 44, marginBottom: 28 },
  rule:      { height: 1, backgroundColor: C.border, marginBottom: 32 },
  step:      { flexDirection: 'row', paddingBottom: 24, marginBottom: 24 },
  stepBorder:{ borderBottomWidth: 1, borderBottomColor: C.border },
  num:       { fontFamily: 'Inter_400Regular', fontSize: 11, color: C.accent, letterSpacing: 1, width: 28, marginTop: 2 },
  stepBody:  { flex: 1 },
  stepTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 16, color: C.text, marginBottom: 6 },
  stepDesc:  { fontFamily: 'Inter_400Regular', fontSize: 13, color: C.sub, lineHeight: 20 },
  altRow:    { flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 8 },
  altLabel:  { fontFamily: 'Inter_400Regular', fontSize: 13, color: C.muted },
  altBtn:    { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 10, paddingHorizontal: 16, borderWidth: 1, borderColor: C.accent, borderRadius: 4 },
  altBtnText:{ fontFamily: 'Inter_400Regular', fontSize: 13, color: C.accent },
});

const selP = StyleSheet.create({
  wrap:      { flex: 1, paddingTop: 32 },
  header:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 40, marginBottom: 24 },
  eyebrow:   { fontFamily: 'Inter_400Regular', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: C.muted, marginBottom: 6 },
  title:     { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 28, color: C.text },
  backBtn:   { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 8, paddingHorizontal: 14, borderWidth: 1, borderColor: C.border, borderRadius: 4 },
  backTxt:   { fontFamily: 'Inter_400Regular', fontSize: 13, color: C.sub },
  tableHead: { flexDirection: 'row', paddingHorizontal: 40, paddingVertical: 10, backgroundColor: C.surface },
  th:        { fontFamily: 'Inter_400Regular', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: C.muted },
  list:      { flex: 1 },
  row:       { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 40, paddingVertical: 14 },
  rowAlt:    { backgroundColor: '#FAF7F3' },
  rowHover:  { backgroundColor: '#F5EDD8' },
  cell:      { fontFamily: 'Inter_400Regular', fontSize: 15, color: C.text },
  timeCell:  { fontFamily: 'Inter_600SemiBold', color: C.accent },
  subCell:   { color: C.sub, fontSize: 13 },
});

const cfP = StyleSheet.create({
  wrap:         { flex: 1, justifyContent: 'center', paddingHorizontal: 52, paddingVertical: 40 },
  eyebrow:      { fontFamily: 'Inter_400Regular', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: C.muted, marginBottom: 10 },
  title:        { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 32, color: C.text, lineHeight: 44, marginBottom: 28 },
  rule:         { height: 1, backgroundColor: C.border, marginBottom: 28 },
  detail:       { gap: 0, marginBottom: 36 },
  detailRow:    { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.border },
  detailLabel:  { fontFamily: 'Inter_400Regular', fontSize: 13, color: C.muted },
  detailVal:    { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: C.text },
  accent:       { color: C.accent },
  green:        { color: '#2D6A4F' },
  red:          { color: '#9B2335' },
  navBtn:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: C.text, paddingVertical: 16, paddingHorizontal: 32, borderRadius: 4, marginBottom: 14 },
  navBtnPressed:{ backgroundColor: '#3C3330' },
  navBtnTxt:    { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: '#F7F5F2', letterSpacing: 0.5 },
  restartBtn:   { alignItems: 'center', paddingVertical: 12 },
  restartTxt:   { fontFamily: 'Inter_400Regular', fontSize: 13, color: C.muted, textDecorationLine: 'underline' },
});
