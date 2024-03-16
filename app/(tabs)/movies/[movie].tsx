import { Text, View } from '@/components/Themed';
import { useLocalSearchParams } from 'expo-router';

export default function MoviesPage() {
    const params = useLocalSearchParams();
    console.log(params);

    return <View>
        <Text>Movie Page</Text>
    </View>
}