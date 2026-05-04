import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

export type GateState = 'loading' | 'no_gate' | 'gate_announced';
export type GateStatusType = 'normal' | 'boarding' | 'gate_changed';

interface GateMainContentProps {
  state: GateState;
  gateStatus?: GateStatusType;
  gateNumber?: string | null;
  previousGateNumber?: string | null;
  flightNumber?: string;
  destination?: string;
  departureTime?: string;
  airline?: string;
  origin?: string;
  passenger?: string;
  date?: string;
}

/* ── Design tokens ─────────────────────────────────────── */
const BLUE    = '#2D3FD3';   // primary blue (ticket face)
const NAVY    = '#0D1F35';   // dark stub
const WHITE   = '#FFFFFF';
const LIGHT   = '#E8EBFF';   // text on blue – dimmed
const BG      = '#F7F5F2';   // page background (matches Gate screen)

/* ── Helpers ── */
function flightToSeat(flightNo: string): string {
  if (!flightNo) return '27B';
  const num = (flightNo.charCodeAt(0) + flightNo.charCodeAt(flightNo.length - 1)) % 40 + 10;
  const letter = String.fromCharCode(65 + (flightNo.charCodeAt(1) % 6));
  return `${num}${letter}`;
}
function addMins(t: string, mins: number): string {
  if (!t) return '14:15';
  const parts = t.split(':').map(Number);
  if (parts.length < 2) return t;
  const total = parts[0] * 60 + parts[1] + mins;
  return `${String(Math.floor(total / 60) % 24).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}
function to12h(t: string): string {
  const [h, m] = t.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  return `${String(h % 12 || 12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
}

/* ── Barcode strip ─────────────────────────────────────── */
function Barcode({ dark = false }: { dark?: boolean }) {
  const bars = Array.from({ length: 38 }, (_, i) => ({
    w: [1, 1, 2, 1, 3, 1, 2, 1, 1, 2][i % 10],
    gap: i % 5 === 4 ? 3 : 1,
  }));
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 52 }}>
      {bars.map((b, i) => (
        <View key={i} style={{ flexDirection: 'row' }}>
          <View style={{
            width: b.w * 2,
            height: 42 + (i % 3) * 4,
            backgroundColor: dark ? NAVY : WHITE,
            borderRadius: 0.5,
          }} />
          <View style={{ width: b.gap }} />
        </View>
      ))}
    </View>
  );
}

/* ── Animated dot divider ──────────────────────────────── */
function DashedDivider() {
  return (
    <View style={styles.dividerWrap}>
      <View style={styles.notchTop} />
      {Array.from({ length: 18 }).map((_, i) => (
        <View key={i} style={styles.dash} />
      ))}
      <View style={styles.notchBottom} />
    </View>
  );
}

/* ── InfoCell sub-component ────────────────────────────── */
function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.cell}>
      <Text style={styles.cellLabel}>{label}</Text>
      <Text style={styles.cellValue}>{value}</Text>
    </View>
  );
}

export default function GateMainContent({ 
  state, 
  gateStatus = 'normal',
  gateNumber,
  previousGateNumber,
  flightNumber = '6E123',
  destination = 'LND',
  departureTime = '14:45',
  airline = 'IndiGo',
  origin = 'DXB',
  passenger = 'JANE DOE',
  date = 'JAN 25, 2025'
}: GateMainContentProps) {

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    if (state !== 'loading') {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.spring(slideAnim, { toValue: 0, tension: 50, friction: 8, useNativeDriver: true })
      ]).start();
    }
  }, [state]);

  if (state === 'loading') {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={BLUE} />
        <Text style={styles.loadingText}>Fetching gate details...</Text>
      </View>
    );
  }

  const shortDate   = date.split(',')[0].toUpperCase();
  const seat        = flightToSeat(flightNumber);
  const boardTime   = addMins(departureTime, -30);  // board 30 min before depart
  const arrivalTime = addMins(departureTime, 140);  // assume 2h 20m flight duration

  return (
    <View style={styles.centerContainer}>
      
      {gateStatus === 'gate_changed' && previousGateNumber && (
        <View style={styles.alertBanner}>
          <Text style={styles.alertText}>
            Gate changed from {previousGateNumber} to {gateNumber}
          </Text>
        </View>
      )}

      {gateStatus === 'boarding' && (
        <Text style={styles.boardingNowHeader}>Boarding Now</Text>
      )}

      {/* ═══ TICKET CARD ═══════════════════════════════════ */}
      <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>

        {/* ── LEFT / MAIN SECTION (blue) ────────────────── */}
        <View style={styles.mainFace}>

          {/* Header band */}
          <View style={styles.faceHeader}>
            <View style={styles.airlineRow}>
              <MaterialCommunityIcons name="airplane" size={26} color={WHITE} />
              <Text style={styles.airlineName}>{airline}</Text>
            </View>
            <View style={styles.faceHeaderRight}>
              <Text style={styles.bpLabel}>BOARDING PASS</Text>
              <Text style={styles.classLabel}>FIRST CLASS</Text>
            </View>
          </View>

          {/* Route section */}
          <View style={styles.routeRow}>
            {/* Origin */}
            <View style={styles.routeBlock}>
              <Text style={styles.routeSmall}>FROM:</Text>
              <Text style={styles.routeCode}>{origin.length > 3 ? origin.substring(0, 3).toUpperCase() : origin.toUpperCase()}</Text>
              <Text style={styles.routeCity}>CHENNAI</Text>
              <Text style={styles.routeDate}>{date}</Text>
              <Text style={styles.routeTime}>{to12h(departureTime)}</Text>
            </View>

            {/* Arrow */}
            <View style={styles.arrowWrap}>
              <View style={styles.arrowLine} />
              <Feather name="arrow-right" size={18} color={WHITE} style={styles.arrowIcon} />
            </View>

            {/* Destination */}
            <View style={styles.routeBlock}>
              <Text style={styles.routeSmall}>TO:</Text>
              <Text style={styles.routeCode}>{destination.length > 3 ? destination.substring(0, 3).toUpperCase() : destination.toUpperCase()}</Text>
              <Text style={styles.routeCity}>{destination.toUpperCase()}</Text>
              <Text style={styles.routeDate}>{date}</Text>
              <Text style={styles.routeTime}>{to12h(arrivalTime)}</Text>
            </View>

            {/* Barcode (vertical strip) */}
            <View style={styles.barcodeWrap}>
              <Barcode dark={false} />
            </View>
          </View>

          {/* Info grid row */}
          <View style={styles.infoGrid}>
            <InfoCell label="Passenger" value={passenger.toUpperCase()} />
            <InfoCell label="Flight"    value={flightNumber} />
            <InfoCell label="Terminal"  value="T2" />
            <InfoCell label="Gate"      value={gateNumber || 'TBD'} />
            <InfoCell label="Seat"      value={seat} />
          </View>

          {/* Time row */}
          <View style={[styles.infoGrid, styles.timeRow]}>
            <InfoCell label="Date"     value={shortDate} />
            <InfoCell label="Boarding" value={to12h(boardTime)} />
            <InfoCell label="Depart"   value={to12h(departureTime)} />
          </View>
        </View>

        {/* Tear-line divider */}
        <DashedDivider />

        {/* ── RIGHT / STUB (dark navy) ──────────────────── */}
        <View style={styles.stub}>
          <Text style={styles.stubBP}>BOARDING{'\n'}PASS</Text>

          <View style={styles.stubInfoRow}>
            <View>
              <Text style={styles.stubLabel}>Passenger</Text>
              <Text style={styles.stubValue}>{passenger.toUpperCase()}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.stubLabel}>Class</Text>
              <Text style={styles.stubValue}>FIRST</Text>
            </View>
          </View>

          <View style={styles.stubTimeGrid}>
            <View>
              <Text style={styles.stubLabel}>Date</Text>
              <Text style={styles.stubSmall}>{shortDate}</Text>
            </View>
            <View>
              <Text style={styles.stubLabel}>Boarding</Text>
              <Text style={styles.stubSmall}>{to12h(boardTime)}</Text>
            </View>
            <View>
              <Text style={styles.stubLabel}>Depart</Text>
              <Text style={styles.stubSmall}>{to12h(departureTime)}</Text>
            </View>
          </View>

          {/* Stub barcode */}
          <View style={styles.stubBarcodeWrap}>
            <Barcode dark={true} />
          </View>
        </View>

      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#6B7280',
    fontFamily: 'Inter_400Regular',
  },
  alertBanner: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  alertText: {
    color: '#991B1B',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  boardingNowHeader: {
    fontSize: 28,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#111827',
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  
  /* ── Card ── */
  card: {
    flexDirection: 'row',
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 860,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 30,
    elevation: 12,
  },

  /* ── Main face (blue) ── */
  mainFace: {
    flex: 7,
    backgroundColor: BLUE,
  },
  faceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.15)',
  },
  airlineRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
  },
  airlineName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16, color: WHITE, letterSpacing: 0.4,
  },
  faceHeaderRight: { alignItems: 'flex-end' },
  bpLabel: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13, color: WHITE, letterSpacing: 2,
  },
  classLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11, color: LIGHT, letterSpacing: 2.5, marginTop: 2,
  },

  /* Route */
  routeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 20,
    gap: 16,
  },
  routeBlock: { flex: 2 },
  routeSmall: { fontFamily: 'Inter_400Regular', fontSize: 11, color: LIGHT, marginBottom: 2 },
  routeCode:  { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 38, color: WHITE, lineHeight: 42 },
  routeCity:  { fontFamily: 'Inter_600SemiBold', fontSize: 12, color: BLUE, backgroundColor: WHITE, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start', marginTop: 4, marginBottom: 6 },
  routeDate:  { fontFamily: 'Inter_400Regular', fontSize: 12, color: LIGHT },
  routeTime:  { fontFamily: 'Inter_400Regular', fontSize: 12, color: LIGHT },

  arrowWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 26 },
  arrowLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.4)' },
  arrowIcon: { marginLeft: -2 },

  barcodeWrap: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingTop: 12,
  },

  /* Info grid */
  infoGrid: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.12)',
  },
  timeRow: { paddingBottom: 20 },

  cell: {},
  cellLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 10, color: LIGHT, letterSpacing: 0.5, marginBottom: 2,
  },
  cellValue: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13, color: WHITE,
  },

  /* ── Tear divider ── */
  dividerWrap: {
    width: 2,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 0,
    position: 'relative',
  },
  notchTop: {
    width: 22, height: 11,
    borderBottomLeftRadius: 11, borderBottomRightRadius: 11,
    backgroundColor: BG,
    marginTop: -1,
  },
  notchBottom: {
    width: 22, height: 11,
    borderTopLeftRadius: 11, borderTopRightRadius: 11,
    backgroundColor: BG,
    marginBottom: -1,
  },
  dash: {
    flex: 1, width: 1, marginVertical: 2,
    backgroundColor: 'rgba(255,255,255,0.25)',
    maxHeight: 8,
  },

  /* ── Stub (navy) ── */
  stub: {
    flex: 3,
    backgroundColor: NAVY,
    paddingHorizontal: 20,
    paddingVertical: 18,
    justifyContent: 'space-between',
  },
  stubBP: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15, color: WHITE,
    letterSpacing: 2, textAlign: 'center',
    marginBottom: 14,
  },
  stubInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  stubLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 9, color: 'rgba(255,255,255,0.5)',
    letterSpacing: 0.5, marginBottom: 2,
  },
  stubValue: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12, color: BLUE,
  },
  stubTimeGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  stubSmall: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11, color: WHITE,
  },
  stubBarcodeWrap: {
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
});
