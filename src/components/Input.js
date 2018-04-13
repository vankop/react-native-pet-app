import React from 'react';
import { TextInput } from 'react-native';

export default function Input({ input, meta, ...rest }) {
    const {
        value,
        onChange,
        onFocus,
        onBlur
    } = input;
    return (
        <TextInput
            {...rest}
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
        />
    );
}
