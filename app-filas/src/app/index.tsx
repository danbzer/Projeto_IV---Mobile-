
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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
// import { useRouter } from 'expo-router';
import { useRouter, Link } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Por favor, preencha o e-mail e a senha.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Erro no login', 'E-mail ou senha inválidos.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* Logo & Header */}
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Text style={styles.logoText}>S</Text>
          </View>
          <Text style={styles.brandTitle}>Fila</Text>
        </View>
        <Text style={styles.subtitle}>
          Acompanhe seu atendimento de{"\n"}forma simples e rápida.
        </Text>

        {/* Formulário */}
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

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••••••"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Esqueci minha senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginBtnText}>Entrar</Text>
          </TouchableOpacity>
        </View>

        {/* Divisor */}
        <Text style={styles.dividerText}>OU CONTINUE COM</Text>

        {/* Botões Sociais */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn}>
            <Text style={styles.socialBtnText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <Text style={styles.socialBtnText}>Telefone</Text>
          </TouchableOpacity>
        </View>

        {/* Rodapé */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Não tem uma conta? </Text>
          <Link href="/register" asChild>
            <TouchableOpacity>
              <Text style={styles.signupText}>Criar conta</Text>
            </TouchableOpacity>
          </Link>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  subtitle: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 32,
  },
  form: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 16,
    backgroundColor: '#FAFAFA',
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: '#2563EB',
    fontSize: 13,
    fontWeight: '500',
  },
  loginBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 16,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  socialBtn: {
    flex: 0.48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  socialBtnText: {
    color: '#374151',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#6B7280',
  },
  signupText: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
});