"use client"
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '@/redux/localizationSlice';
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"


const LanguageSwitcher = () => {
    const dispatch = useDispatch();
    const language = useSelector((state: any) => state.localization.language);

    const handleLanguageChange = (checked: boolean) => {
        // Toggle between English ('en') and Arabic ('ar') based on the switch state
        const selectedLanguage = checked ? 'ar' : 'en';
        dispatch(setLanguage(selectedLanguage));
    };

    return (
        <div>
            <div className="flex items-center space-x-2">
                <Label htmlFor="language-switch">En</Label>
                <Switch
                    id="language-switch"
                    checked={language === 'ar'}  // Switch is on if Arabic is selected
                    onCheckedChange={handleLanguageChange}  // Handle language toggle
                />
                <Label htmlFor="language-switch">Ar</Label>
            </div>
        </div>
    );
};

export default LanguageSwitcher;
