import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Olá,</Text>
          <Text style={styles.userEmail}>{user?.email || 'Cliente'}</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Minhas Filas</Text>
        
        {/* Estado Vazio Inicial */}
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Nenhum atendimento ativo</Text>
          <Text style={styles.emptySubtitle}>
            Leia o QR Code do estabelecimento ou digite o código para entrar na fila.
          </Text>
          <TouchableOpacity style={styles.addBtn}>
            <Text style={styles.addBtnText}>+ Adicionar Fila</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  welcomeText: { fontSize: 12, color: '#6B7280' },
  userEmail: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  logoutBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: '#F3F4F6' },
  logoutText: { color: '#EF4444', fontWeight: '600', fontSize: 13 },
  content: { flex: 1, padding: 24 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
  emptyContainer: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', marginTop: 12 },
  emptyTitle: { fontSize: 16, fontWeight: 'bold', color: '#374151', marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginBottom: 20 },
  addBtn: { backgroundColor: '#2563EB', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10 },
  addBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },
});