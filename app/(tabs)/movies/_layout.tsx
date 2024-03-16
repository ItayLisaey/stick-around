import { Stack } from 'expo-router';

export default function MoviesPage() {
    return <Stack
        screenOptions={{
            headerShown: false,

        }}
    >
        <Stack.Screen name="movies" />
        <Stack.Screen name="[movie]" />
    </Stack>
}