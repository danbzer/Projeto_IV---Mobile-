import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  Alert 
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [confirmarSenha, setConfirmarSenha] = useState<string>('');
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !senha || !confirmarSenha) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Atenção', 'As palavras-passe não coincidem.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Erro no registo', error.message || 'Não foi possível criar a conta.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Crie a sua conta para acompanhar as suas filas em tempo real.</Text>

        <View style={styles.form}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="seuemail@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Palavra-passe</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••••••"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <Text style={styles.label}>Confirmar Palavra-passe</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••••••"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry
          />

          <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
            <Text style={styles.registerBtnText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.loginText}>Entrar</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2563EB', textAlign: 'center', marginBottom: 8 },
  subtitle: { textAlign: 'center', color: '#6B7280', fontSize: 14, marginBottom: 32 },
  form: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: '600', color: '#1F2937', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, marginBottom: 16, backgroundColor: '#FAFAFA' },
  registerBtn: { backgroundColor: '#2563EB', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  registerBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { color: '#6B7280' },
  loginText: { color: '#2563EB', fontWeight: 'bold' },
});