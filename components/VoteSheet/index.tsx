import BottomSheet, { BottomSheetProps } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { forwardRef, useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { View } from '../Themed';
import { VoteSheetForm } from './VoteSheetForm';

export type VoteForm = {
  type?: 'during' | 'after';
  value?: boolean;
};

type Props = Omit<BottomSheetProps, 'children'> & {
  closeSheet: () => void;
};

export const VoteSheet = forwardRef<BottomSheetMethods, Props>((props, ref) => {
  const scheme = useColorScheme();
  const [form, setForm] = useState<VoteForm>({
    type: undefined,
    value: undefined,
  });

  const onCancel = () => {
    setForm({ type: undefined, value: undefined });
    props.closeSheet();
  };

  const handleSubmit = () => {
    console.log('form submitted', form);
    props.closeSheet();
  };

  return (
    <BottomSheet
      {...props}
      detached={true}
      enablePanDownToClose={true}
      index={-1}
      ref={ref}
      // bottomInset={10}
      backgroundStyle={{
        borderRadius: 8,
        backgroundColor: Colors[scheme].text,
      }}
      style={{
        backgroundColor: Colors[scheme].text,
        borderRadius: 20,
        // add horizontal space
        // marginHorizontal: 24,
      }}
    >
      <View style={styles.root}>
        <VoteSheetForm
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
        />
        <View style={styles.cancelButtonContainer}>
          <Button
            title='Cancel'
            onPress={onCancel}
            color={Colors[scheme].background}
          />
        </View>
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'transparent',
    padding: 16,
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
  },
  cancelButtonContainer: {
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
});
