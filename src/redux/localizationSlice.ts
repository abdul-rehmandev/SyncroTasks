import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import enTranslations from '@/locales/en.json';  // Import English translations
import arTranslations from '@/locales/ar.json';  // Import Arabic translations

interface LocalizationState {
    language: string;
    translations: { [key: string]: string };
}

const initialState: LocalizationState = {
    language: 'en',  // Default language
    translations: enTranslations,  // Default translations set to English
};

const localizationSlice = createSlice({
    name: 'localization',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
            // Load translations based on the selected language
            if (action.payload === 'en') {
                state.translations = enTranslations;
            } else if (action.payload === 'ar') {
                state.translations = arTranslations;
            }
        }
    }
});

export const { setLanguage } = localizationSlice.actions;

export default localizationSlice.reducer;
