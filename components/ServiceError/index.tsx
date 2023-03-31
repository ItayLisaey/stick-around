import { useQuery } from '@tanstack/react-query';
import { StyleSheet } from 'react-native';
import { healthService } from '../../services/health.service';
import { ErrorMessage } from '../ErrorMessage';
import { Text } from '../Themed';

export const ServiceError = () => {
  const { data: backendStatus } = useQuery(['health', 'backend'], () =>
    healthService.backend()
  );
  const { data: tmdbStatus } = useQuery(['health', 'tmdb'], () =>
    healthService.tmdb()
  );

  const content = (
    <>
      <Text style={styles.content}>Please try again later.</Text>
      <Text style={styles.content}>
        If the problem persists, please contact itay@lisaey.com
      </Text>
    </>
  );

  if (backendStatus !== 200 && backendStatus !== undefined) {
    const message = 'Service unavailable';

    return <ErrorMessage message={message} content={content} />;
  }

  if (tmdbStatus !== 200 && tmdbStatus !== undefined) {
    const message = 'TMDB Service unavailable';

    return <ErrorMessage message={message} content={content} />;
  }

  return <></>;
};

const styles = StyleSheet.create({
  content: {
    maxWidth: 300,
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
  },
});
