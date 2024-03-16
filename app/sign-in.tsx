import { supabase } from '@/lib/supabase-client';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { makeRedirectUri } from 'expo-auth-session';
import * as QueryParams from "expo-auth-session/build/QueryParams";

import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession(); // required for web only

const redirectTo = makeRedirectUri();

const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);

    if (errorCode) throw new Error(errorCode);
    const { access_token, refresh_token } = params;

    if (!access_token) return;

    const { data, error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
    });
    if (error) throw error;
    return data.session;
};

const performOAuth = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo,
            skipBrowserRedirect: true,
        },
    });
    if (error) throw error;

    const res = await WebBrowser.openAuthSessionAsync(
        data?.url ?? "",
        redirectTo
    );


    if (res.type === "success") {
        const { url } = res;
        await createSessionFromUrl(url);
    }
};

const sendMagicLink = async () => {
    const { error } = await supabase.auth.signInWithOtp({
        email: "example@email.com",
        options: {
            emailRedirectTo: redirectTo,
        },
    });

    if (error) throw error;
    // Email sent.
};

export default function SignInScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    async function signInWithEmail() {
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) Alert.alert("Sign In Error", error.message);
    }

    async function signUpWithEmail() {
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) Alert.alert("Sign Up Error", error.message);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login to Stick Around</Text>
            <TextInput
                style={styles.input}
                placeholderTextColor={'#ccc'}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholderTextColor={'#ccc'}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={signInWithEmail}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',

    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        color: '#fff',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

