import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { signOut } from 'firebase/auth';
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const user = auth.currentUser;

  const [minhaSenha, setMinhaSenha] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Escuta em tempo real a senha ativa do utilizador logado
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'senhas'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const senhas = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Filtra senhas que ainda estão 'aguardando' ou 'chamado'
      const ativa = senhas.find((s: any) => s.status === 'aguardando' || s.status === 'chamado');
      setMinhaSenha(ativa || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Função para gerar uma nova senha na fila
  const handleEntrarNaFila = async () => {
    if (!user) return;

    try {
      const numeroAleatorio = Math.floor(1000 + Math.random() * 9000).toString();

      await addDoc(collection(db, 'senhas'), {
        userId: user.uid,
        nomeCliente: user.email?.split('@')[0] || 'Cliente',
        numero: numeroAleatorio,
        status: 'aguardando',
        criadoEm: serverTimestamp()
      });

      Alert.alert('Sucesso', `Entrou na fila! Sua senha é #${numeroAleatorio}`);
    } catch (error: any) {
      Alert.alert('Erro', 'Não foi possível entrar na fila.');
    }
  };

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

        {loading ? (
          <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 20 }} />
        ) : minhaSenha ? (
          /* Card de Senha Ativa */
          <View style={styles.activeCard}>
            <Text style={styles.statusBadge}>
              {minhaSenha.status === 'chamado' ? '🔔 SUA VEZ!' : '⏳ Em Espera'}
            </Text>
            <Text style={styles.activeLabel}>Sua Senha</Text>
            <Text style={styles.activeNumero}>#{minhaSenha.numero}</Text>
            <Text style={styles.activeSubtext}>
              {minhaSenha.status === 'chamado'
                ? 'Dirija-se ao balcão de atendimento!'
                : 'Aguarde a empresa chamar o seu número.'}
            </Text>
          </View>
        ) : (
          /* Estado Vazio */
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Nenhum atendimento ativo</Text>
            <Text style={styles.emptySubtitle}>
              Toque no botão abaixo para entrar na fila de atendimento.
            </Text>
            <TouchableOpacity style={styles.addBtn} onPress={handleEntrarNaFila}>
              <Text style={styles.addBtnText}>+ Entrar na Fila</Text>
            </TouchableOpacity>
          </View>
        )}
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
  activeCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24, alignItems: 'center', borderWidth: 2, borderColor: '#2563EB', marginTop: 12 },
  statusBadge: { backgroundColor: '#EFF6FF', color: '#2563EB', fontWeight: 'bold', fontSize: 12, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginBottom: 12 },
  activeLabel: { fontSize: 14, color: '#6B7280' },
  activeNumero: { fontSize: 42, fontWeight: '800', color: '#2563EB', marginVertical: 8 },
  activeSubtext: { fontSize: 13, color: '#4B5563', textAlign: 'center' }
});