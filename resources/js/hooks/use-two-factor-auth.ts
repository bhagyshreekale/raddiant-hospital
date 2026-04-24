import { useCallback, useState } from 'react';

export type UseTwoFactorAuthReturn = {
    qrCodeSvg: string | null;
    manualSetupKey: string | null;
    recoveryCodesList: string[];
    hasSetupData: boolean;
    errors: string[];
    clearErrors: () => void;
    clearSetupData: () => void;
    clearTwoFactorAuthData: () => void;
    fetchSetupData: (data: {
        twoFactorQrCode?: string;
        twoFactorSecret?: string;
    }) => void;
    fetchRecoveryCodes: (codes: string[]) => void;
};

export const OTP_MAX_LENGTH = 6;

export const useTwoFactorAuth = (): UseTwoFactorAuthReturn => {
    const [qrCodeSvg, setQrCodeSvg] = useState<string | null>(null);
    const [manualSetupKey, setManualSetupKey] = useState<string | null>(null);
    const [recoveryCodesList, setRecoveryCodesList] = useState<string[]>([]);
    const [errors, setErrors] = useState<string[]>([]);

    const hasSetupData = qrCodeSvg !== null && manualSetupKey !== null;

    const clearErrors = useCallback((): void => {
        setErrors([]);
    }, []);

    const clearSetupData = useCallback((): void => {
        setManualSetupKey(null);
        setQrCodeSvg(null);
        setErrors([]);
    }, []);

    const clearTwoFactorAuthData = useCallback((): void => {
        setManualSetupKey(null);
        setQrCodeSvg(null);
        setErrors([]);
        setRecoveryCodesList([]);
    }, []);

    const fetchSetupData = useCallback(
        (data: {
            twoFactorQrCode?: string;
            twoFactorSecret?: string;
        }): void => {
            setErrors([]);
            if (data.twoFactorQrCode) {
                setQrCodeSvg(data.twoFactorQrCode);
            }
            if (data.twoFactorSecret) {
                setManualSetupKey(data.twoFactorSecret);
            }
        },
        [],
    );

    const fetchRecoveryCodes = useCallback((codes: string[]): void => {
        setErrors([]);
        setRecoveryCodesList(codes);
    }, []);

    return {
        qrCodeSvg,
        manualSetupKey,
        recoveryCodesList,
        hasSetupData,
        errors,
        clearErrors,
        clearSetupData,
        clearTwoFactorAuthData,
        fetchSetupData,
        fetchRecoveryCodes,
    };
};
